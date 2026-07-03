import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useContent } from "../../i18n/LangContext.jsx"

/**
 * Announcement bar — a slim strip at the very top of the page inviting
 * visitors to learn more about peptides. Links to the Wellness Journal.
 */
export default function Ticker() {
  const { t } = useContent()

  return (
    <div
      className="border-b border-primary/20 bg-primary text-primary-foreground"
      aria-label={t.ticker.label}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center">
        <span className="text-xs font-medium text-primary-foreground/90 sm:text-sm">
          {t.ticker.message}
        </span>
        <Link
          to="/journal"
          className="group inline-flex items-center gap-1.5 rounded-full text-xs font-semibold tracking-wide text-accent transition-colors hover:text-primary-foreground sm:text-sm"
        >
          {t.ticker.cta}
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  )
}
