"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Clock3,
  LayoutDashboard,
  Inbox,
  Menu,
  Mic2,
  Plus,
  QrCode,
  Settings,
  ShieldCheck,
  Ticket,
  TicketCheck,
  Trash2,
  Users,
  BarChart3,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Event CRUD", icon: Ticket },
  { label: "Ticket Classes & Quota", icon: TicketCheck },
  { label: "Artists", icon: Mic2 },
  { label: "Verify Payments", icon: ShieldCheck },
  { label: "QR Ticket Scanner", icon: QrCode },
  { label: "Sales Reports", icon: BarChart3 },
];

const ticketRows = [
  {
    category: "VIP Experience",
    price: "IDR 2,500,000",
    quota: "500",
    sold: "423",
    progress: 85,
    status: "Open",
  },
  {
    category: "CAT 1 - Gold",
    price: "IDR 1,500,000",
    quota: "1,500",
    sold: "1,280",
    progress: 85,
    status: "Open",
  },
  {
    category: "CAT 2 - Silver",
    price: "IDR 850,000",
    quota: "3,000",
    sold: "2,450",
    progress: 82,
    status: "Open",
  },
  {
    category: "Festival",
    price: "IDR 500,000",
    quota: "5,000",
    sold: "3,200",
    progress: 64,
    status: "Closed",
  },
];

function Sidebar({ open, setOpen }) {
  const [active, setActive] = useState("Dashboard");

  return (
    <>
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[292px] flex-col border-r border-purple-500/20 bg-[#0d0b1c] transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
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

        {/* Menu */}
        <div className="px-5 pt-9">
          <p className="mb-4 px-3 text-xs font-bold tracking-[0.13em] text-zinc-500">
            MAIN MENU
          </p>

          <nav className="space-y-1.5">
            {navItems.map(({ label, icon: Icon }) =>
              label === "Event CRUD" ? (
                <Link
                  key={label}
                  href="/admin/event"
                  onClick={() => {
                    setActive(label);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-left transition ${
                    active === label
                      ? "border-l-2 border-purple-500 bg-purple-900/20 text-zinc-100"
                      : "text-zinc-400 hover:bg-white/[0.035] hover:text-zinc-200"
                  }`}
                >
                  <Icon size={19} strokeWidth={1.8} />

                  <span className="text-[15px] font-medium">{label}</span>

                  {active === label && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
                  )}
                </Link>
              ) : (
                <button
                  key={label}
                  onClick={() => {
                    setActive(label);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-left transition ${
                    active === label
                      ? "border-l-2 border-purple-500 bg-purple-900/20 text-zinc-100"
                      : "text-zinc-400 hover:bg-white/[0.035] hover:text-zinc-200"
                  }`}
                >
                  <Icon size={19} strokeWidth={1.8} />

                  <span className="text-[15px] font-medium">{label}</span>

                  {active === label && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
                  )}
                </button>
              ),
            )}
          </nav>
        </div>

        {/* Settings */}
        <div className="mt-auto p-5">
          <button className="flex w-full items-center gap-4 rounded-lg bg-[#100d20] px-3 py-3.5 text-left hover:bg-[#17112a]">
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

function Topbar({ setOpen }) {
  return (
    <header className="fixed right-0 top-0 z-30 h-[98px] border-b border-white/[0.06] bg-[#0a0815]/90 backdrop-blur-xl lg:left-[292px]">
      <div className="flex h-full items-center px-5 sm:px-8">
        <button
          onClick={() => setOpen(true)}
          className="text-zinc-300 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="ml-auto flex items-center gap-5">
          {/* Notification */}
          <button className="relative text-zinc-400 hover:text-zinc-200">
            <Bell size={21} />

            <span className="absolute -right-1 -top-2 h-2.5 w-2.5 rounded-full border border-[#0a0815] bg-amber-500" />
          </button>

          {/* Inbox */}
          <button className="relative text-zinc-400 hover:text-zinc-200">
            <Inbox size={21} />

            <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <div className="mx-1 h-9 w-px bg-white/[0.07]" />

          {/* Profile */}
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

function StatCard({
  icon: Icon,
  value,
  label,
  change,
  accent = "purple",
  down = false,
}) {
  return (
    <div className="relative min-h-[180px] overflow-hidden rounded-2xl border border-white/[0.04] bg-[#05040d]/90 p-6 shadow-xl">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          accent === "gold"
            ? "bg-yellow-950/40 text-yellow-500"
            : accent === "blue"
              ? "bg-blue-950/40 text-blue-400"
              : "bg-purple-950/60 text-purple-400"
        }`}
      >
        <Icon size={20} />
      </div>

      <div
        className={`absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-bold ${
          down
            ? "bg-zinc-800/70 text-zinc-400"
            : "bg-amber-950/60 text-amber-500"
        }`}
      >
        {down ? "⌄ -5" : `⌃ +${change}`}
      </div>

      <div className="mt-5 text-[28px] font-bold tracking-tight text-zinc-100">
        {value}
      </div>

      <div className="mt-1 text-sm text-zinc-500">{label}</div>
    </div>
  );
}

function EventCard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.045] bg-[#05040d]/90 shadow-xl">
      {/* Event Header */}
      <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-950/70 text-purple-400">
            <Mic2 size={21} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[16px] font-bold text-zinc-200">
              Celestial Night Tour 2026
            </h3>

            <p className="mt-0.5 text-sm text-zinc-500">
              Jakarta International Stadium · 2026-09-15
            </p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-5 text-sm">
          <span className="rounded-full bg-amber-950/50 px-3 py-1 text-xs font-semibold text-amber-500">
            Active
          </span>

          <span className="hidden text-zinc-400 sm:block">7,353 tickets</span>

          <strong className="text-zinc-200">IDR 6660.0M</strong>

          <button className="text-zinc-500 hover:text-red-400">
            <Trash2 size={17} />
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-zinc-500 hover:text-zinc-200"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Ticket Table */}
      {expanded && (
        <div className="overflow-x-auto px-6 pb-6">
          <div className="min-w-[850px]">
            <div className="grid grid-cols-[2.1fr_1.5fr_1fr_1fr_1.6fr_1.5fr] gap-5 border-t border-white/[0.04] py-4 text-xs font-medium tracking-wide text-zinc-500">
              <span>CATEGORY</span>
              <span>PRICE</span>
              <span>QUOTA</span>
              <span>SOLD</span>
              <span>PROGRESS</span>
              <span>SALES STATUS</span>
            </div>

            {ticketRows.map((row) => (
              <div
                key={row.category}
                className="grid grid-cols-[2.1fr_1.5fr_1fr_1fr_1.6fr_1.5fr] items-center gap-5 py-3.5"
              >
                <span className="font-semibold text-zinc-300">
                  {row.category}
                </span>

                <span className="text-sm text-zinc-400">{row.price}</span>

                <span className="text-sm text-zinc-400">{row.quota}</span>

                <span className="text-sm font-semibold text-zinc-300">
                  {row.sold}
                    </span>
                    
                    

                {/* Progress */}
                <div className="flex items-center gap-4">
                  <div className="h-1.5 w-[115px] overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className={`h-full rounded-full ${
                        row.progress < 70 ? "bg-yellow-500" : "bg-purple-500"
                      }`}
                      style={{
                        width: `${row.progress}%`,
                      }}
                    />
                  </div>

                  <span className="text-xs text-zinc-500">{row.progress}%</span>
                </div>

                {/* Status */}
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    row.status === "Open"
                      ? "bg-amber-950/50 text-amber-500"
                      : "bg-zinc-800/60 text-zinc-500"
                  }`}
                >
                  <span className="mr-2">●</span>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080612] text-zinc-200">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <Topbar setOpen={setSidebarOpen} />

      <main className="min-h-screen pt-[98px] lg:pl-[292px]">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          <div className="absolute left-[20%] top-[10%] h-[500px] w-[600px] rounded-full bg-purple-900/20 blur-[150px]" />

          <div className="absolute right-[10%] top-[15%] h-[400px] w-[500px] rounded-full bg-violet-900/20 blur-[150px]" />

          <div className="absolute bottom-0 left-[35%] h-[400px] w-[500px] rounded-full bg-purple-950/30 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-7 xl:px-8">
          {/* Heading */}
          <section className="mb-7">
            <h1 className="text-[28px] font-bold tracking-tight text-zinc-100 sm:text-[30px]">
              Nocturne Admin Operations Center
            </h1>

            <p className="mt-1 text-[15px] text-zinc-500">
              Welcome back, Naira — here is your real-time concert management
              overview.
            </p>
          </section>

          {/* Stats */}
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={CircleDollarSign}
              value="IDR 847.5M"
              label="Total Revenue"
              change="18.2%"
            />

            <StatCard
              icon={Ticket}
              value="12,847"
              label="Tickets Sold"
              change="24.5%"
              accent="gold"
            />

            <StatCard
              icon={Mic2}
              value="8"
              label="Active Concerts"
              change="2"
              accent="blue"
            />

            <StatCard
              icon={Clock3}
              value="23"
              label="Pending Verifications"
              down
            />
          </section>

          {/* Event Management */}
          <section className="mt-8">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[21px] font-bold text-zinc-100">
                  Event & Quota Management
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Manage concerts, ticket classes, and sales status
                </p>
              </div>

              <button
                onClick={() => alert("New Event form belum dibuat.")}
                className="flex w-fit items-center gap-2 rounded-lg bg-gradient-to-r from-purple-700 to-violet-800 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/30 transition hover:from-purple-600 hover:to-violet-700"
              >
                <Plus size={18} />
                New Event
              </button>
            </div>

            <EventCard />
          </section>

          {/* Bottom Section */}
          <section className="mt-5 grid gap-5 lg:grid-cols-3">
            {/* Sales */}
            <div className="rounded-2xl border border-white/[0.04] bg-[#05040d]/90 p-5 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-zinc-200">Sales Snapshot</h3>

                  <p className="text-xs text-zinc-500">
                    Ticket sales across active events
                  </p>
                </div>

                <span className="text-xs text-purple-400">Last 7 days</span>
              </div>

              <div className="flex h-32 items-end gap-2">
                {[
                  38, 51, 43, 70, 62, 88, 76, 94, 80, 100, 91, 108, 96, 118,
                ].map((height, index) => (
                  <div
                    key={index}
                    className="group flex h-full flex-1 items-end"
                  >
                    <div
                      className="w-full rounded-t-sm bg-gradient-to-t from-purple-950 to-purple-500/80 opacity-80 transition group-hover:opacity-100"
                      style={{
                        height: `${height}px`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-white/[0.04] bg-[#05040d]/90 p-5">
              <h3 className="font-bold text-zinc-200">Quick Actions</h3>

              <div className="mt-4 space-y-2">
                {[
                  ["Verify-payments", ShieldCheck],
                  ["Scan ticket", QrCode],
                  ["Manage artists", Users],
                  ["View reports", BarChart3],
                ].map(([label, Icon]) => (
                  <button
                    key={label}
                    className="flex w-full items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-3 py-3 text-left text-sm text-zinc-400 transition hover:bg-purple-950/30 hover:text-zinc-200"
                  >
                    <Icon size={17} />

                    {label}

                    <span className="ml-auto">›</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}