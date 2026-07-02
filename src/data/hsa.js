// ============================================================
// HSA Store — shop-eligible health gadgets.
//
// These are purchasable devices (type: "gadget"), kept separate
// from the peptide PRODUCTS catalog but resolved through the same
// cart + Stripe flow by slug. Prices are in USD (single unit).
//
// collections ⊆ "bestseller" | "trending" | "new"
// conditions  ⊆ ids in HSA_CONDITIONS below
//
// Product name/blurb live here (English), mirroring catalog.js.
// Section UI labels (tabs, condition names) are translated in
// translations.js and merged via content.js.
// ============================================================

export const HSA_CONDITIONS = [
  { id: "pain", icon: "Activity" },
  { id: "skin", icon: "Sparkles" },
  { id: "blood-pressure", icon: "HeartPulse" },
  { id: "sleep", icon: "Moon" },
  { id: "allergy", icon: "Wind" },
  { id: "diabetes", icon: "Droplet" },
]

export const HSA_COLLECTIONS = ["bestseller", "trending", "new"]

export const HSA_PRODUCTS = [
  {
    slug: "hsa-tens-unit",
    name: "TENS Muscle Stimulator",
    price: 59,
    image: "/images/hsa/hsa-tens-unit.png",
    blurb: "Drug-free electrical nerve stimulation for targeted muscle and joint pain relief.",
    conditions: ["pain"],
    collections: ["bestseller"],
  },
  {
    slug: "hsa-infrared-heating-pad",
    name: "Infrared Heating Pad",
    price: 89,
    image: "/images/hsa/hsa-infrared-heating-pad.png",
    blurb: "Deep-penetrating infrared warmth to soothe sore muscles and stiffness.",
    conditions: ["pain"],
    collections: ["trending"],
  },
  {
    slug: "hsa-led-acne-mask",
    name: "LED Light Therapy Mask",
    price: 149,
    image: "/images/hsa/hsa-led-acne-mask.png",
    blurb: "Red and blue LED wavelengths to help clear breakouts and calm skin.",
    conditions: ["skin"],
    collections: ["bestseller", "trending"],
  },
  {
    slug: "hsa-skin-therapy-wand",
    name: "Skin Therapy Wand",
    price: 79,
    image: "/images/hsa/hsa-skin-therapy-wand.png",
    blurb: "Handheld device for at-home cleansing, toning, and blemish care.",
    conditions: ["skin"],
    collections: ["new"],
  },
  {
    slug: "hsa-bp-monitor",
    name: "Digital Blood Pressure Monitor",
    price: 69,
    image: "/images/hsa/hsa-bp-monitor.png",
    blurb: "Clinically accurate upper-arm readings with an easy one-touch display.",
    conditions: ["blood-pressure"],
    collections: ["bestseller"],
  },
  {
    slug: "hsa-wrist-bp-cuff",
    name: "Wrist Blood Pressure Cuff",
    price: 49,
    image: "/images/hsa/hsa-wrist-bp-cuff.png",
    blurb: "Compact, portable monitoring for tracking your numbers anywhere.",
    conditions: ["blood-pressure"],
    collections: ["new"],
  },
  {
    slug: "hsa-sleep-sound-machine",
    name: "Smart Sleep Sound Machine",
    price: 54,
    image: "/images/hsa/hsa-sleep-sound-machine.png",
    blurb: "Soothing white noise and nature sounds to help you fall asleep faster.",
    conditions: ["sleep"],
    collections: ["trending"],
  },
  {
    slug: "hsa-weighted-sleep-mask",
    name: "Weighted Sleep Mask",
    price: 39,
    image: "/images/hsa/hsa-weighted-sleep-mask.png",
    blurb: "Gentle, calming pressure that blocks light for deeper rest.",
    conditions: ["sleep"],
    collections: ["new"],
  },
  {
    slug: "hsa-nasal-allergy-light",
    name: "Nasal Allergy Relief Device",
    price: 64,
    image: "/images/hsa/hsa-nasal-allergy-light.png",
    blurb: "Drug-free light therapy to ease seasonal nasal allergy symptoms.",
    conditions: ["allergy"],
    collections: ["trending"],
  },
  {
    slug: "hsa-air-purifier",
    name: "HEPA Air Purifier",
    price: 129,
    image: "/images/hsa/hsa-air-purifier.png",
    blurb: "Captures pollen, dust, and allergens for cleaner air at home.",
    conditions: ["allergy"],
    collections: ["bestseller"],
  },
  {
    slug: "hsa-glucose-monitor-kit",
    name: "Blood Glucose Monitor Kit",
    price: 74,
    image: "/images/hsa/hsa-glucose-monitor-kit.png",
    blurb: "Fast, accurate readings with an easy-to-carry testing kit.",
    conditions: ["diabetes"],
    collections: ["bestseller"],
  },
  {
    slug: "hsa-foot-massager",
    name: "Diabetic Foot Massager",
    price: 119,
    image: "/images/hsa/hsa-foot-massager.png",
    blurb: "Gentle circulation-boosting massage for tired, achy feet.",
    conditions: ["diabetes"],
    collections: ["new"],
  },
]
