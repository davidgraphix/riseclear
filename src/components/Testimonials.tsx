"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "St. James, Winnipeg",
    service: "Window Cleaning",
    rating: 5,
    text: "Absolutely blown away by how clean my windows are. I could barely see out of them before — now it looks like they're not even there. The team was professional, on time, and left zero mess. Worth every penny.",
    initials: "SM",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "David K.",
    location: "River Heights, Winnipeg",
    service: "Gutter Cleaning + Window Cleaning",
    rating: 5,
    text: "RiseClear has been taking care of my home for two seasons now. They cleared my gutters completely — no more flooding near my foundation — and the windows look amazing. Honest pricing and great communication throughout.",
    initials: "DK",
    color: "from-purple-500 to-purple-700",
  },
  {
    name: "Aisha T.",
    location: "Fort Rouge, Winnipeg",
    service: "Move-Out Cleaning",
    rating: 5,
    text: "I was stressed about getting my deposit back after a 3-year tenancy. RiseClear came in and transformed the place. My landlord said it was the cleanest move-out he'd seen in years. Full deposit returned. Beyond grateful!",
    initials: "AT",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    name: "Robert P.",
    location: "Transcona, Winnipeg",
    service: "Pressure Washing",
    rating: 5,
    text: "My driveway and deck looked like they were 20 years old. After the pressure wash, they look brand new — neighbors kept asking if we renovated. Fast service, fair price, exceptional results. RiseClear is the only call I make.",
    initials: "RP",
    color: "from-orange-500 to-orange-700",
  },
  {
    name: "Linda C.",
    location: "Charleswood, Winnipeg",
    service: "Deep Cleaning",
    rating: 5,
    text: "Hired RiseClear for a deep clean after we renovated. Construction dust was everywhere and I didn't know where to start. They handled everything top-to-bottom in a single visit. Extremely thorough — I found zero dusty spots after they left.",
    initials: "LC",
    color: "from-rose-500 to-rose-700",
  },
  {
    name: "James W.",
    location: "Downtown Winnipeg",
    service: "Commercial Window Cleaning",
    rating: 5,
    text: "We use RiseClear for our office building quarterly. Professional, reliable, and they always deliver. Our clients comment on how clean and bright our space looks. Highly recommend them for any commercial property.",
    initials: "JW",
    color: "from-teal-500 to-teal-700",
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass border border-brand-border hover:border-brand-blue/20 rounded-2xl p-6 sm:p-7 flex flex-col gap-5 h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
    >
      {/* Quote icon */}
      <Quote className="w-7 h-7 text-brand-blue/40 flex-shrink-0" />

      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
        ))}
      </div>

      {/* Text */}
      <p className="font-body font-300 text-sm text-brand-light leading-relaxed flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Service tag */}
      <div className="inline-flex self-start">
        <span className="text-[10px] font-body font-500 uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-bright">
          {testimonial.service}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-brand-border">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white text-xs font-display font-700">{testimonial.initials}</span>
        </div>
        <div>
          <p className="font-body font-600 text-sm text-brand-white">{testimonial.name}</p>
          <p className="font-body text-xs text-brand-muted">{testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [visibleStart, setVisibleStart] = useState(0);

  const itemsPerPage = 3;
  const maxStart = testimonials.length - itemsPerPage;

  const prev = () => setVisibleStart((s) => Math.max(0, s - 1));
  const next = () => setVisibleStart((s) => Math.min(maxStart, s + 1));

  return (
    <section id="testimonials" className="relative section-pad overflow-hidden" aria-label="Customer testimonials">
      <div className="absolute inset-0 bg-brand-surface/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/[0.02] to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-border bg-brand-surface/60 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse-slow" />
            <span className="text-xs text-brand-muted uppercase tracking-widest font-body">
              Client Reviews
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-brand-white tracking-tight mb-4"
          >
            Winnipeg Loves{" "}
            <span className="gradient-text">RiseClear</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14 }}
            className="font-body font-300 text-brand-light text-base sm:text-lg max-w-xl mx-auto"
          >
            Don&apos;t take our word for it. Here&apos;s what our clients across
            Winnipeg have to say about their experience.
          </motion.p>

          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mt-6"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-brand-yellow text-brand-yellow" />
              ))}
            </div>
            <span className="font-display font-700 text-xl text-brand-white">5.0</span>
            <span className="text-brand-muted text-sm font-body">(200+ reviews)</span>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-brand-muted text-sm mb-6 font-body">
            Join 200+ happy clients across Winnipeg
          </p>
          <a
            href="tel:+14318164106"
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-bright text-white font-body font-600 text-base px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
            aria-label="Book your cleaning service today"
          >
            Book Your Service Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}
