"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";

import {
  Bell,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  Edit3,
  Eye,
  EyeOff,
  Inbox,
  Info,
  LayoutDashboard,
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
  // 5. TOGGLE VISIBILITY (is_closed)
  // ============================================================

  const toggleVisibility = async (event) => {
    try {
      const token = getToken();

      if (!token) {
        alert("Sesi login tidak ditemukan. Silakan login sebagai admin terlebih dahulu.");
        return;
      }

      // Jika sedang ditutup (1) atau dibatalkan (2), aktifkan kembali (0). Jika aktif (0), tutup (1).
      const newIsClosed = (event.is_closed === 1 || event.is_closed === 2) ? 0 : 1;
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
          is_closed: newIsClosed,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        fetchEvents();
      } else {
        alert(data.message || "Gagal update visibility");
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

    // 2. Jika konser dinonaktifkan / ditutup sementara (is_closed = 1)
    if (event.is_closed === 1) {
      return "Closed";
    }

    // 3. Jika tanggal konser sudah selesai / lewat dari hari ini
    if (isEventPast(event.event_date)) {
      return "Completed";
    }

    // 4. Konser masih aktif / akan datang
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
        const isCancelled = event.is_closed === 2;
        const isClosed = event.is_closed === 1;
        const isPast = isEventPast(event.event_date);

        // Active: Menyaring hanya konser yang aktif / akan datang
        if (filter === "Active") {
          return !isCancelled && !isClosed && !isPast;
        }

        // Closed: Menyaring konser yang dinonaktifkan / ditutup
        if (filter === "Closed") {
          return isClosed;
        }

        // Completed: Menyaring konser yang tanggal acaranya sudah selesai
        if (filter === "Completed") {
          return !isCancelled && isPast;
        }

        // Cancelled: Menyaring konser yang ditutup / dibatalkan / dibuang
        if (filter === "Cancelled") {
          return isCancelled;
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
              {["All", "Active", "Closed", "Completed", "Cancelled"].map((item) => (
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
              <div className="min-w-[1050px]">
                <div className="grid grid-cols-[2.2fr_2fr_1fr_1fr_1fr_1fr] items-center gap-5 border-b border-white/[0.04] px-5 py-4 text-xs font-medium tracking-wide text-zinc-500">
                  <span>EVENT NAME</span>
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
                        className="grid grid-cols-[2.2fr_2fr_1fr_1fr_1fr_1fr] items-center gap-5 border-b border-white/[0.025] px-5 py-5 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-950/60 text-purple-400">
                            <Mic2 size={18} />
                          </div>
                          <div>
                            <button
                              onClick={() => openDetailModal(event)}
                              className="text-left text-[15px] font-semibold text-zinc-200 transition hover:text-purple-400"
                              title="Lihat detail event"
                            >
                              {event.title}
                            </button>
                            {event.artist_name && (
                              <p className="text-xs text-zinc-500">
                                {event.artist_name}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="text-sm text-zinc-400">
                          {event.venue}
                        </span>
                        <span className="text-sm text-zinc-400">
                          {formatDate(event.event_date)}
                        </span>
                        <span className="text-sm font-semibold text-zinc-300">
                          -
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
                              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-400 border border-zinc-700/30">
                                Closed
                              </span>
                            );
                          })()}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openDetailModal(event)}
                            title="Lihat Detail Event"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-950/40 text-purple-400 transition hover:bg-purple-900/60 hover:text-purple-200"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            onClick={() => openEditModal(event)}
                            title="Edit Event"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950/40 text-blue-400 transition hover:bg-blue-900/60 hover:text-blue-200"
                          >
                            <Edit3 size={17} />
                          </button>

                          <button
                            onClick={() =>
                              toggleVisibility(event)
                            }
                            title={isClosed ? "Aktifkan Konser" : "Tutup / Sembunyikan Konser"}
                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                              isClosed
                                ? "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
                                : "bg-amber-950/40 text-amber-500 hover:bg-amber-900/50"
                            }`}
                          >
                            {isClosed ? (
                              <EyeOff size={16} />
                            ) : (
                              <Check size={16} />
                            )}
                          </button>

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-[520px] rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/60">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100">
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {editingEvent
                    ? "Update event information."
                    : "Add a new concert event."}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-500 transition hover:text-zinc-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveEvent} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
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
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Venue <span className="text-red-400">*</span>
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
                <label className="mb-2 block text-sm font-medium text-zinc-400">
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
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Artist <span className="text-red-400">*</span>
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
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Event description..."
                  className="w-full resize-none rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Banner URL
                </label>
                <input
                  type="text"
                  value={form.banner_url}
                  onChange={(e) =>
                    setForm({ ...form, banner_url: e.target.value })
                  }
                  placeholder="https://..."
                  className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
                />
              </div>

              {editingEvent && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-400">
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
                      Closed (Konser Ditutup)
                    </option>
                    <option value={2} className="bg-[#0d0b1c] text-zinc-200">
                      Cancelled (Konser Dibatalkan / Dibuang)
                    </option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-white/[0.07] px-5 py-2.5 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.04] hover:text-zinc-200"
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 to-violet-800 px-5 py-2.5 text-sm font-bold text-white transition hover:from-purple-600 hover:to-violet-700 disabled:opacity-50"
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm">
          <div className="w-full max-w-[580px] max-h-[90vh] overflow-y-auto rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/80">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-zinc-100">
                    {detailEvent.title}
                  </h2>
                  {(() => {
                    const status = getEventStatus(detailEvent);
                    if (status === "Active") {
                      return (
                        <span className="rounded-full bg-amber-950/60 border border-amber-500/30 px-3 py-0.5 text-xs font-semibold text-amber-400">
                          Active
                        </span>
                      );
                    }
                    if (status === "Completed") {
                      return (
                        <span className="rounded-full bg-blue-950/60 border border-blue-500/30 px-3 py-0.5 text-xs font-semibold text-blue-400">
                          Completed
                        </span>
                      );
                    }
                    if (status === "Cancelled") {
                      return (
                        <span className="rounded-full bg-red-950/60 border border-red-500/30 px-3 py-0.5 text-xs font-semibold text-red-400">
                          Cancelled
                        </span>
                      );
                    }
                    return (
                      <span className="rounded-full bg-zinc-800 px-3 py-0.5 text-xs font-semibold text-zinc-400 border border-zinc-700/30">
                        Closed
                      </span>
                    );
                  })()}
                </div>
                <p className="mt-1 text-xs text-zinc-500">
                  ID Konser: #{detailEvent.id}
                </p>
              </div>

              <button
                onClick={() => setShowDetailModal(false)}
                className="text-zinc-500 transition hover:text-zinc-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Banner Image Preview */}
            {detailEvent.banner_url ? (
              <div className="mt-4 h-48 w-full overflow-hidden rounded-xl border border-white/[0.06] bg-black/50">
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
            <div className="mt-5 space-y-4">
              {/* Artist Info */}
              <div className="flex items-center gap-4 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-950/70 text-purple-400">
                  <Mic2 size={22} />
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Artis / Performer
                  </div>
                  <div className="text-base font-bold text-zinc-100">
                    {detailEvent.artist_name || "Tidak ada data artist"}
                  </div>
                  {detailEvent.artist_genre && (
                    <span className="text-xs text-purple-400">
                      Genre: {detailEvent.artist_genre}
                    </span>
                  )}
                </div>
              </div>

              {/* Venue & Date */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    <MapPin size={14} className="text-purple-400" />
                    Lokasi / Venue
                  </div>
                  <div className="mt-1.5 text-sm font-semibold text-zinc-200">
                    {detailEvent.venue}
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    <Calendar size={14} className="text-purple-400" />
                    Tanggal Konser
                  </div>
                  <div className="mt-1.5 text-sm font-semibold text-zinc-200">
                    {formatDate(detailEvent.event_date)}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  <Info size={14} className="text-purple-400" />
                  Deskripsi Konser
                </div>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {detailEvent.description || "Tidak ada deskripsi yang disediakan."}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end gap-3 border-t border-white/[0.08] pt-4">
              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.04] hover:text-zinc-200"
              >
                Tutup
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDetailModal(false);
                  openEditModal(detailEvent);
                }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 to-violet-800 px-5 py-2.5 text-sm font-bold text-white transition hover:from-purple-600 hover:to-violet-700"
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
