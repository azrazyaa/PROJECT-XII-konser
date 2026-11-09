"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Semua data wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message);

        setName("");
        setEmail("");
        setPassword("");

        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1F1926] p-6">
      <div
        className="w-full max-w-5xl rounded-[28px] overflow-hidden shadow-2xl bg-cover bg-center"
        style={{
          backgroundImage: "url('/image/bg-galaxy.jpg')",
        }}
      >
        <div className="grid lg:grid-cols-2 min-h-[560px]">
          {/* LEFT */}
          <div className="flex flex-col items-center justify-center px-10 py-8">
            <Image
              src="/image/fingerprint.jpg"
              alt="Fingerprint"
              width={250}
              height={250}
              priority
            />

            <h1 className="mt-6 text-5xl font-bold text-white text-center">
              Register
            </h1>

            <p className="mt-4 text-center text-white/80 text-base leading-7">
              Register now and start
              <br />
              the best experience with us.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center p-8">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-sm rounded-[28px] border border-white/20 bg-white/10 backdrop-blur-xl px-8 py-8 text-white shadow-2xl"
            >
              <h1 className="text-3xl font-bold text-center">Register</h1>

              <p className="mt-2 mb-7 text-center text-sm text-white/80">
                Fill in your information to create an account.
              </p>

              <div className="mb-4">
                <label className="block mb-2 text-sm">Username</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full rounded-xl bg-white/90 px-4 py-3 text-black placeholder:text-gray-500 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm">Email</label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl bg-white/90 px-4 py-3 text-black placeholder:text-gray-500 outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm">Password</label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl bg-white/90 pl-4 pr-11 py-3 text-black placeholder:text-gray-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#3B1E54] py-3 font-semibold text-white transition hover:bg-[#b395cf] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Loading..." : "Register"}
              </button>

              <p className="mt-6 text-center text-sm text-white">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-semibold hover:text-[#D4BEE4] transition"
                >
                  Log in here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
