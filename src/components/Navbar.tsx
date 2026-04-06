"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#process" },
  { label: "Why Us", href: "#benefits" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "py-3 bg-white/96 backdrop-blur-md shadow-nav border-b border-sky-100"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="RiseClear — Home">
              {/* Icon */}
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 shadow-sky group-hover:shadow-sky-lg transition-shadow duration-300" />
                <div className="absolute inset-0 rounded-xl flex items-center justify-center">
                  {/* Window-pane / RC mark */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="white" strokeWidth="1.8"/>
                    <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="white" strokeWidth="1.8"/>
                    <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="white" strokeWidth="1.8"/>
                    <rect x="11" y="11" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.8"/>
                  </svg>
                </div>
              </div>

              {/* Wordmark */}
              <div className="leading-none">
                <div className="flex items-baseline">
                  <span className="font-display text-[1.1rem] font-800 tracking-tight text-brand-ink">Rise</span>
                  <span className="font-display text-[1.1rem] font-800 tracking-tight text-sky-500">Clear</span>
                </div>
                <p className="font-body text-[9px] text-brand-muted tracking-[0.14em] uppercase mt-0.5">
                  Property Services
                </p>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-[0.875rem] font-medium text-brand-body hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all duration-180 cursor-pointer font-body"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* ── Right CTAs ── */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+14318164106"
                className="hidden lg:flex items-center gap-2 text-sm font-medium text-brand-body hover:text-sky-600 transition-colors font-body"
                aria-label="Call RiseClear"
              >
                <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-sky-600" />
                </div>
                +1 431 816 4106
              </a>
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-sky text-sm px-5 py-2.5"
                aria-label="Get a free quote"
              >
                Get a Free Quote
              </button>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
                mobileOpen
                  ? "bg-sky-100 text-sky-700"
                  : "text-brand-body hover:bg-sky-50 hover:text-sky-600"
              }`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 pt-[70px] pb-6 bg-white/97 backdrop-blur-xl border-b border-sky-100 shadow-nav lg:hidden"
          >
            <div className="container mx-auto px-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 + 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3.5 font-medium text-base text-brand-body hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all cursor-pointer font-body"
                >
                  {link.label}
                </motion.button>
              ))}

              <div className="border-t border-sky-100 mt-3 pt-4 flex flex-col gap-2.5">
                <a
                  href="tel:+14318164106"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-sky-50 border border-sky-200 font-semibold text-brand-ink font-display"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  +1 431 816 4106
                </a>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="btn-sky w-full py-3.5 text-base"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
