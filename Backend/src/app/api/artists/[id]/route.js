import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET: Ambil detail artis beserta daftar konser yang dibintanginya
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const [artists] = await db.query(
      "SELECT id, name, genre, photo_url, created_at FROM artists WHERE id = ?",
      [id]
    );

    if (!artists || artists.length === 0) {
      return NextResponse.json(
        { success: false, message: "Artis tidak ditemukan" },
        { status: 404 }
      );
    }

    const artist = artists[0];

    // Ambil semua konser artis ini
    const [events] = await db.query(
      `SELECT 
        e.id,
        e.title,
        e.description,
        e.venue,
        e.event_date,
        e.banner_url,
        e.stage_layout,
        e.total_quota,
        e.is_closed,
        COALESCE(MIN(tc.price), 0) AS starting_price
      FROM events e
      LEFT JOIN ticket_categories tc ON tc.event_id = e.id
      WHERE e.artist_id = ?
      GROUP BY e.id
      ORDER BY e.event_date ASC`,
      [id]
    );

    return NextResponse.json({
      success: true,
      data: {
        ...artist,
        events,
      },
    });
  } catch (error) {
    console.error("GET /api/artists/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data artis",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
