import { NextResponse } from "next/server";
import db from "@/lib/db";

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

// POST: Scan dan validasi QR Code tiket (Mendukung ticket_code maupun order_code)
export async function POST(request) {
  try {
    const body = await request.json();
    const rawCode = body.ticket_code || body.code || body.ticketId || "";

    if (!rawCode || !String(rawCode).trim()) {
      return NextResponse.json(
        { success: false, message: "Kode tiket wajib disertakan" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const code = String(rawCode).trim();

    // Query tiket dengan relasi lengkap ke detail, kategori, event, order, dan user
    const [rows] = await db.query(
      `SELECT 
        t.id AS ticket_id,
        t.ticket_code,
        t.is_used,
        t.scanned_at,
        tc.name AS category_name,
        tc.price AS category_price,
        e.id AS event_id,
        e.title AS event_title,
        e.venue AS event_venue,
        e.event_date,
        o.order_code,
        o.status AS order_status,
        COALESCE(u.name, 'Pemegang Tiket') AS customer_name,
        COALESCE(u.email, '-') AS customer_email
      FROM tickets t
      JOIN order_details od ON t.order_detail_id = od.id
      JOIN ticket_categories tc ON od.ticket_category_id = tc.id
      JOIN events e ON tc.event_id = e.id
      JOIN orders o ON od.order_id = o.id
      LEFT JOIN users u ON o.user_id = u.id
      WHERE UPPER(t.ticket_code) = UPPER(?) OR UPPER(o.order_code) = UPPER(?)
      ORDER BY t.is_used ASC, t.id ASC
      LIMIT 1`,
      [code, code]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          not_found: true,
          status: "not_found",
          message: `ID Tiket "${code}" tidak terdaftar dalam database konser.`,
        },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    const ticket = rows[0];

    // Cek apakah tiket sudah pernah digunakan
    if (ticket.is_used === 1) {
      const scannedDateStr = ticket.scanned_at
        ? new Date(ticket.scanned_at).toLocaleString("id-ID") + " WIB"
        : "sesi sebelumnya";

      return NextResponse.json(
        {
          success: false,
          already_used: true,
          status: "already_used",
          message: `Tiket sudah pernah di-scan pada ${scannedDateStr}`,
          data: ticket,
          ticket: ticket,
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // Update status tiket menjadi used
    const now = new Date();
    await db.query(
      "UPDATE tickets SET is_used = 1, scanned_at = ? WHERE id = ?",
      [now, ticket.ticket_id]
    );

    const verifiedTicket = {
      ...ticket,
      is_used: 1,
      scanned_at: now,
    };

    return NextResponse.json(
      {
        success: true,
        status: "success",
        message: "Tiket VALID. Check-in penonton berhasil!",
        data: verifiedTicket,
        ticket: verifiedTicket,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("POST /api/scan error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memproses validasi tiket",
        error: error.message,
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
