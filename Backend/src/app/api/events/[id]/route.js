    import { NextResponse } from "next/server";
    import db from "@/lib/db";

    // 1. PUT: Update Data Konser
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
            stage_layout || "Main Stage",
            parseInt(total_quota, 10) || 0,
            is_closed ?? 0,
            id,
        ],
        );

        if (result.affectedRows === 0) {
        return NextResponse.json(
            { success: false, message: "Data konser tidak ditemukan" },
            { status: 404 },
        );
        }

        return NextResponse.json({
        success: true,
        message: "Berhasil memperbarui data konser",
        });
    } catch (error) {
        return NextResponse.json(
        { success: false, message: "Gagal mengubah data", error: error.message },
        { status: 500 },
        );
    }
    }

    // 2. DELETE: Hapus Konser
    export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        const [result] = await db.query("DELETE FROM events WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
        return NextResponse.json(
            { success: false, message: "Data konser tidak ditemukan" },
            { status: 404 },
        );
        }

        return NextResponse.json({
        success: true,
        message: "Berhasil menghapus konser",
        });
    } catch (error) {
        return NextResponse.json(
        { success: false, message: "Gagal menghapus data", error: error.message },
        { status: 500 },
        );
    }
    }
