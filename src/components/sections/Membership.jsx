import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, Percent, Sparkles, Truck, BellRing, Loader2 } from "lucide-react"
import Button from "../ui/Button.jsx"
import { useAuth } from "../../auth/AuthContext.jsx"

const BENEFITS = [
  { icon: Percent, title: "10% off every product", body: "An automatic member discount applied to your entire cart at checkout." },
  { icon: BellRing, title: "New protocol updates", body: "Be the first to hear about new peptides, HSA gadgets, and research notes." },
  { icon: Truck, title: "Priority fulfillment", body: "Member orders are prioritized and tracked with proactive updates." },
  { icon: Sparkles, title: "Members-only guidance", body: "Curated dosing guides and seasonal wellness playbooks." },
]

export default function Membership() {
  const { isAuthed, isMember, member } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleJoin = async () => {
    setError("")
    // Not signed in → send them to create an account first.
    if (!isAuthed) {
      navigate("/signup?next=membership")
      return
    }
    setLoading(true)
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
      setLoading(false)
    }
  }

  return (
    <section id="membership" className="scroll-mt-24 bg-primary-soft/40">
      <div className="container-page py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Copy + plan */}
          <div>
            <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Membership
            </span>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-foreground md:text-4xl">
              Save more on every order with a Wellness Membership
            </h2>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Join for a flat monthly fee and unlock an automatic 10% discount on all products,
              plus early updates on new protocols and priority fulfillment.
            </p>

            <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold text-foreground">$29</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Cancel anytime. Billed monthly.</p>

              <ul className="mt-6 space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                      <Check size={14} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{b.title}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {error ? (
                <p role="alert" className="mt-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              <div className="mt-7">
                {isMember ? (
                  <div className="rounded-xl border border-primary/30 bg-primary-soft px-4 py-3 text-sm font-medium text-primary">
                    You&apos;re an active member — your 10% discount is applied automatically.
                  </div>
                ) : (
                  <Button onClick={handleJoin} size="lg" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                        Redirecting…
                      </>
                    ) : isAuthed ? (
                      "Become a member · $29/mo"
                    ) : (
                      "Create an account to join"
                    )}
                  </Button>
                )}
                {isAuthed && !isMember ? (
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Signed in as {member.email}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-soft-lg">
            <img
              src="/images/membership/membership-hero.png"
              alt="A calm morning wellness routine representing the membership lifestyle"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
