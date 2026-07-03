import { stripe } from "../lib/stripe.js"
import { markOrderPaid } from "../lib/orders.js"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const sessionId = req.query?.session_id || new URL(req.url, "http://localhost").searchParams.get("session_id")
    if (!sessionId) {
      return res.status(400).json({ error: "Missing session_id." })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const paid = session.payment_status === "paid"

    let order = null
    if (paid) {
      order = await markOrderPaid(sessionId)
    }

    return res.status(200).json({
      paid,
      id: order ? String(order.id) : null,
      totalCents: session.amount_total ?? null,
      email: session.customer_details?.email ?? null,
    })
  } catch (err) {
    console.log("[v0] confirm order failed:", err?.message)
    return res.status(500).json({ error: "Something went wrong verifying your payment." })
  }
}
