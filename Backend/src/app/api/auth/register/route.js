import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle preflight CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama, email, dan password wajib diisi",
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Cek format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Format email tidak valid",
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password minimal 6 karakter",
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Cek apakah email sudah terdaftar
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existingUser && existingUser.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Email sudah terdaftar, silakan gunakan email lain atau login",
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user baru dengan role 'customer'
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name.trim(), email.trim().toLowerCase(), hashedPassword, "customer"]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil! Silakan login.",
        userId: result.insertId,
        data: {
          id: result.insertId,
          name: name.trim(),
          email: email.trim().toLowerCase(),
        },
      },
      {
        status: 201,
        headers: CORS_HEADERS,
      }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server saat registrasi",
        error: error.message,
      },
      {
        status: 500,
        headers: CORS_HEADERS,
      }
    );
  }
}
