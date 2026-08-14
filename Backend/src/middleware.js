    import { NextResponse } from "next/server";
    import { jwtVerify } from "jose"; // jose bawaan/kompatibel dengan Next.js Edge Runtime

    export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // 1. Proteksi Endpoint Admin (misal: POST, PUT, DELETE di /api/events)
    if (pathname.startsWith("/api/events") && request.method !== "GET") {
        const authHeader = request.headers.get("authorization");

        // Cek apakah ada Header Authorization "Bearer <token>"
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { success: false, message: "Akses ditolak, token tidak ditemukan" },
            { status: 401 },
        );
        }

        const token = authHeader.split(" ")[1];

        try {
        // Verifikasi token JWT
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || "konserdb123",
        );
        const { payload } = await jwtVerify(token, secret);

        // Cek apakah Role-nya Admin
        if (payload.role !== "admin") {
            return NextResponse.json(
            {
                success: false,
                message: "Akses ditolak, hanya Admin yang diizinkan",
            },
            { status: 403 },
            );
        }
        } catch (error) {
        return NextResponse.json(
            { success: false, message: "Token tidak valid atau sudah kadaluwarsa" },
            { status: 401 },
        );
        }
    }

    return NextResponse.next();
    }

    // Tentukan route mana saja yang perlu dilewati oleh Middleware ini
    export const config = {
    matcher: ["/api/events/:path*"],
    };
