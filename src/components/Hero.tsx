"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, ChevronDown, Star, Sparkles } from "lucide-react";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section — RiseClear Property Services"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-brand-dark" />
      <div className="absolute inset-0 bg-hero-glow" />
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-100"
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-brand-blue/20 blur-[80px] pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 left-10 w-64 h-64 rounded-full bg-brand-blue/15 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Background image overlay */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1527515637462-cff94ece8e7f?w=1800&q=80&auto=format&fit=crop"
          alt="Professional window cleaning services in Winnipeg"
          fill
          priority
          className="object-cover object-center opacity-[0.07] scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/30 to-brand-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="glass-blue flex items-center gap-2 px-4 py-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-brand-blue-bright" />
              <span className="text-xs font-body font-500 text-brand-blue-bright tracking-wide uppercase">
                Winnipeg&apos;s #1 Window Cleaning Specialists
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display font-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-white leading-[1.05] tracking-tight mb-6"
          >
            Crystal-Clear{" "}
            <span className="gradient-text">Windows.</span>
            <br />
            Every Single Time.
          </motion.h1>

          {/* Sub headline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="font-body font-300 text-lg sm:text-xl text-brand-light leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Professional window cleaning, gutter cleaning, pressure washing and
            more — serving homes and businesses across{" "}
            <span className="text-brand-white font-400">Winnipeg, Manitoba</span>.
            Streak-free results guaranteed.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
          >
            <a
              href="tel:+14318164106"
              className="group relative w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-blue hover:bg-brand-blue-bright text-white font-body font-600 text-base px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 overflow-hidden"
              aria-label="Call RiseClear Property Services"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              <Phone className="w-5 h-5" />
              Call Now — Free Quote
            </a>

            <button
              onClick={scrollToContact}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 glass hover:bg-white/10 text-brand-white font-body font-500 text-base px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 border border-white/10 hover:border-brand-blue/40 cursor-pointer"
              aria-label="Get a quote online"
            >
              Get a Free Quote Online
            </button>

            <a
              href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 text-brand-white/80 hover:text-brand-white font-body font-400 text-sm px-6 py-4 rounded-xl transition-all duration-200 hover:bg-[#25D366]/10 border border-transparent hover:border-[#25D366]/30"
              aria-label="WhatsApp RiseClear"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              WhatsApp Us
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
          >
            {/* Stars */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-brand-yellow text-brand-yellow"
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="text-brand-white text-sm font-body font-600">5.0 Rating</p>
                <p className="text-brand-muted text-xs">200+ Happy Clients</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-brand-border" aria-hidden="true" />

            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
                <span className="text-brand-blue text-xs font-display font-700">✓</span>
              </div>
              <span className="text-brand-light">Fully insured &amp; bonded</span>
            </div>

            <div className="hidden sm:block w-px h-10 bg-brand-border" aria-hidden="true" />

            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
                <span className="text-brand-blue text-xs font-display font-700">✓</span>
              </div>
              <span className="text-brand-light">Same-day service available</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] text-brand-muted uppercase tracking-widest font-body">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-brand-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
