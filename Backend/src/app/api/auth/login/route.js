    import { NextResponse } from "next/server";
    import db from "@/lib/db";
    import bcrypt from "bcryptjs";
    import jwt from "jsonwebtoken";

    export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // 1. Validasi input sederhana
        if (!email || !password) {
        return NextResponse.json(
            { success: false, message: "Email dan password wajib diisi" },
            { status: 400 },
        );
        }

        // 2. Cari user di database berdasarkan email
        const [users] = await db.query(
        "SELECT id, name, email, password, role FROM users WHERE email = ?",
        [email],
        );

        if (users.length === 0) {
        return NextResponse.json(
            { success: false, message: "Email atau password salah" },
            { status: 401 },
        );
        }

        const user = users[0];

        // 3. Cek password dengan bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return NextResponse.json(
            { success: false, message: "Email atau password salah" },
            { status: 401 },
        );
        }

        // 4. Generate JWT Token menggunakan 'konserdb123'
        const token = jwt.sign(
        { id: user.id, name: user.name, role: user.role },
        process.env.JWT_SECRET || "konserdb123",
        { expiresIn: "1d" }, // Token berlaku 1 hari
        );

        // 5. Kirim response sukses beserta Token & Info Role
        return NextResponse.json({
        success: true,
        message: "Login berhasil",
        data: {
            token,
            user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, // Membedakan admin & customer
            },
        },
        });
    } catch (error) {
        return NextResponse.json(
        {
            success: false,
            message: "Terjadi kesalahan server",
            error: error.message,
        },
        { status: 500 },
        );
    }
    }
