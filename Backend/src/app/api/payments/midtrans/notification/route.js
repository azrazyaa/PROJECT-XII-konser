import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import db from "@/lib/db";
import { applyMidtransStatus } from "@/lib/midtransStatus";

function secureEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export async function POST(request) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    return NextResponse.json(
      { success: false, message: "Midtrans belum dikonfigurasi" },
      { status: 503 }
    );
  }

  const connection = await db.getConnection();
  try {
    const notification = await request.json();
    const orderCode = String(notification.order_id || "");
    const statusCode = String(notification.status_code || "");
    const grossAmount = String(notification.gross_amount || "");
    const signatureKey = String(notification.signature_key || "");
    const expectedSignature = createHash("sha512")
      .update(`${orderCode}${statusCode}${grossAmount}${serverKey}`)
      .digest("hex");

    if (!secureEqual(signatureKey, expectedSignature)) {
      return NextResponse.json(
        { success: false, message: "Signature not valid" },
        { status: 401 }
      );
    }

    await connection.beginTransaction();
    const [orders] = await connection.query(
      `SELECT id, order_code, total_amount, status FROM orders
       WHERE order_code = ? FOR UPDATE`,
      [orderCode]
    );
    const order = orders[0];
    if (!order) {
      await connection.rollback();
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    try {
      await applyMidtransStatus(connection, order, notification);
    } catch (error) {
      await connection.rollback();
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    await connection.commit();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    await connection.rollback();
    console.error("POST /api/payments/midtrans/notification error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memproses notifikasi Midtrans" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
