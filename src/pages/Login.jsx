import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
import Button from "../components/ui/Button.jsx"
import { useAuth } from "../auth/AuthContext.jsx"

const field =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus-visible:outline-2 focus-visible:outline-primary"
const label = "mb-1.5 block text-sm font-medium text-foreground"

export default function Login() {
  const { login } = useAuth()
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
      await login({ email: data.get("email"), password: data.get("password") })
      navigate(next === "membership" ? "/membership" : "/account")
    } catch (err) {
      setError(err?.message || "Incorrect email or password.")
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-primary-soft/40">
      <div className="container-page flex justify-center py-16 md:py-24">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
            <h1 className="font-display text-2xl font-semibold text-foreground md:text-3xl">Welcome back</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sign in to manage your membership and member discount.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label htmlFor="email" className={label}>Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" className={field} />
              </div>
              <div>
                <label htmlFor="password" className={label}>Password</label>
                <input id="password" name="password" type="password" required autoComplete="current-password" className={field} />
              </div>

              {error ? (
                <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              <Button type="submit" size="lg" disabled={submitting} className="w-full">
                {submitting ? <><Loader2 size={18} className="animate-spin" aria-hidden="true" />Signing in…</> : "Sign in"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link
                to={next ? `/signup?next=${next}` : "/signup"}
                className="font-semibold text-primary hover:text-primary-hover"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
