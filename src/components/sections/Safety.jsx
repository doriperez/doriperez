import { ShieldCheck, FlaskConical, MapPin, Info } from "lucide-react"
import { useContent } from "../../i18n/LangContext.jsx"

const ICONS = [ShieldCheck, FlaskConical, MapPin, Info]

export default function Safety() {
  const { t } = useContent()
  const s = t.safety

  return (
    <section id="safety" className="scroll-mt-24 bg-primary text-primary-foreground">
      <div className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {s.eyebrow}
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-primary-foreground md:text-4xl">
            {s.title}
          </h2>
          <p className="mt-4 text-pretty text-primary-foreground/75">{s.intro}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {s.points.map((point, i) => {
            const Icon = ICONS[i] || Info
            return (
              <div
                key={point.title}
                className="flex gap-4 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-primary-foreground">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{point.body}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Formal disclaimer block */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-accent/30 bg-primary-foreground/5 p-6 md:p-8">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
            {s.disclaimerTitle}
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-primary-foreground/70">{s.disclaimerBody}</p>
        </div>
      </div>
    </section>
  )
}
