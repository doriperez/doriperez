import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react"

const CartContext = createContext(null)
const STORAGE_KEY = "ivdora-cart"
const MAX_QTY = 99

function getInitialItems() {
  if (typeof window === "undefined") return []
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []
    if (Array.isArray(parsed)) {
      return parsed
        .map((it) => ({ slug: String(it.slug), qty: Number.parseInt(it.qty, 10) || 1 }))
        .filter((it) => it.slug)
    }
  } catch {
    /* ignore */
  }
  return []
}

/**
 * Cart state: an array of { slug, qty }. Product details (name, price, tag)
 * are resolved from the catalog at render time so the cart stays a thin,
 * serializable source of truth. Persisted to localStorage.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState(getInitialItems)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items])

  const addItem = useCallback((slug, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.slug === slug)
      if (existing) {
        return prev.map((it) =>
          it.slug === slug ? { ...it, qty: Math.min(MAX_QTY, it.qty + qty) } : it,
        )
      }
      return [...prev, { slug, qty: Math.min(MAX_QTY, Math.max(1, qty)) }]
    })
  }, [])

  const setQty = useCallback((slug, qty) => {
    const next = Number.parseInt(qty, 10)
    setItems((prev) => {
      if (!Number.isFinite(next) || next < 1) {
        return prev.filter((it) => it.slug !== slug)
      }
      return prev.map((it) => (it.slug === slug ? { ...it, qty: Math.min(MAX_QTY, next) } : it))
    })
  }, [])

  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((it) => it.slug !== slug))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const count = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items])

  const value = useMemo(
    () => ({ items, addItem, setQty, removeItem, clearCart, count }),
    [items, addItem, setQty, removeItem, clearCart, count],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
