"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why Us", href: "#benefits" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-brand-darker/90 backdrop-blur-xl border-b border-brand-border/60 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="RiseClear Property Services"
            >
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-brand-blue rounded-lg rotate-12 opacity-60 group-hover:rotate-45 transition-transform duration-500" />
                <div className="absolute inset-0 bg-brand-blue rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-display font-800 text-base leading-none select-none">
                    R
                  </span>
                </div>
              </div>
              <div className="leading-tight">
                <span className="font-display font-700 text-[15px] tracking-tight text-brand-white block">
                  Rise<span className="text-brand-blue">Clear</span>
                </span>
                <span className="text-[9px] text-brand-muted uppercase tracking-[0.15em] block -mt-0.5">
                  Property Services
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm text-brand-light hover:text-brand-white font-body font-400 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+14318164106"
                className="flex items-center gap-2 text-sm font-body font-500 text-brand-light hover:text-brand-white transition-colors duration-200"
                aria-label="Call RiseClear"
              >
                <Phone className="w-3.5 h-3.5 text-brand-blue" />
                <span className="hidden lg:block">+1 431 816 4106</span>
              </a>
              <button
                onClick={() => handleNavClick("#contact")}
                className="flex items-center gap-1.5 bg-brand-blue hover:bg-brand-blue-bright text-white text-sm font-body font-600 px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-glow-sm cursor-pointer group"
              >
                Get a Quote
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-brand-light hover:text-brand-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 pt-20 pb-6 bg-brand-darker/95 backdrop-blur-xl border-b border-brand-border lg:hidden"
          >
            <nav className="container mx-auto px-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3.5 text-base font-body font-400 text-brand-light hover:text-brand-white hover:bg-white/5 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="border-t border-brand-border mt-3 pt-4 flex flex-col gap-2">
                <a
                  href="tel:+14318164106"
                  className="flex items-center gap-3 px-4 py-3.5 text-brand-white bg-white/5 rounded-xl font-body font-500"
                >
                  <Phone className="w-4 h-4 text-brand-blue" />
                  Call: +1 431 816 4106
                </a>
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="px-4 py-3.5 bg-brand-blue text-white rounded-xl font-body font-600 text-center hover:bg-brand-blue-bright transition-colors cursor-pointer"
                >
                  Get a Free Quote
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
