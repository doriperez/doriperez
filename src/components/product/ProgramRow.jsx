import { useRef } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import ProductCard from "./ProductCard.jsx"
import { useContent } from "../../i18n/LangContext.jsx"

/**
 * Horizontal, scroll-snapping row of product cards for one category.
 * Header shows the category label + description and a "view program" link.
 */
export default function ProgramRow({ category }) {
  const { t } = useContent()
  const scroller = useRef(null)

  const scrollBy = (dir) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" })
  }

  return (
    <section className="container-page py-10 md:py-12" aria-labelledby={`cat-${category.id}`}>
      <div className="mb-6 flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h3 id={`cat-${category.id}`} className="font-display text-2xl font-semibold text-foreground md:text-3xl">
            {category.label}
          </h3>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {category.description}
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <button
            onClick={() => scrollBy(-1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
            aria-label={t.programs.scrollLeft}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
            aria-label={t.programs.scrollRight}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
      >
        {category.products.map((product) => (
          <div key={product.slug} className="w-[17rem] shrink-0 snap-start sm:w-[19rem]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <Link
          to={`/program/${category.id}`}
          className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-primary hover:text-primary-hover"
        >
          {t.programs.viewCategory}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
