"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles, Lightbulb, ArrowRight, CheckCircle2,
  Wind, Home, Layers, Droplets, MoveHorizontal,
} from "lucide-react";

/* ── Types ────────────────────────────────────────────── */
interface Service {
  id: string;
  title: string;
  slug?: string;             // if set, card links to /services/[slug]
  shortDesc: string;
  features: string[];
  img: string;
  imgAlt: string;
  tag?: string;
  icon: React.ElementType;
}

/* ── Cleaning services data ───────────────────────────── */
const cleaning: Service[] = [
  {
    id: "window-cleaning",
    slug: "window-cleaning",
    title: "Window Cleaning",
    shortDesc: "Streak-free, crystal-clear windows for homes and businesses across Winnipeg — inside and out.",
    features: [
      "Residential & commercial",
      "Interior & exterior options",
      "High-reach capability",
      "Track & screen add-ons",
      "Eco-friendly solutions",
      "100% streak-free guarantee",
    ],
    img: "/images/window-cleaning.jpg",
    imgAlt: "Professional window cleaning technician on a Winnipeg home",
    tag: "Most Popular",
    icon: Layers,
  },
  {
    id: "gutter-cleaning",
    title: "Gutter Cleaning",
    shortDesc: "Clear gutters and downspouts of debris to prevent water damage and protect your foundation.",
    features: ["Full debris removal", "Flush & flow test", "Downspout clearing", "Damage inspection"],
    img: "/images/gutter-cleaning.jpeg",
    imgAlt: "Gutter cleaning service",
    icon: Droplets,
  },
  {
    id: "home-cleaning",
    title: "Home Cleaning",
    shortDesc: "Regular or one-time professional cleaning for every room — tailored to your schedule and needs.",
    features: ["All rooms covered", "Flexible schedule", "Recurring plans", "Pet-friendly products"],
    img: "/images/home-cleaning.jpeg",
    imgAlt: "Professional home cleaning service in Winnipeg",
    icon: Home,
  },
  {
    id: "deep-cleaning",
    title: "Deep Cleaning",
    shortDesc: "Intensive top-to-bottom cleaning reaching every corner, surface, and hard-to-reach area.",
    features: ["Appliance interiors", "Baseboards & vents", "Behind furniture", "Full sanitization"],
    img: "/images/deep-cleaning.jpeg",
    imgAlt: "Deep cleaning service with professional equipment",
    icon: Sparkles,
  },
  {
    id: "pressure-washing",
    title: "Pressure Washing",
    shortDesc: "Restore driveways, decks, siding and patios to like-new condition with professional pressure washing.",
    features: ["Driveways & walkways", "Decks & patios", "Siding & fences", "Oil stain removal"],
    img: "/images/pressure-washing.jpeg",
    imgAlt: "Pressure washing a residential driveway in Winnipeg",
    icon: Wind,
  },
  {
    id: "move-cleaning",
    title: "Move-In / Move-Out",
    shortDesc: "Thorough cleaning that meets landlord and real estate standards for a smooth, stress-free transition.",
    features: ["Deposit-ready results", "All surfaces cleaned", "Appliances included", "Same-day available"],
    img: "/images/move-cleaning.jpeg",
    imgAlt: "Move-out cleaning service for Winnipeg properties",
    tag: "Popular",
    icon: MoveHorizontal,
  },
];

/* ── LED data ─────────────────────────────────────────── */
const led: Service = {
  id: "led-installation",
  title: "Permanent LED Light Installation",
  shortDesc:
    "Transform your home's curb appeal with professionally-installed permanent outdoor LED lighting — vivid, weatherproof, and built to last 10+ years.",
  features: [
    "App-controlled colours & brightness",
    "Holiday & seasonal programs",
    "Weatherproof — lasts 10+ years",
    "No ladder needed after install",
    "Energy-efficient technology",
    "Custom layout for any home size",
  ],
  img: "/images/led-installation.jpeg",
  imgAlt: "Permanent LED light installation on a Winnipeg home exterior",
  tag: "Premium Service",
  icon: Lightbulb,
};

/* ── Local image with fallback ─────────────────────────── */
function ServiceImage({ src, alt, fill = true, className = "" }: {
  src: string; alt: string; fill?: boolean; className?: string;
}) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (!target.src.includes("/images/fallback.jpg")) {
            target.src = "/images/fallback.jpg";
          }
        }}
      />
    </div>
  );
}

/* ── Featured hero card (window cleaning + LED) ──────── */
function FeaturedCard({ service, onQuote, linkTo }: {
  service: Service;
  onQuote: () => void;
  linkTo?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-sky-200 shadow-[0_8px_40px_rgba(14,165,233,0.12)] mb-5 bg-white"
    >
      {/* Image column */}
      <div className="relative h-64 lg:h-auto lg:min-h-[380px]">
        <ServiceImage src={service.img} alt={service.imgAlt} />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 to-transparent" />
        {service.tag && (
          <div className="absolute top-4 left-4">
            <span className="bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sky">
              {service.tag}
            </span>
          </div>
        )}
      </div>

      {/* Content column */}
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
          {linkTo ? (
            <Link href={linkTo} className="btn-sky self-start">
              View Service Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : null}
          <Link href="/quote" className={`${linkTo ? "btn-sky-outline" : "btn-sky"} self-start cursor-pointer`}>Get a Quote</Link>

        </div>
      </div>
    </motion.div>
  );
}

/* ── Small grid card ──────────────────────────────────── */
function ServiceCard({ service, index, onQuote }: {
  service: Service; index: number; onQuote: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="card bg-white group overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-sky-50">
        <ServiceImage src={service.img} alt={service.imgAlt} className="group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 via-transparent to-transparent" />
        {service.tag && (
          <span className="absolute top-3 right-3 bg-white/95 text-sky-600 text-[9px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-soft">
            {service.tag}
          </span>
        )}
        <div className="absolute bottom-3 left-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/90 backdrop-blur-sm flex items-center justify-center">
            <Icon className="w-4 h-4 text-white" strokeWidth={1.8} />
          </div>
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
        <Link
          href="/quote"
          className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors group/btn cursor-pointer font-body"
          aria-label={`Get a quote for ${service.title}`}
        >
          Get a Quote
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Category heading ─────────────────────────────────── */
function CategoryHeading({
  icon: Icon,
  num,
  title,
  subtitle,
  iconBg,
  inView,
}: {
  icon: React.ElementType;
  num: string;
  title: string;
  subtitle: string;
  iconBg: string;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="mb-8"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-0.5">{num}</p>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-ink">{title}</h3>
        </div>
        <div className="hidden sm:block flex-1 h-px bg-sky-200 ml-4" aria-hidden="true" />
      </div>
      <p className="font-body text-brand-body text-[0.9375rem] leading-relaxed max-w-lg">{subtitle}</p>
    </motion.div>
  );
}

/* ── Main export ──────────────────────────────────────── */
export default function Services() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const cleanRef = useRef(null);
  const cleanInView = useInView(cleanRef, { once: true, margin: "-60px" });
  const ledRef = useRef(null);
  const ledInView = useInView(ledRef, { once: true, margin: "-60px" });

  const goContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="services"
      className="relative section-pad bg-white"
      aria-label="RiseClear cleaning and LED installation services"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ── Section header ── */}
        <div className="text-center mb-16" ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="section-label justify-center mb-4"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-brand-ink tracking-tight mb-4"
          >
            Everything Your Property{" "}
            <span className="gradient-text">Needs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14 }}
            className="font-body text-brand-body text-[1.0625rem] max-w-xl mx-auto"
          >
            From sparkling windows to stunning permanent lighting — handled
            with precision and care.
          </motion.p>
        </div>

        {/* ══ CATEGORY 1: CLEANING SERVICES ══ */}
        <div ref={cleanRef} className="mb-20">
          <CategoryHeading
            icon={Sparkles}
            num="Category 01"
            title="Cleaning Services"
            subtitle="Professional cleaning for residential and commercial properties across Winnipeg — done right, every time."
            iconBg="bg-sky-500"
            inView={cleanInView}
          />

          {/* Window cleaning — featured with detail page link */}
          <FeaturedCard
            service={cleaning[0]}
            onQuote={goContact}
            linkTo="/services/window-cleaning"
          />

          {/* Rest of cleaning services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cleaning.slice(1).map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} onQuote={goContact} />
            ))}
          </div>
        </div>

        {/* ── Separator ── */}
        <div className="relative my-4 mb-16" aria-hidden="true">
          <div className="divider-sky" />
          <div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2">
            <span className="bg-white px-4 text-sky-300">
              <Lightbulb className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* ══ CATEGORY 2: LED INSTALLATION ══ */}
        <div ref={ledRef}>
          <CategoryHeading
            icon={Lightbulb}
            num="Category 02"
            title="LED Installation"
            subtitle="Elevate your home's curb appeal with permanent, app-controlled LED lighting that lasts for years."
            iconBg="bg-amber-500"
            inView={ledInView}
          />

          <FeaturedCard service={led} onQuote={goContact} />
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="font-body text-brand-muted text-sm mb-5">
            Not sure what you need? Give us a call — we&apos;ll recommend the right service.
          </p>
          <a href="tel:+14318164106" className="btn-sky inline-flex" aria-label="Call RiseClear">
            Call +1 431 816 4106
          </a>
        </motion.div>
      </div>
    </section>
  );
}
