import { useState } from "react"
import { Plus, Check, BadgeCheck } from "lucide-react"
import { useContent } from "../../i18n/LangContext.jsx"
import { useCart } from "../../cart/CartContext.jsx"
import { formatPrice } from "../../cart/format.js"

// Badge priority when a product belongs to multiple collections.
const BADGE_PRIORITY = ["bestseller", "trending", "new"]
const BADGE_TONES = {
  bestseller: "bg-accent-soft text-accent",
  trending: "bg-primary-soft text-primary",
  new: "bg-supplement-soft text-supplement",
}

/**
 * Purchasable HSA gadget card. Not a link (gadgets have no detail page) —
 * the whole value is add-to-cart. name/blurb arrive from the HSA catalog.
 */
export default function HsaProductCard({ product }) {
  const { t, lang } = useContent()
  const h = t.hsa
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const badge = BADGE_PRIORITY.find((b) => product.collections.includes(b))

  const handleAdd = () => {
    addItem(product.slug, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft-lg">
      <div className="relative overflow-hidden rounded-t-2xl bg-primary-soft/30">
        {badge ? (
          <span
            className={`absolute left-3 top-3 z-10 inline-flex rounded-full px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-wider ${BADGE_TONES[badge]}`}
          >
            {h.badges[badge]}
          </span>
        ) : null}
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
          <BadgeCheck size={13} aria-hidden="true" />
          {h.eligible}
        </span>
        <h3 className="mt-2 font-display text-base font-semibold text-foreground">{product.name}</h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.blurb}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-lg font-semibold text-foreground">
            {formatPrice(product.price, lang)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`${h.addToCart} — ${product.name}`}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors ${
              added
                ? "bg-primary text-primary-foreground"
                : "bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {added ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
            {added ? h.added : h.addToCart}
          </button>
        </div>
      </div>
    </article>
  )
}
