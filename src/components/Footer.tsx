"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#process" },
  { label: "Why Choose Us", href: "#benefits" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  { label: "Window Cleaning", href: "#services" },
  { label: "Gutter Cleaning", href: "#services" },
  { label: "Home Cleaning", href: "#services" },
  { label: "Deep Cleaning", href: "#services" },
  { label: "Pressure Washing", href: "#services" },
  { label: "Move-In / Move-Out", href: "#services" },
  { label: "LED Light Installation", href: "#services" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-brand-ink text-white"
      aria-label="RiseClear footer"
    >
      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl" ref={ref}>
        <div className="py-14 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group mb-5 w-fit" aria-label="RiseClear">
             <div className="relative flex-shrink-0 w-12 h-12" aria-hidden="true">
                {/* Inner icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/riseclear-logo.png"
                    alt="RiseClear logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div>
                <span className="font-bold text-[1.0625rem] text-white tracking-tight block"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  Rise<span className="text-brand-blue-bright" style={{ color: "#60A5FA" }}>Clear</span>
                </span>
                <span className="text-[9px] text-slate-400 uppercase tracking-[0.14em] block mt-0.5">
                  Property Services
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
              Winnipeg&apos;s trusted property cleaning specialists. Premium window cleaning, gutter care, pressure washing and LED installation.
            </p>

            <div className="space-y-3">
              <a href="tel:+14318164106" className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors group"
                 aria-label="Call RiseClear">
                <Phone className="w-4 h-4 text-brand-blue flex-shrink-0 group-hover:scale-110 transition-transform" />
                +1 431 816 4106
              </a>
              <a href="mailto:info@risecleaning.ca" className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors group"
                 aria-label="Email RiseClear">
                <Mail className="w-4 h-4 text-brand-blue flex-shrink-0 group-hover:scale-110 transition-transform" />
                info@risecleaning.ca
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" />
                Winnipeg, Manitoba, Canada
              </div>
              <a
                href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-[#25D366] transition-colors group"
                aria-label="WhatsApp RiseClear"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0 group-hover:scale-110 transition-transform" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.5 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5"
                style={{ fontFamily: "var(--font-inter)" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer group flex items-center gap-1.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-brand-blue transition-all duration-200 rounded-full" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14, duration: 0.5 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5"
                style={{ fontFamily: "var(--font-inter)" }}>
              Our Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <button
                    onClick={() => scrollTo(s.href)}
                    className="text-sm text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer group flex items-center gap-1.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-brand-blue transition-all duration-200 rounded-full" />
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5"
                style={{ fontFamily: "var(--font-inter)" }}>
              Get a Free Quote
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-5" style={{ fontFamily: "var(--font-inter)" }}>
              Ready for crystal-clear windows and a pristine property? Contact us — no obligation, no hidden fees.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+14318164106"
                className="group flex items-center justify-center gap-2.5 w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 shadow-blue"
                aria-label="Call for a quote"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                <Phone className="w-4 h-4" />
                Call Now
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full border border-[#25D366]/30 hover:border-[#25D366]/70 bg-[#25D366]/5 hover:bg-[#25D366]/15 text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200"
                aria-label="WhatsApp for a quote"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp Us
              </a>
            </div>

            {/* Trust mini badge */}
            <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex gap-0.5 mb-1.5">
                {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
              </div>
              <p className="font-semibold text-sm text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Highly Rated in Winnipeg
              </p>
              <p className="text-xs text-slate-400 mt-0.5">200+ satisfied customers</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500 text-center sm:text-left" style={{ fontFamily: "var(--font-inter)" }}>
              © {year} RiseClear Property Services. All rights reserved. Winnipeg, Manitoba, Canada.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollTo("#home")}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Back to top"
              >
                <span className="text-white text-sm leading-none">↑</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
