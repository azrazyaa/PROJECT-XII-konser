import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

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

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: CORS_HEADERS });
}

export async function POST(request) {
  const userId = getUserIdFromToken(request);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Silakan login untuk melanjutkan pembayaran" },
      { status: 401, headers: CORS_HEADERS }
    );
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    return NextResponse.json(
      { success: false, message: "Konfigurasi Midtrans belum tersedia di backend" },
      { status: 503, headers: CORS_HEADERS }
    );
  }

  try {
    const body = await request.json();
    const orderCode = String(body.order_code || "").trim();
    const customer = body.customer_details || {};
    const firstName = String(customer.first_name || "").trim();
    const email = String(customer.email || "").trim();
    const phone = String(customer.phone || "").trim();

    if (
      !/^NOC-\d{8}-[A-F0-9]{8}$/.test(orderCode) ||
      !firstName ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !phone
    ) {
      return NextResponse.json(
        { success: false, message: "Data pesanan atau detail pembeli tidak valid" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const [orders] = await db.query(
      `SELECT id, order_code, total_amount, status, expired_at
       FROM orders WHERE order_code = ? AND user_id = ? LIMIT 1`,
      [orderCode, userId]
    );
    const order = orders[0];
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Pesanan tidak ditemukan" },
        { status: 404, headers: CORS_HEADERS }
      );
    }
    if (order.status === "pending" && new Date(order.expired_at) <= new Date()) {
      await db.query(
        "UPDATE orders SET status = 'expired' WHERE id = ? AND status = 'pending'",
        [order.id]
      );
      order.status = "expired";
    }
    if (order.status !== "pending") {
      return NextResponse.json(
        { success: false, message: "Pesanan tidak lagi dapat dibayar" },
        { status: 409, headers: CORS_HEADERS }
      );
    }

    const [details] = await db.query(
      `SELECT od.ticket_category_id, od.qty, tc.name AS category_name,
              tc.price, e.title AS event_title
       FROM order_details od
       JOIN ticket_categories tc ON tc.id = od.ticket_category_id
       JOIN events e ON e.id = tc.event_id
       WHERE od.order_id = ?`,
      [order.id]
    );
    if (!details.length) {
      return NextResponse.json(
        { success: false, message: "Rincian tiket pesanan tidak ditemukan" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const itemDetails = details.map((item) => {
      const quantity = Number(item.qty);
      const unitPrice = Math.round(Number(item.price));
      return {
        id: String(item.ticket_category_id),
        price: unitPrice,
        quantity,
        name: `${item.event_title} - ${item.category_name}`.slice(0, 50),
      };
    });

    const grossAmount = Math.round(Number(order.total_amount));
    const ticketAmount = itemDetails.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const serviceFee = grossAmount - ticketAmount;
    if (
      !Number.isSafeInteger(grossAmount) ||
      grossAmount <= 0 ||
      !Number.isSafeInteger(ticketAmount) ||
      itemDetails.some(
        (item) =>
          !Number.isSafeInteger(item.price) ||
          item.price <= 0 ||
          !Number.isSafeInteger(item.quantity) ||
          item.quantity <= 0
      ) ||
      serviceFee < 0
    ) {
      return NextResponse.json(
        { success: false, message: "Nominal pesanan tidak valid untuk Midtrans" },
        { status: 400, headers: CORS_HEADERS }
      );
    }
    if (serviceFee > 0) {
      itemDetails.push({
        id: "service-fee",
        price: serviceFee,
        quantity: 1,
        name: "Biaya layanan",
      });
    }

    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
    const apiUrl = isProduction
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";
    const midtransResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: order.order_code,
          gross_amount: grossAmount,
        },
        expiry: {
          unit: "hours",
          duration: 2,
        },
        item_details: itemDetails,
        customer_details: {
          first_name: firstName,
          email,
          phone,
        },
      }),
      signal: AbortSignal.timeout(15000),
    });

    const midtransData = await midtransResponse.json();
    if (!midtransResponse.ok || !midtransData.token || !midtransData.redirect_url) {
      console.error("Midtrans Snap checkout failed:", {
        status: midtransResponse.status,
        message: midtransData.status_message,
      });
      return NextResponse.json(
        { success: false, message: "Midtrans gagal membuat halaman pembayaran" },
        { status: 502, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Halaman pembayaran berhasil dibuat",
        data: {
          order_code: order.order_code,
          total_amount: grossAmount,
          snap_token: midtransData.token,
          redirect_url: midtransData.redirect_url,
        },
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("POST /api/payments/midtrans/checkout error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memulai pembayaran Midtrans" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
