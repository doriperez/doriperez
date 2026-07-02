import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import Accordion from "../components/ui/Accordion.jsx"
import Button from "../components/ui/Button.jsx"
import { useContent } from "../i18n/LangContext.jsx"

export default function FAQ() {
  const { t, faqGroups } = useContent()
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return faqGroups
    return faqGroups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.items.length > 0)
  }, [query, faqGroups])

  return (
    <>
      <section className="bg-primary-soft/60">
        <div className="container-page py-16 text-center md:py-20">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {t.faq.eyebrow}
          </span>
          <h1 className="mt-3 text-balance font-display text-3xl font-semibold text-foreground md:text-4xl">
            {t.faq.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">{t.faq.subtitle}</p>
          <div className="relative mx-auto mt-8 max-w-lg">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.faq.searchPlaceholder}
              aria-label={t.faq.searchAria}
              className="w-full rounded-full border border-border bg-card py-3.5 pl-11 pr-5 text-foreground focus:border-primary"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">{t.faq.noResults(query)}</p>
          ) : (
            filtered.map((group) => (
              <div key={group.heading} className="mb-10">
                <h2 className="mb-2 font-display text-xl font-semibold text-foreground">{group.heading}</h2>
                <Accordion items={group.items} />
              </div>
            ))
          )}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
          <h2 className="font-display text-xl font-semibold text-foreground">{t.faq.stillTitle}</h2>
          <p className="mt-2 text-muted-foreground">{t.faq.stillBody}</p>
          <Button to="/consultation" size="lg" className="mt-6">
            {t.faq.contactCta}
          </Button>
        </div>
      </section>
    </>
  )
}
