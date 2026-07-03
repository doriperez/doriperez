import ProgramPreview from "../product/ProgramPreview.jsx"
import { useContent } from "../../i18n/LangContext.jsx"

export default function Programs() {
  const { t, categories } = useContent()
  const p = t.programs

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

      {/* Every category previews its first two products; "show more" opens the full list. */}
      <div className="container-page pb-16 md:pb-24">
        <div className="divide-y divide-border">
          {categories.map((category) => (
            <ProgramPreview key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
