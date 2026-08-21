"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell,
  BarChart3,
  ChevronDown,
  Inbox,
  LayoutDashboard,
  Mic2,
  QrCode,
  Settings,
  ShieldCheck,
  Tag,
  Ticket,
  X,
  ScanLine,
  Search,
  CheckCircle2,
  User,
  CalendarDays,
  MapPin,
  CreditCard,
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

            {/* EVENT kjweqjkrnsj  */}
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

            {/* ARTISTS */}
            <Link
              href="/admin/artists"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <Mic2 size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Artists</span>
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
   TOPBAR  atas yg mana dia tuh posisinya ditaas ya semisal dia
========================================================= */

function Topbar({ setOpen }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-[66px] border-b border-white/[0.06] bg-[#090714]/90 backdrop-blur-xl lg:left-[290px]">
      <div className="flex h-full items-center px-5 sm:px-7">
        {/* MOBILE MENU */}
        <button
          onClick={() => setOpen(true)}
          className="mr-4 text-zinc-300 lg:hidden"
        >
          <QrCode size={22} />
        </button>

        <div className="ml-auto flex items-center gap-5">
          {/* NOTIFICATION */}
          <button className="relative text-zinc-400 transition hover:text-zinc-200">
            <Bell size={21} />
            <span className="absolute -right-1 -top-2 h-2.5 w-2.5 rounded-full border border-[#0a0815] bg-amber-500" />
          </button>

          {/* INBOX */}
          <button className="relative text-zinc-400 transition hover:text-zinc-200">
            <Inbox size={21} />

            <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <div className="mx-1 h-9 w-px bg-white/[0.07]" />

          {/* PROFILE */}
          <button className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/60 bg-gradient-to-br from-purple-400 to-purple-950 font-bold text-white">
              N
            </div>

            <div className="hidden text-left sm:block">
              <div className="text-sm font-bold text-zinc-200">Naira</div>

              <div className="text-xs text-zinc-500">System Administrator</div>
            </div>

            <span className="hidden rounded-full border border-purple-500/50 bg-purple-950/50 px-3 py-1 text-[10px] font-bold tracking-wider text-purple-400 md:block">
              SYSTEM ADMIN
            </span>

            <ChevronDown size={15} className="hidden text-zinc-500 sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   TICKET DATA
========================================================= */

const ticketDatabase = {
  "TCKT-CELE-001-A12": {
    id: "TCKT-CELE-001-A12",
    customer: "Rizky Pratama",
    email: "rizky@email.com",
    event: "Celestial Night Tour 2026",
    ticketClass: "VIP Experience",
    seat: "VIP-A12",
    date: "August 15, 2026",
    venue: "Jakarta International Stadium",
    payment: "Verified",
    status: "Valid",
  },

  "TCKT-CELE-002-B18": {
    id: "TCKT-CELE-002-B18",
    customer: "Dewi Anggraini",
    email: "dewi.a@email.com",
    event: "Celestial Night Tour 2026",
    ticketClass: "CAT 1 - Gold",
    seat: "G-B18",
    date: "August 15, 2026",
    venue: "Jakarta International Stadium",
    payment: "Verified",
    status: "Valid",
  },
};

/* =========================================================
   SCANNER PAGE
========================================================= */

export default function ScannerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [scanning, setScanning] = useState(false);

  const [manualId, setManualId] = useState("");

  const [ticket, setTicket] = useState(null);

  const [error, setError] = useState("");

  const videoRef = useRef(null);

  const streamRef = useRef(null);

  const scanIntervalRef = useRef(null);

  /* =======================================================
     VERIFY TICKET
  ======================================================= */

  const verifyTicketById = (id) => {
    const cleanId = id.trim().toUpperCase();

    setError("");
    setTicket(null);

    if (!cleanId) {
      setError("Please enter a ticket ID.");
      return false;
    }

    const foundTicket = ticketDatabase[cleanId];

    if (!foundTicket) {
      setError("Ticket not found. Please check the ticket ID.");
      return false;
    }

    setTicket(foundTicket);
    setManualId(cleanId);

    return true;
  };

  /* =======================================================
     STOP CAMERA
  ======================================================= */

  const stopScan = () => {
    /* STOP QR DETECTOR */
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    /* STOP CAMERA TRACKS */
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    /* REMOVE VIDEO STREAM */
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setScanning(false);
  };

  /* =======================================================
     START CAMERA
  ======================================================= */

  const startScan = async () => {
    setError("");
    setTicket(null);

    /* Browser support */
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(
        "Camera is not supported. Please use Chrome or Edge with HTTPS/localhost.",
      );
      return;
    }

    /* Stop previous camera if any */
    stopScan();

    try {
      let stream;

      /*
       * FIRST TRY:
       * Kamera depan / webcam laptop.
       * azzura kamilya sakhi cantik bngt adueh
       * kalo semisal iya yaudH  mau apa hahh dri mana munculnyavhvvgvhgggggvvhghvhgvhgvvhgvvghvvhgvhv
       */
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },
          },
          audio: false,
        });
      } catch (firstError) {
        console.warn(
          "Front camera failed, trying default camera...",
          firstError,
        );

        /*
         * FALLBACK:
         * Pakai kamera apa pun yang tersedia.
         */
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;

      /*
       * PENTING:
       * Kita langsung pasang stream ke video.
       * Video element SEKARANG SELALU ADA DI DOM.
       * 
       */
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        try {
          await videoRef.current.play();
        } catch (playError) {
          console.warn("Video play error:", playError);
        }
      }

      setScanning(true);

      /* ===================================================
         QR DETECTOR
      =================================================== */

      if ("BarcodeDetector" in window) {
        try {
          const supportedFormats =
            await window.BarcodeDetector.getSupportedFormats();

          if (supportedFormats.includes("qr_code")) {
            const detector = new window.BarcodeDetector({
              formats: ["qr_code"],
            });

            scanIntervalRef.current = setInterval(async () => {
              if (!videoRef.current) return;

              if (videoRef.current.readyState < 2) return;

              if (videoRef.current.videoWidth === 0) return;

              try {
                const barcodes = await detector.detect(videoRef.current);

                if (barcodes.length > 0) {
                  const value = barcodes[0].rawValue;

                  if (value) {
                    const success = verifyTicketById(value);

                    if (success) {
                      stopScan();
                    }
                  }
                }
              } catch (scanError) {
                console.error("QR detection error:", scanError);
              }
            }, 500);
          }
        } catch (detectorError) {
          console.warn("BarcodeDetector is not available:", detectorError);
        }
      }
    } catch (err) {
      console.error("Camera error:", err);

      let message =
        "Camera tidak bisa dibuka. Pastikan kamera tersedia dan izin kamera sudah diberikan.";

      if (err?.name === "NotAllowedError") {
        message =
          "Izin kamera ditolak. Klik ikon kamera di address bar browser lalu izinkan kamera.";
      }

      if (err?.name === "NotFoundError") {
        message = "Kamera tidak ditemukan. Pastikan laptop/PC memiliki webcam.";
      }

      if (err?.name === "NotReadableError") {
        message =
          "Kamera sedang digunakan aplikasi lain. Tutup aplikasi seperti Zoom, Meet, atau Camera.";
      }

      if (err?.name === "SecurityError") {
        message =
          "Browser memblokir kamera. Jalankan project melalui localhost atau HTTPS.";
      }

      setError(message);

      stopScan();
    }
  };

  /* =======================================================
     MANUAL LOOKUP
  ======================================================= */

  const verifyTicket = () => {
    verifyTicketById(manualId);
  };

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#070510] text-white">
      {/* =================================================
          BACKGROUND IMAGE
      ================================================= */}

      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,5,25,0.76), rgba(7,4,18,0.94)), url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2200&q=85')",
        }}
      />

      {/* PURPLE GLOW */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[18%] top-[10%] h-[500px] w-[650px] rounded-full bg-purple-900/25 blur-[160px]" />

        <div className="absolute right-[5%] top-[25%] h-[500px] w-[600px] rounded-full bg-violet-900/20 blur-[160px]" />

        <div className="absolute bottom-0 left-[40%] h-[500px] w-[700px] rounded-full bg-purple-950/30 blur-[170px]" />
      </div>

      {/* SIDEBAR */}

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* TOPBAR */}

      <Topbar setOpen={setSidebarOpen} />

      {/* MAIN */}

      <main className="relative z-10 min-h-screen pt-[66px] lg:pl-[290px]">
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-7 lg:px-7">
          {/* TITLE */}

          <h1 className="mb-5 text-[28px] font-bold tracking-tight text-zinc-100">
            QR Ticket Scanner
          </h1>

          {/* CONTENT GRID */}

          <div className="grid gap-5 xl:grid-cols-[1.45fr_0.95fr]">
            {/* =================================================
                LEFT - CAMERA
            ================================================= */}

            <section className="rounded-2xl border border-white/[0.04] bg-[#05040d]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <h2 className="mb-4 text-[16px] font-semibold text-zinc-200">
                Camera Viewfinder
              </h2>

              {/* VIEWFINDER */}

              <div className="relative aspect-[1.45/1] min-h-[430px] overflow-hidden rounded-xl bg-black">
                {/* =================================================
                    VIDEO

                    PENTING:
                    VIDEO SELALU ADA DI DOM.
                    Jangan pakai {scanning ? <video /> : <div />}
                    karena ref harus sudah tersedia ketika kamera
                    dibuka.
                ================================================= */}

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    scanning ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* DARK BACKGROUND WHEN CAMERA OFF */}

                {!scanning && <div className="absolute inset-0 bg-black/90" />}

                {/* DARK OVERLAY */}

                {scanning && (
                  <div className="pointer-events-none absolute inset-0 bg-black/10" />
                )}

                {/* GRID */}

                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-1/2 top-0 h-full w-px bg-purple-500/10" />

                  <div className="absolute left-0 top-1/2 h-px w-full bg-purple-500/10" />
                </div>

                {/* SCANNER CORNERS */}

                <div className="pointer-events-none absolute inset-5">
                  {/* TOP LEFT */}

                  <div className="absolute left-0 top-0 h-9 w-9 border-l-2 border-t-2 border-purple-500" />

                  {/* TOP RIGHT */}

                  <div className="absolute right-0 top-0 h-9 w-9 border-r-2 border-t-2 border-purple-500" />

                  {/* BOTTOM LEFT */}

                  <div className="absolute bottom-0 left-0 h-9 w-9 border-b-2 border-l-2 border-purple-500" />

                  {/* BOTTOM RIGHT */}

                  <div className="absolute bottom-0 right-0 h-9 w-9 border-b-2 border-r-2 border-purple-500" />
                </div>

                {/* CAMERA READY */}

                {!scanning && (
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-950/80">
                      <ScanLine
                        size={30}
                        strokeWidth={1.7}
                        className="text-purple-400"
                      />
                    </div>

                    <p className="text-[16px] font-medium text-zinc-400">
                      Camera ready
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      Position QR code within the frame
                    </p>
                  </div>
                )}

                {/* SCANNING */}

                {scanning && (
                  <>
                    {/* SCAN LINE */}

                    <div className="absolute left-8 right-8 top-1/2 h-[2px] animate-pulse bg-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.8)]" />

                    {/* STATUS */}

                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-purple-500/20 bg-black/60 px-4 py-2 text-xs text-purple-300 backdrop-blur-md">
                      Scanning for QR code...
                    </div>
                  </>
                )}
              </div>

              {/* ERROR */}

              {error && (
                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-950/30 px-4 py-3 text-sm leading-5 text-red-400">
                  {error}
                </div>
              )}

              {/* STARTt / STOP */}

              {!scanning ? (
                <button
                  onClick={startScan}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-800 to-purple-950 text-sm font-bold text-white shadow-lg shadow-purple-950/30 transition hover:from-purple-700 hover:to-purple-900"
                >
                  <ScanLine size={18} />
                  Start Scan
                </button>
              ) : (
                <button
                  onClick={stopScan}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-950/40 text-sm font-bold text-red-400 transition hover:bg-red-950/70"
                >
                  <X size={18} />
                  Stop Camera
                </button>
              )}
            </section>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div className="flex flex-col gap-5">
              {/* MANUAL LOOKUP */}

              <section className="rounded-2xl border border-white/[0.04] bg-[#05040d]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <h2 className="mb-4 text-[16px] font-semibold text-zinc-200">
                  Manual Ticket Lookup
                </h2>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualId}
                    onChange={(e) => {
                      setManualId(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        verifyTicket();
                      }
                    }}
                    placeholder="e.g. TCKT-CELE-001-A12"
                    className="h-11 min-w-0 flex-1 rounded-xl border border-purple-900/30 bg-black/40 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
                  />

                  <button
                    onClick={verifyTicket}
                    className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-950/80 px-5 text-sm font-bold text-zinc-200 transition hover:bg-indigo-900"
                  >
                    <Search size={17} />
                    Verify
                  </button>
                </div>
              </section>

              {/* TICKET DETAILS */}

              <section className="min-h-[430px] flex-1 rounded-2xl border border-white/[0.04] bg-[#05040d]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <h2 className="mb-4 text-[16px] font-semibold text-zinc-200">
                  Ticket Details
                </h2>

                {!ticket ? (
                  <div className="flex h-[350px] flex-col items-center justify-center text-center">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black/30">
                      <Ticket
                        size={25}
                        strokeWidth={1.5}
                        className="text-zinc-600"
                      />
                    </div>

                    <p className="text-[16px] font-medium text-zinc-500">
                      No ticket scanned yet
                    </p>

                    <p className="mt-1 max-w-[280px] text-sm leading-5 text-zinc-600">
                      Scan a QR code or enter a ticket ID to view attendee
                      details here.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* STATUS */}

                    <div className="mb-5 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={20} className="text-emerald-400" />

                        <div>
                          <p className="text-sm font-semibold text-emerald-300">
                            Ticket Valid
                          </p>

                          <p className="text-xs text-emerald-500/70">
                            Payment verified
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                        VALID
                      </span>
                    </div>

                    {/* CUSTOMER */}

                    <div className="space-y-4">
                      {/* ATTENDEE */}

                      <div className="flex items-start gap-3">
                        <User size={18} className="mt-0.5 text-purple-400" />

                        <div>
                          <p className="text-xs text-zinc-600">Attendee</p>

                          <p className="mt-0.5 text-sm font-semibold text-zinc-200">
                            {ticket.customer}
                          </p>

                          <p className="text-xs text-zinc-500">
                            {ticket.email}
                          </p>
                        </div>
                      </div>

                      {/* TICKET */}

                      <div className="flex items-start gap-3">
                        <Ticket size={18} className="mt-0.5 text-purple-400" />

                        <div>
                          <p className="text-xs text-zinc-600">Ticket</p>

                          <p className="mt-0.5 text-sm font-semibold text-zinc-200">
                            {ticket.ticketClass}
                          </p>

                          <p className="text-xs text-zinc-500">{ticket.id}</p>
                        </div>
                      </div>

                      {/* DATE + SEAT */}

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <CalendarDays
                            size={17}
                            className="mt-0.5 text-purple-400"
                          />

                          <div>
                            <p className="text-xs text-zinc-600">Event Date</p>

                            <p className="mt-0.5 text-xs font-medium text-zinc-300">
                              {ticket.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin
                            size={17}
                            className="mt-0.5 text-purple-400"
                          />

                          <div>
                            <p className="text-xs text-zinc-600">Seat</p>

                            <p className="mt-0.5 text-xs font-medium text-zinc-300">
                              {ticket.seat}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* VENUE */}

                      <div className="flex items-start gap-3">
                        <CreditCard
                          size={18}
                          className="mt-0.5 text-purple-400"
                        />

                        <div>
                          <p className="text-xs text-zinc-600">Venue</p>

                          <p className="mt-0.5 text-sm font-medium text-zinc-300">
                            {ticket.venue}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* EVENT */}

                    <div className="mt-5 rounded-xl bg-purple-950/20 px-4 py-3">
                      <p className="text-xs text-zinc-600">Event</p>

                      <p className="mt-1 text-sm font-semibold text-purple-300">
                        {ticket.event}
                      </p>
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
