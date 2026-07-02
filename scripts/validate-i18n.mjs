// Quick validation that buildContent() produces complete, non-undefined
// content for every language. Run with: node scripts/validate-i18n.mjs
import { LANGS } from "../src/i18n/translations.js"
import { buildContent } from "../src/i18n/content.js"

let problems = 0
const flag = (msg) => {
  problems++
  console.log("  MISSING:", msg)
}

for (const { code } of LANGS) {
  console.log(`\n=== ${code} ===`)
  const c = buildContent(code)

  if (!c.t || typeof c.t !== "object") flag("ui (t) object")
  if (!c.promo?.text) flag("promo.text")

  c.products.forEach((p) => {
    if (!p.name) flag(`product ${p.slug} .name`)
    if (!p.benefit) flag(`product ${p.slug} .benefit`)
    if (!p.tagline) flag(`product ${p.slug} .tagline`)
    if (!Array.isArray(p.howItWorks) || p.howItWorks.some((s) => !s.title)) flag(`product ${p.slug} .howItWorks`)
    if (!Array.isArray(p.faqs) || p.faqs.some((f) => !f.q)) flag(`product ${p.slug} .faqs`)
  })

  c.categories.forEach((cat) => {
    if (!cat.label) flag(`category ${cat.id} .label`)
    if (!cat.headline) flag(`category ${cat.id} .headline`)
    if (!cat.disclaimer) flag(`category ${cat.id} .disclaimer`)
  })

  c.nav.forEach((n, i) => {
    if (!n.label) flag(`nav[${i}].label`)
    n.columns.forEach((col, ci) => {
      if (!col.heading) flag(`nav[${i}].columns[${ci}].heading`)
      col.links.forEach((l, li) => {
        if (!l.label) flag(`nav[${i}].columns[${ci}].links[${li}].label`)
      })
    })
  })

  c.heroSlides.forEach((h, i) => {
    if (!h.headline) flag(`hero[${i}].headline`)
    if (!h.ctaLabel) flag(`hero[${i}].ctaLabel`)
  })

  c.whyUs.forEach((w, i) => {
    if (!w.title) flag(`whyUs[${i}].title`)
    if (!w.icon) flag(`whyUs[${i}].icon`)
  })

  c.testimonials.forEach((t, i) => {
    if (!t.quote) flag(`testimonials[${i}].quote`)
    if (!t.label) flag(`testimonials[${i}].label`)
  })

  if (!c.stats?.big) flag("stats.big")
  if (!c.stats?.bigSub) flag("stats.bigSub")

  c.expertStats.forEach((e, i) => {
    if (!e.stat) flag(`expertStats[${i}].stat`)
  })

  c.experts.forEach((e, i) => {
    if (!e.title) flag(`experts[${i}].title`)
    if (!e.bio) flag(`experts[${i}].bio`)
  })

  c.articles.forEach((a, i) => {
    if (!a.title) flag(`articles[${i}].title`)
    if (!a.category) flag(`articles[${i}].category`)
  })

  if (!Array.isArray(c.articleFilters) || !c.articleFilters.length) flag("articleFilters")

  c.plans.forEach((p, i) => {
    if (!p.name) flag(`plans[${i}].name`)
    if (!Array.isArray(p.features) || !p.features.length) flag(`plans[${i}].features`)
  })

  if (!Array.isArray(c.billingFaqs) || c.billingFaqs.some((f) => !f.q)) flag("billingFaqs")
  if (!Array.isArray(c.faqGroups) || c.faqGroups.some((g) => !g.category)) flag("faqGroups")

  c.quizSteps.forEach((q) => {
    if (!q.question) flag(`quizStep ${q.id} .question`)
  })

  console.log(`  products:${c.products.length} nav:${c.nav.length} hero:${c.heroSlides.length} quiz:${c.quizSteps.length} plans:${c.plans.length}`)
}

console.log(`\n${problems === 0 ? "ALL GOOD ✓" : problems + " PROBLEM(S)"}`)
process.exit(problems === 0 ? 0 : 1)
