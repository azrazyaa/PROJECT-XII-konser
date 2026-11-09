import { NextResponse } from "next/server";
import db from "@/lib/db";

// 1. GET: Ambil detail kategori tiket berdasarkan ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const query = `
      SELECT 
        tc.id,
        tc.event_id,
        tc.name,
        tc.price,
        tc.quota,
        tc.is_locked,
        tc.created_at,
        COALESCE(SUM(od.qty), 0) AS sold
      FROM ticket_categories tc
      LEFT JOIN order_details od ON tc.id = od.ticket_category_id
      LEFT JOIN orders o ON od.order_id = o.id AND o.status IN ('paid', 'pending')
      WHERE tc.id = ?
      GROUP BY tc.id
    `;

    const [rows] = await db.query(query, [id]);

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Kategori tiket tidak ditemukan" },
        { status: 404 }
      );
    }

    const r = rows[0];
    const ticket = {
      ...r,
      price: Number(r.price),
      quota: Number(r.quota),
      sold: Number(r.sold),
      locked: Boolean(r.is_locked),
    };

    return NextResponse.json({
      success: true,
      message: "Berhasil mengambil detail tiket",
      data: ticket,
    });
  } catch (error) {
    console.error("GET /api/tickets/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data tiket", error: error.message },
      { status: 500 }
    );
  }
}

// 2. PUT: Update Kategori Tiket (Bisa update name, price, quota, dan/atau is_locked)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, price, quota, is_locked } = body;

    // Ambil data tiket saat ini dulu
    const [existing] = await db.query(
      `SELECT * FROM ticket_categories WHERE id = ?`,
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, message: "Kategori tiket tidak ditemukan" },
        { status: 404 }
      );
    }

    const current = existing[0];

    const updatedName = name !== undefined ? name.trim() : current.name;
    const updatedPrice = price !== undefined ? Number(price) : current.price;
    const updatedQuota = quota !== undefined ? Number(quota) : current.quota;
    const updatedLocked =
      is_locked !== undefined ? (is_locked ? 1 : 0) : current.is_locked;

    await db.query(
      `UPDATE ticket_categories 
       SET name = ?, price = ?, quota = ?, is_locked = ?
       WHERE id = ?`,
      [updatedName, updatedPrice, updatedQuota, updatedLocked, id]
    );

    return NextResponse.json({
      success: true,
      message: "Berhasil memperbarui kategori tiket",
      data: {
        id: Number(id),
        event_id: current.event_id,
        name: updatedName,
        price: Number(updatedPrice),
        quota: Number(updatedQuota),
        locked: Boolean(updatedLocked),
      },
    });
  } catch (error) {
    console.error("PUT /api/tickets/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui tiket", error: error.message },
      { status: 500 }
    );
  }
}

// 3. DELETE: Hapus Kategori Tiket
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const [result] = await db.query(
      "DELETE FROM ticket_categories WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Kategori tiket tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil menghapus kategori tiket",
    });
  } catch (error) {
    console.error("DELETE /api/tickets/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus tiket", error: error.message },
      { status: 500 }
    );
  }
}

