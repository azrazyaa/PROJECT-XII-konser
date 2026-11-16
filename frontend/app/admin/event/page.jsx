"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import AdminProfileModal from "@/components/AdminProfileModal";

import {
  Bell,
  BarChart3,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Eye,
  EyeOff,
  Inbox,
  Info,
  Layers,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Mic2,
  Plus,
  QrCode,
  Search,
  Settings,
  ShieldCheck,
  Tag,
  Ticket,
  Trash2,
  Users,
  X,
  Loader2,
} from "lucide-react";

// ============================================================
// SIDEBAR
// ============================================================

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
        className={`fixed left-0 top-0 z-50 flex h-screen w-[292px] flex-col border-r border-purple-500/20 bg-[#0d0b1c] transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
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

        <div className="px-5 pt-9">
          <p className="mb-4 px-3 text-xs font-bold tracking-[0.13em] text-zinc-500">
            MAIN MENU
          </p>

          <nav className="space-y-1.5">
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <LayoutDashboard size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Dashboard</span>
            </Link>

            <Link
              href="/admin/event"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg border-l-2 border-purple-500 bg-purple-900/20 px-3 py-3.5 text-zinc-100 transition"
            >
              <Ticket size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Event CRUD</span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
            </Link>

            <Link
              href="/admin/ticket"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <Tag size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">
                Ticket Classes & Quota
              </span>
            </Link>

            <Link
              href="/admin/artists"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <Mic2 size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Artists</span>
            </Link>

            <Link
              href="/admin/payment"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <ShieldCheck size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Verify Payments</span>
            </Link>

            <Link
              href="/admin/scanner"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <QrCode size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">QR Ticket Scanner</span>
            </Link>

            <Link
              href="/admin/reports"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <BarChart3 size={19} strokeWidth={1.8} />
              <span className="text-[15px] font-medium">Sales Reports</span>
            </Link>
          </nav>
        </div>

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

// ============================================================
// TOPBAR
// ============================================================

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
      <header className="fixed right-0 top-0 z-30 h-[98px] border-b border-white/[0.06] bg-[#0a0815]/90 backdrop-blur-xl lg:left-[292px]">
        <div className="flex h-full items-center px-5 sm:px-8">
          <button
            onClick={() => setOpen(true)}
            className="text-zinc-300 lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="ml-auto flex items-center gap-5">
            <button className="relative text-zinc-400 hover:text-zinc-200">
              <Bell size={21} />
              <span className="absolute -right-1 -top-2 h-2.5 w-2.5 rounded-full border border-[#0a0815] bg-amber-500" />
            </button>

            <button className="relative text-zinc-400 hover:text-zinc-200">
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

// ============================================================
// STAGE LAYOUT TEMPLATES & DIAGRAMS
// ============================================================

const STAGE_LAYOUT_TEMPLATES = [
  {
    id: "Main Stage",
    name: "Main Stage",
    badge: "Arena / Stadium",
    subtitle: "Panggung Utama Depan (End-Stage)",
    description:
      "Panggung proscenium standar di satu sisi venue dengan area VIP di depan panggung dan tribun bertingkat di bagian belakang.",
    zones: [
      { name: "Stage", color: "#7c3aed" },
      { name: "VIP Zone", color: "#3b82f6" },
      { name: "CAT 1 (Side)", color: "#ec4899" },
      { name: "Festival", color: "#10b981" },
      { name: "Tribune", color: "#6366f1" },
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
      { name: "Main Stage & Catwalk", color: "#7c3aed" },
      { name: "Pit A & B (FOS)", color: "#ec4899" },
      { name: "General Admission", color: "#10b981" },
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
      { name: "Center Stage", color: "#7c3aed" },
      { name: "VIP Ring (Inner)", color: "#3b82f6" },
      { name: "CAT 1 (Outer Ring)", color: "#ec4899" },
      { name: "4-Quadrant Tribunes", color: "#6366f1" },
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
      { name: "Proscenium Stage", color: "#7c3aed" },
      { name: "Orchestra (Stalls)", color: "#3b82f6" },
      { name: "Mezzanine", color: "#ec4899" },
      { name: "Upper Balcony", color: "#6366f1" },
    ],
  },
];

function StageLayoutDiagram({ layout, isLarge = false }) {
  const normalized = (layout || "Main Stage").toLowerCase();

  if (normalized.includes("festival")) {
    return (
      <svg
        viewBox="0 0 200 130"
        className={`w-full ${isLarge ? "h-48 sm:h-56" : "h-28"} transition-all`}
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

  if (normalized.includes("360")) {
    return (
      <svg
        viewBox="0 0 200 130"
        className={`w-full ${isLarge ? "h-48 sm:h-56" : "h-28"} transition-all`}
      >
        <rect x="8" y="8" width="184" height="114" rx="8" fill="#110e24" stroke="#2e2547" strokeWidth="1.2" />
        {/* Center Stage */}
        <circle cx="100" cy="65" r="17" fill="#7c3aed" stroke="#c084fc" strokeWidth="1.5" />
        <text x="100" y="68" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">360°</text>
        {/* Inner Ring (VIP Standing) */}
        <circle cx="100" cy="65" r="30" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="100" y="45" fill="#93c5fd" fontSize="5.5" fontWeight="bold" textAnchor="middle">VIP RING</text>
        {/* Middle Ring (CAT 1) */}
        <circle cx="100" cy="65" r="44" fill="none" stroke="#f472b6" strokeWidth="1.2" />
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

  if (normalized.includes("theater")) {
    return (
      <svg
        viewBox="0 0 200 130"
        className={`w-full ${isLarge ? "h-48 sm:h-56" : "h-28"} transition-all`}
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

  // Default: Main Stage
  return (
    <svg
      viewBox="0 0 200 130"
      className={`w-full ${isLarge ? "h-48 sm:h-56" : "h-28"} transition-all`}
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

// ============================================================
// ARTISTS DATA (Matching MySQL Database)
// ============================================================

const availableArtists = [
  { id: 1, name: "Aurora Velez", genre: "Electronic / Synthwave" },
  { id: 2, name: "Kai Matsumoto", genre: "J-Rock / Alternative" },
  { id: 3, name: "Luna De Santos", genre: "Latin Pop / Reggaeton" },
  { id: 4, name: "The Voidwalkers", genre: "Progressive Metal" },
  { id: 5, name: "Zara Noor", genre: "R&B / Soul" },
];

// ============================================================
// MAIN EVENT PAGE
// ============================================================

export default function EventPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [detailEvent, setDetailEvent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    venue: "",
    event_date: "",
    artist_id: "1",
    description: "",
    banner_url: "",
    stage_layout: "Main Stage",
    total_quota: "",
    is_closed: 0,
  });

  // ============================================================
  // GET TOKEN DARI LOCALSTORAGE
  // ============================================================

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  // ============================================================
  // 1. FETCH EVENTS (GET)
  // ============================================================

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = getToken();

      const response = await fetch("/api/events", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await response.json();

      if (data.success) {
        // KALAU DATA KOSONG, PAKAI DUMMY
        if (data.data.length === 0) {
          console.log("Data kosong, pakai dummy data");
          const dummyEvents = [
            {
              id: 1,
              title: "Celestial Night Tour 2026",
              venue: "Jakarta International Stadium",
              event_date: "2026-12-15T19:00:00.000Z",
              description: "The Eras Tour concert experience",
              banner_url:
                "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1000&q=85",
              stage_layout: "Main Stage",
              total_quota: 50000,
              is_closed: 0,
              artist_name: "Taylor Swift",
              artist_genre: "Pop",
            },
            {
              id: 2,
              title: "Neon Pulse Arena",
              venue: "Bali International Convention Center",
              event_date: "2026-10-22T19:00:00.000Z",
              description: "Electronic music festival",
              banner_url:
                "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1000&q=85",
              stage_layout: "Festival",
              total_quota: 15000,
              is_closed: 0,
              artist_name: "Blackpink",
              artist_genre: "K-Pop",
            },
          ];
          setEvents(dummyEvents);
        } else {
          setEvents(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ============================================================
  // 2. TAMBAH EVENT (POST)
  // ============================================================

  const tambahEvent = async (formData) => {
    try {
      const token = getToken();

      if (!token) {
        alert("Sesi login tidak ditemukan. Silakan login sebagai admin terlebih dahulu.");
        return false;
      }

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Event berhasil ditambahkan!");
        fetchEvents();
        return true;
      } else {
        alert(data.message || "Gagal menambah event");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menambah event");
      return false;
    }
  };

  // ============================================================
  // 3. UPDATE EVENT (PUT)
  // ============================================================

  const updateEvent = async (id, formData) => {
    try {
      const token = getToken();

      if (!token) {
        alert("Sesi login tidak ditemukan. Silakan login sebagai admin terlebih dahulu.");
        return false;
      }

      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Event berhasil diupdate!");
        fetchEvents();
        return true;
      } else {
        alert(data.message || "Gagal update event");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengupdate event");
      return false;
    }
  };

  // ============================================================
  // 4. HAPUS EVENT (SOFT DELETE -> CANCELLED / HARD DELETE)
  // ============================================================

  const hapusEvent = async (event) => {
    try {
      const token = getToken();

      if (!token) {
        alert("Sesi login tidak ditemukan. Silakan login sebagai admin terlebih dahulu.");
        return;
      }

      // Jika event sudah berstatus Cancelled (is_closed === 2), tawarkan opsi hapus permanen
      if (event.is_closed === 2) {
        if (!confirm(`Event "${event.title}" sudah berstatus Cancelled. Apakah Anda ingin menghapusnya secara PERMANEN dari database?`)) {
          return;
        }

        const response = await fetch(`/api/events/${event.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          alert("Event berhasil dihapus secara permanen!");
          fetchEvents();
        } else {
          alert(data.message || "Gagal hapus event");
        }
      } else {
        // Soft delete: tandai event sebagai Cancelled (is_closed: 2)
        if (!confirm(`Yakin ingin membatalkan/menghapus event "${event.title}"? Event akan dipindahkan ke status Cancelled.`)) {
          return;
        }

        const foundArtist = availableArtists.find(
          (a) => a.id === event.artist_id || a.name === event.artist_name
        );
        const artistId = foundArtist ? foundArtist.id : (event.artist_id || 1);

        const response = await fetch(`/api/events/${event.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            artist_id: artistId,
            title: event.title,
            description: event.description || "",
            venue: event.venue,
            event_date: event.event_date ? event.event_date.split("T")[0] : "",
            banner_url: event.banner_url || "",
            stage_layout: event.stage_layout || "Main Stage",
            total_quota: event.total_quota || 0,
            is_closed: 2, // 2 = Cancelled
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          alert(`Event "${event.title}" berhasil dibatalkan dan dipindahkan ke status Cancelled!`);
          fetchEvents();
        } else {
          alert(data.message || "Gagal membatalkan event");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat memproses penghapusan event");
    }
  };

  // ============================================================
  // 5. TOGGLE COMPLETED (is_closed)
  // ============================================================

  const toggleCompleted = async (event) => {
    try {
      const token = getToken();

      if (!token) {
        alert("Sesi login tidak ditemukan. Silakan login sebagai admin terlebih dahulu.");
        return;
      }

      const currentStatus = getEventStatus(event);
      // Jika statusnya sudah Completed, ubah kembali jadi Active (is_closed: 0).
      // Jika statusnya belum Completed, tandai sebagai Completed (is_closed: 1).
      const newIsClosed = currentStatus === "Completed" || event.is_closed === 1 ? 0 : 1;
      const foundArtist = availableArtists.find(
        (a) => a.id === event.artist_id || a.name === event.artist_name
      );
      const artistId = foundArtist ? foundArtist.id : (event.artist_id || 1);

      const response = await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          artist_id: artistId,
          title: event.title,
          description: event.description || "",
          venue: event.venue,
          event_date: event.event_date ? event.event_date.split("T")[0] : "",
          banner_url: event.banner_url || "",
          stage_layout: event.stage_layout || "Main Stage",
          total_quota: event.total_quota || 0,
          is_closed: newIsClosed,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        fetchEvents();
      } else {
        alert(data.message || "Gagal mengubah status konser");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan");
    }
  };

  // ============================================================
  // 6. SAVE EVENT
  // ============================================================

  const saveEvent = async (e) => {
    e.preventDefault();

    if (!form.title || !form.venue || !form.event_date || !form.artist_id) {
      alert("Judul, venue, tanggal konser, dan artis wajib diisi.");
      return;
    }

    setSubmitting(true);

    const payload = {
      title: form.title,
      venue: form.venue,
      event_date: form.event_date,
      artist_id: parseInt(form.artist_id, 10),
      description: form.description || "",
      banner_url: form.banner_url || "",
      stage_layout: form.stage_layout || "Main Stage",
      total_quota: parseInt(form.total_quota, 10) || 0,
      is_closed: Number(form.is_closed) || 0,
    };

    let success = false;
    if (editingEvent) {
      success = await updateEvent(editingEvent.id, payload);
    } else {
      success = await tambahEvent(payload);
    }

    setSubmitting(false);

    if (success) {
      setShowModal(false);
      setEditingEvent(null);
      setForm({
        title: "",
        venue: "",
        event_date: "",
        artist_id: "1",
        description: "",
        banner_url: "",
        stage_layout: "Main Stage",
        total_quota: "",
        is_closed: 0,
      });
    }
  };

  // ============================================================
  // 7. OPEN MODAL & DETAIL
  // ============================================================

  // Helper konversi tanggal database ke format input input[type="date"] (YYYY-MM-DD)
  const toInputDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return String(dateStr).split("T")[0];
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setForm({
      title: "",
      venue: "",
      event_date: "",
      artist_id: "1",
      description: "",
      banner_url: "",
      stage_layout: "Main Stage",
      total_quota: "",
      is_closed: 0,
    });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    const foundArtist = availableArtists.find(
      (a) => a.id === event.artist_id || a.name === event.artist_name
    );
    setForm({
      title: event.title || "",
      venue: event.venue || "",
      event_date: toInputDate(event.event_date),
      artist_id: foundArtist
        ? String(foundArtist.id)
        : event.artist_id
        ? String(event.artist_id)
        : "1",
      description: event.description || "",
      banner_url: event.banner_url || "",
      stage_layout: event.stage_layout || "Main Stage",
      total_quota: event.total_quota ? String(event.total_quota) : "",
      is_closed: event.is_closed ?? 0,
    });
    setShowModal(true);
  };

  const openDetailModal = (event) => {
    setDetailEvent(event);
    setShowDetailModal(true);
  };

  // ============================================================
  // 8. FILTER + SEARCH & STATUS HELPER
  // ============================================================

  // Helper untuk mengecek apakah tanggal konser sudah selesai (lewat dari hari ini)
  const isEventPast = (dateStr) => {
    if (!dateStr) return false;
    const eventDate = new Date(dateStr);
    if (isNaN(eventDate.getTime())) return false;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const concertDay = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    );
    return concertDay < today;
  };

  // Helper untuk menentukan status konser secara dinamis
  const getEventStatus = (event) => {
    // 1. Jika konser dibatalkan / di-delete (is_closed = 2)
    if (event.is_closed === 2) {
      return "Cancelled";
    }

    // 2. Jika konser ditandai selesai (is_closed = 1) atau tanggal konser sudah selesai / lewat dari hari ini
    if (event.is_closed === 1 || isEventPast(event.event_date)) {
      return "Completed";
    }

    // 3. Konser masih aktif / akan datang
    return "Active";
  };

  const filteredEvents = useMemo(() => {
    let result = events;

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (event) =>
          event.title?.toLowerCase().includes(query) ||
          event.venue?.toLowerCase().includes(query) ||
          event.artist_name?.toLowerCase().includes(query),
      );
    }

    if (filter !== "All") {
      result = result.filter((event) => {
        const status = getEventStatus(event);

        // Active: Menyaring hanya konser yang aktif / akan datang
        if (filter === "Active") {
          return status === "Active";
        }

        // Completed: Menyaring konser yang sudah selesai (baik via ceklis maupun tanggal lewat)
        if (filter === "Completed" || filter === "Closed") {
          return status === "Completed";
        }

        // Cancelled: Menyaring konser yang ditutup / dibatalkan / dibuang
        if (filter === "Cancelled") {
          return status === "Cancelled";
        }

        return true;
      });
    }

    return result;
  }, [events, search, filter]);

  // Format tanggal untuk tampilan UI
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-[#080612] text-zinc-200">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <Topbar setOpen={setSidebarOpen} />

      <main className="min-h-screen pt-[98px] lg:pl-[292px]">
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          <div className="absolute left-[18%] top-[5%] h-[500px] w-[650px] rounded-full bg-purple-900/20 blur-[150px]" />
          <div className="absolute right-[10%] top-[15%] h-[450px] w-[550px] rounded-full bg-violet-900/20 blur-[150px]" />
          <div className="absolute bottom-0 left-[25%] h-[400px] w-[600px] rounded-full bg-purple-950/30 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-7 xl:px-8">
          <div className="mb-7">
            <h1 className="text-[28px] font-bold tracking-tight text-zinc-100">
              Event Management
            </h1>
          </div>

          <div className="mb-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[21px] font-bold text-zinc-100">
                Event Management
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Search, filter, and manage all concert events
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="flex w-fit items-center gap-2 rounded-lg bg-gradient-to-r from-purple-700 to-violet-800 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/30 transition hover:from-purple-600 hover:to-violet-700"
            >
              <Plus size={18} />
              New Event
            </button>
          </div>

          {/* SEARCH + FILTER */}
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative w-full md:max-w-[430px]">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                placeholder="Search by name or venue..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-white/[0.04] bg-[#05040d] pl-11 pr-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/40"
              />
            </div>

            <div className="flex flex-wrap w-fit items-center rounded-xl bg-[#05040d] p-1 border border-white/[0.04]">
              {["All", "Active", "Completed", "Cancelled"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    filter === item
                      ? "bg-purple-800/70 text-purple-200 shadow"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.04] bg-[#05040d]/90 shadow-xl">
            <div className="overflow-x-auto">
              <div className="min-w-[1100px]">
                <div className="grid grid-cols-[2.7fr_1.8fr_1.1fr_1fr_1fr_1fr] items-center gap-5 border-b border-white/[0.04] px-5 py-4 text-xs font-medium tracking-wide text-zinc-500">
                  <span>EVENT & BANNER</span>
                  <span>VENUE</span>
                  <span>DATE</span>
                  <span>TOTAL QUOTA</span>
                  <span>STATUS</span>
                  <span>ACTIONS</span>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                    <p className="mt-3 text-sm text-zinc-500">
                      Loading events...
                    </p>
                  </div>
                ) : filteredEvents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950/50 text-purple-400">
                      <Search size={21} />
                    </div>
                    <p className="font-semibold text-zinc-300">
                      No events found
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Try changing your search or filter.
                    </p>
                  </div>
                ) : (
                  filteredEvents.map((event) => {
                    const isClosed = event.is_closed === 1;
                    const statusLabel =
                      event.status || (isClosed ? "Closed" : "Active");
                    const isActive =
                      statusLabel === "upcoming" || statusLabel === "Active";

                    return (
                      <div
                        key={event.id}
                        className="group grid grid-cols-[2.7fr_1.8fr_1.1fr_1fr_1fr_1fr] items-center gap-5 border-b border-white/[0.025] px-5 py-4 transition hover:bg-white/[0.015] last:border-b-0"
                      >
                        {/* Event Photo & Info */}
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Medium Event Banner / Thumbnail */}
                          <div
                            onClick={() => openDetailModal(event)}
                            className="relative h-16 w-24 sm:h-20 sm:w-32 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-[#100c22] shadow-md transition-all duration-200 group-hover:border-purple-500/40 group-hover:shadow-purple-950/40"
                            title="Klik untuk lihat detail event"
                          >
                            {event.banner_url ? (
                              <img
                                src={event.banner_url}
                                alt={event.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  const fallback = e.currentTarget.parentElement?.querySelector(".banner-fallback");
                                  if (fallback) fallback.classList.remove("hidden");
                                }}
                              />
                            ) : null}
                            <div
                              className={`banner-fallback flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-purple-950/60 to-[#0e091e] text-purple-400 ${
                                event.banner_url ? "hidden" : "flex"
                              }`}
                            >
                              <Mic2 size={22} />
                              <span className="text-[10px] font-medium text-purple-300/60">No Banner</span>
                            </div>
                          </div>

                          {/* Event Text Info */}
                          <div className="min-w-0 flex-1">
                            <button
                              onClick={() => openDetailModal(event)}
                              className="text-left text-[15px] font-bold text-zinc-100 transition hover:text-purple-400 line-clamp-1"
                              title="Lihat detail event"
                            >
                              {event.title}
                            </button>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              {event.artist_name && (
                                <p className="text-xs font-medium text-zinc-400 truncate max-w-[150px]">
                                  {event.artist_name}
                                </p>
                              )}
                              <span className="inline-flex items-center gap-1 rounded-md bg-purple-950/60 px-2 py-0.5 text-[10.5px] font-medium text-purple-300 border border-purple-500/25 shrink-0">
                                <Layers size={10} />
                                {event.stage_layout || "Main Stage"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className="text-sm text-zinc-400">
                          {event.venue}
                        </span>
                        <span className="text-sm text-zinc-400">
                          {formatDate(event.event_date)}
                        </span>
                        <span className="text-sm font-semibold text-zinc-200">
                          {event.total_quota
                            ? `${Number(event.total_quota).toLocaleString("id-ID")} orang`
                            : "-"}
                        </span>

                        <div>
                          {(() => {
                            const status = getEventStatus(event);
                            if (status === "Active") {
                              return (
                                <span className="rounded-full bg-amber-950/50 px-3 py-1 text-xs font-semibold text-amber-500 border border-amber-500/20">
                                  Active
                                </span>
                              );
                            }
                            if (status === "Completed") {
                              return (
                                <span className="rounded-full bg-blue-950/50 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
                                  Completed
                                </span>
                              );
                            }
                            if (status === "Cancelled") {
                              return (
                                <span className="rounded-full bg-red-950/60 px-3 py-1 text-xs font-semibold text-red-400 border border-red-500/20">
                                  Cancelled
                                </span>
                              );
                            }
                            return (
                              <span className="rounded-full bg-blue-950/50 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
                                Completed
                              </span>
                            );
                          })()}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(event)}
                            title="Edit Event"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950/40 text-blue-400 transition hover:bg-blue-900/60 hover:text-blue-200"
                          >
                            <Edit3 size={17} />
                          </button>

                          {(() => {
                            const isCompleted = getEventStatus(event) === "Completed";
                            return (
                              <button
                                onClick={() => toggleCompleted(event)}
                                title={
                                  isCompleted
                                    ? "Batalkan Status Completed (Kembalikan ke Active)"
                                    : "Tandai Konser Selesai (Completed)"
                                }
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                                  isCompleted
                                    ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                                    : "bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/50"
                                }`}
                              >
                                {isCompleted ? (
                                  <X size={16} />
                                ) : (
                                  <Check size={16} />
                                )}
                              </button>
                            );
                          })()}

                          <button
                            onClick={() => hapusEvent(event)}
                            title={event.is_closed === 2 ? "Hapus Permanen dari Database" : "Batalkan / Buang Event (Masuk ke Cancelled)"}
                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                              event.is_closed === 2
                                ? "bg-red-950/40 text-red-400 hover:bg-red-900/60"
                                : "bg-red-950/20 text-zinc-500 hover:bg-red-950/50 hover:text-red-400"
                            }`}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <footer className="py-11 text-center text-sm text-zinc-500">
            © 2026 Nocturne Admin Portal. All rights reserved. Built for concert
            organizers.
          </footer>
        </div>
      </main>

      {/* ============================================================
          MODAL ADD / EDIT
      ============================================================ */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md">
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-purple-500/25 bg-[#0e0c1f] p-6 sm:p-8 shadow-2xl shadow-purple-950/50">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h2 className="text-2xl font-bold text-zinc-100">
                  {editingEvent ? "Edit Event Konser" : "Create New Concert Event"}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  {editingEvent
                    ? "Perbarui informasi konser dan denah layout panggung."
                    : "Lengkapi data konser dan pilih template layout panggung yang sesuai."}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-400 transition hover:bg-white/[0.08] hover:text-zinc-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveEvent} className="space-y-6">
              {/* Form Grid untuk Info Dasar */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">
                    Event Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Celestial Night Tour 2026"
                    className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">
                    Venue / Lokasi <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    placeholder="e.g. Jakarta International Stadium"
                    className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">
                    Event Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.event_date}
                    onChange={(e) =>
                      setForm({ ...form, event_date: e.target.value })
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none focus:border-purple-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">
                    Artis / Performer <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.artist_id}
                    onChange={(e) =>
                      setForm({ ...form, artist_id: e.target.value })
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.06] bg-[#141026] px-4 text-sm text-zinc-200 outline-none focus:border-purple-500/50"
                    required
                  >
                    <option value="" disabled>Select an Artist</option>
                    {availableArtists.map((artist) => (
                      <option key={artist.id} value={artist.id} className="bg-[#0d0b1c] text-zinc-200">
                        {artist.name} ({artist.genre})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">
                    Total Quota / Kapasitas <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      placeholder="Contoh: 5000"
                      value={form.total_quota}
                      onChange={(e) =>
                        setForm({ ...form, total_quota: e.target.value })
                      }
                      className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 pr-16 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-500">
                      Orang
                    </span>
                  </div>
                </div>

                <div className={editingEvent ? "" : "sm:col-span-2"}>
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">
                    Banner Image URL
                  </label>
                  <input
                    type="text"
                    value={form.banner_url}
                    onChange={(e) =>
                      setForm({ ...form, banner_url: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
                  />
                </div>

                {editingEvent && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-zinc-300">
                      Status Event
                    </label>
                    <select
                      value={form.is_closed}
                      onChange={(e) =>
                        setForm({ ...form, is_closed: Number(e.target.value) })
                      }
                      className="h-11 w-full rounded-xl border border-white/[0.06] bg-[#141026] px-4 text-sm text-zinc-200 outline-none focus:border-purple-500/50"
                    >
                      <option value={0} className="bg-[#0d0b1c] text-zinc-200">
                        Active (Konser Aktif / Dibuka)
                      </option>
                      <option value={1} className="bg-[#0d0b1c] text-zinc-200">
                        Completed (Konser Selesai)
                      </option>
                      <option value={2} className="bg-[#0d0b1c] text-zinc-200">
                        Cancelled (Konser Dibatalkan / Dibuang)
                      </option>
                    </select>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">
                    Deskripsi Konser
                  </label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Tulis deskripsi atau informasi seputar konser..."
                    className="w-full resize-none rounded-xl border border-white/[0.06] bg-black/30 px-4 py-2.5 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
                  />
                </div>
              </div>

              {/* FITUR PEMILIHAN LAYOUT PANGGUNG (CARDS & PREVIEW) */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.015] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <Layers size={18} className="text-purple-400" />
                      <label className="text-base font-bold text-zinc-100">
                        Template Layout Panggung Konser <span className="text-red-400">*</span>
                      </label>
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-400">
                      Pilih template layout denah panggung yang sesuai dengan konsep pementasan konser.
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/70 border border-purple-500/35 px-3 py-1 text-xs font-bold text-purple-300">
                    <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                    Pilihan: {form.stage_layout || "Main Stage"}
                  </span>
                </div>

                {/* 4 Cards Template Layout */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                  {STAGE_LAYOUT_TEMPLATES.map((tpl) => {
                    const isSelected = (form.stage_layout || "Main Stage") === tpl.id;
                    return (
                      <div
                        key={tpl.id}
                        onClick={() => setForm({ ...form, stage_layout: tpl.id })}
                        className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-3.5 transition-all duration-200 ${
                          isSelected
                            ? "border-purple-500 bg-purple-950/50 shadow-lg shadow-purple-950/60 ring-2 ring-purple-500/40"
                            : "border-white/[0.07] bg-[#0c0a18] hover:border-purple-500/40 hover:bg-white/[0.02]"
                        }`}
                      >
                        {/* Header Badge & Radio/Check */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-400 border border-purple-500/20">
                            {tpl.badge}
                          </span>
                          {isSelected ? (
                            <CheckCircle2 size={18} className="text-purple-400 shrink-0" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-zinc-600 group-hover:border-purple-400/60 shrink-0" />
                          )}
                        </div>

                        {/* SVG Denah Panggung Visual */}
                        <div className="mb-2.5 overflow-hidden rounded-xl border border-white/[0.06] bg-[#070512] p-1.5">
                          <StageLayoutDiagram layout={tpl.id} />
                        </div>

                        {/* Text Info */}
                        <div>
                          <div className="text-sm font-bold text-zinc-100 group-hover:text-purple-300">
                            {tpl.name}
                          </div>
                          <div className="mt-0.5 text-[11px] text-zinc-400 line-clamp-1">
                            {tpl.subtitle}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Live Preview Denah Terpilih & Legend Zona */}
                {(() => {
                  const currentTpl =
                    STAGE_LAYOUT_TEMPLATES.find(
                      (t) => t.id === (form.stage_layout || "Main Stage")
                    ) || STAGE_LAYOUT_TEMPLATES[0];

                  return (
                    <div className="mt-4 rounded-2xl border border-purple-500/20 bg-purple-950/20 p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        {/* Preview Box */}
                        <div className="w-full md:w-56 shrink-0 overflow-hidden rounded-xl border border-purple-500/30 bg-[#070512] p-2 shadow-inner">
                          <StageLayoutDiagram layout={currentTpl.id} />
                        </div>

                        {/* Description & Zones */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-zinc-100">
                              Preview Denah: {currentTpl.name}
                            </span>
                            <span className="rounded-md bg-purple-500/20 px-2 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-500/30">
                              {currentTpl.badge}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                            {currentTpl.description}
                          </p>

                          {/* Zone Legend */}
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-medium text-zinc-500">
                              Zona Penonton:
                            </span>
                            {currentTpl.zones.map((z, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-black/40 px-2.5 py-1 text-[11px] font-medium text-zinc-300 border border-white/[0.06]"
                              >
                                <span
                                  className="h-2 w-2 rounded-full shrink-0"
                                  style={{ backgroundColor: z.color }}
                                />
                                {z.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 border-t border-white/[0.08] pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-white/[0.08] px-6 py-2.5 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.04] hover:text-zinc-200"
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 to-violet-800 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-950/40 transition hover:from-purple-600 hover:to-violet-700 disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingEvent ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL LIHAT DETAIL
      ============================================================ */}

      {showDetailModal && detailEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md">
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-purple-500/25 bg-[#0e0c1f] p-6 sm:p-8 shadow-2xl shadow-purple-950/50">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
                    {detailEvent.title}
                  </h2>
                  {(() => {
                    const status = getEventStatus(detailEvent);
                    if (status === "Active") {
                      return (
                        <span className="rounded-full bg-amber-950/70 border border-amber-500/40 px-3.5 py-1 text-xs font-bold text-amber-400">
                          Active
                        </span>
                      );
                    }
                    if (status === "Completed") {
                      return (
                        <span className="rounded-full bg-blue-950/70 border border-blue-500/40 px-3.5 py-1 text-xs font-bold text-blue-400">
                          Completed
                        </span>
                      );
                    }
                    if (status === "Cancelled") {
                      return (
                        <span className="rounded-full bg-red-950/70 border border-red-500/40 px-3.5 py-1 text-xs font-bold text-red-400">
                          Cancelled
                        </span>
                      );
                    }
                    return (
                      <span className="rounded-full bg-blue-950/70 border border-blue-500/40 px-3.5 py-1 text-xs font-bold text-blue-400">
                        Completed
                      </span>
                    );
                  })()}
                </div>
                <p className="mt-1.5 text-xs text-zinc-500">
                  ID Konser: <span className="font-semibold text-purple-400">#{detailEvent.id}</span>
                </p>
              </div>

              <button
                onClick={() => setShowDetailModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-400 transition hover:bg-white/[0.08] hover:text-zinc-100"
              >
                <X size={22} />
              </button>
            </div>

            {/* Banner Image Preview */}
            {detailEvent.banner_url ? (
              <div className="mt-6 h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-black/60 shadow-inner">
                <img
                  src={detailEvent.banner_url}
                  alt={detailEvent.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.parentElement.style.display = "none";
                  }}
                />
              </div>
            ) : null}

            {/* Info Grid */}
            <div className="mt-6 space-y-4">
              {/* 4-Column Quick Info */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Artist Info */}
                <div className="flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition hover:border-purple-500/20">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-950/80 text-purple-400">
                    <Mic2 size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                      Artis / Performer
                    </div>
                    <div className="truncate text-base font-bold text-zinc-100">
                      {detailEvent.artist_name || "Tidak ada artist"}
                    </div>
                    {detailEvent.artist_genre && (
                      <span className="block truncate text-xs text-purple-400">
                        {detailEvent.artist_genre}
                      </span>
                    )}
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition hover:border-purple-500/20">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-950/80 text-purple-400">
                    <MapPin size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                      Lokasi / Venue
                    </div>
                    <div className="truncate text-base font-bold text-zinc-100">
                      {detailEvent.venue}
                    </div>
                    <span className="text-xs text-zinc-500">Stadion / Arena</span>
                  </div>
                </div>

                {/* Event Date */}
                <div className="flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition hover:border-purple-500/20">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-950/80 text-purple-400">
                    <Calendar size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                      Tanggal Konser
                    </div>
                    <div className="truncate text-base font-bold text-zinc-100">
                      {formatDate(detailEvent.event_date)}
                    </div>
                    <span className="text-xs text-zinc-500">Jadwal Acara</span>
                  </div>
                </div>

                {/* Total Quota */}
                <div className="flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition hover:border-purple-500/20">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-950/80 text-purple-400">
                    <Users size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                      Total Quota
                    </div>
                    <div className="truncate text-base font-bold text-zinc-100">
                      {detailEvent.total_quota
                        ? `${Number(detailEvent.total_quota).toLocaleString("id-ID")} Orang`
                        : "Belum Ditentukan"}
                    </div>
                    <span className="text-xs text-zinc-500">Kapasitas Penonton</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  <Info size={15} className="text-purple-400" />
                  Deskripsi Lengkap Konser
                </div>
                <p className="mt-3 text-sm sm:text-[15px] text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {detailEvent.description || "Tidak ada deskripsi yang disediakan."}
                </p>
              </div>

              {/* Layout Panggung Info Card */}
              <div className="rounded-2xl border border-purple-500/25 bg-purple-950/20 p-5">
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                  <div className="w-full md:w-60 shrink-0 overflow-hidden rounded-xl border border-purple-500/30 bg-[#090714] p-2 shadow-inner">
                    <StageLayoutDiagram layout={detailEvent.stage_layout || "Main Stage"} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Layers size={17} className="text-purple-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                        Layout Panggung Konser
                      </span>
                    </div>
                    <div className="mt-1 text-xl font-bold text-zinc-100">
                      {detailEvent.stage_layout || "Main Stage"}
                    </div>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                      {(() => {
                        const tpl =
                          STAGE_LAYOUT_TEMPLATES.find(
                            (t) => t.id === (detailEvent.stage_layout || "Main Stage")
                          ) || STAGE_LAYOUT_TEMPLATES[0];
                        return tpl.description;
                      })()}
                    </p>

                    {/* Zona Penonton */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-medium text-zinc-500">
                        Zona Penonton:
                      </span>
                      {(() => {
                        const tpl =
                          STAGE_LAYOUT_TEMPLATES.find(
                            (t) => t.id === (detailEvent.stage_layout || "Main Stage")
                          ) || STAGE_LAYOUT_TEMPLATES[0];
                        return tpl.zones.map((z, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-black/40 px-2.5 py-1 text-xs font-medium text-zinc-300 border border-white/[0.06]"
                          >
                            <span
                              className="h-2 w-2 rounded-full shrink-0"
                              style={{ backgroundColor: z.color }}
                            />
                            {z.name}
                          </span>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex justify-end gap-3 border-t border-white/[0.08] pt-5">
              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="rounded-xl border border-white/[0.1] px-6 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
              >
                Tutup
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDetailModal(false);
                  openEditModal(detailEvent);
                }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 to-violet-800 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-950/40 transition hover:from-purple-600 hover:to-violet-700"
              >
                <Edit3 size={16} />
                Edit Event Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
