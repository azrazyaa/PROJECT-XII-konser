import { NextResponse } from "next/server";
import db from "@/lib/db";
import { syncEventTicketCategories } from "@/lib/stageTemplates";

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

// 1. GET: Ambil daftar kategori tiket berdasarkan event_id atau semua tiket
//    Jika ada event_id, otomatis pastikan kategori selaras dengan layout panggung event tersebut.
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("event_id");

    if (eventId) {
      // Ambil stage_layout event untuk memastikan auto-sync
      const [events] = await db.query(
        "SELECT id, stage_layout FROM events WHERE id = ?",
        [eventId]
      );

      if (events && events.length > 0) {
        const layout = events[0].stage_layout || "Main Stage";
        await syncEventTicketCategories(db, Number(eventId), layout);
      }
    }

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
      id: Number(r.id),
      event_id: Number(r.event_id),
      price: Number(r.price),
      quota: Number(r.quota),
      sold: Number(r.sold),
      locked: Boolean(r.is_locked),
      is_locked: Boolean(r.is_locked),
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mengambil data kategori tiket",
        data: formatted,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("GET /api/tickets error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data tiket", error: error.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// 2. POST: Tambah kategori tiket baru
export async function POST(request) {
  try {
    const { event_id, name, price, quota, is_locked } = await request.json();

    const cleanPrice =
      typeof price === "string" ? Number(price.replace(/[^0-9]/g, "")) : Number(price);
    const cleanQuota =
      typeof quota === "string" ? Number(quota.replace(/[^0-9]/g, "")) : Number(quota);

    if (!event_id || !name || isNaN(cleanPrice) || isNaN(cleanQuota)) {
      return NextResponse.json(
        {
          success: false,
          message: "Event ID, nama kategori, harga, dan kuota wajib diisi",
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const lockedVal = is_locked ? 1 : 0;

    const [result] = await db.query(
      `INSERT INTO ticket_categories (event_id, name, price, quota, is_locked)
       VALUES (?, ?, ?, ?, ?)`,
      [event_id, name.trim(), cleanPrice, cleanQuota, lockedVal]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil menambahkan kategori tiket",
        data: {
          id: result.insertId,
          event_id: Number(event_id),
          name: name.trim(),
          price: cleanPrice,
          quota: cleanQuota,
          sold: 0,
          locked: Boolean(lockedVal),
          is_locked: Boolean(lockedVal),
        },
      },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("POST /api/tickets error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menambahkan kategori tiket",
        error: error.message,
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
