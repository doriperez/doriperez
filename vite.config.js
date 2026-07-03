import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Dev-only middleware so the /api/consultation endpoint works under `vite dev`
// (Vercel serverless functions in /api only run in production/preview deploys).
function devApiPlugin() {
  return {
    name: "dev-api",
    configureServer(server) {
      // Vite does not populate process.env from .env files. Load the full env
      // (no prefix filter) and inject DB vars so the dev middleware can connect.
      const env = loadEnv(server.config.mode, process.cwd(), "")
      if (!process.env.DATABASE_URL && env.DATABASE_URL) {
        process.env.DATABASE_URL = env.DATABASE_URL
      }
      if (!process.env.STRIPE_SECRET_KEY && env.STRIPE_SECRET_KEY) {
        process.env.STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY
      }
      if (!process.env.STRIPE_WEBHOOK_SECRET && env.STRIPE_WEBHOOK_SECRET) {
        process.env.STRIPE_WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET
      }
      if (!process.env.JOURNAL_ADMIN_PASSWORD && env.JOURNAL_ADMIN_PASSWORD) {
        process.env.JOURNAL_ADMIN_PASSWORD = env.JOURNAL_ADMIN_PASSWORD
      }

      // Read the request body as parsed JSON (helper for POST middleware).
      async function readJson(req) {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        const raw = Buffer.concat(chunks).toString("utf8") || "{}"
        try {
          return JSON.parse(raw)
        } catch {
          return {}
        }
      }

      server.middlewares.use("/api/consultation", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405
          res.setHeader("Allow", "POST")
          res.end(JSON.stringify({ error: "Method not allowed" }))
          return
        }
        try {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const raw = Buffer.concat(chunks).toString("utf8") || "{}"
          let body = {}
          try {
            body = JSON.parse(raw)
          } catch {
            body = {}
          }

          const { validateConsultation, insertConsultation } = await server.ssrLoadModule(
            "/api/lib/consultations.js",
          )
          const parsed = validateConsultation(body)
          if (!parsed.ok) {
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: parsed.error }))
            return
          }
          const record = await insertConsultation(parsed.value)
          res.statusCode = 201
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ ok: true, id: String(record.id) }))
        } catch (err) {
          console.log("[v0] dev consultation insert failed:", err?.message)
          res.statusCode = 500
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ error: "Something went wrong. Please try again." }))
        }
      })

      server.middlewares.use("/api/journal-weekly", async (req, res) => {
        try {
          const mod = await server.ssrLoadModule("/api/lib/journalWeekly.js")
          if (req.method === "GET") {
            const weekly = await mod.getWeekly()
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ weekly }))
            return
          }
          if (req.method === "POST") {
            const body = await readJson(req)
            if (!mod.checkAdminPassword(body?.password)) {
              res.statusCode = 401
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ error: "Incorrect password." }))
              return
            }
            const parsed = mod.validateWeekly(body)
            if (!parsed.ok) {
              res.statusCode = 400
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ error: parsed.error }))
              return
            }
            const weekly = await mod.saveWeekly(parsed.value)
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ ok: true, weekly }))
            return
          }
          res.statusCode = 405
          res.setHeader("Allow", "GET, POST")
          res.end(JSON.stringify({ error: "Method not allowed" }))
        } catch (err) {
          console.log("[v0] dev journal-weekly failed:", err?.message)
          res.statusCode = 500
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ error: "Something went wrong. Please try again." }))
        }
      })

      server.middlewares.use("/api/auth", async (req, res) => {
        try {
          const mod = await server.ssrLoadModule("/api/lib/auth.js")
          if (req.method === "GET") {
            const member = await mod.getMemberFromReq(req)
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ member }))
            return
          }
          if (req.method === "POST") {
            const body = await readJson(req)
            const action = body?.action
            if (action === "logout") {
              await mod.destroySession(mod.parseCookies(req).member_session)
              res.statusCode = 200
              res.setHeader("Set-Cookie", mod.clearCookie())
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ ok: true }))
              return
            }
            if (action === "signup" || action === "login") {
              const result = action === "signup" ? await mod.signup(body) : await mod.login(body)
              if (!result.ok) {
                res.statusCode = result.status || 400
                res.setHeader("Content-Type", "application/json")
                res.end(JSON.stringify({ error: result.error }))
                return
              }
              res.statusCode = 200
              res.setHeader("Set-Cookie", mod.sessionCookie(result.session.token, result.session.expires))
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ member: result.member }))
              return
            }
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: "Unknown action." }))
            return
          }
          res.statusCode = 405
          res.setHeader("Allow", "GET, POST")
          res.end(JSON.stringify({ error: "Method not allowed" }))
        } catch (err) {
          console.log("[v0] dev auth failed:", err?.message)
          res.statusCode = 500
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ error: "Something went wrong. Please try again." }))
        }
      })

      server.middlewares.use("/api/stripe-webhook", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405
          res.setHeader("Allow", "POST")
          res.end(JSON.stringify({ error: "Method not allowed" }))
          return
        }
        try {
          const { stripe } = await server.ssrLoadModule("/api/lib/stripe.js")
          const { processSubscriptionEvent } = await server.ssrLoadModule("/api/lib/subscriptions.js")

          // Read the raw body (required for signature verification).
          const chunks = []
          for await (const chunk of req) chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
          const rawBody = Buffer.concat(chunks)

          const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
          let event
          if (webhookSecret) {
            try {
              event = stripe.webhooks.constructEvent(rawBody, req.headers["stripe-signature"], webhookSecret)
            } catch (err) {
              console.log("[v0] dev webhook signature failed:", err?.message)
              res.statusCode = 400
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ error: "Invalid signature." }))
              return
            }
          } else {
            // No secret in local dev: accept the unverified event so the flow
            // can be exercised with `stripe trigger` / the Stripe CLI.
            console.log("[v0] dev webhook: STRIPE_WEBHOOK_SECRET unset, skipping verification")
            try {
              event = JSON.parse(rawBody.toString("utf8") || "{}")
            } catch {
              event = {}
            }
          }

          const result = await processSubscriptionEvent(stripe, event)
          console.log("[v0] dev webhook processed:", event?.type, "-", result)
          res.statusCode = 200
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ received: true }))
        } catch (err) {
          console.log("[v0] dev webhook failed:", err?.message)
          res.statusCode = 500
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ error: "Webhook processing failed." }))
        }
      })

      server.middlewares.use("/api/subscribe", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405
          res.setHeader("Allow", "POST")
          res.end(JSON.stringify({ error: "Method not allowed" }))
          return
        }
        try {
          const { stripe } = await server.ssrLoadModule("/api/lib/stripe.js")
          const auth = await server.ssrLoadModule("/api/lib/auth.js")
          const subs = await server.ssrLoadModule("/api/lib/subscriptions.js")

          const member = await auth.getMemberFromReq(req)
          if (!member) {
            res.statusCode = 401
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: "Please sign in to become a member." }))
            return
          }
          if (member.isMember) {
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: "You already have an active membership." }))
            return
          }

          const row = await subs.getMemberRow(member.id)
          let customerId = row?.stripe_customer_id
          if (!customerId) {
            const customer = await stripe.customers.create({
              email: member.email,
              name: [member.firstName, member.lastName].filter(Boolean).join(" ") || undefined,
              metadata: { memberId: String(member.id) },
            })
            customerId = customer.id
            await subs.setStripeCustomer(member.id, customerId)
          }

          const proto = req.headers["x-forwarded-proto"] || "http"
          const host = req.headers["x-forwarded-host"] || req.headers.host
          const origin = `${proto}://${host}`
          const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer: customerId,
            line_items: [subs.membershipLineItem()],
            metadata: { memberId: String(member.id) },
            success_url: `${origin}/account?subscribed=1&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/membership?canceled=1`,
          })

          res.statusCode = 200
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ url: session.url }))
        } catch (err) {
          console.log("[v0] dev subscribe failed:", err?.message)
          res.statusCode = 500
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ error: "Something went wrong. Please try again." }))
        }
      })

      server.middlewares.use("/api/confirm-subscription", async (req, res) => {
        if (req.method !== "GET") {
          res.statusCode = 405
          res.setHeader("Allow", "GET")
          res.end(JSON.stringify({ error: "Method not allowed" }))
          return
        }
        try {
          const { stripe } = await server.ssrLoadModule("/api/lib/stripe.js")
          const auth = await server.ssrLoadModule("/api/lib/auth.js")
          const subs = await server.ssrLoadModule("/api/lib/subscriptions.js")

          const member = await auth.getMemberFromReq(req)
          if (!member) {
            res.statusCode = 401
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: "Please sign in." }))
            return
          }
          const sessionId = new URL(req.url, "http://localhost").searchParams.get("session_id")
          if (!sessionId) {
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: "Missing session_id." }))
            return
          }
          const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["subscription"],
          })
          const sub = session.subscription
          const active = sub && (sub.status === "active" || sub.status === "trialing")
          if (active) {
            await subs.setSubscription(member.id, {
              subscriptionId: sub.id,
              status: sub.status,
              currentPeriodEnd: sub.current_period_end,
            })
          }
          res.statusCode = 200
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ active: Boolean(active) }))
        } catch (err) {
          console.log("[v0] dev confirm-subscription failed:", err?.message)
          res.statusCode = 500
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ error: "Something went wrong verifying your membership." }))
        }
      })

      server.middlewares.use("/api/checkout", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405
          res.setHeader("Allow", "POST")
          res.end(JSON.stringify({ error: "Method not allowed" }))
          return
        }
        try {
          const body = await readJson(req)
          const { stripe } = await server.ssrLoadModule("/api/lib/stripe.js")
          const { validateOrder, applyMemberDiscount, toStripeLineItems, insertPendingOrder } =
            await server.ssrLoadModule("/api/lib/orders.js")
          const { getMemberFromReq, MEMBER_DISCOUNT_RATE } = await server.ssrLoadModule("/api/lib/auth.js")

          const parsed = validateOrder(body)
          if (!parsed.ok) {
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: parsed.error }))
            return
          }

          const member = await getMemberFromReq(req)
          const value = member?.isMember ? applyMemberDiscount(parsed.value, MEMBER_DISCOUNT_RATE) : parsed.value

          const proto = req.headers["x-forwarded-proto"] || "http"
          const host = req.headers["x-forwarded-host"] || req.headers.host
          const origin = `${proto}://${host}`

          const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: toStripeLineItems(value),
            customer_email: value.email,
            success_url: `${origin}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cart?canceled=1`,
          })
          await insertPendingOrder(value, session.id)

          res.statusCode = 200
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ url: session.url }))
        } catch (err) {
          console.log("[v0] dev checkout failed:", err?.message)
          res.statusCode = 500
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ error: "Something went wrong. Please try again." }))
        }
      })

      server.middlewares.use("/api/confirm-order", async (req, res) => {
        if (req.method !== "GET") {
          res.statusCode = 405
          res.setHeader("Allow", "GET")
          res.end(JSON.stringify({ error: "Method not allowed" }))
          return
        }
        try {
          const sessionId = new URL(req.url, "http://localhost").searchParams.get("session_id")
          if (!sessionId) {
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: "Missing session_id." }))
            return
          }
          const { stripe } = await server.ssrLoadModule("/api/lib/stripe.js")
          const { markOrderPaid } = await server.ssrLoadModule("/api/lib/orders.js")

          const session = await stripe.checkout.sessions.retrieve(sessionId)
          const paid = session.payment_status === "paid"
          let order = null
          if (paid) order = await markOrderPaid(sessionId)

          res.statusCode = 200
          res.setHeader("Content-Type", "application/json")
          res.end(
            JSON.stringify({
              paid,
              id: order ? String(order.id) : null,
              totalCents: session.amount_total ?? null,
              email: session.customer_details?.email ?? null,
            }),
          )
        } catch (err) {
          console.log("[v0] dev confirm failed:", err?.message)
          res.statusCode = 500
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ error: "Something went wrong verifying your payment." }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devApiPlugin()],
  esbuild: {
    jsx: "automatic",
  },
  server: {
    host: true,
    allowedHosts: true,
  },
})
