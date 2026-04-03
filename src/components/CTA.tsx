"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative section-pad overflow-hidden" aria-label="Call to action">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-dark" />
      <div className="absolute inset-0 bg-hero-glow opacity-60" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />

      {/* Glowing orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-blue/15 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-xs text-brand-blue-bright uppercase tracking-widest font-body">
              Ready to Get Started?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-800 text-4xl sm:text-5xl lg:text-6xl text-brand-white tracking-tight leading-[1.05] mb-6"
          >
            Your Property Deserves
            <br />
            <span className="gradient-text">to Look Its Best.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            className="font-body font-300 text-brand-light text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          >
            Get in touch today for a free, no-obligation quote. Most services
            available same-day or next-day across{" "}
            <span className="text-brand-white font-400">Winnipeg, Manitoba</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.26 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="tel:+14318164106"
              className="group w-full sm:w-auto relative flex items-center justify-center gap-3 bg-brand-blue hover:bg-brand-blue-bright text-white font-body font-600 text-base px-10 py-5 rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 overflow-hidden"
              aria-label="Call RiseClear Property Services"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              <Phone className="w-5 h-5" />
              Call +1 431 816 4106
            </a>

            <a
              href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-brand-white font-body font-600 text-base px-10 py-5 rounded-xl border border-[#25D366]/30 hover:border-[#25D366]/60 transition-all duration-300 hover:-translate-y-0.5"
              aria-label="WhatsApp RiseClear Property Services"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              WhatsApp Us
            </a>

            <button
              onClick={scrollToContact}
              className="group w-full sm:w-auto flex items-center justify-center gap-2 text-brand-blue-bright hover:text-brand-white font-body font-500 text-base px-8 py-5 rounded-xl border border-brand-border hover:border-brand-blue/40 transition-all duration-300 hover:bg-white/5 cursor-pointer"
              aria-label="Get a quote online"
            >
              Get a Quote Online
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Trust micro-text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-brand-muted text-xs mt-7 font-body"
          >
            ✓ Free quote &nbsp;|&nbsp; ✓ No obligation &nbsp;|&nbsp; ✓ Same-day
            available &nbsp;|&nbsp; ✓ Fully insured
          </motion.p>
        </div>
      </div>
    </section>
  );
}
