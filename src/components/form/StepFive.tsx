"use client";

// ─────────────────────────────────────────────────────────────────────────────
// StepFive — Review, Instant Estimate & Submission
//
// PRICING DISPLAY:
//   • "Instant Estimate" card — large bold sky-blue price, animated on mount
//   • Full price breakdown showing every line item
//   • Disclaimer: "*Final price may vary after inspection"
//   • If no price calculated (non-window service), shows "Contact for quote"
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import {
  getPriceBreakdown,
  BASE_PRICES,
  COVERAGE_ADJUSTMENT,
  ADDON_PRICES,
  SIZE_LABELS,
  COVERAGE_LABELS,
  type PropertySize,
  type ServiceCoverage,
} from "@/lib/pricing";
import type { QuoteFormData } from "@/components/MultiStepForm";

interface Props {
  form:        QuoteFormData;
  updateField: <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => void;
  onBack:      () => void;
  onSubmit:    () => void;
  submitting:  boolean;
  submitError: string;
}

export default function StepFive({
  form, updateField, onBack, onSubmit, submitting, submitError,
}: Props) {
  const [agreed, setAgreed] = useState(false);

  // ── Animated count-up for the price number ──────────────────────────────────
  // Counts from 0 → totalPrice over ~600 ms using requestAnimationFrame.
  // Gives the estimate card a satisfying "reveal" feel on mount.
  const [displayedPrice, setDisplayedPrice] = useState(0);

  useEffect(() => {
    const target = form.totalPrice ?? 0;
    if (target === 0) { setDisplayedPrice(0); return; }

    const duration  = 600;           // ms
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a snappy feel
      const eased    = 1 - Math.pow(1 - progress, 3);
      setDisplayedPrice(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [form.totalPrice]);
  // ────────────────────────────────────────────────────────────────────────────

  const breakdown = form.size
    ? getPriceBreakdown(form.size, form.coverage, form.addOns)
    : [];

  const hasPrice = form.totalPrice != null;

  return (
    <div className="space-y-7">
      <div>
        <h2 className="font-display font-bold text-xl text-brand-ink mb-1">
          Review your quote
        </h2>
        <p className="font-body text-sm text-brand-muted">
          Double-check everything before we send your request.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          INSTANT ESTIMATE CARD — Primary pricing UI element
          Requirement: Large bold text, highlighted blue, animated
      ══════════════════════════════════════════════════════════════════════ */}
      {hasPrice ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(14,165,233,0.18)] border border-sky-200"
        >
          {/* Top: price display */}
          <div
            className="px-6 py-6 text-center"
            style={{ background: "linear-gradient(135deg,#0369A1 0%,#0EA5E9 60%,#38BDF8 100%)" }}
          >
            {/* Label */}
            <p className="font-body text-sky-200 text-xs font-bold uppercase tracking-widest mb-3">
              Instant Estimate
            </p>

            {/* Animated count-up price number */}
            <motion.p
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black leading-none text-white"
              style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)" }}
              aria-live="polite"
              aria-label={`Instant estimate: $${form.totalPrice}`}
            >
              ${displayedPrice}
            </motion.p>

            {/* Disclaimer */}
            <p className="font-body text-sky-200 text-[11px] mt-3">
              *Final price may vary after inspection
            </p>
          </div>

          {/* Bottom: itemised breakdown */}
          {breakdown.length > 0 && (
            <div className="bg-white px-5 py-4">
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-3">
                Price Breakdown
              </p>
              <div className="space-y-2">
                {breakdown.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          item.type === "base"     ? "bg-sky-500" :
                          item.type === "coverage" ? "bg-violet-400" :
                                                     "bg-amber-400"
                        }`}
                      />
                      <span className="font-body text-sm text-brand-body">{item.label}</span>
                    </div>
                    <span className="font-display font-semibold text-sm text-brand-ink">
                      {item.type === "base" ? "" : "+"}${item.amount}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-sky-100 flex justify-between">
                <span className="font-display font-bold text-sm text-brand-ink">Total Estimate</span>
                <span className="font-display font-black text-sky-600 text-base">${displayedPrice}</span>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        /* Fallback when no price (non-pricing service selected) */
        <div className="rounded-2xl border border-brand-border bg-sky-50 px-6 py-5 text-center">
          <p className="font-body text-xs font-bold uppercase tracking-widest text-sky-500 mb-1">
            Instant Estimate
          </p>
          <p className="font-display font-bold text-xl text-brand-ink">
            Contact us for a quote
          </p>
          <p className="font-body text-xs text-brand-muted mt-1">
            We&apos;ll confirm pricing when we call you back
          </p>
        </div>
      )}

      {/* ── Booking summary ── */}
      <div className="rounded-xl border border-brand-border bg-brand-surface overflow-hidden">
        <p className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-muted px-4 pt-3.5 pb-2">
          Your Details
        </p>
        <div className="divide-y divide-brand-border">
          {[
            { label: "Name",     value: form.name },
            { label: "Email",    value: form.email },
            { label: "Phone",    value: form.phone || "—" },
            { label: "Service",  value: form.service },
            form.size ? {
              label: "Property",
              value: SIZE_LABELS[form.size as Exclude<PropertySize, "">],
            } : null,
            form.coverage ? {
              label: "Coverage",
              value: COVERAGE_LABELS[form.coverage as Exclude<ServiceCoverage, "">],
            } : null,
            form.addOns.size > 0 ? {
              label: "Add-Ons",
              value: [...form.addOns].map((k) =>
                k === "tracks" ? "Track Cleaning" : "Screen Detailing"
              ).join(", "),
            } : null,
          ]
            .filter(Boolean)
            .map((row) => (
              <div key={row!.label} className="flex gap-3 px-4 py-2.5">
                <span className="font-body text-xs text-brand-muted w-20 flex-shrink-0 pt-0.5">
                  {row!.label}
                </span>
                <span className="font-body text-sm text-brand-ink font-medium flex-1">
                  {row!.value}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* ── Notes ── */}
      <div>
        <label htmlFor="step5-notes" className="block font-body text-xs font-semibold text-brand-ink uppercase tracking-wider mb-2">
          Additional Notes{" "}
          <span className="text-brand-subtle normal-case font-normal tracking-normal">(optional)</span>
        </label>
        <textarea
          id="step5-notes"
          rows={3}
          value={form.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          placeholder="Preferred date, access instructions, special requests…"
          className="input-field resize-none"
        />
      </div>

      {/* ── Agreement ── */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <div
          onClick={() => setAgreed((a) => !a)}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all cursor-pointer
            ${agreed ? "bg-sky-500 border-sky-500" : "border-brand-border-strong bg-white group-hover:border-sky-400"}`}
        >
          {agreed && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className="font-body text-sm text-brand-muted leading-snug">
          I agree to be contacted by RiseClear regarding my quote request. No spam — ever.
        </span>
      </label>

      {/* ── Error ── */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
          role="alert"
        >
          <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-body text-sm text-red-600">{submitError}</p>
        </motion.div>
      )}

      {/* ── Nav ── */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={submitting}
          className="btn-sky-outline flex-1 py-3.5 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!agreed || submitting}
          className="btn-sky flex-[2] py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Submit quote request"
        >
          {submitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
          ) : (
            <><Send className="w-4 h-4" /> Send Quote Request</>
          )}
        </button>
      </div>

      <p className="font-body text-center text-xs text-brand-subtle">
        We typically respond within a few hours. You&apos;ll receive an email confirmation.
      </p>
    </div>
  );
}
