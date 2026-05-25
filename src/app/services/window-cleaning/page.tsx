
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, CheckCircle2, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstagramButton from "@/components/InstagramButton";
import WindowCleaningForm from "@/components/form/WindowCleaningForm";

export const metadata: Metadata = {
  title: "Window Cleaning in Winnipeg | RiseClear Property Services",
  description:
    "Professional streak-free window cleaning for homes and businesses in Winnipeg, MB. Interior, exterior, or both. Optional gutter cleaning add-on. Free quotes.",
  alternates: { canonical: "https://risecleaning.ca/services/window-cleaning" },
};

const FEATURES = [
  "Residential & commercial",
  "Interior, exterior, or both sides",
  "Gutter cleaning add-on available",
  "High-reach & multi-storey capable",
  "Eco-friendly solutions",
  "100% streak-free guarantee",
];

export default function WindowCleaningPage() {
  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-sky-50 border-b border-sky-100 pt-[70px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-3.5">
          <div className="flex items-center gap-2 font-body text-sm text-brand-muted flex-wrap">
            <Link href="/" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-300" />
            <span className="text-brand-ink font-semibold">Window Cleaning</span>
          </div>
        </div>
      </div>

      {/* Hero — reuses the original window cleaning visual */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(150deg,#0369A1 0%,#0EA5E9 55%,#38BDF8 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left: copy */}
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-[0.7rem] font-bold uppercase tracking-widest font-body mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                Window Cleaning · Optional Gutter Add-On
              </span>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-[1.07] tracking-tight mb-4">
                Crystal-Clear Windows
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg,#FFFFFF,#BAE6FD)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  in Winnipeg
                </span>
              </h1>

              <p className="font-body text-sky-100 text-[1rem] leading-relaxed mb-6 max-w-lg">
                Streak-free results for homes and businesses. Choose interior, exterior, or both sides.
                Add gutter cleaning to your booking for a complete exterior service.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
                {FEATURES.map(f => (
                  <li key={f} className="flex items-center gap-2 font-body text-sm text-sky-100">
                    <CheckCircle2 className="w-4 h-4 text-white/70 flex-shrink-0" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>

              <a href="tel:+14318164106" className="btn-white inline-flex text-[0.9375rem] px-7 py-4" aria-label="Call for a quote">
                <Phone className="w-5 h-5" />
                Call for a Free Quote
              </a>
            </div>

            {/* Right: hero image — original window cleaning photo */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.25)] border border-white/20">
                <div className="relative aspect-[4/3] bg-sky-200">
                  <Image
                    src="/images/window-cleaning.jpg"
                    alt="RiseClear technician performing professional window cleaning in Winnipeg"
                    fill priority className="object-cover"
                    sizes="50vw"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                      const w = t.parentElement;
                      if (w) w.classList.add("img-placeholder");
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="relative" aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height: "40px" }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* Inquiry form */}
      <main className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">

          {/* Section intro */}
          <div className="mb-10">
            <p className="section-label mb-3">Book Your Clean</p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-ink tracking-tight mb-3">
              Tell Us About Your Windows
            </h2>
            <p className="font-body text-brand-body text-[0.9375rem] max-w-xl">
              Fill in a few details and we&apos;ll come back to you with a free, no-obligation quote. Most jobs are booked within 24 hours.
            </p>
          </div>

          <WindowCleaningForm />
        </div>
      </main>

      <Footer />
      <InstagramButton />
    </>
  );
}
