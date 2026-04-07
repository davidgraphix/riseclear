"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2, ArrowLeft, Phone, MessageCircle,
  Home, Building2, Eye, EyeOff, Grid3X3, Layers,
  Star, Shield, Clock, ChevronRight, Send, Loader2,
} from "lucide-react";

/* ─── Types & data ──────────────────────────────────────── */

type JobSize   = "small" | "medium" | "large" | "commercial";
type Scope     = "residential" | "commercial";
type Coverage  = "exterior" | "interior" | "both";
type AddOn     = "tracks" | "screens" | "frames" | "hard-water";

interface PriceRange { low: number; high: number }

const SIZE_OPTIONS: { id: JobSize; label: string; desc: string; detail: string }[] = [
  { id: "small",      label: "Small Home",       desc: "Up to 10 windows",   detail: "Townhouse, condo, or small detached home" },
  { id: "medium",     label: "Medium Home",      desc: "11–20 windows",      detail: "Standard single-family home" },
  { id: "large",      label: "Large Home",       desc: "21+ windows",        detail: "Large or multi-storey home" },
  { id: "commercial", label: "Commercial",        desc: "Office / storefront", detail: "Retail, office building, or commercial property" },
];

const ADDONS: { id: AddOn; label: string; desc: string; price: string }[] = [
  { id: "tracks",     label: "Window Tracks",    desc: "Deep-clean track channels",    price: "+$15–30" },
  { id: "screens",    label: "Window Screens",   desc: "Clean & inspect each screen",  price: "+$10–20" },
  { id: "frames",     label: "Window Frames",    desc: "Wipe down all frame surfaces",  price: "+$10–20" },
  { id: "hard-water", label: "Hard Water Stains",desc: "Remove mineral deposits",       price: "+$25–50" },
];

const BASE_PRICES: Record<JobSize, Record<Coverage, PriceRange>> = {
  small:      { exterior: { low: 80,  high: 130 }, interior: { low: 70,  high: 120 }, both: { low: 140, high: 230 } },
  medium:     { exterior: { low: 130, high: 200 }, interior: { low: 120, high: 190 }, both: { low: 230, high: 360 } },
  large:      { exterior: { low: 200, high: 320 }, interior: { low: 180, high: 300 }, both: { low: 360, high: 590 } },
  commercial: { exterior: { low: 250, high: 500 }, interior: { low: 220, high: 450 }, both: { low: 450, high: 900 } },
};

const ADDON_PRICES: Record<AddOn, number> = {
  tracks: 20, screens: 15, frames: 15, "hard-water": 35,
};

const features = [
  "Streak-free guarantee — we re-clean if needed",
  "Fully insured & bonded technicians",
  "Eco-friendly, biodegradable cleaning solutions",
  "Before & after photos on every job",
  "Same-day & next-day appointments available",
  "Residential and commercial expertise",
];

const faqs = [
  { q: "How long does a window cleaning take?", a: "Most residential jobs take 1–3 hours depending on the number of windows and selected scope. Commercial jobs are quoted separately after a site visit or detailed inquiry." },
  { q: "Do I need to be home?", a: "For exterior-only cleaning, you don't need to be home. For interior or both, we ask that someone be present. We'll confirm details when booking." },
  { q: "What if it rains on the day?", a: "Light rain doesn't affect exterior quality — we use water-fed poles and professional squeegees designed for Canadian weather. We'll reschedule if conditions are unsafe." },
  { q: "Do you clean second-storey windows?", a: "Yes. We're equipped with extension poles and ladders for multi-storey residential and commercial properties across Winnipeg." },
  { q: "Are your products safe for kids and pets?", a: "Absolutely. We use biodegradable, non-toxic solutions that are safe for your family, pets, and the environment." },
];

/* ─── Estimate calculator component ─────────────────────── */

function EstimateCalc() {
  const [size, setSize]         = useState<JobSize | null>(null);
  const [scope, setScope]       = useState<Scope>("residential");
  const [coverage, setCoverage] = useState<Coverage | null>(null);
  const [addOns, setAddOns]     = useState<Set<AddOn>>(new Set());
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [notes, setNotes]       = useState("");
  const [sent, setSent]         = useState(false);
  const [sending, setSending]   = useState(false);
  const [error, setError]       = useState("");

  const toggleAddon = (id: AddOn) =>
    setAddOns((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const baseRange: PriceRange | null =
    size && coverage ? BASE_PRICES[size][coverage] : null;

  const addonTotal = Array.from(addOns).reduce((sum, id) => sum + ADDON_PRICES[id], 0);

  const estimate = baseRange
    ? { low: baseRange.low + addonTotal, high: baseRange.high + addonTotal }
    : null;

  const ready = size && coverage;

  const handleSend = async () => {
    if (!name || !email) { setError("Please enter your name and email."); return; }
    setSending(true); setError("");
    const message = [
      `Job Size: ${SIZE_OPTIONS.find((s) => s.id === size)?.label}`,
      `Scope: ${scope}`,
      `Coverage: ${coverage}`,
      `Add-ons: ${[...addOns].join(", ") || "None"}`,
      estimate ? `Estimate: $${estimate.low}–$${estimate.high}` : "",
      notes ? `Notes: ${notes}` : "",
    ].filter(Boolean).join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service: "Window Cleaning", message }),
      });
      if (!res.ok) throw new Error("Server error");
      setSent(true);
    } catch {
      setError("Failed to send. Please call us directly at +1 431 816 4106.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-sky-200 shadow-[0_8px_40px_rgba(14,165,233,0.10)] overflow-hidden">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0369A1, #0EA5E9)" }} className="px-6 sm:px-8 py-6">
        <h2 className="font-display font-bold text-xl text-white mb-1">Instant Estimate</h2>
        <p className="font-body text-sky-200 text-sm">Customise your service — see an estimated price range instantly.</p>
      </div>

      <div className="px-6 sm:px-8 py-7 space-y-8">

        {/* Step 1: Job Size */}
        <div>
          <p className="font-display font-bold text-[0.875rem] text-brand-ink uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 text-[11px] font-bold flex items-center justify-center flex-shrink-0">1</span>
            Property Size
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSize(opt.id)}
                className={`option-chip flex-col items-start gap-0 p-3.5 h-auto text-left ${size === opt.id ? "selected" : ""}`}
                aria-pressed={size === opt.id}
              >
                <span className="font-display font-bold text-sm leading-tight">{opt.label}</span>
                <span className="font-body text-xs text-brand-muted mt-0.5 leading-snug">{opt.desc}</span>
              </button>
            ))}
          </div>
          {size && (
            <p className="font-body text-xs text-brand-muted mt-2 pl-1">
              {SIZE_OPTIONS.find((s) => s.id === size)?.detail}
            </p>
          )}
        </div>

        {/* Step 2: Scope */}
        <div>
          <p className="font-display font-bold text-[0.875rem] text-brand-ink uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 text-[11px] font-bold flex items-center justify-center flex-shrink-0">2</span>
            Property Type
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: "residential" as Scope, label: "Residential", icon: Home },
              { id: "commercial"  as Scope, label: "Commercial",  icon: Building2 },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setScope(id)}
                className={`option-chip gap-2.5 justify-start ${scope === id ? "selected" : ""}`}
                aria-pressed={scope === id}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="font-display font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Coverage */}
        <div>
          <p className="font-display font-bold text-[0.875rem] text-brand-ink uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 text-[11px] font-bold flex items-center justify-center flex-shrink-0">3</span>
            Interior / Exterior
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "exterior" as Coverage, label: "Exterior Only", icon: Eye },
              { id: "interior" as Coverage, label: "Interior Only", icon: EyeOff },
              { id: "both"     as Coverage, label: "Both Sides",    icon: Layers },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCoverage(id)}
                className={`option-chip flex-col gap-1 h-auto py-3 ${coverage === id ? "selected" : ""}`}
                aria-pressed={coverage === id}
              >
                <Icon className="w-4 h-4" />
                <span className="font-display font-semibold text-xs text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Add-ons */}
        <div>
          <p className="font-display font-bold text-[0.875rem] text-brand-ink uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 text-[11px] font-bold flex items-center justify-center flex-shrink-0">4</span>
            Add-Ons <span className="font-body text-brand-muted text-[11px] font-normal normal-case tracking-normal">(optional)</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ADDONS.map((a) => (
              <button
                key={a.id}
                onClick={() => toggleAddon(a.id)}
                className={`option-chip flex-col items-start gap-0 p-3 h-auto text-left ${addOns.has(a.id) ? "selected" : ""}`}
                aria-pressed={addOns.has(a.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-display font-bold text-xs leading-tight">{a.label}</span>
                  <span className={`text-[10px] font-bold ${addOns.has(a.id) ? "text-sky-600" : "text-brand-muted"}`}>{a.price}</span>
                </div>
                <span className="font-body text-[10px] text-brand-muted mt-0.5">{a.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Estimate display */}
        {estimate && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden border border-sky-200"
          >
            <div className="bg-sky-50 px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-body text-xs text-sky-600 font-semibold uppercase tracking-wider mb-0.5">Estimated Range</p>
                <p className="font-display font-black text-2xl text-sky-700">
                  ${estimate.low} – ${estimate.high}
                </p>
                <p className="font-body text-xs text-brand-muted mt-0.5">Final price confirmed on-site</p>
              </div>
              <Grid3X3 className="w-10 h-10 text-sky-300" />
            </div>
            <div className="bg-white px-5 py-3 text-xs font-body text-brand-muted border-t border-sky-100">
              ✓ No hidden fees &nbsp;·&nbsp; ✓ Free on-site confirmation &nbsp;·&nbsp; ✓ No-obligation
            </div>
          </motion.div>
        )}

        {/* Contact fields */}
        {ready && !sent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 pt-2 border-t border-sky-100">
            <p className="font-display font-bold text-sm text-brand-ink">Send Me This Estimate</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="input-field" placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="input-field" type="email" placeholder="Email address *" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <input className="input-field" type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <textarea className="input-field resize-none" rows={3} placeholder="Any questions or special requirements?" value={notes} onChange={(e) => setNotes(e.target.value)} />
            {error && <p className="text-sm text-red-500 font-body">{error}</p>}
            <button
              onClick={handleSend}
              disabled={sending}
              className="btn-sky w-full py-4 disabled:opacity-60"
              aria-label="Send quote request"
            >
              {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Send My Quote Request</>}
            </button>
          </motion.div>
        )}

        {sent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-500" />
            </div>
            <p className="font-display font-bold text-brand-ink text-lg mb-1">Sent!</p>
            <p className="font-body text-sm text-brand-muted">We&apos;ll be in touch shortly with your confirmed quote.</p>
            <a href="tel:+14318164106" className="btn-sky inline-flex mt-4 text-sm px-6 py-3">
              <Phone className="w-4 h-4" /> Call to Confirm
            </a>
          </motion.div>
        )}

        {!ready && !sent && (
          <p className="font-body text-xs text-center text-brand-subtle">
            Select size &amp; coverage above to see your estimate
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function WindowCleaningPage() {
  return (
    <main className="bg-white">

      {/* ── Breadcrumb ── */}
      <div className="bg-sky-50 border-b border-sky-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-3.5">
          <div className="flex items-center gap-2 font-body text-sm text-brand-muted">
            <Link href="/" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-300" />
            <Link href="/#services" className="hover:text-sky-600 transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-300" />
            <span className="text-brand-ink font-semibold">Window Cleaning</span>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(150deg, #0369A1 0%, #0EA5E9 60%, #38BDF8 100%)" }}>
        <div className="absolute inset-0 bg-grid-sky bg-grid opacity-[0.07] pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-[0.7rem] font-bold uppercase tracking-widest font-body mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse-slow" />
                Cleaning Services · Window Cleaning
              </span>
              <h1 className="font-display font-900 text-4xl sm:text-5xl text-white leading-[1.07] tracking-tight mb-5">
                Professional<br />Window Cleaning<br />
                <span style={{ background: "linear-gradient(135deg,#FFFFFF,#BAE6FD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  in Winnipeg
                </span>
              </h1>
              <p className="font-body text-sky-100 text-[1rem] leading-relaxed mb-7 max-w-lg">
                Streak-free, crystal-clear results for homes and businesses. Choose your size, scope,
                interior or exterior, and any add-ons — then get an instant estimate.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+14318164106" className="btn-white text-[0.9375rem] px-7 py-4">
                  <Phone className="w-5 h-5" />
                  Call +1 431 816 4106
                </a>
                <a
                  href="https://wa.me/14318164106?text=I%27d%20like%20a%20quote%20for%20window%20cleaning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-white-outline text-[0.9375rem] px-7 py-4"
                >
                  <MessageCircle className="w-5 h-5 text-[#4ADE80]" />
                  WhatsApp a Quote
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.25)] border border-white/20">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/window-cleaning.jpg"
                    alt="RiseClear professional window cleaning service in Winnipeg"
                    fill
                    priority
                    className="object-cover"
                    sizes="50vw"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                      const wrapper = t.parentElement;
                      if (wrapper) wrapper.classList.add("img-placeholder");
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="section-pad">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            {/* Left: Info */}
            <div className="lg:col-span-3 space-y-12">

              {/* What's included */}
              <div>
                <p className="section-label mb-4">What&apos;s Included</p>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-ink mb-5 leading-tight">
                  Premium Window Cleaning — <span className="gradient-text">Done Right</span>
                </h2>
                <p className="font-body text-brand-body text-[0.9375rem] leading-relaxed mb-6">
                  Every job includes a thorough pre-inspection, professional-grade cleaning solution
                  application, squeegee finish, and a final streak check. We leave zero drips,
                  zero streaks — or we come back free of charge.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 font-body text-sm text-brand-body">
                      <CheckCircle2 className="w-4.5 h-4.5 w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Options breakdown */}
              <div>
                <p className="section-label mb-5">Service Options</p>
                <div className="space-y-4">
                  {[
                    {
                      icon: Eye,
                      title: "Exterior Only",
                      desc: "Ideal for regular maintenance. We clean all exterior glass surfaces using water-fed poles and professional squeegees for a flawless finish without entering your home.",
                      tag: "Most common",
                    },
                    {
                      icon: EyeOff,
                      title: "Interior Only",
                      desc: "Perfect for freshly-built homes or post-renovation cleanup. We focus on interior glass, removing construction residue, fingerprints and smudges.",
                      tag: null,
                    },
                    {
                      icon: Layers,
                      title: "Both Sides (Interior + Exterior)",
                      desc: "Our most thorough option. Every pane cleaned on both sides for crystal clarity. Recommended at least once per year for maximum results.",
                      tag: "Best value",
                    },
                  ].map(({ icon: Icon, title, desc, tag }) => (
                    <div key={title} className="card p-5 flex gap-4 hover:border-sky-200">
                      <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <h3 className="font-display font-semibold text-[0.9375rem] text-brand-ink">{title}</h3>
                          {tag && <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">{tag}</span>}
                        </div>
                        <p className="font-body text-sm text-brand-muted leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons detail */}
              <div>
                <p className="section-label mb-5">Available Add-Ons</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ADDONS.map((a) => (
                    <div key={a.id} className="card p-5 border border-sky-100 hover:border-sky-300">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display font-semibold text-[0.9375rem] text-brand-ink">{a.label}</h3>
                        <span className="font-body text-sm font-bold text-sky-600">{a.price}</span>
                      </div>
                      <p className="font-body text-sm text-brand-muted">{a.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Shield, label: "Fully Insured" },
                  { icon: Star,   label: "5.0 Rated" },
                  { icon: Clock,  label: "Same-Day Avail." },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-sky-600" />
                    </div>
                    <p className="font-display font-bold text-xs text-brand-ink">{label}</p>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              <div>
                <p className="section-label mb-5">FAQ</p>
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <details key={faq.q} className="group card p-5 cursor-pointer open:border-sky-200">
                      <summary className="font-display font-semibold text-[0.9375rem] text-brand-ink flex items-center justify-between gap-3 list-none">
                        {faq.q}
                        <ChevronRight className="w-4 h-4 text-sky-400 flex-shrink-0 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="font-body text-sm text-brand-muted mt-3 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sticky estimate */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <EstimateCalc />
                <div className="mt-4 p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center">
                  <p className="font-body text-xs text-sky-700 leading-relaxed">
                    Prefer to talk? Call us at{" "}
                    <a href="tel:+14318164106" className="font-semibold hover:underline">+1 431 816 4106</a>
                    {" "}and we&apos;ll give you a quote in minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section-pad-sm" style={{ background: "linear-gradient(135deg, #0369A1, #0EA5E9)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Ready for Crystal-Clear Windows?
          </h2>
          <p className="font-body text-sky-100 text-[1rem] mb-8 max-w-xl mx-auto">
            Get your free, no-obligation quote today. Most jobs booked within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="tel:+14318164106" className="btn-white w-full sm:w-auto px-9 py-4 text-[0.9375rem]">
              <Phone className="w-5 h-5" />
              Call Now — Free Quote
            </a>
            <Link href="/#contact" className="btn-white-outline w-full sm:w-auto px-9 py-4 text-[0.9375rem]">
              Request Online
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
