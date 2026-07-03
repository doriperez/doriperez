import { stripe } from "./lib/stripe.js"
import { getMemberFromReq } from "./lib/auth.js"
import { getMemberRow, setStripeCustomer, membershipLineItem } from "./lib/subscriptions.js"

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
    const member = await getMemberFromReq(req)
    if (!member) {
      return res.status(401).json({ error: "Please sign in to become a member." })
    }
    if (member.isMember) {
      return res.status(400).json({ error: "You already have an active membership." })
    }

    const row = await getMemberRow(member.id)
    let customerId = row?.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: member.email,
        name: [member.firstName, member.lastName].filter(Boolean).join(" ") || undefined,
        metadata: { memberId: String(member.id) },
      })
      customerId = customer.id
      await setStripeCustomer(member.id, customerId)
    }

    const origin = getOrigin(req)
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [membershipLineItem()],
      metadata: { memberId: String(member.id) },
      success_url: `${origin}/account?subscribed=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/membership?canceled=1`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.log("[v0] subscribe failed:", err?.message)
    return res.status(500).json({ error: "Something went wrong. Please try again." })
  }
}
