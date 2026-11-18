import { NextResponse } from "next/server";
import db from "@/lib/db";
import { syncEventTicketCategories } from "@/lib/stageTemplates";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

// 1. GET: Ambil Detail Konser berdasarkan ID (Untuk Mobile & Web)
export async function GET(request, { params }) {
  try {
    const { id } = await params;

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
        COALESCE(a.photo_url, '') AS artist_image_url,
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
      WHERE e.id = ?
      LIMIT 1
    `;

    const [events] = await db.query(query, [id]);

    if (!events || events.length === 0) {
      return NextResponse.json(
        { success: false, message: "Data konser tidak ditemukan" },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    const event = events[0];

    const formattedEvent = {
      ...event,
      id: Number(event.id),
      artist_id: event.artist_id ? Number(event.artist_id) : undefined,
      min_price: event.min_price !== null ? Number(event.min_price) : 0,
      total_quota:
        Number(event.total_quota) || Number(event.total_ticket_quota) || 0,
      is_closed: Boolean(event.is_closed),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mengambil detail konser",
        data: formattedEvent,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("GET /api/events/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data konser", error: error.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// 2. PUT: Update Data Konser
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
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
      is_closed,
    } = await request.json();

    let finalArtistId = artist_id;
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

    const finalLayout = stage_layout || "Main Stage";

    const [result] = await db.query(
      `UPDATE events 
      SET artist_id = COALESCE(?, artist_id), title = ?, description = ?, venue = ?, event_date = ?, banner_url = ?, stage_layout = ?, total_quota = ?, is_closed = ?
      WHERE id = ?`,
      [
        finalArtistId,
        title,
        description,
        venue,
        event_date,
        banner_url,
        finalLayout,
        parseInt(total_quota, 10) || 0,
        is_closed ?? 0,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Data konser tidak ditemukan" },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    // Selalu sinkronisasikan kategori tiket dengan layout panggung terkini
    await syncEventTicketCategories(db, Number(id), finalLayout);

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil memperbarui data konser dan menyelaraskan kategori tiket.",
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("PUT /api/events/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengubah data", error: error.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// 3. DELETE: Hapus Konser
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const [result] = await db.query("DELETE FROM events WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Data konser tidak ditemukan" },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil menghapus konser",
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus data", error: error.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
