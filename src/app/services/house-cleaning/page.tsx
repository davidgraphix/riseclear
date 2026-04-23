import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstagramButton from "@/components/InstagramButton";
import HouseCleaningBooking from "@/components/HouseCleaningBooking";

export const metadata: Metadata = {
  title: "Home Cleaning Services in Winnipeg | RiseClear Property Services",
  description:
    "Book professional home cleaning in Winnipeg. One-time or recurring visits — weekly, bi-weekly, or monthly. Get an instant price estimate and book online.",
  openGraph: {
    title: "Home Cleaning Services in Winnipeg | RiseClear",
    description:
      "Professional home cleaning for Winnipeg residents. Instant pricing, flexible scheduling. Call +1 431 816 4106.",
    url: "https://risecleaning.ca/services/house-cleaning",
  },
  alternates: { canonical: "https://risecleaning.ca/services/house-cleaning" },
};

export default function HouseCleaningPage() {
  return (
    <>
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-sky-50 border-b border-sky-100 pt-[70px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-3.5">
          <div className="flex items-center gap-2 font-body text-sm text-brand-muted flex-wrap">
            <Link href="/" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-300" />
            <Link href="/#services" className="hover:text-sky-600 transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-300" />
            <span className="text-brand-ink font-semibold">Home Cleaning</span>
          </div>
        </div>
      </div>

      {/* ── Page hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(150deg,#0369A1 0%,#0EA5E9 55%,#38BDF8 100%)" }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
          <div className="max-w-2xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-[0.7rem] font-bold uppercase tracking-widest font-body mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              Cleaning Services · Home Cleaning
            </span>

            <h1
              className="font-display font-black text-4xl sm:text-5xl text-white leading-[1.07] tracking-tight mb-4"
            >
              Professional Home
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#FFFFFF,#BAE6FD)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Cleaning in Winnipeg
              </span>
            </h1>

            <p className="font-body text-sky-100 text-[1rem] leading-relaxed mb-6 max-w-lg">
              Book a one-time clean or set up a recurring schedule. Use our instant pricing tool below — adjust rooms and extras to see your exact estimate in real time.
            </p>

            {/* Quick trust row */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                "Fully insured & bonded",
                "Eco-friendly products",
                "Satisfaction guaranteed",
              ].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sky-100 font-body text-sm">
                  <Home className="w-3.5 h-3.5 text-sky-300" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="relative" aria-hidden="true">
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="w-full block"
            style={{ height: "40px" }}
          >
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>

      {/* ── Main content — 2-column booking UI ── */}
      <main className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
          <HouseCleaningBooking />
        </div>
      </main>

      <Footer />
      <InstagramButton />
    </>
  );
}
