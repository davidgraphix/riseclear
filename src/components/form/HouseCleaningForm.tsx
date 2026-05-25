"use client";

/**
 * HouseCleaningForm — Residential Cleaning Inquiry Form
 *
 * 2-column layout:
 *   LEFT  — form inputs (service type, frequency, rooms, extras, contact)
 *   RIGHT — sticky booking summary (no prices, inquiry-based)
 *
 * No pricing calculations. Lead-generation only.
 * Submits to existing POST /api/contact — shape unchanged.
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Minus, Plus, CheckCircle2, Loader2, Send, Check,
  AlertCircle, Calendar, Home, Bath, BedDouble, ChevronRight,
  Refrigerator, Flame, AppWindowMac, Sparkles, ArrowRight,
} from "lucide-react";
import { CLEANING_FREQUENCIES, CLEANING_EXTRAS, type CleaningFrequency, type CleaningExtraKey } from "@/lib/services";

// ── Sub-service types ────────────────────────────────────────────────────────
type ServiceType = "standard" | "deep" | "move";

const SERVICE_TYPES: { id: ServiceType; label: string; desc: string }[] = [
  { id: "standard", label: "Standard Cleaning",    desc: "Regular recurring or one-time home clean" },
  { id: "deep",     label: "Deep Cleaning",         desc: "Intensive top-to-bottom clean of every surface" },
  { id: "move",     label: "Move-In / Move-Out",    desc: "Deposit-ready clean for transitions" },
];

// ── Icon map for extras ──────────────────────────────────────────────────────
const EXTRA_ICONS: Record<CleaningExtraKey, React.ReactNode> = {
  "fridge":           <Refrigerator  className="w-5 h-5" strokeWidth={1.8} />,
  "oven":             <Flame         className="w-5 h-5" strokeWidth={1.8} />,
  "interior-windows": <AppWindowMac  className="w-5 h-5" strokeWidth={1.8} />,
};

// ── Form state ───────────────────────────────────────────────────────────────
interface FormState {
  zip:         string;
  serviceType: ServiceType;
  frequency:   CleaningFrequency;
  bedrooms:    number;
  bathrooms:   number;
  partial:     boolean;
  extras:      Set<CleaningExtraKey>;
  name:        string;
  email:       string;
  phone:       string;
  notes:       string;
}

const INIT: FormState = {
  zip: "", serviceType: "standard", frequency: "one-time",
  bedrooms: 2, bathrooms: 1, partial: false, extras: new Set(),
  name: "", email: "", phone: "", notes: "",
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-brand-muted mb-3">{children}</p>;
}
function Divider() {
  return <div className="h-px bg-sky-100 my-7" aria-hidden="true" />;
}
function Counter({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <span className="font-body text-[0.9375rem] text-brand-ink font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}
          className="w-9 h-9 rounded-xl border-[1.5px] border-brand-border flex items-center justify-center text-brand-muted hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer" aria-label={`Decrease ${label}`}>
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="font-display font-bold text-brand-ink text-lg w-5 text-center select-none">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}
          className="w-9 h-9 rounded-xl border-[1.5px] border-brand-border flex items-center justify-center text-brand-muted hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer" aria-label={`Increase ${label}`}>
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function HouseCleaningForm() {
  const [form, setForm]       = useState<FormState>(INIT);
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  const set = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: value })), []);

  const toggleExtra = useCallback((key: CleaningExtraKey) => {
    setForm(prev => {
      const next = new Set(prev.extras);
      next.has(key) ? next.delete(key) : next.add(key);
      return { ...prev, extras: next };
    });
  }, []);

  const freqLabel = CLEANING_FREQUENCIES.find(f => f.id === form.frequency)?.label ?? "";
  const svcLabel  = SERVICE_TYPES.find(s => s.id === form.serviceType)?.label ?? "";

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSending(true); setError("");

    const extrasList = CLEANING_EXTRAS.filter(ex => form.extras.has(ex.id));
    const message = [
      `Service: Residential Cleaning — ${svcLabel}`,
      `Zip / Postal: ${form.zip || "Not provided"}`,
      `Frequency: ${freqLabel}`,
      `Bedrooms: ${form.bedrooms}`,
      `Bathrooms: ${form.bathrooms}`,
      form.partial ? "Scope: Partial cleaning only" : "Scope: Full home",
      extrasList.length ? `Extras: ${extrasList.map(e => e.label).join(", ")}` : "",
      form.notes ? `Notes: ${form.notes}` : "",
    ].filter(Boolean).join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, service: `Residential Cleaning — ${svcLabel}`, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send. Please call us directly at +1 431 816 4106.");
    } finally { setSending(false); }
  }, [form, freqLabel, svcLabel]);

  // ── Success ──────────────────────────────────────────────────────────────
  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-16 px-6 gap-6 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <div>
          <h3 className="font-display font-bold text-2xl text-brand-ink mb-2">Request Sent!</h3>
          <p className="font-body text-brand-muted leading-relaxed text-sm">We&apos;ve received your cleaning request and will confirm availability within a few hours.</p>
        </div>
        <a href="tel:+14318164106" className="btn-sky px-8 py-3.5">Call to Confirm Faster</a>
        <button onClick={() => { setSent(false); setForm(INIT); }} className="font-body text-sm text-brand-muted hover:text-brand-ink transition-colors cursor-pointer">
          Start a new request
        </button>
      </motion.div>
    );
  }

  // ── 2-column layout ──────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">

      {/* ══ LEFT ══════════════════════════════════════════════════════════ */}
      <div className="space-y-0">

        {/* 1. Service type */}
        <section aria-labelledby="lbl-svc">
          <h2 id="lbl-svc" className="font-display font-bold text-lg text-brand-ink mb-5">What type of clean?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SERVICE_TYPES.map(st => {
              const isActive = form.serviceType === st.id;
              return (
                <button key={st.id} type="button" onClick={() => set("serviceType", st.id)}
                  className={`flex flex-col gap-2 p-4 rounded-xl border-[1.5px] text-left transition-all duration-180 cursor-pointer
                    ${isActive ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]" : "border-brand-border bg-white hover:border-sky-300 hover:bg-sky-50/50"}`}
                  aria-pressed={isActive}>
                  <Sparkles className={`w-5 h-5 ${isActive ? "text-sky-500" : "text-sky-400"}`} strokeWidth={1.8} />
                  <span className={`font-display font-bold text-[0.875rem] ${isActive ? "text-sky-700" : "text-brand-ink"}`}>{st.label}</span>
                  <span className="font-body text-xs text-brand-muted leading-snug">{st.desc}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1" />}
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* 2. Zip */}
        <section aria-labelledby="lbl-zip">
          <h2 id="lbl-zip" className="font-display font-bold text-lg text-brand-ink mb-5">Your Location</h2>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle pointer-events-none" />
            <input type="text" inputMode="text" value={form.zip} onChange={e => set("zip", e.target.value.slice(0, 7))}
              placeholder="Postal code (e.g. R2C 1A1)" maxLength={7} className="input-field pl-10 w-full max-w-xs" aria-label="Postal code" />
          </div>
        </section>

        <Divider />

        {/* 3. Frequency */}
        <section aria-labelledby="lbl-freq">
          <h2 id="lbl-freq" className="font-display font-bold text-lg text-brand-ink mb-5">How Often?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {CLEANING_FREQUENCIES.map(freq => {
              const isActive = form.frequency === freq.id;
              return (
                <button key={freq.id} type="button" onClick={() => set("frequency", freq.id)}
                  className={`relative flex flex-col items-center gap-1.5 px-3 py-4 rounded-xl border-[1.5px] transition-all duration-180 cursor-pointer
                    ${isActive ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.12)]" : "border-brand-border bg-white hover:border-sky-300 hover:bg-sky-50/50"}`}
                  aria-pressed={isActive}>
                  {freq.sublabel && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-sky-500 text-white">
                      {freq.sublabel}
                    </span>
                  )}
                  <Calendar className={`w-4 h-4 mt-1 ${isActive ? "text-sky-500" : "text-brand-subtle"}`} strokeWidth={1.8} />
                  <span className={`font-display font-semibold text-[0.8125rem] text-center leading-tight ${isActive ? "text-sky-700" : "text-brand-ink"}`}>
                    {freq.label}
                  </span>
                  {isActive && <div className="w-1 h-1 rounded-full bg-sky-500" />}
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* 4. Rooms */}
        <section aria-labelledby="lbl-rooms">
          <h2 id="lbl-rooms" className="font-display font-bold text-lg text-brand-ink mb-5">Property Size</h2>
          <div className="bg-brand-surface rounded-2xl border border-brand-border divide-y divide-brand-border overflow-hidden">
            <div className="flex items-center gap-4 px-5 py-4">
              <BedDouble className="w-5 h-5 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
              <Counter label="Bedrooms" value={form.bedrooms} min={1} max={8} onChange={v => set("bedrooms", v)} />
            </div>
            <div className="flex items-center gap-4 px-5 py-4">
              <Bath className="w-5 h-5 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
              <Counter label="Bathrooms" value={form.bathrooms} min={1} max={6} onChange={v => set("bathrooms", v)} />
            </div>
          </div>
        </section>

        <Divider />

        {/* 5. Partial toggle */}
        <section>
          <button type="button" onClick={() => set("partial", !form.partial)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-[1.5px] text-left transition-all duration-180 cursor-pointer
              ${form.partial ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]" : "border-brand-border bg-white hover:border-sky-300 hover:bg-sky-50/50"}`}
            aria-pressed={form.partial}>
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${form.partial ? "bg-sky-500 border-sky-500" : "border-brand-border-strong bg-white"}`}>
              {form.partial && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            <div className="flex-1">
              <p className={`font-display font-semibold text-[0.9375rem] ${form.partial ? "text-sky-700" : "text-brand-ink"}`}>Partial Cleaning Only</p>
              <p className="font-body text-xs text-brand-muted mt-0.5">Focus on specific rooms or areas — not the full home</p>
            </div>
            <Home className={`w-5 h-5 flex-shrink-0 ${form.partial ? "text-sky-400" : "text-brand-subtle"}`} strokeWidth={1.8} />
          </button>
        </section>

        <Divider />

        {/* 6. Extras */}
        <section aria-labelledby="lbl-extras">
          <h2 id="lbl-extras" className="font-display font-bold text-lg text-brand-ink mb-1.5">Extras</h2>
          <p className="font-body text-sm text-brand-muted mb-5">Optional add-ons — let us know what needs extra attention.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CLEANING_EXTRAS.map(extra => {
              const isOn = form.extras.has(extra.id);
              return (
                <button key={extra.id} type="button" onClick={() => toggleExtra(extra.id)}
                  className={`relative flex flex-col gap-3 p-5 rounded-2xl border-[1.5px] text-left transition-all duration-200 cursor-pointer group
                    ${isOn ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]" : "border-brand-border bg-white hover:border-sky-300 hover:shadow-card"}`}
                  aria-pressed={isOn}>
                  <div className={`absolute top-3.5 right-3.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isOn ? "bg-sky-500 border-sky-500" : "border-brand-border group-hover:border-sky-300"}`}>
                    {isOn && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isOn ? "bg-sky-500 text-white" : "bg-sky-100 text-sky-600"}`}>
                    {EXTRA_ICONS[extra.id]}
                  </div>
                  <div className="pr-6">
                    <p className={`font-display font-semibold text-sm leading-tight mb-1 ${isOn ? "text-sky-700" : "text-brand-ink"}`}>{extra.label}</p>
                    <p className="font-body text-xs text-brand-muted leading-snug">{extra.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* 7. Contact */}
        <section aria-labelledby="lbl-contact">
          <h2 id="lbl-contact" className="font-display font-bold text-lg text-brand-ink mb-5">Your Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div><Label>Full Name *</Label><input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith" required autoComplete="name" className="input-field" /></div>
            <div><Label>Email Address *</Label><input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@example.com" required autoComplete="email" className="input-field" /></div>
          </div>
          <div className="mb-4"><Label>Phone Number</Label><input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+1 (204) 555-0123" autoComplete="tel" className="input-field max-w-xs" /></div>
          <div><Label>Notes / Special Requests</Label><textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={3} placeholder="Preferred date, access instructions, focus areas, pets in home…" className="input-field resize-none" /></div>
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
          <button type="submit" disabled={sending || !form.name || !form.email} className="btn-sky w-full py-4 text-base disabled:opacity-55 disabled:cursor-not-allowed">
            {sending ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Send My Request</>}
          </button>
        </div>
      </div>

      {/* ══ RIGHT — sticky summary ═══════════════════════════════════════════ */}
      <aside className="hidden lg:block" aria-label="Booking summary">
        <div className="sticky top-28 space-y-4">
          <div className="rounded-2xl border border-sky-200 bg-white shadow-[0_8px_40px_rgba(14,165,233,0.10)] overflow-hidden">

            {/* Header */}
            <div className="px-6 py-5" style={{ background:"linear-gradient(135deg,#0369A1,#0EA5E9)" }}>
              <p className="font-body text-sky-200 text-[10px] font-bold uppercase tracking-widest mb-1">Your Request</p>
              <p className="font-display font-bold text-white text-lg">Residential Cleaning</p>
            </div>

            {/* Detail rows */}
            <div className="px-6 py-5 space-y-3.5">
              {/* Service type */}
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
                <span className="font-body text-sm text-brand-body flex-1">{svcLabel}</span>
              </div>
              {/* Frequency */}
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
                <span className="font-body text-sm text-brand-body">{freqLabel}</span>
              </div>
              {/* Rooms */}
              <div className="flex items-center gap-2.5">
                <BedDouble className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
                <span className="font-body text-sm text-brand-body">{form.bedrooms} bedroom{form.bedrooms !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Bath className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
                <span className="font-body text-sm text-brand-body">{form.bathrooms} bathroom{form.bathrooms !== 1 ? "s" : ""}</span>
              </div>
              {form.partial && (
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
                  <span className="font-body text-sm text-brand-body">Partial clean</span>
                </div>
              )}
              {[...form.extras].map(key => {
                const ex = CLEANING_EXTRAS.find(e => e.id === key)!;
                return (
                  <div key={key} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 flex items-center justify-center text-sky-400 flex-shrink-0">{EXTRA_ICONS[key]}</div>
                    <span className="font-body text-sm text-brand-body">{ex.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="h-px bg-sky-100 mx-6" />

            {/* Quote note */}
            <div className="mx-4 my-4 rounded-xl px-5 py-4 text-center" style={{ background:"linear-gradient(135deg,#F0F9FF,#E0F2FE)" }}>
              <p className="font-body text-xs font-bold uppercase tracking-widest text-sky-500 mb-1">Free Quote</p>
              <p className="font-display font-bold text-sky-800 text-lg">We&apos;ll confirm pricing</p>
              <p className="font-body text-xs text-brand-muted mt-1">Transparent, no hidden fees</p>
            </div>

            {/* Submit */}
            <div className="px-4 pb-5">
              <button type="submit" disabled={sending || !form.name || !form.email}
                className="btn-sky w-full py-4 text-[0.9375rem] disabled:opacity-55 disabled:cursor-not-allowed">
                {sending ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Send Request <ChevronRight className="w-4 h-4 ml-auto opacity-60" /></>}
              </button>
              <p className="font-body text-center text-[11px] text-brand-subtle mt-3">We respond within a few hours.<br />No charge until service is complete.</p>
            </div>
          </div>

          {/* Trust strip */}
          <div className="rounded-xl border border-sky-100 bg-sky-50 px-5 py-4 space-y-2.5">
            {["Fully insured & bonded","Satisfaction guaranteed","No hidden fees"].map(t => (
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
