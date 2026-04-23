"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Clock } from "lucide-react";
import Link from "next/link";

const SERVICES = ["Window Cleaning","Gutter Cleaning","Home Cleaning","Deep Cleaning","Pressure Washing","Move-In / Move-Out Cleaning","Permanent LED Light Installation","Other / Multiple Services"];
const HOURS = [{ day:"Monday – Friday",hrs:"8:00 AM – 6:00 PM"},{ day:"Saturday",hrs:"9:00 AM – 4:00 PM"},{ day:"Sunday",hrs:"By appointment"}];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [form, setForm] = useState({ name:"",email:"",phone:"",service:"",message:"" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const set = (k:keyof typeof form) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => { setForm(p=>({...p,[k]:e.target.value})); if(error)setError(""); };
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await fetch("/api/contact",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error||"Server error");
      setSuccess(true); setForm({ name:"",email:"",phone:"",service:"",message:"" });
    } catch(err:unknown) { setError(err instanceof Error ? err.message : "Failed to send. Please call us."); }
    finally { setLoading(false); }
  };
  const lbl = "block font-body text-xs font-semibold text-brand-ink uppercase tracking-wider mb-2";

  return (
    <section id="contact" className="relative section-pad bg-white">
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background:"linear-gradient(90deg,#0369A1,#0EA5E9,#38BDF8)" }} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-14" ref={ref}>
          <motion.p initial={{ opacity:0, y:14 }} animate={inView ? { opacity:1, y:0 } : {}} className="section-label justify-center mb-4">Get in Touch</motion.p>
          <motion.h2 initial={{ opacity:0, y:18 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.08 }}
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-brand-ink tracking-tight mb-4">
            Request Your <span className="gradient-text">Free Quote</span>
          </motion.h2>
          <motion.p initial={{ opacity:0, y:14 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.14 }}
            className="font-body text-brand-body text-[1.0625rem] max-w-xl mx-auto">
            Fill the form, call us, or DM us on Instagram. We respond within a few hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 max-w-6xl mx-auto">
          <motion.div initial={{ opacity:0, x:-24 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ delay:0.2, duration:0.6 }} className="lg:col-span-2 space-y-4">
            {[{href:"tel:+14318164106",Icon:Phone,label:"Call or Text",value:"+1 431 816 4106",sub:"Mon–Sat, 8am–6pm CST"},{href:"mailto:info@risecleaning.ca",Icon:Mail,label:"Email Us",value:"info@risecleaning.ca",sub:"Reply within a few hours"}].map(({href,Icon,label,value,sub})=>(
              <a key={label} href={href} className="group flex items-center gap-4 card p-5 hover:border-sky-300">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 text-sky-600 group-hover:text-white transition-colors" />
                </div>
                <div><p className="font-body text-xs font-semibold uppercase tracking-wider text-brand-muted mb-0.5">{label}</p><p className="font-display font-bold text-brand-ink text-[0.9375rem]">{value}</p><p className="font-body text-xs text-brand-muted mt-0.5">{sub}</p></div>
              </a>
            ))}
            {/* Instagram */}
            <a href="https://www.instagram.com/riseclearpropertyservices/" target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-0.5"
              style={{ background:"rgba(240,148,51,0.05)", borderColor:"rgba(220,39,67,0.2)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                   style={{ background:"linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <div><p className="font-body text-xs font-semibold uppercase tracking-wider text-brand-muted mb-0.5">Instagram</p><p className="font-display font-bold text-brand-ink text-[0.9375rem]">@riseclearpropertyservices</p><p className="font-body text-xs text-brand-muted mt-0.5">DM us for fast quotes</p></div>
            </a>
            <div className="flex items-center gap-4 card p-5 border-sky-100">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-sky-600" /></div>
              <div><p className="font-body text-xs font-semibold uppercase tracking-wider text-brand-muted mb-0.5">Service Area</p><p className="font-display font-bold text-brand-ink text-[0.9375rem]">Winnipeg, MB</p><p className="font-body text-xs text-brand-muted mt-0.5">And surrounding areas</p></div>
            </div>
            <div className="card p-5 border-sky-100">
              <div className="flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-sky-500" /><p className="font-body text-xs font-semibold uppercase tracking-wider text-brand-muted">Business Hours</p></div>
              <div className="space-y-2.5">{HOURS.map(h=>(
                <div key={h.day} className="flex justify-between items-center"><span className="font-body text-sm text-brand-body">{h.day}</span><span className="font-display font-semibold text-sm text-brand-ink">{h.hrs}</span></div>
              ))}</div>
            </div>
            {/* Quick estimate CTA */}
            <Link href="/quote" className="btn-sky w-full py-3.5 text-[0.9375rem] text-center">Get Instant Estimate →</Link>
          </motion.div>

          <motion.div initial={{ opacity:0, x:24 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ delay:0.3, duration:0.6 }} className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-sky-200 shadow-[0_8px_40px_rgba(14,165,233,0.10)] overflow-hidden">
              <div className="px-6 sm:px-8 py-5 border-b border-sky-100" style={{ background:"linear-gradient(135deg,#F0F9FF,#E0F2FE)" }}>
                <h3 className="font-display font-bold text-lg text-brand-ink">Tell us about your project</h3>
                <p className="font-body text-sm text-brand-muted mt-1">We&apos;ll respond with a free, no-obligation quote.</p>
              </div>
              <div className="px-6 sm:px-8 py-7">
                {success ? (
                  <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="flex flex-col items-center text-center py-12 gap-5">
                    <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-emerald-500" /></div>
                    <div><h3 className="font-display font-bold text-xl text-brand-ink mb-2">Message Sent!</h3><p className="font-body text-sm text-brand-muted max-w-xs mx-auto">We&apos;ve received your request and will be in touch shortly.</p></div>
                    <div className="flex gap-3 flex-wrap justify-center">
                      <a href="tel:+14318164106" className="btn-sky text-sm px-6 py-3"><Phone className="w-4 h-4" /> Call Now</a>
                      <button onClick={()=>setSuccess(false)} className="font-body text-sm text-brand-muted hover:text-brand-ink cursor-pointer">Send another</button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div><label htmlFor="c-name" className={lbl}>Name <span className="text-sky-500 normal-case font-normal">*</span></label><input id="c-name" type="text" value={form.name} onChange={set("name")} placeholder="Jane Smith" required autoComplete="name" className="input-field" /></div>
                      <div><label htmlFor="c-email" className={lbl}>Email <span className="text-sky-500 normal-case font-normal">*</span></label><input id="c-email" type="email" value={form.email} onChange={set("email")} placeholder="jane@example.com" required autoComplete="email" className="input-field" /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div><label htmlFor="c-phone" className={lbl}>Phone</label><input id="c-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+1 (204) 555-0123" autoComplete="tel" className="input-field" /></div>
                      <div><label htmlFor="c-service" className={lbl}>Service</label><select id="c-service" value={form.service} onChange={set("service")} className="input-field cursor-pointer appearance-none"><option value="">Select a service…</option>{SERVICES.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
                    </div>
                    <div className="mb-6"><label htmlFor="c-msg" className={lbl}>Message <span className="text-sky-500 normal-case font-normal">*</span></label><textarea id="c-msg" value={form.message} onChange={set("message")} rows={5} required className="input-field resize-none" placeholder="Tell us about your property, preferred schedule, or any questions…" /></div>
                    {error && (
                      <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-5" role="alert">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" /><p className="font-body text-sm text-red-600">{error}</p>
                      </motion.div>
                    )}
                    <button type="submit" disabled={loading} className="btn-sky w-full py-4 text-base">
                      {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Send My Quote Request</>}
                    </button>
                    <p className="font-body text-center text-xs text-brand-subtle mt-4">By submitting you agree to be contacted about your inquiry. We never share your data.</p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
