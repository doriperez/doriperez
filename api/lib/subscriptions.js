import { neon } from "@neondatabase/serverless"

// Monthly membership price in cents ($29/mo).
export const MEMBERSHIP_PRICE_CENTS = 2900

function getSql() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set")
  }
  return neon(connectionString)
}

// Fetch the raw member row by id (server-side use only).
export async function getMemberRow(memberId) {
  const sql = getSql()
  const rows = await sql`SELECT * FROM members WHERE id = ${memberId} LIMIT 1`
  return rows[0] || null
}

// Persist the Stripe customer id so we reuse one customer per member.
export async function setStripeCustomer(memberId, customerId) {
  const sql = getSql()
  await sql`UPDATE members SET stripe_customer_id = ${customerId} WHERE id = ${memberId}`
}

// Look up a member by their Stripe customer id (used by webhooks, which only
// carry Stripe identifiers, not our internal member id).
export async function getMemberByCustomerId(customerId) {
  const sql = getSql()
  const rows = await sql`SELECT * FROM members WHERE stripe_customer_id = ${customerId} LIMIT 1`
  return rows[0] || null
}

// Sync subscription state directly by Stripe customer id (webhook path).
export async function setSubscriptionByCustomerId(customerId, { subscriptionId, status, currentPeriodEnd }) {
  const sql = getSql()
  const rows = await sql`
    UPDATE members
    SET stripe_subscription_id = ${subscriptionId ?? null},
        subscription_status = ${status},
        current_period_end = ${currentPeriodEnd ? new Date(currentPeriodEnd * 1000).toISOString() : null}
    WHERE stripe_customer_id = ${customerId}
    RETURNING id
  `
  return rows.length > 0
}

// Sync subscription state (called after checkout redirect / on confirm).
export async function setSubscription(memberId, { subscriptionId, status, currentPeriodEnd }) {
  const sql = getSql()
  await sql`
    UPDATE members
    SET stripe_subscription_id = ${subscriptionId ?? null},
        subscription_status = ${status},
        current_period_end = ${currentPeriodEnd ? new Date(currentPeriodEnd * 1000).toISOString() : null}
    WHERE id = ${memberId}
  `
}

// Apply a verified Stripe webhook event to the members table. Handles the
// subscription lifecycle (created/updated/deleted) and the checkout completion
// event. Returns a short string describing what was done, for logging.
export async function processSubscriptionEvent(stripe, event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      if (session.mode !== "subscription" || !session.subscription) return "ignored: non-subscription session"
      const sub = await stripe.subscriptions.retrieve(session.subscription)
      const updated = await setSubscriptionByCustomerId(sub.customer, {
        subscriptionId: sub.id,
        status: sub.status,
        currentPeriodEnd: sub.current_period_end,
      })
      return updated ? `synced checkout for ${sub.customer}` : `no member for ${sub.customer}`
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object
      // A deleted subscription should leave the member inactive.
      const status = event.type === "customer.subscription.deleted" ? "canceled" : sub.status
      const updated = await setSubscriptionByCustomerId(sub.customer, {
        subscriptionId: sub.id,
        status,
        currentPeriodEnd: sub.current_period_end,
      })
      return updated ? `synced ${event.type} → ${status} for ${sub.customer}` : `no member for ${sub.customer}`
    }
    default:
      return `ignored: ${event.type}`
  }
}

// Line item for the $29/mo membership subscription.
export function membershipLineItem() {
  return {
    price_data: {
      currency: "usd",
      product_data: { name: "Wellness Membership — monthly" },
      recurring: { interval: "month" },
      unit_amount: MEMBERSHIP_PRICE_CENTS,
    },
    quantity: 1,
  }
}
