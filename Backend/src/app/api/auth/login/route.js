import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // 1. Validasi input sederhana
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password wajib diisi" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 2. Cari user di database berdasarkan email
    const [users] = await db.query(
      "SELECT id, name, email, password, role, avatar_url FROM users WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah" },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    const user = users[0];

    // 3. Cek password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah" },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    // 4. Generate JWT Token
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET || "konserdb123",
      { expiresIn: "1d" }
    );

    // 5. Kirim response sukses beserta Token & Info Role
    return NextResponse.json(
      {
        success: true,
        message: "Login berhasil",
        data: {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar_url: user.avatar_url || null,
          },
        },
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
        error: error.message,
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
