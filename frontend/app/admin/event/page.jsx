"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Bell,
  BarChart3,
  Check,
  ChevronDown,
  Edit3,
  Eye,
  EyeOff,
  Inbox,
  LayoutDashboard,
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
} from "lucide-react";

/* =========================================================
   EVENT DATA
========================================================= */

const initialEvents = [
  {
    id: 1,
    name: "Celestial Night Tour 2026",
    venue: "Jakarta International Stadium",
    date: "2026-09-15",
    quota: "10,000",
    status: "Active",
    visible: true,
  },
  {
    id: 2,
    name: "Neon Pulse Arena",
    venue: "Bali International Convention Center",
    date: "2026-10-22",
    quota: "5,300",
    status: "Active",
    visible: true,
  },
  {
    id: 3,
    name: "Midnight Symphony",
    venue: "Surabaya Grand Hall",
    date: "2026-07-30",
    quota: "3,000",
    status: "Completed",
    visible: false,
  },
];

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
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

        {/* Main Menu */}
        <div className="px-5 pt-9">
          <p className="mb-4 px-3 text-xs font-bold tracking-[0.13em] text-zinc-500">
            MAIN MENU
          </p>

          <nav className="space-y-1.5">
            {/* Dashboard */}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <LayoutDashboard size={19} strokeWidth={1.8} />

              <span className="text-[15px] font-medium">Dashboard</span>
            </Link>

            {/* Event CRUD - ACTIVE */}
            <Link
              href="/admin/event"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg border-l-2 border-purple-500 bg-purple-900/20 px-3 py-3.5 text-zinc-100 transition"
            >
              <Ticket size={19} strokeWidth={1.8} />

              <span className="text-[15px] font-medium">Event CRUD</span>

              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
            </Link>

            {/* Ticket */}
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

            {/* Artists */}
            <Link
              href="/admin/artists"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <Mic2 size={19} strokeWidth={1.8} />

              <span className="text-[15px] font-medium">Artists</span>
            </Link>

            {/* Payments */}
            <Link
              href="/admin/payment"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <ShieldCheck size={19} strokeWidth={1.8} />

              <span className="text-[15px] font-medium">Verify Payments</span>
            </Link>

            {/* QR */}
            <Link
              href="/admin/scanner"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-5 rounded-lg px-3 py-3.5 text-zinc-400 transition hover:bg-white/[0.035] hover:text-zinc-200"
            >
              <QrCode size={19} strokeWidth={1.8} />

              <span className="text-[15px] font-medium">QR Ticket Scanner</span>
            </Link>

            {/* Sales */}
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

        {/* Settings */}
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
    <header className="fixed right-0 top-0 z-30 h-[98px] border-b border-white/[0.06] bg-[#0a0815]/90 backdrop-blur-xl lg:left-[292px]">
      <div className="flex h-full items-center px-5 sm:px-8">
        {/* Mobile Menu */}
        <button
          onClick={() => setOpen(true)}
          className="text-zinc-300 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="ml-auto flex items-center gap-5">
          {/* Bell */}
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

/* =========================================================
   EVENT MANAGEMENT PAGE
========================================================= */

export default function EventPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [events, setEvents] = useState(initialEvents);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);

  const [form, setForm] = useState({
    name: "",
    venue: "",
    date: "",
    quota: "",
  });

  /* =====================================================
     FILTER EVENTS
  ===================================================== */

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchSearch =
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.venue.toLowerCase().includes(search.toLowerCase());

      const matchFilter = filter === "All" || event.status === filter;

      return matchSearch && matchFilter;
    });
  }, [events, search, filter]);

  /* =====================================================
     OPEN ADD MODAL
  ===================================================== */

  const openAddModal = () => {
    setEditingEvent(null);

    setForm({
      name: "",
      venue: "",
      date: "",
      quota: "",
    });

    setShowModal(true);
  };

  /* =====================================================
     OPEN EDIT MODAL
  ===================================================== */

  const openEditModal = (event) => {
    setEditingEvent(event);

    setForm({
      name: event.name,
      venue: event.venue,
      date: event.date,
      quota: event.quota.replace(/,/g, ""),
    });

    setShowModal(true);
  };

  /* =====================================================
     SAVE EVENT
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.venue || !form.date || !form.quota) {
      alert("Semua data event wajib diisi.");
      return;
    }

    const formattedQuota = Number(form.quota).toLocaleString("en-US");

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                name: form.name,
                venue: form.venue,
                date: form.date,
                quota: formattedQuota,
              }
            : event,
        ),
      );
    } else {
      const newEvent = {
        id: Date.now(),
        name: form.name,
        venue: form.venue,
        date: form.date,
        quota: formattedQuota,
        status: "Active",
        visible: true,
      };

      setEvents((prev) => [...prev, newEvent]);
    }

    setShowModal(false);
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = (id) => {
    const confirmed = window.confirm("Yakin ingin menghapus event ini?");

    if (!confirmed) return;

    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  /* =====================================================
     TOGGLE VISIBILITY
  ===================================================== */

  const toggleVisibility = (id) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? {
              ...event,
              visible: !event.visible,
            }
          : event,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#080612] text-zinc-200">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* =================================================
          TOPBAR
      ================================================= */}

      <Topbar setOpen={setSidebarOpen} />

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="min-h-screen pt-[98px] lg:pl-[292px]">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          <div className="absolute left-[18%] top-[5%] h-[500px] w-[650px] rounded-full bg-purple-900/20 blur-[150px]" />

          <div className="absolute right-[10%] top-[15%] h-[450px] w-[550px] rounded-full bg-violet-900/20 blur-[150px]" />

          <div className="absolute bottom-0 left-[25%] h-[400px] w-[600px] rounded-full bg-purple-950/30 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-7 xl:px-8">
          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <div className="mb-7">
            <h1 className="text-[28px] font-bold tracking-tight text-zinc-100">
              Event Management
            </h1>
          </div>

          {/* =================================================
              SECTION HEADER
          ================================================= */}

          <div className="mb-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[21px] font-bold text-zinc-100">
                Event Management
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Search, filter, and manage all concert events
              </p>
            </div>

            {/* New Event */}
            <button
              onClick={openAddModal}
              className="flex w-fit items-center gap-2 rounded-lg bg-gradient-to-r from-purple-700 to-violet-800 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/30 transition hover:from-purple-600 hover:to-violet-700"
            >
              <Plus size={18} />
              New Event
            </button>
          </div>

          {/* =================================================
              SEARCH + FILTER
          ================================================= */}

          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search */}
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

            {/* Filter */}
            <div className="flex w-fit items-center rounded-xl bg-[#05040d] p-1">
              {["All", "Active", "Completed", "Cancelled"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    filter === item
                      ? "bg-purple-800/70 text-purple-300"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              EVENT TABLE
          ================================================= */}

          <div className="overflow-hidden rounded-2xl border border-white/[0.04] bg-[#05040d]/90 shadow-xl">
            <div className="overflow-x-auto">
              <div className="min-w-[1050px]">
                {/* Table Header */}
                <div className="grid grid-cols-[2.2fr_2fr_1fr_1fr_1fr_1fr] items-center gap-5 border-b border-white/[0.04] px-5 py-4 text-xs font-medium tracking-wide text-zinc-500">
                  <span>EVENT NAME</span>

                  <span>VENUE</span>

                  <span>DATE</span>

                  <span>TOTAL QUOTA</span>

                  <span>STATUS</span>

                  <span>ACTIONS</span>
                </div>

                {/* Event Rows */}
                {filteredEvents.length === 0 ? (
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
                  filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="grid grid-cols-[2.2fr_2fr_1fr_1fr_1fr_1fr] items-center gap-5 border-b border-white/[0.025] px-5 py-5 last:border-b-0"
                    >
                      {/* Event Name */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-950/60 text-purple-400">
                          <Mic2 size={18} />
                        </div>

                        <span className="text-[15px] font-semibold text-zinc-200">
                          {event.name}
                        </span>
                      </div>

                      {/* Venue */}
                      <span className="text-sm text-zinc-400">
                        {event.venue}
                      </span>

                      {/* Date */}
                      <span className="text-sm text-zinc-400">
                        {event.date}
                      </span>

                      {/* Quota */}
                      <span className="text-sm font-semibold text-zinc-300">
                        {event.quota}
                      </span>

                      {/* Status */}
                      <div>
                        {event.status === "Active" ? (
                          <span className="rounded-full bg-amber-950/50 px-3 py-1 text-xs font-semibold text-amber-500">
                            Active
                          </span>
                        ) : event.status === "Completed" ? (
                          <span className="text-sm text-zinc-400">
                            Completed
                          </span>
                        ) : (
                          <span className="text-sm text-red-400">
                            Cancelled
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        {/* Edit */}
                        <button
                          onClick={() => openEditModal(event)}
                          title="Edit event"
                          className="text-zinc-400 transition hover:text-purple-400"
                        >
                          <Edit3 size={17} />
                        </button>

                        {/* Visibility */}
                        <button
                          onClick={() => toggleVisibility(event.id)}
                          title={event.visible ? "Hide event" : "Show event"}
                          className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                            event.visible
                              ? "bg-amber-950/40 text-amber-500 hover:bg-amber-900/50"
                              : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
                          }`}
                        >
                          {event.visible ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(event.id)}
                          title="Delete event"
                          className="text-zinc-500 transition hover:text-red-400"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
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
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-[520px] rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/60">
            {/* Modal Header */}
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Event Name
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
                  placeholder="e.g. Celestial Night Tour 2026"
                  className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
                />
              </div>

              {/* Venue */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Venue
                </label>

                <input
                  type="text"
                  value={form.venue}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      venue: e.target.value,
                    })
                  }
                  placeholder="e.g. Jakarta International Stadium"
                  className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
                />
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Event Date
                </label>

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      date: e.target.value,
                    })
                  }
                  className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none focus:border-purple-500/50"
                />
              </div>

              {/* Quota */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Total Quota
                </label>

                <input
                  type="number"
                  min="1"
                  value={form.quota}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      quota: e.target.value,
                    })
                  }
                  placeholder="e.g. 10000"
                  className="h-11 w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
                />
              </div>

              {/* Buttons */}
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
                  {editingEvent ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
    