"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import AdminProfileModal from "@/components/AdminProfileModal";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import {
  Bell,
  BarChart3,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  FlipHorizontal,
  Inbox,
  LayoutDashboard,
  MapPin,
  QrCode,
  RotateCw,
  ScanLine,
  Search,
  Settings,
  ShieldCheck,
  Tag,
  Ticket,
  User,
  X,
  XCircle,
  AlertTriangle,
} from "lucide-react";

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* MOBILE OVERLAY */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[290px] flex-col border-r border-purple-500/20 bg-[#0d0b1c] transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* LOGO */}
        <div className="flex h-[98px] items-center border-b border-white/[0.06] px-7">
          <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-700 to-purple-950 text-2xl text-white">
            ◕
          </div>

          <div>
            <div className="text-[16px] font-bold tracking-wide text-purple-100">
              NOCTURNE
            </div>
            <div className="text-sm text-zinc-500">Admin Portal</div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="ml-auto text-zinc-400 lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* MAIN MENU */}
        <div className="px-5 pt-9">
          <p className="mb-4 px-3 text-xs font-bold tracking-[0.13em] text-zinc-500">
            MAIN MENU
          </p>

          <nav className="space-y-1.5">
            {/* DASHBOARD */}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <LayoutDashboard size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Dashboard</span>
            </Link>

            {/* EVENT */}
            <Link
              href="/admin/event"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <Ticket size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Event CRUD</span>
            </Link>

            {/* TICKET */}
            <Link
              href="/admin/ticket"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <Tag size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">
                Ticket Classes & Quota
              </span>
            </Link>

            {/* VERIFY PAYMENTS */}
            <Link
              href="/admin/payment"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <ShieldCheck size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Verify Payments</span>
            </Link>

            {/* QR SCANNER ACTIVE */}
            <Link
              href="/admin/scanner"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg border-l-2 border-purple-500 bg-purple-900/20 px-3 py-3.5 text-zinc-100"
            >
              <QrCode size={19} strokeWidth={1.8} className="text-purple-400" />
              <span className="text-[15px] font-medium">QR Ticket Scanner</span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
            </Link>

            {/* REPORT */}
            <Link
              href="/admin/reports"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <BarChart3 size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Sales Reports</span>
            </Link>
          </nav>
        </div>

        {/* SYSTEM SETTINGS */}
        <div className="mt-auto p-5">
          <button className="flex w-full items-center gap-4 rounded-lg bg-[#100d20] px-3 py-3.5 text-left transition hover:bg-[#17112a]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-950 text-purple-400">
              <Settings size={18} />
            </div>

            <div>
              <div className="text-sm font-medium text-zinc-200">
                System Settings
              </div>
              <div className="text-xs text-zinc-500">v2.4.1</div>
            </div>

            <span className="ml-auto h-2 w-2 rounded-full bg-amber-500" />
          </button>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   TOPBAR
========================================================= */

function Topbar({ setOpen }) {
  const [adminUser, setAdminUser] = useState({
    name: "Admin",
    email: "admin@konser.com",
    role: "admin",
    avatar_url: null,
  });
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const loadUserData = () => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.name || parsed.email)) {
          setAdminUser({
            name: parsed.name || "Admin",
            email: parsed.email || "admin@konser.com",
            role: parsed.role || "admin",
            avatar_url: parsed.avatar_url || null,
            id: parsed.id,
          });
        }
      }
    } catch (e) {
      console.error("Error reading admin user from localStorage:", e);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const initial = adminUser?.name ? adminUser.name.trim().charAt(0).toUpperCase() : "A";
  const displayName = adminUser?.name || "Admin";
  const displayEmail = adminUser?.email || "admin@konser.com";
  const displayRole = adminUser?.role === "admin" ? "SYSTEM ADMIN" : (adminUser?.role?.toUpperCase() || "ADMIN");

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-30 h-[66px] border-b border-white/[0.06] bg-[#090714]/90 backdrop-blur-xl lg:left-[290px]">
        <div className="flex h-full items-center px-5 sm:px-7">
          <button
            onClick={() => setOpen(true)}
            className="mr-4 text-zinc-300 lg:hidden"
          >
            <QrCode size={22} />
          </button>

          <div className="ml-auto flex items-center gap-5">
            <button className="relative text-zinc-400 transition hover:text-zinc-200">
              <Bell size={21} />
              <span className="absolute -right-1 -top-2 h-2.5 w-2.5 rounded-full border border-[#0a0815] bg-amber-500" />
            </button>

            <button className="relative text-zinc-400 transition hover:text-zinc-200">
              <Inbox size={21} />
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1 text-[10px] font-bold text-white">
                3
              </span>
            </button>

            <div className="mx-1 h-9 w-px bg-white/[0.07]" />

            <button
              onClick={() => setProfileModalOpen(true)}
              className="group flex items-center gap-3 rounded-2xl p-1.5 transition hover:bg-white/[0.04]"
              title="Klik untuk membuka & mengedit profil akun admin"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-purple-500/60 bg-gradient-to-br from-purple-500 to-purple-950 font-bold text-white shadow-md shadow-purple-950/40 transition group-hover:scale-105 group-hover:border-purple-400">
                {adminUser?.avatar_url ? (
                  <img
                    src={adminUser.avatar_url}
                    alt={displayName}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span>{initial}</span>
                )}
              </div>

              <div className="hidden text-left sm:block">
                <div className="text-sm font-bold text-zinc-200 leading-tight group-hover:text-purple-300 transition">
                  {displayName}
                </div>
                <div className="text-xs text-zinc-500 truncate max-w-[140px]">
                  {displayEmail}
                </div>
              </div>

              <span className="hidden rounded-full border border-purple-500/50 bg-purple-950/50 px-3 py-1 text-[10px] font-bold tracking-wider text-purple-400 md:block">
                {displayRole}
              </span>

              <ChevronDown
                size={15}
                className="hidden text-zinc-500 transition-transform group-hover:text-purple-400 sm:block"
              />
            </button>
          </div>
        </div>
      </header>

      <AdminProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={adminUser}
        onUpdateUser={(updated) => {
          if (updated) setAdminUser(updated);
          else loadUserData();
        }}
      />
    </>
  );
}

/* =========================================================
   DATABASE TIKET FRONTEND (LENGKAP UNTUK SIMULASI)
========================================================= */

const INITIAL_TICKETS = {
  "TCKT-CELE-001-A12": {
    id: "TCKT-CELE-001-A12",
    customer: "Rizky Pratama",
    email: "rizky.pratama@email.com",
    event: "Celestial Night Tour 2026",
    ticketClass: "VIP Experience",
    seat: "VIP-A12",
    date: "15 Agustus 2026",
    venue: "Jakarta International Stadium",
    payment: "Verified",
    status: "valid", // "valid" | "used"
    scannedAt: null,
  },
  "TCKT-CELE-002-B18": {
    id: "TCKT-CELE-002-B18",
    customer: "Dewi Anggraini",
    email: "dewi.a@email.com",
    event: "Celestial Night Tour 2026",
    ticketClass: "CAT 1 (Side)",
    seat: "CAT1-B18",
    date: "15 Agustus 2026",
    venue: "Jakarta International Stadium",
    payment: "Verified",
    status: "used",
    scannedAt: "16 Nov 2026, 19:15 WIB",
  },
  "NOCT-2026-TS-001": {
    id: "NOCT-2026-TS-001",
    customer: "Sarah Jenkins",
    email: "sarah.j@email.com",
    event: "Taylor Swift – The Eras Tour",
    ticketClass: "Main Stage & Catwalk",
    seat: "FOS-042",
    date: "25 Oktober 2026",
    venue: "Gelora Bung Karno",
    payment: "Verified",
    status: "valid",
    scannedAt: null,
  },
  "NOCT-2026-TS-002": {
    id: "NOCT-2026-TS-002",
    customer: "Budi Santoso",
    email: "budi.s@email.com",
    event: "Taylor Swift – The Eras Tour",
    ticketClass: "General Admission",
    seat: "GA-Standing-105",
    date: "25 Oktober 2026",
    venue: "Gelora Bung Karno",
    payment: "Verified",
    status: "used",
    scannedAt: "16 Nov 2026, 18:30 WIB",
  },
  "NOCT-2026-LANY-01": {
    id: "NOCT-2026-LANY-01",
    customer: "Amanda Putri",
    email: "amanda.p@email.com",
    event: "LANY – soft World Tour 2026",
    ticketClass: "Pit A & B (FOS)",
    seat: "Pit-A-088",
    date: "12 November 2026",
    venue: "Beach City International Stadium",
    payment: "Verified",
    status: "valid",
    scannedAt: null,
  },
  "NOCT-2026-WEEKND-01": {
    id: "NOCT-2026-WEEKND-01",
    customer: "Farhan Maulana",
    email: "farhan.m@email.com",
    event: "The Weeknd – After Hours Til Dawn",
    ticketClass: "Center Stage",
    seat: "CS-Row1-05",
    date: "05 Desember 2026",
    venue: "Indonesia Arena",
    payment: "Verified",
    status: "valid",
    scannedAt: null,
  },
  "NOCT-2026-NIKI-01": {
    id: "NOCT-2026-NIKI-01",
    customer: "Clarissa Tan",
    email: "clarissa.t@email.com",
    event: "NIKI – Buzz World Tour",
    ticketClass: "Orchestra (Stalls)",
    seat: "Stalls-F14",
    date: "18 Januari 2027",
    venue: "Teater Jakarta, TIM",
    payment: "Verified",
    status: "valid",
    scannedAt: null,
  },
  "NOCT-2026-ARI-01": {
    id: "NOCT-2026-ARI-01",
    customer: "Dimas Arya",
    email: "dimas.arya@email.com",
    event: "Ariana Grande – Eternal Sunshine",
    ticketClass: "General Admission",
    seat: "GA-Standing-312",
    date: "20 Februari 2027",
    venue: "Bali International Convention Center",
    payment: "Verified",
    status: "valid",
    scannedAt: null,
  },
};

/* =========================================================
   HELPER EKSTRAKSI ID TIKET
========================================================= */

function extractTicketId(rawText) {
  if (!rawText) return "";
  let trimmed = String(rawText).trim();

  // Bersihkan tanda kutip pembungkus jika ada
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.slice(1, -1).trim();
  }

  // 1. Coba jika format JSON
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object") {
      const extracted =
        parsed.ticket_id ||
        parsed.ticketId ||
        parsed.id ||
        parsed.ticketCode ||
        parsed.ticket_code ||
        parsed.code ||
        parsed.ticket;
      if (extracted) return String(extracted).trim().toUpperCase();
    }
  } catch (e) {
    // Bukan JSON
  }

  // 2. Coba jika format URL
  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      const url = new URL(trimmed);
      const paramId =
        url.searchParams.get("id") ||
        url.searchParams.get("ticket_id") ||
        url.searchParams.get("ticketId") ||
        url.searchParams.get("code") ||
        url.searchParams.get("ticket");
      if (paramId) return paramId.trim().toUpperCase();

      const segments = url.pathname.split("/").filter(Boolean);
      if (segments.length > 0) {
        return segments[segments.length - 1].trim().toUpperCase();
      }
    }
  } catch (e) {
    // Bukan URL
  }

  // 3. Plain text
  return trimmed.toUpperCase();
}

/* Bunyikan notifikasi audio beep saat QR terbaca */
function playScanBeep() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // Web Audio diabaikan jika tidak aktif
  }
}

/* =========================================================
   SCANNER PAGE COMPONENT
========================================================= */

export default function ScannerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Status Scanner & Kamera
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState("");

  // Opsi Anti-Mirror: default true (scaleX(-1)) agar teks & arah tidak terbalik
  const [isMirrored, setIsMirrored] = useState(true);

  // Data Tiket & Status Scan
  const [ticketsData, setTicketsData] = useState(INITIAL_TICKETS);
  const [scannedRawText, setScannedRawText] = useState("");
  const [matchedTicket, setMatchedTicket] = useState(null);
  const [scanStatus, setScanStatus] = useState(null);

  // Input Manual
  const [manualId, setManualId] = useState("");

  // Modal QR Code Preview (untuk pengujian instan)
  const [qrModalTicket, setQrModalTicket] = useState(null);

  // Refs untuk html5-qrcode
  const html5QrCodeRef = useRef(null);
  const isStartingRef = useRef(false);
  const lastScannedRef = useRef("");
  const lastScanTimeRef = useRef(0);

  /* =======================================================
     STOP SCANNER
  ======================================================= */

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        html5QrCodeRef.current.clear();
      } catch (err) {
        console.warn("Error stopping scanner:", err);
      } finally {
        html5QrCodeRef.current = null;
      }
    }
    setScanning(false);
  };

  /* =======================================================
     VERIFIKASI & PENCOCOKAN TIKET
  ======================================================= */

  const processTicketVerification = useCallback(
    async (rawScanValue) => {
      const ticketId = extractTicketId(rawScanValue);
      setScannedRawText(ticketId || rawScanValue);

      if (!ticketId) {
        setMatchedTicket(null);
        setScanStatus({
          type: "invalid",
          message: "QR Code tidak valid",
          detail: "QR Code tidak memuat data ID tiket yang dapat dikenali.",
        });
        return;
      }

      // 1. Coba verifikasi ke API Backend database terlebih dahulu
      try {
        let res = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticket_code: ticketId }),
        });

        // Fallback langsung ke port backend jika rewrite /api/scan gagal
        if (!res.ok && res.status === 404) {
          try {
            const fallbackRes = await fetch("http://localhost:3000/api/scan", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ticket_code: ticketId }),
            });
            if (fallbackRes.ok || fallbackRes.status === 400 || fallbackRes.status === 404) {
              res = fallbackRes;
            }
          } catch (e) {
            // Abaikan fallback error
          }
        }

        const data = await res.json();
        const t = data.ticket || data.data;

        if (data.success && t) {
          const scannedTimeStr = t.scanned_at
            ? new Date(t.scanned_at).toLocaleTimeString("id-ID") + " WIB"
            : new Date().toLocaleTimeString("id-ID") + " WIB";

          const mappedTicket = {
            id: t.ticket_code || ticketId,
            customer: t.customer_name || "Pemegang Tiket",
            event: t.event_title || "Konser Nocturne",
            ticketClass: t.category_name || "Tiket Masuk",
            seat: "General Access",
            status: "used",
            scannedAt: scannedTimeStr,
          };

          setMatchedTicket(mappedTicket);
          setScanStatus({
            type: "success",
            message: "Tiket berhasil dipindai",
            detail: `Tiket valid atas nama ${mappedTicket.customer} (${mappedTicket.event} - ${mappedTicket.ticketClass}). Pengunjung diizinkan masuk venue.`,
          });
          return;
        } else if (data.already_used || data.status === "already_used") {
          const mappedTicket = {
            id: t?.ticket_code || ticketId,
            customer: t?.customer_name || "Pengunjung",
            event: t?.event_title || "Konser",
            ticketClass: t?.category_name || "Tiket",
            seat: "-",
            status: "used",
            scannedAt: t?.scanned_at
              ? new Date(t.scanned_at).toLocaleTimeString("id-ID") + " WIB"
              : "Sesi sebelumnya",
          };
          setMatchedTicket(mappedTicket);
          setScanStatus({
            type: "used",
            message: "Tiket sudah digunakan",
            detail: `Tiket ini telah dipindai sebelumnya pada ${mappedTicket.scannedAt}. Pengunjung tidak dapat masuk kembali.`,
          });
          return;
        } else if (data.not_found) {
          setMatchedTicket(null);
          setScanStatus({
            type: "invalid",
            message: "QR Code tidak valid",
            detail: `ID Tiket "${ticketId}" tidak terdaftar dalam database konser.`,
          });
          return;
        }
      } catch (err) {
        console.warn("API scan error, falling back to local:", err);
      }

      // 2. Fallback pencocokan data tiket lokal (demo data)
      let existing = ticketsData[ticketId];
      let resolvedKey = ticketId;
      if (!existing) {
        const foundKey = Object.keys(ticketsData).find(
          (k) => k.toUpperCase() === ticketId.toUpperCase()
        );
        if (foundKey) {
          existing = ticketsData[foundKey];
          resolvedKey = foundKey;
        }
      }

      if (!existing) {
        // Jika QR Code tidak dikenali:
        setMatchedTicket(null);
        setScanStatus({
          type: "invalid",
          message: "QR Code tidak valid",
          detail: `ID Tiket "${ticketId}" tidak terdaftar dalam database konser.`,
        });
        return;
      }

      // Jika tiket sudah pernah digunakan:
      if (existing.status === "used") {
        setMatchedTicket(existing);
        setScanStatus({
          type: "used",
          message: "Tiket sudah digunakan",
          detail: `Tiket ini telah dipindai sebelumnya pada ${
            existing.scannedAt || "sesi terdahulu"
          }. Pengunjung tidak dapat masuk kembali.`,
        });
        return;
      }

      // Jika tiket valid dan belum digunakan:
      const nowStr =
        new Date().toLocaleString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }) + " WIB";

      const updatedTicket = {
        ...existing,
        status: "used",
        scannedAt: nowStr,
      };

      setTicketsData((prev) => ({
        ...prev,
        [resolvedKey]: updatedTicket,
      }));

      setMatchedTicket(updatedTicket);
      setScanStatus({
        type: "success",
        message: "Tiket berhasil dipindai",
        detail: `Tiket valid atas nama ${existing.customer} (${existing.event} - ${existing.ticketClass}). Pengunjung diizinkan masuk venue.`,
      });
    },
    [ticketsData]
  );

  /* =======================================================
     START SCANNER (MULTI-FALLBACK LAPTOP & HP)
  ======================================================= */

  const startScanner = async () => {
    setCameraError("");

    if (isStartingRef.current) return;
    isStartingRef.current = true;

    try {
      // 1. Bersihkan scanner lama jika masih aktif
      if (html5QrCodeRef.current) {
        try {
          if (html5QrCodeRef.current.isScanning) {
            await html5QrCodeRef.current.stop();
          }
          html5QrCodeRef.current.clear();
        } catch (e) {
          console.warn("Cleanup error before restart:", e);
        }
        html5QrCodeRef.current = null;
      }

      const qrReaderElem = document.getElementById("qr-reader");
      if (!qrReaderElem) {
        throw new Error("Elemen pemindai kamera tidak ditemukan di halaman.");
      }

      const html5QrCode = new Html5Qrcode("qr-reader", {
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        verbose: false,
      });
      html5QrCodeRef.current = html5QrCode;

      const onScanSuccess = (decodedText) => {
        if (!decodedText) return;
        const now = Date.now();
        if (
          decodedText === lastScannedRef.current &&
          now - lastScanTimeRef.current < 2500
        ) {
          return;
        }
        lastScannedRef.current = decodedText;
        lastScanTimeRef.current = now;

        playScanBeep();
        processTicketVerification(decodedText);
      };

      const onScanFailure = () => {
        // Frame tanpa QR code, abaikan
      };

      const scanConfig = {
        fps: 15, // frame scanning responsif
        disableFlip: true, // Nonaktifkan internal flip
      };

      setScanning(true);
      let started = false;

      // Percobaan 1: Coba facingMode environment (ideal untuk HP)
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          scanConfig,
          onScanSuccess,
          onScanFailure
        );
        started = true;
      } catch (e) {
        console.warn("Gagal start facingMode environment, mencoba facingMode user:", e);
      }

      // Percobaan 2: Coba facingMode user (ideal untuk webcam laptop)
      if (!started) {
        try {
          await html5QrCode.start(
            { facingMode: "user" },
            scanConfig,
            onScanSuccess,
            onScanFailure
          );
          started = true;
        } catch (e) {
          console.warn("Gagal start facingMode user, mencoba enumerasi kamera:", e);
        }
      }

      // Percobaan 3: Ambil ID kamera pertama
      if (!started) {
        const devs = await Html5Qrcode.getCameras();
        if (devs && devs.length > 0) {
          await html5QrCode.start(
            devs[0].id,
            scanConfig,
            onScanSuccess,
            onScanFailure
          );
          started = true;
        } else {
          throw new Error("Tidak ada kamera yang dapat diakses pada perangkat ini.");
        }
      }
    } catch (err) {
      console.error("Camera startup error:", err);
      let msg = "Kamera tidak dapat diakses.";

      if (err?.name === "NotAllowedError" || String(err).includes("Permission")) {
        msg =
          "Izin kamera ditolak. Silakan klik ikon gembok/kamera di address bar browser Anda dan ubah ke 'Allow'.";
      } else if (err?.name === "NotFoundError" || String(err).includes("NotFound")) {
        msg = "Kamera tidak ditemukan. Pastikan laptop/PC memiliki webcam aktif.";
      } else if (err?.name === "NotReadableError") {
        msg =
          "Kamera sedang dipakai oleh aplikasi lain (Zoom, Teams, Google Meet, dll). Tutup aplikasi tersebut lalu coba lagi.";
      } else {
        msg = err?.message || "Terjadi kesalahan saat mengaktifkan kamera.";
      }

      setCameraError(msg);
      setScanning(false);
      if (html5QrCodeRef.current) {
        try {
          if (html5QrCodeRef.current.isScanning) {
            await html5QrCodeRef.current.stop();
          }
          html5QrCodeRef.current.clear();
        } catch (e) {}
        html5QrCodeRef.current = null;
      }
    } finally {
      isStartingRef.current = false;
    }
  };

  /* =======================================================
     MANUAL INPUT LOOKUP
  ======================================================= */

  const handleManualVerify = () => {
    if (!manualId.trim()) {
      setCameraError("Ketik kode tiket terlebih dahulu.");
      return;
    }
    processTicketVerification(manualId.trim());
  };

  /* =======================================================
     RESET STATUS TIKET (PENGUJIAN ULANG)
  ======================================================= */

  const resetAllTickets = () => {
    setTicketsData((prev) => {
      const next = {};
      Object.keys(prev).forEach((id) => {
        next[id] = {
          ...prev[id],
          status: "valid",
          scannedAt: null,
        };
      });
      return next;
    });
    if (matchedTicket) {
      setMatchedTicket((prev) =>
        prev
          ? {
              ...prev,
              status: "valid",
              scannedAt: null,
            }
          : null
      );
    }
    setScanStatus({
      type: "success",
      message: "Semua tiket berhasil di-reset",
      detail:
        "Seluruh data tiket pengujian telah dikembalikan ke status 'valid' (belum digunakan) dan siap dipindai ulang.",
    });
  };

  const resetTicketStatus = (ticketId) => {
    setTicketsData((prev) => {
      const current = prev[ticketId];
      if (!current) return prev;
      return {
        ...prev,
        [ticketId]: {
          ...current,
          status: "valid",
          scannedAt: null,
        },
      };
    });

    if (matchedTicket?.id === ticketId) {
      setMatchedTicket((prev) => ({
        ...prev,
        status: "valid",
        scannedAt: null,
      }));
      setScanStatus({
        type: "success",
        message: "Status tiket berhasil di-reset",
        detail: "Tiket kembali berstatus Valid (belum digunakan) dan siap dipindai lagi.",
      });
    }
  };

  /* =======================================================
     CLEANUP SAAT MENINGGALKAN HALAMAN
  ======================================================= */

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        if (html5QrCodeRef.current.isScanning) {
          html5QrCodeRef.current.stop().catch(console.warn);
        }
        html5QrCodeRef.current.clear();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070510] text-white">
      {/* CSS KHUSUS UNTUK MENAMPILKAN VIDEO KAMERA DENGAN OPSI ANTI-MIRROR */}
      <style>{`
        #qr-reader {
          width: 100% !important;
          height: 100% !important;
          border: none !important;
          background: transparent !important;
        }
        #qr-reader video,
        #qr-reader__scan_region video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          border-radius: 0.85rem !important;
          transform: ${isMirrored ? "scaleX(-1)" : "none"} !important;
          -webkit-transform: ${isMirrored ? "scaleX(-1)" : "none"} !important;
        }
        #qr-reader__scan_region {
          background: transparent !important;
          width: 100% !important;
          height: 100% !important;
        }
        #qr-reader__dashboard {
          display: none !important;
        }
        #qr-reader__status_span {
          display: none !important;
        }
      `}</style>

      {/* BACKGROUND IMAGE & PURPLE GLOW */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,5,25,0.76), rgba(7,4,18,0.94)), url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2200&q=85')",
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[18%] top-[10%] h-[500px] w-[650px] rounded-full bg-purple-900/25 blur-[160px]" />
        <div className="absolute right-[5%] top-[25%] h-[500px] w-[600px] rounded-full bg-violet-900/20 blur-[160px]" />
        <div className="absolute bottom-0 left-[40%] h-[500px] w-[700px] rounded-full bg-purple-950/30 blur-[170px]" />
      </div>

      {/* SIDEBAR & TOPBAR */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <Topbar setOpen={setSidebarOpen} />

      {/* MAIN CONTENT */}
      <main className="relative z-10 min-h-screen pt-[66px] lg:pl-[290px]">
        <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-7 lg:px-8">
          {/* TITLE & HEADER */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-zinc-100 flex items-center gap-2.5">
                <QrCode size={28} className="text-purple-400" />
                QR Ticket Scanner
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Pindai QR code tiket pengunjung menggunakan kamera laptop atau HP secara langsung dengan library <code>html5-qrcode</code>.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/40 px-3.5 py-1.5 backdrop-blur-md w-fit">
              <span
                className={`flex h-2.5 w-2.5 rounded-full ${
                  scanning ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"
                }`}
              />
              <span className="text-xs font-semibold text-zinc-300">
                {scanning ? "Kamera Aktif & Memindai" : "Kamera Standby"}
              </span>
            </div>
          </div>

          {/* MAIN TWO-COLUMN GRID */}
          <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
            {/* =================================================
                KOLOM KIRI: CAMERA VIEWFINDER & KONTROL
            ================================================= */}
            <section className="flex flex-col rounded-2xl border border-white/[0.06] bg-[#0c0a1a]/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Camera size={19} className="text-purple-400" />
                  <h2 className="text-[17px] font-bold text-zinc-100">
                    Camera Viewfinder
                  </h2>
                </div>

                {/* TOMBOL TOGGLE ORIENTASI MIRROR */}
                <button
                  type="button"
                  onClick={() => setIsMirrored(!isMirrored)}
                  className="flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-900/60 hover:text-white transition active:scale-95"
                  title="Klik untuk membalik arah tampilan kamera (Flip Horizontal)"
                >
                  <FlipHorizontal size={14} />
                  <span>{isMirrored ? "Mirror: Mati (Normal)" : "Mirror: Aktif"}</span>
                </button>
              </div>

              {/* CONTAINER VIEWFINDER html5-qrcode */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] min-h-[320px] sm:min-h-[400px] w-full overflow-hidden rounded-2xl bg-black/95 border border-white/[0.08] shadow-inner flex items-center justify-center">
                {/* ID qr-reader SELALU MOUNTED DI DOM */}
                <div
                  id="qr-reader"
                  className="relative z-10 w-full h-full"
                />

                {/* OVERLAY STANDBY SAAT KAMERA BELUM DIJALANKAN */}
                {!scanning && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 bg-black/90 backdrop-blur-sm">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-950/80 to-purple-900/40 border border-purple-500/30 shadow-lg shadow-purple-950/50">
                      <ScanLine
                        size={36}
                        strokeWidth={1.8}
                        className="text-purple-400"
                      />
                    </div>
                    <p className="text-base sm:text-lg font-bold text-zinc-200">
                      Kamera Scanner Belum Aktif
                    </p>
                    <p className="mt-1 max-w-[320px] text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      Tekan tombol <strong>"Mulai Scan"</strong> di bawah untuk membaca QR Code tiket melalui kamera secara langsung.
                    </p>
                  </div>
                )}

                {/* ANIMATED SCAN LINE & CORNER GUIDES KETIKA SCANNING */}
                {scanning && (
                  <>
                    <style>{`
                      @keyframes scanAnimLine {
                        0%   { top: 10%; opacity: 0.8; }
                        50%  { top: 86%; opacity: 1; }
                        100% { top: 10%; opacity: 0.8; }
                      }
                      .scan-laser-line {
                        position: absolute;
                        left: 10%;
                        right: 10%;
                        height: 3px;
                        background: linear-gradient(to right, transparent, #a855f7, #c084fc, #a855f7, transparent);
                        box-shadow: 0 0 18px 4px rgba(168, 85, 247, 0.85);
                        animation: scanAnimLine 2.2s ease-in-out infinite;
                        pointer-events: none;
                        z-index: 30;
                      }
                    `}</style>
                    <div className="scan-laser-line" />

                    {/* BIDIK KOTAK SUDUT (CORNERS) */}
                    <div className="pointer-events-none absolute inset-8 z-20">
                      <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-purple-400 rounded-tl-lg" />
                      <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-purple-400 rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-purple-400 rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-purple-400 rounded-br-lg" />
                    </div>

                    <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-purple-500/30 bg-black/75 px-4 py-1.5 text-xs font-semibold text-purple-300 backdrop-blur-md shadow-lg z-30 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Arahkan QR Code tiket ke kamera
                    </div>
                  </>
                )}
              </div>

              {/* PESAN ERROR IZIN / KAMERA */}
              {cameraError && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/30 p-3.5 text-xs sm:text-sm text-red-300 leading-relaxed animate-in fade-in">
                  <AlertTriangle size={18} className="shrink-0 text-red-400 mt-0.5" />
                  <div>
                    <strong className="block font-semibold text-red-200">
                      Kendala Kamera:
                    </strong>
                    <span>{cameraError}</span>
                  </div>
                </div>
              )}

              {/* HANYA 2 TOMBOL UTAMA: MULAI SCAN & BERHENTI SCAN */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. MULAI SCAN */}
                <button
                  type="button"
                  onClick={() => startScanner()}
                  disabled={scanning}
                  className={`flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-bold shadow-lg transition active:scale-[0.98] ${
                    scanning
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/[0.04]"
                      : "bg-gradient-to-r from-purple-600 to-violet-700 text-white hover:from-purple-500 hover:to-violet-600 shadow-purple-950/50"
                  }`}
                >
                  <ScanLine size={18} />
                  Mulai Scan
                </button>

                {/* 2. BERHENTI SCAN */}
                <button
                  type="button"
                  onClick={stopScanner}
                  disabled={!scanning}
                  className={`flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-bold transition active:scale-[0.98] ${
                    !scanning
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/[0.04]"
                      : "border border-red-500/40 bg-red-950/50 text-red-300 hover:bg-red-900/60"
                  }`}
                >
                  <X size={18} />
                  Berhenti Scan
                </button>
              </div>
            </section>

            {/* =================================================
                KOLOM KANAN: HASIL SCAN & DETAIL TIKET
            ================================================= */}
            <div className="flex flex-col gap-6">
              {/* HASIL PEMINDAIAN & STATUS PESAN */}
              {scanStatus && (
                <div
                  className={`rounded-2xl border p-4 sm:p-5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 ${
                    scanStatus.type === "success"
                      ? "border-emerald-500/40 bg-emerald-950/30"
                      : scanStatus.type === "used"
                      ? "border-amber-500/40 bg-amber-950/30"
                      : "border-red-500/40 bg-red-950/30"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {scanStatus.type === "success" && (
                      <CheckCircle2
                        size={24}
                        className="text-emerald-400 shrink-0 mt-0.5"
                      />
                    )}
                    {scanStatus.type === "used" && (
                      <AlertTriangle
                        size={24}
                        className="text-amber-400 shrink-0 mt-0.5"
                      />
                    )}
                    {scanStatus.type === "invalid" && (
                      <XCircle
                        size={24}
                        className="text-red-400 shrink-0 mt-0.5"
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3
                          className={`text-base sm:text-lg font-bold ${
                            scanStatus.type === "success"
                              ? "text-emerald-200"
                              : scanStatus.type === "used"
                              ? "text-amber-200"
                              : "text-red-200"
                          }`}
                        >
                          {scanStatus.message}
                        </h3>

                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                            scanStatus.type === "success"
                              ? "border-emerald-500/40 bg-emerald-950/60 text-emerald-400"
                              : scanStatus.type === "used"
                              ? "border-amber-500/40 bg-amber-950/60 text-amber-400"
                              : "border-red-500/40 bg-red-950/60 text-red-400"
                          }`}
                        >
                          {scanStatus.type}
                        </span>
                      </div>

                      <p className="mt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {scanStatus.detail}
                      </p>

                      {scannedRawText && (
                        <div className="mt-2.5 inline-flex items-center gap-2 rounded-lg bg-black/40 px-3 py-1 font-mono text-xs text-purple-300 border border-white/[0.06]">
                          <span>Kode: {scannedRawText}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* INPUT MANUAL ID TIKET */}
              <section className="rounded-2xl border border-white/[0.06] bg-[#0c0a1a]/90 p-5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[15px] font-bold text-zinc-200 flex items-center gap-2">
                    <Search size={16} className="text-purple-400" />
                    Input Manual ID Tiket
                  </h2>
                  <span className="text-[11px] text-zinc-500">Ketik & Enter</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleManualVerify();
                      }
                    }}
                    placeholder="Masukkan atau scan Kode Tiket (TKT-...)"
                    className="h-11 min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-black/40 px-4 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-purple-500 font-mono uppercase"
                  />

                  <button
                    type="button"
                    onClick={handleManualVerify}
                    className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 to-violet-800 px-5 text-sm font-bold text-white transition hover:from-purple-600 hover:to-violet-700 active:scale-95 shadow-md shadow-purple-950/40"
                  >
                    <Search size={16} />
                    Verifikasi
                  </button>
                </div>
              </section>

              {/* DETAIL INFORMASI TIKET */}
              <section className="flex-1 rounded-2xl border border-white/[0.06] bg-[#0c0a1a]/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
                  <h2 className="text-[16px] font-bold text-zinc-100 flex items-center gap-2">
                    <Ticket size={18} className="text-purple-400" />
                    Informasi Tiket
                  </h2>

                  {matchedTicket && (
                    <button
                      type="button"
                      onClick={() => resetTicketStatus(matchedTicket.id)}
                      className="text-[11px] text-purple-400 hover:text-purple-300 underline font-semibold"
                      title="Reset status tiket agar bisa dites ulang"
                    >
                      Reset Tiket Ini (Uji Ulang)
                    </button>
                  )}
                </div>

                {!matchedTicket ? (
                  <div className="flex h-[260px] flex-col items-center justify-center text-center p-4">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black/40 border border-white/[0.06] text-zinc-600">
                      <Ticket size={28} strokeWidth={1.5} />
                    </div>
                    <p className="text-base font-semibold text-zinc-400">
                      Belum Ada Tiket Terpindai
                    </p>
                    <p className="mt-1 max-w-[280px] text-xs text-zinc-500 leading-relaxed">
                      Arahkan kamera ke QR Code tiket, atau ketikkan ID tiket pada kolom di atas.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* STATUS BANNER */}
                    <div
                      className={`flex items-center justify-between rounded-xl border p-3.5 ${
                        matchedTicket.status === "valid"
                          ? "border-emerald-500/30 bg-emerald-950/20"
                          : "border-amber-500/30 bg-amber-950/20"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {matchedTicket.status === "valid" ? (
                          <CheckCircle2 size={19} className="text-emerald-400" />
                        ) : (
                          <AlertTriangle size={19} className="text-amber-400" />
                        )}
                        <div>
                          <p
                            className={`text-sm font-bold ${
                              matchedTicket.status === "valid"
                                ? "text-emerald-300"
                                : "text-amber-300"
                            }`}
                          >
                            {matchedTicket.status === "valid"
                              ? "Tiket Valid (Siap Masuk Venue)"
                              : "Tiket Sudah Digunakan"}
                          </p>
                          <p className="text-[11px] text-zinc-400">
                            {matchedTicket.scannedAt
                              ? `Waktu Scan: ${matchedTicket.scannedAt}`
                              : "Belum pernah dipindai"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`rounded-full border px-3 py-0.5 text-xs font-bold uppercase ${
                          matchedTicket.status === "valid"
                            ? "border-emerald-500/40 bg-emerald-950/60 text-emerald-300"
                            : "border-amber-500/40 bg-amber-950/60 text-amber-300"
                        }`}
                      >
                        {matchedTicket.status}
                      </span>
                    </div>

                    {/* DETAIL FIELD LIST */}
                    <div className="divide-y divide-white/[0.05] rounded-xl border border-white/[0.06] bg-black/30 text-xs sm:text-sm">
                      {/* ID TIKET */}
                      <div className="flex items-center justify-between p-3">
                        <span className="text-zinc-500">ID / Kode Tiket</span>
                        <span className="font-mono font-bold text-purple-300">
                          {matchedTicket.id}
                        </span>
                      </div>

                      {/* PEMILIK TIKET */}
                      <div className="flex items-center justify-between p-3">
                        <span className="text-zinc-500 flex items-center gap-1.5">
                          <User size={14} className="text-purple-400" />
                          Nama Pemilik
                        </span>
                        <div className="text-right">
                          <p className="font-bold text-zinc-200">
                            {matchedTicket.customer}
                          </p>
                          <p className="text-[11px] text-zinc-500">
                            {matchedTicket.email}
                          </p>
                        </div>
                      </div>

                      {/* NAMA EVENT */}
                      <div className="flex items-center justify-between p-3">
                        <span className="text-zinc-500">Nama Event</span>
                        <span className="font-semibold text-zinc-200 text-right max-w-[200px] truncate">
                          {matchedTicket.event}
                        </span>
                      </div>

                      {/* KATEGORI TIKET */}
                      <div className="flex items-center justify-between p-3">
                        <span className="text-zinc-500 flex items-center gap-1.5">
                          <Tag size={14} className="text-purple-400" />
                          Kategori Tiket
                        </span>
                        <span className="rounded-md bg-purple-950/60 border border-purple-500/30 px-2.5 py-0.5 text-xs font-bold text-purple-300">
                          {matchedTicket.ticketClass}
                        </span>
                      </div>

                      {/* TEMPAT DUDUK / SEAT */}
                      <div className="flex items-center justify-between p-3">
                        <span className="text-zinc-500">Nomor Kursi / Zona</span>
                        <span className="font-bold text-zinc-200">
                          {matchedTicket.seat}
                        </span>
                      </div>

                      {/* TANGGAL & VENUE */}
                      <div className="flex items-center justify-between p-3">
                        <span className="text-zinc-500 flex items-center gap-1.5">
                          <MapPin size={14} className="text-purple-400" />
                          Lokasi & Tanggal
                        </span>
                        <div className="text-right">
                          <p className="font-medium text-zinc-200">
                            {matchedTicket.venue}
                          </p>
                          <p className="text-[11px] text-zinc-500">
                            {matchedTicket.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
