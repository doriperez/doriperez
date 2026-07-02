import { Link } from "react-router-dom"
import { useContent } from "../../i18n/LangContext.jsx"

/**
 * Best Sellers bar — a static strip at the very top of the page showing the
 * top-selling products. Each item links to its product detail page.
 * Replaces the former scrolling marquee.
 */
export default function Ticker() {
  const { bestSellers, t } = useContent()

  if (!bestSellers?.length) return null

  return (
    <div
      className="border-b border-primary/20 bg-primary text-primary-foreground"
      aria-label={t.ticker.label}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2 sm:gap-x-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          {t.ticker.heading}
        </span>
        <span className="hidden h-3 w-px bg-primary-foreground/25 sm:inline-block" aria-hidden="true" />
        <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 sm:gap-x-2">
          {bestSellers.map((product, i) => (
            <li key={product.slug} className="flex items-center">
              <Link
                to={`/product/${product.slug}`}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                {product.name}
              </Link>
              {i < bestSellers.length - 1 && (
                <span className="text-accent/70" aria-hidden="true">
                  &#9670;
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
