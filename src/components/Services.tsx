"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Lightbulb, ArrowRight, CheckCircle2, Wind, Home, Layers, Droplets, MoveHorizontal } from "lucide-react";

const CLEANING = [
  {
    id: "window",
    title: "Window Cleaning",
    shortDesc: "Streak-free, crystal-clear windows inside and out for homes and businesses across Winnipeg.",
    features: ["Residential & commercial", "Interior & exterior", "Track & screen add-ons", "Eco-friendly solutions"],
     img: "/images/window-cleaning.jpg", 
     imgAlt: "Professional window cleaning in Winnipeg", 
     tag: "Most Popular", icon: Layers, featured: true
  },
  {
    id: "gutter",
    title: "Gutter Cleaning",
    shortDesc: "Clear gutters and downspouts to prevent water damage and protect your foundation.",
    features: ["Debris removal", "Flush & flow test", "Downspout clearing", "Damage inspection"],
    img: "/images/gutter-cleaning.jpeg",
    imgAlt: "Gutter cleaning service",
    tag: null,
    icon: Droplets
  },
  {
    id: "home",
    title: "Home Cleaning",
    shortDesc: "Regular or one-time professional cleaning for every room, tailored to your schedule.",
    features: ["All rooms covered", "Flexible schedule", "Recurring plans", "Pet-friendly products"],
    img: "/images/home-cleaning.jpeg",
    imgAlt: "Professional home cleaning",
    tag: null,
    icon: Home,
    slug: "house-cleaning"
  },
  {
    id: "deep",
    title: "Deep Cleaning",
    shortDesc: "Intensive top-to-bottom cleaning reaching every corner, surface, and hard-to-reach area.",
    features: ["Appliance interiors", "Baseboards & vents", "Behind furniture", "Full sanitization"],
    img: "/images/deep-cleaning.jpeg",
    imgAlt: "Deep cleaning service",
    tag: null,
    icon: Sparkles
  },
  {
    id: "pressure",
    title: "Pressure Washing",
    shortDesc: "Restore driveways, decks, siding and patios to like-new condition with professional washing.",
    features: ["Driveways & walkways", "Decks & patios", "Siding & fences", "Oil stain removal"],
    img: "/images/pressure-washing.jpeg",
    imgAlt: "Pressure washing driveway",
    tag: null,
    icon: Wind
  },
  { id: "move", 
    title: "Move-In / Move-Out", 
    shortDesc: "Thorough cleaning meeting landlord and real estate standards for a smooth transition.", 
    features: ["Deposit-ready results", "All surfaces cleaned", "Appliances included", "Same-day available"], 
    img: "/images/move-cleaning.jpeg", imgAlt: "Move-out cleaning service", tag: "Popular", icon: MoveHorizontal },
];

const LED = { id: "led", title: "Permanent LED Light Installation", shortDesc: "Transform your home's curb appeal with professionally-installed permanent outdoor LED lighting — vivid, weatherproof, and built to last 10+ years.", features: ["App-controlled colours & brightness", "Holiday & seasonal programs", "Weatherproof — lasts 10+ years", "No ladder needed after install", "Energy-efficient technology", "Custom layout for any home"], img: "/images/led-installation.jpeg", imgAlt: "Permanent LED light installation on home", tag: "Premium Service", icon: Lightbulb, featured: true };

function Img({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <Image src={src} alt={alt} fill className={`object-cover ${className}`} sizes="(max-width:1024px) 100vw, 50vw"
      onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = "none"; const w = t.parentElement; if (w) w.classList.add("img-placeholder"); }} />
  );
}

function FeaturedCard({ s, onQuote, linkTo }: { s: typeof CLEANING[0]; onQuote: () => void; linkTo?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-sky-200 shadow-[0_8px_40px_rgba(14,165,233,0.12)] mb-5 bg-white">
      <div className="relative h-64 lg:h-auto lg:min-h-[360px]">
        <Img src={s.img} alt={s.imgAlt} />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 to-transparent" />
        {s.tag && <div className="absolute top-4 left-4"><span className="bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sky">{s.tag}</span></div>}
      </div>
      <div className="p-7 lg:p-10 flex flex-col justify-center">
        <h3 className="font-display text-2xl lg:text-[1.875rem] font-bold text-brand-ink mb-3 leading-tight">{s.title}</h3>
        <p className="font-body text-[0.9375rem] text-brand-body leading-relaxed mb-6">{s.shortDesc}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 mb-8">
          {s.features.map(f => (
            <li key={f} className="flex items-center gap-2 font-body text-sm text-brand-body">
              <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" strokeWidth={2} />{f}
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-3">
          {linkTo && <Link href="/services/window-cleaning" className="btn-sky self-start">View Details <ArrowRight className="w-4 h-4" /></Link>}
          <button onClick={onQuote} className={`${linkTo ? "btn-sky-outline" : "btn-sky"} self-start cursor-pointer`}>Get a Quote</button>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ s, index, onQuote }: { s: typeof CLEANING[0]; index: number; onQuote: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = s.icon;
  const hasSlug = "slug" in s && s.slug;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="card bg-white group overflow-hidden flex flex-col">
      <div className="relative h-44 overflow-hidden bg-sky-50">
        <Img src={s.img} alt={s.imgAlt} className="group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 via-transparent to-transparent" />
        {s.tag && <span className="absolute top-3 right-3 bg-white/95 text-sky-600 text-[9px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-soft">{s.tag}</span>}
        <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-sky-500/90 backdrop-blur-sm flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" strokeWidth={1.8} />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-[0.9375rem] text-brand-ink mb-2">{s.title}</h3>
        <p className="font-body text-sm text-brand-muted leading-relaxed mb-4 flex-1">{s.shortDesc}</p>
        {hasSlug ? (
          <Link
            href={`/services/${s.slug}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors font-body"
          >
            Book & Get Pricing <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <button onClick={onQuote} className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors group/btn cursor-pointer font-body">
            Get a Quote <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const goQuote = () => { window.location.href = "/quote"; };

  return (
    <section id="services" className="relative section-pad bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16" ref={ref}>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="section-label justify-center mb-4">Our Services</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }}
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-brand-ink tracking-tight mb-4">
            Everything Your Property <span className="gradient-text">Needs</span>
          </motion.h2>
        </div>

        {/* Cleaning */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 bg-sky-500 rounded-xl flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
            <div className="flex-1">
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-muted">Category 01</p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-ink">Cleaning Services</h3>
            </div>
            <div className="hidden sm:block flex-1 h-px bg-sky-200 ml-4" aria-hidden="true" />
          </div>
          <FeaturedCard s={CLEANING[0]} onQuote={goQuote} linkTo="/quote" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CLEANING.slice(1).map((s, i) => <ServiceCard key={s.id} s={s} index={i} onQuote={goQuote} />)}
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-4 mb-16"><div className="divider-sky" /><div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2"><span className="bg-white px-4 text-sky-300"><Lightbulb className="w-5 h-5" /></span></div></div>

        {/* LED */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 bg-amber-500 rounded-xl flex items-center justify-center"><Lightbulb className="w-5 h-5 text-white" /></div>
            <div className="flex-1">
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-muted">Category 02</p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-ink">LED Installation</h3>
            </div>
            <div className="hidden sm:block flex-1 h-px bg-sky-200 ml-4" aria-hidden="true" />
          </div>
          <FeaturedCard s={LED as typeof CLEANING[0]} onQuote={goQuote} />
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="mt-14 text-center">
          <p className="font-body text-brand-muted text-sm mb-5">Not sure what you need? Give us a call — we&apos;ll recommend the right service.</p>
          <a href="tel:+14318164106" className="btn-sky inline-flex">Call +1 431 816 4106</a>
        </motion.div>
      </div>
    </section>
  );
}
