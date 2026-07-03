import {
  signup,
  login,
  destroySession,
  getMemberFromReq,
  parseCookies,
  sessionCookie,
  clearCookie,
} from "../lib/auth.js"

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const member = await getMemberFromReq(req)
      return res.status(200).json({ member })
    }

    if (req.method === "POST") {
      let body = req.body
      if (typeof body === "string") {
        try {
          body = JSON.parse(body)
        } catch {
          body = {}
        }
      }
      const action = body?.action

      if (action === "logout") {
        const token = parseCookies(req)[/* cookie */ "member_session"]
        await destroySession(token)
        res.setHeader("Set-Cookie", clearCookie())
        return res.status(200).json({ ok: true })
      }

      if (action === "signup" || action === "login") {
        const result = action === "signup" ? await signup(body) : await login(body)
        if (!result.ok) {
          return res.status(result.status || 400).json({ error: result.error })
        }
        res.setHeader("Set-Cookie", sessionCookie(result.session.token, result.session.expires))
        return res.status(200).json({ member: result.member })
      }

      return res.status(400).json({ error: "Unknown action." })
    }

    res.setHeader("Allow", "GET, POST")
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err) {
    console.log("[v0] auth handler failed:", err?.message)
    return res.status(500).json({ error: "Something went wrong. Please try again." })
  }
}
