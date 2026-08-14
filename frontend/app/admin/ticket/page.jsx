"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Bell,
  BarChart3,
  ChevronDown,
  Edit3,
  Inbox,
  LayoutDashboard,
  Lock,
  Menu,
  Mic2,
  QrCode,
  Settings,
  ShieldCheck,
  Tag,
  Ticket,
  Unlock,
  Users,
  X,
} from "lucide-react";

/* =========================================================
   TICKET DATA
========================================================= */

const initialTickets = [
  {
    id: 1,
    name: "VIP Experience",
    price: 2500000,
    quota: 500,
    sold: 423,
    locked: true,
  },
  {
    id: 2,
    name: "CAT 1 - Gold",
    price: 1500000,
    quota: 1500,
    sold: 1280,
    locked: true,
  },
  {
    id: 3,
    name: "CAT 2 - Silver",
    price: 850000,
    quota: 3000,
    sold: 2450,
    locked: true,
  },
  {
    id: 4,
    name: "Festival",
    price: 500000,
    quota: 5000,
    sold: 3200,
    locked: false,
  },
];

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({ open, setOpen }) {
  return (
    <>
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

        {/* MENU */}
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

            {/* TICKET - ACTIVE */}
            <Link
              href="/admin/ticket"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg border-l-2 border-purple-500 bg-purple-900/20 px-3 py-3.5 text-zinc-100"
            >
              <Tag size={19} strokeWidth={1.8} />

              <span className="text-[15px] font-medium">
                Ticket Classes & Quota
              </span>

              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
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

            {/* PAYMENT */}
            <Link
              href="/admin/payment"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <ShieldCheck size={19} strokeWidth={1.8} />

              <span className="text-[15px] font-medium">Verify Payments</span>
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

        {/* SETTINGS */}
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
    <header className="fixed right-0 top-0 z-30 h-[98px] border-b border-white/[0.06] bg-[#0a0815]/90 backdrop-blur-xl lg:left-[290px]">
      <div className="flex h-full items-center px-5 sm:px-8">
        <button
          onClick={() => setOpen(true)}
          className="text-zinc-300 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="ml-auto flex items-center gap-5">
          {/* NOTIFICATION */}
          <button className="relative text-zinc-400 hover:text-zinc-200">
            <Bell size={21} />

            <span className="absolute -right-1 -top-2 h-2.5 w-2.5 rounded-full border border-[#0a0815] bg-amber-500" />
          </button>

          {/* INBOX */}
          <button className="relative text-zinc-400 hover:text-zinc-200">
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
   TICKET PAGE
========================================================= */

export default function TicketPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [tickets, setTickets] = useState(initialTickets);

  const [selectedEvent, setSelectedEvent] = useState(
    "Celestial Night Tour 2026",
  );

  const [editingTicket, setEditingTicket] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    quota: "",
  });

  /* =====================================================
     FORMAT PRICE
  ===================================================== */

  const formatPrice = (price) => {
    return `IDR ${Number(price).toLocaleString("en-US")}`;
  };

  /* =====================================================
     EDIT PRICE
  ===================================================== */

  const openEdit = (ticket) => {
    setEditingTicket(ticket);

    setForm({
      name: ticket.name,
      price: ticket.price,
      quota: ticket.quota,
    });

    setShowModal(true);
  };

  /* =====================================================
     SAVE EDIT
  ===================================================== */

  const saveTicket = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.quota) {
      alert("Semua data wajib diisi.");
      return;
    }

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === editingTicket.id
          ? {
              ...ticket,
              name: form.name,
              price: Number(form.price),
              quota: Number(form.quota),
            }
          : ticket,
      ),
    );

    setShowModal(false);
    setEditingTicket(null);
  };

  /* =====================================================
     LOCK / UNLOCK SALES
  ===================================================== */

  const toggleLock = (id) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              locked: !ticket.locked,
            }
          : ticket,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#080612] text-zinc-200">
      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* TOPBAR */}
      <Topbar setOpen={setSidebarOpen} />

      {/* MAIN */}
      <main className="min-h-screen pt-[98px] lg:pl-[290px]">
        {/* BACKGROUND */}
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          <div className="absolute left-[18%] top-[5%] h-[500px] w-[650px] rounded-full bg-purple-900/20 blur-[150px]" />

          <div className="absolute right-[10%] top-[15%] h-[450px] w-[550px] rounded-full bg-violet-900/20 blur-[150px]" />

          <div className="absolute bottom-0 left-[25%] h-[400px] w-[600px] rounded-full bg-purple-950/30 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-7 xl:px-8">
          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <h1 className="mb-7 text-[28px] font-bold tracking-tight text-zinc-100">
            Ticket Classes & Quota
          </h1>

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[21px] font-bold text-zinc-100">
                Ticket Classes & Quota
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Manage ticket categories, pricing, and sales locks per event
              </p>
            </div>

            {/* EVENT SELECT */}
            <div className="relative">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="h-11 min-w-[250px] appearance-none rounded-xl border border-purple-500/20 bg-[#08070f] px-5 pr-10 text-sm font-semibold text-zinc-300 outline-none focus:border-purple-500/50"
              >
                <option>Celestial Night Tour 2026</option>

                <option>Neon Pulse Arena</option>

                <option>Midnight Symphony</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />
            </div>
          </div>

          {/* =================================================
              TICKET CARDS
          ================================================= */}

          <div className="space-y-4">
            {tickets.map((ticket) => {
              const remaining = ticket.quota - ticket.sold;

              const percentage = Math.round((ticket.sold / ticket.quota) * 100);

              const isAlmostFull = percentage >= 80;

              return (
                <div
                  key={ticket.id}
                  className="rounded-2xl border border-white/[0.035] bg-[#05040d]/90 px-5 py-6 shadow-xl sm:px-6"
                >
                  {/* TOP */}
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    {/* LEFT */}
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-3 w-3 rounded-full ${
                            isAlmostFull ? "bg-amber-500" : "bg-zinc-500"
                          }`}
                        />

                        <h3 className="text-[17px] font-bold text-zinc-200">
                          {ticket.name}
                        </h3>
                      </div>

                      {/* INFO */}
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                        <span className="font-medium text-zinc-300">
                          {formatPrice(ticket.price)}
                        </span>

                        <button
                          onClick={() => openEdit(ticket)}
                          className="text-zinc-400 transition hover:text-purple-400"
                          title="Edit ticket"
                        >
                          <Edit3 size={14} />
                        </button>

                        <span className="text-zinc-700">•</span>

                        <span>
                          Quota: {ticket.quota.toLocaleString("en-US")}
                        </span>

                        <span className="text-zinc-700">•</span>

                        <span>
                          {remaining.toLocaleString("en-US")} remaining
                        </span>
                      </div>
                    </div>

                    {/* LOCK BUTTON */}
                    <button
                      onClick={() => toggleLock(ticket.id)}
                      className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
                        ticket.locked
                          ? "bg-amber-950/50 text-amber-500 hover:bg-amber-900/60"
                          : "bg-zinc-800/80 text-zinc-500 hover:bg-zinc-700"
                      }`}
                    >
                      {ticket.locked ? (
                        <Lock size={14} />
                      ) : (
                        <Unlock size={14} />
                      )}

                      {ticket.locked
                        ? "Lock Category Sales"
                        : "Unlock Category Sales"}
                    </button>
                  </div>

                  {/* SOLD */}
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-400">
                      Sold:{" "}
                      <span className="font-bold text-zinc-300">
                        {ticket.sold.toLocaleString("en-US")}
                      </span>
                    </span>

                    <span className="text-sm text-zinc-500">{percentage}%</span>
                  </div>

                  {/* PROGRESS */}
                  <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-zinc-800/80">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  {/* SCALE */}
                  <div className="mt-1.5 flex justify-between text-xs text-zinc-600">
                    <span>0</span>

                    <span>{ticket.quota.toLocaleString("en-US")}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="py-11 text-center text-sm text-zinc-500">
            © 2026 Nocturne Admin Portal. All rights reserved. Built for concert
            organizers.
          </footer>
        </div>
      </main>

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-[500px] rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/60">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100">
                  Edit Ticket Category
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Update ticket pricing and quota.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-500 hover:text-zinc-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={saveTicket} className="space-y-4">
              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Ticket Category
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none focus:border-purple-500/50"
                />
              </div>

              {/* PRICE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Price
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price: e.target.value,
                    })
                  }
                  className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none focus:border-purple-500/50"
                />
              </div>

              {/* QUOTA */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Total Quota
                </label>

                <input
                  type="number"
                  min={editingTicket?.sold || 0}
                  value={form.quota}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      quota: e.target.value,
                    })
                  }
                  className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none focus:border-purple-500/50"
                />
              </div>

              {/* BUTTON */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-white/[0.07] px-5 py-2.5 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.04] hover:text-zinc-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-purple-700 to-violet-800 px-5 py-2.5 text-sm font-bold text-white transition hover:from-purple-600 hover:to-violet-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
