"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AdminProfileModal from "@/components/AdminProfileModal";
import {
  Bell,
  ChevronDown,
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
  TrendingUp,
  TrendingDown,
  BarChart3,
  CalendarDays,
  MapPin,
  ArrowRight,
  Tag,
  CheckCircle2,
  X,
  RefreshCw,
  Loader2,
} from "lucide-react";

/* =========================================================
   SIDEBAR (PRESERVED EXACTLY AS EXISTING)
========================================================= */

function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-label="Close sidebar"
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
            <a
              href="/admin"
              className="flex w-full items-center gap-5 rounded-lg border-l-2 border-purple-500 bg-purple-900/20 px-3 py-3.5 text-zinc-100"
            >
              <LayoutDashboard size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Dashboard</span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
            </a>

            <a
              href="/admin/event"
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <Ticket size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Event CRUD</span>
            </a>

            <a
              href="/admin/ticket"
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <TicketCheck size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Ticket Classes &amp; Quota</span>
            </a>

            <a
              href="/admin/payment"
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <ShieldCheck size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Verify Payments</span>
            </a>

            <a
              href="/admin/scanner"
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <QrCode size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">QR Ticket Scanner</span>
            </a>

            <a
              href="/admin/reports"
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <BarChart3 size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Sales Reports</span>
            </a>
          </nav>
        </div>

        {/* Settings */}
        <div className="mt-auto p-5">
          <button className="flex w-full items-center gap-4 rounded-lg bg-[#100d20] px-3 py-3.5 text-left hover:bg-[#17112a] transition">
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

function Topbar({ setOpen, adminUser, onUpdateUser }) {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const initial = adminUser?.name ? adminUser.name.trim().charAt(0).toUpperCase() : "A";
  const displayName = adminUser?.name || "Admin";
  const displayEmail = adminUser?.email || "admin@konser.com";
  const displayRole = adminUser?.role === "admin" ? "SYSTEM ADMIN" : (adminUser?.role?.toUpperCase() || "ADMIN");

  return (
    <>
      <header className="fixed right-0 top-0 z-30 h-[98px] border-b border-white/[0.06] bg-[#0a0815]/90 backdrop-blur-xl lg:left-[292px]">
        <div className="flex h-full items-center px-5 sm:px-8">
          <button
            onClick={() => setOpen(true)}
            className="text-zinc-300 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>

          <div className="ml-auto flex items-center gap-5">
            {/* Notification */}
            <button
              className="relative text-zinc-400 hover:text-zinc-200 transition"
              aria-label="Notifications"
            >
              <Bell size={21} />
              <span className="absolute -right-1 -top-2 h-2.5 w-2.5 rounded-full border border-[#0a0815] bg-amber-500" />
            </button>

            {/* Inbox */}
            <button
              className="relative text-zinc-400 hover:text-zinc-200 transition"
              aria-label="Inbox"
            >
              <Inbox size={21} />
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1 text-[10px] font-bold text-white">
                3
              </span>
            </button>

            <div className="mx-1 h-9 w-px bg-white/[0.07]" />

            {/* Profile Button */}
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

      {/* Modal Profil Admin */}
      <AdminProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={adminUser}
        onUpdateUser={onUpdateUser}
      />
    </>
  );
}

/* =========================================================
   STATISTIC CARD COMPONENT
========================================================= */

function StatCard({ icon: Icon, title, value, change, isPositive, subtitle, iconColor = "purple" }) {
  const iconThemes = {
    purple: "bg-purple-950/50 border-purple-500/30 text-purple-400 shadow-purple-950/40",
    violet: "bg-violet-950/50 border-violet-500/30 text-violet-400 shadow-violet-950/40",
    indigo: "bg-indigo-950/50 border-indigo-500/30 text-indigo-400 shadow-indigo-950/40",
    amber: "bg-amber-950/40 border-amber-500/30 text-amber-400 shadow-amber-950/30",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c0a1a]/90 p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition hover:border-purple-500/30 hover:bg-[#100d22]">
      {/* Top row: Icon & Trend badge */}
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition group-hover:scale-105 ${
            iconThemes[iconColor] || iconThemes.purple
          }`}
        >
          <Icon size={20} strokeWidth={2} />
        </div>

        {change && (
          <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              isPositive
                ? "border border-emerald-500/25 bg-emerald-950/40 text-emerald-400"
                : "border border-rose-500/25 bg-rose-950/40 text-rose-400"
            }`}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{change}</span>
          </div>
        )}

        {subtitle && !change && (
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-zinc-400">
            {subtitle}
          </span>
        )}
      </div>

      {/* Value & Label */}
      <div className="mt-4">
        <div className="text-[26px] sm:text-[28px] font-bold tracking-tight text-zinc-100">
          {value}
        </div>
        <div className="mt-1 text-xs sm:text-sm font-medium text-zinc-400">
          {title}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SALES OVERVIEW LINE CHART COMPONENT
========================================================= */

const DEFAULT_SALES_DATA = {
  "7D": {
    label: "7 Hari Terakhir",
    totalSold: "0",
    growth: "+14.2%",
    isPositive: true,
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    values: [0, 0, 0, 0, 0, 0, 0],
    maxVal: 10,
    ySteps: ["10", "8", "6", "4", "0"],
  },
  "30D": {
    label: "30 Hari Terakhir",
    totalSold: "0",
    growth: "+24.5%",
    isPositive: true,
    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
    values: [0, 0, 0, 0],
    maxVal: 50,
    ySteps: ["50", "38", "25", "12", "0"],
  },
  "1Y": {
    label: "12 Bulan Terakhir",
    totalSold: "0",
    growth: "+38.1%",
    isPositive: true,
    labels: ["Jan", "Mar", "Mei", "Jul", "Sep", "Nov"],
    values: [0, 0, 0, 0, 0, 0],
    maxVal: 100,
    ySteps: ["100", "75", "50", "25", "0"],
  },
};

function SalesOverviewChart({ salesData }) {
  const [period, setPeriod] = useState("30D");
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const activeMap = salesData || DEFAULT_SALES_DATA;
  const currentData = activeMap[period] || DEFAULT_SALES_DATA["30D"];

  // SVG Chart Dimensions
  const svgWidth = 600;
  const svgHeight = 220;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 30;

  const chartW = svgWidth - padLeft - padRight;
  const chartH = svgHeight - padTop - padBottom;

  const count = currentData.values?.length || 1;
  const maxVal = Math.max(
    currentData.maxVal || 10,
    Math.max(...(currentData.values || [0]), 10)
  );

  // Calculate coordinates for points
  const points = (currentData.values || []).map((val, idx) => {
    const x = padLeft + (idx / Math.max(count - 1, 1)) * chartW;
    const ratio = Math.min(Math.max(val / maxVal, 0), 1);
    const y = padTop + (1 - ratio) * chartH;
    return { x, y, val, label: currentData.labels?.[idx] || "" };
  });

  // Build smooth cubic bezier line path
  let linePathD = "";
  if (points.length > 0) {
    linePathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      linePathD += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
  }

  // Build area gradient path
  const areaPathD =
    points.length > 0
      ? `${linePathD} L ${points[points.length - 1].x} ${svgHeight - padBottom} L ${points[0].x} ${
          svgHeight - padBottom
        } Z`
      : "";

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#0c0a1a]/90 p-5 sm:p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
      {/* Top Header: Title & Time Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.05] pb-4">
        <div>
          <h2 className="text-[17px] font-bold text-zinc-100">Sales Overview</h2>
          <p className="mt-0.5 text-xs text-zinc-400">
            Total tiket terjual pada periode yang dipilih
          </p>
        </div>

        {/* Time filters: 7D, 30D, 1Y */}
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-black/40 p-1 w-fit">
          {["7D", "30D", "1Y"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setPeriod(item);
                setHoveredIdx(null);
              }}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                period === item
                  ? "bg-purple-600 text-white shadow-md shadow-purple-950/50"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Highlight */}
      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        <div className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-white">
          {currentData.totalSold || "0"}
        </div>
        <div className="text-xs sm:text-sm font-medium text-zinc-400">
          Tickets Sold
        </div>
        <div className="flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-950/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
          <TrendingUp size={12} />
          <span>{currentData.growth || "+24.5%"}</span>
        </div>
      </div>

      {/* Responsive SVG Line Chart */}
      <div className="relative mt-4 w-full select-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            {/* Area gradient under line */}
            <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.32" />
              <stop offset="70%" stopColor="#9333ea" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing filter for chart stroke */}
            <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#a855f7" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Horizontal grid lines & Y-axis labels */}
          {(currentData.ySteps || ["10", "5", "0"]).map((label, idx, arr) => {
            const yPos = padTop + (idx / Math.max(arr.length - 1, 1)) * chartH;
            return (
              <g key={`${label}-${idx}`}>
                <line
                  x1={padLeft}
                  y1={yPos}
                  x2={svgWidth - padRight}
                  y2={yPos}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeDasharray="4 4"
                />
                <text
                  x={padLeft - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  fill="rgba(161, 161, 170, 0.5)"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Area polygon fill */}
          {areaPathD && <path d={areaPathD} fill="url(#purpleAreaGrad)" />}

          {/* Main curve line */}
          {linePathD && (
            <path
              d={linePathD}
              fill="none"
              stroke="#a855f7"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#purpleGlow)"
            />
          )}

          {/* Active hover guideline */}
          {hoveredIdx !== null && points[hoveredIdx] && (
            <line
              x1={points[hoveredIdx].x}
              y1={padTop}
              x2={points[hoveredIdx].x}
              y2={svgHeight - padBottom}
              stroke="rgba(168, 85, 247, 0.45)"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />
          )}

          {/* Interactive data points */}
          {points.map((pt, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <g key={idx}>
                {/* Hit area */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={16}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />

                {/* Visible dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 3.5}
                  fill={isHovered ? "#ffffff" : "#a855f7"}
                  stroke="#7c3aed"
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="pointer-events-none transition-all duration-150"
                />

                {/* X-axis date labels */}
                <text
                  x={pt.x}
                  y={svgHeight - 10}
                  textAnchor="middle"
                  fill={isHovered ? "#e4e4e7" : "rgba(161, 161, 170, 0.65)"}
                  fontSize="11"
                  fontWeight={isHovered ? "600" : "400"}
                  className="pointer-events-none transition-colors"
                >
                  {pt.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating tooltip on point hover */}
        {hoveredIdx !== null && points[hoveredIdx] && (
          <div
            className="pointer-events-none absolute -top-3 -translate-x-1/2 -translate-y-full rounded-xl border border-purple-500/40 bg-[#0e0b1f]/95 px-3 py-1.5 shadow-xl shadow-purple-950/60 backdrop-blur-md"
            style={{
              left: `${(points[hoveredIdx].x / svgWidth) * 100}%`,
            }}
          >
            <div className="font-mono text-xs font-bold text-white">
              {points[hoveredIdx].val.toLocaleString()} tickets
            </div>
            <div className="text-[10px] text-zinc-400">
              {points[hoveredIdx].label} ({currentData.label})
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   ACTIVE EVENT CARD COMPONENT
========================================================= */

function ActiveEventCard({ eventData }) {
  const event = eventData || {
    title: "Celestial Night Tour 2026",
    venue: "Jakarta International Stadium (JIS)",
    event_date_formatted: "15 Agustus 2026 • 19:30 WIB",
    banner_url:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80",
    stage_layout: "World Stadium Tour",
    sold_tickets: 7353,
    total_quota: 10000,
    percentage: 74,
    is_closed: 0,
  };

  const sold = Number(event.sold_tickets) || 0;
  const quota = Number(event.total_quota) || 10000;
  const percentage =
    event.percentage !== undefined
      ? event.percentage
      : quota > 0
      ? Math.round((sold / quota) * 100)
      : 0;

  const isClosed = event.is_closed === 1;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#0c0a1a]/90 p-5 sm:p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
      {/* Header: Title & Status */}
      <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
        <div>
          <h2 className="text-[17px] font-bold text-zinc-100">Active Event</h2>
          <p className="mt-0.5 text-xs text-zinc-400">
            Konser utama yang sedang berjalan saat ini
          </p>
        </div>

        {isClosed ? (
          <span className="flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/60 px-2.5 py-1 text-xs font-semibold text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-zinc-500" />
            Closed
          </span>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Active / On Sale
          </span>
        )}
      </div>

      {/* Event Banner Image */}
      <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-purple-950/40 shadow-inner">
        <img
          src={
            event.banner_url ||
            "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80"
          }
          alt={event.title || "Konser Nocturne"}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
          onError={(e) => {
            // Elegant fallback if custom URL fails to load
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Floating Category Pill on Image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="rounded-md border border-purple-500/40 bg-purple-950/80 px-2.5 py-0.5 text-[11px] font-bold text-purple-300 backdrop-blur-md">
            {event.stage_layout || event.artist_name || "Live Concert"}
          </span>
        </div>
      </div>

      {/* Event Information */}
      <div className="mt-4 space-y-2">
        <h3 className="text-[18px] font-bold text-white tracking-tight line-clamp-1">
          {event.title}
        </h3>

        <div className="flex flex-col gap-1.5 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-purple-400 shrink-0" />
            <span className="truncate">{event.venue || "Venue Konser"}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={14} className="text-purple-400 shrink-0" />
            <span>{event.event_date_formatted || "Tanggal konser"}</span>
          </div>
        </div>
      </div>

      {/* Ticket Progress Bar */}
      <div className="mt-4 pt-3 border-t border-white/[0.05]">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Ticket size={13} className="text-purple-400" />
            Tickets Sold
          </span>
          <span>
            {sold.toLocaleString("id-ID")} / {quota.toLocaleString("id-ID")}{" "}
            <span className="text-purple-400">({percentage}%)</span>
          </span>
        </div>

        {/* Clean Progress Bar */}
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-800/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-400 transition-all duration-500 shadow-sm shadow-purple-500/50"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* View Event Details Link */}
      <Link
        href="/admin/event"
        className="group mt-4 flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-xs sm:text-sm font-semibold text-zinc-200 transition hover:border-purple-500/40 hover:bg-purple-950/20 hover:text-white"
      >
        <span>View Event Details</span>
        <ArrowRight
          size={16}
          className="text-purple-400 transition-transform group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

/* =========================================================
   RECENT ACTIVITIES SECTION COMPONENT
========================================================= */

const ICON_MAP = {
  shield: ShieldCheck,
  dollar: CircleDollarSign,
  ticket: Ticket,
  qr: QrCode,
  tag: Tag,
};

function RecentActivitiesSection({ activities }) {
  const hasActivities = activities && activities.length > 0;

  return (
    <section className="mt-6 rounded-2xl border border-white/[0.06] bg-[#0c0a1a]/90 p-5 sm:p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/[0.05] pb-4">
        <div>
          <h2 className="text-[17px] font-bold text-zinc-100">
            Recent Activities
          </h2>
          <p className="mt-0.5 text-xs text-zinc-400">
            Aktivitas operasional terkini dari pemesanan, tiket, dan penerbitan konser
          </p>
        </div>

        <span className="text-[11px] font-medium text-zinc-500">
          {hasActivities ? `Menampilkan ${activities.length} aktivitas terbaru` : "Belum ada aktivitas"}
        </span>
      </div>

      {/* Activity List */}
      <div className="mt-4 divide-y divide-white/[0.04]">
        {!hasActivities ? (
          <div className="py-8 text-center text-sm text-zinc-500">
            Belum ada aktivitas baru yang tercatat di database.
          </div>
        ) : (
          activities.map((item) => {
            const Icon = ICON_MAP[item.iconType] || Ticket;
            return (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 transition hover:bg-white/[0.015] -mx-2 px-2 rounded-xl"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-black/40 text-purple-400 transition group-hover:scale-105 group-hover:border-purple-500/30">
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-purple-300 transition truncate">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-zinc-400 truncate max-w-[620px]">
                      {item.detail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 sm:ml-4 self-end sm:self-center">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                      item.badgeTheme ||
                      "border-purple-500/30 bg-purple-950/40 text-purple-300"
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-zinc-500 whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

/* =========================================================
   MAIN ADMIN DASHBOARD PAGE
========================================================= */

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState({
    name: "Admin",
    email: "admin@konser.com",
    role: "admin",
    avatar_url: null,
  });

  // Live Dashboard State
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load user from localStorage
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

  // Fetch Live Data from Backend Database
  const fetchDashboardData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("/api/dashboard", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to fetch dashboard data`);
      }

      const result = await res.json();
      if (result.success && result.data) {
        setDashboardData(result.data);
      }
    } catch (err) {
      console.warn("Could not load live dashboard data from /api/dashboard:", err.message);
    } finally {
      setIsLoading(false);
      if (isManualRefresh) setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleUpdateUser = (updated) => {
    if (updated) {
      setAdminUser(updated);
    } else {
      loadUserData();
    }
  };

  // Safe Stats Fallbacks
  const stats = dashboardData?.stats || {
    totalRevenue: 0,
    totalRevenueFormatted: "Rp 0",
    revenueGrowth: "+0.0%",
    ticketsSold: 0,
    ticketsSoldFormatted: "0",
    ticketsGrowth: "+0.0%",
    activeEvents: 0,
    pendingVerifications: 0,
  };

  return (
    <div className="min-h-screen bg-[#080612] text-zinc-200">
      {/* Existing Sidebar preserved exactly */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Topbar with notification & admin profile */}
      <Topbar
        setOpen={setSidebarOpen}
        adminUser={adminUser}
        onUpdateUser={handleUpdateUser}
      />

      <main className="min-h-screen pt-[98px] lg:pl-[292px]">
        {/* Ambient Purple Background Glows */}
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          <div className="absolute left-[20%] top-[10%] h-[500px] w-[600px] rounded-full bg-purple-900/15 blur-[160px]" />
          <div className="absolute right-[10%] top-[15%] h-[400px] w-[500px] rounded-full bg-violet-900/15 blur-[160px]" />
          <div className="absolute bottom-0 left-[35%] h-[400px] w-[500px] rounded-full bg-purple-950/20 blur-[160px]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-7 xl:px-8">
          {/* A. Header Section */}
          <section className="mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-zinc-100">
                Welcome back, {adminUser.name || "Admin"}
              </h1>
              <p className="mt-1 text-sm sm:text-[15px] text-zinc-400">
                Here&apos;s what&apos;s happening with your concert platform today.
              </p>
            </div>

            {/* Live Database Sync Badge & Refresh Button */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-950/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Database
              </span>

              <button
                type="button"
                onClick={() => fetchDashboardData(true)}
                disabled={isRefreshing}
                className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-purple-500/30 hover:bg-purple-950/30 hover:text-white disabled:opacity-50"
                title="Sinkronkan data live terbaru dari database"
              >
                <RefreshCw
                  size={13}
                  className={isRefreshing ? "animate-spin text-purple-400" : "text-zinc-400"}
                />
                <span>{isRefreshing ? "Syncing..." : "Sync"}</span>
              </button>
            </div>
          </section>

          {/* B. Statistics Section — 4 Cards in ONE Horizontal Row */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {/* 1. Total Revenue */}
            <StatCard
              icon={CircleDollarSign}
              title="Total Revenue"
              value={stats.totalRevenueFormatted}
              change={stats.revenueGrowth}
              isPositive={true}
              iconColor="purple"
            />

            {/* 2. Tickets Sold */}
            <StatCard
              icon={Ticket}
              title="Tickets Sold"
              value={stats.ticketsSoldFormatted}
              change={stats.ticketsGrowth}
              isPositive={true}
              iconColor="violet"
            />

            {/* 3. Active Events */}
            <StatCard
              icon={CalendarDays}
              title="Active Events"
              value={(stats.activeEvents || 0).toString()}
              subtitle={
                stats.activeEvents > 0
                  ? `${stats.activeEvents} konser aktif`
                  : "Belum ada konser"
              }
              iconColor="indigo"
            />

            {/* 4. Pending Verifications */}
            <StatCard
              icon={Clock3}
              title="Pending Verifications"
              value={(stats.pendingVerifications || 0).toString()}
              change={
                stats.pendingVerifications > 0
                  ? `${stats.pendingVerifications} butuh verifikasi`
                  : null
              }
              subtitle={
                stats.pendingVerifications === 0
                  ? "Semua terverifikasi"
                  : null
              }
              isPositive={stats.pendingVerifications === 0}
              iconColor="amber"
            />
          </section>

          {/* C. Main Content — Two Column Layout */}
          <section className="mt-6 grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6">
            {/* Left Column: Sales Overview Chart */}
            <SalesOverviewChart salesData={dashboardData?.salesOverview} />

            {/* Right Column: Active Event Card */}
            <ActiveEventCard eventData={dashboardData?.activeEvent} />
          </section>

          {/* D. Recent Activities Section */}
          <RecentActivitiesSection activities={dashboardData?.recentActivities} />
        </div>
      </main>
    </div>
  );
}
