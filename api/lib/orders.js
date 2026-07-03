import { neon } from "@neondatabase/serverless"
import { PRODUCTS } from "../../src/data/catalog.js"
import { HSA_PRODUCTS } from "../../src/data/hsa.js"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Peptide vials + purchasable HSA gadgets share one slug->product map so the
// cart and Stripe checkout validate both against server-side prices.
const PRODUCT_BY_SLUG = Object.fromEntries(
  [
    ...PRODUCTS.map((p) => ({ ...p, type: "peptide" })),
    ...HSA_PRODUCTS.map((p) => ({ ...p, type: "gadget" })),
  ].map((p) => [p.slug, p]),
)
const MAX_QTY = 99

function getSql() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set")
  }
  return neon(connectionString)
}

/**
 * Validate + normalize an incoming order payload.
 *
 * Prices are ALWAYS re-derived from the server-side catalog by slug — the
 * client-sent price is ignored to prevent tampering. Returns
 * { ok: true, value } or { ok: false, error }.
 */
export function validateOrder(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." }
  }

  const customer = {
    firstName: String(body.firstName ?? "").trim(),
    lastName: String(body.lastName ?? "").trim(),
    email: String(body.email ?? "").trim().toLowerCase(),
    phone: String(body.phone ?? "").trim(),
    state: String(body.state ?? "").trim(),
    notes: String(body.notes ?? "").trim(),
    consent: Boolean(body.consent),
    locale: String(body.locale ?? "en").trim().slice(0, 5) || "en",
  }

  if (!customer.firstName) return { ok: false, error: "Missing required field: firstName." }
  if (!customer.lastName) return { ok: false, error: "Missing required field: lastName." }
  if (!EMAIL_RE.test(customer.email)) {
    return { ok: false, error: "Please enter a valid email address." }
  }
  if (!customer.consent) {
    return { ok: false, error: "Consent is required to submit an order." }
  }

  const rawItems = Array.isArray(body.items) ? body.items : []
  if (rawItems.length === 0) {
    return { ok: false, error: "Your cart is empty." }
  }

  const items = []
  let totalCents = 0
  for (const raw of rawItems) {
    const slug = String(raw?.slug ?? "")
    const product = PRODUCT_BY_SLUG[slug]
    if (!product) {
      return { ok: false, error: `Unknown product: ${slug}.` }
    }
    let qty = Number.parseInt(raw?.qty, 10)
    if (!Number.isFinite(qty) || qty < 1) qty = 1
    if (qty > MAX_QTY) qty = MAX_QTY

    const unitCents = Math.round(product.price * 100)
    totalCents += unitCents * qty
    items.push({ slug, name: product.name, qty, unitCents, type: product.type || "peptide" })
  }

  return { ok: true, value: { ...customer, items, totalCents } }
}

/**
 * Return a new validated-order value with a member discount applied to every
 * item's unit price and the order total. Rate is a fraction (e.g. 0.1 = 10%).
 * The discount is applied server-side so it cannot be tampered with.
 */
export function applyMemberDiscount(value, rate) {
  if (!rate || rate <= 0) return value
  let totalCents = 0
  const items = value.items.map((item) => {
    const unitCents = Math.round(item.unitCents * (1 - rate))
    totalCents += unitCents * item.qty
    return { ...item, unitCents, memberDiscount: true }
  })
  return { ...value, items, totalCents, memberDiscountRate: rate }
}

/**
 * Build Stripe line_items from validated order items using server-side prices.
 * No images are passed (per Stripe integration guidance for this runtime).
 */
export function toStripeLineItems(value) {
  return value.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name:
          item.type === "gadget"
            ? `${item.name} (HSA eligible)`
            : `${item.name} — 10 mL vial (research use only)`,
      },
      unit_amount: item.unitCents,
    },
    quantity: item.qty,
  }))
}

/**
 * Insert a pending order row (before redirecting to Stripe) and return its id.
 */
export async function insertPendingOrder(value, stripeSessionId) {
  const sql = getSql()
  const rows = await sql`
    INSERT INTO orders
      (first_name, last_name, email, phone, state, items, total_cents, notes, consent, locale,
       stripe_session_id, payment_status, status)
    VALUES
      (${value.firstName}, ${value.lastName}, ${value.email}, ${value.phone || null},
       ${value.state || null}, ${JSON.stringify(value.items)}, ${value.totalCents},
       ${value.notes || null}, ${value.consent}, ${value.locale},
       ${stripeSessionId}, 'unpaid', 'pending')
    RETURNING id, created_at
  `
  return rows[0]
}

/**
 * Mark the order matching a Stripe session as paid. Idempotent.
 */
export async function markOrderPaid(stripeSessionId) {
  const sql = getSql()
  const rows = await sql`
    UPDATE orders
    SET payment_status = 'paid', status = 'confirmed'
    WHERE stripe_session_id = ${stripeSessionId}
    RETURNING id, total_cents, payment_status
  `
  return rows[0] || null
}
