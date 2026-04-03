"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  Droplets,
  Wind,
  Home,
  Sparkles,
  Zap,
  MoveHorizontal,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Home Cleaning",
    desc: "Regular and recurring home cleaning tailored to your schedule and specific needs.",
    tag: null,
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    desc: "Intensive top-to-bottom cleaning that reaches every corner, surface, and hidden spot.",
    tag: null,
  },
  {
    icon: Wind,
    title: "Pressure Washing",
    desc: "High-powered cleaning for driveways, decks, siding, and patios — like brand new.",
    tag: null,
  },
  {
    icon: MoveHorizontal,
    title: "Move-In / Move-Out",
    desc: "Thorough cleaning that meets landlord and real estate standards for seamless transitions.",
    tag: "Popular",
  },
  {
    icon: Droplets,
    title: "Gutter Cleaning",
    desc: "Clear debris, prevent blockages and water damage. Keep gutters flowing all year long.",
    tag: null,
  },
  {
    icon: Lightbulb,
    title: "Permanent LED Lights",
    desc: "Professional installation of permanent outdoor LED lighting — elevate your home's curb appeal.",
    tag: "New",
  },
];

function ServiceCard({
  icon: Icon,
  title,
  desc,
  tag,
  index,
}: (typeof services)[0] & { index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass border border-brand-border hover:border-brand-blue/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover cursor-default"
    >
      {tag && (
        <span className={`absolute top-4 right-4 text-[10px] font-body font-600 uppercase tracking-wider px-2.5 py-1 rounded-full ${
          tag === "New"
            ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/20"
            : "bg-brand-blue/15 text-brand-blue-bright border border-brand-blue/20"
        }`}>
          {tag}
        </span>
      )}
      <div className="w-11 h-11 bg-brand-blue/10 border border-brand-blue/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-blue/20 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-5 h-5 text-brand-blue-bright" strokeWidth={1.8} />
      </div>
      <h3 className="font-display font-700 text-[15px] text-brand-white mb-2 tracking-tight">
        {title}
      </h3>
      <p className="font-body font-300 text-sm text-brand-light leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: "-80px" });

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative section-pad" aria-label="Our cleaning services">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-border bg-brand-surface/60 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse-slow" />
            <span className="text-xs text-brand-muted uppercase tracking-widest font-body">
              What We Do
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-brand-white tracking-tight mb-4"
          >
            Complete Property{" "}
            <span className="gradient-text">Care Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14 }}
            className="font-body font-300 text-brand-light text-base sm:text-lg max-w-xl mx-auto"
          >
            From sparkling windows to glowing exteriors — we cover every corner
            of your home or business.
          </motion.p>
        </div>

        {/* FEATURED: Window Cleaning */}
        <motion.div
          ref={featuredRef}
          initial={{ opacity: 0, y: 40 }}
          animate={featuredInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden mb-6 border border-brand-blue/30 group"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop"
              alt="Professional window cleaning service in Winnipeg"
              fill
              className="object-cover object-center opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/70 to-brand-dark/30" />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-brand-blue/5 group-hover:bg-brand-blue/10 transition-colors duration-500" />

          <div className="relative p-8 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              {/* Featured badge */}
              <div className="inline-flex items-center gap-2 glass-blue px-4 py-1.5 rounded-full mb-6">
                <Zap className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
                <span className="text-xs font-body font-600 text-brand-yellow uppercase tracking-wider">
                  Our Signature Service
                </span>
              </div>

              <h3 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-brand-white tracking-tight mb-4 leading-tight">
                Window Cleaning
                <br />
                <span className="gradient-text">Done Right.</span>
              </h3>

              <p className="font-body font-300 text-brand-light text-base sm:text-lg leading-relaxed max-w-lg mb-6">
                Streak-free, crystal-clear windows for homes and commercial
                properties across Winnipeg. We use professional-grade equipment
                and eco-friendly solutions to make your windows look flawless —
                inside and out.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {[
                  "Residential & commercial",
                  "Interior & exterior",
                  "Streak-free guarantee",
                  "Eco-friendly products",
                  "All window types & sizes",
                  "High-rise capability",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-body font-400 text-brand-light"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className="group/btn inline-flex items-center gap-2.5 bg-brand-blue hover:bg-brand-blue-bright text-white font-body font-600 text-sm px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-glow cursor-pointer"
                aria-label="Book window cleaning service"
              >
                Book Window Cleaning
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Decorative stats */}
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-5 lg:min-w-[180px]">
              {[
                { num: "500+", label: "Windows cleaned" },
                { num: "100%", label: "Streak-free rate" },
                { num: "24h", label: "Turnaround time" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass border border-brand-blue/20 rounded-xl p-4 text-center flex-1 lg:flex-none"
                >
                  <p className="font-display font-800 text-xl sm:text-2xl gradient-text">
                    {s.num}
                  </p>
                  <p className="font-body text-xs text-brand-muted mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Other Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-brand-muted text-sm mb-4 font-body">
            Don&apos;t see what you need? Just ask — we do it all.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 text-brand-blue-bright hover:text-brand-white font-body font-500 text-sm transition-colors duration-200 group cursor-pointer"
            aria-label="Get a custom quote"
          >
            Get a Custom Quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
