// ============================================================
// Merges non-translatable STRUCTURE (data/catalog.js) with the
// active-language TEXT (translations.js) into ready-to-use content.
// Keeps components free of merge logic.
// ============================================================
import { CATEGORIES, PRODUCTS, CATEGORY_PRODUCTS, BEST_SELLERS } from "../data/catalog.js"
import { JOURNAL_FEATURED, JOURNAL_HABITS, JOURNAL_GADGETS, JOURNAL_PILLARS } from "../data/journal.js"
import { HSA_PRODUCTS, HSA_CONDITIONS, HSA_COLLECTIONS } from "../data/hsa.js"
import { site } from "../data/site.js"
import { TRANSLATIONS, DEFAULT_LANG } from "./translations.js"

export function buildContent(lang) {
  const T = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG]
  const ui = T.ui
  const c = T.content

  // Products: structure + translated blurb (+ tag label/note from ui).
  const products = PRODUCTS.map((p) => ({
    ...p,
    blurb: c.products[p.slug] || "",
    tagLabel: ui.tags[p.tag],
    tagNote: ui.tagNote[p.tag],
  }))

  const productBySlug = Object.fromEntries(products.map((p) => [p.slug, p]))

  // HSA store: purchasable gadgets (structure/copy in data) + translated
  // section chrome (tab + condition labels) from ui.hsa.
  const hsaProducts = HSA_PRODUCTS.map((p) => ({ ...p, type: "gadget" }))
  const hsaBySlug = Object.fromEntries(hsaProducts.map((p) => [p.slug, p]))
  const hsa = {
    products: hsaProducts,
    collections: HSA_COLLECTIONS.map((id) => ({ id, label: ui.hsa.tabs[id] })),
    conditions: HSA_CONDITIONS.map((cond) => ({ ...cond, label: ui.hsa.conditions[cond.id] })),
  }

  // Categories: structure + translated label/short/description, sorted by order.
  const categories = [...CATEGORIES]
    .sort((a, b) => a.order - b.order)
    .map((cat) => ({
      ...cat,
      ...c.categories[cat.id],
      products: (CATEGORY_PRODUCTS[cat.id] || [])
        .map((slug) => productBySlug[slug])
        .filter(Boolean),
    }))

  const categoryById = Object.fromEntries(categories.map((cat) => [cat.id, cat]))

  // Top-selling products for the header best-sellers bar.
  const bestSellers = BEST_SELLERS.map((slug) => productBySlug[slug]).filter(Boolean)

  const getProductsByCategory = (id) => categoryById[id]?.products || []
  // Resolve peptide vials first, then fall back to HSA gadgets (cart uses this).
  const getProductBySlug = (slug) => productBySlug[slug] || hsaBySlug[slug]
  const getCategory = (id) => categoryById[id]
  const getRelatedProducts = (product) =>
    products.filter(
      (p) => p.slug !== product.slug && p.categories.some((cid) => product.categories.includes(cid)),
    )
  // Every category a product belongs to (full objects, for detail page).
  const getProductCategories = (product) =>
    product.categories.map((cid) => categoryById[cid]).filter(Boolean)

  // Wellness Journal: structure (images/meta) + translated editorial text.
  const jc = c.journal
  const journal = {
    featured: { ...JOURNAL_FEATURED, ...jc.featured },
    habits: JOURNAL_HABITS.map((h, i) => ({ ...h, ...jc.habits[h.id], rank: i + 1 })),
    gadgets: JOURNAL_GADGETS.map((g) => ({ ...g, ...jc.gadgets[g.id] })),
    // Pillar image + localized default label; live text comes from the DB.
    pillars: JOURNAL_PILLARS.map((p) => ({ ...p, label: ui.journal.pillarLabels[p.key] })),
  }

  // Mega-menu nav is derived from categories (structure lives in the catalog).
  const nav = categories.map((cat) => ({
    id: cat.id,
    label: cat.short,
    href: `/program/${cat.id}`,
    description: cat.description,
  }))

  return {
    t: ui,
    site,
    bestSellers,
    categories,
    products,
    nav,
    journal,
    hsa,
    faqGroups: c.faqGroups,
    getProductsByCategory,
    getProductBySlug,
    getCategory,
    getRelatedProducts,
    getProductCategories,
  }
}
