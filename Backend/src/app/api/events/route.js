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

// 1. GET: Ambil Semua Daftar Konser
export async function GET() {
  try {
    const query = `
      SELECT
        e.id,
        e.title,
        e.description,
        e.venue,
        e.event_date,
        e.banner_url,
        e.stage_layout,
        e.total_quota,
        e.is_closed,
        e.artist_id,
        COALESCE(a.name, 'Unknown Artist') AS artist_name,
        COALESCE(a.genre, 'Music') AS artist_genre,
        COALESCE(a.photo_url, '') AS artist_photo_url,
        (
          SELECT MIN(tc.price)
          FROM ticket_categories tc
          WHERE tc.event_id = e.id AND tc.is_locked = 0
        ) AS min_price,
        (
          SELECT COALESCE(SUM(tc.quota), 0)
          FROM ticket_categories tc
          WHERE tc.event_id = e.id
        ) AS total_ticket_quota
      FROM events e
      LEFT JOIN artists a ON e.artist_id = a.id
      ORDER BY e.created_at DESC
    `;

    const [events] = await db.query(query);

    const formattedEvents = events.map((ev) => ({
      ...ev,
      id: Number(ev.id),
      artist_id: ev.artist_id ? Number(ev.artist_id) : undefined,
      min_price: ev.min_price !== null ? Number(ev.min_price) : 0,
      total_quota:
        Number(ev.total_quota) || Number(ev.total_ticket_quota) || 0,
      is_closed: Boolean(ev.is_closed),
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mengambil daftar konser",
        data: formattedEvents,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data", error: error.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// 2. POST: Tambah Konser Baru (Khusus Admin)
//    Otomatis membuat ticket_categories sesuai template layout panggung
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      artist_id,
      artist_name,
      title,
      description,
      venue,
      event_date,
      banner_url,
      stage_layout,
      total_quota,
    } = body;

    let finalArtistId = artist_id;

    // Jika admin memasukkan nama artist manual
    if (artist_name && typeof artist_name === "string" && artist_name.trim()) {
      const trimmedArtist = artist_name.trim();
      const [existing] = await db.query(
        "SELECT id FROM artists WHERE LOWER(name) = LOWER(?) LIMIT 1",
        [trimmedArtist]
      );

      if (existing && existing.length > 0) {
        finalArtistId = existing[0].id;
      } else {
        const [inserted] = await db.query(
          "INSERT INTO artists (name, genre) VALUES (?, 'Music')",
          [trimmedArtist]
        );
        finalArtistId = inserted.insertId;
      }
    }

    if (!finalArtistId || !title || !venue || !event_date) {
      return NextResponse.json(
        {
          success: false,
          message: "Artist, Judul, Lokasi, dan Tanggal Konser wajib diisi",
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const finalLayout = stage_layout || "Main Stage";

    const [result] = await db.query(
      `INSERT INTO events (artist_id, title, description, venue, event_date, banner_url, stage_layout, total_quota) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        finalArtistId,
        title,
        description || "",
        venue,
        event_date,
        banner_url || "",
        finalLayout,
        parseInt(total_quota, 10) || 0,
      ]
    );

    const newEventId = result.insertId;

    // Otomatis sinkronisasi Ticket Classes berdasarkan template layout panggung
    await syncEventTicketCategories(db, newEventId, finalLayout);

    return NextResponse.json(
      {
        success: true,
        message:
          "Berhasil menambah konser baru. Kategori tiket otomatis dibuat sesuai template layout panggung.",
        data: { id: newEventId, title, venue, stage_layout: finalLayout },
      },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menambah konser",
        error: error.message,
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
