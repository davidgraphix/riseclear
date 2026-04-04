"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Star, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.11, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

const trust = [
  "Fully insured & bonded",
  "Same-day service available",
  "Streak-free guarantee",
];

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white"
      aria-label="RiseClear Property Services — Winnipeg Window Cleaning"
    >
      {/* Subtle blue gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 60% 40%, #EFF6FF 0%, #FFFFFF 65%)",
        }}
        aria-hidden="true"
      />
      {/* Grid texture */}
      <div
        className="absolute inset-0 bg-grid-light bg-grid opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div>
            {/* Badge */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="mb-6"
            >
              <span className="pill">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse-slow inline-block" />
                Winnipeg&apos;s Trusted Cleaning Experts
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-4xl sm:text-5xl xl:text-[3.5rem] font-bold text-brand-ink leading-[1.08] tracking-tight mb-5"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Crystal-Clear{" "}
              <span className="gradient-text">Windows</span>{" "}
              for Your Home &amp; Business
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-[1.0625rem] text-brand-body leading-relaxed max-w-lg mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Professional window cleaning, gutter care, pressure washing, deep
              cleaning, and permanent LED installation — serving{" "}
              <strong className="text-brand-ink font-semibold">Winnipeg, Manitoba</strong>{" "}
              with a satisfaction guarantee.
            </motion.p>

            {/* Trust bullets */}
            <motion.ul
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="flex flex-col gap-2 mb-9"
              aria-label="Key trust points"
            >
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-[0.9375rem] text-brand-body">
                  <CheckCircle className="w-4.5 h-4.5 text-brand-blue flex-shrink-0 w-5 h-5" strokeWidth={2} />
                  {t}
                </li>
              ))}
            </motion.ul>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <a
                href="tel:+14318164106"
                className="btn-primary text-base px-7 py-4"
                aria-label="Call RiseClear Property Services"
              >
                <Phone className="w-4.5 h-4.5 w-5 h-5" />
                Call for a Free Quote
              </a>
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-secondary text-base px-7 py-4"
                aria-label="Request an online quote"
              >
                Request Online Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={5}
              className="flex items-center gap-5 flex-wrap"
            >
              {/* Stars */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-brand-ink">5.0</span>
                <span className="text-sm text-brand-muted">· 200+ reviews</span>
              </div>

              <div className="w-px h-5 bg-brand-border hidden sm:block" aria-hidden="true" />

              <a
                href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-brand-body hover:text-[#25D366] transition-colors duration-200"
                aria-label="WhatsApp RiseClear"
              >
                <div className="w-7 h-7 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                WhatsApp Us
              </a>
            </motion.div>
          </div>

          {/* ── Right: Hero image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(37,99,235,0.14),0_8px_24px_rgba(15,23,42,0.08)]">
              <Image
                src="https://images.unsplash.com/photo-1527515637462-cff94ece8e7f?w=900&q=85&auto=format&fit=crop"
                alt="Professional window cleaning technician working on a building in Winnipeg"
                width={700}
                height={560}
                className="w-full object-cover aspect-[5/4]"
                priority
                sizes="(max-width: 1280px) 50vw, 600px"
              />
              {/* Light gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/30 via-transparent to-transparent" />
            </div>

            {/* Floating badge: rating */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-10 bg-white rounded-2xl shadow-card px-4 py-3.5 flex items-center gap-3"
              aria-hidden="true"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-blue-light flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <p className="font-bold text-brand-ink text-sm leading-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>5.0 Rating</p>
                <p className="text-xs text-brand-muted">200+ clients</p>
              </div>
            </motion.div>

            {/* Floating badge: guarantee */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-6 bottom-12 bg-brand-blue rounded-2xl shadow-blue px-4 py-3.5"
              aria-hidden="true"
            >
              <p className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>100% Streak-Free</p>
              <p className="text-xs text-blue-200 mt-0.5">Guaranteed</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
}
