"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Eye,
  Inbox,
  LayoutDashboard,
  Menu,
  Mic2,
  QrCode,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Tag,
  Ticket,
  X,
  XCircle,
} from "lucide-react";

/* =========================================================
   INITIAL PAYMENT DATA
========================================================= */

const initialPaymentData = [
  {
    order: "NOC-20260805-001",
    customer: "Rizky Pratama",
    email: "rizky@email.com",
    event: "Celestial Night Tour 2026",
    category: "VIP Experience",
    qty: 2,
    total: "IDR 5,000,000",
    method: "Bank Transfer BCA",
    date: "2026-08-05 14:22",
    status: "Pending",
    proof: "bca",
  },
  {
    order: "NOC-20260805-002",
    customer: "Dewi Anggraini",
    email: "dewi.a@email.com",
    event: "Celestial Night Tour 2026",
    category: "CAT 1 - Gold",
    qty: 4,
    total: "IDR 6,000,000",
    method: "GoPay",
    date: "2026-08-05 15:10",
    status: "Pending",
    proof: "gopay",
  },
  {
    order: "NOC-20260804-004",
    customer: "Sari Dewanti",
    email: "sari.d@email.com",
    event: "Celestial Night Tour 2026",
    category: "CAT 2 - Silver",
    qty: 3,
    total: "IDR 2,550,000",
    method: "OVO",
    date: "2026-08-04 11:30",
    status: "Pending",
    proof: "ovo",
  },
  {
    order: "NOC-20260803-006",
    customer: "Maya Putri",
    email: "maya.p@email.com",
    event: "Celestial Night Tour 2026",
    category: "VIP Experience",
    qty: 2,
    total: "IDR 5,000,000",
    method: "Bank Transfer BCA",
    date: "2026-08-03 13:20",
    status: "Pending",
    proof: "bank",
  },
  {
    order: "NOC-20260802-008",
    customer: "Budi Santoso",
    email: "budi.s@email.com",
    event: "Neon Pulse Arena",
    category: "VIP Front Row",
    qty: 1,
    total: "IDR 2,000,000",
    method: "Bank Transfer Mandiri",
    date: "2026-08-02 09:15",
    status: "Verified",
    proof: "bca",
  },
  {
    order: "NOC-20260801-010",
    customer: "Andi Wijaya",
    email: "andi.w@email.com",
    event: "Midnight Symphony",
    category: "Festival",
    qty: 2,
    total: "IDR 1,000,000",
    method: "DANA",
    date: "2026-08-01 18:40",
    status: "Rejected",
    proof: "ovo",
  },
];

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

          {/* MOBILE CLOSE */}
          <button
            onClick={() => setOpen(false)}
            className="ml-auto text-zinc-400 lg:hidden"
            aria-label="Close sidebar"
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

            {/* ARTISTS */}
            <Link
              href="/admin/artists"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <Mic2 size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Artists</span>
            </Link>

            {/* VERIFY PAYMENTS - ACTIVE */}
            <Link
              href="/admin/payment"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg border-l-2 border-purple-500 bg-purple-900/20 px-3 py-3.5 text-zinc-100"
            >
              <ShieldCheck size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Verify Payments</span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
            </Link>

            {/* QR */}
            <Link
              href="/admin/scanner"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <QrCode size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">QR Ticket Scanner</span>
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
  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-[98px] border-b border-white/[0.06] bg-[#0d0b1c]/95 px-5 backdrop-blur-xl lg:left-[290px]">
      <div className="flex h-full items-center">
        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="text-zinc-300 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>

        {/* RIGHT SIDE */}
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
   RECEIPT PREVIEW THUMBNAIL
========================================================= */

function ReceiptPreview({ type }) {
  if (type === "bca") {
    return (
      <div className="relative h-[110px] w-[78px] overflow-hidden rounded-lg border border-zinc-700 bg-[#18181b] shadow-lg">
        <div className="absolute left-3 top-3 text-[7px] font-semibold text-blue-400">
          BCA
        </div>
        <div className="absolute left-3 top-7 text-[6px] text-zinc-300">
          Confirmation
        </div>
        <div className="absolute left-3 top-[27px] text-[10px] font-bold text-white">
          6,65,515
        </div>
        <div className="absolute right-2 top-[32px] h-2 w-4 rounded-full bg-emerald-400" />
        <div className="absolute left-3 top-[46px] text-[5px] text-zinc-400">
          Social Fields in app
        </div>
        <div className="absolute left-3 top-[57px] text-[5px] text-zinc-400">
          Features
        </div>
        <div className="absolute bottom-2 right-2 text-[5px] text-zinc-400">
          25.11.2025
        </div>
      </div>
    );
  }

  if (type === "gopay") {
    return (
      <div className="relative h-[110px] w-[78px] overflow-hidden rounded-lg border border-zinc-700 bg-white p-3 shadow-lg">
        <div className="mb-3 text-[8px] font-bold text-[#00a78e]">GoPay</div>
        <div className="space-y-1">
          <div className="h-1 w-full rounded bg-zinc-200" />
          <div className="h-1 w-4/5 rounded bg-zinc-200" />
          <div className="h-1 w-full rounded bg-zinc-200" />
          <div className="h-1 w-3/5 rounded bg-zinc-200" />
        </div>
        <div className="mt-3 h-5 rounded bg-[#ff765d]" />
        <div className="mt-1 text-center text-[4px] text-zinc-500">Payment</div>
      </div>
    );
  }

  if (type === "ovo") {
    return (
      <div className="relative h-[110px] w-[78px] overflow-hidden rounded-lg border border-zinc-700 bg-white p-3 shadow-lg">
        <div className="mb-3 text-[8px] font-bold text-[#4b2d83]">OVO</div>
        <div className="space-y-1">
          <div className="h-1 w-full rounded bg-zinc-200" />
          <div className="h-1 w-4/5 rounded bg-zinc-200" />
          <div className="h-1 w-full rounded bg-zinc-200" />
          <div className="h-1 w-3/5 rounded bg-zinc-200" />
        </div>
        <div className="mt-3 h-5 rounded bg-[#47ad63]" />
        <div className="mt-1 text-center text-[4px] text-zinc-500">Payment</div>
      </div>
    );
  }

  return (
    <div className="relative h-[110px] w-[78px] overflow-hidden rounded-lg border border-zinc-700 bg-white p-3 shadow-lg">
      <div className="mb-3 text-[7px] font-bold text-blue-500">
        Bank Transfer
      </div>
      <div className="space-y-1">
        <div className="h-1 w-full rounded bg-zinc-200" />
        <div className="h-1 w-4/5 rounded bg-zinc-200" />
        <div className="h-1 w-full rounded bg-zinc-200" />
        <div className="h-1 w-3/5 rounded bg-zinc-200" />
      </div>
      <div className="mt-3 h-5 rounded bg-blue-500" />
      <div className="mt-1 text-center text-[4px] text-zinc-500">Transfer</div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function VerifyPaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Active Status Filter Tab: "All" | "Pending" | "Verified" | "Rejected"
  const [activeTab, setActiveTab] = useState("All");

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");

  // Payment list state
  const [payments, setPayments] = useState(initialPaymentData);

  // Modal preview state
  const [selectedProof, setSelectedProof] = useState(null);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* =======================================================
     LOAD FROM LOCALSTORAGE (PERSISTENCE)
  ======================================================= */

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("nocturne_admin_payments");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPayments(parsed);
          }
        }
      } catch (err) {
        console.error("Failed to load saved payments", err);
      }
    }
  }, []);

  const savePaymentsToStorage = (data) => {
    setPayments(data);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("nocturne_admin_payments", JSON.stringify(data));
      } catch (err) {
        console.error("Failed to save payments", err);
      }
    }
  };

  /* =======================================================
     STATUS TABS
  ======================================================= */

  const tabs = ["All", "Pending", "Verified", "Rejected"];

  /* =======================================================
     APPROVE PAYMENT
  ======================================================= */

  const handleApprove = (order) => {
    const updated = payments.map((payment) =>
      payment.order === order
        ? {
            ...payment,
            status: "Verified",
          }
        : payment
    );
    savePaymentsToStorage(updated);
    showToast(`Pesanan ${order} berhasil diverifikasi & tiket dikirim!`, "success");
  };

  /* =======================================================
     REJECT PAYMENT
  ======================================================= */

  const handleReject = (order) => {
    const updated = payments.map((payment) =>
      payment.order === order
        ? {
            ...payment,
            status: "Rejected",
          }
        : payment
    );
    savePaymentsToStorage(updated);
    showToast(`Pesanan ${order} telah ditolak.`, "warning");
  };

  /* =======================================================
     RESET TO PENDING
  ======================================================= */

  const handleResetStatus = (order) => {
    const updated = payments.map((payment) =>
      payment.order === order
        ? {
            ...payment,
            status: "Pending",
          }
        : payment
    );
    savePaymentsToStorage(updated);
    showToast(`Status pesanan ${order} dikembalikan ke Pending.`, "info");
  };

  /* =======================================================
     STATUS & SEARCH FILTER (BERFUNGSI PENUH)
  ======================================================= */

  const filteredPayments = payments.filter((payment) => {
    // 1. Filter Status
    if (activeTab !== "All" && payment.status !== activeTab) {
      return false;
    }

    // 2. Filter Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchOrder = payment.order?.toLowerCase().includes(q);
      const matchCustomer = payment.customer?.toLowerCase().includes(q);
      const matchEmail = payment.email?.toLowerCase().includes(q);
      const matchEvent = payment.event?.toLowerCase().includes(q);
      const matchMethod = payment.method?.toLowerCase().includes(q);
      if (!matchOrder && !matchCustomer && !matchEmail && !matchEvent && !matchMethod) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#080611] text-white">
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-3 rounded-xl border border-purple-500/30 bg-[#120f26]/95 px-5 py-3.5 text-sm font-semibold text-zinc-100 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
              toast.type === "warning"
                ? "bg-rose-500/20 text-rose-400"
                : toast.type === "info"
                ? "bg-amber-500/20 text-amber-400"
                : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            ✓
          </div>
          <span>{toast.message}</span>
        </div>
      )}

      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* TOPBAR */}
      <Topbar setOpen={setSidebarOpen} />

      {/* MAIN */}
      <main className="min-h-screen pt-[98px] lg:pl-[290px]">
        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          <div className="absolute left-[15%] top-[5%] h-[520px] w-[650px] rounded-full bg-purple-900/20 blur-[150px]" />
          <div className="absolute right-[8%] top-[10%] h-[500px] w-[600px] rounded-full bg-violet-900/20 blur-[150px]" />
          <div className="absolute bottom-0 left-[30%] h-[500px] w-[700px] rounded-full bg-purple-950/30 blur-[160px]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-7 xl:px-8">
          {/* =================================================
              PAGE TITLE
          ================================================== */}
          <div className="mb-7">
            <h1 className="text-[28px] font-bold tracking-tight text-zinc-100">
              Verify Payments
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Periksa bukti transfer dan setujui atau tolak pembayaran tiket pelanggan.
            </p>
          </div>

          {/* =================================================
              FILTER TOOLBAR (STATUS TABS & SEARCH BAR)
          ================================================== */}
          <div className="mb-6 rounded-2xl border border-white/[0.06] bg-[#0c0a1a]/80 p-5 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* STATUS FILTER BUTTONS / TABS */}
              <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-[#05040d] p-1.5 border border-white/[0.04]">
                {tabs.map((label) => {
                  const active = activeTab === label;

                  return (
                    <button
                      key={label}
                      onClick={() => setActiveTab(label)}
                      className={`rounded-xl px-5 py-2.5 text-xs sm:text-[13px] font-bold transition-all duration-200 ${
                        active
                          ? "bg-purple-900/70 text-purple-200 border border-purple-500/40 shadow-md shadow-purple-950/40"
                          : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* SEARCH BAR */}
              <div className="relative min-w-[280px] sm:min-w-[340px]">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type="text"
                  placeholder="Cari order, pelanggan, atau event..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-xl border border-white/[0.08] bg-black/40 pl-10 pr-9 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-500 outline-none transition focus:border-purple-500/60 focus:bg-black/60 focus:ring-1 focus:ring-purple-500/30"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* FILTER ACTIVE INFO */}
            <div className="mt-3.5 flex flex-wrap items-center justify-between border-t border-white/[0.04] pt-3 text-xs text-zinc-500">
              <div>
                Menampilkan status:{" "}
                <span className="font-bold text-purple-400">
                  {activeTab === "All" ? "Semua Status" : activeTab}
                </span>{" "}
                ({filteredPayments.length} transaksi ditemukan)
              </div>

              {activeTab !== "All" && (
                <button
                  onClick={() => setActiveTab("All")}
                  className="text-purple-400 hover:text-purple-300 transition"
                >
                  Tampilkan Semua Transaksi (Reset Filter)
                </button>
              )}
            </div>
          </div>

          {/* =================================================
              PAYMENT LIST
          ================================================== */}
          <div className="space-y-4">
            {filteredPayments.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.04] bg-[#05040d]/90 px-8 py-16 text-center shadow-xl">
                <Clock className="mx-auto mb-3 text-zinc-600" size={38} />
                <div className="text-lg font-bold text-zinc-300">
                  Tidak Ada Pembayaran ({activeTab})
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 max-w-[420px] mx-auto">
                  {activeTab === "All"
                    ? "Belum ada transaksi pembayaran yang tercatat dalam sistem."
                    : `Tidak ada transaksi pembayaran dengan status "${activeTab}" yang cocok.`}
                </p>

                {(activeTab !== "All" || searchQuery) && (
                  <button
                    onClick={() => {
                      setActiveTab("All");
                      setSearchQuery("");
                    }}
                    className="mt-4 rounded-xl border border-purple-500/30 bg-purple-950/40 px-4 py-2 text-xs font-semibold text-purple-300 transition hover:bg-purple-900/50"
                  >
                    Reset Filter & Pencarian
                  </button>
                )}
              </div>
            ) : (
              filteredPayments.map((payment) => (
                <div
                  key={payment.order}
                  className={`relative overflow-hidden rounded-2xl border bg-[#05040d]/95 p-6 shadow-xl backdrop-blur-md transition-all duration-200 ${
                    payment.status === "Pending"
                      ? "border-amber-500/20 hover:border-amber-500/40"
                      : payment.status === "Verified"
                      ? "border-emerald-500/20 hover:border-emerald-500/40"
                      : "border-rose-500/20 hover:border-rose-500/40"
                  }`}
                >
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
                    {/* =================================================
                        PAYMENT INFORMATION
                    ================================================== */}
                    <div className="min-w-0 flex-1 xl:pr-7">
                      {/* ORDER + STATUS BADGE */}
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-zinc-400">
                          {payment.order}
                        </span>

                        <span
                          className={`flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[11px] font-bold border ${
                            payment.status === "Pending"
                              ? "border-amber-500/40 bg-amber-950/40 text-amber-400"
                              : payment.status === "Verified"
                              ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-400"
                              : "border-rose-500/40 bg-rose-950/40 text-rose-400"
                          }`}
                        >
                          {payment.status === "Pending" && (
                            <Clock size={11} className="animate-pulse" />
                          )}
                          {payment.status === "Verified" && (
                            <CheckCircle2 size={11} />
                          )}
                          {payment.status === "Rejected" && (
                            <XCircle size={11} />
                          )}
                          {payment.status}
                        </span>
                      </div>

                      {/* CUSTOMER */}
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="text-[17px] font-bold text-zinc-100">
                          {payment.customer}
                        </span>

                        <span className="text-xs text-zinc-400">
                          {payment.email}
                        </span>
                      </div>

                      {/* EVENT DETAILS */}
                      <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-[13px]">
                        <span className="font-semibold text-purple-300">
                          {payment.event}
                        </span>

                        <span className="text-zinc-600">·</span>

                        <span className="text-zinc-400">{payment.category}</span>

                        <span className="text-zinc-600">·</span>

                        <span className="text-zinc-400">
                          Qty: <strong>{payment.qty}</strong>
                        </span>

                        <span className="text-zinc-600">·</span>

                        <span className="font-bold text-emerald-400">
                          {payment.total}
                        </span>
                      </div>

                      {/* METHOD + DATE */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                        <span className="rounded bg-white/[0.04] px-2 py-0.5 font-medium text-zinc-300">
                          {payment.method}
                        </span>

                        <span className="text-zinc-700">·</span>

                        <span>Waktu: {payment.date}</span>
                      </div>
                    </div>

                    {/* =================================================
                        PROOF THUMBNAIL
                    ================================================== */}
                    <div className="shrink-0 flex flex-col items-center gap-1.5">
                      <button
                        onClick={() => setSelectedProof(payment)}
                        className="group relative rounded-xl transition hover:scale-[1.03] hover:ring-2 hover:ring-purple-500/50"
                        title="Klik untuk melihat bukti transfer"
                      >
                        <ReceiptPreview type={payment.proof} />
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 transition backdrop-blur-[1px]">
                          <Eye size={20} className="text-white" />
                        </div>
                      </button>
                      <span className="text-[10px] text-zinc-500 font-medium">
                        Klik untuk perbesar
                      </span>
                    </div>

                    {/* =================================================
                        ACTION BUTTONS
                    ================================================== */}
                    <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-[215px]">
                      {/* APPROVE */}
                      <button
                        disabled={payment.status === "Verified"}
                        onClick={() => handleApprove(payment.order)}
                        className={`flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-bold transition active:scale-[0.98] ${
                          payment.status === "Verified"
                            ? "cursor-not-allowed border-emerald-900/30 bg-emerald-950/20 text-emerald-500/60"
                            : "border-emerald-600/50 bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900/80 shadow-md shadow-emerald-950/30"
                        }`}
                      >
                        <CheckCircle2 size={15} />
                        {payment.status === "Verified"
                          ? "✓ Sudah Diverifikasi"
                          : "Approve & Send Ticket"}
                      </button>

                      {/* REJECT */}
                      <button
                        disabled={payment.status === "Rejected"}
                        onClick={() => handleReject(payment.order)}
                        className={`flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-bold transition active:scale-[0.98] ${
                          payment.status === "Rejected"
                            ? "cursor-not-allowed border-rose-900/30 bg-rose-950/20 text-rose-500/60"
                            : "border-rose-900/60 bg-rose-950/50 text-rose-400 hover:bg-rose-900/60"
                        }`}
                      >
                        <XCircle size={15} />
                        {payment.status === "Rejected"
                          ? "× Pembayaran Ditolak"
                          : "Reject Payment"}
                      </button>

                      {/* RESET OPTION IF NOT PENDING */}
                      {payment.status !== "Pending" && (
                        <button
                          onClick={() => handleResetStatus(payment.order)}
                          className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-300 transition py-1"
                        >
                          <RotateCcw size={12} />
                          Kembalikan ke Pending
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* =================================================
              FOOTER
          ================================================== */}
          <footer className="py-12 text-center text-xs text-zinc-500">
            © 2026 Nocturne Admin Portal. All rights reserved. Verify Payments Management.
          </footer>
        </div>
      </main>

      {/* =====================================================
          MODAL: VIEW PROOF DETAIL
      ===================================================== */}
      {selectedProof && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-5 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-[480px] rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/80">
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-purple-400" />
                  Bukti Pembayaran
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Order ID: {selectedProof.order}
                </p>
              </div>
              <button
                onClick={() => setSelectedProof(null)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/[0.05] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* RECEIPT PREVIEW CONTENT */}
            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-5 flex flex-col items-center justify-center space-y-4">
              <div className="scale-125 my-4">
                <ReceiptPreview type={selectedProof.proof} />
              </div>

              <div className="w-full space-y-2 border-t border-white/[0.06] pt-3 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Nama Pelanggan:</span>
                  <strong className="text-zinc-200">{selectedProof.customer}</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Metode Transfer:</span>
                  <strong className="text-zinc-200">{selectedProof.method}</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Total Bayar:</span>
                  <strong className="text-emerald-400 font-bold">{selectedProof.total}</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Status Saat Ini:</span>
                  <span
                    className={`font-bold ${
                      selectedProof.status === "Pending"
                        ? "text-amber-400"
                        : selectedProof.status === "Verified"
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {selectedProof.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProof(null)}
                className="rounded-xl border border-white/[0.08] px-4 py-2 text-xs font-semibold text-zinc-400 hover:bg-white/[0.05] hover:text-white transition"
              >
                Tutup
              </button>
              {selectedProof.status === "Pending" && (
                <>
                  <button
                    onClick={() => {
                      handleReject(selectedProof.order);
                      setSelectedProof(null);
                    }}
                    className="rounded-xl border border-rose-500/30 bg-rose-950/40 px-4 py-2 text-xs font-bold text-rose-400 hover:bg-rose-900/50 transition"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedProof.order);
                      setSelectedProof(null);
                    }}
                    className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-2 text-xs font-bold text-white hover:from-emerald-500 hover:to-teal-600 transition shadow-lg shadow-emerald-950/40"
                  >
                    Approve Pembayaran
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
