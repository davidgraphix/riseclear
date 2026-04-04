"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Zap, Award, MapPin } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Fully Insured & Bonded",
    desc: "Every team member is background-checked, insured, and trained to professional standards. Total peace of mind on every job.",
    color: "bg-blue-50 text-brand-blue border-blue-100",
    iconBg: "bg-brand-blue-light",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    desc: "Same-day and next-day appointments available. We show up on time and complete every job efficiently without cutting corners.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    iconBg: "bg-amber-50",
  },
  {
    icon: Award,
    title: "Results Guaranteed",
    desc: "Not 100% satisfied? We return within 24 hours to make it right — no questions, no extra charge. That's our promise.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    iconBg: "bg-emerald-50",
  },
  {
    icon: MapPin,
    title: "Proudly Winnipeg-Based",
    desc: "We know Manitoba's climate and what local homes need year-round. Serving Winnipeg and surrounding areas since day one.",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    iconBg: "bg-purple-50",
  },
];

const stats = [
  { value: "200+", label: "Happy Clients" },
  { value: "5.0★", label: "Average Rating" },
  { value: "3+", label: "Years in Business" },
  { value: "100%", label: "Satisfaction Rate" },
];

export default function Trust() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="trust"
      className="relative section-pad bg-brand-surface"
      aria-label="Why choose RiseClear"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-label justify-center"
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-[2.625rem] font-bold text-brand-ink tracking-tight mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            The RiseClear{" "}
            <span className="gradient-text">Difference</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14 }}
            className="text-brand-body text-[1.0625rem] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            We don&apos;t just clean — we deliver an experience that makes your
            property shine and your life easier.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="card p-6 bg-white"
              >
                <div className={`w-12 h-12 ${p.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                  <Icon className={`w-5.5 h-5.5 w-6 h-6 ${p.color.split(" ")[1]}`} strokeWidth={1.8} />
                </div>
                <h3
                  className="font-semibold text-[0.9375rem] text-brand-ink mb-2"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm text-brand-muted leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-brand-blue rounded-2xl px-6 py-8 sm:py-10 shadow-blue"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-blue-400/30">
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:px-8">
                <p
                  className="text-3xl sm:text-4xl font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {s.value}
                </p>
                <p className="text-sm text-blue-200" style={{ fontFamily: "var(--font-inter)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
