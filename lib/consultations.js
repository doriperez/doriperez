import { neon } from "@neondatabase/serverless"

const REQUIRED = ["firstName", "lastName", "email", "state"]

// Basic email shape check; keep permissive but reject obvious junk.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validate + normalize an incoming consultation payload.
 * Returns { ok: true, value } or { ok: false, error }.
 */
export function validateConsultation(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." }
  }

  const value = {
    firstName: String(body.firstName ?? "").trim(),
    lastName: String(body.lastName ?? "").trim(),
    email: String(body.email ?? "").trim().toLowerCase(),
    phone: String(body.phone ?? "").trim(),
    state: String(body.state ?? "").trim(),
    program: String(body.program ?? "").trim(),
    goals: String(body.goals ?? "").trim(),
    consent: Boolean(body.consent),
    locale: String(body.locale ?? "en").trim().slice(0, 5) || "en",
  }

  for (const key of REQUIRED) {
    if (!value[key]) {
      return { ok: false, error: `Missing required field: ${key}.` }
    }
  }
  if (!EMAIL_RE.test(value.email)) {
    return { ok: false, error: "Please enter a valid email address." }
  }
  if (!value.consent) {
    return { ok: false, error: "Consent is required to request a consultation." }
  }

  return { ok: true, value }
}

/**
 * Insert a validated consultation row and return the new id + created_at.
 * Uses parameterized queries via the Neon tagged-template client.
 */
export async function insertConsultation(value) {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set")
  }
  const sql = neon(connectionString)

  const rows = await sql`
    INSERT INTO consultations
      (first_name, last_name, email, phone, state, program, goals, consent, locale)
    VALUES
      (${value.firstName}, ${value.lastName}, ${value.email}, ${value.phone || null},
       ${value.state}, ${value.program || null}, ${value.goals || null},
       ${value.consent}, ${value.locale})
    RETURNING id, created_at
  `
  return rows[0]
}
