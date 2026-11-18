import { NextResponse } from "next/server";
import db from "@/lib/db";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

// GET: Ambil detail artis beserta daftar konser yang dibintanginya
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const [artists] = await db.query(
      "SELECT id, name, genre, photo_url, photo_url AS image_url, created_at FROM artists WHERE id = ?",
      [id]
    );

    if (!artists || artists.length === 0) {
      return NextResponse.json(
        { success: false, message: "Artis tidak ditemukan" },
        { status: 404, headers: CORS_HEADERS }
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
        COALESCE(MIN(tc.price), 0) AS min_price,
        COALESCE(MIN(tc.price), 0) AS starting_price
      FROM events e
      LEFT JOIN ticket_categories tc ON tc.event_id = e.id AND tc.is_locked = 0
      WHERE e.artist_id = ?
      GROUP BY e.id
      ORDER BY e.event_date ASC`,
      [id]
    );

    const formattedEvents = events.map((ev) => ({
      ...ev,
      id: Number(ev.id),
      min_price: Number(ev.min_price) || 0,
      starting_price: Number(ev.starting_price) || 0,
    }));

    return NextResponse.json(
      {
        success: true,
        data: {
          ...artist,
          events: formattedEvents,
          concerts: formattedEvents,
        },
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("GET /api/artists/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data artis",
        error: error.message,
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
