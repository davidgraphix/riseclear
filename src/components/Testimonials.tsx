"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const T = [
  { name:"Sarah M.",  loc:"St. James, Winnipeg",     svc:"Residential Cleaning",  r:5, text:"RiseClear transformed our home. Every room was spotless — I had forgotten what the baseboards looked like clean. Professional, on time, zero mess left behind.",                              i:"SM", c:"from-sky-500 to-sky-700"     },
  { name:"David K.",  loc:"River Heights, Winnipeg", svc:"Commercial Cleaning",   r:5, text:"We use RiseClear for our office weekly. The team is reliable, consistent, and our clients always comment on how clean and professional the space looks. Couldn't recommend more.",            i:"DK", c:"from-violet-500 to-violet-700" },
  { name:"Aisha T.",  loc:"Fort Rouge, Winnipeg",    svc:"Move-Out Cleaning",     r:5, text:"Stressed about my deposit after a 3-year tenancy. RiseClear transformed the place. My landlord said it was the cleanest move-out he'd ever seen. Full deposit returned!",                    i:"AT", c:"from-emerald-500 to-emerald-700"},
  { name:"Robert P.", loc:"Transcona, Winnipeg",     svc:"Window Cleaning",       r:5, text:"Crystal clear windows — inside and out. I could not believe the difference. The team was fast, careful and left zero streaks. I've already booked them for next season.",                     i:"RP", c:"from-orange-500 to-orange-700"  },
  { name:"Linda C.",  loc:"Charleswood, Winnipeg",   svc:"Deep Cleaning",         r:5, text:"Hired RiseClear for a deep clean after our renovation. Construction dust was everywhere. They handled everything in one visit — top to bottom. I found zero dusty spots after.",               i:"LC", c:"from-rose-500 to-rose-700"     },
  { name:"James W.",  loc:"Downtown Winnipeg",       svc:"Post-Construction",     r:5, text:"Hired after a full office reno. The post-construction clean was incredible — paint splatter, dust, adhesive residue all gone. Move-in ready the same day. Exceptional service.",               i:"JW", c:"from-teal-500 to-teal-700"     },
];

function Card({ t, index }: { t:typeof T[0]; index:number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity:0,y:24 }} animate={inView ? { opacity:1,y:0 } : {}}
      transition={{ delay:index*0.09, duration:0.55, ease:[0.22,1,0.36,1] }}
      className="card bg-white p-6 sm:p-7 flex flex-col gap-4 h-full hover:border-sky-300">
      <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center"><Quote className="w-5 h-5 text-sky-500" /></div>
      <div className="flex gap-0.5">{[...Array(t.r)].map((_,i)=><Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
      <p className="font-body text-[0.9375rem] text-brand-body leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
      <span className="self-start text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-200">{t.svc}</span>
      <div className="flex items-center gap-3 pt-4 border-t border-sky-100">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.c} flex items-center justify-center flex-shrink-0`}>
          <span className="font-display font-bold text-white text-xs">{t.i}</span>
        </div>
        <div>
          <p className="font-display font-semibold text-sm text-brand-ink">{t.name}</p>
          <p className="font-body text-xs text-brand-muted">{t.loc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  return (
    <section id="testimonials" className="relative section-pad bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-14" ref={ref}>
          <motion.p initial={{ opacity:0,y:14 }} animate={inView ? { opacity:1,y:0 } : {}} className="section-label justify-center mb-4">Client Reviews</motion.p>
          <motion.h2 initial={{ opacity:0,y:18 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ delay:0.08 }}
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-brand-ink tracking-tight mb-4">
            Winnipeg Loves <span className="gradient-text">RiseClear</span>
          </motion.h2>
          <motion.div initial={{ opacity:0,y:14 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ delay:0.16 }} className="flex items-center justify-center gap-3 mt-2">
            <div className="flex gap-0.5">{[...Array(5)].map((_,i)=><Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}</div>
            <span className="font-display font-bold text-xl text-brand-ink">5.0</span>
            <span className="font-body text-brand-muted text-sm">(500+ cleans)</span>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {T.map((t,i) => <Card key={t.name} t={t} index={i} />)}
        </div>
        <motion.div initial={{ opacity:0,y:18 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ delay:0.6 }} className="text-center mt-12">
          <p className="font-body text-brand-muted text-sm mb-5">Join 500+ satisfied clients across Winnipeg</p>
          <a href="tel:+14318164106" className="btn-sky inline-flex text-base px-9 py-4">Book Your Clean Today</a>
        </motion.div>
      </div>
    </section>
  );
}
