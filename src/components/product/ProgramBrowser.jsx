import { useMemo, useState } from "react"
import ProductCard from "./ProductCard.jsx"
import { useContent } from "../../i18n/LangContext.jsx"

/**
 * Unified program browser: a single grid of every product with category
 * filter chips on top. Replaces the stack of per-category sections, which
 * looked visually saturated. Products that belong to multiple categories are
 * de-duplicated so each vial appears once.
 */
export default function ProgramBrowser({ categories }) {
  const { t } = useContent()
  const [active, setActive] = useState("all")

  // All unique products across categories, preserving first-seen order.
  const allProducts = useMemo(() => {
    const seen = new Set()
    const list = []
    for (const cat of categories) {
      for (const product of cat.products) {
        if (!seen.has(product.slug)) {
          seen.add(product.slug)
          list.push(product)
        }
      }
    }
    return list
  }, [categories])

  const activeCategory = categories.find((c) => c.id === active)
  const visible = active === "all" ? allProducts : activeCategory?.products || []

  return (
    <div>
      {/* Category filter chips */}
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label={t.programs.eyebrow}>
        <FilterChip label={t.programs.allLabel} active={active === "all"} onClick={() => setActive("all")} />
        {categories.map((cat) => (
          <FilterChip
            key={cat.id}
            label={cat.label}
            active={active === cat.id}
            onClick={() => setActive(cat.id)}
          />
        ))}
      </div>

      {/* Active category description */}
      {activeCategory ? (
        <p className="mx-auto mb-8 max-w-2xl text-pretty text-center text-sm leading-relaxed text-muted-foreground">
          {activeCategory.description}
        </p>
      ) : null}

      {/* Single unified grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} compact />
        ))}
      </div>
    </div>
  )
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-accent/40 hover:bg-muted"
      }`}
    >
      {label}
    </button>
  )
}
