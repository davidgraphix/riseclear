"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Award, Heart } from "lucide-react";

const trustPoints = [
  {
    icon: Shield,
    title: "Fully Insured & Bonded",
    desc: "Complete peace of mind. All our team members are background-checked, insured and trained to the highest standard.",
    accent: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    desc: "We show up on time, every time. Same-day and next-day appointments available across Winnipeg and surrounding areas.",
    accent: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  {
    icon: Award,
    title: "Satisfaction Guaranteed",
    desc: "If you're not 100% happy with our work, we'll come back and fix it — no questions asked, no extra charge.",
    accent: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  {
    icon: Heart,
    title: "Local Winnipeg Team",
    desc: "Proudly local. We understand Manitoba winters and summers — and exactly what your property needs year-round.",
    accent: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
  },
];

function TrustCard({
  icon: Icon,
  title,
  desc,
  accent,
  bg,
  border,
  index,
}: (typeof trustPoints)[0] & { index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative glass p-6 lg:p-7 rounded-2xl border ${border} hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-card`}
    >
      <div className={`w-12 h-12 ${bg} ${border} border rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-5 h-5 ${accent}`} strokeWidth={1.8} />
      </div>
      <h3 className="font-display font-700 text-base text-brand-white mb-2.5 tracking-tight">
        {title}
      </h3>
      <p className="font-body font-300 text-sm text-brand-light leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

export default function Trust() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="trust" className="relative section-pad" aria-label="Why choose RiseClear">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-surface/30 to-brand-dark pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-border bg-brand-surface/60 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse-slow" />
            <span className="text-xs text-brand-muted uppercase tracking-widest font-body">
              Why Choose Us
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-brand-white tracking-tight mb-4"
          >
            The RiseClear{" "}
            <span className="gradient-text">Difference</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="font-body font-300 text-brand-light text-base sm:text-lg max-w-xl mx-auto"
          >
            We don&apos;t just clean — we deliver an experience that makes your
            property shine and your life easier.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {trustPoints.map((point, i) => (
            <TrustCard key={point.title} {...point} index={i} />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 glass border border-brand-border rounded-2xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-brand-border">
            {[
              { value: "200+", label: "Happy Clients" },
              { value: "5★", label: "Average Rating" },
              { value: "3+", label: "Years in Business" },
              { value: "100%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:px-8">
                <p className="font-display font-800 text-3xl sm:text-4xl gradient-text mb-1">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-brand-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
