import { Star } from "lucide-react"
import { formatPrice } from "../../cart/format.js"

/**
 * Health-tech gadget review card: product photo, rating, price, and an
 * editorial "why we love it" note.
 */
export default function GadgetCard({ gadget, labels, lang }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
      <div className="aspect-square overflow-hidden bg-primary-soft/40">
        <img
          src={gadget.image || "/placeholder.svg"}
          alt={gadget.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            {gadget.category}
          </span>
          <span
            className="flex items-center gap-1 text-sm font-semibold text-foreground"
            aria-label={labels.ratingAria(gadget.rating)}
          >
            <Star size={15} className="fill-accent text-accent" aria-hidden="true" />
            {gadget.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{gadget.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{gadget.blurb}</p>

        <div className="mt-4 rounded-xl bg-muted/60 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{labels.whyLove}</span>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{gadget.why}</p>
        </div>

        <div className="mt-5 flex items-baseline gap-1.5 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">{labels.from}</span>
          <span className="font-display text-xl font-semibold text-foreground">
            {formatPrice(gadget.price, lang)}
          </span>
        </div>
      </div>
    </article>
  )
}
