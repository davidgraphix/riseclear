"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const navLinks = ["Services", "How It Works", "Why Choose Us", "Testimonials", "Contact"];
const navHrefs = ["#services", "#process", "#benefits", "#testimonials", "#contact"];
const serviceLinks = [
  "Window Cleaning", "Gutter Cleaning", "Home Cleaning", "Deep Cleaning",
  "Pressure Washing", "Move-In / Move-Out", "LED Light Installation",
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const scrollTo = (h: string) => document.querySelector(h)?.scrollIntoView({ behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0C1A2E] text-white" aria-label="RiseClear footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl" ref={ref}>
        <div className="py-14 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <Link href="/" className="flex items-center gap-3 group mb-5 w-fit" aria-label="RiseClear">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image src="/riseclear-logo.png" alt="RiseClear Logo" width={40} height={40} />

              </div>
              <div>
                <span className="font-display font-bold text-[1.0625rem] text-white tracking-tight block">
                  Rise<span className="text-sky-400">Clear</span>
                </span>
                <span className="font-body text-[9px] text-slate-400 uppercase tracking-[0.14em] block mt-0.5">Property Services</span>
              </div>
            </Link>

            <p className="font-body text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              Winnipeg&apos;s trusted property cleaning specialists. Premium window cleaning, gutter care, pressure washing and LED installation.
            </p>

            <div className="space-y-3">
              {[
                { href: "tel:+14318164106", icon: Phone, text: "+1 431 816 4106" },
                { href: "mailto:info@risecleaning.ca", icon: Mail, text: "info@risecleaning.ca" },
              ].map(({ href, icon: Icon, text }) => (
                <a key={text} href={href} className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors group font-body">
                  <Icon className="w-4 h-4 text-sky-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  {text}
                </a>
              ))}
              <div className="flex items-center gap-2.5 text-sm text-slate-300 font-body">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                Winnipeg, Manitoba, Canada
              </div>
              <a
                href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-[#4ADE80] transition-colors group font-body"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#4ADE80] flex-shrink-0 group-hover:scale-110 transition-transform" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08, duration: 0.5 }}>
            <h3 className="font-body text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((label, i) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(navHrefs[i])}
                    className="font-body text-sm text-slate-300 hover:text-white transition-colors cursor-pointer group flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-sky-400 transition-all duration-200 rounded-full" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.14, duration: 0.5 }}>
            <h3 className="font-body text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Our Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="font-body text-sm text-slate-300 hover:text-white transition-colors cursor-pointer group flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-sky-400 transition-all duration-200 rounded-full" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA column */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.5 }}>
            <h3 className="font-body text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Get a Free Quote</h3>
            <p className="font-body text-sm text-slate-400 leading-relaxed mb-5">
              Ready for crystal-clear windows and a pristine property? No obligation, no hidden fees.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+14318164106"
                className="group flex items-center justify-center gap-2.5 w-full font-display font-semibold text-sm py-3 rounded-xl transition-all duration-200 text-white"
                style={{ background: "linear-gradient(135deg,#0EA5E9,#0284C7)", boxShadow: "0 4px 16px rgba(14,165,233,0.30)" }}
                aria-label="Call for a quote"
              >
                <Phone className="w-4 h-4" /> Call Now
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full border border-[#25D366]/30 hover:border-[#25D366]/70 bg-[#25D366]/5 hover:bg-[#25D366]/15 text-white font-display font-semibold text-sm py-3 rounded-xl transition-all"
                aria-label="WhatsApp for a quote"
              >
                <MessageCircle className="w-4 h-4 text-[#4ADE80]" /> WhatsApp Us
              </a>
            </div>

            <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex gap-0.5 mb-1.5">
                {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
              </div>
              <p className="font-display font-semibold text-sm text-white">Highly Rated in Winnipeg</p>
              <p className="font-body text-xs text-slate-400 mt-0.5">200+ satisfied customers</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-slate-500 text-center sm:text-left">
            © {year} RiseClear Property Services. All rights reserved. Winnipeg, Manitoba, Canada.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => scrollTo("#home")} className="font-body text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-sky-600 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Back to top">
              <span className="text-white text-xs leading-none">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
