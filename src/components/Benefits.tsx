"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CheckCircle2, Star } from "lucide-react";

const benefits = [
  { title: "No Hidden Fees, Ever",       desc: "The price we quote is the price you pay — transparent and upfront, always." },
  { title: "Eco-Friendly Products",       desc: "Biodegradable, non-toxic solutions safe for your family, pets, and the environment." },
  { title: "Trained & Vetted Team",       desc: "Background-checked, insured professionals on every single job — no exceptions." },
  { title: "Flexible Scheduling",         desc: "Early mornings, evenings, weekends — we work around your life, not ours." },
  { title: "Photo Documentation",         desc: "Before & after photos so you see exactly the transformation we deliver." },
  { title: "Re-Clean Guarantee",          desc: "Not satisfied? We return within 24 hours at no additional cost, guaranteed." },
];

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: "-80px" });

  return (
    <section
      id="benefits"
      className="relative section-pad"
      style={{ background: "linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 100%)" }}
      aria-label="Why RiseClear is different"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left: Image */}
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, x: -32, scale: 0.97 }}
            animate={imgInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_72px_rgba(14,165,233,0.14),0_8px_24px_rgba(12,26,46,0.06)] border border-sky-200">
              <div className="relative aspect-[4/5] bg-sky-100">
                <Image
                  src="/images/about-team.jpg"
                  alt="RiseClear team member delivering professional cleaning service in Winnipeg"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                    const wrapper = t.parentElement;
                    if (wrapper) wrapper.classList.add("img-placeholder");
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating: guarantee */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -right-4 sm:-right-8 bg-white rounded-2xl shadow-float px-5 py-4 border border-sky-100"
              aria-hidden="true"
            >
              <p className="font-display font-black text-2xl gradient-text">100%</p>
              <p className="font-body text-sm font-medium text-brand-body mt-0.5">Satisfaction</p>
              <p className="font-body text-sm font-medium text-brand-body">Guaranteed</p>
            </motion.div>

            {/* Floating: rating */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -top-4 -left-4 sm:-left-6 rounded-2xl shadow-sky-lg px-4 py-3.5 border border-sky-500"
              style={{ background: "linear-gradient(135deg,#0369A1,#0EA5E9)" }}
              aria-hidden="true"
            >
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-300 text-amber-300" />)}
              </div>
              <p className="font-display font-bold text-white text-sm">5.0 Rating</p>
              <p className="font-body text-sky-200 text-xs">200+ Reviews</p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div ref={ref} className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="section-label mb-4"
            >
              Our Promise
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-brand-ink tracking-tight leading-[1.1] mb-5"
            >
              Quality You Can{" "}
              <span className="gradient-text">See & Feel</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.14 }}
              className="font-body text-brand-body text-[0.9375rem] leading-relaxed mb-8 max-w-lg"
            >
              We built RiseClear on one simple idea: do the job right, treat
              clients with respect, and never cut corners. Here&apos;s what makes
              us Winnipeg&apos;s most trusted cleaning company.
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
                  <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-sky-500 group-hover:scale-110 transition-all duration-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 group-hover:text-white transition-colors duration-200" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-[0.875rem] text-brand-ink mb-0.5">{b.title}</p>
                    <p className="font-body text-sm text-brand-muted leading-relaxed">{b.desc}</p>
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
              <a href="tel:+14318164106" className="btn-sky">
                Call for a Free Quote
              </a>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-sky-outline cursor-pointer"
                aria-label="Request a free quote online"
              >
                Request Online Quote
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
