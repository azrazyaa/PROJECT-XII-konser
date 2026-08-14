"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  ChevronDown,
  Inbox,
  LayoutDashboard,
  Menu,
  Mic2,
  QrCode,
  Settings,
  ShieldCheck,
  Tag,
  Ticket,
  X,
} from "lucide-react";

/* =========================================================
   PAYMENT DATA
========================================================= */

const paymentData = [
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
        {/* =================================================
            LOGO
        ================================================== */}

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

        {/* =================================================
            MAIN MENU
        ================================================== */}

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

            {/* =================================================
                VERIFY PAYMENTS - ACTIVE
            ================================================== */}

            <Link
              href="/admin/verify-payments"
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

        {/* =================================================
            SYSTEM SETTINGS
        ================================================== */}

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
   RECEIPT PREVIEW
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

  const [activeTab, setActiveTab] = useState("Pending");

  const [payments, setPayments] = useState(paymentData);

  const tabs = [
    {
      label: "All",
      count: 6,
    },
    {
      label: "Pending",
      count: 4,
    },
    {
      label: "Verified",
      count: 1,
    },
    {
      label: "Rejected",
      count: 1,
    },
  ];

  /* =======================================================
     APPROVE PAYMENT
  ======================================================= */

  const handleApprove = (order) => {
    setPayments((current) =>
      current.map((payment) =>
        payment.order === order
          ? {
              ...payment,
              status: "Verified",
            }
          : payment,
      ),
    );
  };

  /* =======================================================
     REJECT PAYMENT
  ======================================================= */

  const handleReject = (order) => {
    setPayments((current) =>
      current.map((payment) =>
        payment.order === order
          ? {
              ...payment,
              status: "Rejected",
            }
          : payment,
      ),
    );
  };

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredPayments =
    activeTab === "All"
      ? payments
      : payments.filter((payment) => payment.status === activeTab);

  return (
    <div className="min-h-screen bg-[#080611] text-white">
      {/* =================================================
          SIDEBAR
      ================================================== */}

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* =================================================
          TOPBAR
      ================================================== */}

      <Topbar setOpen={setSidebarOpen} />

      {/* =================================================
          MAIN
      ================================================== */}

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

          <h1 className="mb-7 text-[28px] font-bold tracking-tight text-zinc-100">
            Verify Payments
          </h1>

          {/* =================================================
              SECTION HEADER
          ================================================== */}

          <div className="mb-5 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h2 className="text-[21px] font-bold text-zinc-100">
                Verify Payments
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Review uploaded transfer receipts and approve or reject customer
                payments
              </p>
            </div>

            {/* =================================================
                TABS
            ================================================== */}

            <div className="flex w-fit items-center gap-1 rounded-full bg-[#07060d]/95 p-1">
              {tabs.map((tab) => {
                const active = activeTab === tab.label;

                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                      active
                        ? "bg-purple-900/80 text-purple-300 shadow-lg shadow-purple-950/20"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* =================================================
              PAYMENT LIST
          ================================================== */}

          <div className="space-y-4">
            {filteredPayments.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.04] bg-[#05040d]/90 px-8 py-16 text-center">
                <div className="text-lg font-semibold text-zinc-300">
                  No payments found
                </div>

                <p className="mt-2 text-sm text-zinc-600">
                  There are no payments in this category.
                </p>
              </div>
            ) : (
              filteredPayments.map((payment) => (
                <div
                  key={payment.order}
                  className="relative overflow-hidden rounded-2xl border border-white/[0.035] bg-[#05040d]/95 shadow-xl backdrop-blur-md"
                >
                  <div className="flex min-h-[153px] flex-col gap-6 px-6 py-6 xl:flex-row xl:items-center">
                    {/* =================================================
                        PAYMENT INFORMATION
                    ================================================== */}

                    <div className="min-w-0 flex-1 xl:pr-7">
                      {/* ORDER + STATUS */}

                      <div className="mb-3 flex flex-wrap items-center gap-4">
                        <span className="text-[12px] font-medium tracking-wide text-zinc-500">
                          {payment.order}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-[12px] font-bold ${
                            payment.status === "Pending"
                              ? "bg-amber-950/80 text-amber-400"
                              : payment.status === "Verified"
                                ? "bg-emerald-950/70 text-emerald-400"
                                : "bg-red-950/70 text-red-400"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>

                      {/* CUSTOMER */}

                      <div className="mb-2 flex flex-wrap items-center gap-4">
                        <span className="text-[17px] font-bold text-zinc-200">
                          {payment.customer}
                        </span>

                        <span className="text-[13px] text-zinc-500">
                          {payment.email}
                        </span>
                      </div>

                      {/* EVENT DETAILS */}

                      <div className="flex flex-wrap items-center gap-3 text-[14px]">
                        <span className="text-zinc-400">{payment.event}</span>

                        <span className="text-zinc-600">·</span>

                        <span className="text-zinc-400">
                          {payment.category}
                        </span>

                        <span className="text-zinc-600">·</span>

                        <span className="text-zinc-400">
                          Qty: {payment.qty}
                        </span>

                        <span className="text-zinc-600">·</span>

                        <span className="font-bold text-zinc-200">
                          {payment.total}
                        </span>
                      </div>

                      {/* METHOD + DATE */}

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[14px] text-zinc-500">
                        <span>{payment.method}</span>

                        <span className="text-zinc-700">·</span>

                        <span>{payment.date}</span>
                      </div>
                    </div>

                    {/* =================================================
                        PROOF
                    ================================================== */}

                    <div className="shrink-0">
                      <button
                        onClick={() =>
                          alert(`Viewing proof for ${payment.order}`)
                        }
                        className="rounded-xl transition hover:scale-[1.03] hover:ring-1 hover:ring-purple-500/50"
                        title="View payment proof"
                      >
                        <ReceiptPreview type={payment.proof} />
                      </button>
                    </div>

                    {/* =================================================
                        ACTION BUTTONS
                    ================================================== */}

                    <div className="flex w-full shrink-0 flex-col gap-3 sm:w-[205px]">
                      {/* APPROVE */}

                      <button
                        disabled={payment.status !== "Pending"}
                        onClick={() => handleApprove(payment.order)}
                        className={`flex h-[39px] items-center justify-center gap-2 rounded-xl border px-4 text-[13px] font-bold transition ${
                          payment.status === "Pending"
                            ? "border-amber-600/50 bg-amber-950/80 text-amber-400 hover:bg-amber-900/80"
                            : "cursor-not-allowed border-zinc-800 bg-zinc-900/50 text-zinc-600"
                        }`}
                      >
                        <span className="text-base">✓</span>
                        Approve &amp; Send Ticket
                      </button>

                      {/* REJECT */}

                      <button
                        disabled={payment.status !== "Pending"}
                        onClick={() => handleReject(payment.order)}
                        className={`flex h-[39px] items-center justify-center gap-2 rounded-xl border px-4 text-[13px] font-bold transition ${
                          payment.status === "Pending"
                            ? "border-red-900/70 bg-red-950/50 text-red-400 hover:bg-red-900/60"
                            : "cursor-not-allowed border-zinc-800 bg-zinc-900/50 text-zinc-600"
                        }`}
                      >
                        <span className="text-base">×</span>
                        Reject Payment
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* =================================================
              FOOTER
          ================================================== */}

          <footer className="py-10 text-center text-sm text-zinc-500">
            © 2026 Nocturne Admin Portal. All rights reserved. Built for concert
            organizers.
          </footer>
        </div>
      </main>
    </div>
  );
}
