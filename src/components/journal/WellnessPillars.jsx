import { useEffect, useState } from "react"
import { HeartPulse, Check, Sparkles } from "lucide-react"

/**
 * Weekly-updatable wellness section: a spotlight banner plus three large
 * image tiles (mental health, eating, lifestyle) each with bite-sized tips.
 * Text is loaded from /api/journal-weekly (editable at /journal/admin);
 * pillar images + localized labels come from `pillars`.
 */
export default function WellnessPillars({ labels, pillars, lang }) {
  const [weekly, setWeekly] = useState(null)

  useEffect(() => {
    let active = true
    fetch("/api/journal-weekly")
      .then((r) => r.json())
      .then((data) => active && data?.weekly && setWeekly(data.weekly))
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  // Merge DB content onto the image structure; fall back to the localized label.
  const tiles = pillars.map((p) => {
    const db = weekly?.pillars?.[p.key]
    return {
      ...p,
      title: db?.title || p.label,
      tips: db?.tips?.length ? db.tips : [],
    }
  })

  const updatedText =
    weekly?.updatedAt &&
    new Date(weekly.updatedAt).toLocaleDateString(lang, { month: "short", day: "numeric", year: "numeric" })

  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          <HeartPulse size={14} aria-hidden="true" />
          {labels.pillarsEyebrow}
        </span>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-foreground md:text-4xl">
          {labels.pillarsTitle}
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">{labels.pillarsSubtitle}</p>
      </div>

      {/* Weekly spotlight banner */}
      {weekly?.spotlightTitle && (
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground shadow-soft">
          <div className="p-7 md:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
                <Sparkles size={13} aria-hidden="true" />
                {weekly.weekLabel || labels.spotlightBadge}
              </span>
              {updatedText && (
                <span className="text-xs text-primary-foreground/60">
                  {labels.updatedLabel} {updatedText}
                </span>
              )}
            </div>
            <h3 className="mt-4 text-balance font-display text-2xl font-semibold text-primary-foreground md:text-3xl">
              {weekly.spotlightTitle}
            </h3>
            {weekly.spotlightBody && (
              <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-primary-foreground/80">
                {weekly.spotlightBody}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Three large pillar tiles */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tiles.map((tile) => (
          <article
            key={tile.key}
            className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={tile.image || "/placeholder.svg"}
                alt={tile.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-background/90 px-3 py-1.5 font-display text-sm font-semibold text-foreground shadow-soft backdrop-blur">
                {tile.title}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              {tile.tips.length > 0 ? (
                <ul className="space-y-3">
                  {tile.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                        <Check size={13} aria-hidden="true" />
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">{tile.label}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
