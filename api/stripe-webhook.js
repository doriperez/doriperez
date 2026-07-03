import { stripe } from "../lib/stripe.js"
import { processSubscriptionEvent } from "../lib/subscriptions.js"

// Stripe must receive the exact raw request body to verify the signature, so we
// disable Vercel's automatic body parsing for this function.
export const config = {
  api: { bodyParser: false },
}

// Collect the raw request body as a Buffer.
async function readRawBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.log("[v0] STRIPE_WEBHOOK_SECRET is not set; rejecting webhook")
    return res.status(500).json({ error: "Webhook not configured." })
  }

  let event
  try {
    const rawBody = await readRawBody(req)
    const signature = req.headers["stripe-signature"]
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.log("[v0] webhook signature verification failed:", err?.message)
    return res.status(400).json({ error: "Invalid signature." })
  }

  try {
    const result = await processSubscriptionEvent(stripe, event)
    console.log("[v0] webhook processed:", event.type, "-", result)
    return res.status(200).json({ received: true })
  } catch (err) {
    console.log("[v0] webhook processing failed:", event?.type, err?.message)
    // Return 500 so Stripe retries delivery.
    return res.status(500).json({ error: "Webhook processing failed." })
  }
}
