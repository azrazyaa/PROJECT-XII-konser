    import { NextResponse } from "next/server";
    import db from "@/lib/db";

    // 1. PUT: Update Data Konser
    export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const {
        artist_id,
        title,
        description,
        venue,
        event_date,
        banner_url,
        is_closed,
        } = await request.json();

        const [result] = await db.query(
        `UPDATE events 
        SET artist_id = ?, title = ?, description = ?, venue = ?, event_date = ?, banner_url = ?, is_closed = ?
        WHERE id = ?`,
        [
            artist_id,
            title,
            description,
            venue,
            event_date,
            banner_url,
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
