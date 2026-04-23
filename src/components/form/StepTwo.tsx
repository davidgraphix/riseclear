"use client";

import { Sparkles, Home, Layers, Wind, MoveHorizontal, Droplets, Lightbulb } from "lucide-react";
import type { QuoteFormData } from "@/components/MultiStepForm";

interface Props {
  form:        QuoteFormData;
  updateField: <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => void;
  onNext:      () => void;
  onBack:      () => void;
}

const SERVICES = [
  { id: "Window Cleaning",            icon: Layers,        popular: true  },
  { id: "Gutter Cleaning",            icon: Droplets,      popular: false },
  { id: "Home Cleaning",              icon: Home,          popular: false },
  { id: "Deep Cleaning",              icon: Sparkles,      popular: false },
  { id: "Pressure Washing",           icon: Wind,          popular: false },
  { id: "Move-In / Move-Out",         icon: MoveHorizontal,popular: true  },
  { id: "LED Light Installation",     icon: Lightbulb,     popular: false },
];

export default function StepTwo({ form, updateField, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-xl text-brand-ink mb-1">
          What service do you need?
        </h2>
        <p className="font-body text-sm text-brand-muted">
          Select the service that best fits your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {SERVICES.map(({ id, icon: Icon, popular }) => (
          <button
            key={id}
            type="button"
            onClick={() => updateField("service", id)}
            className={`flex items-center gap-3.5 w-full text-left px-4 py-3.5 rounded-xl border-[1.5px] transition-all duration-180 cursor-pointer
              ${form.service === id
                ? "border-sky-500 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]"
                : "border-brand-border bg-white hover:border-sky-300 hover:bg-sky-50/50"
              }`}
            aria-pressed={form.service === id}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
              ${form.service === id ? "bg-sky-500" : "bg-sky-100"}`}>
              <Icon className={`w-4.5 h-4.5 ${form.service === id ? "text-white" : "text-sky-600"}`} strokeWidth={1.8} />
            </div>
            <span className={`font-display font-semibold text-[0.9375rem] flex-1 ${form.service === id ? "text-sky-700" : "text-brand-ink"}`}>
              {id}
            </span>
            {popular && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-100 border border-sky-200 px-2 py-0.5 rounded-full flex-shrink-0">
                Popular
              </span>
            )}
            {form.service === id && (
              <svg className="w-4 h-4 text-sky-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            )}
          </button>
        ))}
      </div>

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
          disabled={!form.service}
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
