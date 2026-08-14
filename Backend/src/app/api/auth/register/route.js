import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

// Handle preflight CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3001",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    console.log("Data diterima:", { name, email });

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama, email, dan password wajib diisi",
        },
        { status: 400 },
      );
    }

    // Tes koneksi database
    await db.query("SELECT 1");

    // Cek email
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Email sudah terdaftar",
        },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, "customer"],
    );

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil",
        userId: result.insertId,
      },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      },
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
        error: error.message,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      },
    );
  }
}
