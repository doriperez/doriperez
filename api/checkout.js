import { stripe } from "../lib/stripe.js"
import { validateOrder, applyMemberDiscount, applyShipping, toStripeLineItems, insertPendingOrder } from "../lib/orders.js"
import { getMemberFromReq, MEMBER_DISCOUNT_RATE } from "../lib/auth.js"

function getOrigin(req) {
  const proto = req.headers["x-forwarded-proto"] || "https"
  const host = req.headers["x-forwarded-host"] || req.headers.host
  return `${proto}://${host}`
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    let body = req.body
    if (typeof body === "string") {
      try {
        body = JSON.parse(body)
      } catch {
        body = {}
      }
    }

    const parsed = validateOrder(body)
    if (!parsed.ok) {
      return res.status(400).json({ error: parsed.error })
    }

    // Active members get MEMBER_DISCOUNT_RATE off and free shipping; everyone
    // else pays the flat shipping fee. Both are enforced server-side.
    const member = await getMemberFromReq(req)
    const isMember = Boolean(member?.isMember)
    const discounted = isMember ? applyMemberDiscount(parsed.value, MEMBER_DISCOUNT_RATE) : parsed.value
    const value = applyShipping(discounted, isMember)

    const origin = getOrigin(req)
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: toStripeLineItems(value),
      customer_email: value.email,
      success_url: `${origin}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=1`,
    })

    await insertPendingOrder(value, session.id)

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.log("[v0] checkout session failed:", err?.message)
    return res.status(500).json({ error: "Something went wrong. Please try again." })
  }
}
