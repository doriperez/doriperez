import { neon } from "@neondatabase/serverless"
import { randomBytes, scryptSync, timingSafeEqual, createHash } from "node:crypto"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SESSION_COOKIE = "member_session"
const SESSION_DAYS = 30

// Members who hold an active subscription save this fraction on every product.
export const MEMBER_DISCOUNT_RATE = 0.1

function getSql() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set")
  }
  return neon(connectionString)
}

/* ----------------------------- password hashing ---------------------------- */

// scrypt with a per-user random salt. Stored as "scrypt:<salt>:<hash>".
function hashPassword(password) {
  const salt = randomBytes(16).toString("hex")
  const derived = scryptSync(password, salt, 64).toString("hex")
  return `scrypt:${salt}:${derived}`
}

function verifyPassword(password, stored) {
  try {
    const [scheme, salt, hash] = String(stored).split(":")
    if (scheme !== "scrypt" || !salt || !hash) return false
    const derived = scryptSync(password, salt, 64)
    const expected = Buffer.from(hash, "hex")
    return derived.length === expected.length && timingSafeEqual(derived, expected)
  } catch {
    return false
  }
}

/* -------------------------------- sessions --------------------------------- */

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex")
}

async function createSession(memberId) {
  const sql = getSql()
  const token = randomBytes(32).toString("hex")
  const tokenHash = hashToken(token)
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
  await sql`
    INSERT INTO member_sessions (token_hash, member_id, expires_at)
    VALUES (${tokenHash}, ${memberId}, ${expires.toISOString()})
  `
  return { token, expires }
}

export async function destroySession(token) {
  if (!token) return
  const sql = getSql()
  await sql`DELETE FROM member_sessions WHERE token_hash = ${hashToken(token)}`
}

/* ------------------------------ cookie helpers ----------------------------- */

export function parseCookies(req) {
  const header = req.headers?.cookie || ""
  const out = {}
  for (const part of header.split(";")) {
    const idx = part.indexOf("=")
    if (idx === -1) continue
    const key = part.slice(0, idx).trim()
    const val = part.slice(idx + 1).trim()
    if (key) out[key] = decodeURIComponent(val)
  }
  return out
}

export function sessionCookie(token, expires) {
  const secure = process.env.NODE_ENV === "production" ? " Secure;" : ""
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax;${secure} Expires=${expires.toUTCString()}`
}

export function clearCookie() {
  const secure = process.env.NODE_ENV === "production" ? " Secure;" : ""
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax;${secure} Expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

/* ------------------------------ member lookups ----------------------------- */

function publicMember(row) {
  if (!row) return null
  const active =
    row.subscription_status === "active" || row.subscription_status === "trialing"
  return {
    id: String(row.id),
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    subscriptionStatus: row.subscription_status,
    isMember: active,
    currentPeriodEnd: row.current_period_end,
  }
}

// Resolve the authenticated member from the request's session cookie.
// Returns the public member shape or null. Expired sessions are ignored.
export async function getMemberFromReq(req) {
  const token = parseCookies(req)[SESSION_COOKIE]
  if (!token) return null
  const sql = getSql()
  const rows = await sql`
    SELECT m.*
    FROM member_sessions s
    JOIN members m ON m.id = s.member_id
    WHERE s.token_hash = ${hashToken(token)} AND s.expires_at > now()
    LIMIT 1
  `
  return publicMember(rows[0])
}

/* -------------------------------- signup/login ----------------------------- */

export async function signup(body) {
  const email = String(body?.email ?? "").trim().toLowerCase()
  const password = String(body?.password ?? "")
  const firstName = String(body?.firstName ?? "").trim()
  const lastName = String(body?.lastName ?? "").trim()

  if (!EMAIL_RE.test(email)) return { ok: false, status: 400, error: "Please enter a valid email address." }
  if (password.length < 8) return { ok: false, status: 400, error: "Password must be at least 8 characters." }
  if (!firstName) return { ok: false, status: 400, error: "Please enter your first name." }

  const sql = getSql()
  const existing = await sql`SELECT id FROM members WHERE email = ${email} LIMIT 1`
  if (existing.length > 0) {
    return { ok: false, status: 409, error: "An account with this email already exists." }
  }

  const rows = await sql`
    INSERT INTO members (email, password_hash, first_name, last_name)
    VALUES (${email}, ${hashPassword(password)}, ${firstName}, ${lastName || null})
    RETURNING *
  `
  const member = rows[0]
  const session = await createSession(member.id)
  return { ok: true, member: publicMember(member), session }
}

export async function login(body) {
  const email = String(body?.email ?? "").trim().toLowerCase()
  const password = String(body?.password ?? "")
  if (!EMAIL_RE.test(email) || !password) {
    return { ok: false, status: 400, error: "Please enter your email and password." }
  }

  const sql = getSql()
  const rows = await sql`SELECT * FROM members WHERE email = ${email} LIMIT 1`
  const member = rows[0]
  if (!member || !verifyPassword(password, member.password_hash)) {
    return { ok: false, status: 401, error: "Incorrect email or password." }
  }
  const session = await createSession(member.id)
  return { ok: true, member: publicMember(member), session }
}
