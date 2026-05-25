"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Building2, AppWindow, HardHat, Lightbulb } from "lucide-react";
import { SERVICES, type ServiceItem } from "@/lib/services";

// ── Local image with graceful fallback ────────────────────────────────────────
function ServiceImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <Image
      src={src} alt={alt} fill
      className={`object-cover ${className}`}
      sizes="(max-width:1024px) 100vw, 50vw"
      onError={(e) => {
        const t = e.target as HTMLImageElement;
        t.style.display = "none";
        const w = t.parentElement;
        if (w) w.classList.add("img-placeholder");
      }}
    />
  );
}

// ── Category icon map ─────────────────────────────────────────────────────────
const CAT_ICON: Record<string, React.ReactNode> = {
  residential:       <Sparkles    className="w-5 h-5 text-white" strokeWidth={2} />,
  commercial:        <Building2   className="w-5 h-5 text-white" strokeWidth={2} />,
  window:            <AppWindow   className="w-5 h-5 text-white" strokeWidth={2} />,
  "permanent-led-light":            <Lightbulb   className="w-5 h-5 text-white" strokeWidth={2} />,

  "post-construction":<HardHat   className="w-5 h-5 text-white" strokeWidth={2} />,
};

const CAT_COLOR: Record<string, string> = {
  residential:       "bg-sky-500",
  commercial:        "bg-violet-500",
  window:            "bg-sky-400",
  "permanent-led-light": "bg-emerald-500",
  "post-construction":"bg-amber-500",

};

// ── Featured card (large, 2-col) ──────────────────────────────────────────────
function FeaturedCard({ service }: { service: ServiceItem }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
      className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-sky-200 shadow-[0_8px_40px_rgba(14,165,233,0.12)] bg-white"
    >
      {/* Image */}
      <div className="relative h-64 lg:h-auto lg:min-h-[380px]">
        <div className="absolute inset-0">
          <ServiceImage src={service.img} alt={service.imgAlt} />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 to-transparent" />
        </div>
        {service.tag && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sky">
              {service.tag}
            </span>
          </div>
        )}
        <div className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-xl ${CAT_COLOR[service.category]} flex items-center justify-center`}>
          {CAT_ICON[service.category]}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 lg:p-10 flex flex-col justify-center">
        <h3 className="font-display text-2xl lg:text-[1.875rem] font-bold text-brand-ink mb-3 leading-tight">
          {service.title}
        </h3>
        <p className="font-body text-[0.9375rem] text-brand-body leading-relaxed mb-6">
          {service.shortDesc}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 mb-8">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 font-body text-sm text-brand-body">
              <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" strokeWidth={2} />
              {f}
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-3">
          {service.slug ? (
            <Link href={`/services/${service.slug}`} className="btn-sky self-start">
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-sky self-start cursor-pointer"
            >
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Standard grid card ────────────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22,1,0.36,1] }}
      className="card bg-white group overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-sky-50">
        <div className="absolute inset-0">
          <ServiceImage src={service.img} alt={service.imgAlt} className="group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 via-transparent to-transparent" />
        </div>
        {service.tag && (
          <span className="absolute top-3 right-3 bg-white/95 text-sky-600 text-[9px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-soft z-10">
            {service.tag}
          </span>
        )}
        <div className={`absolute bottom-3 left-3 z-10 w-8 h-8 rounded-lg ${CAT_COLOR[service.category]} flex items-center justify-center`}>
          {CAT_ICON[service.category]}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-[0.9375rem] text-brand-ink mb-2 leading-snug">
          {service.title}
        </h3>
        <p className="font-body text-sm text-brand-muted leading-relaxed mb-4 flex-1">
          {service.shortDesc}
        </p>
        {service.slug ? (
          <Link
            href={`/services/${service.slug}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors font-body"
          >
            Book & Enquire <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors font-body cursor-pointer"
          >
            Get a Quote <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ── Sub-service tags (inside Residential card) ────────────────────────────────
const RESIDENTIAL_SUBS = ["Standard Cleaning", "Deep Cleaning", "Move-In / Move-Out"];

// ── Main export ───────────────────────────────────────────────────────────────
export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Split: residential featured, rest in grid
  const featured = SERVICES.find((s) => s.category === "residential")!;
  const grid     = SERVICES.filter((s) => s.category !== "residential");

  return (
    <section id="services" className="relative section-pad bg-white" aria-label="RiseClear cleaning services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Section header */}
        <div className="text-center mb-16" ref={ref}>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="section-label justify-center mb-4">
            Our Services
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }}
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-brand-ink tracking-tight mb-4">
            Everything Your Property{" "}
            <span className="gradient-text">Needs</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.14 }}
            className="font-body text-brand-body text-[1.0625rem] max-w-xl mx-auto">
            Residential, commercial, windows, and post-construction — handled with precision, care, and a satisfaction guarantee.
          </motion.p>
        </div>

        {/* Featured: Residential Cleaning */}
        <div className="mb-5">
          {/* Sub-service tag strip */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-4">
            {RESIDENTIAL_SUBS.map((sub) => (
              <span key={sub} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-700 text-xs font-body font-semibold">
                <CheckCircle2 className="w-3 h-3 text-sky-500" />
                {sub}
              </span>
            ))}
          </motion.div>
          <FeaturedCard service={featured} />
        </div>

        {/* Divider */}
        <div className="relative my-8 mb-12" aria-hidden="true">
          <div className="divider-sky" />
          <div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2">
            <span className="bg-white px-4 text-sky-300 text-sm font-body font-medium">Also Available</span>
          </div>
        </div>

        {/* Grid: remaining services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {grid.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          className="mt-14 text-center">
          <p className="font-body text-brand-muted text-sm mb-5">
            Not sure what you need? Call us and we&apos;ll recommend the right service.
          </p>
          <a href="tel:+14318164106" className="btn-sky inline-flex">
            Call +1 431 816 4106
          </a>
        </motion.div>
      </div>
    </section>
  );
}
