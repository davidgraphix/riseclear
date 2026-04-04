"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, Lightbulb, ArrowRight, CheckCircle } from "lucide-react";

/* ── DATA ───────────────────────────────────────────────── */

interface Service {
  id: string;
  title: string;
  shortDesc: string;
  features: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
  tag?: string;
}

const cleaningServices: Service[] = [
  {
    id: "window-cleaning",
    title: "Window Cleaning",
    shortDesc: "Streak-free, crystal-clear windows — inside and out — for homes and businesses across Winnipeg.",
    features: ["Residential & commercial", "Interior & exterior", "High-reach capability", "Eco-friendly solutions"],
    image: "https://images.unsplash.com/photo-1527515637462-cff94ece8e7f?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Professional window cleaning technician cleaning windows on a building",
    featured: true,
    tag: "Most Popular",
  },
  {
    id: "gutter-cleaning",
    title: "Gutter Cleaning",
    shortDesc: "Clear gutters and downspouts of debris to prevent water damage and foundation issues.",
    features: ["Debris removal", "Flush & flow check", "Downspout clearing", "Damage inspection"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Gutter cleaning service removing leaves and debris from home gutters",
  },
  {
    id: "home-cleaning",
    title: "Home Cleaning",
    shortDesc: "Regular or one-time professional cleaning for every room in your home.",
    features: ["Full home coverage", "Flexible scheduling", "Recurring plans", "Pet-friendly products"],
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Professional cleaner cleaning a modern home interior",
  },
  {
    id: "deep-cleaning",
    title: "Deep Cleaning",
    shortDesc: "Intensive top-to-bottom cleaning reaching every corner, surface, and hard-to-reach area.",
    features: ["Appliance interiors", "Baseboards & vents", "Behind furniture", "Full sanitization"],
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Deep cleaning service with professional equipment and cleaning supplies",
  },
  {
    id: "pressure-washing",
    title: "Pressure Washing",
    shortDesc: "Restore driveways, decks, siding, and patios to like-new condition with high-pressure washing.",
    features: ["Driveways & walkways", "Decks & patios", "Siding & fences", "Oil stain removal"],
    image: "https://images.unsplash.com/photo-1558618047-f4e60cabb3d8?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Pressure washing service cleaning a residential driveway",
  },
  {
    id: "move-cleaning",
    title: "Move-In / Move-Out",
    shortDesc: "Thorough cleaning that meets landlord and real estate standards for a smooth transition.",
    features: ["Deposit-ready results", "All surfaces cleaned", "Appliances included", "Same-day available"],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Move-out cleaning service preparing a home for new tenants",
    tag: "Popular",
  },
];

const ledServices: Service[] = [
  {
    id: "led-installation",
    title: "Permanent LED Light Installation",
    shortDesc: "Professionally installed permanent outdoor LED lighting that transforms your home's exterior — all year round.",
    features: [
      "App-controlled colors & brightness",
      "Holiday & seasonal programs",
      "Weatherproof & durable (10+ year lifespan)",
      "No ladder required after install",
      "Energy-efficient LED technology",
      "Custom layouts for any home",
    ],
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Permanent LED light installation on a residential home exterior",
    featured: true,
    tag: "Premium Service",
  },
];

/* ── Sub-components ─────────────────────────────────────── */

function FeaturedCard({ service, onQuote }: { service: Service; onQuote: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-brand-border shadow-card mb-5 bg-white"
    >
      {/* Image */}
      <div className="relative h-64 lg:h-auto lg:min-h-[340px] order-first">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/10 to-transparent" />
        {service.tag && (
          <div className="absolute top-4 left-4">
            <span className="bg-brand-blue text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-blue">
              {service.tag}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-7 lg:p-10 flex flex-col justify-center">
        <h3
          className="text-2xl lg:text-3xl font-bold text-brand-ink mb-3 leading-tight"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          {service.title}
        </h3>
        <p
          className="text-brand-body text-[0.9375rem] leading-relaxed mb-6"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {service.shortDesc}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-8">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-brand-body">
              <CheckCircle className="w-4 h-4 text-brand-blue flex-shrink-0" strokeWidth={2} />
              {f}
            </li>
          ))}
        </ul>
        <button
          onClick={onQuote}
          className="btn-primary self-start"
          aria-label={`Book ${service.title}`}
        >
          Book This Service
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, index, onQuote }: { service: Service; index: number; onQuote: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="card bg-white group overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent" />
        {service.tag && (
          <div className="absolute top-3 right-3">
            <span className="bg-white/95 text-brand-blue text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-soft">
              {service.tag}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-semibold text-[1rem] text-brand-ink mb-2"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm text-brand-muted leading-relaxed mb-4 flex-1"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {service.shortDesc}
        </p>
        <button
          onClick={onQuote}
          className="flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 group/btn cursor-pointer"
          aria-label={`Learn more about ${service.title}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Get a Quote
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Category block ─────────────────────────────────────── */

function CategoryBlock({
  icon: Icon,
  label,
  title,
  subtitle,
  color,
  featured,
  rest,
  onQuote,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
  subtitle: string;
  color: string;
  featured: Service;
  rest: Service[];
  onQuote: () => void;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mb-20 last:mb-0">
      {/* Category header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay, duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-0.5"
             style={{ fontFamily: "var(--font-inter)" }}>
            {label}
          </p>
          <h3
            className="text-xl sm:text-2xl font-bold text-brand-ink leading-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {title}
          </h3>
        </div>
        <div className="flex-1 h-px bg-brand-border hidden sm:block ml-4" aria-hidden="true" />
      </motion.div>

      <p
        className="text-brand-body text-[0.9375rem] mb-7 max-w-xl"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {subtitle}
      </p>

      {/* Featured card */}
      <FeaturedCard service={featured} onQuote={onQuote} />

      {/* Grid cards (rest) */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} onQuote={onQuote} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────── */

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="services"
      className="relative section-pad bg-white"
      aria-label="RiseClear cleaning and LED installation services"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-label justify-center"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-[2.625rem] font-bold text-brand-ink tracking-tight mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Everything Your Property{" "}
            <span className="gradient-text">Needs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14 }}
            className="text-brand-body text-[1.0625rem] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            From sparkling clean windows to stunning permanent lighting — we
            handle every corner of your property with precision and care.
          </motion.p>
        </div>

        {/* ── CATEGORY 1: Cleaning Services ── */}
        <CategoryBlock
          icon={Sparkles}
          label="Category 1"
          title="Cleaning Services"
          subtitle="Professional cleaning solutions for residential and commercial properties across Winnipeg — done right, every time."
          color="bg-brand-blue"
          featured={cleaningServices[0]}
          rest={cleaningServices.slice(1)}
          onQuote={scrollToContact}
          delay={0.1}
        />

        {/* ── CATEGORY 2: LED Installation ── */}
        <div className="divider mb-16" aria-hidden="true" />

        <CategoryBlock
          icon={Lightbulb}
          label="Category 2"
          title="LED Installation"
          subtitle="Elevate your home's curb appeal with permanent, professionally-installed LED lighting that lasts for years."
          color="bg-amber-500"
          featured={ledServices[0]}
          rest={[]}
          onQuote={scrollToContact}
          delay={0.15}
        />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="text-brand-muted text-sm mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            Not sure what you need? Give us a call and we&apos;ll recommend the right service.
          </p>
          <a
            href="tel:+14318164106"
            className="btn-primary inline-flex"
            aria-label="Call to discuss your cleaning needs"
          >
            Call +1 431 816 4106
          </a>
        </motion.div>
      </div>
    </section>
  );
}
