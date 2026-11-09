"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
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

  // Events state
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Tickets state (Loaded directly from Database via Backend API)
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

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
    return `IDR ${Number(price || 0).toLocaleString("id-ID")}`;
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
     2. FETCH EVENTS DARI DATABASE (GET /api/events)
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
        } else {
          // Fallback events
          eventList = [
            {
              id: 4,
              title: "uauaua editedvv",
              venue: "hahaha edited",
              event_date: "2026-10-25T17:00:00.000Z",
              artist_name: "Taylor Swift",
              is_closed: 0,
            },
            {
              id: 6,
              title: "naira konser",
              venue: "depok",
              event_date: "2027-01-07T17:00:00.000Z",
              artist_name: "Coldplay",
              is_closed: 0,
            },
          ];
        }

        setEvents(eventList);

        if (eventList.length > 0) {
          const firstId = eventList[0].id;
          setSelectedEventId(firstId);
          fetchTicketsForEvent(firstId);
        }
      } catch (err) {
        console.error("Error loading events:", err);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [fetchTicketsForEvent]);

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
    return titleMatch || venueMatch || artistMatch;
  });

  // Active event object
  const currentEvent =
    events.find((e) => e.id === selectedEventId) || events[0] || null;

  /* =====================================================
     ACTIONS: ADD TICKET CATEGORY (POST /api/tickets)
  ===================================================== */

  const handleOpenAddModal = () => {
    setAddForm({
      name: "",
      price: "",
      quota: "",
    });
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
     ACTIONS: LOCK SALES / UNLOCK SALES (PUT /api/tickets/[id])
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
          {/* =================================================
              PAGE HEADER
          ================================================= */}
          <div className="mb-8">
            <h1 className="text-[28px] font-bold tracking-tight text-zinc-100">
              Ticket Classes & Quota
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Kelola kategori tiket, harga, kuota, serta status penjualan tiket langsung tersimpan ke database.
            </p>
          </div>

          {/* =================================================
              EVENT SELECTOR SECTION (CARDS)
              "Select an event to manage its ticket categories and quota"
          ================================================= */}
          <div className="mb-10 rounded-2xl border border-white/[0.06] bg-[#0c0a1a]/80 p-5 shadow-2xl backdrop-blur-sm sm:p-6">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-600/30 text-purple-400 text-xs font-bold">
                    1
                  </span>
                  <h2 className="text-[17px] font-bold text-zinc-100">
                    Select an event to manage its ticket categories and quota
                  </h2>
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  Pilih salah satu kartu event di bawah ini untuk mengelola kelas tiket dan kuotanya.
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
                  placeholder="Cari event konser berdasarkan nama, venue, atau artis..."
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
                  
                  // Status badge text & color
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

                      {/* VENUE */}
                      <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                        <MapPin size={13} className="shrink-0 text-zinc-500" />
                        <span className="truncate">{evt.venue || "Venue TBA"}</span>
                      </div>

                      {/* DATE */}
                      <div className="mt-1.5 flex items-center gap-2 text-xs text-zinc-400">
                        <Calendar size={13} className="shrink-0 text-zinc-500" />
                        <span>{formatDate(evt.event_date)}</span>
                      </div>

                      {/* FOOTER INFO */}
                      <div className="mt-3.5 flex items-center justify-between border-t border-white/[0.05] pt-2.5 text-[11px]">
                        <span className={`rounded-full border px-2 py-0.5 font-medium ${statusBg}`}>
                          {statusLabel}
                        </span>

                        <span className="flex items-center gap-1 text-zinc-400">
                          <Tag size={12} className="text-purple-400" />
                          <span className="font-semibold text-zinc-300">
                            ID: {evt.id}
                          </span>
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
          {currentEvent && (
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
                  <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
                    Lokasi: <span className="text-zinc-300">{currentEvent.venue || "Venue TBA"}</span> • Tanggal:{" "}
                    <span className="text-zinc-300">{formatDate(currentEvent.event_date)}</span>
                  </p>
                </div>

                {/* + ADD TICKET CATEGORY BUTTON */}
                <button
                  onClick={handleOpenAddModal}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-900/40 transition hover:from-purple-500 hover:to-violet-600 active:scale-[0.98]"
                >
                  <Plus size={18} strokeWidth={2.5} />
                  + Add Ticket Category
                </button>
              </div>

              {/* TICKET CATEGORIES LIST */}
              <div className="space-y-4">
                {loadingTickets ? (
                  <div className="flex h-36 flex-col items-center justify-center rounded-2xl border border-white/[0.04] bg-[#070512]/60 gap-3 text-sm text-zinc-400">
                    <Loader2 size={24} className="animate-spin text-purple-400" />
                    <span>Mengambil kategori tiket dari database...</span>
                  </div>
                ) : tickets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#070512]/50 py-12 text-center text-zinc-500">
                    <Tag size={36} className="mb-2 text-zinc-600" />
                    <p className="font-semibold text-zinc-300">Belum ada kategori tiket di database untuk konser ini</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Klik tombol "+ Add Ticket Category" di atas untuk menambahkan kelas tiket ke database.
                    </p>
                  </div>
                ) : (
                  tickets.map((ticket) => {
                    const remaining = Math.max(0, ticket.quota - (ticket.sold || 0));
                    const percentage =
                      ticket.quota > 0
                        ? Math.min(100, Math.round(((ticket.sold || 0) / ticket.quota) * 100))
                        : 0;
                    const isAlmostFull = percentage >= 80;

                    return (
                      <div
                        key={ticket.id}
                        className={`rounded-2xl border p-5 sm:p-6 shadow-xl transition-all duration-200 ${
                          ticket.locked
                            ? "border-amber-500/20 bg-[#090714]/90"
                            : "border-white/[0.04] bg-[#070512]/90 hover:border-purple-500/30"
                        }`}
                      >
                        {/* TOP SECTION */}
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          {/* CATEGORY INFO */}
                          <div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`h-3 w-3 rounded-full ${
                                  ticket.locked
                                    ? "bg-amber-500 ring-4 ring-amber-500/20"
                                    : isAlmostFull
                                    ? "bg-amber-400"
                                    : "bg-emerald-400"
                                }`}
                              />

                              <h3 className="text-[18px] font-bold text-zinc-100">
                                {ticket.name}
                              </h3>

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
                            </div>

                            {/* PRICE, QUOTA & REMAINING DETAILS */}
                            <div className="mt-2.5 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                              <span className="font-bold text-purple-300">
                                {formatPrice(ticket.price)}
                              </span>

                              <span className="text-zinc-700">•</span>

                              <span>
                                Quota:{" "}
                                <strong className="font-semibold text-zinc-200">
                                  {Number(ticket.quota).toLocaleString("id-ID")}
                                </strong>
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
                          </div>

                          {/* ACTION BUTTONS: Edit Price, Edit Quota, Lock/Unlock Sales */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 lg:pt-0">
                            {/* 1. EDIT PRICE BUTTON */}
                            <button
                              onClick={() => handleOpenEditPrice(ticket)}
                              className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-950/30 px-3.5 py-2 text-xs font-semibold text-purple-200 transition hover:bg-purple-900/50 hover:text-white"
                              title="Edit Price"
                            >
                              <DollarSign size={13} className="text-purple-400" />
                              Edit Price
                            </button>

                            {/* 2. EDIT QUOTA BUTTON */}
                            <button
                              onClick={() => handleOpenEditQuota(ticket)}
                              className="flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-950/30 px-3.5 py-2 text-xs font-semibold text-indigo-200 transition hover:bg-indigo-900/50 hover:text-white"
                              title="Edit Quota"
                            >
                              <Layers size={13} className="text-indigo-400" />
                              Edit Quota
                            </button>

                            {/* 3. LOCK SALES / UNLOCK SALES BUTTON */}
                            <button
                              onClick={() => toggleLockSales(ticket.id)}
                              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                                ticket.locked
                                  ? "border border-amber-500/40 bg-amber-950/50 text-amber-300 hover:bg-amber-900/60"
                                  : "border border-zinc-700/60 bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                              }`}
                              title={ticket.locked ? "Unlock Sales" : "Lock Sales"}
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

                            {/* EDIT ALL / DELETE DROPDOWN / QUICK ACTIONS */}
                            <button
                              onClick={() => handleOpenEditFull(ticket)}
                              className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-zinc-400 transition hover:bg-white/[0.08] hover:text-zinc-200"
                              title="Edit Detail Kategori"
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

                            <span className="font-bold text-purple-400">{percentage}%</span>
                          </div>

                          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-zinc-800/80">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                ticket.locked
                                  ? "bg-gradient-to-r from-amber-600 to-amber-400"
                                  : "bg-gradient-to-r from-purple-600 to-violet-400"
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

          {/* =================================================
              FOOTER
          ================================================= */}
          <footer className="py-12 text-center text-xs text-zinc-500">
            © 2026 Nocturne Admin Portal. All rights reserved. Database-backed Ticket Classes & Quota Management.
          </footer>
        </div>
      </main>

      {/* =====================================================
          MODAL 1: + ADD TICKET CATEGORY
      ===================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-[500px] rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/80">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                  <Plus size={20} className="text-purple-400" />
                  Add Ticket Category
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Untuk event: <strong className="text-purple-300">{currentEvent?.title}</strong>
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
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Ticket Category Name
                </label>
                <input
                  type="text"
                  placeholder="Contoh: VVIP Front Row, CAT 3, Early Bird"
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
                  Price (IDR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                    IDR
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
                  Total Quota (Seats / Tiket)
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
                  Edit Price
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Ubah harga untuk kategori: <strong className="text-purple-300">{activeTicket.name}</strong>
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
                Harga saat ini di database: <strong className="text-zinc-200">{formatPrice(activeTicket.price)}</strong>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Harga Baru (IDR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                    IDR
                  </span>
                  <input
                    type="number"
                    min="0"
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
                  Update Harga di Database
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
                  Edit Quota
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Ubah total kuota untuk kategori: <strong className="text-purple-300">{activeTicket.name}</strong>
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
                <span>Kuota di DB: <strong className="text-zinc-200">{activeTicket.quota}</strong></span>
                <span>Terjual: <strong className="text-amber-400">{activeTicket.sold || 0}</strong></span>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Total Kuota Baru
                </label>
                <input
                  type="number"
                  min={activeTicket.sold || 0}
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
                  Update Kuota di Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL 4: EDIT FULL (NAME, PRICE, QUOTA)
      ===================================================== */}
      {showEditFullModal && activeTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-[500px] rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/80">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                  <Edit3 size={20} className="text-purple-400" />
                  Edit Ticket Category
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Update nama kategori, harga, dan kuota tiket di database.
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
                  Ticket Category Name
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
                  Price (IDR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                    IDR
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
                  Total Quota
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
                  Simpan Perubahan ke Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
