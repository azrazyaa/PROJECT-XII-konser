import { randomBytes } from "crypto";

export async function applyMidtransStatus(connection, order, transaction) {
  if (String(transaction.order_id) !== String(order.order_code)) {
    throw new Error("Midtrans order ID mismatch");
  }

  const notifiedAmount = Number(transaction.gross_amount);
  if (
    !Number.isFinite(notifiedAmount) ||
    Math.round(Number(order.total_amount) * 100) !==
      Math.round(notifiedAmount * 100)
  ) {
    throw new Error("Midtrans transaction amount mismatch");
  }

  const transactionStatus = String(transaction.transaction_status || "");
  const fraudStatus = String(transaction.fraud_status || "");
  let newStatus = null;
  if (
    transactionStatus === "settlement" ||
    (transactionStatus === "capture" && fraudStatus === "accept")
  ) {
    newStatus = "paid";
  } else if (transactionStatus === "expire") {
    newStatus = "expired";
  } else if (
    transactionStatus === "cancel" ||
    transactionStatus === "deny"
  ) {
    newStatus = "cancelled";
  }

  if (
    !newStatus ||
    order.status === "paid" ||
    (newStatus !== "paid" && order.status !== "pending")
  ) {
    return order.status;
  }

  await connection.query("UPDATE orders SET status = ? WHERE id = ?", [
    newStatus,
    order.id,
  ]);

  if (newStatus === "paid") {
    const [details] = await connection.query(
      `SELECT od.id AS order_detail_id, od.qty, od.ticket_category_id
       FROM order_details od
       WHERE od.order_id = ?`,
      [order.id]
    );
    for (const detail of details) {
      for (let index = 0; index < Number(detail.qty); index += 1) {
        const ticketCode = `TKT-${order.order_code}-${detail.ticket_category_id}-${index + 1}-${randomBytes(3).toString("hex").toUpperCase()}`;
        await connection.query(
          "INSERT INTO tickets (order_detail_id, ticket_code) VALUES (?, ?)",
          [detail.order_detail_id, ticketCode]
        );
      }
    }
  }

  return newStatus;
}
