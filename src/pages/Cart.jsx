import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { ShoppingBag, Minus, Plus, Trash2, Lock } from "lucide-react"
import Button from "../components/ui/Button.jsx"
import ProductVial from "../components/product/ProductVial.jsx"
import { useContent } from "../i18n/LangContext.jsx"
import { useCart } from "../cart/CartContext.jsx"
import { useAuth, MEMBER_DISCOUNT_RATE } from "../auth/AuthContext.jsx"
import { formatPrice, formatCents } from "../cart/format.js"

export default function Cart() {
  const { t, lang, getProductBySlug } = useContent()
  const c = t.cart
  const { items, setQty, removeItem, count } = useCart()
  const { isMember } = useAuth()
  const [searchParams] = useSearchParams()
  const canceled = searchParams.get("canceled") === "1"

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Resolve cart lines against the catalog (source of truth for name/price).
  const lines = items
    .map((it) => {
      const product = getProductBySlug(it.slug)
      if (!product) return null
      return { ...it, product, lineCents: Math.round(product.price * 100) * it.qty }
    })
    .filter(Boolean)

  const subtotalCents = lines.reduce((sum, l) => sum + l.lineCents, 0)
  // Members save 10%, enforced server-side; this is the matching preview.
  const discountCents = isMember ? Math.round(subtotalCents * MEMBER_DISCOUNT_RATE) : 0
  const totalCents = subtotalCents - discountCents

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setError("")
    setSubmitting(true)

    const data = new FormData(e.currentTarget)
    const payload = {
      firstName: data.get("firstName") || "",
      lastName: data.get("lastName") || "",
      email: data.get("email") || "",
      phone: data.get("phone") || "",
      notes: data.get("notes") || "",
      consent: data.get("consent") === "on",
      locale: lang,
      items: items.map((it) => ({ slug: it.slug, qty: it.qty })),
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || !body.url) throw new Error(body.error || c.errorGeneric)
      // Redirect to Stripe-hosted Checkout.
      window.location.href = body.url
    } catch (err) {
      setError(err?.message || c.errorGeneric)
      setSubmitting(false)
    }
  }

  // Empty-cart state.
  if (lines.length === 0) {
    return (
      <section className="container-page py-20 text-center md:py-28">
        <ShoppingBag size={44} className="mx-auto text-muted-foreground" aria-hidden="true" />
        <h1 className="mt-5 font-display text-3xl font-semibold text-foreground">{c.title}</h1>
        <p className="mt-3 text-muted-foreground">{c.empty}</p>
        <Button to="/#programs" className="mt-8">
          {c.emptyCta}
        </Button>
      </section>
    )
  }

  return (
    <section className="container-page py-12 md:py-16">
      <h1 className="font-display text-3xl font-semibold text-foreground md:text-4xl">{c.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {count} {count === 1 ? c.item : c.items}
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Line items */}
        <div className="space-y-4">
          {lines.map((line) => (
            <div
              key={line.slug}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              {line.product.type === "gadget" ? (
                <div className="grid h-28 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-primary-soft/40">
                  <img
                    src={line.product.image || "/placeholder.svg"}
                    alt={line.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <Link
                  to={`/product/${line.slug}`}
                  className="shrink-0 overflow-hidden rounded-xl bg-primary-soft/40"
                >
                  <ProductVial
                    product={line.product}
                    researchLabel={t.productDetail.researchOnly}
                    showCaption={false}
                    className="h-28 w-24 p-2"
                  />
                </Link>
              )}

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  {line.product.type === "gadget" ? (
                    <span className="font-display font-semibold text-foreground">{line.product.name}</span>
                  ) : (
                    <Link
                      to={`/product/${line.slug}`}
                      className="font-display font-semibold text-foreground hover:text-primary"
                    >
                      {line.product.name}
                    </Link>
                  )}
                  <span className="font-display font-semibold text-foreground">
                    {formatCents(line.lineCents, lang)}
                  </span>
                </div>
                <span className="mt-1 text-xs text-muted-foreground">
                  {formatPrice(line.product.price, lang)}{" "}
                  {line.product.type === "gadget" ? t.cart.each : t.productDetail.perVial}
                </span>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      onClick={() => setQty(line.slug, line.qty - 1)}
                      className="grid h-8 w-8 place-items-center rounded-full text-foreground hover:bg-muted"
                      aria-label={`${c.quantity} -`}
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-foreground" aria-label={c.quantity}>
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(line.slug, line.qty + 1)}
                      className="grid h-8 w-8 place-items-center rounded-full text-foreground hover:bg-muted"
                      aria-label={`${c.quantity} +`}
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(line.slug)}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={15} aria-hidden="true" />
                    {c.remove}
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/#programs"
            className="inline-flex text-sm font-semibold text-primary hover:text-primary-hover"
          >
            {c.continueShopping}
          </Link>
        </div>

        {/* Checkout summary + form */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="border-b border-border pb-4">
              {discountCents > 0 ? (
                <div className="mb-3 space-y-1.5">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatCents(subtotalCents, lang)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium text-primary">
                    <span>Member discount (10%)</span>
                    <span>-{formatCents(discountCents, lang)}</span>
                  </div>
                </div>
              ) : null}
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-foreground">{c.total}</span>
                <span className="font-display text-2xl font-semibold text-foreground">
                  {formatCents(totalCents, lang)}
                </span>
              </div>
              {!isMember ? (
                <Link
                  to="/membership"
                  className="mt-3 inline-flex text-xs font-semibold text-primary hover:text-primary-hover"
                >
                  Become a member and save 10% on every order
                </Link>
              ) : null}
            </div>

            <h2 className="mt-5 font-display text-lg font-semibold text-foreground">{c.checkoutHeading}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.checkoutIntro}</p>

            {canceled ? (
              <p role="alert" className="mt-4 rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                {c.canceled}
              </p>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-foreground">{c.firstName}</span>
                  <input
                    name="firstName"
                    required
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-foreground">{c.lastName}</span>
                  <input
                    name="lastName"
                    required
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-foreground">{c.email}</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-foreground">{c.phone}</span>
                <input
                  name="phone"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-foreground">{c.notes}</span>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                />
              </label>

              <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
                />
                <span>{c.consent}</span>
              </label>

              {error ? (
                <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              <Button type="submit" disabled={submitting} className="w-full">
                <Lock size={16} aria-hidden="true" />
                {submitting ? c.submitting : `${c.payNow} · ${formatCents(totalCents, lang)}`}
              </Button>

              <p className="text-center text-[11px] leading-relaxed text-muted-foreground">{c.disclaimer}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
