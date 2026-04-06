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
        sky: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
          950: "#082F49",
        },
        brand: {
          /* Sky-blue primaries */
          primary: "#0EA5E9",   /* sky-500  */
          "primary-dark": "#0284C7",   /* sky-600  */
          "primary-deep": "#0369A1",   /* sky-700  */
          "primary-light": "#BAE6FD",  /* sky-200  */
          "primary-pale": "#E0F2FE",  /* sky-100  */
          "primary-mist": "#F0F9FF",  /* sky-50   */
          /* Text */
          ink: "#0C1A2E",
          body: "#334155",
          muted: "#64748B",
          subtle: "#94A3B8",
          /* Surfaces */
          white: "#FFFFFF",
          surface: "#F8FAFC",
          "surface-blue": "#F0F9FF",
          /* Borders */
          border: "#E2E8F0",
          "border-sky": "#BAE6FD",
          /* Accents */
          amber: "#F59E0B",
          "amber-light": "#FEF3C7",
          emerald: "#10B981",
        },
      },
      backgroundImage: {
        /* Hero blue gradient */
        "sky-hero": "linear-gradient(135deg, #0369A1 0%, #0EA5E9 55%, #38BDF8 100%)",
        "sky-section": "linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 100%)",
        "sky-card": "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
        /* Grid pattern */
        "grid-sky": "linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        soft: "0 2px 12px rgba(12,26,46,0.06), 0 1px 3px rgba(12,26,46,0.04)",
        card: "0 4px 20px rgba(12,26,46,0.07), 0 1px 4px rgba(12,26,46,0.04)",
        "card-hover": "0 14px 44px rgba(14,165,233,0.18), 0 4px 12px rgba(12,26,46,0.06)",
        sky: "0 4px 20px rgba(14,165,233,0.30)",
        "sky-lg": "0 8px 32px rgba(14,165,233,0.38)",
        nav: "0 2px 20px rgba(12,26,46,0.09)",
        float: "0 8px 32px rgba(12,26,46,0.14)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        float: "float 6s ease-in-out infinite",
        "slide-up": "slideUp 0.55s ease forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        slideUp: { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
