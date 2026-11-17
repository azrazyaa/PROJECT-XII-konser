import { NextResponse } from "next/server";
import db from "@/lib/db";

// POST: Scan dan validasi QR Code tiket
export async function POST(request) {
  try {
    const body = await request.json();
    const { ticket_code } = body;

    if (!ticket_code || !ticket_code.trim()) {
      return NextResponse.json(
        { success: false, message: "Kode tiket wajib disertakan" },
        { status: 400 }
      );
    }

    const code = ticket_code.trim();

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
        u.name AS customer_name,
        u.email AS customer_email
      FROM tickets t
      JOIN order_details od ON t.order_detail_id = od.id
      JOIN ticket_categories tc ON od.ticket_category_id = tc.id
      JOIN events e ON tc.event_id = e.id
      JOIN orders o ON od.order_id = o.id
      JOIN users u ON o.user_id = u.id
      WHERE t.ticket_code = ?`,
      [code]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Tiket tidak terdaftar dalam database Nocturne.",
        },
        { status: 404 }
      );
    }

    const ticket = rows[0];

    // Cek apakah tiket sudah pernah digunakan
    if (ticket.is_used === 1) {
      return NextResponse.json(
        {
          success: false,
          already_used: true,
          message: `Tiket sudah pernah di-scan pada ${new Date(
            ticket.scanned_at
          ).toLocaleString("id-ID")}`,
          data: ticket,
        },
        { status: 400 }
      );
    }

    // Update status tiket menjadi used
    const now = new Date();
    await db.query(
      "UPDATE tickets SET is_used = 1, scanned_at = ? WHERE id = ?",
      [now, ticket.ticket_id]
    );

    return NextResponse.json({
      success: true,
      message: "Tiket VALID. Check-in penonton berhasil!",
      data: {
        ...ticket,
        is_used: 1,
        scanned_at: now,
      },
    });
  } catch (error) {
    console.error("POST /api/scan error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memproses validasi tiket",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
