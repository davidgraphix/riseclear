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
  "Window Cleaning",
  "Gutter Cleaning",
  "Home Cleaning",
  "Deep Cleaning",
  "Pressure Washing",
  "Move-In / Move-Out",
  "LED Light Installation",
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer
      className="relative bg-brand-darker border-t border-brand-border overflow-hidden"
      aria-label="Footer"
    >
      {/* Top gradient line */}
      <div className="divider" aria-hidden="true" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Main footer content */}
        <div className="py-14 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0, duration: 0.5 }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group mb-5 w-fit"
              aria-label="RiseClear Property Services"
            >
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-brand-blue rounded-lg rotate-12 opacity-60 group-hover:rotate-45 transition-transform duration-500" />
                <div className="absolute inset-0 bg-brand-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-display font-800 text-base leading-none select-none">
                    R
                  </span>
                </div>
              </div>
              <div>
                <span className="font-display font-700 text-[16px] tracking-tight text-brand-white block">
                  Rise<span className="text-brand-blue">Clear</span>
                </span>
                <span className="text-[9px] text-brand-muted uppercase tracking-[0.15em] block -mt-0.5">
                  Property Services
                </span>
              </div>
            </Link>

            <p className="font-body font-300 text-sm text-brand-light leading-relaxed mb-6 max-w-xs">
              Winnipeg&apos;s trusted property cleaning specialists. Premium
              window cleaning, gutter care, pressure washing and more.
            </p>

            {/* Contact quick links */}
            <div className="space-y-3">
              <a
                href="tel:+14318164106"
                className="flex items-center gap-2.5 text-sm font-body text-brand-light hover:text-brand-white transition-colors duration-200 group"
                aria-label="Call RiseClear"
              >
                <Phone className="w-4 h-4 text-brand-blue flex-shrink-0 group-hover:scale-110 transition-transform" />
                +1 431 816 4106
              </a>
              <a
                href="mailto:info@risecleaning.ca"
                className="flex items-center gap-2.5 text-sm font-body text-brand-light hover:text-brand-white transition-colors duration-200 group"
                aria-label="Email RiseClear"
              >
                <Mail className="w-4 h-4 text-brand-blue flex-shrink-0 group-hover:scale-110 transition-transform" />
                info@risecleaning.ca
              </a>
              <div className="flex items-center gap-2.5 text-sm font-body text-brand-light">
                <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" />
                Winnipeg, Manitoba, Canada
              </div>
              <a
                href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm font-body text-brand-light hover:text-[#25D366] transition-colors duration-200 group"
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
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="font-body font-600 text-xs uppercase tracking-widest text-brand-muted mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm font-body text-brand-light hover:text-brand-white transition-colors duration-200 cursor-pointer group flex items-center gap-1"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-brand-blue transition-all duration-200 overflow-hidden" />
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
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <h3 className="font-body font-600 text-xs uppercase tracking-widest text-brand-muted mb-5">
              Our Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="text-sm font-body text-brand-light hover:text-brand-white transition-colors duration-200 cursor-pointer group flex items-center gap-1"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-brand-blue transition-all duration-200 overflow-hidden" />
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="font-body font-600 text-xs uppercase tracking-widest text-brand-muted mb-5">
              Get a Free Quote
            </h3>
            <p className="font-body font-300 text-sm text-brand-light leading-relaxed mb-5">
              Ready for crystal-clear windows and a pristine property? Contact us
              today — no obligation, no hidden fees.
            </p>

            <div className="space-y-3">
              <a
                href="tel:+14318164106"
                className="group flex items-center justify-center gap-2.5 w-full bg-brand-blue hover:bg-brand-blue-bright text-white font-body font-600 text-sm py-3 rounded-xl transition-all duration-300 hover:shadow-glow-sm"
                aria-label="Call RiseClear for a quote"
              >
                <Phone className="w-4 h-4" />
                Call Now
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/25 hover:border-[#25D366]/50 text-brand-white font-body font-500 text-sm py-3 rounded-xl transition-all duration-300"
                aria-label="WhatsApp RiseClear for a quote"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp Us
              </a>
            </div>

            {/* Trust badge */}
            <div className="mt-6 glass border border-brand-border rounded-xl p-4">
              <div className="flex gap-1 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-brand-yellow text-sm">★</span>
                ))}
              </div>
              <p className="font-body font-500 text-sm text-brand-white">
                5.0 — Highly Rated in Winnipeg
              </p>
              <p className="font-body text-xs text-brand-muted mt-0.5">
                200+ satisfied customers
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="divider" aria-hidden="true" />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-body text-xs text-brand-muted text-center sm:text-left">
            © {year} RiseClear Property Services. All rights reserved.
            Winnipeg, Manitoba, Canada.
          </p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => scrollTo("#home")}
              className="font-body text-xs text-brand-muted hover:text-brand-white transition-colors duration-200 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => scrollTo("#home")}
              className="font-body text-xs text-brand-muted hover:text-brand-white transition-colors duration-200 cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-8 h-8 glass border border-brand-border rounded-lg flex items-center justify-center hover:border-brand-blue/40 transition-all duration-200 cursor-pointer"
              aria-label="Back to top"
            >
              <span className="text-brand-muted text-xs">↑</span>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
