import { validateConsultation, insertConsultation } from "../lib/consultations.js"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // req.body may be a string depending on runtime; parse defensively.
    let body = req.body
    if (typeof body === "string") {
      try {
        body = JSON.parse(body)
      } catch {
        body = {}
      }
    }

    const parsed = validateConsultation(body)
    if (!parsed.ok) {
      return res.status(400).json({ error: parsed.error })
    }

    const record = await insertConsultation(parsed.value)
    return res.status(201).json({ ok: true, id: String(record.id) })
  } catch (err) {
    console.log("[v0] consultation insert failed:", err?.message)
    return res.status(500).json({ error: "Something went wrong. Please try again." })
  }
}
