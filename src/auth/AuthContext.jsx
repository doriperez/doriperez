import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"

const AuthContext = createContext(null)

// Fraction members save on every product. Mirrors MEMBER_DISCOUNT_RATE on the
// server (api/lib/auth.js), which is the source of truth enforced at checkout.
export const MEMBER_DISCOUNT_RATE = 0.1

export function AuthProvider({ children }) {
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load the current session on mount.
  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth", { credentials: "same-origin" })
      const body = await res.json().catch(() => ({}))
      setMember(body?.member ?? null)
      return body?.member ?? null
    } catch {
      setMember(null)
      return null
    }
  }, [])

  useEffect(() => {
    let active = true
    ;(async () => {
      await refresh()
      if (active) setLoading(false)
    })()
    return () => {
      active = false
    }
  }, [refresh])

  // Shared POST helper for signup/login. Throws on error with the API message.
  const post = useCallback(async (payload) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(payload),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(body.error || "Something went wrong. Please try again.")
    setMember(body.member)
    return body.member
  }, [])

  const signup = useCallback((data) => post({ action: "signup", ...data }), [post])
  const login = useCallback((data) => post({ action: "login", ...data }), [post])

  const logout = useCallback(async () => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ action: "logout" }),
    })
    setMember(null)
  }, [])

  const value = useMemo(
    () => ({
      member,
      loading,
      isAuthed: Boolean(member),
      isMember: Boolean(member?.isMember),
      signup,
      login,
      logout,
      refresh,
    }),
    [member, loading, signup, login, logout, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
