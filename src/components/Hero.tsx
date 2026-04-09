"use client";

import { motion } from "framer-motion";
import { Phone, Star, CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

const trust = [
  "Fully insured & bonded",
  "Streak-free guarantee",
  "Same-day service available",
];

const stats = [
  { value: "200+", label: "Happy Clients" },
  { value: "5.0★", label: "Avg. Rating" },
  { value: "3+", label: "Years Serving Winnipeg" },
];

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="RiseClear Property Services — Winnipeg's window cleaning experts"
    >
      {/* ── Sky-blue background ── */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(150deg, #0369A1 0%, #0EA5E9 45%, #38BDF8 100%)" }}
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 bg-grid-sky bg-grid opacity-[0.08] pointer-events-none"
        aria-hidden="true"
      />

      {/* Soft radial light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 65% 40%, rgba(255,255,255,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-[0.7rem] font-bold uppercase tracking-widest font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow" />
                Winnipeg&apos;s Trusted Cleaning Experts
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[2.625rem] sm:text-5xl xl:text-[3.625rem] font-900 text-white leading-[1.05] tracking-tight mb-5"
            >
              Crystal-Clear{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #BAE6FD 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Windows
              </span>
              <br />
              for Your Home &amp; Business
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.6 }}
              className="font-body text-[1rem] text-sky-100 leading-relaxed max-w-lg mb-8"
            >
              Professional window cleaning, gutter care, pressure washing, deep
              cleaning, and permanent LED installation — serving{" "}
              <strong className="text-white font-semibold">Winnipeg, Manitoba</strong>{" "}
              with a 100% satisfaction guarantee.
            </motion.p>

            {/* Trust bullets */}
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              className="flex flex-col gap-2.5 mb-9"
              aria-label="Key trust points"
            >
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-[0.9375rem] text-sky-50 font-body">
                  <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0" strokeWidth={2} />
                  {t}
                </li>
              ))}
            </motion.ul>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <a
                href="tel:+14318164106"
                className="btn-white text-[0.9375rem] px-7 py-4"
                aria-label="Call for a free quote"
              >
                <Phone className="w-5 h-5" />
                Call for a Free Quote
              </a>
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-white-outline text-[0.9375rem] px-7 py-4"
                aria-label="Request quote online"
              >
                Request Online Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Social proof — stars + Instagram */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44 }}
              className="flex items-center flex-wrap gap-5"
            >
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
                ))}
                <span className="text-sm font-semibold text-white font-body ml-1">5.0</span>
                <span className="text-sm text-sky-200 font-body">· 200+ reviews</span>
              </div>
              <div className="w-px h-4 bg-white/25 hidden sm:block" aria-hidden="true" />
              <a
                href="https://www.instagram.com/riseclearpropertyservices/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-sky-100 hover:text-white transition-colors font-body"
                aria-label="Follow RiseClear on Instagram"
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center border border-white/30"
                     style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                Instagram
              </a>
            </motion.div>
          </div>

              {/* Right: Image + stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 36, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Main photo */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.28)] border border-white/20">
              <div className="relative aspect-[5/4]">
                <Image
                  src="/images/hero-bg.jpeg"
                  alt="RiseClear technician performing professional window cleaning in Winnipeg"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1280px) 50vw, 640px"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.includes("/images/fallback.jpg")) {
                      target.src = "/images/fallback.jpg";
                    }
                  }}
                />
                {/* Placeholder when no image
                <div className="absolute inset-0 img-placeholder flex-col gap-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.5" aria-hidden="true">
                    <rect x="3" y="3" width="8" height="8" rx="1" />
                    <rect x="13" y="3" width="8" height="8" rx="1" />
                    <rect x="3" y="13" width="8" height="8" rx="1" />
                    <rect x="13" y="13" width="8" height="8" rx="1" />
                  </svg>
                  <p className="text-sky-400 text-sm font-body">Hero Image</p>
                </div> */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating: 5-star card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-8 bg-white rounded-2xl shadow-float px-4 py-3.5 flex items-center gap-3 border border-sky-100"
              aria-hidden="true"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <p className="font-display font-bold text-brand-ink text-sm leading-tight">5.0 Rating</p>
                <p className="font-body text-xs text-brand-muted">200+ clients</p>
              </div>
            </motion.div>

            {/* Floating: guarantee */}
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute -right-6 bottom-10 bg-sky-600 rounded-2xl shadow-sky-lg px-5 py-4 border border-sky-500"
              aria-hidden="true"
            >
              <p className="font-display font-bold text-white text-sm">100% Streak-Free</p>
              <p className="font-body text-sky-200 text-xs mt-0.5">Satisfaction Guaranteed</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-px bg-white/20 rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-white/10 px-4 sm:px-8 py-5 text-center">
              <p className="font-display font-900 text-2xl sm:text-3xl text-white">{s.value}</p>
              <p className="font-body text-sky-200 text-xs sm:text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Wave transition ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 sm:h-20 md:h-24">
          <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill="#F0F9FF" />
        </svg>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="font-body text-[10px] text-white/50 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
