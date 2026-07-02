import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import Button from "../components/ui/Button.jsx"
import { useContent } from "../i18n/LangContext.jsx"
import { useCart } from "../cart/CartContext.jsx"
import { formatCents } from "../cart/format.js"

export default function CheckoutSuccess() {
  const { t, lang } = useContent()
  const c = t.cart
  const { clearCart } = useCart()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [state, setState] = useState({ status: "loading", data: null })

  useEffect(() => {
    let active = true
    if (!sessionId) {
      setState({ status: "error", data: null })
      return
    }

    async function confirm() {
      try {
        const res = await fetch(`/api/confirm-order?session_id=${encodeURIComponent(sessionId)}`)
        const body = await res.json().catch(() => ({}))
        if (!active) return
        if (res.ok && body.paid) {
          clearCart()
          setState({ status: "paid", data: body })
        } else {
          setState({ status: "unpaid", data: body })
        }
      } catch {
        if (active) setState({ status: "error", data: null })
      }
    }
    confirm()
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  return (
    <section className="container-page py-20 md:py-28">
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-soft md:p-12">
        {state.status === "loading" ? (
          <>
            <Loader2 size={44} className="mx-auto animate-spin text-primary" aria-hidden="true" />
            <p className="mt-5 text-muted-foreground">{c.verifying}</p>
          </>
        ) : state.status === "paid" ? (
          <>
            <CheckCircle2 size={44} className="mx-auto text-primary" aria-hidden="true" />
            <h1 className="mt-5 font-display text-3xl font-semibold text-foreground">{c.paidTitle}</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">{c.paidBody}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {state.data?.id ? (
                <>
                  {c.orderRef} <span className="font-semibold text-foreground">#{state.data.id}</span>
                  {" · "}
                </>
              ) : null}
              {state.data?.totalCents != null ? formatCents(state.data.totalCents, lang) : null}
            </p>
            <Button to="/" className="mt-8">
              {c.backHome}
            </Button>
          </>
        ) : (
          <>
            <XCircle size={44} className="mx-auto text-destructive" aria-hidden="true" />
            <h1 className="mt-5 font-display text-3xl font-semibold text-foreground">{c.unpaidTitle}</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">{c.unpaidBody}</p>
            <Button to="/cart" className="mt-8">
              {c.backToCart}
            </Button>
          </>
        )}
      </div>
    </section>
  )
}
