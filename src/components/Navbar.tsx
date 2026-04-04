"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "py-3 bg-white/95 backdrop-blur-md shadow-nav border-b border-brand-border"
            : "py-4 bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="RiseClear Property Services Home">
              {/* Icon mark */}
              <div className="relative flex-shrink-0 w-10 h-10" aria-hidden="true">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark shadow-[0_2px_12px_rgba(37,99,235,0.35)] group-hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] transition-shadow duration-300" />
                {/* Inner icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Custom RC lettermark */}
                  <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2h6a4 4 0 0 1 0 8H2V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 10l4 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M20 4.5A5.5 5.5 0 0 0 14.5 2" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M20 13.5A5.5 5.5 0 0 1 14.5 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M14.5 16H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              {/* Wordmark */}
              <div className="leading-none">
                <div className="flex items-baseline gap-0.5">
                  <span
                    className="text-[1.125rem] font-bold tracking-tight text-brand-ink"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Rise
                  </span>
                  <span
                    className="text-[1.125rem] font-bold tracking-tight text-brand-blue"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Clear
                  </span>
                </div>
                <p className="text-[9.5px] text-brand-muted tracking-[0.12em] uppercase mt-0.5 font-medium"
                   style={{ fontFamily: "var(--font-inter)" }}>
                  Property Services
                </p>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5" role="navigation">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-[0.9rem] font-medium text-brand-body hover:text-brand-blue rounded-lg hover:bg-brand-blue-light transition-all duration-200 cursor-pointer"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* ── CTA row ── */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+14318164106"
                className="hidden lg:flex items-center gap-2 text-sm font-medium text-brand-body hover:text-brand-blue transition-colors duration-200"
                aria-label="Call RiseClear"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <div className="w-7 h-7 rounded-full bg-brand-blue-light flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-brand-blue" />
                </div>
                <span>+1 431 816 4106</span>
              </a>

              <button
                onClick={() => scrollTo("#contact")}
                className="btn-primary text-sm px-5 py-2.5"
                aria-label="Get a free quote"
              >
                Get a Free Quote
              </button>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-brand-body hover:text-brand-blue hover:bg-brand-blue-light transition-all duration-200"
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
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 pt-[72px] pb-6 bg-white border-b border-brand-border shadow-nav lg:hidden"
          >
            <div className="container mx-auto px-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 + 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3.5 text-base font-medium text-brand-body hover:text-brand-blue hover:bg-brand-blue-light rounded-xl transition-all duration-200 cursor-pointer"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </motion.button>
              ))}

              <div className="border-t border-brand-border mt-3 pt-4 flex flex-col gap-2.5">
                <a
                  href="tel:+14318164106"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-brand-surface border border-brand-border font-medium text-brand-ink"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <Phone className="w-4 h-4 text-brand-blue" />
                  +1 431 816 4106
                </a>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="btn-primary w-full py-3.5 text-base"
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
