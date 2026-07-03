import ProgramRow from "../product/ProgramRow.jsx"
import ProgramCompact from "../product/ProgramCompact.jsx"
import { useContent } from "../../i18n/LangContext.jsx"

// Category promoted with the full product-card carousel (beauty / skin).
const FEATURED_CATEGORY = "dermatology"

export default function Programs() {
  const { t, categories } = useContent()
  const p = t.programs

  const featured = categories.find((c) => c.id === FEATURED_CATEGORY)
  const rest = categories.filter((c) => c.id !== FEATURED_CATEGORY)

  return (
    <section id="programs" className="scroll-mt-24 bg-background">
      <div className="container-page pt-16 md:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {p.eyebrow}
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-foreground md:text-4xl">
            {p.title}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">{p.subtitle}</p>
        </div>
      </div>

      {/* Promoted beauty category — full product carousel. */}
      {featured ? <ProgramRow category={featured} /> : null}

      {/* Remaining categories — compact, listed layout. */}
      <div className="container-page pb-16 md:pb-24">
        <div className="grid gap-x-12 border-t border-border sm:grid-cols-2">
          {rest.map((category) => (
            <ProgramCompact key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
