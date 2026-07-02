import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, X, Loader2, Check } from "lucide-react"
import Button from "../components/ui/Button.jsx"

const PILLARS = [
  { key: "mental", label: "Mental health" },
  { key: "eating", label: "Good eating habits" },
  { key: "lifestyle", label: "Healthy lifestyle" },
]

const EMPTY = {
  weekLabel: "",
  spotlightTitle: "",
  spotlightBody: "",
  pillars: {
    mental: { title: "Mental health", tips: [""] },
    eating: { title: "Good eating habits", tips: [""] },
    lifestyle: { title: "Healthy lifestyle", tips: [""] },
  },
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"

export default function JournalAdmin() {
  const [password, setPassword] = useState("")
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  // Load the current content so edits start from what's live.
  useEffect(() => {
    let active = true
    fetch("/api/journal-weekly")
      .then((r) => r.json())
      .then((data) => {
        if (!active) return
        if (data?.weekly) {
          const w = data.weekly
          setForm({
            weekLabel: w.weekLabel || "",
            spotlightTitle: w.spotlightTitle || "",
            spotlightBody: w.spotlightBody || "",
            pillars: {
              mental: {
                title: w.pillars?.mental?.title || "Mental health",
                tips: w.pillars?.mental?.tips?.length ? w.pillars.mental.tips : [""],
              },
              eating: {
                title: w.pillars?.eating?.title || "Good eating habits",
                tips: w.pillars?.eating?.tips?.length ? w.pillars.eating.tips : [""],
              },
              lifestyle: {
                title: w.pillars?.lifestyle?.title || "Healthy lifestyle",
                tips: w.pillars?.lifestyle?.tips?.length ? w.pillars.lifestyle.tips : [""],
              },
            },
          })
        }
      })
      .catch(() => {})
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  function setField(key, val) {
    setForm((f) => ({ ...f, [key]: val }))
    setSaved(false)
  }

  function setPillar(key, field, val) {
    setForm((f) => ({
      ...f,
      pillars: { ...f.pillars, [key]: { ...f.pillars[key], [field]: val } },
    }))
    setSaved(false)
  }

  function setTip(pillar, i, val) {
    setForm((f) => {
      const tips = [...f.pillars[pillar].tips]
      tips[i] = val
      return { ...f, pillars: { ...f.pillars, [pillar]: { ...f.pillars[pillar], tips } } }
    })
    setSaved(false)
  }

  function addTip(pillar) {
    setForm((f) => ({
      ...f,
      pillars: { ...f.pillars, [pillar]: { ...f.pillars[pillar], tips: [...f.pillars[pillar].tips, ""] } },
    }))
  }

  function removeTip(pillar, i) {
    setForm((f) => {
      const tips = f.pillars[pillar].tips.filter((_, idx) => idx !== i)
      return {
        ...f,
        pillars: { ...f.pillars, [pillar]: { ...f.pillars[pillar], tips: tips.length ? tips : [""] } },
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSaved(false)
    try {
      const res = await fetch("/api/journal-weekly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || "Something went wrong.")
      } else {
        setSaved(true)
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Journal admin</p>
            <h1 className="mt-1 font-display text-3xl font-semibold text-foreground text-balance">
              Weekly wellness content
            </h1>
          </div>
          <Button to="/journal" variant="secondary" size="sm">
            View journal
          </Button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Update the weekly spotlight and the three pillars. Changes go live on the Journal page as soon
          as you save. Enter the admin password below to publish.
        </p>

        {loading ? (
          <div className="mt-10 flex items-center gap-2 text-muted-foreground">
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Loading current content…
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            {/* Spotlight */}
            <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-semibold text-foreground">This week&apos;s spotlight</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="weekLabel">
                    Week label
                  </label>
                  <input
                    id="weekLabel"
                    className={inputClass}
                    value={form.weekLabel}
                    onChange={(e) => setField("weekLabel", e.target.value)}
                    placeholder="e.g. Week of June 30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="spotlightTitle">
                    Spotlight title
                  </label>
                  <input
                    id="spotlightTitle"
                    className={inputClass}
                    value={form.spotlightTitle}
                    onChange={(e) => setField("spotlightTitle", e.target.value)}
                    placeholder="Headline for this week"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="spotlightBody">
                    Spotlight body
                  </label>
                  <textarea
                    id="spotlightBody"
                    className={`${inputClass} min-h-28 resize-y`}
                    value={form.spotlightBody}
                    onChange={(e) => setField("spotlightBody", e.target.value)}
                    placeholder="A short paragraph about this week's focus."
                  />
                </div>
              </div>
            </section>

            {/* Pillars */}
            {PILLARS.map((p) => (
              <section key={p.key} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h2 className="font-display text-lg font-semibold text-foreground">{p.label}</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-foreground"
                      htmlFor={`${p.key}-title`}
                    >
                      Heading
                    </label>
                    <input
                      id={`${p.key}-title`}
                      className={inputClass}
                      value={form.pillars[p.key].title}
                      onChange={(e) => setPillar(p.key, "title", e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="mb-1.5 block text-sm font-medium text-foreground">Recommendations</span>
                    <div className="space-y-2">
                      {form.pillars[p.key].tips.map((tip, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            className={inputClass}
                            value={tip}
                            onChange={(e) => setTip(p.key, i, e.target.value)}
                            placeholder={`Recommendation ${i + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeTip(p.key, i)}
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                            aria-label={`Remove recommendation ${i + 1}`}
                          >
                            <X size={16} aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addTip(p.key)}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
                    >
                      <Plus size={16} aria-hidden="true" />
                      Add recommendation
                    </button>
                  </div>
                </div>
              </section>
            ))}

            {/* Publish */}
            <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="password">
                Admin password
              </label>
              <input
                id="password"
                type="password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to publish"
                autoComplete="current-password"
                required
              />

              {error && (
                <p className="mt-3 text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
              {saved && (
                <p className="mt-3 flex items-center gap-1.5 text-sm text-primary" role="status">
                  <Check size={16} aria-hidden="true" />
                  Saved. Your changes are now live on the journal.
                </p>
              )}

              <div className="mt-4 flex items-center gap-3">
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                      Saving…
                    </>
                  ) : (
                    "Publish changes"
                  )}
                </Button>
                <Link
                  to="/journal"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Link>
              </div>
            </section>
          </form>
        )}
      </div>
    </div>
  )
}
