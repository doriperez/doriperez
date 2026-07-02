import { useState } from "react"
import { CheckCircle2, Mail, Phone, Clock } from "lucide-react"
import Button from "../components/ui/Button.jsx"
import { site } from "../data/site.js"
import { US_STATES } from "../data/states.js"
import { useContent } from "../i18n/LangContext.jsx"

export default function Consultation() {
  const { t, categories, lang } = useContent()
  const c = t.contact
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setError("")
    setSubmitting(true)

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      firstName: data.get("firstName") || "",
      lastName: data.get("lastName") || "",
      email: data.get("email") || "",
      phone: data.get("phone") || "",
      state: data.get("state") || "",
      program: data.get("interest") || "",
      goals: data.get("message") || "",
      consent: data.get("consent") === "on",
      locale: lang,
    }

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || c.errorGeneric)
      }
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      setError(err?.message || c.errorGeneric)
    } finally {
      setSubmitting(false)
    }
  }

  const field =
    "w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary"
  const label = "mb-1.5 block text-sm font-medium text-foreground"

  return (
    <section className="bg-primary-soft/40">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Form / success */}
          <div className="lg:col-span-7">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {c.eyebrow}
            </span>
            <h1 className="mt-3 text-balance font-display text-3xl font-semibold text-foreground md:text-4xl">
              {c.title}
            </h1>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">{c.subtitle}</p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-border bg-card p-8 shadow-soft">
                <CheckCircle2 size={40} className="text-primary" aria-hidden="true" />
                <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">{c.successTitle}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{c.successBody}</p>
                <Button to="/" className="mt-6">
                  {c.backHome}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={label}>
                      {c.firstName}
                    </label>
                    <input id="firstName" name="firstName" required className={field} autoComplete="given-name" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={label}>
                      {c.lastName}
                    </label>
                    <input id="lastName" name="lastName" required className={field} autoComplete="family-name" />
                  </div>
                  <div>
                    <label htmlFor="email" className={label}>
                      {c.email}
                    </label>
                    <input id="email" name="email" type="email" required className={field} autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>
                      {c.phone}
                    </label>
                    <input id="phone" name="phone" type="tel" className={field} autoComplete="tel" />
                  </div>
                  <div>
                    <label htmlFor="state" className={label}>
                      {c.state}
                    </label>
                    <select id="state" name="state" required defaultValue="" className={field}>
                      <option value="" disabled>
                        {c.statePlaceholder}
                      </option>
                      {US_STATES.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="interest" className={label}>
                      {c.interest}
                    </label>
                    <select id="interest" name="interest" required defaultValue="" className={field}>
                      <option value="" disabled>
                        {c.interestPlaceholder}
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className={label}>
                    {c.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={c.messagePlaceholder}
                    className={field}
                  />
                </div>

                <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                  <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-primary)]" />
                  <span>{c.consent}</span>
                </label>

                {error ? (
                  <p role="alert" className="mt-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </p>
                ) : null}

                <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full">
                  {submitting ? c.submitting : c.submit}
                </Button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-primary p-8 text-primary-foreground shadow-soft">
              <h2 className="font-display text-xl font-semibold">{c.sidebarTitle}</h2>
              <ol className="mt-6 space-y-5">
                {c.sidebarSteps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent font-display text-sm font-semibold text-accent-foreground">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-sm leading-relaxed text-primary-foreground/85">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-primary-foreground/15 pt-6">
                <p className="text-sm font-medium text-primary-foreground/70">{c.reach}</p>
                <div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/85">
                  <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 hover:text-accent">
                    <Mail size={15} aria-hidden="true" />
                    {site.contact.email}
                  </a>
                  <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 hover:text-accent">
                    <Phone size={15} aria-hidden="true" />
                    {site.contact.phone}
                  </a>
                  <span className="flex items-center gap-2">
                    <Clock size={15} aria-hidden="true" />
                    {site.contact.hours}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
