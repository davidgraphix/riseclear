"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen]       = useState(false);
  const [visible, setVisible]     = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 2500);
    const t2 = setTimeout(() => setShowPulse(false), 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  const waUrl = `https://wa.me/14318164106?text=${encodeURIComponent(
    "Hello, I'm interested in your cleaning services"
  )}`;

  return (
    <div
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-3"
      aria-label="WhatsApp contact widget"
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
            aria-label="Chat options"
          >
            {/* Header — WhatsApp green */}
            <div className="bg-[#25D366] px-5 py-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span
                    className="text-white font-bold text-sm"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    RC
                  </span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-300 rounded-full border-2 border-[#25D366]" />
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
                  Typically replies in minutes
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/15 flex-shrink-0"
                aria-label="Close chat widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat bubble area */}
            <div className="px-5 py-5 bg-sky-50">
              <div className="bg-white border border-sky-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[86%] shadow-soft">
                <p
                  className="text-sm text-brand-body leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  👋 Hi! Thanks for visiting RiseClear.
                  <br />
                  How can we help you today?
                </p>
                <p
                  className="text-[10px] text-brand-muted mt-1.5 text-right"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  RiseClear Team
                </p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="px-5 pb-5 pt-1 bg-sky-50 space-y-2.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 shadow-md"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
                aria-label="Start WhatsApp chat"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                Start WhatsApp Chat
              </a>
              <a
                href="tel:+14318164106"
                className="flex items-center justify-center gap-2.5 w-full bg-white hover:bg-sky-50 border border-sky-200 hover:border-sky-300 text-brand-ink font-semibold text-sm py-3 rounded-xl transition-all duration-200"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
                aria-label="Call RiseClear"
                onClick={() => setIsOpen(false)}
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
        className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full
                   shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.60)]
                   flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label={isOpen ? "Close chat widget" : "Open WhatsApp chat"}
        aria-expanded={isOpen}
      >
        {/* Pulse rings */}
        {showPulse && !isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-35" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 [animation-delay:0.4s]" />
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
              key="wa"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
