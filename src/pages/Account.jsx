import { useEffect, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { CheckCircle2, Loader2, Percent, LogOut } from "lucide-react"
import Button from "../components/ui/Button.jsx"
import { useAuth } from "../auth/AuthContext.jsx"

export default function Account() {
  const { member, loading, isMember, logout, refresh } = useAuth()
  const [params, setParams] = useSearchParams()
  const [confirming, setConfirming] = useState(false)
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState("")

  const subscribed = params.get("subscribed") === "1"
  const sessionId = params.get("session_id")

  // After returning from Stripe, verify the subscription and refresh state.
  useEffect(() => {
    if (!subscribed || !sessionId) return
    let active = true
    ;(async () => {
      setConfirming(true)
      try {
        await fetch(`/api/confirm-subscription?session_id=${encodeURIComponent(sessionId)}`, {
          credentials: "same-origin",
        })
        await refresh()
      } catch {
        /* ignore — status will simply remain unchanged */
      } finally {
        if (active) {
          setConfirming(false)
          // Clean the URL so a refresh doesn't re-run confirmation.
          setParams({}, { replace: true })
        }
      }
    })()
    return () => {
      active = false
    }
  }, [subscribed, sessionId, refresh, setParams])

  const handleJoin = async () => {
    setError("")
    setJoining(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || !body.url) throw new Error(body.error || "Something went wrong. Please try again.")
      window.location.href = body.url
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.")
      setJoining(false)
    }
  }

  if (loading) {
    return (
      <section className="container-page grid place-items-center py-24">
        <Loader2 size={28} className="animate-spin text-muted-foreground" aria-hidden="true" />
      </section>
    )
  }

  if (!member) return <Navigate to="/login" replace />

  const periodEnd = member.currentPeriodEnd
    ? new Date(member.currentPeriodEnd).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    : null

  return (
    <section className="container-page py-14 md:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-foreground md:text-4xl">Your account</h1>
        <p className="mt-2 text-muted-foreground">
          {member.firstName ? `Hi ${member.firstName}, ` : ""}manage your membership below.
        </p>

        {confirming ? (
          <p className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Confirming your membership…
          </p>
        ) : null}

        {/* Membership status */}
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
          <h2 className="font-display text-lg font-semibold text-foreground">Wellness Membership</h2>

          {isMember ? (
            <>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-sm font-semibold text-primary">
                <CheckCircle2 size={16} aria-hidden="true" />
                Active
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary-soft/50 p-4">
                <Percent size={20} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-foreground">10% member discount active</p>
                  <p className="text-sm text-muted-foreground">
                    Applied automatically to every order at checkout.
                  </p>
                </div>
              </div>
              {periodEnd ? (
                <p className="mt-4 text-sm text-muted-foreground">Renews on {periodEnd}.</p>
              ) : null}
            </>
          ) : (
            <>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You don&apos;t have an active membership yet. Join for $29/month to unlock a 10%
                discount on every product plus new protocol updates.
              </p>
              {error ? (
                <p role="alert" className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              ) : null}
              <Button onClick={handleJoin} disabled={joining} className="mt-5">
                {joining ? <><Loader2 size={18} className="animate-spin" aria-hidden="true" />Redirecting…</> : "Become a member · $29/mo"}
              </Button>
            </>
          )}
        </div>

        {/* Account details */}
        <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
          <h2 className="font-display text-lg font-semibold text-foreground">Account details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium text-foreground">{[member.firstName, member.lastName].filter(Boolean).join(" ") || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium text-foreground">{member.email}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={logout}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-destructive"
          >
            <LogOut size={16} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </div>
    </section>
  )
}
