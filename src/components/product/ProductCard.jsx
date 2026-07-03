import { Link } from "react-router-dom"
import { ArrowUpRight, Plus, Check } from "lucide-react"
import { useState } from "react"
import { useContent } from "../../i18n/LangContext.jsx"
import { useCart } from "../../cart/CartContext.jsx"
import { formatPrice } from "../../cart/format.js"
import ProductVial from "./ProductVial.jsx"

// Tag tone classes keyed by product classification.
const TAG_TONES = {
  rx: "bg-rx-soft text-rx",
  compounded: "bg-compounded-soft text-compounded",
  supplement: "bg-supplement-soft text-supplement",
}

/**
 * Product card for the horizontal program rows and category pages.
 * Shows classification tag (Rx / Compounded / Supplement), name, and blurb.
 * `tagLabel`, `tag`, and `blurb` all arrive already-localized from useContent.
 */
export default function ProductCard({ product, className = "", compact = false }) {
  const { t, lang } = useContent()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product.slug, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  // Compact square variant: smaller vial, name + price only, tight padding.
  // Used in the programs previews to keep the page short.
  if (compact) {
    return (
      <Link
        to={`/product/${product.slug}`}
        className={`group flex h-full flex-col rounded-xl border border-border bg-card p-3 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft-lg ${className}`}
      >
        <div className="mb-3 overflow-hidden rounded-lg bg-primary-soft/40 transition-transform duration-300 group-hover:scale-105">
          <ProductVial product={product} researchLabel={t.productDetail.researchOnly} className="mx-auto h-24" />
        </div>

        <span
          className={`mb-1.5 inline-flex w-fit items-center rounded-full px-2 py-0.5 font-display text-[10px] font-semibold ${
            TAG_TONES[product.tag] || TAG_TONES.supplement
          }`}
        >
          {product.tagLabel}
        </span>

        <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
          {product.name}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="font-display text-sm font-semibold text-foreground">
            {formatPrice(product.price, lang)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`${t.productDetail.addToCart} — ${product.name}`}
            className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${
              added
                ? "bg-primary text-primary-foreground"
                : "bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {added ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
          </button>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft-lg ${className}`}
    >
      <div className="mb-5 overflow-hidden rounded-xl bg-primary-soft/40 transition-transform duration-300 group-hover:scale-105">
        <ProductVial product={product} researchLabel={t.productDetail.researchOnly} className="mx-auto h-44" />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 font-display text-xs font-semibold ${
            TAG_TONES[product.tag] || TAG_TONES.supplement
          }`}
        >
          {product.tagLabel}
        </span>
        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="text-muted-foreground transition-colors group-hover:text-accent"
        />
      </div>

      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary">
        {product.name}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {product.blurb}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="font-display text-lg font-semibold text-foreground">
          {formatPrice(product.price, lang)}
        </span>
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`${t.productDetail.addToCart} — ${product.name}`}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors ${
            added
              ? "bg-primary text-primary-foreground"
              : "bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          {added ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
          {added ? t.productDetail.added : t.productDetail.addToCart}
        </button>
      </div>
    </Link>
  )
}
