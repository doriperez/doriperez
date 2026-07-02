import { useId, useState } from "react"
import { ChevronDown } from "lucide-react"

/**
 * Accessible Accordion.
 * items: [{ q/title, a/content }]
 * Supports single-open (default) or multi-open via `allowMultiple`.
 */
export default function Accordion({ items = [], allowMultiple = false, className = "" }) {
  const [open, setOpen] = useState(() => new Set())

  const toggle = (i) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : [])
      if (prev.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className={`divide-y divide-border ${className}`}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          title={item.q ?? item.title}
          content={item.a ?? item.content}
          isOpen={open.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  )
}

function AccordionItem({ title, content, isOpen, onToggle }) {
  const id = useId()
  return (
    <div>
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`panel-${id}`}
          id={`trigger-${id}`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-display text-base font-semibold text-foreground md:text-lg">
            {title}
          </span>
          <ChevronDown
            size={20}
            className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`trigger-${id}`}
        hidden={!isOpen}
        className="pb-5 pr-8 text-[15px] leading-relaxed text-muted-foreground"
      >
        {content}
      </div>
    </div>
  )
}
