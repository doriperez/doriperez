import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { Activity, Sparkles, HeartPulse, Moon, Wind, Droplet, LayoutGrid } from "lucide-react"
import { useContent } from "../../i18n/LangContext.jsx"
import HsaProductCard from "../hsa/HsaProductCard.jsx"

// Condition id -> icon (structure lives in data/hsa.js).
const CONDITION_ICONS = {
  pain: Activity,
  skin: Sparkles,
  "blood-pressure": HeartPulse,
  sleep: Moon,
  allergy: Wind,
  diabetes: Droplet,
}

export default function HsaShop() {
  const { t, hsa } = useContent()
  const h = t.hsa
  const [tab, setTab] = useState(hsa.collections[0]?.id || "bestseller")
  const [condition, setCondition] = useState(null)

  // A selected condition is a distinct browse mode: show every product for
  // that condition regardless of collection. Otherwise filter by the tab.
  const visible = useMemo(
    () =>
      condition
        ? hsa.products.filter((p) => p.conditions.includes(condition))
        : hsa.products.filter((p) => p.collections.includes(tab)),
    [hsa.products, tab, condition],
  )

  return (
    <section id="hsa-store" className="scroll-mt-24 bg-primary-soft/40">
      <div className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {h.eyebrow}
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-foreground md:text-4xl">
            {h.title}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">{h.subtitle}</p>
        </div>

        {/* Collection tabs */}
        <div
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label={h.title}
        >
          {hsa.collections.map((col) => {
            const isActive = col.id === tab && !condition
            return (
              <button
                key={col.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setTab(col.id)
                  setCondition(null)
                }}
                className={
                  isActive
                    ? "rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
                    : "rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                }
              >
                {col.label}
              </button>
            )
          })}
        </div>

        {/* Shop by condition */}
        <div className="mt-8">
          <p className="mb-3 text-center font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {h.shopByCondition}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setCondition(null)}
              aria-pressed={condition === null}
              className={
                condition === null
                  ? "inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
                  : "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              }
            >
              <LayoutGrid size={15} aria-hidden="true" />
              {h.allConditions}
            </button>
            {hsa.conditions.map((cond) => {
              const Icon = CONDITION_ICONS[cond.id] || Activity
              const isActive = condition === cond.id
              return (
                <button
                  key={cond.id}
                  type="button"
                  onClick={() => setCondition(isActive ? null : cond.id)}
                  aria-pressed={isActive}
                  className={
                    isActive
                      ? "inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
                      : "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                  }
                >
                  <Icon size={15} aria-hidden="true" />
                  {cond.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Product grid */}
        {visible.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((product) => (
              <HsaProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-muted-foreground">{h.empty}</p>
        )}

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          {h.disclaimer}
        </p>
      </div>
    </section>
  )
}
