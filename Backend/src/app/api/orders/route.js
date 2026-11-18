import { NextResponse } from "next/server";
import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

// Helper: Verifikasi Token jika ada
function getUserIdFromToken(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "konserdb123"
      );
      return decoded.id;
    }
  } catch (err) {
    // Ignore invalid token
  }
  return null;
}

// 1. GET: Ambil daftar pesanan (Mendukung filter user_id untuk Mobile My Tickets & Admin)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let userId = searchParams.get("user_id");

    if (!userId) {
      userId = getUserIdFromToken(request);
    }

    let ordersQuery = `
      SELECT 
        o.id,
        o.user_id,
        o.order_code,
        o.total_amount,
        o.status,
        o.expired_at,
        o.created_at,
        u.name AS user_name,
        u.email AS user_email
      FROM orders o
      JOIN users u ON o.user_id = u.id
    `;

    const queryParams = [];
    if (userId) {
      ordersQuery += ` WHERE o.user_id = ?`;
      queryParams.push(userId);
    }

    ordersQuery += ` ORDER BY o.created_at DESC`;

    const [orders] = await db.query(ordersQuery, queryParams);

    // Ambil rincian setiap order beserta event dan tiket QR-nya
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const [details] = await db.query(
          `SELECT 
            od.id AS order_detail_id,
            od.ticket_category_id,
            od.qty,
            od.subtotal,
            tc.name AS category_name,
            tc.price AS category_price,
            e.id AS event_id,
            e.title AS event_title,
            e.venue AS event_venue,
            e.event_date,
            e.banner_url,
            e.stage_layout,
            COALESCE(a.name, 'Artist') AS artist_name,
            COALESCE(a.genre, 'Music') AS artist_genre
          FROM order_details od
          JOIN ticket_categories tc ON od.ticket_category_id = tc.id
          JOIN events e ON tc.event_id = e.id
          LEFT JOIN artists a ON e.artist_id = a.id
          WHERE od.order_id = ?`,
          [order.id]
        );

        // Untuk setiap detail, ambil tiket QR jika ada
        const itemsWithTickets = await Promise.all(
          details.map(async (item) => {
            const [tickets] = await db.query(
              "SELECT id, ticket_code, is_used, scanned_at FROM tickets WHERE order_detail_id = ?",
              [item.order_detail_id]
            );
            return {
              ...item,
              tickets: tickets || [],
            };
          })
        );

        const primaryEvent = details[0]
          ? {
              id: details[0].event_id,
              title: details[0].event_title,
              venue: details[0].event_venue,
              event_date: details[0].event_date,
              banner_url: details[0].banner_url,
              stage_layout: details[0].stage_layout,
              artist_name: details[0].artist_name,
              artist_genre: details[0].artist_genre,
            }
          : null;

        const allTickets = itemsWithTickets.flatMap((it) =>
          it.tickets.map((t) => ({
            id: t.id,
            ticket_code: t.ticket_code,
            is_used: Boolean(t.is_used),
            category_name: it.category_name,
          }))
        );

        const flattenedDetails = itemsWithTickets.map((it) => ({
          id: it.order_detail_id,
          ticket_category_id: it.ticket_category_id,
          qty: it.qty,
          category_name: it.category_name,
          price: Number(it.category_price) || 0,
        }));

        return {
          ...order,
          total_price: Number(order.total_amount),
          event: primaryEvent,
          event_id: primaryEvent?.id,
          event_title: primaryEvent?.title || "Concert",
          event_venue: primaryEvent?.venue || "Venue",
          event_date: primaryEvent?.event_date,
          event_banner_url: primaryEvent?.banner_url || "",
          artist_name: primaryEvent?.artist_name || "Artist",
          items: itemsWithTickets,
          details: flattenedDetails,
          tickets: allTickets,
        };
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mengambil data pesanan",
        data: ordersWithDetails,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil pesanan", error: error.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// 2. POST: Buat Pesanan Baru (Mendukung single item maupun array items, serta auto-pay & ticket generation)
export async function POST(request) {
  const connection = await db.getConnection();
  let transactionStarted = false;

  try {
    const body = await request.json();
    const {
      ticket_category_id,
      qty,
      items,
    } = body;

    const user_id = getUserIdFromToken(request);
    if (!user_id) {
      return NextResponse.json(
        { success: false, message: "Silakan login untuk membuat pesanan" },
        { status: 401, headers: CORS_HEADERS }
      );
    }
    if (!process.env.MIDTRANS_SERVER_KEY) {
      return NextResponse.json(
        { success: false, message: "Konfigurasi Midtrans belum tersedia di backend" },
        { status: 503, headers: CORS_HEADERS }
      );
    }

    // Normalisasi items menjadi array [{ ticket_category_id, qty }]
    const requestedItems =
      Array.isArray(items) && items.length > 0
        ? items
        : [{ ticket_category_id, qty }];
    const quantitiesByCategory = new Map();
    for (const item of requestedItems) {
      const categoryId = Number(item?.ticket_category_id);
      const quantity = Number(item?.qty);
      if (
        !Number.isSafeInteger(categoryId) ||
        categoryId <= 0 ||
        !Number.isSafeInteger(quantity) ||
        quantity <= 0
      ) {
        return NextResponse.json(
          { success: false, message: "Jumlah atau kategori tiket tidak valid" },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      const combinedQuantity =
        (quantitiesByCategory.get(categoryId) || 0) + quantity;
      if (!Number.isSafeInteger(combinedQuantity)) {
        return NextResponse.json(
          { success: false, message: "Jumlah tiket melebihi batas" },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      quantitiesByCategory.set(categoryId, combinedQuantity);
    }
    const orderItems = Array.from(quantitiesByCategory, ([id, requested_qty]) => ({
      ticket_category_id: id,
      qty: requested_qty,
    }));

    if (orderItems.length === 0) {
      return NextResponse.json(
        { success: false, message: "Pilih setidaknya satu tiket" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    await connection.beginTransaction();
    transactionStarted = true;

    let grandTotal = 0;
    const validatedItems = [];

    // Validasi kuota dan kunci untuk setiap kategori tiket
    for (const item of orderItems) {
      await connection.query(
        "SELECT id FROM ticket_categories WHERE id = ? FOR UPDATE",
        [item.ticket_category_id]
      );
      const [categories] = await connection.query(
        `SELECT tc.id, tc.name, tc.price, tc.quota, tc.is_locked, e.title AS event_title,
                COALESCE(SUM(
                  CASE
                    WHEN o.status = 'paid'
                      OR (o.status = 'pending' AND o.expired_at > NOW())
                    THEN od.qty
                    ELSE 0
                  END
                ), 0) AS sold
         FROM ticket_categories tc
         JOIN events e ON tc.event_id = e.id
         LEFT JOIN order_details od ON tc.id = od.ticket_category_id
         LEFT JOIN orders o ON od.order_id = o.id
         WHERE tc.id = ?
         GROUP BY tc.id`,
        [item.ticket_category_id]
      );

      if (categories.length === 0) {
        await connection.rollback();
        transactionStarted = false;
        return NextResponse.json(
          {
            success: false,
            message: `Kategori tiket ID ${item.ticket_category_id} tidak ditemukan`,
          },
          { status: 404, headers: CORS_HEADERS }
        );
      }

      const cat = categories[0];
      const unitPrice = Number(cat.price);
      if (!Number.isSafeInteger(unitPrice) || unitPrice <= 0) {
        await connection.rollback();
        transactionStarted = false;
        return NextResponse.json(
          {
            success: false,
            message: `Harga tiket "${cat.name}" tidak valid untuk pembayaran`,
          },
          { status: 400, headers: CORS_HEADERS }
        );
      }

      if (cat.is_locked) {
        await connection.rollback();
        transactionStarted = false;
        return NextResponse.json(
          {
            success: false,
            message: `Kategori tiket "${cat.name}" saat ini sedang dikunci`,
          },
          { status: 400, headers: CORS_HEADERS }
        );
      }

      const remainingQuota = cat.quota - Number(cat.sold);
      if (item.qty > remainingQuota) {
        await connection.rollback();
        transactionStarted = false;
        return NextResponse.json(
          {
            success: false,
            message: `Sisa tiket untuk "${cat.name}" hanya ${remainingQuota} tiket`,
          },
          { status: 400, headers: CORS_HEADERS }
        );
      }

      const subtotal = unitPrice * item.qty;
      if (!Number.isSafeInteger(subtotal)) {
        await connection.rollback();
        transactionStarted = false;
        return NextResponse.json(
          { success: false, message: "Total pesanan melebihi batas" },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      grandTotal += subtotal;

      validatedItems.push({
        ...cat,
        requested_qty: item.qty,
        subtotal,
      });
    }

    // Biaya layanan jika diperlukan (dihitung otomatis atau 0)
    const serviceFee =
      grandTotal > 0 ? Math.ceil((grandTotal * 0.05) / 1000) * 1000 : 0;
    grandTotal += serviceFee;
    if (!Number.isSafeInteger(grandTotal)) {
      await connection.rollback();
      transactionStarted = false;
      return NextResponse.json(
        { success: false, message: "Total pesanan melebihi batas" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Buat kode order unik: NOC-YYYYMMDD-XXXXXXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = randomBytes(4).toString("hex").toUpperCase();
    const order_code = `NOC-${dateStr}-${randomSuffix}`;

    const orderStatus = "pending";

    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 2); // Berlaku 2 jam

    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, order_code, total_amount, status, expired_at) 
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, order_code, grandTotal, orderStatus, expiredAt]
    );

    const order_id = orderResult.insertId;

    // Tickets are generated only after Midtrans confirms payment.
    for (const item of validatedItems) {
      await connection.query(
        `INSERT INTO order_details (order_id, ticket_category_id, qty, subtotal) 
         VALUES (?, ?, ?, ?)`,
        [order_id, item.id, item.requested_qty, item.subtotal]
      );
    }

    await connection.commit();
    transactionStarted = false;

    return NextResponse.json(
      {
        success: true,
        message: "Pesanan berhasil dibuat, silakan lakukan pembayaran.",
        data: {
          order_id,
          order_code,
          total_amount: grandTotal,
          status: orderStatus,
        },
      },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (error) {
    if (transactionStarted) {
      await connection.rollback();
    }
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat pesanan", error: error.message },
      { status: 500, headers: CORS_HEADERS }
    );
  } finally {
    connection.release();
  }
}
