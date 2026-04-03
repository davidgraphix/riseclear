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
    desc: "Call us, send a WhatsApp, or fill out our online form. Tell us what you need and we&apos;ll get back to you fast with a transparent, no-surprise price.",
    detail: "Free • No obligation • Same-day response",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We Clean Professionally",
    desc: "Our trained team arrives on time, fully equipped with professional tools. We clean efficiently, carefully, and to the highest standard — with zero mess left behind.",
    detail: "Insured team • Premium equipment • Eco-friendly",
  },
  {
    number: "03",
    icon: ThumbsUp,
    title: "Enjoy the Results",
    desc: "Walk back to a property that looks brand new. Your satisfaction is guaranteed — if anything isn't right, we'll fix it immediately, no questions asked.",
    detail: "100% satisfaction • Results guaranteed",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="relative section-pad overflow-hidden" aria-label="Our cleaning process">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-surface/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/[0.03] to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-border bg-brand-surface/60 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse-slow" />
            <span className="text-xs text-brand-muted uppercase tracking-widest font-body">
              How It Works
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-brand-white tracking-tight mb-4"
          >
            Simple.{" "}
            <span className="gradient-text">Effortless.</span> Clean.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14 }}
            className="font-body font-300 text-brand-light text-base sm:text-lg max-w-xl mx-auto"
          >
            Getting your property professionally cleaned is easier than you
            think. Here&apos;s how it works in three simple steps.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-[66%] h-px bg-gradient-to-r from-transparent via-brand-border to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: i * 0.15 + 0.2,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative group"
                >
                  {/* Connector dots on desktop */}
                  {i < steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-16 -right-4 w-8 h-px bg-brand-border z-10"
                      aria-hidden="true"
                    />
                  )}

                  <div className="glass border border-brand-border hover:border-brand-blue/30 rounded-2xl p-7 lg:p-8 h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                    {/* Step number + icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="relative">
                        <div className="w-14 h-14 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue/20 group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-6 h-6 text-brand-blue-bright" strokeWidth={1.6} />
                        </div>
                      </div>
                      <span className="font-display font-800 text-5xl text-brand-border leading-none select-none">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="font-display font-700 text-xl text-brand-white mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p
                      className="font-body font-300 text-sm text-brand-light leading-relaxed mb-5"
                      dangerouslySetInnerHTML={{ __html: step.desc }}
                    />

                    <div className="inline-flex items-center gap-2 glass-blue px-3.5 py-1.5 rounded-full">
                      <span className="w-1 h-1 rounded-full bg-brand-blue" />
                      <span className="text-xs font-body font-500 text-brand-blue-bright">
                        {step.detail}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-14"
        >
          <a
            href="tel:+14318164106"
            className="inline-flex items-center gap-3 bg-brand-blue hover:bg-brand-blue-bright text-white font-body font-600 text-base px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
            aria-label="Call to book a cleaning service"
          >
            Start with Step 1 — Call Us Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
