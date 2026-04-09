"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const navLinks   = ["Services","How It Works","Why Choose Us","Testimonials","Contact"];
const navHrefs   = ["#services","#process","#benefits","#testimonials","#contact"];
const serviceLinks = [
  "Window Cleaning","Gutter Cleaning","Home Cleaning","Deep Cleaning",
  "Pressure Washing","Move-In / Move-Out","LED Light Installation",
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
                { href: "tel:+14318164106",          icon: Phone,   text: "+1 431 816 4106" },
                { href: "mailto:info@risecleaning.ca", icon: Mail,   text: "info@risecleaning.ca" },
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
                href="https://www.instagram.com/riseclearpropertyservices/"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-pink-400 transition-colors group font-body"
                aria-label="RiseClear on Instagram"
              >
                <svg className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: "#E1306C" }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                @riseclearpropertyservices
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
                href="https://www.instagram.com/riseclearpropertyservices/"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full text-white font-display font-semibold text-sm py-3 rounded-xl transition-all"
                style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", boxShadow: "0 4px 14px rgba(220,39,67,0.28)" }}
                aria-label="RiseClear on Instagram"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Follow on Instagram
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
