// src/lib/pricing.ts
// ─────────────────────────────────────────────────────────────────────────────
// Central pricing engine for the RiseClear quote form.
// All base prices, add-on costs, and calculation logic live here.
// Import this into any component that needs to read or compute prices.
// ─────────────────────────────────────────────────────────────────────────────

export type PropertySize = "small" | "medium" | "large" | "";
export type ServiceCoverage = "exterior" | "interior" | "both" | "";
export type AddOnKey = "tracks" | "screens";

// ── Base prices by property size ──────────────────────────────────────────────
export const BASE_PRICES: Record<Exclude<PropertySize, "">, number> = {
  small:  120,
  medium: 180,
  large:  250,
};

// ── Add-on prices ─────────────────────────────────────────────────────────────
export const ADDON_PRICES: Record<AddOnKey, number> = {
  tracks:  25,
  screens: 25,
};

// ── Service coverage adjustment ───────────────────────────────────────────────
export const COVERAGE_ADJUSTMENT: Record<Exclude<ServiceCoverage, "">, number> = {
  interior: 0,
  exterior: 0,
  both:     40,
};

// ── Add-on metadata (label + description shown in UI) ────────────────────────
export const ADDON_META: Record<AddOnKey, { label: string; description: string }> = {
  tracks:  { label: "Track Cleaning",    description: "Deep-clean window track channels" },
  screens: { label: "Screen Detailing",  description: "Remove, clean & reinstall each screen" },
};

// ── Main calculation function ─────────────────────────────────────────────────
/**
 * Calculates the total estimated price from form selections.
 *
 * @param size     - Selected property size (or "" if not yet selected)
 * @param coverage - Selected service coverage (or "" if not yet selected)
 * @param addOns   - Set of selected add-on keys
 * @returns        - Total price in dollars, or null if size not yet selected
 */
export function calculatePrice(
  size: PropertySize,
  coverage: ServiceCoverage,
  addOns: Set<AddOnKey>
): number | null {
  if (!size) return null;

  const base     = BASE_PRICES[size];
  const coverage_ = coverage ? COVERAGE_ADJUSTMENT[coverage] : 0;
  const addOnTotal = [...addOns].reduce(
    (sum, key) => sum + ADDON_PRICES[key],
    0
  );

  return base + coverage_ + addOnTotal;
}

// ── Price breakdown (for displaying the line items) ───────────────────────────
export interface PriceLineItem {
  label: string;
  amount: number;
  type: "base" | "addon" | "coverage";
}

export function getPriceBreakdown(
  size: PropertySize,
  coverage: ServiceCoverage,
  addOns: Set<AddOnKey>
): PriceLineItem[] {
  const items: PriceLineItem[] = [];

  if (!size) return items;

  items.push({
    label: `${size.charAt(0).toUpperCase() + size.slice(1)} Home — Base Price`,
    amount: BASE_PRICES[size],
    type: "base",
  });

  if (coverage === "both") {
    items.push({
      label: "Interior + Exterior (Both Sides)",
      amount: COVERAGE_ADJUSTMENT.both,
      type: "coverage",
    });
  }

  addOns.forEach((key) => {
    items.push({
      label: ADDON_META[key].label,
      amount: ADDON_PRICES[key],
      type: "addon",
    });
  });

  return items;
}

// ── Human-readable size labels ────────────────────────────────────────────────
export const SIZE_LABELS: Record<Exclude<PropertySize, "">, string> = {
  small:  "Small Home (up to 10 windows)",
  medium: "Medium Home (11–20 windows)",
  large:  "Large Home (21+ windows)",
};

export const COVERAGE_LABELS: Record<Exclude<ServiceCoverage, "">, string> = {
  exterior: "Exterior Only",
  interior: "Interior Only",
  both:     "Both Sides (Interior + Exterior)",
};

// ─────────────────────────────────────────────────────────────────────────────
// HOUSE CLEANING PRICING
// Added for the /services/house-cleaning booking page.
// Existing window cleaning logic above is unchanged.
// ─────────────────────────────────────────────────────────────────────────────

export type CleaningFrequency =
  | "one-time"
  | "weekly"
  | "biweekly"
  | "every-4-weeks";

export type CleaningExtraKey =
  | "fridge"
  | "oven"
  | "interior-windows";

// ── Frequency config ──────────────────────────────────────────────────────────
export const CLEANING_FREQUENCIES: {
  id:       CleaningFrequency;
  label:    string;
  sublabel: string;
  discount: number; // 0–1
}[] = [
  { id: "one-time",      label: "One-Time",          sublabel: "",               discount: 0    },
  { id: "weekly",        label: "Weekly",            sublabel: "Save 10%",       discount: 0.10 },
  { id: "biweekly",      label: "Every Other Week",  sublabel: "Save 5%",        discount: 0.05 },
  { id: "every-4-weeks", label: "Every 4 Weeks",     sublabel: "",               discount: 0    },
];

// ── Extras config ─────────────────────────────────────────────────────────────
export const CLEANING_EXTRAS: {
  id:    CleaningExtraKey;
  label: string;
  desc:  string;
  price: number;
  icon:  string; // emoji fallback — replaced by Lucide in component
}[] = [
  { id: "fridge",           label: "Inside Fridge",      desc: "Full interior clean & deodorize", price: 25, icon: "🧊" },
  { id: "oven",             label: "Inside Oven",         desc: "Degrease racks, walls & door",    price: 25, icon: "🔥" },
  { id: "interior-windows", label: "Interior Windows",   desc: "Streak-free interior glass",       price: 30, icon: "🪟" },
];

// ── Pricing per room ──────────────────────────────────────────────────────────
export const BEDROOM_RATE  = 35; // per bedroom
export const BATHROOM_RATE = 25; // per bathroom

// ── Main house cleaning calculator ───────────────────────────────────────────
/**
 * Calculates the total for a house cleaning booking.
 *
 * Formula:
 *   base       = (bedrooms × $35) + (bathrooms × $25)
 *   extrasTotal = sum of selected extra prices
 *   discount    = frequency discount (0, 5%, or 10%)
 *   total       = (base + extrasTotal) × (1 − discount)
 */
export function calculateCleaningPrice(params: {
  bedrooms:  number;
  bathrooms: number;
  frequency: CleaningFrequency;
  extras:    Set<CleaningExtraKey>;
}): {
  base:        number;
  extrasTotal: number;
  discount:    number; // 0–1
  discountAmt: number; // dollar amount saved
  total:       number;
} {
  const { bedrooms, bathrooms, frequency, extras } = params;

  const base = bedrooms * BEDROOM_RATE + bathrooms * BATHROOM_RATE;

  const extrasTotal = CLEANING_EXTRAS.filter((e) => extras.has(e.id)).reduce(
    (sum, e) => sum + e.price,
    0
  );

  const freq    = CLEANING_FREQUENCIES.find((f) => f.id === frequency)!;
  const discount = freq.discount;
  const subtotal = base + extrasTotal;
  const discountAmt = Math.round(subtotal * discount * 100) / 100;
  const total = Math.round((subtotal - discountAmt) * 100) / 100;

  return { base, extrasTotal, discount, discountAmt, total };
}
