"use client";

/**
 * WindowCleaningForm — Inquiry-Only Form
 *
 * Window cleaning is now a secondary service.
 * NO pricing calculations, NO estimates.
 * Gutter cleaning is an optional add-on (not standalone).
 * Submits to existing POST /api/contact — shape unchanged.
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, CheckCircle2, Loader2, Send, Check,
  AlertCircle, Home, Building2, Eye, EyeOff,
  Layers, Droplets, ChevronRight, Phone,
} from "lucide-react";

type Scope     = "residential" | "commercial";
type Coverage  = "exterior" | "interior" | "both";
type AddOn     = "gutter-cleaning" | "tracks" | "screens";

const COVERAGES: { id: Coverage; label: string; desc: string; icon: React.ReactNode }[] = [
  { id: "exterior", label: "Exterior Only",  desc: "Outside glass surfaces",         icon: <Eye      className="w-5 h-5" strokeWidth={1.8} /> },
  { id: "interior", label: "Interior Only",  desc: "Inside glass surfaces",           icon: <EyeOff   className="w-5 h-5" strokeWidth={1.8} /> },
  { id: "both",     label: "Both Sides",     desc: "Interior + Exterior",             icon: <Layers   className="w-5 h-5" strokeWidth={1.8} /> },
];

const ADDONS: { id: AddOn; label: string; desc: string; icon: React.ReactNode }[] = [
  { id: "gutter-cleaning", label: "Gutter Cleaning",  desc: "Debris removal & flush test",   icon: <Droplets className="w-4 h-4" strokeWidth={1.8} /> },
  { id: "tracks",          label: "Track Cleaning",   desc: "Deep-clean window tracks",       icon: <Layers   className="w-4 h-4" strokeWidth={1.8} /> },
  { id: "screens",         label: "Screen Detailing", desc: "Remove, clean & reinstall",      icon: <Eye      className="w-4 h-4" strokeWidth={1.8} /> },
];

interface FormState {
  zip:      string;
  scope:    Scope;
  coverage: Coverage;
  addOns:   Set<AddOn>;
  floors:   string;
  name:     string;
  email:    string;
  phone:    string;
  notes:    string;
}

const INIT: FormState = {
  zip: "", scope: "residential", coverage: "both",
  addOns: new Set(), floors: "1",
  name: "", email: "", phone: "", notes: "",
};

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-brand-muted mb-3">{children}</p>;
}
function Divider() {
  return <div className="h-px bg-sky-100 my-7" aria-hidden="true" />;
}

export default function WindowCleaningForm() {
  const [form, setForm]       = useState<FormState>(INIT);
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  const set = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: value })), []);

  const toggleAddon = useCallback((key: AddOn) => {
    setForm(prev => {
      const next = new Set(prev.addOns);
      next.has(key) ? next.delete(key) : next.add(key);
      return { ...prev, addOns: next };
    });
  }, []);

  const scopeLabel    = form.scope    === "residential" ? "Residential" : "Commercial";
  const coverageLabel = COVERAGES.find(c => c.id === form.coverage)?.label ?? "";

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSending(true); setError("");

    const selectedAddons = ADDONS.filter(a => form.addOns.has(a.id));
    const message = [
      `Service: Window Cleaning`,
      `Postal Code: ${form.zip || "Not provided"}`,
      `Property Type: ${scopeLabel}`,
      `Coverage: ${coverageLabel}`,
      `Storeys / Floors: ${form.floors}`,
      selectedAddons.length ? `Add-Ons: ${selectedAddons.map(a => a.label).join(", ")}` : "",
      form.notes ? `Notes: ${form.notes}` : "",
    ].filter(Boolean).join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, service: "Window Cleaning", message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send. Please call us at +1 431 816 4106.");
    } finally { setSending(false); }
  }, [form, scopeLabel, coverageLabel]);

  // ── Success ────────────────────────────────────────────────────────────────
  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-16 px-6 gap-6 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <div>
          <h3 className="font-display font-bold text-2xl text-brand-ink mb-2">Request Sent!</h3>
          <p className="font-body text-brand-muted leading-relaxed text-sm max-w-xs mx-auto">
            We&apos;ve received your window cleaning inquiry and will be in touch with a quote shortly.
          </p>
        </div>
        <a href="tel:+14318164106" className="btn-sky px-8 py-3.5">
          <Phone className="w-4 h-4" /> Call to Confirm Faster
        </a>
        <button onClick={() => { setSent(false); setForm(INIT); }}
          className="font-body text-sm text-brand-muted hover:text-brand-ink transition-colors cursor-pointer">
          Start a new request
        </button>
      </motion.div>
    );
  }

  // ── 2-column layout ────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate
      className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">

      {/* ══ LEFT ════════════════════════════════════════════════════════════ */}
      <div className="space-y-0">

        {/* 1. Location */}
        <section aria-labelledby="wc-zip">
          <h2 id="wc-zip" className="font-display font-bold text-lg text-brand-ink mb-5">Your Location</h2>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle pointer-events-none" />
            <input type="text" value={form.zip} onChange={e => set("zip", e.target.value.slice(0, 7))}
              placeholder="Postal code (e.g. R2C 1A1)" maxLength={7} className="input-field pl-10 w-full max-w-xs" aria-label="Postal code" />
          </div>
        </section>

        <Divider />

        {/* 2. Property scope */}
        <section aria-labelledby="wc-scope">
          <h2 id="wc-scope" className="font-display font-bold text-lg text-brand-ink mb-5">Property Type</h2>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {[
              { id: "residential" as Scope, label: "Residential", icon: <Home     className="w-5 h-5" strokeWidth={1.8} /> },
              { id: "commercial"  as Scope, label: "Commercial",  icon: <Building2 className="w-5 h-5" strokeWidth={1.8} /> },
            ].map(({ id, label, icon }) => {
              const isActive = form.scope === id;
              return (
                <button key={id} type="button" onClick={() => set("scope", id)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-[1.5px] transition-all cursor-pointer
                    ${isActive ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]" : "border-brand-border bg-white hover:border-sky-300 hover:bg-sky-50/50"}`}
                  aria-pressed={isActive}>
                  <span className={isActive ? "text-sky-500" : "text-sky-400"}>{icon}</span>
                  <span className={`font-display font-semibold text-[0.9375rem] ${isActive ? "text-sky-700" : "text-brand-ink"}`}>{label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* 3. Coverage */}
        <section aria-labelledby="wc-coverage">
          <h2 id="wc-coverage" className="font-display font-bold text-lg text-brand-ink mb-5">Interior / Exterior</h2>
          <div className="grid grid-cols-3 gap-3">
            {COVERAGES.map(({ id, label, desc, icon }) => {
              const isActive = form.coverage === id;
              return (
                <button key={id} type="button" onClick={() => set("coverage", id)}
                  className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl border-[1.5px] text-center transition-all cursor-pointer
                    ${isActive ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]" : "border-brand-border bg-white hover:border-sky-300 hover:bg-sky-50/50"}`}
                  aria-pressed={isActive}>
                  <span className={isActive ? "text-sky-500" : "text-sky-400"}>{icon}</span>
                  <span className={`font-display font-bold text-[0.8125rem] leading-tight ${isActive ? "text-sky-700" : "text-brand-ink"}`}>{label}</span>
                  <span className="font-body text-[10px] text-brand-muted leading-tight">{desc}</span>
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* 4. Floors */}
        <section aria-labelledby="wc-floors">
          <h2 id="wc-floors" className="font-display font-bold text-lg text-brand-ink mb-5">Number of Storeys</h2>
          <div className="flex gap-2.5 flex-wrap">
            {["1", "2", "3", "4+"].map(fl => {
              const isActive = form.floors === fl;
              return (
                <button key={fl} type="button" onClick={() => set("floors", fl)}
                  className={`w-14 h-14 rounded-xl border-[1.5px] font-display font-bold text-lg transition-all cursor-pointer
                    ${isActive ? "border-sky-500 bg-sky-50 text-sky-700 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]" : "border-brand-border bg-white text-brand-ink hover:border-sky-300 hover:bg-sky-50/50"}`}
                  aria-pressed={isActive}>
                  {fl}
                </button>
              );
            })}
          </div>
          <p className="font-body text-xs text-brand-muted mt-2.5 pl-1">Helps us send the right team and equipment</p>
        </section>

        <Divider />

        {/* 5. Add-ons */}
        <section aria-labelledby="wc-addons">
          <h2 id="wc-addons" className="font-display font-bold text-lg text-brand-ink mb-1.5">Add-Ons</h2>
          <p className="font-body text-sm text-brand-muted mb-5">
            Gutter cleaning is available as an add-on alongside your window service.
          </p>
          <div className="space-y-2.5">
            {ADDONS.map(addon => {
              const isOn = form.addOns.has(addon.id);
              return (
                <button key={addon.id} type="button" onClick={() => toggleAddon(addon.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-[1.5px] text-left transition-all cursor-pointer
                    ${isOn ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]" : "border-brand-border bg-white hover:border-sky-300 hover:bg-sky-50/50"}`}
                  aria-pressed={isOn}>
                  {/* Checkbox */}
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${isOn ? "bg-sky-500 border-sky-500" : "border-brand-border-strong bg-white"}`}>
                    {isOn && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isOn ? "bg-sky-500 text-white" : "bg-sky-100 text-sky-600"}`}>
                    {addon.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`font-display font-semibold text-[0.9375rem] ${isOn ? "text-sky-700" : "text-brand-ink"}`}>{addon.label}</p>
                    <p className="font-body text-xs text-brand-muted mt-0.5">{addon.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* 6. Contact details */}
        <section aria-labelledby="wc-contact">
          <h2 id="wc-contact" className="font-display font-bold text-lg text-brand-ink mb-5">Your Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div><Label>Full Name *</Label>
              <input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith" required autoComplete="name" className="input-field" />
            </div>
            <div><Label>Email Address *</Label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@example.com" required autoComplete="email" className="input-field" />
            </div>
          </div>
          <div className="mb-4">
            <Label>Phone Number</Label>
            <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+1 (204) 555-0123" autoComplete="tel" className="input-field max-w-xs" />
          </div>
          <div>
            <Label>Notes / Special Requests</Label>
            <textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={3} className="input-field resize-none"
              placeholder="Hard-to-reach areas, access instructions, number of windows, preferred date…" />
          </div>
        </section>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mt-2" role="alert">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="font-body text-sm text-red-600">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile submit */}
        <div className="pt-2 lg:hidden">
          <button type="submit" disabled={sending || !form.name || !form.email}
            className="btn-sky w-full py-4 text-base disabled:opacity-55 disabled:cursor-not-allowed">
            {sending ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Send My Request</>}
          </button>
        </div>
      </div>

      {/* ══ RIGHT — sticky summary ═══════════════════════════════════════════ */}
      <aside className="hidden lg:block" aria-label="Request summary">
        <div className="sticky top-28 space-y-4">
          <div className="rounded-2xl border border-sky-200 bg-white shadow-[0_8px_40px_rgba(14,165,233,0.10)] overflow-hidden">

            {/* Header */}
            <div className="px-6 py-5" style={{ background: "linear-gradient(135deg,#0369A1,#0EA5E9)" }}>
              <p className="font-body text-sky-200 text-[10px] font-bold uppercase tracking-widest mb-1">Your Request</p>
              <p className="font-display font-bold text-white text-lg">Window Cleaning</p>
            </div>

            {/* Detail rows */}
            <div className="px-6 py-5 space-y-3.5">
              <div className="flex items-center gap-2.5">
                {form.scope === "residential"
                  ? <Home     className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
                  : <Building2 className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />}
                <span className="font-body text-sm text-brand-body">{scopeLabel}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
                <span className="font-body text-sm text-brand-body">{coverageLabel}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded bg-sky-100 text-sky-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{form.floors}</span>
                <span className="font-body text-sm text-brand-body">{form.floors === "4+" ? "4+ storeys" : `${form.floors} ${form.floors === "1" ? "storey" : "storeys"}`}</span>
              </div>
              {[...form.addOns].map(key => {
                const a = ADDONS.find(ad => ad.id === key)!;
                return (
                  <div key={key} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 flex items-center justify-center text-sky-400 flex-shrink-0">{a.icon}</div>
                    <span className="font-body text-sm text-brand-body">{a.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="h-px bg-sky-100 mx-6" />

            {/* Quote note */}
            <div className="mx-4 my-4 rounded-xl px-5 py-4 text-center" style={{ background: "linear-gradient(135deg,#F0F9FF,#E0F2FE)" }}>
              <p className="font-body text-xs font-bold uppercase tracking-widest text-sky-500 mb-1">Free Quote</p>
              <p className="font-display font-bold text-sky-800 text-lg">We&apos;ll confirm pricing</p>
              <p className="font-body text-xs text-brand-muted mt-1">Streak-free guarantee on every clean</p>
            </div>

            {/* Submit */}
            <div className="px-4 pb-5">
              <button type="submit" disabled={sending || !form.name || !form.email}
                className="btn-sky w-full py-4 text-[0.9375rem] disabled:opacity-55 disabled:cursor-not-allowed">
                {sending
                  ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
                  : <><Send className="w-4 h-4" /> Send Request <ChevronRight className="w-4 h-4 ml-auto opacity-60" /></>}
              </button>
              <p className="font-body text-center text-[11px] text-brand-subtle mt-3">
                We respond within a few hours.<br />No charge until service is complete.
              </p>
            </div>
          </div>

          {/* Trust strip */}
          <div className="rounded-xl border border-sky-100 bg-sky-50 px-5 py-4 space-y-2.5">
            {["Streak-free guarantee", "Fully insured & bonded", "Eco-friendly solutions"].map(t => (
              <div key={t} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" strokeWidth={2} />
                <span className="font-body text-sm text-sky-800">{t}</span>
              </div>
            ))}
          </div>

          <a href="tel:+14318164106"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-brand-border bg-white hover:border-sky-300 hover:bg-sky-50 text-brand-body hover:text-sky-700 font-body text-sm font-medium transition-all duration-200">
            Prefer to call? +1 431 816 4106
          </a>
        </div>
      </aside>
    </form>
  );
}
