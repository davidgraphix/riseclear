"use client";

import { User, Mail, Phone } from "lucide-react";
import type { QuoteFormData } from "@/components/MultiStepForm";

interface Props {
  form:        QuoteFormData;
  updateField: <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => void;
  onNext:      () => void;
}

export default function StepOne({ form, updateField, onNext }: Props) {
  const isValid = form.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display font-bold text-xl text-brand-ink mb-1">
          Let&apos;s start with you
        </h2>
        <p className="font-body text-sm text-brand-muted leading-relaxed">
          We&apos;ll use this to send your quote confirmation.
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="step1-name" className="block font-body text-xs font-semibold text-brand-ink uppercase tracking-wider mb-2">
            Full Name <span className="text-sky-500 normal-case font-normal">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle pointer-events-none" />
            <input
              id="step1-name"
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Jane Smith"
              autoComplete="name"
              required
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="step1-email" className="block font-body text-xs font-semibold text-brand-ink uppercase tracking-wider mb-2">
            Email Address <span className="text-sky-500 normal-case font-normal">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle pointer-events-none" />
            <input
              id="step1-email"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="jane@example.com"
              autoComplete="email"
              required
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="step1-phone" className="block font-body text-xs font-semibold text-brand-ink uppercase tracking-wider mb-2">
            Phone Number{" "}
            <span className="text-brand-subtle normal-case font-normal tracking-normal">
              (optional)
            </span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle pointer-events-none" />
            <input
              id="step1-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+1 (204) 555-0123"
              autoComplete="tel"
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={onNext}
        disabled={!isValid}
        className="btn-sky w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Continue to next step"
      >
        Continue
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
