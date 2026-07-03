import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useContent } from "../../i18n/LangContext.jsx"
import { formatPrice } from "../../cart/format.js"

// Tag tone classes keyed by product classification (mirrors ProductCard).
const TAG_TONES = {
  rx: "bg-rx-soft text-rx",
  compounded: "bg-compounded-soft text-compounded",
  supplement: "bg-supplement-soft text-supplement",
}

/**
 * Compact, text-forward listing for a single category. Unlike ProgramRow it
 * renders no product-card carousel — just the category header and a linked
 * list of its products, so secondary categories stay lightweight.
 */
export default function ProgramCompact({ category }) {
  const { t, lang } = useContent()

  return (
    <div className="py-6" aria-labelledby={`cat-${category.id}`}>
      <div className="flex items-baseline justify-between gap-4">
        <h3
          id={`cat-${category.id}`}
          className="font-display text-lg font-semibold text-foreground md:text-xl"
        >
          {category.label}
        </h3>
        <Link
          to={`/program/${category.id}`}
          className="inline-flex shrink-0 items-center gap-1 font-display text-xs font-semibold text-primary hover:text-primary-hover"
        >
          {t.programs.viewCategory}
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-3 divide-y divide-border">
        {category.products.map((product) => (
          <li key={product.slug}>
            <Link
              to={`/product/${product.slug}`}
              className="group flex items-center justify-between gap-4 py-2.5"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 font-display text-[0.65rem] font-semibold ${
                    TAG_TONES[product.tag] || TAG_TONES.supplement
                  }`}
                >
                  {product.tagLabel}
                </span>
                <span className="truncate text-sm text-foreground group-hover:text-primary">
                  {product.name}
                </span>
              </span>
              <span className="shrink-0 font-display text-sm font-semibold text-muted-foreground group-hover:text-foreground">
                {formatPrice(product.price, lang)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
