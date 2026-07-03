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
