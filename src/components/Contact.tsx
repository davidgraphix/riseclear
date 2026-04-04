"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Phone, Mail, MapPin, MessageCircle,
  Send, CheckCircle2, AlertCircle, Loader2, Clock,
} from "lucide-react";

const services = [
  "Window Cleaning",
  "Gutter Cleaning",
  "Home Cleaning",
  "Deep Cleaning",
  "Pressure Washing",
  "Move-In / Move-Out Cleaning",
  "Permanent LED Light Installation",
  "Other / Multiple Services",
];

interface FormData { name: string; email: string; phone: string; service: string; message: string }
interface FormState { loading: boolean; success: boolean; error: string | null }

const hours = [
  { day: "Monday – Friday", hrs: "8:00 AM – 6:00 PM" },
  { day: "Saturday", hrs: "9:00 AM – 4:00 PM" },
  { day: "Sunday", hrs: "By appointment" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", service: "", message: "" });
  const [state, setState] = useState<FormState>({ loading: false, success: false, error: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (state.error) setState((s) => ({ ...s, error: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ loading: true, success: false, error: null });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState({ loading: false, success: true, error: null });
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err: unknown) {
      setState({ loading: false, success: false, error: err instanceof Error ? err.message : "Failed to send. Please call us directly." });
    }
  };

  const labelCls = "block text-xs font-semibold text-brand-ink uppercase tracking-wider mb-2";

  return (
    <section
      id="contact"
      className="relative section-pad bg-white"
      aria-label="Contact RiseClear Property Services"
    >
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-blue" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-label justify-center"
          >
            Get in Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-[2.625rem] font-bold text-brand-ink tracking-tight mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Request Your{" "}
            <span className="gradient-text">Free Quote</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14 }}
            className="text-brand-body text-[1.0625rem] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Fill in the form, call us, or send a WhatsApp. We respond to all
            inquiries within a few hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 max-w-6xl mx-auto">

          {/* ── Left: Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Phone */}
            <a
              href="tel:+14318164106"
              className="group flex items-center gap-4 card bg-white p-5 hover:border-brand-blue/30"
              aria-label="Call RiseClear"
            >
              <div className="w-12 h-12 bg-brand-blue-light rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue group-hover:scale-110 transition-all duration-300">
                <Phone className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1">Call or Text</p>
                <p className="font-bold text-brand-ink text-[1rem]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>+1 431 816 4106</p>
                <p className="text-xs text-brand-muted mt-0.5">Mon–Sat, 8am–6pm CST</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:info@risecleaning.ca"
              className="group flex items-center gap-4 card bg-white p-5 hover:border-brand-blue/30"
              aria-label="Email RiseClear"
            >
              <div className="w-12 h-12 bg-brand-blue-light rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue group-hover:scale-110 transition-all duration-300">
                <Mail className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1">Email Us</p>
                <p className="font-bold text-brand-ink text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>info@risecleaning.ca</p>
                <p className="text-xs text-brand-muted mt-0.5">Reply within a few hours</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl p-5 border border-[#25D366]/25 hover:border-[#25D366]/60 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-all duration-300 hover:-translate-y-0.5"
              aria-label="WhatsApp RiseClear"
            >
              <div className="w-12 h-12 bg-[#25D366]/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1">WhatsApp</p>
                <p className="font-bold text-brand-ink text-[1rem]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Message Us Directly</p>
                <p className="text-xs text-brand-muted mt-0.5">Fastest response method</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 card bg-white p-5">
              <div className="w-12 h-12 bg-brand-blue-light rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1">Service Area</p>
                <p className="font-bold text-brand-ink text-[1rem]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Winnipeg, MB</p>
                <p className="text-xs text-brand-muted mt-0.5">And surrounding areas</p>
              </div>
            </div>

            {/* Hours */}
            <div className="card bg-white p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-brand-blue" />
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Business Hours</p>
              </div>
              <div className="space-y-2.5">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center text-sm">
                    <span className="text-brand-body" style={{ fontFamily: "var(--font-inter)" }}>{h.day}</span>
                    <span className="font-semibold text-brand-ink" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{h.hrs}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl border border-brand-border shadow-card p-6 sm:p-8 lg:p-10">

              {state.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-14 gap-5"
                >
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-brand-ink mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                      Message Sent!
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed max-w-xs mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
                      Thank you! We&apos;ve received your request and will be in touch shortly. Check your inbox for a confirmation email.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="tel:+14318164106" className="btn-primary text-sm px-6 py-3">
                      <Phone className="w-4 h-4" /> Call Now
                    </a>
                    <button
                      onClick={() => setState({ loading: false, success: false, error: null })}
                      className="text-brand-muted hover:text-brand-ink text-sm transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <h3 className="font-bold text-lg text-brand-ink mb-7" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    Tell us about your project
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="name" className={labelCls}>
                        Full Name <span className="text-brand-blue normal-case">*</span>
                      </label>
                      <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
                        placeholder="Jane Smith" required autoComplete="name" className="input-light"
                        aria-required="true" />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelCls}>
                        Email <span className="text-brand-blue normal-case">*</span>
                      </label>
                      <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="jane@example.com" required autoComplete="email" className="input-light"
                        aria-required="true" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="phone" className={labelCls}>Phone Number</label>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                        placeholder="+1 (204) 555-0123" autoComplete="tel" className="input-light" />
                    </div>
                    <div>
                      <label htmlFor="service" className={labelCls}>Service Needed</label>
                      <select id="service" name="service" value={form.service} onChange={handleChange}
                        className="input-light cursor-pointer appearance-none">
                        <option value="">Select a service…</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="mb-7">
                    <label htmlFor="message" className={labelCls}>
                      Message <span className="text-brand-blue normal-case">*</span>
                    </label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange}
                      rows={5} required className="input-light resize-none"
                      placeholder="Tell us about your property, what needs cleaning, your preferred schedule, or any questions…"
                      aria-required="true" />
                  </div>

                  {state.error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600" style={{ fontFamily: "var(--font-inter)" }}>{state.error}</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={state.loading}
                    className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-label="Submit quote request"
                  >
                    {state.loading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send My Quote Request</>
                    )}
                  </button>

                  <p className="text-center text-xs text-brand-subtle mt-4" style={{ fontFamily: "var(--font-inter)" }}>
                    By submitting you agree to be contacted about your inquiry. We never share your information.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
