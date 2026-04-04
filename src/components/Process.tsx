"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Sparkles, ThumbsUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Request Your Quote",
    desc: "Call us, WhatsApp, or fill in our online form. Tell us what you need and we'll get back to you fast with a transparent, no-surprise price.",
    highlight: "Free • No obligation • Same-day response",
    color: "bg-brand-blue-light text-brand-blue",
    numColor: "text-brand-blue-pale",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We Clean Professionally",
    desc: "Our trained team arrives on time, fully equipped. We work efficiently and carefully to the highest standard — zero mess left behind.",
    highlight: "Insured team • Premium equipment • Eco-friendly",
    color: "bg-amber-50 text-amber-500",
    numColor: "text-amber-100",
  },
  {
    number: "03",
    icon: ThumbsUp,
    title: "Enjoy the Results",
    desc: "Walk back to a property that looks brand new. Satisfaction is guaranteed — if anything isn't right, we fix it immediately.",
    highlight: "100% satisfaction • Results guaranteed",
    color: "bg-emerald-50 text-emerald-600",
    numColor: "text-emerald-100",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      className="relative section-pad"
      style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)" }}
      aria-label="Our 3-step cleaning process"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-label justify-center"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-[2.625rem] font-bold text-brand-ink tracking-tight mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Simple.{" "}
            <span className="gradient-text">Effortless.</span>{" "}
            Clean.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14 }}
            className="text-brand-body text-[1.0625rem] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Getting your property professionally cleaned is easier than you
            think — just three simple steps.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connector */}
          <div
            className="hidden lg:block absolute top-[52px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-0.5 bg-gradient-to-r from-brand-blue-pale via-brand-border to-brand-blue-pale"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 36 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.14 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl border border-brand-border shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-7 lg:p-8 h-full">
                    {/* Step number + icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" strokeWidth={1.8} />
                      </div>
                      <span
                        className="text-5xl font-black leading-none select-none opacity-60"
                        style={{ color: step.numColor.replace("text-", ""), fontFamily: "var(--font-plus-jakarta)" }}
                      >
                        {step.number}
                      </span>
                    </div>

                    <h3
                      className="font-bold text-[1.0625rem] text-brand-ink mb-3"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm text-brand-muted leading-relaxed mb-5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {step.desc}
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-light border border-brand-blue-pale">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                      <span className="text-xs font-semibold text-brand-blue">
                        {step.highlight}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="tel:+14318164106"
            className="btn-primary inline-flex text-base px-9 py-4"
            aria-label="Call to start the process"
          >
            Start with Step 1 — Call Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
