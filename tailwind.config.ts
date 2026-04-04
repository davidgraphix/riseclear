import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-plus-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        brand: {
          // Core
          blue:        "#2563EB",
          "blue-dark": "#1D4ED8",
          "blue-mid":  "#3B82F6",
          "blue-light":"#EFF6FF",
          "blue-pale": "#DBEAFE",
          "blue-mist": "#F0F7FF",
          // Text
          ink:         "#0F172A",
          body:        "#334155",
          muted:       "#64748B",
          subtle:      "#94A3B8",
          // Backgrounds
          white:       "#FFFFFF",
          surface:     "#F8FAFC",
          "surface-2": "#F1F5F9",
          // Borders
          border:      "#E2E8F0",
          "border-strong": "#CBD5E1",
          // Accent
          accent:      "#F59E0B",
          "accent-light": "#FEF3C7",
          success:     "#10B981",
          "success-light": "#ECFDF5",
        },
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
        "hero-gradient":
          "linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #F0F7FF 100%)",
        "blue-gradient":
          "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
        "section-alt":
          "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        soft:    "0 2px 12px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04)",
        card:    "0 4px 20px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)",
        "card-hover": "0 12px 40px rgba(37,99,235,0.12), 0 4px 12px rgba(15,23,42,0.06)",
        blue:    "0 4px 20px rgba(37,99,235,0.25)",
        "blue-lg":"0 8px 32px rgba(37,99,235,0.3)",
        nav:     "0 2px 20px rgba(15,23,42,0.08)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-10px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
