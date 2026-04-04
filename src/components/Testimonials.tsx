"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "St. James, Winnipeg",
    service: "Window Cleaning",
    rating: 5,
    text: "Absolutely blown away by how clean my windows are. I could barely see out of them before — now it looks like the glass isn't even there. The team was professional, on time, and left zero mess. Worth every penny.",
    initials: "SM",
    avatarColor: "bg-blue-500",
  },
  {
    name: "David K.",
    location: "River Heights, Winnipeg",
    service: "Gutter Cleaning + Windows",
    rating: 5,
    text: "RiseClear has been taking care of my home for two seasons now. They cleared my gutters completely — no more flooding near the foundation — and the windows look amazing. Honest pricing and great communication.",
    initials: "DK",
    avatarColor: "bg-violet-500",
  },
  {
    name: "Aisha T.",
    location: "Fort Rouge, Winnipeg",
    service: "Move-Out Cleaning",
    rating: 5,
    text: "I was stressed about getting my deposit back after a 3-year tenancy. RiseClear transformed the place. My landlord said it was the cleanest move-out he'd seen in years. Full deposit returned. Beyond grateful!",
    initials: "AT",
    avatarColor: "bg-emerald-500",
  },
  {
    name: "Robert P.",
    location: "Transcona, Winnipeg",
    service: "Pressure Washing",
    rating: 5,
    text: "My driveway and deck looked 20 years old. After the pressure wash, they look brand new — neighbors kept asking if we renovated. Fast service, fair price, exceptional results.",
    initials: "RP",
    avatarColor: "bg-orange-500",
  },
  {
    name: "Linda C.",
    location: "Charleswood, Winnipeg",
    service: "Deep Cleaning",
    rating: 5,
    text: "Hired RiseClear for a deep clean after we renovated. Construction dust was everywhere and I didn't know where to start. They handled everything in one visit. Extremely thorough.",
    initials: "LC",
    avatarColor: "bg-rose-500",
  },
  {
    name: "James W.",
    location: "Downtown Winnipeg",
    service: "Commercial Windows",
    rating: 5,
    text: "We use RiseClear for our office building quarterly. Professional, reliable, and they always deliver. Our clients comment on how clean and bright our space looks. Highly recommend.",
    initials: "JW",
    avatarColor: "bg-teal-500",
  },
];

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="card bg-white p-6 sm:p-7 flex flex-col gap-4 h-full"
    >
      {/* Quote */}
      <div className="w-8 h-8 rounded-lg bg-brand-blue-light flex items-center justify-center">
        <Quote className="w-4 h-4 text-brand-blue" />
      </div>

      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Text */}
      <p
        className="text-[0.9375rem] text-brand-body leading-relaxed flex-1"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Service tag */}
      <span className="inline-flex self-start text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-blue-light text-brand-blue border border-brand-blue-pale">
        {t.service}
      </span>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
        <div className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white text-xs font-bold" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            {t.initials}
          </span>
        </div>
        <div>
          <p className="font-semibold text-sm text-brand-ink" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            {t.name}
          </p>
          <p className="text-xs text-brand-muted">{t.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      className="relative section-pad bg-brand-surface"
      aria-label="Customer testimonials"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-label justify-center"
          >
            Client Reviews
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-[2.625rem] font-bold text-brand-ink tracking-tight mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Winnipeg Loves{" "}
            <span className="gradient-text">RiseClear</span>
          </motion.h2>

          {/* Rating row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16 }}
            className="flex items-center justify-center gap-3 mt-3"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-xl text-brand-ink" style={{ fontFamily: "var(--font-plus-jakarta)" }}>5.0</span>
            <span className="text-brand-muted text-sm">(200+ reviews)</span>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-brand-muted text-sm mb-5" style={{ fontFamily: "var(--font-inter)" }}>
            Join 200+ satisfied clients across Winnipeg
          </p>
          <a
            href="tel:+14318164106"
            className="btn-primary inline-flex text-base px-9 py-4"
            aria-label="Book your cleaning service"
          >
            Book Your Service Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}
