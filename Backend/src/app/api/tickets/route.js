import { NextResponse } from "next/server";
import db from "@/lib/db";

// 1. GET: Ambil daftar kategori tiket berdasarkan event_id atau semua tiket
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("event_id");

    let query = `
      SELECT 
        tc.id,
        tc.event_id,
        tc.name,
        tc.price,
        tc.quota,
        tc.is_locked,
        tc.created_at,
        COALESCE(SUM(od.qty), 0) AS sold
      FROM ticket_categories tc
      LEFT JOIN order_details od ON tc.id = od.ticket_category_id
      LEFT JOIN orders o ON od.order_id = o.id AND o.status IN ('paid', 'pending')
    `;

    const params = [];
    if (eventId) {
      query += ` WHERE tc.event_id = ?`;
      params.push(eventId);
    }

    query += ` GROUP BY tc.id ORDER BY tc.price DESC, tc.id ASC`;

    const [rows] = await db.query(query, params);

    // Format boolean / number
    const formatted = rows.map((r) => ({
      ...r,
      price: Number(r.price),
      quota: Number(r.quota),
      sold: Number(r.sold),
      locked: Boolean(r.is_locked),
    }));

    return NextResponse.json({
      success: true,
      message: "Berhasil mengambil data kategori tiket",
      data: formatted,
    });
  } catch (error) {
    console.error("GET /api/tickets error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data tiket", error: error.message },
      { status: 500 }
    );
  }
}

// 2. POST: Tambah kategori tiket baru
export async function POST(request) {
  try {
    const { event_id, name, price, quota, is_locked } = await request.json();

    if (!event_id || !name || price === undefined || quota === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Event ID, nama kategori, harga, dan kuota wajib diisi",
        },
        { status: 400 }
      );
    }

    const lockedVal = is_locked ? 1 : 0;

    const [result] = await db.query(
      `INSERT INTO ticket_categories (event_id, name, price, quota, is_locked)
       VALUES (?, ?, ?, ?, ?)`,
      [event_id, name.trim(), Number(price), Number(quota), lockedVal]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil menambahkan kategori tiket",
        data: {
          id: result.insertId,
          event_id: Number(event_id),
          name: name.trim(),
          price: Number(price),
          quota: Number(quota),
          sold: 0,
          locked: Boolean(lockedVal),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/tickets error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menambahkan kategori tiket",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

