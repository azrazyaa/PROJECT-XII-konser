import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await pool.getConnection();

    await connection.ping();

    connection.release();

    return NextResponse.json({
      success: true,
      message: "Berhasil terhubung ke database!",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal terhubung ke database",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
