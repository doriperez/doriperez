import { stripe } from "../lib/stripe.js"
import { getMemberFromReq } from "../lib/auth.js"
import { setSubscription } from "../lib/subscriptions.js"

// Verify a completed subscription Checkout session and sync the member's
// subscription state. Called on redirect back from Stripe.
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ error: "Method not allowed" })
  }
  try {
    const member = await getMemberFromReq(req)
    if (!member) {
      return res.status(401).json({ error: "Please sign in." })
    }
    const url = new URL(req.url, "http://localhost")
    const sessionId = url.searchParams.get("session_id")
    if (!sessionId) {
      return res.status(400).json({ error: "Missing session_id." })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    })
    const sub = session.subscription
    const active = sub && (sub.status === "active" || sub.status === "trialing")
    if (active) {
      await setSubscription(member.id, {
        subscriptionId: sub.id,
        status: sub.status,
        currentPeriodEnd: sub.current_period_end,
      })
    }

    return res.status(200).json({ active: Boolean(active) })
  } catch (err) {
    console.log("[v0] confirm-subscription failed:", err?.message)
    return res.status(500).json({ error: "Something went wrong verifying your membership." })
  }
}
