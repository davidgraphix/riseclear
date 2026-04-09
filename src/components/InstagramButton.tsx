"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Phone } from "lucide-react";

const IG_URL = "https://www.instagram.com/riseclearpropertyservices/";

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function InstagramButton() {
  const [isOpen, setIsOpen]       = useState(false);
  const [visible, setVisible]     = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 2500);
    const t2 = setTimeout(() => setShowPulse(false), 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-3"
      aria-label="Instagram contact widget"
    >
      {/* ── Popup card ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 14 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="w-72 sm:w-80 rounded-2xl overflow-hidden shadow-float border border-sky-100 bg-white"
            role="dialog"
            aria-label="Connect with RiseClear"
          >
            {/* Header — Instagram gradient */}
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{
                background:
                  "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span
                    className="text-white font-bold text-sm"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    RC
                  </span>
                </div>
                {/* Online dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-300 rounded-full border-2 border-pink-600" />
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-white font-bold text-sm leading-tight truncate"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  RiseClear Property Services
                </p>
                <p
                  className="text-white/80 text-xs mt-0.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  @riseclearpropertyservices
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/15 flex-shrink-0"
                aria-label="Close widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat bubble */}
            <div className="px-5 py-5 bg-sky-50">
              <div className="bg-white border border-sky-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[86%] shadow-soft">
                <p
                  className="text-sm text-brand-body leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  👋 Hey! Follow us on Instagram for tips, before &amp; afters, and seasonal promos.
                  <br />
                  DM us anytime for a quick quote!
                </p>
                <p
                  className="text-[10px] text-brand-muted mt-1.5 text-right"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  RiseClear Team
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="px-5 pb-5 pt-1 bg-sky-50 space-y-2.5">
              {/* Instagram DM */}
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  fontFamily: "var(--font-plus-jakarta)",
                }}
                aria-label="Open Instagram"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
                View Our Instagram
              </a>

              {/* Phone fallback */}
              <a
                href="tel:+14318164106"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full bg-white hover:bg-sky-50 border border-sky-200 hover:border-sky-300 text-brand-ink font-semibold text-sm py-3 rounded-xl transition-all duration-200"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
                aria-label="Call RiseClear"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                Call +1 431 816 4106
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Action Button ── */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 22 }}
        onClick={() => setIsOpen((o) => !o)}
        className="relative w-14 h-14 sm:w-16 sm:h-16 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
        style={{
          background:
            "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
          boxShadow: isOpen
            ? "0 8px 32px rgba(220,39,67,0.55)"
            : "0 6px 24px rgba(220,39,67,0.40)",
        }}
        aria-label={isOpen ? "Close Instagram widget" : "Connect on Instagram"}
        aria-expanded={isOpen}
      >
        {/* Pulse rings */}
        {showPulse && !isOpen && (
          <>
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{
                background:
                  "linear-gradient(135deg, #f09433, #dc2743, #bc1888)",
              }}
            />
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-15 [animation-delay:0.45s]"
              style={{
                background:
                  "linear-gradient(135deg, #f09433, #dc2743, #bc1888)",
              }}
            />
          </>
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="ig"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <InstagramIcon className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
