"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepOne   from "./form/StepOne";
import StepTwo   from "./form/StepTwo";
import StepThree from "./form/StepThree";
import StepFour  from "./form/StepFour";
import StepFive  from "./form/StepFive";
import { calculatePrice, type PropertySize, type ServiceCoverage, type AddOnKey } from "@/lib/pricing";

// ─────────────────────────────────────────────────────────────────────────────
// Form state — single source of truth for the entire quote form
// ─────────────────────────────────────────────────────────────────────────────
export interface QuoteFormData {
  // Step 1 — Contact info
  name:     string;
  email:    string;
  phone:    string;
  // Step 2 — Service type
  service:  string;
  // Step 3 — Property size (drives base price)
  size:     PropertySize;
  // Step 4 — Coverage & add-ons (drive adjustments)
  coverage: ServiceCoverage;
  addOns:   Set<AddOnKey>;
  // Step 5 — Notes
  notes:    string;
  // Computed — updated whenever size / coverage / addOns change
  totalPrice: number | null;
}

const INITIAL_STATE: QuoteFormData = {
  name:       "",
  email:      "",
  phone:      "",
  service:    "",
  size:       "",
  coverage:   "",
  addOns:     new Set(),
  notes:      "",
  totalPrice: null,
};

const TOTAL_STEPS = 5;

// Slide animation variants — center must be a plain object (not a function)
// because it never uses the `custom` direction value.
const variants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// ─────────────────────────────────────────────────────────────────────────────
export default function MultiStepForm() {
  const [step, setStep]       = useState(1);
  const [direction, setDir]   = useState(1);
  const [form, setForm]       = useState<QuoteFormData>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ── Generic field updater ──────────────────────────────────────────────────
  const updateField = useCallback(
    <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // ── Pricing-aware updaters (recalculate totalPrice on every relevant change)
  const updateSize = useCallback((size: PropertySize) => {
    setForm((prev) => {
      const next = { ...prev, size };
      next.totalPrice = calculatePrice(size, prev.coverage, prev.addOns);
      return next;
    });
  }, []);

  const updateCoverage = useCallback((coverage: ServiceCoverage) => {
    setForm((prev) => {
      const next = { ...prev, coverage };
      next.totalPrice = calculatePrice(prev.size, coverage, prev.addOns);
      return next;
    });
  }, []);

  const toggleAddOn = useCallback((key: AddOnKey) => {
    setForm((prev) => {
      const addOns = new Set(prev.addOns);
      addOns.has(key) ? addOns.delete(key) : addOns.add(key);
      return {
        ...prev,
        addOns,
        totalPrice: calculatePrice(prev.size, prev.coverage, addOns),
      };
    });
  }, []);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const next = useCallback(() => {
    setDir(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);

  const back = useCallback(() => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  // ── Form submission ────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setSubmitError("");

    const message = [
      `Service: ${form.service}`,
      `Property Size: ${form.size}`,
      `Coverage: ${form.coverage}`,
      `Add-Ons: ${form.addOns.size > 0 ? [...form.addOns].join(", ") : "None"}`,
      form.totalPrice != null ? `Estimated Price: $${form.totalPrice}` : "",
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
          service: form.service,
          message,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Failed to send. Please call us directly at +1 431 816 4106."
      );
    } finally {
      setSubmitting(false);
    }
  }, [form]);

  // ── Progress bar ───────────────────────────────────────────────────────────
  const progress = Math.round((step / TOTAL_STEPS) * 100);

  // ── Success screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-10 px-6 gap-5"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-brand-ink mb-2">Quote Request Sent!</h3>
          <p className="font-body text-sm text-brand-muted max-w-xs mx-auto leading-relaxed">
            We&apos;ve received your request and will be in touch shortly. Check your inbox for a confirmation.
          </p>
          {form.totalPrice != null && (
            <p className="mt-3 font-body text-sm text-sky-600">
              Your estimate was{" "}
              <strong className="font-display font-bold">${form.totalPrice}</strong>
            </p>
          )}
        </div>
        <a href="tel:+14318164106" className="btn-sky text-sm px-6 py-3 mt-2">
          Call +1 431 816 4106
        </a>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* ── Progress bar ── */}
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-xs font-semibold text-sky-600 uppercase tracking-wider">
            Step {step} of {TOTAL_STEPS}
          </span>

          {/* Persistent price pill — visible as soon as a size is selected */}
          <AnimatePresence mode="wait">
            {form.totalPrice != null ? (
              <motion.span
                key={form.totalPrice}
                initial={{ opacity: 0, scale: 0.85, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-black text-sm text-sky-600 bg-sky-100 border border-sky-200 px-2.5 py-1 rounded-full"
                aria-live="polite"
                aria-label={`Current estimate: $${form.totalPrice}`}
              >
                Est. ${form.totalPrice}
              </motion.span>
            ) : (
              <span className="font-body text-xs text-brand-muted">{progress}% complete</span>
            )}
          </AnimatePresence>
        </div>
        <div className="h-1.5 bg-sky-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg,#0EA5E9,#0284C7)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* ── Step content (animated slide) ── */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="px-6 py-7"
          >
            {step === 1 && (
              <StepOne
                form={form}
                updateField={updateField}
                onNext={next}
              />
            )}
            {step === 2 && (
              <StepTwo
                form={form}
                updateField={updateField}
                onNext={next}
                onBack={back}
              />
            )}
            {step === 3 && (
              <StepThree
                form={form}
                updateSize={updateSize}
                onNext={next}
                onBack={back}
              />
            )}
            {step === 4 && (
              <StepFour
                form={form}
                updateCoverage={updateCoverage}
                toggleAddOn={toggleAddOn}
                onNext={next}
                onBack={back}
              />
            )}
            {step === 5 && (
              <StepFive
                form={form}
                updateField={updateField}
                onBack={back}
                onSubmit={handleSubmit}
                submitting={submitting}
                submitError={submitError}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
