"use client";

import { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const AVATAR_PRESETS = [
  {
    name: "Cyber Neon",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "VIP Stage",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Aurora Artist",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Nocturne Admin",
    url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
  },
];

export default function AdminProfileModal({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarUrl(user.avatar_url || "");
      setPassword("");
      setMessage({ type: "", text: "" });
      setImgError(false);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const initial = (name || user?.name || "A").trim().charAt(0).toUpperCase();

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!name.trim() || !email.trim()) {
      setMessage({
        type: "error",
        text: "Username / Nama dan Email wajib diisi!",
      });
      return;
    }

    if (password && password.trim().length < 5) {
      setMessage({
        type: "error",
        text: "Password baru minimal 5 karakter!",
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          id: user?.id,
          name: name.trim(),
          email: email.trim(),
          avatar_url: avatarUrl.trim() || null,
          password: password.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({
          type: "success",
          text: data.message || "Profil berhasil diperbarui!",
        });

        // Update token jika ada
        if (data.data?.token) {
          localStorage.setItem("token", data.data.token);
        }

        // Update data user di localStorage
        if (data.data?.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          if (onUpdateUser) {
            onUpdateUser(data.data.user);
          }
        }

        // Reset password input
        setPassword("");

        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Gagal memperbarui profil.",
        });
      }
    } catch (err) {
      console.error("Save profile error:", err);
      setMessage({
        type: "error",
        text: "Terjadi kesalahan koneksi ke server.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin logout dari Admin Portal?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card Besar */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0919] p-6 sm:p-8 shadow-2xl shadow-purple-950/80 z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Glow Decor Background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-700/20 blur-[90px]" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-violet-800/15 blur-[90px]" />

        {/* Modal Header */}
        <div className="relative flex items-center justify-between border-b border-white/[0.06] pb-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-950/80 text-purple-400 border border-purple-500/30 shadow-md">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
                Profil Akun Admin
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Kelola foto profil, username, email, dan keamanan password.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04] text-zinc-400 transition hover:bg-white/[0.08] hover:text-zinc-100"
            title="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        {/* Feedback Alert */}
        {message.text && (
          <div
            className={`mt-5 flex items-center gap-3 rounded-2xl p-4 text-sm font-medium ${
              message.type === "success"
                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                : "bg-red-950/60 text-red-300 border border-red-500/30"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle size={18} className="shrink-0 text-red-400" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className="relative mt-6 space-y-6">
          {/* Section 1: Foto Profil Avatar Besar */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
              Foto Profil Admin
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Avatar Preview Besar */}
              <div className="relative group shrink-0">
                <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center overflow-hidden rounded-full border-2 border-purple-500/60 bg-gradient-to-br from-purple-600 to-indigo-950 text-3xl font-extrabold text-white shadow-xl shadow-purple-950/60">
                  {avatarUrl && !imgError ? (
                    <img
                      src={avatarUrl}
                      alt={name || "Admin"}
                      className="h-full w-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span>{initial}</span>
                  )}
                </div>

                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white shadow-md border-2 border-[#0c0919]">
                  <Camera size={14} />
                </div>
              </div>

              {/* Input URL Foto & Preset */}
              <div className="flex-1 w-full space-y-2.5">
                <div>
                  <div className="relative">
                    <input
                      type="url"
                      value={avatarUrl}
                      onChange={(e) => {
                        setAvatarUrl(e.target.value);
                        setImgError(false);
                      }}
                      placeholder="Masukkan URL foto profil (https://...)"
                      className="w-full rounded-xl border border-white/[0.08] bg-[#120e24] px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/50"
                    />
                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setAvatarUrl("");
                          setImgError(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-500 hover:text-red-400 transition"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Masukkan URL foto gambar langsung atau pilih preset avatar keren di bawah:
                  </p>
                </div>

                {/* Preset Avatars */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
                    <Sparkles size={12} className="text-purple-400" /> Preset:
                  </span>
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setAvatarUrl(preset.url);
                        setImgError(false);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#16122c] px-2.5 py-1 text-xs text-zinc-300 transition hover:border-purple-500/40 hover:bg-purple-950/40"
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="h-4 w-4 rounded-full object-cover"
                      />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Informasi Akun (Username, Email, Password) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Username / Nama */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Username / Nama Lengkap <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <User size={17} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama admin"
                  className="w-full rounded-xl border border-white/[0.08] bg-[#120e24] pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/50"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Email Admin <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <Mail size={17} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@konser.com"
                  className="w-full rounded-xl border border-white/[0.08] bg-[#120e24] pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/50"
                />
              </div>
            </div>

            {/* Password Baru */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Ganti Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <Lock size={17} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kosongkan jika tidak diubah"
                  className="w-full rounded-xl border border-white/[0.08] bg-[#120e24] pl-10 pr-11 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-500 hover:text-zinc-300 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="mt-1 text-[11px] text-zinc-500">
                Min. 5 karakter jika ingin mengganti password.
              </p>
            </div>

            {/* Role & Authority (Read Only) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Authority Role
              </label>
              <div className="flex h-[42px] items-center justify-between rounded-xl border border-white/[0.06] bg-purple-950/30 px-3.5 text-sm text-purple-300">
                <span className="font-semibold">
                  {user?.role === "admin" ? "System Administrator" : user?.role || "Admin"}
                </span>
                <span className="rounded-md bg-purple-900/60 px-2 py-0.5 text-[10px] font-bold text-purple-200 border border-purple-500/30">
                  FULL ACCESS
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-red-950/40 px-4 py-2.5 text-sm font-semibold text-red-400 border border-red-500/20 transition hover:bg-red-900/60 hover:text-red-200"
            >
              <LogOut size={16} />
              <span>Keluar / Logout</span>
            </button>

            {/* Save & Cancel */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08] hover:text-zinc-100"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 to-violet-800 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-950/50 transition hover:from-purple-600 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <span>Simpan Perubahan</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

