"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
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

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [state, setState] = useState<FormState>({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      setState({
        loading: false,
        success: false,
        error: err instanceof Error ? err.message : "Failed to send. Please call us directly.",
      });
    }
  };

  const inputClass =
    "w-full bg-brand-surface/60 border border-brand-border hover:border-brand-blue/40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 rounded-xl px-4 py-3.5 text-sm font-body text-brand-white placeholder:text-brand-muted transition-all duration-200";

  const labelClass = "block text-xs font-body font-600 text-brand-light uppercase tracking-wider mb-2";

  return (
    <section
      id="contact"
      className="relative section-pad overflow-hidden"
      aria-label="Contact RiseClear Property Services"
    >
      <div className="absolute inset-0 bg-brand-surface/20 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-border bg-brand-surface/60 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse-slow" />
            <span className="text-xs text-brand-muted uppercase tracking-widest font-body">
              Get in Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-brand-white tracking-tight mb-4"
          >
            Request Your{" "}
            <span className="gradient-text">Free Quote</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14 }}
            className="font-body font-300 text-brand-light text-base sm:text-lg max-w-xl mx-auto"
          >
            Fill in the form below, call us directly, or send a WhatsApp message.
            We respond to all inquiries within a few hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Quick contact cards */}
            <a
              href="tel:+14318164106"
              className="group flex items-center gap-4 glass border border-brand-border hover:border-brand-blue/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
              aria-label="Call RiseClear"
            >
              <div className="w-12 h-12 bg-brand-blue/10 border border-brand-blue/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/20 group-hover:scale-110 transition-all duration-300">
                <Phone className="w-5 h-5 text-brand-blue-bright" />
              </div>
              <div>
                <p className="text-xs font-body font-600 uppercase tracking-wider text-brand-muted mb-1">
                  Call or Text
                </p>
                <p className="font-body font-600 text-brand-white text-base">
                  +1 431 816 4106
                </p>
                <p className="text-xs text-brand-muted font-body mt-0.5">
                  Mon–Sat, 8am–6pm CST
                </p>
              </div>
            </a>

            <a
              href="mailto:info@risecleaning.ca"
              className="group flex items-center gap-4 glass border border-brand-border hover:border-brand-blue/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
              aria-label="Email RiseClear"
            >
              <div className="w-12 h-12 bg-brand-blue/10 border border-brand-blue/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/20 group-hover:scale-110 transition-all duration-300">
                <Mail className="w-5 h-5 text-brand-blue-bright" />
              </div>
              <div>
                <p className="text-xs font-body font-600 uppercase tracking-wider text-brand-muted mb-1">
                  Email Us
                </p>
                <p className="font-body font-600 text-brand-white text-sm">
                  info@risecleaning.ca
                </p>
                <p className="text-xs text-brand-muted font-body mt-0.5">
                  We reply within a few hours
                </p>
              </div>
            </a>

            <a
              href="https://wa.me/14318164106?text=Hello%2C%20I%27m%20interested%20in%20your%20cleaning%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-0.5 bg-[#25D366]/5 border-[#25D366]/25 hover:border-[#25D366]/50 hover:bg-[#25D366]/10"
              aria-label="WhatsApp RiseClear"
            >
              <div className="w-12 h-12 bg-[#25D366]/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <p className="text-xs font-body font-600 uppercase tracking-wider text-brand-muted mb-1">
                  WhatsApp
                </p>
                <p className="font-body font-600 text-brand-white text-base">
                  Message Us Directly
                </p>
                <p className="text-xs text-brand-muted font-body mt-0.5">
                  Fastest response method
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4 glass border border-brand-border rounded-2xl p-5">
              <div className="w-12 h-12 bg-brand-blue/10 border border-brand-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-brand-blue-bright" />
              </div>
              <div>
                <p className="text-xs font-body font-600 uppercase tracking-wider text-brand-muted mb-1">
                  Service Area
                </p>
                <p className="font-body font-600 text-brand-white text-base">
                  Winnipeg, MB
                </p>
                <p className="text-xs text-brand-muted font-body mt-0.5">
                  And surrounding areas
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="glass border border-brand-border rounded-2xl p-5">
              <p className="text-xs font-body font-600 uppercase tracking-wider text-brand-muted mb-3">
                Business Hours
              </p>
              <div className="space-y-2">
                {[
                  { day: "Monday – Friday", hrs: "8:00 AM – 6:00 PM" },
                  { day: "Saturday", hrs: "9:00 AM – 4:00 PM" },
                  { day: "Sunday", hrs: "By appointment" },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between items-center">
                    <span className="text-sm font-body text-brand-light">{item.day}</span>
                    <span className="text-sm font-body font-500 text-brand-white">{item.hrs}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass border border-brand-border rounded-2xl p-6 sm:p-8">
              {state.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-5"
                >
                  <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-700 text-xl text-brand-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="font-body font-300 text-brand-light text-sm leading-relaxed max-w-xs mx-auto">
                      Thank you! We&apos;ve received your request and will be in
                      touch shortly. Check your inbox for a confirmation email.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <a
                      href="tel:+14318164106"
                      className="flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-bright text-white font-body font-600 text-sm px-6 py-3 rounded-xl transition-all duration-300"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                    <button
                      onClick={() =>
                        setState({ loading: false, success: false, error: null })
                      }
                      className="text-brand-muted hover:text-brand-white font-body text-sm transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <h3 className="font-display font-700 text-lg text-brand-white mb-6 tracking-tight">
                    Tell us about your project
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Full Name <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        required
                        autoComplete="name"
                        className={inputClass}
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        required
                        autoComplete="email"
                        className={inputClass}
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (204) 555-0123"
                        autoComplete="tel"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className={labelClass}>
                        Service Needed
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={`${inputClass} cursor-pointer appearance-none`}
                      >
                        <option value="">Select a service…</option>
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className={labelClass}>
                      Your Message <span className="text-brand-blue">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your property, what needs cleaning, your preferred schedule, or any questions you have…"
                      required
                      className={`${inputClass} resize-none`}
                      aria-required="true"
                    />
                  </div>

                  {/* Error message */}
                  {state.error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 bg-red-500/10 border border-red-500/25 rounded-xl p-4 mb-5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-body text-red-400">{state.error}</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={state.loading}
                    className="group w-full flex items-center justify-center gap-3 bg-brand-blue hover:bg-brand-blue-bright disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-600 text-base py-4 rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 overflow-hidden relative cursor-pointer"
                    aria-label="Submit contact form"
                  >
                    {!state.loading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                    )}
                    {state.loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending your request…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send My Quote Request
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-brand-muted mt-4 font-body">
                    By submitting, you agree to be contacted by RiseClear
                    Property Services regarding your inquiry. We never share your
                    information.
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
