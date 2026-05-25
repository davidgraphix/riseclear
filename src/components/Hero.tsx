"use client";

import { motion } from "framer-motion";
import { Phone, Star, CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Trust points focused on cleaning services broadly
const TRUST = [
  "Residential & commercial cleaning",
  "Fully insured & satisfaction guaranteed",
  "Same-day & next-day availability",
];

const STATS = [
  { value: "500+", label: "Homes & Offices Cleaned" },
  { value: "5.0★", label: "Average Rating"          },
  { value: "3+",   label: "Years Serving Winnipeg"  },
];

// Highlight the full range of services in the badge area
const SERVICE_PILLS = [
  "Residential Cleaning",
  "Commercial Cleaning",
  "Window Cleaning",
  "Post-Construction",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(150deg,#0369A1 0%,#0EA5E9 45%,#38BDF8 100%)" }}
      aria-label="RiseClear Property Services — Professional Cleaning in Winnipeg"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-sky bg-grid opacity-[0.08] pointer-events-none" aria-hidden="true" />
      {/* Radial light */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(ellipse 60% 50% at 65% 40%,rgba(255,255,255,0.12) 0%,transparent 70%)" }}
           aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-[0.7rem] font-bold uppercase tracking-widest font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow" />
                Winnipeg&apos;s Trusted Cleaning Company
              </span>
            </motion.div>

            {/* H1 — general cleaning services focus */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22,1,0.36,1] }}
              className="font-display text-[2.625rem] sm:text-5xl xl:text-[3.625rem] font-black text-white leading-[1.05] tracking-tight mb-5"
            >
              Spotless Homes.{" "}
              <span style={{ background: "linear-gradient(135deg,#FFFFFF,#BAE6FD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Gleaming Offices.
              </span>
              <br />Every Time.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="font-body text-[1rem] text-sky-100 leading-relaxed max-w-lg mb-6"
            >
              Professional residential &amp; commercial cleaning services across{" "}
              <strong className="text-white font-semibold">Winnipeg, Manitoba</strong>.
              Standard cleans, deep cleans, move-in/out, window cleaning, and post-construction — all with a 100% satisfaction guarantee.
            </motion.p>

            {/* Service pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {SERVICE_PILLS.map((pill) => (
                <span key={pill} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-body font-medium">
                  <span className="w-1 h-1 rounded-full bg-sky-300 flex-shrink-0" />
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* Trust bullets */}
            <motion.ul
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.30 }}
              className="flex flex-col gap-2.5 mb-9"
            >
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-[0.9375rem] text-sky-50 font-body">
                  <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0" strokeWidth={2} />
                  {t}
                </li>
              ))}
            </motion.ul>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
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
              <Link
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" }); }}
                className="btn-white-outline text-[0.9375rem] px-7 py-4"
              >
                Request a Quote Online
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Social proof */}
            {/* <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.46 }}
              className="flex items-center flex-wrap gap-5"
            >
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />)}
                <span className="text-sm font-semibold text-white font-body ml-1">5.0</span>
                <span className="text-sm text-sky-200 font-body">· 500+ cleans</span>
              </div>
            </motion.div> */}
          </div>

          {/* ── Right: Hero image ── */}
          <motion.div
            initial={{ opacity: 0, x: 36, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.22, duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.28)] border border-white/20">
              <div className="relative aspect-[5/4] bg-sky-200">
                <Image
                  src="/hero.jpg"
                  alt="Professional cleaning team delivering spotless results across Winnipeg"
                  fill priority className="object-cover"
                  sizes="(max-width:1280px) 50vw, 640px"
                  onError={(e) => { (e.target as HTMLImageElement).style.display="none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Float: rating */}
            <motion.div
              animate={{ y: [0,-8,0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-8 bg-white rounded-2xl shadow-float px-4 py-3.5 flex items-center gap-3 border border-sky-100"
              aria-hidden="true"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <p className="font-display font-bold text-brand-ink text-sm">5.0 Rating</p>
                <p className="font-body text-xs text-brand-muted">500+ happy clients</p>
              </div>
            </motion.div>

            {/* Float: guarantee */}
            <motion.div
              animate={{ y: [0,9,0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute -right-6 bottom-10 bg-sky-600 rounded-2xl shadow-sky-lg px-5 py-4 border border-sky-500"
              aria-hidden="true"
            >
              <p className="font-display font-bold text-white text-sm">100% Satisfaction</p>
              <p className="font-body text-sky-200 text-xs mt-0.5">Guaranteed on every clean</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        {/* <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-16 grid grid-cols-3 gap-px bg-white/20 rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-white/10 px-4 sm:px-8 py-5 text-center">
              <p className="font-display font-black text-2xl sm:text-3xl text-white">{s.value}</p>
              <p className="font-body text-sky-200 text-xs sm:text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div> */}
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 sm:h-20 md:h-24">
          <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill="#F0F9FF" />
        </svg>
      </div>

      {/* Scroll cue */}
      {/* <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="font-body text-[10px] text-white/50 uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0,5,0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div> */}
    </section>
  );
}
