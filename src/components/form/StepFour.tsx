"use client";

// ─────────────────────────────────────────────────────────────────────────────
// StepFour — Coverage (Interior/Exterior/Both) + Add-Ons
//
// PRICING INTEGRATION:
//   • "Both sides" selection adds +$40 via updateCoverage()
//   • Each add-on toggle adds/removes $25 via toggleAddOn()
//   • Both calls immediately recalculate totalPrice in MultiStepForm
//   • A live running total badge at the bottom shows the current estimate
// ─────────────────────────────────────────────────────────────────────────────

import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Layers } from "lucide-react";
import {
  ADDON_META,
  ADDON_PRICES,
  COVERAGE_ADJUSTMENT,
  BASE_PRICES,
  type ServiceCoverage,
  type AddOnKey,
  type PropertySize,
} from "@/lib/pricing";
import type { QuoteFormData } from "@/components/MultiStepForm";

interface Props {
  form:           QuoteFormData;
  updateCoverage: (coverage: ServiceCoverage) => void;
  toggleAddOn:    (key: AddOnKey) => void;
  onNext:         () => void;
  onBack:         () => void;
}

const COVERAGE_OPTIONS: {
  id:    ServiceCoverage;
  label: string;
  sub:   string;
  icon:  React.ReactNode;
  badge: string | null;
}[] = [
  {
    id:    "exterior",
    label: "Exterior Only",
    sub:   "Outside glass surfaces",
    badge: null,
    icon:  <Eye className="w-5 h-5" strokeWidth={1.8} />,
  },
  {
    id:    "interior",
    label: "Interior Only",
    sub:   "Inside glass surfaces",
    badge: null,
    icon:  <EyeOff className="w-5 h-5" strokeWidth={1.8} />,
  },
  {
    id:    "both",
    label: "Both Sides",
    sub:   "Interior + Exterior",
    badge: `+$${COVERAGE_ADJUSTMENT.both}`,
    icon:  <Layers className="w-5 h-5" strokeWidth={1.8} />,
  },
];

const ADDON_KEYS: AddOnKey[] = ["tracks", "screens"];

export default function StepFour({
  form, updateCoverage, toggleAddOn, onNext, onBack,
}: Props) {
  const isValid = !!form.coverage;

  return (
    <div className="space-y-7">
      <div>
        <h2 className="font-display font-bold text-xl text-brand-ink mb-1">
          Coverage &amp; add-ons
        </h2>
        <p className="font-body text-sm text-brand-muted">
          Choose interior, exterior, or both — then pick any extras.
        </p>
      </div>

      {/* ── Coverage ── */}
      <div>
        <p className="font-body text-xs font-bold uppercase tracking-wider text-brand-ink mb-3 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">A</span>
          Service Coverage
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {COVERAGE_OPTIONS.map(({ id, label, sub, icon, badge }) => {
            const isSelected = form.coverage === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => updateCoverage(id)}
                className={`flex flex-col items-center gap-1.5 px-2 py-4 rounded-xl border-[1.5px] text-center transition-all duration-180 cursor-pointer relative
                  ${isSelected
                    ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]"
                    : "border-brand-border bg-white hover:border-sky-200 hover:bg-sky-50/40"
                  }`}
                aria-pressed={isSelected}
              >
                {badge && (
                  <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {badge}
                  </span>
                )}
                <div className={`transition-colors ${isSelected ? "text-sky-500" : "text-sky-400"}`}>
                  {icon}
                </div>
                <span className={`font-display font-bold text-[0.8rem] leading-tight ${isSelected ? "text-sky-700" : "text-brand-ink"}`}>
                  {label}
                </span>
                <span className="font-body text-[10px] text-brand-muted leading-tight">{sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Add-ons ── */}
      <div>
        <p className="font-body text-xs font-bold uppercase tracking-wider text-brand-ink mb-3 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">B</span>
          Add-Ons
          <span className="font-body text-brand-subtle normal-case tracking-normal font-normal text-[11px]">
            (optional)
          </span>
        </p>
        <div className="space-y-2.5">
          {ADDON_KEYS.map((key) => {
            const isOn = form.addOns.has(key);
            const meta = ADDON_META[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleAddOn(key)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-[1.5px] text-left transition-all duration-180 cursor-pointer
                  ${isOn
                    ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]"
                    : "border-brand-border bg-white hover:border-sky-200 hover:bg-sky-50/40"
                  }`}
                aria-pressed={isOn}
              >
                {/* Checkbox */}
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                  ${isOn ? "bg-sky-500 border-sky-500" : "border-brand-border-strong bg-white"}`}>
                  {isOn && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-display font-semibold text-[0.875rem] ${isOn ? "text-sky-700" : "text-brand-ink"}`}>
                    {meta.label}
                  </p>
                  <p className="font-body text-xs text-brand-muted mt-0.5">{meta.description}</p>
                </div>
                <span className={`font-display font-bold text-sm flex-shrink-0 ${isOn ? "text-sky-600" : "text-brand-muted"}`}>
                  +${ADDON_PRICES[key]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Live running total ── */}
      <AnimatePresence>
        {form.totalPrice != null && (
          <motion.div
            key="live-total"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl overflow-hidden border border-sky-200"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-4 py-3 bg-sky-50">
              <span className="font-body text-xs font-semibold text-sky-600 uppercase tracking-wider">
                Running Total
              </span>
              <motion.span
                key={form.totalPrice}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-display font-black text-xl text-sky-700"
              >
                ${form.totalPrice}
              </motion.span>
            </div>

            {/* Line items */}
            <div className="px-4 py-2 bg-white divide-y divide-sky-50">
              {form.size && (
                <div className="flex justify-between py-1.5 font-body text-xs">
                  <span className="text-brand-muted">
                    {form.size.charAt(0).toUpperCase() + form.size.slice(1)} Home — Base
                  </span>
                  <span className="text-brand-ink font-semibold">
                    ${BASE_PRICES[form.size as Exclude<PropertySize, "">]}
                  </span>
                </div>
              )}
              {form.coverage === "both" && (
                <div className="flex justify-between py-1.5 font-body text-xs">
                  <span className="text-brand-muted">Both Sides</span>
                  <span className="text-brand-ink font-semibold">+${COVERAGE_ADJUSTMENT.both}</span>
                </div>
              )}
              {[...form.addOns].map((key) => (
                <div key={key} className="flex justify-between py-1.5 font-body text-xs">
                  <span className="text-brand-muted">{ADDON_META[key].label}</span>
                  <span className="text-brand-ink font-semibold">+${ADDON_PRICES[key]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <div className="flex gap-3">
        <button onClick={onBack} className="btn-sky-outline flex-1 py-3.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="btn-sky flex-[2] py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review &amp; Submit
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
