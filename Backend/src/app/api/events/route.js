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
            e.is_closed,
            a.name AS artist_name,
            a.genre AS artist_genre
        FROM events e
        JOIN artists a ON e.artist_id = a.id
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
        const { artist_id, title, description, venue, event_date, banner_url } =
        await request.json();

        if (!artist_id || !title || !venue || !event_date) {
        return NextResponse.json(
            {
            success: false,
            message: "Artist, Judul, Lokasi, dan Tanggal Konser wajib diisi",
            },
            { status: 400 },
        );
        }

        const [result] = await db.query(
        `INSERT INTO events (artist_id, title, description, venue, event_date, banner_url) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            artist_id,
            title,
            description || "",
            venue,
            event_date,
            banner_url || "",
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
