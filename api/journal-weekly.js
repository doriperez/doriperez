import {
  getWeekly,
  validateWeekly,
  saveWeekly,
  checkAdminPassword,
} from "../lib/journalWeekly.js"

export default async function handler(req, res) {
  // Public read of the current weekly content.
  if (req.method === "GET") {
    try {
      const weekly = await getWeekly()
      return res.status(200).json({ weekly })
    } catch (err) {
      console.log("[v0] journal-weekly read failed:", err?.message)
      return res.status(500).json({ error: "Could not load weekly content." })
    }
  }

  // Password-protected update from the admin editor.
  if (req.method === "POST") {
    try {
      let body = req.body
      if (typeof body === "string") {
        try {
          body = JSON.parse(body)
        } catch {
          body = {}
        }
      }

      if (!checkAdminPassword(body?.password)) {
        return res.status(401).json({ error: "Incorrect password." })
      }

      const parsed = validateWeekly(body)
      if (!parsed.ok) {
        return res.status(400).json({ error: parsed.error })
      }

      const weekly = await saveWeekly(parsed.value)
      return res.status(200).json({ ok: true, weekly })
    } catch (err) {
      console.log("[v0] journal-weekly save failed:", err?.message)
      return res.status(500).json({ error: "Something went wrong. Please try again." })
    }
  }

  res.setHeader("Allow", "GET, POST")
  return res.status(405).json({ error: "Method not allowed" })
}
