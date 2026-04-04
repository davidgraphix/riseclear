"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  { title: "No Hidden Fees, Ever", desc: "The price we quote is the price you pay — transparent and upfront." },
  { title: "Eco-Friendly Products", desc: "Safe for your family, pets, and the environment. Biodegradable solutions." },
  { title: "Trained & Vetted Team", desc: "Background-checked, insured professionals on every single job." },
  { title: "Flexible Scheduling", desc: "Early mornings, evenings, weekends — we work around your life." },
  { title: "Photo Documentation", desc: "Before & after photos so you see the transformation we deliver." },
  { title: "Re-Clean Guarantee", desc: "Not satisfied? We return within 24 hours at absolutely no extra cost." },
];

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: "-80px" });

  return (
    <section
      id="benefits"
      className="relative section-pad bg-white"
      aria-label="What makes RiseClear different"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: Image ── */}
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, x: -36, scale: 0.97 }}
            animate={imgInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_64px_rgba(37,99,235,0.10),0_8px_20px_rgba(15,23,42,0.06)]">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=85&auto=format&fit=crop"
                alt="Professional cleaner delivering high-quality results for a Winnipeg home"
                width={640}
                height={760}
                className="w-full object-cover aspect-[4/5]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/30 via-transparent to-transparent" />
            </div>

            {/* Floating badge: satisfaction */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -right-4 sm:-right-8 bg-white rounded-2xl shadow-card px-5 py-4 border border-brand-border"
              aria-hidden="true"
            >
              <p className="text-2xl font-black text-brand-blue" style={{ fontFamily: "var(--font-plus-jakarta)" }}>100%</p>
              <p className="text-sm font-medium text-brand-body mt-0.5">Satisfaction</p>
              <p className="text-sm font-medium text-brand-body">Guaranteed</p>
            </motion.div>

            {/* Floating badge: rating */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -top-4 -left-4 sm:-left-6 bg-brand-blue rounded-2xl shadow-blue px-4 py-3.5"
              aria-hidden="true"
            >
              <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>5.0 ★ Rating</p>
              <p className="text-blue-200 text-xs mt-0.5">200+ Reviews</p>
            </motion.div>
          </motion.div>

          {/* ── Right: Content ── */}
          <div ref={ref} className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="section-label"
            >
              Our Promise
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-brand-ink tracking-tight leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Quality You Can{" "}
              <span className="gradient-text">See & Feel</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.14 }}
              className="text-brand-body text-[0.9375rem] leading-relaxed mb-8 max-w-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              We built RiseClear on one simple idea: do the job right, treat
              clients with respect, and never cut corners. Here&apos;s what sets
              us apart from every other cleaning company in Winnipeg.
            </motion.p>

            <div className="space-y-4 mb-10">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-blue-light flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-blue group-hover:scale-110 transition-all duration-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue group-hover:text-white transition-colors duration-200" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-semibold text-[0.875rem] text-brand-ink mb-0.5"
                       style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                      {b.title}
                    </p>
                    <p className="text-sm text-brand-muted leading-relaxed"
                       style={{ fontFamily: "var(--font-inter)" }}>
                      {b.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="tel:+14318164106"
                className="btn-primary"
                aria-label="Call RiseClear"
              >
                Experience the Difference
              </a>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-secondary"
                aria-label="Get a free quote"
              >
                Get a Free Quote
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
