"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Sparkles, ThumbsUp } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Request Your Quote",
    desc: "Call, WhatsApp, or fill our online form. We respond fast with a transparent, no-surprise price — free and with zero obligation.",
    note: "Free · No obligation · Same-day response",
    iconBg: "bg-sky-100 text-sky-600",
    numColor: "#BAE6FD",
    accent: "border-sky-200",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "We Clean Professionally",
    desc: "Our trained, insured team arrives on time — fully equipped with professional tools — and cleans to the highest standard.",
    note: "Insured team · Premium equipment · Eco-friendly",
    iconBg: "bg-amber-50 text-amber-500",
    numColor: "#FDE68A",
    accent: "border-amber-200",
  },
  {
    n: "03",
    icon: ThumbsUp,
    title: "Enjoy the Results",
    desc: "Walk back to a property that shines. If anything isn't perfect, we return within 24 hours to fix it — at no extra cost.",
    note: "100% satisfaction · Results guaranteed",
    iconBg: "bg-emerald-50 text-emerald-600",
    numColor: "#A7F3D0",
    accent: "border-emerald-200",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      className="relative section-pad bg-white"
      aria-label="Our 3-step cleaning process"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <div className="text-center mb-16" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-label justify-center mb-4"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-brand-ink tracking-tight mb-4"
          >
            Simple.{" "}
            <span className="gradient-text">Effortless.</span>{" "}
            Clean.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14 }}
            className="font-body text-brand-body text-[1.0625rem] max-w-xl mx-auto"
          >
            Three steps are all it takes to go from messy to spotless.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop line */}
          <div
            className="hidden lg:block absolute top-[52px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-px"
            style={{ background: "linear-gradient(90deg, #BAE6FD, #E0F2FE, #BAE6FD)" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.13 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`card border ${step.accent} p-7 lg:p-8 h-full group hover:border-sky-300`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 ${step.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" strokeWidth={1.8} />
                    </div>
                    <span
                      className="font-display font-black text-5xl leading-none select-none"
                      style={{ color: step.numColor }}
                    >
                      {step.n}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-[1.0625rem] text-brand-ink mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed mb-5">
                    {step.desc}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                    <span className="font-body text-xs font-semibold text-sky-700">{step.note}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <a href="tel:+14318164106" className="btn-sky inline-flex text-base px-10 py-4">
            Start with Step 1 — Call Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
