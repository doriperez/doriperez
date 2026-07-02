import { Link } from "react-router-dom"

/**
 * Button / CTA primitive
 * variants: primary (pill), secondary (pill outline), link ("Learn more" text link)
 * sizes: sm, md, lg
 * Renders as <Link> when `to` is provided, <a> when `href`, else <button>.
 */
const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none"

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover rounded-full shadow-soft",
  secondary:
    "bg-transparent text-primary border border-primary hover:bg-primary-soft rounded-full",
  accent:
    "bg-accent text-accent-foreground hover:opacity-90 rounded-full shadow-soft",
  ghost:
    "bg-transparent text-foreground hover:bg-muted rounded-full",
  link:
    "bg-transparent text-primary hover:text-primary-hover underline-offset-4 hover:underline p-0 font-semibold",
}

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-3.5",
}

export default function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${
    variant === "link" ? "" : sizes[size]
  } ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
