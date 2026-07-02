// ============================================================
// IV-Dora catalog — STRUCTURE ONLY (no translatable copy).
// All human-readable text (category labels/descriptions,
// product blurbs, tag labels) lives in i18n/translations.js and
// is merged in by i18n/content.js.
//
// Editing offerings later = edit THIS list, not the layout.
// A product may belong to multiple categories (categories: []).
// tag ∈ "rx" | "compounded" | "supplement"
// ============================================================

export const CATEGORIES = [
  { id: "womens", order: 1 },
  { id: "mens", order: 2 },
  { id: "weight", order: 3 },
  { id: "longevity", order: 4 },
  { id: "dermatology", order: 5 },
  { id: "sexual", order: 6 },
  { id: "mental", order: 7 },
  { id: "hormone", order: 8 },
]

// Top-selling products, shown in the header best-sellers bar (by slug).
export const BEST_SELLERS = ["tirzepatide", "nad", "mots-c", "retatrutide", "ghk-cu"]

// price = sample price in USD for a single 10 mL vial (editable placeholder pricing).
export const PRODUCTS = [
  // GLP-1 / metabolic agents
  { slug: "semaglutide", name: "Semaglutide", tag: "rx", price: 299, categories: ["weight"] },
  { slug: "tirzepatide", name: "Tirzepatide", tag: "rx", price: 399, categories: ["weight"] },
  { slug: "retatrutide", name: "Retatrutide", tag: "compounded", price: 349, categories: ["weight"] },
  { slug: "cagrilintide", name: "Cagrilintide", tag: "compounded", price: 289, categories: ["weight"] },
  { slug: "cagrilintide-semaglutide", name: "Cagrilintide + Semaglutide", tag: "compounded", price: 429, categories: ["weight"] },
  { slug: "l-carnitine", name: "L-Carnitine", tag: "supplement", price: 79, categories: ["weight"] },
  { slug: "mic", name: "MIC (Methionine · Inositol · Choline)", tag: "compounded", price: 129, categories: ["weight", "womens"] },
  { slug: "mots-c", name: "MOTS-C", tag: "compounded", price: 219, categories: ["weight", "longevity"] },

  // Growth-hormone secretagogues & hormone support
  { slug: "tesamorelin", name: "Tesamorelin", tag: "compounded", price: 269, categories: ["hormone", "longevity"] },
  { slug: "cjc-1295-no-dac", name: "CJC-1295 without DAC", tag: "compounded", price: 189, categories: ["hormone", "longevity"] },
  { slug: "cjc-1295-dac", name: "CJC-1295 with DAC", tag: "compounded", price: 209, categories: ["hormone", "longevity"] },
  { slug: "hcg", name: "HCG", tag: "rx", price: 159, categories: ["hormone", "mens", "womens", "sexual"] },

  // Recovery / repair peptides
  { slug: "bpc-157", name: "BPC-157", tag: "compounded", price: 149, categories: ["longevity", "mens"] },
  { slug: "tb-500", name: "TB-500 / Thymosin Beta-4", tag: "compounded", price: 179, categories: ["longevity", "mens"] },
  { slug: "bpc-tb", name: "BPC + TB", tag: "compounded", price: 229, categories: ["longevity", "mens"] },
  { slug: "lpv", name: "Lysine · Proline · Valine", tag: "compounded", price: 139, categories: ["longevity"] },

  // Cellular health / mitochondrial / longevity
  { slug: "nad", name: "NAD+", tag: "compounded", price: 199, categories: ["longevity"] },
  { slug: "ss-31", name: "SS-31", tag: "compounded", price: 239, categories: ["longevity"] },
  { slug: "epithalon", name: "Epithalon", tag: "compounded", price: 169, categories: ["longevity"] },
  { slug: "thymosin-alpha-1", name: "Thymosin Alpha-1", tag: "compounded", price: 199, categories: ["longevity"] },
  { slug: "vip", name: "VIP10", tag: "compounded", price: 209, categories: ["longevity"] },

  // Dermatology / aesthetic
  { slug: "ghk-cu", name: "GHK-Cu", tag: "compounded", price: 159, categories: ["dermatology", "longevity", "womens"] },
  { slug: "glutathione", name: "Glutathione", tag: "compounded", price: 129, categories: ["dermatology", "longevity", "womens"] },
  { slug: "glow", name: "GLOW", tag: "compounded", price: 189, categories: ["dermatology", "womens"] },
  { slug: "snap-8", name: "Snap-8", tag: "compounded", price: 149, categories: ["dermatology"] },
  { slug: "lemon-bottle", name: "Lemon Bottle", tag: "compounded", price: 119, categories: ["dermatology"] },
  { slug: "botulinum-toxin", name: "Botulinum Toxin", tag: "rx", price: 249, categories: ["dermatology"] },
  { slug: "b5", name: "B5 / Dexpanthenol", tag: "supplement", price: 69, categories: ["dermatology"] },

  // Mental health / focus / sleep
  { slug: "semax", name: "Semax", tag: "compounded", price: 149, categories: ["mental"] },
  { slug: "selank", name: "Selank", tag: "compounded", price: 149, categories: ["mental"] },
  { slug: "dsip", name: "DSIP", tag: "compounded", price: 139, categories: ["mental"] },
  { slug: "pinealon", name: "Pinealon", tag: "compounded", price: 159, categories: ["mental", "longevity"] },
  { slug: "inositol", name: "Inositol", tag: "supplement", price: 59, categories: ["mental", "womens"] },
  { slug: "b6", name: "B6 / Pyridoxine", tag: "supplement", price: 49, categories: ["mental", "womens"] },
  { slug: "methylcobalamin", name: "Methylcobalamin (B12)", tag: "supplement", price: 59, categories: ["mental", "longevity"] },

  // Sexual health
  { slug: "pt-141", name: "PT-141", tag: "rx", price: 179, categories: ["sexual", "womens", "mens"] },
  { slug: "l-arginine", name: "L-Arginine", tag: "supplement", price: 49, categories: ["sexual", "mens"] },
]

// Ordered slug lists per category (display order).
// Grouped by classification — Rx → Compounded → Supplement —
// then alphabetical within each group.
export const CATEGORY_PRODUCTS = {
  womens: [
    // Rx
    "hcg", "pt-141",
    // Compounded
    "ghk-cu", "glow", "glutathione", "mic",
    // Supplement
    "b6", "inositol",
  ],
  mens: [
    // Rx
    "hcg", "pt-141",
    // Compounded
    "bpc-157", "bpc-tb", "tb-500",
    // Supplement
    "l-arginine",
  ],
  weight: [
    // Rx
    "semaglutide", "tirzepatide",
    // Compounded
    "cagrilintide", "cagrilintide-semaglutide", "mic", "mots-c", "retatrutide",
    // Supplement
    "l-carnitine",
  ],
  longevity: [
    // Compounded
    "bpc-157", "bpc-tb", "cjc-1295-dac", "cjc-1295-no-dac", "epithalon",
    "ghk-cu", "glutathione", "lpv", "mots-c", "nad", "pinealon", "ss-31",
    "tb-500", "tesamorelin", "thymosin-alpha-1", "vip",
    // Supplement
    "methylcobalamin",
  ],
  dermatology: [
    // Rx
    "botulinum-toxin",
    // Compounded
    "ghk-cu", "glow", "glutathione", "lemon-bottle", "snap-8",
    // Supplement
    "b5",
  ],
  sexual: [
    // Rx
    "hcg", "pt-141",
    // Supplement
    "l-arginine",
  ],
  mental: [
    // Compounded
    "dsip", "pinealon", "selank", "semax",
    // Supplement
    "b6", "inositol", "methylcobalamin",
  ],
  hormone: [
    // Rx
    "hcg",
    // Compounded
    "cjc-1295-dac", "cjc-1295-no-dac", "tesamorelin",
  ],
}
