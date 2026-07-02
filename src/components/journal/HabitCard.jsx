/**
 * Trending healthy-habit card: ranked, image-led editorial tile.
 */
export default function HabitCard({ habit, trendingLabel }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={habit.image || "/placeholder.svg"}
          alt={habit.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 font-display text-sm font-semibold text-primary shadow-soft backdrop-blur">
          {habit.rank}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
          {trendingLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{habit.tag}</span>
        <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{habit.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{habit.body}</p>
      </div>
    </article>
  )
}
