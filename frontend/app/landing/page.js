  import Image from "next/image";
import Link from "next/link";
  import {
    HiOutlineMapPin,
    HiOutlineCalendarDays,
    HiOutlineClock,
} from "react-icons/hi2";
  import {
  HiOutlineTicket,
  HiOutlineCreditCard,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

  export default function LandingPage() {
    const artists = [
      {
        name: "Nadin Amizah",
        image: "/image/nadin.jpg",
      },
      {
        name: "Tulus",
        image: "/image/tulus.jpg",
      },
      {
        name: "Lyodra",
        image: "/image/lyodra.jpg",
      },
      {
        name: "Rizwan Fadilah",
        image: "/image/rizwan.jpg",
      },
      {
        name: "Bernadya",
        image: "/image/bernadya.jpg",
      },
    ];

    return (
      <>
        {/* ================= NAVBAR ================= */}
        <nav className="fixed top-0 left-0 z-50 w-full bg-[#151218]/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-[#D4BEE4]">Nocturne</h1>

            {/* Menu */}
            {/* Menu */}
            <ul className="hidden items-center gap-14 text-sm text-white md:flex">
              <li>
                <span className="cursor-default border-b border-[#DDB8F9] pb-1 text-[#D4BEE4]">
                  Explore
                </span>
              </li>

              <li>
                <span className="cursor-default transition hover:text-[#D4BEE4]">
                  Concerts
                </span>
              </li>

              <li>
                <span className="cursor-default transition hover:text-[#D4BEE4]">
                  Artists
                </span>
              </li>
            </ul>

            {/* Auth */}
            <div className="flex items-center gap-2 text-sm text-white">
              <Link href="/login" className="transition hover:text-[#D4BEE4]">
                Log In
              </Link>

              <span className="text-[#DDB8F9]">|</span>

              <Link
                href="/register"
                className="transition hover:text-[#D4BEE4]"
              >
                Register
              </Link>
            </div>
          </div>

          <div className="h-[2px] w-full bg-[#DDB8F9]" />
        </nav>

        {/* ================= HERO ================= */}
        <section
          className="relative flex h-[580px] items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('/image/hero-concert.jpg')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl px-6 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[5px] text-[#D4BEE4]">
              Premium Live Experience
            </p>

            <h1 className="mt-4 text-5xl font-extrabold leading-tight text-white md:text-6xl">
              Neon Dreams
              <br />
              <span className="text-[#D4BEE4]">World Tour</span>
            </h1>

            <p className="mt-6 leading-7 text-gray-300">
              Step into an extraordinary concert experience featuring
              world-class artists, breathtaking visuals, and unforgettable
              performances. Secure your seat today.
            </p>

            <Link
              href="/login"
              className="mt-8 inline-block rounded-full bg-[#3B1E54] px-8 py-3 font-semibold text-white transition hover:bg-[#B89CD9]"
            >
              Book Ticket Now
            </Link>
          </div>
        </section>

        <section className="bg-[#151218] py-16">
          <div className="mx-auto max-w-7xl px-8">
            <h2 className="mb-10 text-3xl font-bold text-[#D4BEE4]">
              Featured Event
            </h2>

            <div className="rounded-3xl border border-[#9B7EBD]/40 bg-[#2B2235] p-6">
              <div className="flex flex-col items-center gap-30 rounded-[35px] bg-[#A89AB5] p-8 lg:flex-row">
                {/* Poster */}
                <div className="flex justify-center">
                  <div className="w-[320px] h-[480px] overflow-hidden rounded-[30px] border-4 border-[#DDB8F9]">
                    <Image
                      src="/image/taylor.jpg"
                      alt="Taylor Swift"
                      width={320}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Detail */}
                <div className="flex flex-1 flex-col">
                  <h2 className="text-4xl font-extrabold uppercase text-white">
                    Taylor Swift
                  </h2>

                  <p className="mt-1 text-2xl font-black italic text-[#34184F]">
                    THE ERAS TOUR
                  </p>

                  {/* Rating */}
                  <div className="mt-5 flex items-center gap-2">
                    <span className="text-xl text-yellow-400">★★★★★</span>

                    <span className="font-semibold text-white">4.9</span>

                    <span className="text-white/70">(2.3 reviews)</span>
                  </div>

                  <hr className="my-5 border-white/30" />

                  {/* Location */}
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9DDF4]">
                      <HiOutlineMapPin className="text-2xl text-[#4A245E]" />
                    </div>

                    <div>
                      <p className="font-bold text-white">
                        Jakarta Convention Center
                      </p>

                      <p className="text-sm text-white/70">
                        Jl. Gatot Subroto No.01, Jakarta
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9DDF4]">
                      <HiOutlineCalendarDays className="text-2xl text-[#4A245E]" />
                    </div>

                    <p className="font-medium text-white">
                      Saturday, 28 October 2026
                    </p>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9DDF4]">
                      <HiOutlineClock className="text-2xl text-[#4A245E]" />
                    </div>

                    <p className="font-medium text-white">19 : 00</p>
                  </div>

                  <hr className="my-6 border-white/30" />

                  {/* Bottom */}
                  <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
                    <div>
                      <p className="text-xs uppercase tracking-[3px] text-white/60">
                        Starting From
                      </p>

                      <h3 className="text-4xl font-black text-[#2E1546]">
                        Rp. 950.000
                      </h3>
                    </div>

                    <Link
                      href="/login"
                      className="rounded-full bg-[#3B1E54] px-8 py-3 font-semibold text-white transition hover:bg-[#5A2E7D]"
                    >
                      Book Ticket Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRENDING ARTISTS ================= */}
        <section className="bg-[#151218] py-16">
          <div className="mx-auto max-w-7xl px-8">
            <h2 className="mb-10 text-3xl font-bold text-[#D4BEE4]">
              Trending Artists
            </h2>

            <div className="flex flex-wrap justify-center gap-12">
              {artists.map((artist, index) => (
                <div key={index} className="group flex flex-col items-center">
                  <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-[#D4BEE4] p-1 shadow-[0_0_20px_rgba(212,190,228,0.35)] transition duration-300 group-hover:scale-105 group-hover:border-[#9B7EBD]">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      width={144}
                      height={144}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>

                  <p className="mt-5 text-base font-semibold text-white">
                    {artist.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE US ================= */}
        <section className="bg-[#151218] py-16">
          <div className="mx-auto max-w-7xl px-8">
            {/* Heading */}
            <div className="mb-12 text-center">
              <h2 className="text-5xl font-bold text-[#D4BEE4]">
                Built for the Live Experience
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-300">
                Everything you need for a flawless concert journey — from
                discovery to the final encore.
              </p>
            </div>

            {/* Cards */}
            {/* Cards */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Card 1 */}
              <div className="scale-[0.93] rounded-[32px] bg-[#9B8CA6] p-8 transition duration-300 hover:-translate-y-2">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                  <HiOutlineTicket className="text-2xl text-[#B25EFF]" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  Seamless Booking
                </h3>

                <p className="leading-8 text-white/80">
                  Find and book tickets to the hottest concerts in seconds. Our
                  intuitive platform makes discovering live music effortless,
                  from browsing lineups to securing your spot with just a few
                  taps.
                </p>
              </div>

              {/* Card 2 */}
              <div className="scale-[0.93] rounded-[32px] bg-[#9B8CA6] p-8 transition duration-300 hover:-translate-y-2">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                  <HiOutlineCreditCard className="text-2xl text-[#B25EFF]" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  Instant E-Ticket Delivery
                </h3>

                <p className="leading-8 text-white/80">
                  No paper, no hassle. Your e-ticket arrives instantly via email
                  and app notification the moment your payment is confirmed.
                  Scan your QR code at the gate and walk right in.
                </p>
              </div>

              {/* Card 3 */}
              <div className="scale-[0.93] rounded-[32px] bg-[#9B8CA6] p-8 transition duration-300 hover:-translate-y-2">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                  <HiOutlineShieldCheck className="text-2xl text-[#B25EFF]" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  100% Secure Payment
                </h3>

                <p className="leading-8 text-white/80">
                  Every transaction is protected with bank-grade encryption. We
                  partner with Indonesia's most trusted payment providers—BCA,
                  Mandiri, GoPay, QRIS, and major credit cards—so your money
                  stays safe.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
