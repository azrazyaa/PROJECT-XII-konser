import { NextResponse } from "next/server";
import db from "@/lib/db";
import jwt from "jsonwebtoken";

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

        return {
          ...order,
          event: primaryEvent,
          items: itemsWithTickets,
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: "Berhasil mengambil data pesanan",
      data: ordersWithDetails,
    });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil pesanan", error: error.message },
      { status: 500 }
    );
  }
}

// 2. POST: Buat Pesanan Baru (Mendukung single item maupun array items, serta auto-pay & ticket generation)
export async function POST(request) {
  const connection = await db.getConnection();

  try {
    const body = await request.json();
    let {
      user_id,
      ticket_category_id,
      qty,
      items,
      payment_method,
      status: requestedStatus,
    } = body;

    // Ambil user_id dari token jika tidak dikirim langsung
    if (!user_id) {
      user_id = getUserIdFromToken(request);
    }

    // Jika user_id masih kosong, cari user default customer pertama agar tidak gagal
    if (!user_id) {
      const [defaultUsers] = await connection.query(
        "SELECT id FROM users ORDER BY id ASC LIMIT 1"
      );
      if (defaultUsers.length > 0) {
        user_id = defaultUsers[0].id;
      } else {
        return NextResponse.json(
          { success: false, message: "Pengguna tidak teridentifikasi" },
          { status: 400 }
        );
      }
    }

    // Normalisasi items menjadi array [{ ticket_category_id, qty }]
    const orderItems = [];
    if (Array.isArray(items) && items.length > 0) {
      for (const it of items) {
        if (it.ticket_category_id && it.qty > 0) {
          orderItems.push({
            ticket_category_id: Number(it.ticket_category_id),
            qty: Number(it.qty),
          });
        }
      }
    } else if (ticket_category_id && qty && qty > 0) {
      orderItems.push({
        ticket_category_id: Number(ticket_category_id),
        qty: Number(qty),
      });
    }

    if (orderItems.length === 0) {
      return NextResponse.json(
        { success: false, message: "Data item pemesanan tidak valid" },
        { status: 400 }
      );
    }

    // --- MULAI DATABASE TRANSACTION ---
    await connection.beginTransaction();

    let grandTotal = 0;
    const validatedItems = [];

    // 1. Verifikasi harga dan potong kuota tiket secara atomic
    for (const it of orderItems) {
      const [updateResult] = await connection.query(
        `UPDATE ticket_categories 
         SET quota = quota - ? 
         WHERE id = ? AND quota >= ?`,
        [it.qty, it.ticket_category_id, it.qty]
      );

      if (updateResult.affectedRows === 0) {
        await connection.rollback();
        return NextResponse.json(
          {
            success: false,
            message: `Maaf, kuota untuk kategori tiket ID ${it.ticket_category_id} tidak mencukupi!`,
          },
          { status: 400 }
        );
      }

      const [categories] = await connection.query(
        "SELECT tc.id, tc.price, tc.name, tc.event_id, e.title as event_title FROM ticket_categories tc JOIN events e ON tc.event_id = e.id WHERE tc.id = ?",
        [it.ticket_category_id]
      );

      if (categories.length === 0) {
        await connection.rollback();
        return NextResponse.json(
          { success: false, message: "Kategori tiket tidak ditemukan" },
          { status: 404 }
        );
      }

      const price = Number(categories[0].price);
      const subtotal = price * it.qty;
      grandTotal += subtotal;

      validatedItems.push({
        ticket_category_id: it.ticket_category_id,
        name: categories[0].name,
        event_id: categories[0].event_id,
        event_title: categories[0].event_title,
        price,
        qty: it.qty,
        subtotal,
      });
    }

    // 2. Buat Order Code unik
    const order_code = `NOC-${Date.now()}`;
    const orderStatus = requestedStatus || "paid"; // Default paid saat transaksi selesai di Mobile
    const expired_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 jam

    // 3. Insert ke tabel orders
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, order_code, total_amount, status, expired_at) 
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, order_code, grandTotal, orderStatus, expired_at]
    );

    const order_id = orderResult.insertId;
    const generatedTickets = [];

    // 4. Insert ke tabel order_details dan buat tickets (QR Code) jika paid
    for (const item of validatedItems) {
      const [detailResult] = await connection.query(
        `INSERT INTO order_details (order_id, ticket_category_id, qty, subtotal) 
         VALUES (?, ?, ?, ?)`,
        [order_id, item.ticket_category_id, item.qty, item.subtotal]
      );

      const order_detail_id = detailResult.insertId;

      // Jika status 'paid', otomatis buat record e-ticket unik di tabel tickets
      if (orderStatus === "paid") {
        for (let i = 1; i <= item.qty; i++) {
          const randSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
          const ticket_code = `TCKT-${item.event_id}-${order_id}-${order_detail_id}-${i}-${randSuffix}`;

          const [ticketResult] = await connection.query(
            `INSERT INTO tickets (order_detail_id, ticket_code, is_used) 
             VALUES (?, ?, 0)`,
            [order_detail_id, ticket_code]
          );

          generatedTickets.push({
            id: ticketResult.insertId,
            order_detail_id,
            ticket_code,
            is_used: 0,
            event_title: item.event_title,
            category_name: item.name,
          });
        }
      }
    }

    await connection.commit();

    return NextResponse.json(
      {
        success: true,
        message:
          orderStatus === "paid"
            ? "Pembayaran berhasil dan e-ticket telah diterbitkan!"
            : "Pesanan berhasil dibuat, silakan lakukan pembayaran.",
        data: {
          order_id,
          order_code,
          total_amount: grandTotal,
          status: orderStatus,
          tickets: generatedTickets,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    await connection.rollback();
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat pesanan", error: error.message },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
