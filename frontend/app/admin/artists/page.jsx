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
  X,
} from "lucide-react";

/* =========================================================
   ARTIST DATA
========================================================= */

const initialArtists = [
  {
    id: 1,
    name: "Aurora Velez",
    genre: "Electronic / Synthwave",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1000&q=85",
    concerts: ["Celestial Night Tour 2026", "Neon Pulse Arena"],
    bio: "Aurora Velez is a boundary-pushing electronic producer known for ethereal synthwave soundscapes. With two platinum albums and sold-out arena tours across Asia, she brings...",
  },
  {
    id: 2,
    name: "Kai Matsumoto",
    genre: "J-Rock / Alternative",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85",
    concerts: ["Celestial Night Tour 2026"],
    bio: "Kai Matsumoto leads the Japanese rock revival with his explosive guitar work and charismatic stage presence. His band has headlined major festivals including Summer Sonic and Fuji...",
  },
  {
    id: 3,
    name: "Luna De Santos",
    genre: "Latin Pop / Reggaeton",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85",
    concerts: ["Neon Pulse Arena", "Midnight Symphony"],
    bio: "Luna De Santos blends infectious reggaeton beats with pop melodies that have dominated Latin American charts. Her live shows are legendary for their high-energy choreography and...",
  },
  {
    id: 4,
    name: "The Voidwalkers",
    genre: "Progressive Metal",
    image:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=1000&q=85",
    concerts: ["Celestial Night Tour 2026"],
    bio: "The Voidwalkers are a progressive metal collective known for atmospheric compositions, powerful live performances, and immersive visual production.",
  },
  {
    id: 5,
    name: "Zara Noor",
    genre: "R&B / Soul",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1000&q=85",
    concerts: ["Midnight Symphony"],
    bio: "Zara Noor brings smooth R&B vocals and soulful songwriting to every stage. Her intimate performances combine modern production with timeless soul influences.",
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

            {/* ARTISTS - ACTIVE */}
            <Link
              href="/admin/artists"
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 rounded-lg border-l-2 border-purple-500 bg-purple-900/20 px-3 py-3.5 text-zinc-100"
            >
              <Mic2 size={19} strokeWidth={1.8} />

              <span className="text-[15px] font-medium">Artists</span>

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
   ARTIST PAGE
========================================================= */

export default function ArtistsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [artists, setArtists] = useState(initialArtists);

  const [showModal, setShowModal] = useState(false);

  const [editingArtist, setEditingArtist] = useState(null);

  const [form, setForm] = useState({
    name: "",
    genre: "",
    image: "",
    concerts: "",
    bio: "",
  });

  /* =======================================================
     OPEN ADD MODAL
  ======================================================= */

  const openAddModal = () => {
    setEditingArtist(null);

    setForm({
      name: "",
      genre: "",
      image: "",
      concerts: "",
      bio: "",
    });

    setShowModal(true);
  };

  /* =======================================================
     OPEN EDIT MODAL
  ======================================================= */

  const openEditModal = (artist) => {
    setEditingArtist(artist);

    setForm({
      name: artist.name,
      genre: artist.genre,
      image: artist.image,
      concerts: artist.concerts.join(", "),
      bio: artist.bio,
    });

    setShowModal(true);
  };

  /* =======================================================
     SAVE ARTIST
  ======================================================= */

  const saveArtist = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.genre.trim() || !form.bio.trim()) {
      alert("Nama, genre, dan bio wajib diisi.");
      return;
    }

    const concerts = form.concerts
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (editingArtist) {
      setArtists((prev) =>
        prev.map((artist) =>
          artist.id === editingArtist.id
            ? {
                ...artist,
                name: form.name,
                genre: form.genre,
                image:
                  form.image ||
                  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85",
                concerts,
                bio: form.bio,
              }
            : artist,
        ),
      );
    } else {
      setArtists((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: form.name,
          genre: form.genre,
          image:
            form.image ||
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85",
          concerts,
          bio: form.bio,
        },
      ]);
    }

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#080612] text-zinc-200">
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
              TITLE
          ================================================= */}

          <h1 className="mb-7 text-[28px] font-bold tracking-tight text-zinc-100">
            Artist Management
          </h1>

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[21px] font-bold text-zinc-100">
                Artist Management
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Manage artist profiles, bios, and concert assignments
              </p>
            </div>

            {/* ADD ARTIST */}
            <button
              onClick={openAddModal}
              className="flex w-fit items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-800/80 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/20 transition hover:bg-purple-700"
            >
              <span className="text-lg leading-none">+</span>
              Add New Artist
            </button>
          </div>

          {/* =================================================
              ARTIST GRID
          ================================================= */}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="group overflow-hidden rounded-2xl border border-white/[0.04] bg-[#05040d]/95 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-purple-500/20"
              >
                {/* IMAGE */}
                <div className="relative h-[215px] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url("${artist.image}")`,
                    }}
                  />

                  {/* PURPLE/BLACK OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05040d] via-[#10051d]/20 to-purple-900/10" />

                  {/* ARTIST INFO OVER IMAGE */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-[17px] font-bold text-white">
                      {artist.name}
                    </h3>

                    <p className="text-sm font-medium text-zinc-300">
                      {artist.genre}
                    </p>
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="px-5 pb-5 pt-4">
                  {/* ASSIGNED CONCERTS */}
                  <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-400">
                      Assigned Concerts
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {artist.concerts.length > 0 ? (
                        artist.concerts.map((concert) => (
                          <span
                            key={concert}
                            className="rounded-full bg-purple-950/70 px-2.5 py-1 text-[11px] font-medium text-purple-400"
                          >
                            {concert}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-zinc-600">
                          No assigned concerts
                        </span>
                      )}
                    </div>
                  </div>

                  {/* BIO */}
                  <div className="mt-3">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-sm font-semibold text-zinc-400">Bio</p>

                      <button
                        onClick={() => openEditModal(artist)}
                        className="flex items-center gap-1.5 text-sm font-medium text-purple-400 transition hover:text-purple-300"
                      >
                        <Edit3 size={13} />
                        Edit
                      </button>
                    </div>

                    <p className="text-[13px] leading-6 text-zinc-500">
                      {artist.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="py-10 text-center text-sm text-zinc-500">
            © 2026 Nocturne Admin Portal. All rights reserved. Built for concert
            organizers.
          </footer>
        </div>
      </main>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-[550px] overflow-y-auto rounded-2xl border border-purple-500/20 bg-[#0d0b1c] p-6 shadow-2xl shadow-black/70">
            {/* HEADER */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100">
                  {editingArtist ? "Edit Artist" : "Add New Artist"}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {editingArtist
                    ? "Update artist profile information."
                    : "Add a new artist to the portal."}
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-500 transition hover:text-zinc-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={saveArtist} className="space-y-4">
              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Artist Name
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
                  placeholder="Example: Aurora Velez"
                  className="h-11 w-full rounded-xl border border-white/[0.07] bg-black/30 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-purple-500/50"
                />
              </div>

              {/* GENRE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Genre
                </label>

                <input
                  type="text"
                  value={form.genre}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      genre: e.target.value,
                    })
                  }
                  placeholder="Example: Electronic / Synthwave"
                  className="h-11 w-full rounded-xl border border-white/[0.07] bg-black/30 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-purple-500/50"
                />
              </div>

              {/* IMAGE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Image URL
                </label>

                <input
                  type="text"
                  value={form.image}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      image: e.target.value,
                    })
                  }
                  placeholder="https://..."
                  className="h-11 w-full rounded-xl border border-white/[0.07] bg-black/30 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-purple-500/50"
                />
              </div>

              {/* CONCERTS */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Assigned Concerts
                </label>

                <input
                  type="text"
                  value={form.concerts}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      concerts: e.target.value,
                    })
                  }
                  placeholder="Celestial Night Tour 2026, Neon Pulse Arena"
                  className="h-11 w-full rounded-xl border border-white/[0.07] bg-black/30 px-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-purple-500/50"
                />

                <p className="mt-1.5 text-xs text-zinc-600">
                  Pisahkan nama konser menggunakan koma.
                </p>
              </div>

              {/* BIO */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">
                  Bio
                </label>

                <textarea
                  rows={5}
                  value={form.bio}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      bio: e.target.value,
                    })
                  }
                  placeholder="Write artist biography..."
                  className="w-full resize-none rounded-xl border border-white/[0.07] bg-black/30 px-4 py-3 text-sm leading-6 text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-purple-500/50"
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
                  {editingArtist ? "Save Changes" : "Add Artist"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
