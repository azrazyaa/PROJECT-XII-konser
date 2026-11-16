import { NextResponse } from "next/server";
import db from "@/lib/db";

// 1. GET: Ambil Semua Daftar Konser (Bisa diakses Publik/Mobile/Web)
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
        COALESCE(a.name, 'Unknown Artist') AS artist_name,
        COALESCE(a.genre, 'Music') AS artist_genre
      FROM events e
      LEFT JOIN artists a ON e.artist_id = a.id
      ORDER BY e.created_at DESC
    `;

    const [events] = await db.query(query);

    return NextResponse.json({
      success: true,
      message: "Berhasil mengambil daftar konser",
      data: events,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data", error: error.message },
      { status: 500 },
    );
  }
}

// 2. POST: Tambah Konser Baru (Khusus Admin)
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
        { status: 400 },
      );
    }

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
        stage_layout || "Main Stage",
        parseInt(total_quota, 10) || 0,
      ],
    );

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil menambah konser baru",
        data: { id: result.insertId, title, venue },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menambah konser",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
