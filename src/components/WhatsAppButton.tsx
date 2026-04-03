"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [visible, setVisible] = useState(false);

  // Show after 2s delay
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Stop pulsing after 8s
  useEffect(() => {
    const t = setTimeout(() => setShowPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const waMessage = encodeURIComponent(
    "Hello, I'm interested in your cleaning services"
  );
  const waUrl = `https://wa.me/14318164106?text=${waMessage}`;

  return (
    <div
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-3"
      aria-label="WhatsApp contact widget"
    >
      {/* Popup card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-brand-darker border border-brand-border rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] w-72 sm:w-80 overflow-hidden"
            role="dialog"
            aria-label="Contact options"
          >
            {/* Header */}
            <div className="bg-[#25D366] px-5 py-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-display font-700 text-sm">RC</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#25D366]" />
              </div>
              <div className="flex-1">
                <p className="text-white font-body font-600 text-sm leading-tight">
                  RiseClear Property Services
                </p>
                <p className="text-white/80 text-xs">
                  Typically replies in minutes
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
                aria-label="Close chat widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat bubble */}
            <div className="px-5 py-5 bg-[#ECE5DD] bg-opacity-5">
              <div className="bg-white/5 border border-brand-border rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                <p className="font-body text-sm text-brand-white leading-relaxed">
                  👋 Hi! Thanks for visiting RiseClear.
                  <br />
                  How can we help you today?
                </p>
                <p className="text-[10px] text-brand-muted mt-1.5 text-right">
                  RiseClear Team
                </p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="px-5 pb-5 space-y-2.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-body font-600 text-sm py-3.5 rounded-xl transition-all duration-200 shadow-md"
                aria-label="Start WhatsApp chat"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                Start WhatsApp Chat
              </a>
              <a
                href="tel:+14318164106"
                className="flex items-center justify-center gap-2.5 w-full glass border border-brand-border hover:border-brand-blue/40 text-brand-white font-body font-500 text-sm py-3 rounded-xl transition-all duration-200"
                aria-label="Call RiseClear"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-4 h-4 text-brand-blue" />
                Call +1 431 816 4106
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setIsOpen((o) => !o)}
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label={isOpen ? "Close chat widget" : "Open WhatsApp chat"}
        aria-expanded={isOpen}
      >
        {/* Pulse rings */}
        {showPulse && !isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 animation-delay-150" />
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
