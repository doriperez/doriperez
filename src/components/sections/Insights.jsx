import { useState } from "react"
import { Sparkles, Quote, TrendingUp, ArrowRight } from "lucide-react"
import { useContent } from "../../i18n/LangContext.jsx"
import Button from "../ui/Button.jsx"

const TAB_ICONS = {
  habits: Sparkles,
  stories: Quote,
  trends: TrendingUp,
}

export default function Insights() {
  const { t, journal } = useContent()
  const s = t.insights
  const [active, setActive] = useState(s.tabs[0].key)
  const current = s.tabs.find((tab) => tab.key === active) || s.tabs[0]

  return (
    <section id="insights" className="scroll-mt-24 bg-primary-soft/50">
      <div className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {s.eyebrow}
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-foreground md:text-4xl">
            {s.title}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">{s.subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label={s.eyebrow}>
          {s.tabs.map((tab) => {
            const Icon = TAB_ICONS[tab.key] || Sparkles
            const isActive = tab.key === active
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.key)}
                className={
                  isActive
                    ? "flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
                    : "flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                }
              >
                <Icon size={16} aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Panel */}
        {active === "habits" ? (
          <article className="mt-10 grid items-center gap-8 overflow-hidden rounded-3xl border border-border bg-card shadow-soft md:grid-cols-2 md:gap-0">
            <div className="relative aspect-[4/3] h-full w-full overflow-hidden md:aspect-auto md:min-h-[24rem]">
              <img
                src={journal.featured.image || "/placeholder.svg"}
                alt={journal.featured.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-soft backdrop-blur">
                <Sparkles size={13} aria-hidden="true" />
                {t.journal.featuredBadge}
              </span>
            </div>

            <div className="p-8 md:p-12">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                {journal.featured.category}
              </span>
              <h3 className="mt-3 text-balance font-display text-2xl font-semibold text-foreground md:text-3xl">
                {journal.featured.title}
              </h3>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {journal.featured.excerpt}
              </p>

              <div className="mt-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {s.previewLabel}
                </span>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {journal.pillars.map((p) => (
                    <li
                      key={p.key}
                      className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary"
                    >
                      {p.label}
                    </li>
                  ))}
                </ul>
              </div>

              <Button to="/journal" className="mt-8">
                {s.exploreJournal}
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </div>
          </article>
        ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {current.items.map((item, i) =>
            active === "stories" ? (
              <figure
                key={i}
                className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft"
              >
                <Quote size={22} aria-hidden="true" className="text-accent" />
                <blockquote className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-foreground">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <span className="block font-display text-sm font-semibold text-foreground">{item.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{item.detail}</span>
                </figcaption>
              </figure>
            ) : (
              <article
                key={i}
                className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft"
              >
                {item.tag ? (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {item.tag}
                  </span>
                ) : null}
                <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ),
          )}
        </div>
        )}

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          {s.disclaimer}
        </p>
      </div>
    </section>
  )
}
