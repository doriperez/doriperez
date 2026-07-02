/**
 * Card primitive — soft shadow, 16px rounded corners, consistent padding.
 */
export default function Card({ as: Tag = "div", className = "", children, ...props }) {
  return (
    <Tag
      className={`bg-card text-card-foreground rounded-2xl border border-border shadow-soft ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

/** Small pill tag used for status labels (Best seller, New, In stock). */
export function Tag({ children, tone = "accent", className = "" }) {
  const tones = {
    accent: "bg-accent-soft text-accent",
    primary: "bg-primary-soft text-primary",
    neutral: "bg-muted text-muted-foreground",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold font-display ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
