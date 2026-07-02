import Button from "../ui/Button.jsx"
import { useContent } from "../../i18n/LangContext.jsx"

export default function Hero() {
  const { t } = useContent()
  const h = t.hero
  const stats = [
    { value: h.stat1Value, label: h.stat1Label },
    { value: h.stat2Value, label: h.stat2Label },
    { value: h.stat3Value, label: h.stat3Label },
  ]

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Soft champagne wash behind the content */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent-soft/50 to-transparent" aria-hidden="true" />

      <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-up">
          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {h.eyebrow}
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] text-foreground md:text-5xl lg:text-6xl">
            {h.title}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {h.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/consultation" size="lg">
              {h.primaryCta}
            </Button>
            <Button href="/#programs" variant="secondary" size="lg">
              {h.secondaryCta}
            </Button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{h.note}</p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-semibold text-primary md:text-3xl">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-muted-foreground">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hero visual */}
        <div className="animate-fade-up">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-soft-lg">
            <img
              src="/images/hero-couple.png"
              alt="A fit, smiling couple exercising at home beside their dining table, sharing a healthy snack"
              className="h-full w-full object-cover"
              width={1024}
              height={1024}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
