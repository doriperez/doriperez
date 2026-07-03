import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  console.log("[v0] STRIPE_SECRET_KEY is not set")
}

// Shared Stripe client for server-side API handlers.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
