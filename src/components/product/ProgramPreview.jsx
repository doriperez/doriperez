import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import ProductCard from "./ProductCard.jsx"
import { useContent } from "../../i18n/LangContext.jsx"

// Products previewed per category before the "show more" button.
const PREVIEW_COUNT = 2

/**
 * Compact category preview: the category header plus its first two product
 * cards (with vial imagery), followed by a "show more" button linking to the
 * full category page. Keeps the programs section short while still promoting
 * each category's key products with pictures.
 */
export default function ProgramPreview({ category }) {
  const { t } = useContent()

  const preview = category.products.slice(0, PREVIEW_COUNT)
  const hasMore = category.products.length > PREVIEW_COUNT

  return (
    <section className="py-8 md:py-10" aria-labelledby={`cat-${category.id}`}>
      <div className="mb-5 max-w-2xl">
        <h3
          id={`cat-${category.id}`}
          className="font-display text-xl font-semibold text-foreground md:text-2xl"
        >
          {category.label}
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {preview.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-6 flex justify-center">
          <Link
            to={`/program/${category.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 font-display text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:bg-muted"
          >
            {t.programs.showMore}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </section>
  )
}
