    import { NextResponse } from 'next/server';
    import db from '@/lib/db';

    export async function POST(request) {
    // Ambil koneksi khusus untuk memulai Transaction
    const connection = await db.getConnection();

    try {
        const { user_id, ticket_category_id, qty } = await request.json();

        if (!user_id || !ticket_category_id || !qty || qty <= 0) {
        return NextResponse.json(
            { success: false, message: 'Data pemesanan tidak valid' },
            { status: 400 }
        );
        }

        // --- MULAI DATABASE TRANSACTION ---
        await connection.beginTransaction();

        // 1. Cek & Potong Kuota secara ATOMIC (Pencegahan Race Condition / War Ticket)
        const [updateResult] = await connection.query(
        `UPDATE ticket_categories 
        SET quota = quota - ? 
        WHERE id = ? AND quota >= ?`,
        [qty, ticket_category_id, qty]
        );

        // Jika affectedRows === 0, artinya kuota tiket sudah habis / kalah cepat!
        if (updateResult.affectedRows === 0) {
        await connection.rollback(); // Batalkan semua proses
        return NextResponse.json(
            { success: false, message: 'Maaf, kuota tiket sudah habis atau tidak mencukupi!' },
            { status: 400 }
        );
        }

        // 2. Ambil harga tiket per kategori
        const [categories] = await connection.query(
        'SELECT price FROM ticket_categories WHERE id = ?',
        [ticket_category_id]
        );
        const price = categories[0].price;
        const total_amount = price * qty;

        // 3. Buat Kode Order Unik (misal: ORD-1722680000) & Waktu Expired (15 Menit)
        const order_code = `ORD-${Date.now()}`;
        const expired_at = new Date(Date.now() + 15 * 60 * 1000); // +15 menit untuk automatic expiration

        // 4. Insert ke tabel Orders
        const [orderResult] = await connection.query(
        `INSERT INTO orders (user_id, order_code, total_amount, status, expired_at) 
        VALUES (?, ?, ?, 'pending', ?)`,
        [user_id, order_code, total_amount, expired_at]
        );

        const order_id = orderResult.insertId;

        // 5. Insert ke tabel Order Details
        await connection.query(
        `INSERT INTO order_details (order_id, ticket_category_id, qty, subtotal) 
        VALUES (?, ?, ?, ?)`,
        [order_id, ticket_category_id, qty, total_amount]
        );

        // --- COMMIT TRANSACTION (Semua query sukses disimpan) ---
        await connection.commit();

        return NextResponse.json(
        {
            success: true,
            message: 'Pemesanan berhasil dibuat, silakan lakukan pembayaran',
            data: {
            order_id,
            order_code,
            total_amount,
            expired_at,
            },
        },
        { status: 201 }
        );
    } catch (error) {
        // Jika ada error apapun, batalkan perubahan database!
        await connection.rollback();
        return NextResponse.json(
        { success: false, message: 'Gagal membuat pesanan', error: error.message },
        { status: 500 }
        );
    } finally {
        // Lepaskan koneksi kembali ke pool
        connection.release();
    }
    }