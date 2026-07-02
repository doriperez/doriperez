import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown, Check } from "lucide-react"
import { useLang, useContent } from "../../i18n/LangContext.jsx"

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang, langs } = useLang()
  const { t } = useContent()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = langs.find((l) => l.code === lang) || langs[0]

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    document.addEventListener("mousedown", onClick)
    window.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.switcher.label}
      >
        <Globe size={16} aria-hidden="true" />
        <span>{current.short}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={open ? "rotate-180 transition-transform" : "transition-transform"}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.switcher.label}
          className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] overflow-hidden rounded-xl border border-border bg-card py-1 shadow-soft-lg"
        >
          {langs.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm hover:bg-muted ${
                  l.code === lang ? "font-semibold text-primary" : "text-foreground"
                }`}
              >
                <span>
                  {l.label} <span className="text-muted-foreground">({l.short})</span>
                </span>
                {l.code === lang && <Check size={15} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
