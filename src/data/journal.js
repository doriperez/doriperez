// ============================================================
// Wellness Journal — non-translatable STRUCTURE only.
// Editorial TEXT lives in translations.js (content.journal) and
// is merged by id in content.js, mirroring the products pattern.
// ============================================================

// The large featured story at the top of the journal.
export const JOURNAL_FEATURED = {
  id: "longevity-morning",
  image: "/images/journal/featured-morning.png",
  href: "/consultation",
}

// Weekly wellness pillars — image structure only. The editorial text
// (titles + tips) is stored in the database and edited via /journal/admin,
// falling back to translations.js when the DB has no content yet.
export const JOURNAL_PILLARS = [
  { key: "mental", image: "/images/journal/pillar-mental-health.png" },
  { key: "eating", image: "/images/journal/pillar-eating.png" },
  { key: "lifestyle", image: "/images/journal/pillar-lifestyle.png" },
]

// Trending healthy-habit cards (ranked list with imagery).
export const JOURNAL_HABITS = [
  { id: "morning-light", image: "/images/journal/habit-sunlight.png" },
  { id: "zone-2", image: "/images/journal/habit-zone2.png" },
  { id: "protein-first", image: "/images/journal/habit-protein.png" },
  { id: "contrast-therapy", image: "/images/journal/habit-cold.png" },
]

// Latest health-tech gadget roundup. `rating` is out of 5.
export const JOURNAL_GADGETS = [
  { id: "smart-ring", image: "/images/journal/gadget-smart-ring.png", price: 349, rating: 4.8 },
  { id: "glucose-monitor", image: "/images/journal/gadget-cgm.png", price: 129, rating: 4.6 },
  { id: "red-light", image: "/images/journal/gadget-redlight.png", price: 599, rating: 4.7 },
  { id: "smart-scale", image: "/images/journal/gadget-smart-scale.png", price: 149, rating: 4.5 },
  { id: "sleep-band", image: "/images/journal/gadget-sleep-band.png", price: 279, rating: 4.4 },
  { id: "recovery-gun", image: "/images/journal/gadget-massage-gun.png", price: 199, rating: 4.9 },
]
