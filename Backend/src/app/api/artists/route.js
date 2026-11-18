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

// GET: Ambil semua artis beserta jumlah konser aktifnya
export async function GET() {
  try {
    const query = `
      SELECT 
        a.id,
        a.name,
        COALESCE(a.genre, 'Music') AS genre,
        COALESCE(a.photo_url, '') AS photo_url,
        COALESCE(a.photo_url, '') AS image_url,
        a.created_at,
        COUNT(e.id) AS concert_count
      FROM artists a
      LEFT JOIN events e ON e.artist_id = a.id AND e.is_closed = 0
      GROUP BY a.id
      ORDER BY concert_count DESC, a.name ASC
    `;

    const [rows] = await db.query(query);

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mengambil daftar artis",
        data: rows,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("GET /api/artists error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil daftar artis",
        error: error.message,
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
