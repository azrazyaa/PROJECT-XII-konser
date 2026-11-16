import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// GET: Ambil detail profil user berdasarkan ID atau Token
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let userId = searchParams.get("id");

    // Jika id tidak dikirim di query, coba verifikasi dari Bearer Token
    if (!userId) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "konserdb123"
          );
          userId = decoded.id;
        } catch (err) {
          // Token invalid, ignore
        }
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID diperlukan" },
        { status: 400 }
      );
    }

    const [users] = await db.query(
      "SELECT id, name, email, role, avatar_url, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: users[0],
    });
  } catch (error) {
    console.error("GET Profile Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data profil", error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update profil user (Username, Email, Password, Avatar URL)
export async function PUT(request) {
  try {
    const body = await request.json();
    let { id, name, email, password, avatar_url } = body;

    // Jika id tidak ada di body, coba cek token
    if (!id) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "konserdb123"
          );
          id = decoded.id;
        } catch (err) {
          // Token invalid
        }
      }
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID wajib disertakan" },
        { status: 400 }
      );
    }

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Username / Nama dan Email wajib diisi" },
        { status: 400 }
      );
    }

    // 1. Cek apakah user ada
    const [existingUsers] = await db.query(
      "SELECT id, name, email, role, avatar_url FROM users WHERE id = ?",
      [id]
    );

    if (existingUsers.length === 0) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const currentUser = existingUsers[0];

    // 2. Cek apakah email bentrok dengan user lain
    const [emailConflict] = await db.query(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, id]
    );

    if (emailConflict.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email sudah digunakan oleh akun lain" },
        { status: 400 }
      );
    }

    // 3. Update query (dengan atau tanpa ganti password)
    const cleanAvatar = avatar_url && avatar_url.trim() ? avatar_url.trim() : null;

    if (password && password.trim().length > 0) {
      if (password.trim().length < 5) {
        return NextResponse.json(
          { success: false, message: "Password minimal 5 karakter" },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(password.trim(), 10);
      await db.query(
        "UPDATE users SET name = ?, email = ?, password = ?, avatar_url = ? WHERE id = ?",
        [name.trim(), email.trim(), hashedPassword, cleanAvatar, id]
      );
    } else {
      await db.query(
        "UPDATE users SET name = ?, email = ?, avatar_url = ? WHERE id = ?",
        [name.trim(), email.trim(), cleanAvatar, id]
      );
    }

    // 4. Generate token baru dengan data terupdate
    const newToken = jwt.sign(
      { id: currentUser.id, name: name.trim(), role: currentUser.role },
      process.env.JWT_SECRET || "konserdb123",
      { expiresIn: "1d" }
    );

    return NextResponse.json({
      success: true,
      message: "Profil admin berhasil diperbarui!",
      data: {
        token: newToken,
        user: {
          id: currentUser.id,
          name: name.trim(),
          email: email.trim(),
          role: currentUser.role,
          avatar_url: cleanAvatar,
        },
      },
    });
  } catch (error) {
    console.error("PUT Profile Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server saat memperbarui profil",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

