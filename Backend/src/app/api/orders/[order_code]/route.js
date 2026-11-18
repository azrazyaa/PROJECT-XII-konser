import { NextResponse } from "next/server";
import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { applyMidtransStatus } from "@/lib/midtransStatus";

function getUserIdFromToken(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;
    const decoded = jwt.verify(
      authHeader.slice(7),
      process.env.JWT_SECRET || "konserdb123"
    );
    return decoded.id;
  } catch {
    return null;
  }
}

export async function GET(request, { params }) {
  const userId = getUserIdFromToken(request);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Silakan login untuk melihat pesanan" },
      { status: 401 }
    );
  }

  try {
    const { order_code: orderCode } = await params;
    const [orders] = await db.query(
      `SELECT id, order_code, total_amount, status, expired_at, created_at
       FROM orders WHERE order_code = ? AND user_id = ? LIMIT 1`,
      [orderCode, userId]
    );
    const order = orders[0];
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Pesanan tidak ditemukan" },
        { status: 404 }
      );
    }
    let midtransStatusChecked = false;
    if (order.status === "pending") {
      const serverKey = process.env.MIDTRANS_SERVER_KEY;
      if (!serverKey) {
        return NextResponse.json(
          { success: false, message: "Konfigurasi Midtrans belum tersedia di backend" },
          { status: 503 }
        );
      }

      const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
      const apiBase = isProduction
        ? "https://api.midtrans.com"
        : "https://api.sandbox.midtrans.com";
      const statusResponse = await fetch(
        `${apiBase}/v2/${encodeURIComponent(order.order_code)}/status`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`,
            Accept: "application/json",
          },
          signal: AbortSignal.timeout(10000),
        }
      );
      const transaction = await statusResponse.json();
      if (!statusResponse.ok) {
        console.error("Midtrans status lookup failed:", {
          orderCode: order.order_code,
          status: statusResponse.status,
          message: transaction.status_message,
        });
        return NextResponse.json(
          {
            success: false,
            message:
              statusResponse.status === 404
                ? "Transaksi belum ditemukan di Midtrans. Coba lagi beberapa saat."
                : "Midtrans belum dapat memverifikasi status pembayaran. Coba lagi.",
          },
          { status: 502 }
        );
      }

      const connection = await db.getConnection();
      try {
        await connection.beginTransaction();
        const [lockedOrders] = await connection.query(
          `SELECT id, order_code, total_amount, status
           FROM orders WHERE id = ? AND user_id = ? FOR UPDATE`,
          [order.id, userId]
        );
        if (!lockedOrders[0]) {
          await connection.rollback();
          return NextResponse.json(
            { success: false, message: "Pesanan tidak ditemukan" },
            { status: 404 }
          );
        }
        order.status = await applyMidtransStatus(
          connection,
          lockedOrders[0],
          transaction
        );
        await connection.commit();
        midtransStatusChecked = true;
      } catch (error) {
        await connection.rollback();
        console.error("Midtrans order status sync failed:", error);
        return NextResponse.json(
          { success: false, message: "Data status pembayaran Midtrans tidak valid" },
          { status: 502 }
        );
      } finally {
        connection.release();
      }
    }

    if (order.status === "pending" && new Date(order.expired_at) <= new Date()) {
      await db.query(
        "UPDATE orders SET status = 'expired' WHERE id = ? AND status = 'pending'",
        [order.id]
      );
      order.status = "expired";
    }

    const [details] = await db.query(
      `SELECT od.id AS order_detail_id, od.ticket_category_id, od.qty,
              od.subtotal, tc.name AS category_name, tc.price,
              e.id AS event_id, e.title AS event_title, e.venue,
              e.event_date, e.banner_url
       FROM order_details od
       JOIN ticket_categories tc ON tc.id = od.ticket_category_id
       JOIN events e ON e.id = tc.event_id
       WHERE od.order_id = ?`,
      [order.id]
    );
    const [tickets] = await db.query(
      `SELECT t.ticket_code, tc.name AS category_name
       FROM tickets t
       JOIN order_details od ON od.id = t.order_detail_id
       JOIN ticket_categories tc ON tc.id = od.ticket_category_id
       WHERE od.order_id = ?`,
      [order.id]
    );

    return NextResponse.json({
      success: true,
      data: {
        ...order,
        total_amount: Number(order.total_amount),
        midtrans_status_checked: midtransStatusChecked,
        event: details[0]
          ? {
              id: details[0].event_id,
              title: details[0].event_title,
              venue: details[0].venue,
              event_date: details[0].event_date,
              banner_url: details[0].banner_url,
            }
          : null,
        items: details.map((item) => ({
          ticket_category_id: item.ticket_category_id,
          qty: Number(item.qty),
          subtotal: Number(item.subtotal),
          name: item.category_name,
          price: Number(item.price),
        })),
        tickets,
      },
    });
  } catch (error) {
    console.error("GET /api/orders/[order_code] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil status pesanan" },
      { status: 500 }
    );
  }
}
