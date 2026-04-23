"use client";

/**
 * HouseCleaningBooking.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Single-page booking UI for house cleaning with a live pricing summary.
 *
 * Layout:
 *   LEFT  — All form inputs (zip, frequency, rooms, partial flag, extras)
 *   RIGHT — Sticky booking summary card with real-time total
 *
 * Pricing logic (from src/lib/pricing.ts — unchanged):
 *   base       = (bedrooms × $35) + (bathrooms × $25)
 *   extrasTotal = selected extras sum
 *   discount    = 10% weekly | 5% biweekly | 0% otherwise
 *   total       = (base + extrasTotal) × (1 − discount)
 *
 * Backend: POST /api/contact — existing route, shape unchanged.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Minus, Plus, CheckCircle2,
  Loader2, Send, Check, AlertCircle,
  Refrigerator, Flame, AppWindowMac,
  Calendar, Home, Bath, BedDouble,
  Tag, ChevronRight,
} from "lucide-react";
import {
  CLEANING_FREQUENCIES,
  CLEANING_EXTRAS,
  BEDROOM_RATE,
  BATHROOM_RATE,
  calculateCleaningPrice,
  type CleaningFrequency,
  type CleaningExtraKey,
} from "@/lib/pricing";

// ── Icon map (Lucide) keyed to extra id ──────────────────────────────────────
const EXTRA_ICONS: Record<CleaningExtraKey, React.ReactNode> = {
  "fridge":           <Refrigerator  className="w-5 h-5" strokeWidth={1.8} />,
  "oven":             <Flame         className="w-5 h-5" strokeWidth={1.8} />,
  "interior-windows": <AppWindowMac  className="w-5 h-5" strokeWidth={1.8} />,
};

// ── Form state shape ─────────────────────────────────────────────────────────
interface BookingForm {
  zip:       string;
  frequency: CleaningFrequency;
  bedrooms:  number;
  bathrooms: number;
  partial:   boolean;
  extras:    Set<CleaningExtraKey>;
  // Contact
  name:      string;
  email:     string;
  phone:     string;
  notes:     string;
}

const INITIAL: BookingForm = {
  zip:       "",
  frequency: "one-time",
  bedrooms:  2,
  bathrooms: 1,
  partial:   false,
  extras:    new Set(),
  name:      "",
  email:     "",
  phone:     "",
  notes:     "",
};

// ── Small reusable helpers ───────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-brand-muted mb-3">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="h-px bg-sky-100 my-7" aria-hidden="true" />;
}

function Counter({
  label, value, min, max, onChange,
}: {
  label: string; value: number; min: number; max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <span className="font-body text-[0.9375rem] text-brand-ink font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-9 h-9 rounded-xl border-[1.5px] border-brand-border flex items-center justify-center text-brand-muted hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="font-display font-bold text-brand-ink text-lg w-5 text-center select-none">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-9 h-9 rounded-xl border-[1.5px] border-brand-border flex items-center justify-center text-brand-muted hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
          aria-label={`Increase ${label}`}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── Animated price number ────────────────────────────────────────────────────
function AnimatedPrice({ value }: { value: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block tabular-nums"
      >
        ${value.toFixed(2)}
      </motion.span>
    </AnimatePresence>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function HouseCleaningBooking() {
  const [form, setForm]       = useState<BookingForm>(INITIAL);
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  // ── Field helpers ──────────────────────────────────────────────────────────
  const set = useCallback(
    <K extends keyof BookingForm>(key: K, value: BookingForm[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  const toggleExtra = useCallback((key: CleaningExtraKey) => {
    setForm((prev) => {
      const next = new Set(prev.extras);
      next.has(key) ? next.delete(key) : next.add(key);
      return { ...prev, extras: next };
    });
  }, []);

  // ── Live price calculation ─────────────────────────────────────────────────
  const pricing = useMemo(
    () =>
      calculateCleaningPrice({
        bedrooms:  form.bedrooms,
        bathrooms: form.bathrooms,
        frequency: form.frequency,
        extras:    form.extras,
      }),
    [form.bedrooms, form.bathrooms, form.frequency, form.extras]
  );

  const freqLabel =
    CLEANING_FREQUENCIES.find((f) => f.id === form.frequency)?.label ?? "";

  // ── Submit — POSTs to existing /api/contact, shape unchanged ──────────────
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.name || !form.email) return;
      setSending(true);
      setError("");

      const selectedExtras = CLEANING_EXTRAS.filter((ex) =>
        form.extras.has(ex.id)
      );

      const message = [
        `Service: Home Cleaning`,
        `Zip Code: ${form.zip || "Not provided"}`,
        `Frequency: ${freqLabel}`,
        `Bedrooms: ${form.bedrooms}`,
        `Bathrooms: ${form.bathrooms}`,
        form.partial ? `Scope: Partial cleaning only` : `Scope: Full home`,
        selectedExtras.length
          ? `Extras: ${selectedExtras.map((e) => e.label).join(", ")}`
          : "",
        `Base Price: $${pricing.base.toFixed(2)}`,
        selectedExtras.length
          ? `Extras Total: +$${pricing.extrasTotal.toFixed(2)}`
          : "",
        pricing.discount > 0
          ? `Discount (${Math.round(pricing.discount * 100)}%): -$${pricing.discountAmt.toFixed(2)}`
          : "",
        `Estimated Total: $${pricing.total.toFixed(2)}`,
        form.notes ? `Notes: ${form.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      try {
        const res = await fetch("/api/contact", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name:    form.name,
            email:   form.email,
            phone:   form.phone,
            service: "Home Cleaning",
            message,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Server error");
        setSent(true);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to send. Please call us directly at +1 431 816 4106."
        );
      } finally {
        setSending(false);
      }
    },
    [form, freqLabel, pricing]
  );

  // ── Success screen ─────────────────────────────────────────────────────────
  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-16 px-6 gap-6 max-w-md mx-auto"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <div>
          <h3 className="font-display font-bold text-2xl text-brand-ink mb-2">
            Booking Request Sent!
          </h3>
          <p className="font-body text-brand-muted leading-relaxed text-sm">
            We&apos;ve received your home cleaning request and will confirm
            your appointment within a few hours.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-50 border border-sky-200">
            <span className="font-body text-sm text-sky-700">
              Estimated total:{" "}
              <strong className="font-display font-bold text-sky-800">
                ${pricing.total.toFixed(2)}
              </strong>
            </span>
          </div>
        </div>
        <a href="tel:+14318164106" className="btn-sky px-8 py-3.5">
          Call to Confirm Faster
        </a>
        <button
          onClick={() => { setSent(false); setForm(INITIAL); }}
          className="font-body text-sm text-brand-muted hover:text-brand-ink transition-colors cursor-pointer"
        >
          Start a new booking
        </button>
      </motion.div>
    );
  }

  // ── Main 2-column layout ───────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start"
    >
      {/* ════════════════════════════════════════════════════════════════════
          LEFT — Form inputs
      ════════════════════════════════════════════════════════════════════ */}
      <div className="space-y-0">

        {/* ── 1. Zip Code ── */}
        <section aria-labelledby="section-zip">
          <h2 id="section-zip" className="font-display font-bold text-lg text-brand-ink mb-5">
            Your Location
          </h2>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle pointer-events-none" />
            <input
              type="text"
              inputMode="numeric"
              value={form.zip}
              onChange={(e) => set("zip", e.target.value.replace(/\D/g, "").slice(0, 7))}
              placeholder="Postal code (e.g. R2C 1A1)"
              maxLength={7}
              className="input-field pl-10 w-full max-w-xs"
              aria-label="Postal code"
            />
          </div>
        </section>

        <Divider />

        {/* ── 2. Frequency ── */}
        <section aria-labelledby="section-freq">
          <h2 id="section-freq" className="font-display font-bold text-lg text-brand-ink mb-5">
            How Often?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {CLEANING_FREQUENCIES.map((freq) => {
              const isActive = form.frequency === freq.id;
              return (
                <button
                  key={freq.id}
                  type="button"
                  onClick={() => set("frequency", freq.id)}
                  className={`relative flex flex-col items-center gap-1 px-3 py-4 rounded-xl border-[1.5px] transition-all duration-180 cursor-pointer
                    ${isActive
                      ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.12)]"
                      : "border-brand-border bg-white hover:border-sky-300 hover:bg-sky-50/50"
                    }`}
                  aria-pressed={isActive}
                >
                  {freq.discount > 0 && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                      {freq.sublabel}
                    </span>
                  )}
                  <Calendar className={`w-4.5 h-4.5 mt-1 ${isActive ? "text-sky-500" : "text-brand-subtle"}`} strokeWidth={1.8} />
                  <span className={`font-display font-semibold text-[0.8125rem] text-center leading-tight ${isActive ? "text-sky-700" : "text-brand-ink"}`}>
                    {freq.label}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-500" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* ── 3 & 4. Bedrooms + Bathrooms ── */}
        <section aria-labelledby="section-rooms">
          <h2 id="section-rooms" className="font-display font-bold text-lg text-brand-ink mb-5">
            Property Size
          </h2>
          <div className="bg-brand-surface rounded-2xl border border-brand-border divide-y divide-brand-border overflow-hidden">
            <div className="flex items-center gap-4 px-5 py-4">
              <BedDouble className="w-5 h-5 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
              <Counter
                label="Bedrooms"
                value={form.bedrooms}
                min={1}
                max={8}
                onChange={(v) => set("bedrooms", v)}
              />
            </div>
            <div className="flex items-center gap-4 px-5 py-4">
              <Bath className="w-5 h-5 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
              <Counter
                label="Bathrooms"
                value={form.bathrooms}
                min={1}
                max={6}
                onChange={(v) => set("bathrooms", v)}
              />
            </div>
          </div>
          <p className="font-body text-xs text-brand-muted mt-2.5 pl-1">
            Bedroom × $35 &nbsp;·&nbsp; Bathroom × $25
          </p>
        </section>

        <Divider />

        {/* ── 5. Partial cleaning toggle ── */}
        <section>
          <button
            type="button"
            onClick={() => set("partial", !form.partial)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-[1.5px] text-left transition-all duration-180 cursor-pointer
              ${form.partial
                ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]"
                : "border-brand-border bg-white hover:border-sky-300 hover:bg-sky-50/50"
              }`}
            aria-pressed={form.partial}
          >
            {/* Checkbox visual */}
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                ${form.partial ? "bg-sky-500 border-sky-500" : "border-brand-border-strong bg-white"}`}
            >
              {form.partial && (
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-display font-semibold text-[0.9375rem] ${form.partial ? "text-sky-700" : "text-brand-ink"}`}>
                Partial Cleaning Only
              </p>
              <p className="font-body text-xs text-brand-muted mt-0.5">
                Focus on specific rooms or areas — not the full home
              </p>
            </div>
            <Home className={`w-5 h-5 flex-shrink-0 ${form.partial ? "text-sky-400" : "text-brand-subtle"}`} strokeWidth={1.8} />
          </button>
        </section>

        <Divider />

        {/* ── 6. Extras ── */}
        <section aria-labelledby="section-extras">
          <h2 id="section-extras" className="font-display font-bold text-lg text-brand-ink mb-1.5">
            Extras
          </h2>
          <p className="font-body text-sm text-brand-muted mb-5">
            Optional add-ons applied on top of the base price.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CLEANING_EXTRAS.map((extra) => {
              const isOn = form.extras.has(extra.id);
              return (
                <button
                  key={extra.id}
                  type="button"
                  onClick={() => toggleExtra(extra.id)}
                  className={`relative flex flex-col gap-3 p-5 rounded-2xl border-[1.5px] text-left transition-all duration-200 cursor-pointer group
                    ${isOn
                      ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]"
                      : "border-brand-border bg-white hover:border-sky-300 hover:shadow-card"
                    }`}
                  aria-pressed={isOn}
                >
                  {/* Selected indicator */}
                  <div className={`absolute top-3.5 right-3.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${isOn ? "bg-sky-500 border-sky-500" : "border-brand-border group-hover:border-sky-300"}`}>
                    {isOn && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </div>

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                    ${isOn ? "bg-sky-500 text-white" : "bg-sky-100 text-sky-600"}`}>
                    {EXTRA_ICONS[extra.id]}
                  </div>

                  <div className="pr-6">
                    <p className={`font-display font-semibold text-sm leading-tight mb-1 ${isOn ? "text-sky-700" : "text-brand-ink"}`}>
                      {extra.label}
                    </p>
                    <p className="font-body text-xs text-brand-muted leading-snug">
                      {extra.desc}
                    </p>
                  </div>

                  {/* Price tag */}
                  <div className={`inline-flex items-center gap-1 self-start px-2.5 py-1 rounded-full text-[11px] font-bold
                    ${isOn ? "bg-sky-100 text-sky-700" : "bg-brand-surface text-brand-muted"}`}>
                    <Tag className="w-2.5 h-2.5" />
                    +${extra.price}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* ── Contact details ── */}
        <section aria-labelledby="section-contact">
          <h2 id="section-contact" className="font-display font-bold text-lg text-brand-ink mb-5">
            Your Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Full Name *</Label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Jane Smith"
                required
                autoComplete="name"
                className="input-field"
              />
            </div>
            <div>
              <Label>Email Address *</Label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="jane@example.com"
                required
                autoComplete="email"
                className="input-field"
              />
            </div>
          </div>
          <div className="mb-4">
            <Label>Phone Number</Label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+1 (204) 555-0123"
              autoComplete="tel"
              className="input-field max-w-xs"
            />
          </div>
          <div>
            <Label>Notes / Special Requests</Label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              placeholder="Preferred date, access instructions, focus areas…"
              className="input-field resize-none"
            />
          </div>
        </section>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mt-2"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="font-body text-sm text-red-600">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit button (mobile — also appears in summary on desktop) */}
        <div className="pt-2 lg:hidden">
          <button
            type="submit"
            disabled={sending || !form.name || !form.email}
            className="btn-sky w-full py-4 text-base disabled:opacity-55 disabled:cursor-not-allowed"
          >
            {sending
              ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
              : <><Send className="w-4 h-4" /> Confirm Booking — ${pricing.total.toFixed(2)}</>
            }
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          RIGHT — Sticky booking summary
      ════════════════════════════════════════════════════════════════════ */}
      <aside className="hidden lg:block" aria-label="Booking summary">
        <div className="sticky top-28 space-y-4">

          {/* ── Summary card ── */}
          <div className="rounded-2xl border border-sky-200 bg-white shadow-[0_8px_40px_rgba(14,165,233,0.10)] overflow-hidden">

            {/* Card header */}
            <div
              className="px-6 py-5"
              style={{ background: "linear-gradient(135deg,#0369A1,#0EA5E9)" }}
            >
              <p className="font-body text-sky-200 text-[10px] font-bold uppercase tracking-widest mb-1">
                Booking Summary
              </p>
              <p className="font-display font-bold text-white text-lg leading-tight">
                Home Cleaning
              </p>
            </div>

            {/* Detail rows */}
            <div className="px-6 py-5 space-y-3.5">
              {/* Frequency */}
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
                <span className="font-body text-sm text-brand-body flex-1">{freqLabel}</span>
                {pricing.discount > 0 && (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {Math.round(pricing.discount * 100)}% off
                  </span>
                )}
              </div>

              {/* Bedrooms */}
              <div className="flex items-center gap-2.5">
                <BedDouble className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
                <span className="font-body text-sm text-brand-body">
                  {form.bedrooms} bedroom{form.bedrooms !== 1 ? "s" : ""}
                </span>
                <span className="ml-auto font-display font-semibold text-sm text-brand-ink">
                  ${form.bedrooms * BEDROOM_RATE}
                </span>
              </div>

              {/* Bathrooms */}
              <div className="flex items-center gap-2.5">
                <Bath className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
                <span className="font-body text-sm text-brand-body">
                  {form.bathrooms} bathroom{form.bathrooms !== 1 ? "s" : ""}
                </span>
                <span className="ml-auto font-display font-semibold text-sm text-brand-ink">
                  ${form.bathrooms * BATHROOM_RATE}
                </span>
              </div>

              {/* Partial flag */}
              {form.partial && (
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.8} />
                  <span className="font-body text-sm text-brand-body">Partial cleaning</span>
                </div>
              )}

              {/* Extras */}
              {[...form.extras].map((key) => {
                const ex = CLEANING_EXTRAS.find((e) => e.id === key)!;
                return (
                  <div key={key} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 flex items-center justify-center text-sky-400 flex-shrink-0">
                      {EXTRA_ICONS[key]}
                    </div>
                    <span className="font-body text-sm text-brand-body flex-1">{ex.label}</span>
                    <span className="font-display font-semibold text-sm text-brand-ink">+${ex.price}</span>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-px bg-sky-100 mx-6" />

            {/* Price breakdown */}
            <div className="px-6 py-4 space-y-2">
              <div className="flex justify-between font-body text-sm">
                <span className="text-brand-muted">Subtotal</span>
                <span className="text-brand-ink font-medium">
                  ${(pricing.base + pricing.extrasTotal).toFixed(2)}
                </span>
              </div>
              {pricing.discount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex justify-between font-body text-sm"
                >
                  <span className="text-emerald-600">
                    {Math.round(pricing.discount * 100)}% recurring discount
                  </span>
                  <span className="text-emerald-600 font-medium">
                    −${pricing.discountAmt.toFixed(2)}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Total */}
            <div
              className="mx-4 mb-4 rounded-xl px-5 py-4 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg,#F0F9FF,#E0F2FE)" }}
            >
              <div>
                <p className="font-body text-[10px] font-bold uppercase tracking-widest text-sky-500 mb-0.5">
                  Total Estimate
                </p>
                <p className="font-body text-[10px] text-brand-muted">
                  *Final price confirmed on-site
                </p>
              </div>
              <p
                className="font-display font-black text-sky-700"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}
                aria-live="polite"
                aria-label={`Total: $${pricing.total.toFixed(2)}`}
              >
                <AnimatedPrice value={pricing.total} />
              </p>
            </div>

            {/* Submit button */}
            <div className="px-4 pb-5">
              <button
                type="submit"
                disabled={sending || !form.name || !form.email}
                className="btn-sky w-full py-4 text-[0.9375rem] disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Confirm Booking
                    <ChevronRight className="w-4 h-4 ml-auto opacity-60" />
                  </>
                )}
              </button>
              <p className="font-body text-center text-[11px] text-brand-subtle mt-3">
                We&apos;ll confirm within a few hours.
                <br />No charge until service is complete.
              </p>
            </div>
          </div>

          {/* Trust mini-strip */}
          <div className="rounded-xl border border-sky-100 bg-sky-50 px-5 py-4 space-y-2.5">
            {[
              "Fully insured & bonded",
              "Satisfaction guaranteed",
              "No hidden fees",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" strokeWidth={2} />
                <span className="font-body text-sm text-sky-800">{t}</span>
              </div>
            ))}
          </div>

          {/* Call us */}
          <a
            href="tel:+14318164106"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-brand-border bg-white hover:border-sky-300 hover:bg-sky-50 text-brand-body hover:text-sky-700 font-body text-sm font-medium transition-all duration-200"
          >
            Prefer to call? +1 431 816 4106
          </a>
        </div>
      </aside>
    </form>
  );
}
