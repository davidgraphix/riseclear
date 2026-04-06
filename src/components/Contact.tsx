"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Phone, Mail, MapPin, MessageCircle,
  Send, CheckCircle2, AlertCircle, Loader2, Clock,
} from "lucide-react";

const SERVICES = [
  "Window Cleaning", "Gutter Cleaning", "Home Cleaning", "Deep Cleaning",
  "Pressure Washing", "Move-In / Move-Out Cleaning", "Permanent LED Light Installation",
  "Other / Multiple Services",
];

const HOURS = [
  { day: "Monday – Friday", hrs: "8:00 AM – 6:00 PM" },
  { day: "Saturday",        hrs: "9:00 AM – 4:00 PM" },
  { day: "Sunday",          hrs: "By appointment" },
];

interface FormState { name: string; email: string; phone: string; service: string; message: string }

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm]   = useState<FormState>({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]   = useState("");

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
      setSuccess(true); setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send. Please call us directly.");
    } finally { setLoading(false); }
  };

  const lbl = "block font-body text-xs font-semibold text-brand-ink uppercase tracking-wider mb-2";

  return (
    <section id="contact" className="relative section-pad bg-white" aria-label="Contact RiseClear">
      {/* Sky top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg,#0369A1,#0EA5E9,#38BDF8)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="section-label justify-center mb-4">
            Get in Touch
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }}
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-brand-ink tracking-tight mb-4">
            Request Your{" "}<span className="gradient-text">Free Quote</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.14 }}
            className="font-body text-brand-body text-[1.0625rem] max-w-xl mx-auto">
            Fill the form, call us, or WhatsApp. We respond to all inquiries within a few hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 max-w-6xl mx-auto">

          {/* Contact info column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { href: "tel:+14318164106", Icon: Phone, label: "Call or Text", value: "+1 431 816 4106", sub: "Mon–Sat, 8am–6pm CST", hover: "hover:border-sky-300" },
              { href: "mailto:info@risecleaning.ca", Icon: Mail, label: "Email Us", value: "info@risecleaning.ca", sub: "Reply within a few hours", hover: "hover:border-sky-300" },
            ].map(({ href, Icon, label, value, sub, hover }) => (
              <a key={label} href={href} className={`group flex items-center gap-4 card p-5 ${hover}`} aria-label={label}>
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 text-sky-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-wider text-brand-muted mb-0.5">{label}</p>
                  <p className="font-display font-bold text-brand-ink text-[0.9375rem]">{value}</p>
                  <p className="font-body text-xs text-brand-muted mt-0.5">{sub}</p>
                </div>
              </a>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
              target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl p-5 border border-[#25D366]/25 hover:border-[#25D366]/60 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-all duration-300 hover:-translate-y-0.5"
              aria-label="WhatsApp RiseClear"
            >
              <div className="w-12 h-12 bg-[#25D366]/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-brand-muted mb-0.5">WhatsApp</p>
                <p className="font-display font-bold text-brand-ink text-[0.9375rem]">Message Us Directly</p>
                <p className="font-body text-xs text-brand-muted mt-0.5">Fastest response method</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 card p-5 border-sky-100">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-brand-muted mb-0.5">Service Area</p>
                <p className="font-display font-bold text-brand-ink text-[0.9375rem]">Winnipeg, MB</p>
                <p className="font-body text-xs text-brand-muted mt-0.5">And surrounding areas</p>
              </div>
            </div>

            {/* Hours */}
            <div className="card p-5 border-sky-100">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-sky-500" />
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-brand-muted">Business Hours</p>
              </div>
              <div className="space-y-2.5">
                {HOURS.map((h) => (
                  <div key={h.day} className="flex justify-between items-center">
                    <span className="font-body text-sm text-brand-body">{h.day}</span>
                    <span className="font-display font-semibold text-sm text-brand-ink">{h.hrs}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl border border-sky-200 shadow-[0_8px_40px_rgba(14,165,233,0.10)] overflow-hidden">
              {/* Form header */}
              <div className="px-6 sm:px-8 py-5 border-b border-sky-100" style={{ background: "linear-gradient(135deg,#F0F9FF,#E0F2FE)" }}>
                <h3 className="font-display font-bold text-lg text-brand-ink">Tell us about your project</h3>
                <p className="font-body text-sm text-brand-muted mt-1">We&apos;ll respond with a free, no-obligation quote.</p>
              </div>

              <div className="px-6 sm:px-8 py-7">
                {success ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12 gap-5">
                    <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-brand-ink mb-2">Message Sent!</h3>
                      <p className="font-body text-sm text-brand-muted max-w-xs mx-auto">We&apos;ve received your request and will be in touch shortly. Check your inbox for a confirmation.</p>
                    </div>
                    <div className="flex gap-3 flex-wrap justify-center">
                      <a href="tel:+14318164106" className="btn-sky text-sm px-6 py-3"><Phone className="w-4 h-4" /> Call Now</a>
                      <button onClick={() => setSuccess(false)} className="font-body text-sm text-brand-muted hover:text-brand-ink transition-colors cursor-pointer">Send another</button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className={lbl}>Name <span className="text-sky-500 normal-case">*</span></label>
                        <input id="name" type="text" name="name" value={form.name} onChange={set("name")} placeholder="Jane Smith" required autoComplete="name" className="input-field" />
                      </div>
                      <div>
                        <label htmlFor="email" className={lbl}>Email <span className="text-sky-500 normal-case">*</span></label>
                        <input id="email" type="email" name="email" value={form.email} onChange={set("email")} placeholder="jane@example.com" required autoComplete="email" className="input-field" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="phone" className={lbl}>Phone</label>
                        <input id="phone" type="tel" name="phone" value={form.phone} onChange={set("phone")} placeholder="+1 (204) 555-0123" autoComplete="tel" className="input-field" />
                      </div>
                      <div>
                        <label htmlFor="service" className={lbl}>Service</label>
                        <select id="service" name="service" value={form.service} onChange={set("service")} className="input-field cursor-pointer appearance-none">
                          <option value="">Select a service…</option>
                          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className={lbl}>Message <span className="text-sky-500 normal-case">*</span></label>
                      <textarea id="message" name="message" value={form.message} onChange={set("message")} rows={5} required className="input-field resize-none"
                        placeholder="Tell us about your property, preferred schedule, or any questions…" />
                    </div>
                    {error && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-5" role="alert">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="font-body text-sm text-red-600">{error}</p>
                      </motion.div>
                    )}
                    <button type="submit" disabled={loading} className="btn-sky w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed" aria-label="Submit quote request">
                      {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Send My Quote Request</>}
                    </button>
                    <p className="font-body text-center text-xs text-brand-subtle mt-4">
                      By submitting you agree to be contacted about your inquiry. We never share your data.
                    </p>
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
