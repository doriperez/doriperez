import { neon } from "@neondatabase/serverless"

const MAX_TIP = 200
const MAX_TIPS = 6
const MAX_TITLE = 160
const MAX_BODY = 1200

function getSql() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set")
  }
  return neon(connectionString)
}

// Coerce a stored jsonb value (may arrive as array or JSON string) to a
// clean array of trimmed, length-capped strings.
function normalizeTips(input) {
  let arr = input
  if (typeof arr === "string") {
    try {
      arr = JSON.parse(arr)
    } catch {
      arr = []
    }
  }
  if (!Array.isArray(arr)) arr = []
  return arr
    .map((t) => String(t ?? "").trim().slice(0, MAX_TIP))
    .filter(Boolean)
    .slice(0, MAX_TIPS)
}

function rowToWeekly(row) {
  return {
    weekLabel: row.week_label,
    spotlightTitle: row.spotlight_title,
    spotlightBody: row.spotlight_body,
    pillars: {
      mental: { title: row.mental_title, tips: normalizeTips(row.mental_tips) },
      eating: { title: row.eating_title, tips: normalizeTips(row.eating_tips) },
      lifestyle: { title: row.lifestyle_title, tips: normalizeTips(row.lifestyle_tips) },
    },
    updatedAt: row.updated_at,
  }
}

/** Read the singleton weekly-content row. Returns null if not seeded yet. */
export async function getWeekly() {
  const sql = getSql()
  const rows = await sql`SELECT * FROM journal_weekly WHERE id = 1`
  return rows[0] ? rowToWeekly(rows[0]) : null
}

/**
 * Validate + normalize an incoming weekly-content payload from the admin form.
 * Returns { ok: true, value } or { ok: false, error }.
 */
export function validateWeekly(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." }
  }
  const p = body.pillars && typeof body.pillars === "object" ? body.pillars : {}
  const pillar = (obj) => ({
    title: String(obj?.title ?? "").trim().slice(0, MAX_TITLE),
    tips: normalizeTips(obj?.tips),
  })

  const value = {
    weekLabel: String(body.weekLabel ?? "").trim().slice(0, MAX_TITLE),
    spotlightTitle: String(body.spotlightTitle ?? "").trim().slice(0, MAX_TITLE),
    spotlightBody: String(body.spotlightBody ?? "").trim().slice(0, MAX_BODY),
    pillars: {
      mental: pillar(p.mental),
      eating: pillar(p.eating),
      lifestyle: pillar(p.lifestyle),
    },
  }

  if (!value.spotlightTitle) {
    return { ok: false, error: "A spotlight title is required." }
  }
  return { ok: true, value }
}

/** Compare the provided password against JOURNAL_ADMIN_PASSWORD. */
export function checkAdminPassword(password) {
  const expected = process.env.JOURNAL_ADMIN_PASSWORD
  if (!expected) return false
  return typeof password === "string" && password === expected
}

/** Upsert the singleton weekly-content row and return the saved content. */
export async function saveWeekly(value) {
  const sql = getSql()
  const rows = await sql`
    INSERT INTO journal_weekly
      (id, week_label, spotlight_title, spotlight_body,
       mental_title, mental_tips, eating_title, eating_tips,
       lifestyle_title, lifestyle_tips, updated_at)
    VALUES
      (1, ${value.weekLabel}, ${value.spotlightTitle}, ${value.spotlightBody},
       ${value.pillars.mental.title}, ${JSON.stringify(value.pillars.mental.tips)}::jsonb,
       ${value.pillars.eating.title}, ${JSON.stringify(value.pillars.eating.tips)}::jsonb,
       ${value.pillars.lifestyle.title}, ${JSON.stringify(value.pillars.lifestyle.tips)}::jsonb,
       now())
    ON CONFLICT (id) DO UPDATE SET
      week_label = EXCLUDED.week_label,
      spotlight_title = EXCLUDED.spotlight_title,
      spotlight_body = EXCLUDED.spotlight_body,
      mental_title = EXCLUDED.mental_title,
      mental_tips = EXCLUDED.mental_tips,
      eating_title = EXCLUDED.eating_title,
      eating_tips = EXCLUDED.eating_tips,
      lifestyle_title = EXCLUDED.lifestyle_title,
      lifestyle_tips = EXCLUDED.lifestyle_tips,
      updated_at = now()
    RETURNING *
  `
  return rowToWeekly(rows[0])
}
