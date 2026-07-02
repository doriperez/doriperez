import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react"
import { LANGS, DEFAULT_LANG } from "./translations.js"
import { buildContent } from "./content.js"

const LangContext = createContext(null)
const STORAGE_KEY = "ivdora-lang"

function getInitialLang() {
  if (typeof window === "undefined") return DEFAULT_LANG
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && LANGS.some((l) => l.code === saved)) return saved
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = useCallback((code) => {
    setLangState(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* ignore */
    }
  }, [])

  // Keep the document language attribute in sync for a11y/SEO.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLang, langs: LANGS, ...buildContent(lang) }),
    [lang, setLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

// Full localized content + language controls.
export function useContent() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useContent must be used within a LangProvider")
  return ctx
}

// Convenience hook for just the language switcher controls.
export function useLang() {
  const { lang, setLang, langs } = useContent()
  return { lang, setLang, langs }
}
