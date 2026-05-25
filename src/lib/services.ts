// src/lib/services.ts
// ─────────────────────────────────────────────────────────────────────────────
// Central service catalogue for RiseClear Property Services.
// No pricing logic — purely structural / type definitions.
// Pricing has been removed per client brief (lead-generation form only).
// ─────────────────────────────────────────────────────────────────────────────

// ── Service categories ────────────────────────────────────────────────────────
export type ServiceCategory =
  | "residential"
  | "commercial"
  | "window"
  | "post-construction";

// ── Residential sub-types ─────────────────────────────────────────────────────
export type ResidentialType = "standard" | "deep" | "move";

// ── Window add-on ─────────────────────────────────────────────────────────────
export type WindowAddOn = "gutter";

// ── Cleaning frequency (used in house-cleaning booking form) ──────────────────
export type CleaningFrequency =
  | "one-time"
  | "weekly"
  | "biweekly"
  | "every-4-weeks";

export const CLEANING_FREQUENCIES: {
  id:       CleaningFrequency;
  label:    string;
  sublabel: string;
}[] = [
  { id: "one-time",      label: "One-Time",         sublabel: ""             },
  { id: "weekly",        label: "Weekly",           sublabel: "Best value"   },
  { id: "biweekly",      label: "Every Other Week", sublabel: "Popular"      },
  { id: "every-4-weeks", label: "Every 4 Weeks",    sublabel: ""             },
];

// ── House-cleaning extras (no prices — inquiry only) ─────────────────────────
export type CleaningExtraKey = "fridge" | "oven" | "interior-windows";

export const CLEANING_EXTRAS: {
  id:    CleaningExtraKey;
  label: string;
  desc:  string;
}[] = [
  { id: "fridge",           label: "Inside Fridge",    desc: "Full interior clean & deodorize" },
  { id: "oven",             label: "Inside Oven",       desc: "Degrease racks, walls & door"    },
  { id: "interior-windows", label: "Interior Windows",  desc: "Streak-free interior glass"      },
];

// ── Service metadata used in Services.tsx ────────────────────────────────────
export interface ServiceItem {
  id:       string;
  title:    string;
  shortDesc:string;
  features: string[];
  img:      string;
  imgAlt:   string;
  tag:      string | null;
  slug:     string | null; // if set, card links to /services/[slug]
  category: ServiceCategory;
}

export const SERVICES: ServiceItem[] = [
  // ── RESIDENTIAL ────────────────────────────────────────────────────────────
  {
    id:       "residential",
    title:    "Residential Cleaning",
    shortDesc:"Standard, deep, and move-in/out cleaning tailored to every home — done right, every visit.",
    features: [
      "Standard recurring cleans",
      "Deep cleaning available",
      "Move-in / Move-out ready",
      "Pet-friendly products",
      "Fully insured team",
      "Flexible scheduling",
    ],
    img:      "/images/residential-cleaning.jpg",
    imgAlt:   "Professional residential cleaning service in Winnipeg",
    tag:      "Most Requested",
    slug:     "house-cleaning",
    category: "residential",
  },
  // ── COMMERCIAL ─────────────────────────────────────────────────────────────
  {
    id:       "commercial",
    title:    "Commercial Cleaning",
    shortDesc:"Professional cleaning for offices, retail spaces, and commercial properties across Winnipeg.",
    features: [
      "Office & retail spaces",
      "Flexible after-hours booking",
      "Recurring contracts available",
      "Fully insured & bonded",
      "Customised cleaning plans",
      "Consistent professional team",
    ],
    img:      "/images/commercial-cleaning.jpg",
    imgAlt:   "Commercial office cleaning service in Winnipeg",
    tag:      null,
    slug:     null,
    category: "commercial",
  },
  // ── WINDOW CLEANING ────────────────────────────────────────────────────────
  {
    id:       "window",
    title:    "Window Cleaning",
    shortDesc:"Streak-free windows for homes and businesses. Optional gutter cleaning add-on available.",
    features: [
      "Residential & commercial",
      "Interior & exterior options",
      "Gutter cleaning add-on",
      "High-reach capability",
      "Eco-friendly solutions",
      "Streak-free guarantee",
    ],
    img:      "/images/window-cleaning.jpeg",
    imgAlt:   "Professional window cleaning in Winnipeg",
    tag:      null,
    slug:     "window-cleaning",
    category: "window",
  },
  // ── POST CONSTRUCTION ──────────────────────────────────────────────────────
  {
    id:       "post-construction",
    title:    "Post-Construction Cleaning",
    shortDesc:"Thorough clean-up after renovations or new builds — dust, debris, and residue removed completely.",
    features: [
      "New builds & renovations",
      "Dust & debris removal",
      "Window & surface cleaning",
      "All trades residue removed",
      "Move-in ready finish",
      "Same-day availability",
    ],
    img:      "/images/construction-cleaning.jpg",
    imgAlt:   "Post-construction cleaning after a renovation in Winnipeg",
    tag:      "New",
    slug:     null,
    category: "post-construction",
  },
];
