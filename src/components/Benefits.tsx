"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  {
    title: "No Hidden Fees, Ever",
    desc: "The price we quote is the price you pay. Transparent, upfront pricing with no surprise charges.",
  },
  {
    title: "Eco-Friendly Products",
    desc: "Safe for your family, pets, and the environment. We use biodegradable, non-toxic cleaning solutions.",
  },
  {
    title: "Trained & Vetted Professionals",
    desc: "Every team member is background-checked, trained, and covered by our liability insurance.",
  },
  {
    title: "Flexible Scheduling",
    desc: "Early mornings, evenings, or weekends — we work around your schedule, not the other way around.",
  },
  {
    title: "Photo Documentation",
    desc: "We take before and after photos so you can see exactly the transformation we deliver.",
  },
  {
    title: "Re-clean Guarantee",
    desc: "Not satisfied? We'll come back within 24 hours and re-clean at no additional cost.",
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: "-80px" });

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="benefits" className="relative section-pad overflow-hidden" aria-label="Benefits of choosing RiseClear">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-surface/20 to-brand-dark pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Content */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-border bg-brand-surface/60 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse-slow" />
              <span className="text-xs text-brand-muted uppercase tracking-widest font-body">
                Our Promise
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-brand-white tracking-tight mb-5 leading-[1.1]"
            >
              Quality You Can
              <br />
              <span className="gradient-text">See & Feel</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.14 }}
              className="font-body font-300 text-brand-light text-base leading-relaxed mb-8 max-w-lg"
            >
              We built RiseClear on one simple idea: do the job right, treat
              clients with respect, and never cut corners. Here&apos;s what sets
              us apart from every other cleaning company in Winnipeg.
            </motion.p>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                  className="flex items-start gap-4 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <p className="font-body font-600 text-[14px] text-brand-white mb-0.5">
                      {benefit.title}
                    </p>
                    <p className="font-body font-300 text-sm text-brand-light leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="tel:+14318164106"
                className="flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-bright text-white font-body font-600 text-sm px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-glow"
                aria-label="Call to experience the RiseClear difference"
              >
                Experience the Difference
              </a>
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center gap-2 glass border border-brand-border hover:border-brand-blue/30 text-brand-white font-body font-500 text-sm px-7 py-3.5 rounded-xl transition-all duration-300 cursor-pointer"
                aria-label="Request a quote"
              >
                Get a Free Quote
              </button>
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={imgInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&auto=format&fit=crop"
                alt="Professional cleaner providing premium window cleaning service"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 sm:-left-8 glass-blue border border-brand-blue/30 rounded-2xl p-4 shadow-card"
            >
              <p className="font-display font-800 text-2xl gradient-text">100%</p>
              <p className="font-body text-xs text-brand-light mt-0.5">Satisfaction</p>
              <p className="font-body text-xs text-brand-light">Guaranteed</p>
            </motion.div>

            {/* Floating badge 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -right-4 sm:-right-6 glass border border-brand-border rounded-2xl p-4 shadow-card"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-yellow/20 rounded-lg flex items-center justify-center">
                  <span className="text-brand-yellow text-sm">★</span>
                </div>
                <div>
                  <p className="font-display font-700 text-sm text-brand-white">5.0 Stars</p>
                  <p className="font-body text-[10px] text-brand-muted">200+ Reviews</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
