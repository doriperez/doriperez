import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
import Button from "../components/ui/Button.jsx"
import { useAuth } from "../auth/AuthContext.jsx"

const field =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus-visible:outline-2 focus-visible:outline-primary"
const label = "mb-1.5 block text-sm font-medium text-foreground"

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get("next")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setError("")
    setSubmitting(true)
    const data = new FormData(e.currentTarget)
    try {
      await signup({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      })
      // If they came here to join, take them straight to Stripe Checkout.
      if (next === "membership") {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
        })
        const body = await res.json().catch(() => ({}))
        if (res.ok && body.url) {
          window.location.href = body.url
          return
        }
        navigate("/membership")
        return
      }
      navigate("/account")
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-primary-soft/40">
      <div className="container-page flex justify-center py-16 md:py-24">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
            <h1 className="font-display text-2xl font-semibold text-foreground md:text-3xl">Create your account</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {next === "membership"
                ? "Create an account to join the Wellness Membership and save 10% on every order."
                : "Join to manage your membership and unlock member pricing."}
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className={label}>First name</label>
                  <input id="firstName" name="firstName" required autoComplete="given-name" className={field} />
                </div>
                <div>
                  <label htmlFor="lastName" className={label}>Last name</label>
                  <input id="lastName" name="lastName" autoComplete="family-name" className={field} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className={label}>Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" className={field} />
              </div>
              <div>
                <label htmlFor="password" className={label}>Password</label>
                <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className={field} />
                <p className="mt-1.5 text-xs text-muted-foreground">At least 8 characters.</p>
              </div>

              {error ? (
                <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              <Button type="submit" size="lg" disabled={submitting} className="w-full">
                {submitting ? <><Loader2 size={18} className="animate-spin" aria-hidden="true" />Creating account…</> : "Create account"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to={next ? `/login?next=${next}` : "/login"}
                className="font-semibold text-primary hover:text-primary-hover"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
