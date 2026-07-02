// Locale-aware USD price formatting shared across the store UI.
const LOCALE_MAP = { en: "en-US", es: "es-US", fr: "fr-FR" }

// Format a whole-dollar amount (e.g. 299) as currency.
export function formatPrice(dollars, lang = "en") {
  return new Intl.NumberFormat(LOCALE_MAP[lang] || "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(dollars || 0)
}

// Format a cents amount (e.g. 29900) as currency, with cents shown.
export function formatCents(cents, lang = "en") {
  return new Intl.NumberFormat(LOCALE_MAP[lang] || "en-US", {
    style: "currency",
    currency: "USD",
  }).format((cents || 0) / 100)
}
