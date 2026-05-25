import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstagramButton from "@/components/InstagramButton";
import HouseCleaningForm from "@/components/form/HouseCleaningForm";
  
export const metadata: Metadata = {
  title: "Residential Cleaning in Winnipeg | RiseClear Property Services",
  description:
    "Book standard, deep, or move-in/out cleaning in Winnipeg, MB. Flexible scheduling, eco-friendly products, satisfaction guaranteed. Free quotes.",
  alternates: { canonical: "https://risecleaning.ca/services/house-cleaning" },
};

export default function HouseCleaningPage() {
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
            <span className="text-brand-ink font-semibold">Residential Cleaning</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background:"linear-gradient(150deg,#0369A1 0%,#0EA5E9 55%,#38BDF8 100%)" }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
             style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)", backgroundSize:"48px 48px" }}
             aria-hidden="true" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-[0.7rem] font-bold uppercase tracking-widest font-body mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              Residential Cleaning
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-[1.07] tracking-tight mb-4">
              Professional Home Cleaning
              <br />
              <span style={{ background:"linear-gradient(135deg,#FFFFFF,#BAE6FD)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                in Winnipeg
              </span>
            </h1>
            <p className="font-body text-sky-100 text-[1rem] leading-relaxed mb-6 max-w-lg">
              Standard recurring cleans, intensive deep cleans, or move-in/move-out — tell us what you need and we&apos;ll get back to you with a free quote.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {["Standard Cleaning","Deep Cleaning","Move-In / Move-Out"].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-sky-100 font-body text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-300 flex-shrink-0" />{t}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative" aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block" style={{ height:"40px" }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* Form */}
      <main className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
          <HouseCleaningForm />
        </div>
      </main>

      <Footer />
      <InstagramButton />
    </>
  );
}
