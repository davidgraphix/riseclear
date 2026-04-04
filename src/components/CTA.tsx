"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Call to action — get a free quote"
    >
      {/* Blue background with subtle pattern */}
      <div className="absolute inset-0 bg-blue-gradient" />
      <div
        className="absolute inset-0 bg-grid-light bg-grid opacity-[0.07]"
        aria-hidden="true"
      />

      {/* Decorative blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-20 lg:py-28">
        <div ref={ref} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">
              Ready to Get Started?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Your Property Deserves
            <br />
            to Look Its Best.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            className="text-[1.0625rem] text-blue-100 leading-relaxed max-w-xl mx-auto mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Get in touch today for a free, no-obligation quote. Most services
            available same-day or next-day across{" "}
            <span className="text-white font-semibold">Winnipeg, Manitoba</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.26 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="tel:+14318164106"
              className="w-full sm:w-auto btn-outline-dark text-base px-8 py-4 bg-white text-brand-blue hover:bg-blue-50 border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              aria-label="Call RiseClear Property Services"
            >
              <Phone className="w-5 h-5" />
              Call +1 431 816 4106
            </a>

            <a
              href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-outline-dark text-base px-8 py-4"
              aria-label="WhatsApp RiseClear"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              WhatsApp Us
            </a>

            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-base font-semibold text-white/80 hover:text-white px-8 py-4 rounded-xl border border-white/20 hover:border-white/50 transition-all duration-200 cursor-pointer"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
              aria-label="Get a quote online"
            >
              Get a Quote Online
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-blue-200 text-xs mt-8"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ✓ Free quote &nbsp;·&nbsp; ✓ No obligation &nbsp;·&nbsp; ✓ Same-day available &nbsp;·&nbsp; ✓ Fully insured
          </motion.p>
        </div>
      </div>
    </section>
  );
}
