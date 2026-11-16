"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AdminProfileModal from "@/components/AdminProfileModal";
import {
  Bell,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Edit3,
  Inbox,
  LayoutDashboard,
  Layers,
  Loader2,
  Lock,
  LogOut,
  MapPin,
  Menu,
  Mic2,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Tag,
  Ticket,
  Trash2,
  Unlock,
  Users,
  X,
} from "lucide-react";

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

            {/* PROFILE BUTTON */}
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

      {/* Modal Profil Besar */}
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
   TEMPLATE LAYOUT PANGGUNG & ZONA PENONTON (Single Source)
========================================================= */

const STAGE_LAYOUT_TEMPLATES = [
  {
    id: "Main Stage",
    name: "Main Stage",
    badge: "Arena / Stadium",
    subtitle: "Panggung Utama Depan (End-Stage)",
    description:
      "Panggung proscenium standar di satu sisi venue dengan area VIP di depan panggung dan tribun bertingkat di bagian belakang.",
    zones: [
      {
        name: "Stage",
        color: "#7c3aed",
        defaultPrice: 3500000,
        defaultQuota: 200,
        desc: "Area panggung utama / akses panggung VIP khusus",
      },
      {
        name: "VIP Zone",
        color: "#3b82f6",
        defaultPrice: 2500000,
        defaultQuota: 500,
        desc: "Tepat di depan panggung utama dengan pandangan terjelas & eksklusif",
      },
      {
        name: "CAT 1 (Side)",
        color: "#ec4899",
        defaultPrice: 1750000,
        defaultQuota: 1000,
        desc: "Sayap panggung kiri & kanan dengan angle panggung intim",
      },
      {
        name: "Festival",
        color: "#10b981",
        defaultPrice: 950000,
        defaultQuota: 3000,
        desc: "Area berdiri bebas (General Standing) di bagian tengah venue",
      },
      {
        name: "Tribune",
        color: "#6366f1",
        defaultPrice: 650000,
        defaultQuota: 2000,
        desc: "Tempat duduk bertingkat di bagian belakang dengan pandangan menyeluruh",
      },
    ],
  },
  {
    id: "Festival",
    name: "Festival",
    badge: "Outdoor / Catwalk",
    subtitle: "T-Stage / Extended Catwalk",
    description:
      "Panggung megah dengan catwalk memanjang ke tengah kerumunan penonton standing, dilengkapi B-Stage untuk interaksi maksimal.",
    zones: [
      {
        name: "Main Stage & Catwalk",
        color: "#7c3aed",
        defaultPrice: 2000000,
        defaultQuota: 500,
        desc: "Akses eksklusif catwalk & B-Stage terdepan",
      },
      {
        name: "Pit A & B (FOS)",
        color: "#ec4899",
        defaultPrice: 1500000,
        defaultQuota: 1500,
        desc: "Front of Stage standing pit di kiri dan kanan catwalk",
      },
      {
        name: "General Admission",
        color: "#10b981",
        defaultPrice: 850000,
        defaultQuota: 5000,
        desc: "Area berdiri bebas festival di seluruh arena tengah",
      },
    ],
  },
  {
    id: "360° Stage",
    name: "360° Stage",
    badge: "In-the-Round",
    subtitle: "Panggung Tengah Melingkar 360°",
    description:
      "Panggung berada di titik pusat arena yang dikelilingi oleh seluruh penonton dari segala penjuru, memberikan visibilitas imersif.",
    zones: [
      {
        name: "Center Stage",
        color: "#7c3aed",
        defaultPrice: 3000000,
        defaultQuota: 300,
        desc: "Panggung utama melingkar di pusat arena",
      },
      {
        name: "VIP Ring (Inner)",
        color: "#3b82f6",
        defaultPrice: 2250000,
        defaultQuota: 800,
        desc: "Lingkaran terdalam mengitari langsung panggung tengah",
      },
      {
        name: "CAT 1 (Outer Ring)",
        color: "#ec4899",
        defaultPrice: 1600000,
        defaultQuota: 1500,
        desc: "Lingkaran tengah dengan sudut pandang 360 derajat",
      },
      {
        name: "4-Quadrant Tribunes",
        color: "#6366f1",
        defaultPrice: 900000,
        defaultQuota: 4000,
        desc: "Tribun 4 kuadran (North-W, North-E, South-W, South-E)",
      },
    ],
  },
  {
    id: "Theater",
    name: "Theater",
    badge: "Auditorium / Hall",
    subtitle: "Susunan Kursi Bertingkat (Tiered)",
    description:
      "Panggung tertutup dengan susunan kursi akustik berjenjang (Orchestra, Mezzanine, Balcony). Cocok untuk konser intim dan musikal.",
    zones: [
      {
        name: "Proscenium Stage",
        color: "#7c3aed",
        defaultPrice: 2800000,
        defaultQuota: 200,
        desc: "Panggung teater proscenium utama",
      },
      {
        name: "Orchestra (Stalls)",
        color: "#3b82f6",
        defaultPrice: 1950000,
        defaultQuota: 800,
        desc: "Lantai dasar utama tepat di depan panggung teater",
      },
      {
        name: "Mezzanine",
        color: "#ec4899",
        defaultPrice: 1400000,
        defaultQuota: 1000,
        desc: "Tingkat balkon tengah dengan visibilitas sempurna",
      },
      {
        name: "Upper Balcony",
        color: "#6366f1",
        defaultPrice: 750000,
        defaultQuota: 1500,
        desc: "Tingkat atas tribun teater dengan pandangan luas",
      },
    ],
  },
];

// Helper: dapatkan template berdasarkan nama layout
const getTemplateByLayout = (layoutName) => {
  if (!layoutName) return STAGE_LAYOUT_TEMPLATES[0];
  const lower = layoutName.toLowerCase();
  if (lower.includes("festival")) return STAGE_LAYOUT_TEMPLATES[1];
  if (lower.includes("360")) return STAGE_LAYOUT_TEMPLATES[2];
  if (lower.includes("theater") || lower.includes("teater"))
    return STAGE_LAYOUT_TEMPLATES[3];
  return STAGE_LAYOUT_TEMPLATES[0];
};

// Helper: Dapatkan warna dan style visual untuk kartu tiket berdasarkan nama zona & layout
const getCategoryStyle = (ticketName = "", stageLayout = "Main Stage") => {
  const template = getTemplateByLayout(stageLayout);
  const lowerTicket = (ticketName || "").toLowerCase().trim();

  // 1. Cari exact / substring match di template zones event saat ini
  let matchedZone = template.zones.find(
    (z) => z.name.toLowerCase().trim() === lowerTicket
  );

  if (!matchedZone) {
    matchedZone = template.zones.find(
      (z) =>
        lowerTicket.includes(z.name.toLowerCase().trim()) ||
        z.name.toLowerCase().trim().includes(lowerTicket)
    );
  }

  // 2. Jika tidak ada di template saat ini, cari di semua template
  if (!matchedZone) {
    for (const tpl of STAGE_LAYOUT_TEMPLATES) {
      const z = tpl.zones.find(
        (zone) =>
          zone.name.toLowerCase().trim() === lowerTicket ||
          lowerTicket.includes(zone.name.toLowerCase().trim())
      );
      if (z) {
        matchedZone = z;
        break;
      }
    }
  }

  const color = matchedZone ? matchedZone.color : "#a855f7";
  const zoneName = matchedZone ? matchedZone.name : ticketName;
  const desc = matchedZone ? matchedZone.desc : "";

  let barGradient = "from-purple-600 to-violet-400";
  let badgeClass = "bg-purple-500/15 text-purple-300 border-purple-500/40";
  let borderHover = "hover:border-purple-500/40";

  if (color === "#3b82f6") {
    barGradient = "from-blue-600 to-cyan-400";
    badgeClass = "bg-blue-500/15 text-blue-300 border-blue-500/40";
    borderHover = "hover:border-blue-500/40";
  } else if (color === "#ec4899") {
    barGradient = "from-pink-600 to-rose-400";
    badgeClass = "bg-pink-500/15 text-pink-300 border-pink-500/40";
    borderHover = "hover:border-pink-500/40";
  } else if (color === "#10b981") {
    barGradient = "from-emerald-600 to-teal-400";
    badgeClass = "bg-emerald-500/15 text-emerald-300 border-emerald-500/40";
    borderHover = "hover:border-emerald-500/40";
  } else if (color === "#6366f1") {
    barGradient = "from-indigo-600 to-purple-400";
    badgeClass = "bg-indigo-500/15 text-indigo-300 border-indigo-500/40";
    borderHover = "hover:border-indigo-500/40";
  } else if (color === "#7c3aed") {
    barGradient = "from-purple-600 to-violet-400";
    badgeClass = "bg-purple-500/15 text-purple-300 border-purple-500/40";
    borderHover = "hover:border-purple-500/40";
  }

  return {
    name: zoneName,
    color,
    desc,
    barGradient,
    badgeClass,
    borderHover,
  };
};

/* =========================================================
   DIAGRAM LAYOUT PANGGUNG ASLI SESUAI TEMPLATE
========================================================= */

function StageLayoutDiagram({ layout, isLarge = false }) {
  const normalized = (layout || "Main Stage").toLowerCase();

  // 1. FESTIVAL (Outdoor / Catwalk)
  if (normalized.includes("festival")) {
    return (
      <svg
        viewBox="0 0 200 130"
        className={`w-full ${isLarge ? "h-48 sm:h-56" : "h-32"} transition-all`}
      >
        <rect x="8" y="8" width="184" height="114" rx="8" fill="#110e24" stroke="#2e2547" strokeWidth="1.2" />
        {/* Main Stage & T-Catwalk */}
        <rect x="42" y="14" width="116" height="18" rx="3" fill="#7c3aed" />
        <rect x="88" y="32" width="24" height="42" fill="#7c3aed" />
        <circle cx="100" cy="74" r="13" fill="#a855f7" />
        <text x="100" y="26" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">MAIN STAGE</text>
        <text x="100" y="77" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">B-STAGE</text>
        {/* Pit A (Left) & Pit B (Right) */}
        <rect x="20" y="36" width="62" height="42" rx="3" fill="#ec4899" fillOpacity="0.35" stroke="#f472b6" strokeWidth="1" />
        <text x="51" y="59" fill="#fbcfe8" fontSize="6.5" fontWeight="bold" textAnchor="middle">PIT A (FOS)</text>
        <rect x="118" y="36" width="62" height="42" rx="3" fill="#ec4899" fillOpacity="0.35" stroke="#f472b6" strokeWidth="1" />
        <text x="149" y="59" fill="#fbcfe8" fontSize="6.5" fontWeight="bold" textAnchor="middle">PIT B (FOS)</text>
        {/* General Admission / Festival Standing */}
        <rect x="20" y="84" width="160" height="30" rx="4" fill="#10b981" fillOpacity="0.25" stroke="#34d399" strokeWidth="1" />
        <text x="100" y="102" fill="#a7f3d0" fontSize="7" fontWeight="bold" textAnchor="middle">GENERAL ADMISSION (STANDING)</text>
      </svg>
    );
  }

  // 2. 360° STAGE (In-the-Round)
  if (normalized.includes("360")) {
    return (
      <svg
        viewBox="0 0 200 130"
        className={`w-full ${isLarge ? "h-48 sm:h-56" : "h-32"} transition-all`}
      >
        <rect x="8" y="8" width="184" height="114" rx="8" fill="#110e24" stroke="#2e2547" strokeWidth="1.2" />
        {/* Center Stage */}
        <circle cx="100" cy="65" r="17" fill="#7c3aed" stroke="#c084fc" strokeWidth="1.5" />
        <text x="100" y="68" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">360°</text>
        {/* Inner Ring (VIP Ring) */}
        <circle cx="100" cy="65" r="30" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="100" y="45" fill="#93c5fd" fontSize="5.5" fontWeight="bold" textAnchor="middle">VIP RING</text>
        {/* Middle Ring (CAT 1 Outer Ring) */}
        <circle cx="100" cy="65" r="44" fill="none" stroke="#f472b6" strokeWidth="1.2" />
        <text x="100" y="117" fill="#fbcfe8" fontSize="5" textAnchor="middle">CAT 1 OUTER RING</text>
        {/* 4 Quadrants Tribunes */}
        <path d="M 22 18 L 74 18 L 68 38 L 22 38 Z" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="0.8" />
        <text x="46" y="30" fill="#c7d2fe" fontSize="6" textAnchor="middle">NORTH-W</text>
        <path d="M 126 18 L 178 18 L 178 38 L 132 38 Z" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="0.8" />
        <text x="154" y="30" fill="#c7d2fe" fontSize="6" textAnchor="middle">NORTH-E</text>
        <path d="M 22 92 L 68 92 L 74 112 L 22 112 Z" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="0.8" />
        <text x="46" y="104" fill="#c7d2fe" fontSize="6" textAnchor="middle">SOUTH-W</text>
        <path d="M 132 92 L 178 92 L 178 112 L 126 112 Z" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="0.8" />
        <text x="154" y="104" fill="#c7d2fe" fontSize="6" textAnchor="middle">SOUTH-E</text>
      </svg>
    );
  }

  // 3. THEATER (Auditorium / Tiered)
  if (normalized.includes("theater") || normalized.includes("teater")) {
    return (
      <svg
        viewBox="0 0 200 130"
        className={`w-full ${isLarge ? "h-48 sm:h-56" : "h-32"} transition-all`}
      >
        <rect x="8" y="8" width="184" height="114" rx="8" fill="#110e24" stroke="#2e2547" strokeWidth="1.2" />
        {/* Proscenium Stage */}
        <path d="M 38 14 L 162 14 L 152 30 L 48 30 Z" fill="#7c3aed" />
        <text x="100" y="24" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">THEATER STAGE</text>
        {/* Orchestra / Stalls */}
        <path d="M 44 36 L 156 36 L 160 62 L 40 62 Z" fill="#3b82f6" fillOpacity="0.3" stroke="#60a5fa" strokeWidth="1" />
        <text x="100" y="51" fill="#bfdbfe" fontSize="6.5" fontWeight="bold" textAnchor="middle">ORCHESTRA (STALLS)</text>
        {/* Mezzanine */}
        <path d="M 34 68 L 166 68 L 170 86 L 30 86 Z" fill="#ec4899" fillOpacity="0.3" stroke="#f472b6" strokeWidth="1" />
        <text x="100" y="79" fill="#fbcfe8" fontSize="6.5" textAnchor="middle">MEZZANINE TIER</text>
        {/* Balcony */}
        <path d="M 24 92 L 176 92 L 180 112 L 20 112 Z" fill="#6366f1" fillOpacity="0.25" stroke="#818cf8" strokeWidth="1" />
        <text x="100" y="104" fill="#c7d2fe" fontSize="6.5" textAnchor="middle">UPPER BALCONY</text>
      </svg>
    );
  }

  // 4. MAIN STAGE (End-Stage / Arena Stadium)
  return (
    <svg
      viewBox="0 0 200 130"
      className={`w-full ${isLarge ? "h-48 sm:h-56" : "h-32"} transition-all`}
    >
      <rect x="8" y="8" width="184" height="114" rx="8" fill="#110e24" stroke="#2e2547" strokeWidth="1.2" />
      {/* Stage */}
      <rect x="52" y="14" width="96" height="22" rx="4" fill="#7c3aed" />
      <text x="100" y="28" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">MAIN STAGE</text>
      {/* VIP Area */}
      <rect x="62" y="42" width="76" height="22" rx="3" fill="#3b82f6" fillOpacity="0.35" stroke="#60a5fa" strokeWidth="1" />
      <text x="100" y="55" fill="#bfdbfe" fontSize="7" fontWeight="bold" textAnchor="middle">VIP ZONE</text>
      {/* CAT 1 Left & Right */}
      <rect x="18" y="42" width="38" height="34" rx="3" fill="#ec4899" fillOpacity="0.3" stroke="#f472b6" strokeWidth="1" />
      <text x="37" y="61" fill="#fbcfe8" fontSize="6.5" textAnchor="middle">CAT 1</text>
      <rect x="144" y="42" width="38" height="34" rx="3" fill="#ec4899" fillOpacity="0.3" stroke="#f472b6" strokeWidth="1" />
      <text x="163" y="61" fill="#fbcfe8" fontSize="6.5" textAnchor="middle">CAT 1</text>
      {/* Festival */}
      <rect x="62" y="68" width="76" height="22" rx="3" fill="#10b981" fillOpacity="0.25" stroke="#34d399" strokeWidth="1" />
      <text x="100" y="82" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">FESTIVAL</text>
      {/* Tribune Seating */}
      <path d="M 18 80 Q 100 110 182 80 L 182 112 Q 100 118 18 112 Z" fill="#6366f1" fillOpacity="0.25" stroke="#818cf8" strokeWidth="1" />
      <text x="100" y="101" fill="#c7d2fe" fontSize="6.5" fontWeight="500" textAnchor="middle">TRIBUNE SEATING</text>
    </svg>
  );
}

/* =========================================================
   KOMPONEN DENAH PANGGUNG DINAMIS SESUAI KONSER
========================================================= */

function TicketStageLayout({ currentEvent, onSyncTickets, syncing }) {
  const template = getTemplateByLayout(currentEvent?.stage_layout);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#090717]/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.06] pb-4 mb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-purple-400 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-zinc-100">
              Denah Layout: {template.name}
            </h3>
            <span className="rounded-md bg-purple-950/80 border border-purple-500/30 px-2.5 py-0.5 text-xs font-bold text-purple-300">
              {template.badge}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            {template.subtitle} — {template.description}
          </p>
        </div>

        {/* Sync Button */}
        <button
          type="button"
          onClick={onSyncTickets}
          disabled={syncing}
          className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-950/40 px-3.5 py-2 text-xs font-semibold text-purple-200 transition hover:bg-purple-900/60 hover:text-white disabled:opacity-50 shrink-0"
          title="Sinkronisasi ulang kategori tiket dengan layout panggung konser"
        >
          <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
          <span>{syncing ? "Menyelaraskan..." : "Sync Layout"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* SVG Diagram Panggung Interaktif Sesuai Template Asli */}
        <div className="lg:col-span-7 overflow-hidden rounded-xl bg-[#060411]/90 p-3 border border-white/[0.05] shadow-inner">
          <StageLayoutDiagram layout={currentEvent?.stage_layout} isLarge={true} />
        </div>

        {/* Legend Zona Penonton Resmi untuk Layout Ini */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Zona Penonton Resmi ({template.zones.length} Zona):
            </span>
            <span className="text-[11px] text-zinc-500">
              Otomatis sinkron ke tiket
            </span>
          </div>

          <div className="space-y-2">
            {template.zones.map((zone, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-black/40 p-2.5 transition hover:border-purple-500/30"
              >
                <span
                  className="mt-1 h-3.5 w-3.5 rounded-full shrink-0 ring-4"
                  style={{
                    backgroundColor: zone.color,
                    boxShadow: `0 0 10px ${zone.color}60`,
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-zinc-200 truncate">
                      {zone.name}
                    </span>
                    <span className="text-[10px] text-purple-400 font-mono">
                      Zona #{idx + 1}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                    {zone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-zinc-500 italic">
            * Kategori tiket di bawah otomatis dibuat sesuai nama zona penonton di atas. Anda cukup mengatur harga dan kuotanya.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TICKET PAGE
========================================================= */

export default function TicketPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Events state
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Tickets state
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [syncingTickets, setSyncingTickets] = useState(false);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditPriceModal, setShowEditPriceModal] = useState(false);
  const [showEditQuotaModal, setShowEditQuotaModal] = useState(false);
  const [showEditFullModal, setShowEditFullModal] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [addForm, setAddForm] = useState({
    name: "",
    price: "",
    quota: "",
  });

  const [priceForm, setPriceForm] = useState("");
  const [quotaForm, setQuotaForm] = useState("");
  const [fullForm, setFullForm] = useState({
    name: "",
    price: "",
    quota: "",
  });

  // Notification / Alert toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  /* =====================================================
     FORMAT UTILITIES
  ===================================================== */

  const formatPrice = (price) => {
    return `Rp. ${Number(price || 0).toLocaleString("id-ID")}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  /* =====================================================
     1. FETCH TICKETS DARI DATABASE (GET /api/tickets?event_id=)
  ===================================================== */

  const fetchTicketsForEvent = useCallback(async (eventId) => {
    if (!eventId) return;
    setLoadingTickets(true);
    try {
      const token = getToken();
      const res = await fetch(`/api/tickets?event_id=${eventId}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTickets(data.data);
      } else {
        setTickets([]);
      }
    } catch (err) {
      console.error("Gagal mengambil tiket dari database:", err);
      showToast("Gagal memuat kategori tiket dari database", "warning");
    } finally {
      setLoadingTickets(false);
    }
  }, []);

  /* =====================================================
     2. SYNC TICKETS SECARA EKSPLISIT DENGAN LAYOUT PANGGUNG
  ===================================================== */

  const handleSyncTickets = async () => {
    if (!selectedEventId) return;
    setSyncingTickets(true);
    try {
      const token = getToken();
      const res = await fetch(`/api/events/${selectedEventId}/sync-tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || "Kategori tiket berhasil diselaraskan dengan layout!");
        await fetchTicketsForEvent(selectedEventId);
      } else {
        showToast(data.message || "Gagal menyelaraskan kategori tiket", "warning");
      }
    } catch (err) {
      console.error("Error syncing tickets:", err);
      showToast("Terjadi kesalahan saat menyelaraskan tiket", "warning");
    } finally {
      setSyncingTickets(false);
    }
  };

  /* =====================================================
     3. FETCH EVENTS DARI DATABASE (GET /api/events)
  ===================================================== */

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      try {
        const token = getToken();
        const res = await fetch("/api/events", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const data = await res.json();

        let eventList = [];
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          eventList = data.data;
        }

        setEvents(eventList);
      } catch (err) {
        console.error("Error loading events:", err);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  // Handler saat admin memilih event card
  const handleSelectEvent = (eventId) => {
    setSelectedEventId(eventId);
    fetchTicketsForEvent(eventId);
  };

  // Filtered events based on search query
  const filteredEvents = events.filter((evt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = evt.title?.toLowerCase().includes(q);
    const venueMatch = evt.venue?.toLowerCase().includes(q);
    const artistMatch = evt.artist_name?.toLowerCase().includes(q);
    const layoutMatch = evt.stage_layout?.toLowerCase().includes(q);
    return titleMatch || venueMatch || artistMatch || layoutMatch;
  });

  // Active event object
  const currentEvent =
    events.find((e) => e.id === selectedEventId) || null;

  /* =====================================================
     ACTIONS: ADD TICKET CATEGORY (POST /api/tickets)
  ===================================================== */

  const handleOpenAddModal = (preset = null) => {
    if (preset) {
      setAddForm({
        name: preset.name,
        price: preset.defaultPrice ? String(preset.defaultPrice) : "",
        quota: preset.defaultQuota ? String(preset.defaultQuota) : "",
      });
    } else {
      setAddForm({
        name: "",
        price: "",
        quota: "",
      });
    }
    setShowAddModal(true);
  };

  const handleSaveAddCategory = async (e) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.price || !addForm.quota) {
      alert("Harap lengkapi semua kolom kategori tiket.");
      return;
    }

    if (!currentEvent) return;

    setSubmitting(true);
    try {
      const token = getToken();
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          event_id: currentEvent.id,
          name: addForm.name.trim(),
          price: Number(addForm.price),
          quota: Number(addForm.quota),
          is_locked: 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        showToast(`Kategori "${addForm.name.trim()}" berhasil disimpan ke database!`);
        fetchTicketsForEvent(currentEvent.id);
      } else {
        alert(data.message || "Gagal menyimpan kategori tiket ke database.");
      }
    } catch (err) {
      console.error("Error adding ticket category:", err);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     ACTIONS: EDIT PRICE (PUT /api/tickets/[id])
  ===================================================== */

  const handleOpenEditPrice = (ticket) => {
    setActiveTicket(ticket);
    setPriceForm(ticket.price.toString());
    setShowEditPriceModal(true);
  };

  const handleSavePrice = async (e) => {
    e.preventDefault();
    if (!priceForm || Number(priceForm) < 0) {
      alert("Harga tiket harus berupa angka positif.");
      return;
    }

    if (!currentEvent || !activeTicket) return;

    setSubmitting(true);
    try {
      const token = getToken();
      const res = await fetch(`/api/tickets/${activeTicket.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          price: Number(priceForm),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowEditPriceModal(false);
        showToast(`Harga "${activeTicket.name}" berhasil diperbarui di database!`);
        fetchTicketsForEvent(currentEvent.id);
      } else {
        alert(data.message || "Gagal memperbarui harga tiket.");
      }
    } catch (err) {
      console.error("Error updating price:", err);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     ACTIONS: EDIT QUOTA (PUT /api/tickets/[id])
  ===================================================== */

  const handleOpenEditQuota = (ticket) => {
    setActiveTicket(ticket);
    setQuotaForm(ticket.quota.toString());
    setShowEditQuotaModal(true);
  };

  const handleSaveQuota = async (e) => {
    e.preventDefault();
    const newQuota = Number(quotaForm);
    if (!quotaForm || newQuota < 0) {
      alert("Kuota tiket harus berupa angka positif.");
      return;
    }

    if (newQuota < (activeTicket.sold || 0)) {
      alert(
        `Kuota tidak boleh lebih kecil dari jumlah tiket yang sudah terjual (${activeTicket.sold}).`
      );
      return;
    }

    if (!currentEvent || !activeTicket) return;

    setSubmitting(true);
    try {
      const token = getToken();
      const res = await fetch(`/api/tickets/${activeTicket.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          quota: newQuota,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowEditQuotaModal(false);
        showToast(`Kuota "${activeTicket.name}" berhasil diperbarui di database!`);
        fetchTicketsForEvent(currentEvent.id);
      } else {
        alert(data.message || "Gagal memperbarui kuota tiket.");
      }
    } catch (err) {
      console.error("Error updating quota:", err);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     ACTIONS: EDIT FULL (PUT /api/tickets/[id])
  ===================================================== */

  const handleOpenEditFull = (ticket) => {
    setActiveTicket(ticket);
    setFullForm({
      name: ticket.name,
      price: ticket.price.toString(),
      quota: ticket.quota.toString(),
    });
    setShowEditFullModal(true);
  };

  const handleSaveFull = async (e) => {
    e.preventDefault();
    if (!fullForm.name.trim() || !fullForm.price || !fullForm.quota) {
      alert("Semua kolom wajib diisi.");
      return;
    }

    const newQuota = Number(fullForm.quota);
    if (newQuota < (activeTicket.sold || 0)) {
      alert(
        `Kuota tidak boleh lebih kecil dari jumlah tiket yang sudah terjual (${activeTicket.sold}).`
      );
      return;
    }

    if (!currentEvent || !activeTicket) return;

    setSubmitting(true);
    try {
      const token = getToken();
      const res = await fetch(`/api/tickets/${activeTicket.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: fullForm.name.trim(),
          price: Number(fullForm.price),
          quota: newQuota,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowEditFullModal(false);
        showToast(`Kategori "${fullForm.name}" berhasil diperbarui di database!`);
        fetchTicketsForEvent(currentEvent.id);
      } else {
        alert(data.message || "Gagal memperbarui data kategori tiket.");
      }
    } catch (err) {
      console.error("Error updating ticket details:", err);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     ACTIONS: LOCK / UNLOCK SALES (PUT /api/tickets/[id])
  ===================================================== */

  const toggleLockSales = async (ticketId) => {
    if (!currentEvent) return;

    const target = tickets.find((t) => t.id === ticketId);
    if (!target) return;

    const newLocked = !target.locked;

    // Optimistic update
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, locked: newLocked } : t))
    );

    try {
      const token = getToken();
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          is_locked: newLocked ? 1 : 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (newLocked) {
          showToast(`Penjualan "${target.name}" dikunci di database.`, "warning");
        } else {
          showToast(`Penjualan "${target.name}" dibuka di database.`, "success");
        }
      } else {
        // Rollback
        setTickets((prev) =>
          prev.map((t) => (t.id === ticketId ? { ...t, locked: !newLocked } : t))
        );
        alert(data.message || "Gagal mengubah status penjualan tiket.");
      }
    } catch (err) {
      console.error("Error toggling lock:", err);
      // Rollback
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, locked: !newLocked } : t))
      );
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };

  /* =====================================================
     ACTIONS: DELETE CATEGORY (DELETE /api/tickets/[id])
  ===================================================== */

  const handleDeleteCategory = async (ticket) => {
    if (!currentEvent) return;
    if (
      !confirm(
        `Apakah Anda yakin ingin menghapus kategori tiket "${ticket.name}" dari database?`
      )
    ) {
      return;
    }

    try {
      const token = getToken();
      const res = await fetch(`/api/tickets/${ticket.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Kategori "${ticket.name}" telah dihapus dari database.`);
        fetchTicketsForEvent(currentEvent.id);
      } else {
        alert(data.message || "Gagal menghapus kategori tiket dari database.");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };

  // Template untuk event yang sedang aktif
  const currentTemplate = getTemplateByLayout(currentEvent?.stage_layout);

  return (
    <div className="min-h-screen bg-[#080612] text-zinc-200">
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-3 rounded-xl border border-purple-500/30 bg-[#120f26]/95 px-5 py-3.5 text-sm font-semibold text-zinc-100 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
              toast.type === "warning"
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
          <div className="absolute left-[18%] top-[5%] h-[500px] w-[650px] rounded-full bg-purple-900/20 blur-[150px]" />
          <div className="absolute right-[10%] top-[15%] h-[450px] w-[550px] rounded-full bg-violet-900/20 blur-[150px]" />
          <div className="absolute bottom-0 left-[25%] h-[400px] w-[600px] rounded-full bg-purple-950/30 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-7 xl:px-8">
          {/* PAGE HEADER */}
          <div className="mb-8">
            <h1 className="text-[28px] font-bold tracking-tight text-zinc-100">
              Ticket Classes & Quota
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Kategori tiket otomatis diselaraskan dengan template layout panggung konser yang dipilih. Atur harga dan kuota tiket dengan mudah.
            </p>
          </div>

          {/* =================================================
              EVENT SELECTOR SECTION (CARDS)
          ================================================= */}
          <div className="mb-10 rounded-2xl border border-white/[0.06] bg-[#0c0a1a]/80 p-5 shadow-2xl backdrop-blur-sm sm:p-6">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-600/30 text-purple-400 text-xs font-bold">
                    1
                  </span>
                  <h2 className="text-[17px] font-bold text-zinc-100">
                    Pilih Konser untuk Mengelola Kelas Tiket & Denah Panggung
                  </h2>
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  Setiap konser memiliki template denah layout panggung & zona penonton yang berbeda (Main Stage, Festival, 360° Stage, Theater).
                </p>
              </div>

              <div className="text-xs font-medium text-zinc-500">
                Total Konser: <span className="font-bold text-zinc-300">{events.length}</span>
              </div>
            </div>

            {/* SEARCH BAR FOR EVENTS */}
            <div className="mb-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  type="text"
                  placeholder="Cari konser berdasarkan judul, venue, artis, atau layout panggung..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/40 pl-11 pr-10 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-purple-500 focus:bg-black/60 focus:ring-1 focus:ring-purple-500/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-400 transition hover:bg-white/[0.06] hover:text-zinc-200"
                    title="Hapus pencarian"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {searchQuery && (
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span>
                    Ditemukan <strong className="text-purple-300">{filteredEvents.length}</strong> dari {events.length} konser
                  </span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            {loadingEvents ? (
              <div className="flex h-32 items-center justify-center gap-2 text-sm text-zinc-400">
                <Loader2 size={18} className="animate-spin text-purple-400" />
                <span>Memuat daftar event konser dari database...</span>
              </div>
            ) : events.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 text-center text-sm text-zinc-500">
                <Ticket className="mb-2 text-zinc-600" size={32} />
                Belum ada event konser yang tersedia. Silakan buat event di menu Event CRUD.
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="flex h-36 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/20 text-center text-sm text-zinc-400 px-4">
                <Search className="mb-2 text-zinc-600" size={28} />
                <p className="font-semibold text-zinc-300">
                  Tidak ada konser yang cocok dengan "{searchQuery}"
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Coba gunakan kata kunci lain atau reset pencarian.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-3 rounded-lg border border-purple-500/40 bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-300 transition hover:bg-purple-900/60"
                >
                  Reset Pencarian
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredEvents.map((evt) => {
                  const isSelected = selectedEventId === evt.id;
                  const tpl = getTemplateByLayout(evt.stage_layout);
                  
                  let statusLabel = "Active";
                  let statusBg = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
                  if (evt.is_closed === 1) {
                    statusLabel = "Closed";
                    statusBg = "bg-amber-500/10 text-amber-400 border-amber-500/30";
                  } else if (evt.is_closed === 2) {
                    statusLabel = "Cancelled";
                    statusBg = "bg-rose-500/10 text-rose-400 border-rose-500/30";
                  }

                  return (
                    <div
                      key={evt.id}
                      onClick={() => handleSelectEvent(evt.id)}
                      className={`group relative cursor-pointer overflow-hidden rounded-xl border p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-purple-500 bg-gradient-to-br from-purple-950/40 via-[#16102e] to-[#0f0b22] ring-2 ring-purple-500/40 shadow-lg shadow-purple-950/50"
                          : "border-white/[0.06] bg-[#070512]/90 hover:border-purple-500/40 hover:bg-[#120d29]/70"
                      }`}
                    >
                      {/* SELECTED BADGE */}
                      {isSelected && (
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-purple-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                          <CheckCircle2 size={11} />
                          Active
                        </div>
                      )}

                      {/* EVENT TITLE */}
                      <h3
                        className={`text-[15px] font-bold line-clamp-1 pr-14 transition ${
                          isSelected
                            ? "text-purple-200"
                            : "text-zinc-200 group-hover:text-purple-300"
                        }`}
                        title={evt.title}
                      >
                        {evt.title}
                      </h3>

                      {/* LAYOUT BADGE */}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-purple-950/70 border border-purple-500/30 px-2 py-0.5 text-[10.5px] font-semibold text-purple-300">
                          <Layers size={11} />
                          {tpl.name} ({tpl.badge})
                        </span>
                      </div>

                      {/* VENUE & DATE */}
                      <div className="mt-2 space-y-1 text-xs text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="shrink-0 text-zinc-500" />
                          <span className="truncate">{evt.venue || "Venue TBA"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="shrink-0 text-zinc-500" />
                          <span>{formatDate(evt.event_date)}</span>
                        </div>
                      </div>

                      {/* FOOTER INFO */}
                      <div className="mt-3.5 flex items-center justify-between border-t border-white/[0.05] pt-2.5 text-[11px]">
                        <span className={`rounded-full border px-2 py-0.5 font-medium ${statusBg}`}>
                          {statusLabel}
                        </span>

                        <span
                          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                            isSelected
                              ? "bg-purple-600 text-white shadow-sm"
                              : "bg-purple-950/40 text-purple-300 border border-purple-500/30 group-hover:bg-purple-900/60"
                          }`}
                        >
                          {isSelected ? "Dikelola ✓" : "Pilih Konser →"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* =================================================
              SELECTED EVENT TICKET MANAGEMENT
          ================================================= */}
          {!currentEvent ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-purple-500/25 bg-[#0a0718]/60 p-12 text-center shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-950/60 text-purple-400 border border-purple-500/30 mb-4 shadow-lg shadow-purple-950/50">
                <Ticket size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Pilih Konser Terlebih Dahulu
              </h3>
              <p className="mt-1.5 max-w-md text-sm text-zinc-400">
                Klik salah satu kartu konser di atas untuk menampilkan denah panggung yang sesuai dan mengelola kelas tiket beserta kuotanya.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* HEADER TOOLBAR FOR SELECTED EVENT */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-[#100c25] to-[#0a0817] p-5 sm:px-6 shadow-xl">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-purple-400 uppercase">
                    <span className="h-2 w-2 rounded-full bg-purple-400" />
                    Managing Ticket Classes for:
                  </div>
                  <h2 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-100">
                    {currentEvent.title}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-zinc-400">
                    <span>
                      Lokasi: <strong className="text-zinc-200">{currentEvent.venue || "Venue TBA"}</strong>
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span>
                      Tanggal: <strong className="text-zinc-200">{formatDate(currentEvent.event_date)}</strong>
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span>
                      Layout Panggung:{" "}
                      <strong className="text-purple-300">
                        {currentTemplate.name} ({currentTemplate.badge})
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Quick Add Custom Category */}
                <button
                  onClick={() => handleOpenAddModal()}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-900/40 transition hover:from-purple-500 hover:to-violet-600 active:scale-[0.98]"
                  title="Tambah kategori tiket khusus"
                >
                  <Plus size={18} strokeWidth={2.5} />
                  + Tambah Kategori Tiket
                </button>
              </div>

              {/* DENAH LAYOUT PANGGUNG ASLI SESUAI TEMPLATE KONSER */}
              <TicketStageLayout
                currentEvent={currentEvent}
                onSyncTickets={handleSyncTickets}
                syncing={syncingTickets}
              />

              {/* TICKET CATEGORIES LIST */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                      <Tag size={18} className="text-purple-400" />
                      Daftar Kategori Tiket
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Seluruh kategori tiket telah disinkronkan otomatis sesuai zona layout {currentTemplate.name}.
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-zinc-400">
                    Total: <strong className="text-purple-300">{tickets.length}</strong> Kategori
                  </span>
                </div>

                {loadingTickets ? (
                  <div className="flex h-36 flex-col items-center justify-center rounded-2xl border border-white/[0.04] bg-[#070512]/60 gap-3 text-sm text-zinc-400">
                    <Loader2 size={24} className="animate-spin text-purple-400" />
                    <span>Mengambil kategori tiket dari database...</span>
                  </div>
                ) : tickets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#070512]/50 py-12 text-center text-zinc-500">
                    <Tag size={36} className="mb-2 text-zinc-600" />
                    <p className="font-semibold text-zinc-300">
                      Belum ada kategori tiket untuk konser ini
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 max-w-sm">
                      Klik tombol "Sync Layout" di atas untuk otomatis membuat tiket sesuai zona panggung layout {currentTemplate.name}.
                    </p>
                    <button
                      onClick={handleSyncTickets}
                      className="mt-3 rounded-lg border border-purple-500/40 bg-purple-950/50 px-4 py-2 text-xs font-bold text-purple-300 transition hover:bg-purple-900/60"
                    >
                      Sync Kategori dari Denah Sekarang
                    </button>
                  </div>
                ) : (
                  tickets.map((ticket) => {
                    const catStyle = getCategoryStyle(ticket.name, currentEvent.stage_layout);
                    const remaining = Math.max(0, ticket.quota - (ticket.sold || 0));
                    const percentage =
                      ticket.quota > 0
                        ? Math.min(100, Math.round(((ticket.sold || 0) / ticket.quota) * 100))
                        : 0;

                    const isUnset = ticket.price <= 0 || ticket.quota <= 0;

                    return (
                      <div
                        key={ticket.id}
                        className={`rounded-2xl border p-5 sm:p-6 shadow-xl transition-all duration-200 ${
                          ticket.locked
                            ? "border-amber-500/20 bg-[#090714]/90"
                            : isUnset
                            ? "border-purple-500/40 bg-[#0a071a]/95 ring-1 ring-purple-500/30"
                            : `border-white/[0.06] bg-[#070512]/90 ${catStyle.borderHover}`
                        }`}
                      >
                        {/* TOP SECTION */}
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          {/* CATEGORY INFO */}
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span
                                className="h-3.5 w-3.5 rounded-full shrink-0 ring-4"
                                style={{
                                  backgroundColor: catStyle.color,
                                  boxShadow: `0 0 10px ${catStyle.color}80`,
                                }}
                                title={`Zona: ${catStyle.name}`}
                              />

                              <h3 className="text-[18px] font-bold text-zinc-100">
                                {ticket.name}
                              </h3>

                              <span
                                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${catStyle.badgeClass}`}
                              >
                                {catStyle.name || "Kategori"}
                              </span>

                              {/* STATUS BADGE */}
                              {ticket.locked ? (
                                <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-950/40 px-2.5 py-0.5 text-[11px] font-bold text-amber-400">
                                  <Lock size={11} />
                                  Sales Locked
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
                                  <Unlock size={11} />
                                  Sales Open
                                </span>
                              )}

                              {isUnset && (
                                <span className="rounded-full border border-purple-500/40 bg-purple-950/60 px-2.5 py-0.5 text-[11px] font-bold text-purple-300 animate-pulse">
                                  ⚠️ Perlu atur harga / kuota
                                </span>
                              )}
                            </div>

                            {/* PRICE, QUOTA & REMAINING DETAILS */}
                            <div className="mt-2.5 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                              <span className="font-bold text-purple-300 text-base">
                                {formatPrice(ticket.price)}
                              </span>

                              <span className="text-zinc-700">•</span>

                              <span>
                                Quota:{" "}
                                <strong className="font-semibold text-zinc-200">
                                  {Number(ticket.quota).toLocaleString("id-ID")}
                                </strong>{" "}
                                tiket
                              </span>

                              <span className="text-zinc-700">•</span>

                              <span>
                                Sisa:{" "}
                                <strong className="font-semibold text-zinc-300">
                                  {remaining.toLocaleString("id-ID")}
                                </strong>{" "}
                                tiket
                              </span>
                            </div>

                            {catStyle.desc && (
                              <p className="mt-1 text-xs text-zinc-500">
                                Posisi Denah: {catStyle.desc}
                              </p>
                            )}
                          </div>

                          {/* ACTION BUTTONS: Edit Price, Edit Quota, Lock/Unlock Sales */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 lg:pt-0">
                            {/* 1. EDIT PRICE BUTTON */}
                            <button
                              onClick={() => handleOpenEditPrice(ticket)}
                              className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-950/30 px-3.5 py-2 text-xs font-semibold text-purple-200 transition hover:bg-purple-900/50 hover:text-white"
                              title="Edit Harga Tiket"
                            >
                              <DollarSign size={13} className="text-purple-400" />
                              Edit Price
                            </button>

                            {/* 2. EDIT QUOTA BUTTON */}
                            <button
                              onClick={() => handleOpenEditQuota(ticket)}
                              className="flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-950/30 px-3.5 py-2 text-xs font-semibold text-indigo-200 transition hover:bg-indigo-900/50 hover:text-white"
                              title="Edit Kuota Tiket"
                            >
                              <Layers size={13} className="text-indigo-400" />
                              Edit Quota
                            </button>

                            {/* 3. LOCK / UNLOCK SALES BUTTON */}
                            <button
                              onClick={() => toggleLockSales(ticket.id)}
                              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                                ticket.locked
                                  ? "border border-amber-500/40 bg-amber-950/50 text-amber-300 hover:bg-amber-900/60"
                                  : "border border-zinc-700/60 bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                              }`}
                              title={ticket.locked ? "Buka Penjualan" : "Kunci Penjualan"}
                            >
                              {ticket.locked ? (
                                <>
                                  <Unlock size={13} className="text-amber-400" />
                                  Unlock Sales
                                </>
                              ) : (
                                <>
                                  <Lock size={13} className="text-zinc-400" />
                                  Lock Sales
                                </>
                              )}
                            </button>

                            {/* EDIT ALL / DELETE DROPDOWN */}
                            <button
                              onClick={() => handleOpenEditFull(ticket)}
                              className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-zinc-400 transition hover:bg-white/[0.08] hover:text-zinc-200"
                              title="Edit Detail Kategori Lengkap"
                            >
                              <Edit3 size={14} />
                            </button>

                            <button
                              onClick={() => handleDeleteCategory(ticket)}
                              className="flex items-center gap-1 rounded-lg border border-rose-500/20 bg-rose-950/20 p-2 text-rose-400 transition hover:bg-rose-900/40 hover:text-rose-300"
                              title="Hapus Kategori dari Database"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* PROGRESS BAR & STATS */}
                        <div className="mt-5">
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="font-medium text-zinc-400">
                              Terjual:{" "}
                              <strong className="font-bold text-zinc-200">
                                {Number(ticket.sold || 0).toLocaleString("id-ID")}
                              </strong>{" "}
                              / {Number(ticket.quota).toLocaleString("id-ID")} tiket
                            </span>

                            <span className="font-bold" style={{ color: catStyle.color }}>{percentage}%</span>
                          </div>

                          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-zinc-800/80">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                ticket.locked
                                  ? "bg-gradient-to-r from-amber-600 to-amber-400"
                                  : `bg-gradient-to-r ${catStyle.barGradient}`
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>

                          <div className="mt-1.5 flex justify-between text-[11px] text-zinc-500">
                            <span>0</span>
                            <span>{Number(ticket.quota).toLocaleString("id-ID")}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* FOOTER */}
          <footer className="py-12 text-center text-xs text-zinc-500">
            © 2026 Nocturne Admin Portal. All rights reserved. Database-backed Ticket Classes & Quota Management.
          </footer>
        </div>
      </main>

      {/* =====================================================
          MODAL 1: + TAMBAH KATEGORI TIKET
      ===================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-[500px] rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/80">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                  <Plus size={20} className="text-purple-400" />
                  Tambah Kategori Tiket
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Untuk event: <strong className="text-purple-300">{currentEvent?.title}</strong> ({currentTemplate.name})
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAddCategory} className="space-y-4">
              {/* Preset Zona Khusus Layout Event yang Aktif */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-purple-400">
                  Zona Panggung {currentTemplate.name}:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {currentTemplate.zones.map((cat) => {
                    const isPicked = addForm.name === cat.name;
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => {
                          setAddForm({
                            ...addForm,
                            name: cat.name,
                            price: String(cat.defaultPrice || 1000000),
                            quota: addForm.quota || String(cat.defaultQuota || 500),
                          });
                        }}
                        className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs font-bold text-left transition ${
                          isPicked
                            ? "border-purple-500 bg-purple-950/70 text-white ring-2 ring-purple-500/30"
                            : "border-white/[0.08] bg-black/40 text-zinc-300 hover:border-white/20 hover:bg-white/[0.05]"
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full shrink-0"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="truncate">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Nama Kategori Tiket
                </label>
                <input
                  type="text"
                  placeholder="Contoh: VIP Ring, Early Bird, General Admission"
                  value={addForm.name}
                  onChange={(e) =>
                    setAddForm({ ...addForm, name: e.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Harga Tiket (Rp)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                    Rp
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="1500000"
                    value={addForm.price}
                    onChange={(e) =>
                      setAddForm({ ...addForm, price: e.target.value })
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/40 pl-14 pr-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Total Kuota Tiket
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="500"
                  value={addForm.quota}
                  onChange={(e) =>
                    setAddForm({ ...addForm, quota: e.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-purple-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.04] hover:text-zinc-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-900/40 transition hover:from-purple-500 hover:to-violet-600 disabled:opacity-50"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  + Simpan ke Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL 2: EDIT PRICE
      ===================================================== */}
      {showEditPriceModal && activeTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-[460px] rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/80">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                  <DollarSign size={20} className="text-purple-400" />
                  Atur Harga Tiket
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Kategori: <strong className="text-purple-300">{activeTicket.name}</strong>
                </p>
              </div>

              <button
                onClick={() => setShowEditPriceModal(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePrice} className="space-y-4">
              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3 text-xs text-zinc-400">
                Harga saat ini: <strong className="text-zinc-200">{formatPrice(activeTicket.price)}</strong>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Harga Baru (Rp)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                    Rp
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Contoh: 1500000"
                    value={priceForm}
                    onChange={(e) => setPriceForm(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/40 pl-14 pr-4 text-sm text-zinc-100 outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditPriceModal(false)}
                  className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.04] hover:text-zinc-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-900/40 transition hover:from-purple-500 hover:to-violet-600 disabled:opacity-50"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  Update Harga
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL 3: EDIT QUOTA
      ===================================================== */}
      {showEditQuotaModal && activeTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-[460px] rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/80">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                  <Layers size={20} className="text-indigo-400" />
                  Atur Kuota Tiket
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Kategori: <strong className="text-purple-300">{activeTicket.name}</strong>
                </p>
              </div>

              <button
                onClick={() => setShowEditQuotaModal(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveQuota} className="space-y-4">
              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3 text-xs text-zinc-400 flex items-center justify-between">
                <span>Kuota saat ini: <strong className="text-zinc-200">{activeTicket.quota}</strong></span>
                <span>Terjual: <strong className="text-amber-400">{activeTicket.sold || 0}</strong></span>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Total Kuota Baru (Kursi / Tiket)
                </label>
                <input
                  type="number"
                  min={activeTicket.sold || 0}
                  placeholder="Contoh: 500"
                  value={quotaForm}
                  onChange={(e) => setQuotaForm(e.target.value)}
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 text-sm text-zinc-100 outline-none focus:border-purple-500"
                  required
                />
                <p className="mt-1.5 text-[11px] text-zinc-500">
                  * Minimal kuota harus setidaknya {activeTicket.sold || 0} (jumlah tiket yang sudah terjual).
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditQuotaModal(false)}
                  className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.04] hover:text-zinc-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/40 transition hover:from-indigo-500 hover:to-purple-600 disabled:opacity-50"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  Update Kuota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL 4: EDIT FULL (NAMA, HARGA, KUOTA)
      ===================================================== */}
      {showEditFullModal && activeTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-[500px] rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/80">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                  <Edit3 size={20} className="text-purple-400" />
                  Edit Kategori Tiket
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Ubah data kategori tiket di database.
                </p>
              </div>

              <button
                onClick={() => setShowEditFullModal(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveFull} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  value={fullForm.name}
                  onChange={(e) =>
                    setFullForm({ ...fullForm, name: e.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 text-sm text-zinc-100 outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Harga Tiket (Rp)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                    Rp
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={fullForm.price}
                    onChange={(e) =>
                      setFullForm({ ...fullForm, price: e.target.value })
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/40 pl-14 pr-4 text-sm text-zinc-100 outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Total Kuota
                </label>
                <input
                  type="number"
                  min={activeTicket.sold || 0}
                  value={fullForm.quota}
                  onChange={(e) =>
                    setFullForm({ ...fullForm, quota: e.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 text-sm text-zinc-100 outline-none focus:border-purple-500"
                  required
                />
                <p className="mt-1 text-[11px] text-zinc-500">
                  Minimal kuota: {activeTicket.sold || 0} (sudah terjual).
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditFullModal(false)}
                  className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.04] hover:text-zinc-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-900/40 transition hover:from-purple-500 hover:to-violet-600 disabled:opacity-50"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
