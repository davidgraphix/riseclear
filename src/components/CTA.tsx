"use client";
// CTA.tsx
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #0369A1 0%, #0EA5E9 55%, #38BDF8 100%)" }}
      aria-label="Call to action"
    >
      <div className="absolute inset-0 bg-grid-sky bg-grid opacity-[0.07] pointer-events-none" aria-hidden="true" />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-white/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 lg:py-28">
        <div ref={ref} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-body text-xs font-bold text-white uppercase tracking-widest">Ready to Get Started?</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-[3.125rem] font-bold text-white tracking-tight leading-[1.08] mb-6"
          >
            Your Property Deserves<br />to Look Its Best.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            className="font-body text-[1rem] text-sky-100 leading-relaxed max-w-xl mx-auto mb-10"
          >
            Get in touch for a free, no-obligation quote. Most services available same-day or next-day across{" "}
            <strong className="text-white font-semibold">Winnipeg, Manitoba</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.26 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a href="tel:+14318164106" className="btn-white w-full sm:w-auto px-8 py-4 text-[0.9375rem]" aria-label="Call RiseClear">
              <Phone className="w-5 h-5" /> Call +1 431 816 4106
            </a>
            <a
              href="https://www.instagram.com/riseclearpropertyservices/"
              target="_blank" rel="noopener noreferrer"
              className="btn-white-outline w-full sm:w-auto px-8 py-4 text-[0.9375rem]"
              aria-label="Follow RiseClear on Instagram"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @riseclearpropertyservices
            </a>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center justify-center gap-2 w-full sm:w-auto font-display font-semibold text-[0.9375rem] text-white/80 hover:text-white px-8 py-4 rounded-xl border border-white/20 hover:border-white/50 transition-all cursor-pointer"
              aria-label="Get a quote online"
            >
              Get a Quote Online <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-body text-sky-200 text-xs mt-8"
          >
            ✓ Free quote &nbsp;·&nbsp; ✓ No obligation &nbsp;·&nbsp; ✓ Same-day available &nbsp;·&nbsp; ✓ Fully insured
          </motion.p>
        </div>
      </div>
    </section>
  );
}
