import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, Shield, Star, Clock } from "lucide-react";
import MultiStepForm from "@/components/MultiStepForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Get a Free Quote | RiseClear Property Services",
  description:
    "Get an instant estimate for window cleaning, gutter cleaning, pressure washing and more in Winnipeg, MB. Fast, transparent pricing — no hidden fees.",
  alternates: { canonical: "https://risecleaning.ca/quote" },
};

const TRUST_ITEMS = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Star,   label: "5.0 Rated"    },
  { icon: Clock,  label: "Fast Response" },
];

export default function QuotePage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(150deg, #0369A1 0%, #0EA5E9 55%, #38BDF8 100%)" }}
    >
      {/* ── Top bar ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-6 pb-0">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sky-100 hover:text-white transition-colors text-sm font-medium font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <a
            href="tel:+14318164106"
            className="flex items-center gap-2 text-sky-100 hover:text-white transition-colors text-sm font-medium font-body"
            aria-label="Call RiseClear"
          >
            <Phone className="w-4 h-4" />
            +1 431 816 4106
          </a>
        </div>
      </div>

      {/* ── Page header ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-10 pb-8 text-center">
        {/* Logo wordmark */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
                          <Image src="/riseclear-logo.png" alt="RiseClear Logo" width={40} height={40} />
          
          <span
            className="font-bold text-white text-lg tracking-tight"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Rise<span style={{ color: "#BAE6FD" }}>Clear</span>
          </span>
        </div>

        <h1
          className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-3"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Get Your Instant Estimate
        </h1>
        <p className="text-sky-100 text-[1rem] max-w-md mx-auto font-body leading-relaxed">
          Answer 5 quick questions and see your price in seconds.
          No obligation, no spam — just a fast, transparent quote.
        </p>

        {/* Trust row */}
        <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-sky-100 text-sm font-body">
              <Icon className="w-3.5 h-3.5 text-sky-200" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Form card ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg pb-16">
        <div className="bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.22),0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden">
          <MultiStepForm />
        </div>

        {/* Bottom trust note */}
        <p className="text-center text-sky-200 text-xs mt-5 font-body">
          🔒 Your information is never shared. We respond within a few hours.
        </p>
      </div>
    </div>
  );
}
