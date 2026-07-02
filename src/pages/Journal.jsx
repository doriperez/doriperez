import { useState } from "react"
import { Sparkles, TrendingUp, Cpu, Clock, ArrowRight, Mail, Check } from "lucide-react"
import Button from "../components/ui/Button.jsx"
import HabitCard from "../components/journal/HabitCard.jsx"
import GadgetCard from "../components/journal/GadgetCard.jsx"
import WellnessPillars from "../components/journal/WellnessPillars.jsx"
import { useContent } from "../i18n/LangContext.jsx"

export default function Journal() {
  const { t, lang, journal } = useContent()
  const j = t.journal
  const { featured, habits, gadgets, pillars } = journal
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <>
      {/* Masthead — the couples picture sits here as a soft watermark that
          fades in beneath the description. */}
      <section className="relative overflow-hidden bg-primary-soft/60">
        <img
          src={featured.image || "/placeholder.svg"}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full object-cover object-center opacity-[0.14] [mask-image:linear-gradient(to_bottom,transparent,black)] md:h-56"
        />
        <div className="container-page relative z-10 py-16 text-center md:py-24">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {j.eyebrow}
          </span>
          <h1 className="mt-3 text-balance font-display text-3xl font-semibold text-foreground md:text-5xl">
            {j.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">{j.subtitle}</p>
        </div>
      </section>

      {/* Featured story — text-forward editorial card in the freed space. */}
      <section className="container-page py-14 md:py-20">
        <article className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center shadow-soft md:p-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <Sparkles size={13} aria-hidden="true" />
            {j.featuredBadge}
          </span>
          <span className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {featured.category}
          </span>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold text-foreground md:text-4xl">
            {featured.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {featured.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{featured.author}</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {j.readTime(6)}
            </span>
          </div>
          <Button to={featured.href} className="mt-7">
            {j.readStory}
            <ArrowRight size={17} aria-hidden="true" />
          </Button>
        </article>
      </section>

      {/* Weekly wellness pillars (editable at /journal/admin) */}
      <WellnessPillars
        labels={{
          pillarsEyebrow: j.pillarsEyebrow,
          pillarsTitle: j.pillarsTitle,
          pillarsSubtitle: j.pillarsSubtitle,
          spotlightBadge: j.spotlightBadge,
          updatedLabel: j.updatedLabel,
        }}
        pillars={pillars}
        lang={lang}
      />

      {/* Trending healthy habits */}
      <section className="bg-primary-soft/40">
        <div className="container-page py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              <TrendingUp size={14} aria-hidden="true" />
              {j.habitsEyebrow}
            </span>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-foreground md:text-4xl">
              {j.habitsTitle}
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">{j.habitsSubtitle}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} trendingLabel={j.trending} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest health technology */}
      <section className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            <Cpu size={14} aria-hidden="true" />
            {j.gadgetsEyebrow}
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-foreground md:text-4xl">
            {j.gadgetsTitle}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">{j.gadgetsSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gadgets.map((gadget) => (
            <GadgetCard
              key={gadget.id}
              gadget={gadget}
              lang={lang}
              labels={{ whyLove: j.whyLove, from: j.from, ratingAria: j.ratingAria }}
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Mail size={28} className="mx-auto text-primary-foreground/80" aria-hidden="true" />
            <h2 className="mt-4 text-balance font-display text-2xl font-semibold text-primary-foreground md:text-3xl">
              {j.newsletterTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-pretty leading-relaxed text-primary-foreground/75">
              {j.newsletterBody}
            </p>

            {subscribed ? (
              <p className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-5 py-3 text-sm font-medium text-primary-foreground">
                <Check size={17} aria-hidden="true" />
                {j.newsletterSuccess}
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  aria-label={j.newsletterAria}
                  placeholder={j.newsletterPlaceholder}
                  className="w-full flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/50"
                />
                <Button type="submit" variant="accent" className="shrink-0">
                  {j.newsletterCta}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container-page py-10">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          {j.disclaimer}
        </p>
      </section>
    </>
  )
}
