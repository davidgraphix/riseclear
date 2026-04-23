"use client";

// ─────────────────────────────────────────────────────────────────────────────
// StepThree — Property Size Selection
//
// PRICING INTEGRATION:
//   • Each size option displays its base price from pricing.ts
//   • Selecting a size calls `updateSize()` in MultiStepForm, which
//     immediately recalculates totalPrice via calculatePrice()
//   • A live "Base price" indicator updates as the user selects
// ─────────────────────────────────────────────────────────────────────────────

import { motion, AnimatePresence } from "framer-motion";
import { BASE_PRICES, type PropertySize } from "@/lib/pricing";
import type { QuoteFormData } from "@/components/MultiStepForm";

interface Props {
  form:        QuoteFormData;
  updateSize:  (size: PropertySize) => void;
  onNext:      () => void;
  onBack:      () => void;
}

const SIZE_OPTIONS: {
  id:     PropertySize;
  label:  string;
  desc:   string;
  detail: string;
  icon:   React.ReactNode;
}[] = [
  {
    id:     "small",
    label:  "Small Home",
    desc:   "Up to 10 windows",
    detail: "Townhouse, condo, or small detached home",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
      </svg>
    ),
  },
  {
    id:     "medium",
    label:  "Medium Home",
    desc:   "11–20 windows",
    detail: "Standard single-family home",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
        <rect x="9" y="14" width="2" height="2" rx="0.3" strokeWidth={1.5}/>
        <rect x="13" y="14" width="2" height="2" rx="0.3" strokeWidth={1.5}/>
      </svg>
    ),
  },
  {
    id:     "large",
    label:  "Large Home",
    desc:   "21+ windows",
    detail: "Large or multi-storey home",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="6" width="18" height="15" rx="1"/>
        <path strokeLinecap="round" d="M3 10h18M8 6V4M16 6V4"/>
        <rect x="7" y="13" width="3" height="4" rx="0.3" strokeWidth={1.5}/>
        <rect x="14" y="13" width="3" height="4" rx="0.3" strokeWidth={1.5}/>
      </svg>
    ),
  },
];

export default function StepThree({ form, updateSize, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-xl text-brand-ink mb-1">
          How big is your property?
        </h2>
        <p className="font-body text-sm text-brand-muted">
          This sets your base price. Add-ons are selected next.
        </p>
      </div>

      {/* Size cards */}
      <div className="space-y-3">
        {SIZE_OPTIONS.map((opt) => {
          const isSelected = form.size === opt.id;
          const price      = BASE_PRICES[opt.id as Exclude<PropertySize, "">];

          return (
            <motion.button
              key={opt.id}
              type="button"
              whileTap={{ scale: 0.99 }}
              onClick={() => updateSize(opt.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border-[1.5px] text-left transition-all duration-180 cursor-pointer
                ${isSelected
                  ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]"
                  : "border-brand-border bg-white hover:border-sky-200 hover:bg-sky-50/40"
                }`}
              aria-pressed={isSelected}
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors
                ${isSelected ? "bg-sky-500 text-white" : "bg-sky-100 text-sky-600"}`}>
                {opt.icon}
              </div>

              {/* Labels */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-display font-bold text-[0.9375rem] ${isSelected ? "text-sky-700" : "text-brand-ink"}`}>
                    {opt.label}
                  </span>
                  <span className="font-body text-xs text-brand-muted">{opt.desc}</span>
                </div>
                <p className="font-body text-xs text-brand-subtle mt-0.5">{opt.detail}</p>
              </div>

              {/* Price badge */}
              <div className={`flex-shrink-0 text-right transition-colors ${isSelected ? "text-sky-600" : "text-brand-muted"}`}>
                <p className={`font-display font-bold text-lg leading-none ${isSelected ? "text-sky-600" : "text-brand-ink"}`}>
                  ${price}
                </p>
                <p className="font-body text-[10px] mt-0.5">base price</p>
              </div>

              {/* Check */}
              {isSelected && (
                <svg className="w-5 h-5 text-sky-500 flex-shrink-0 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Live base price indicator */}
      <AnimatePresence>
        {form.size && (
          <motion.div
            key="base-indicator"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-sky-50 border border-sky-200"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0" />
            <span className="font-body text-sm text-sky-700">
              Base price set to{" "}
              <strong className="font-display font-bold">
                ${BASE_PRICES[form.size as Exclude<PropertySize, "">]}
              </strong>
              {" "}— add-ons apply next
            </span>
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
          disabled={!form.size}
          className="btn-sky flex-[2] py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
