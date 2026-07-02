import { Link } from "react-router-dom"
import { site } from "../../data/site.js"

/**
 * Per-variant color configuration.
 * - standard: dark green + champagne gold on the ivory header background.
 * - light:    white wordmark + lighter gold on the dark forest-green footer.
 */
const MODES = {
  standard: {
    hex: "#b08a4f", // champagne gold stroke
    flourish: "#b08a4f",
    node: "#22463b", // deep forest green spheres
    wordmarkClass: "text-primary",
    taglineColor: "#b08a4f",
  },
  light: {
    hex: "#cba96b", // lighter gold on dark bg
    flourish: "#cba96b",
    node: "#f7f3ea", // ivory spheres so they read on green
    wordmarkClass: "text-primary-foreground",
    taglineColor: "#cba96b",
  },
}

/**
 * Custom brand mark:
 * - Pointy-top hexagon frame with a thin champagne-gold stroke.
 * - Parenthesis-style curved flourishes sweeping just outside the hex.
 * - Molecular node cluster: three green spheres (large bottom-left, medium
 *   top, smaller right) joined by bond lines.
 */
function LogoMark({ mode, className = "" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      style={{ overflow: "visible" }}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* Curved flourishes — left "(" and right ")" arcs outside the hex */}
      <g fill="none" stroke={mode.flourish} strokeWidth="1.4" strokeLinecap="round">
        <path d="M6,15 C 0,24 0,40 6,49" />
        <path d="M58,15 C 64,24 64,40 58,49" />
      </g>

      {/* Pointy-top hexagon frame */}
      <polygon
        points="32,4 56.25,18 56.25,46 32,60 7.75,46 7.75,18"
        fill="none"
        stroke={mode.hex}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Molecular bond lines */}
      <g stroke={mode.node} strokeWidth="1.7" strokeLinecap="round">
        <line x1="25" y1="41" x2="33" y2="21" />
        <line x1="33" y1="21" x2="44" y2="35" />
        <line x1="25" y1="41" x2="44" y2="35" />
      </g>

      {/* Molecular nodes */}
      <g fill={mode.node}>
        <circle cx="25" cy="41" r="6" />
        <circle cx="33" cy="21" r="4.6" />
        <circle cx="44" cy="35" r="3.6" />
      </g>
    </svg>
  )
}

/**
 * IVDora logo lockup: custom hexagon/molecular mark + Fraunces serif
 * wordmark + micro-caps gold tagline.
 *
 * @param {"standard"|"light"} variant - color mode (header vs. footer).
 * @param {string|null} to - route to link to, or null for a static lockup.
 */
export default function Logo({ to = "/", variant = "standard", showTagline = true, className = "" }) {
  const mode = MODES[variant] ?? MODES.standard

  const content = (
    <span className="flex items-center gap-3">
      <LogoMark mode={mode} className="h-11 w-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-2xl font-semibold tracking-tight ${mode.wordmarkClass}`}>
          {site.wordmark.lead}
          {site.wordmark.rest}
        </span>
        {showTagline && (
          <span
            className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: mode.taglineColor }}
          >
            {site.tagline}
          </span>
        )}
      </span>
    </span>
  )

  if (!to) {
    return <span className={className}>{content}</span>
  }

  return (
    <Link to={to} aria-label={`${site.name} home`} className={`inline-flex ${className}`}>
      {content}
    </Link>
  )
}
