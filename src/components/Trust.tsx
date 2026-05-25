"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Zap, Award, MapPin } from "lucide-react";

const POINTS = [
  { icon: ShieldCheck, title: "Fully Insured & Bonded",   desc: "Every team member is background-checked, insured and trained to professional standards. Total peace of mind.",         iconBg: "bg-sky-100",    iconColor: "text-sky-600",    border: "border-sky-200"    },
  { icon: Zap,         title: "Fast & Reliable",          desc: "Same-day and next-day appointments available. We show up on time and complete every job efficiently.",                  iconBg: "bg-amber-50",   iconColor: "text-amber-500",  border: "border-amber-200"  },
  { icon: Award,       title: "Satisfaction Guaranteed",  desc: "Not happy? We return within 24 hours to make it right at no extra cost. Your satisfaction is non-negotiable.",          iconBg: "bg-emerald-50", iconColor: "text-emerald-600",border: "border-emerald-200" },
  { icon: MapPin,      title: "Proudly Winnipeg-Based",   desc: "We know Manitoba's climate and what local homes and businesses need. Serving Winnipeg and surrounding areas.",          iconBg: "bg-violet-50",  iconColor: "text-violet-600", border: "border-violet-200"  },
];

export default function Trust() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="trust" className="relative section-pad" style={{ background: "linear-gradient(180deg,#F0F9FF 0%,#E0F2FE 100%)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-14" ref={ref}>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="section-label justify-center mb-4">Why Choose Us</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }}
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-brand-ink tracking-tight mb-4">
            The RiseClear <span className="gradient-text">Difference</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.14 }}
            className="font-body text-brand-body text-[1.0625rem] max-w-lg mx-auto">
            We don&apos;t just clean — we deliver an experience that makes your property shine and your life easier.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-14">
          {POINTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22,1,0.36,1] }}
                className={`card bg-white p-6 border ${p.border} hover:border-sky-300`}>
                <div className={`w-12 h-12 ${p.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${p.iconColor}`} strokeWidth={1.8} />
                </div>
                <h3 className="font-display font-semibold text-[0.9375rem] text-brand-ink mb-2.5">{p.title}</h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.48 }}
          className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#0369A1,#0EA5E9 60%,#38BDF8 100%)" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/15">
            {[{ v:"500+",l:"Cleans Completed"},{ v:"5.0 ★",l:"Average Rating"},{ v:"3+",l:"Years Serving Winnipeg"},{ v:"100%",l:"Satisfaction Rate"}].map(s=>(
              <div key={s.l} className="bg-transparent px-6 py-8 text-center">
                <p className="font-display font-black text-[2rem] sm:text-[2.25rem] text-white mb-1">{s.v}</p>
                <p className="font-body text-sky-200 text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
