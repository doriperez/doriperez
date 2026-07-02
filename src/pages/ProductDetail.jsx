import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import { ArrowLeft, ShieldAlert, ShoppingCart, Check } from "lucide-react"
import Button from "../components/ui/Button.jsx"
import ProductCard from "../components/product/ProductCard.jsx"
import ProductVial from "../components/product/ProductVial.jsx"
import { useContent } from "../i18n/LangContext.jsx"
import { useCart } from "../cart/CartContext.jsx"
import { formatPrice } from "../cart/format.js"

const TAG_TONES = {
  rx: "bg-rx-soft text-rx",
  compounded: "bg-compounded-soft text-compounded",
  supplement: "bg-supplement-soft text-supplement",
}

export default function ProductDetail() {
  const { slug } = useParams()
  const { t, lang, getProductBySlug, getRelatedProducts, getProductCategories } = useContent()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const product = getProductBySlug(slug)

  const handleAdd = () => {
    addItem(product.slug, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  if (!product) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-foreground">{t.productDetail.notFound}</h1>
        <Button to="/" className="mt-6">
          {t.productDetail.backHome}
        </Button>
      </div>
    )
  }

  const cats = getProductCategories(product)
  const related = getRelatedProducts(product).slice(0, 3)

  return (
    <>
      <section className="bg-primary-soft/50">
        <div className="container-page py-14 md:py-20">
          <Link
            to="/#programs"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {t.productDetail.backToPrograms}
          </Link>

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 font-display text-xs font-semibold ${
                  TAG_TONES[product.tag] || TAG_TONES.supplement
                }`}
              >
                {product.tagLabel}
              </span>

              <h1 className="mt-4 text-balance font-display text-4xl font-semibold text-foreground md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {product.blurb}
              </p>

              <div className="mt-7 flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold text-foreground">
                  {formatPrice(product.price, lang)}
                </span>
                <span className="text-sm text-muted-foreground">{t.productDetail.perVial}</span>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button onClick={handleAdd} size="lg">
                  {added ? (
                    <>
                      <Check size={18} aria-hidden="true" />
                      {t.productDetail.added}
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} aria-hidden="true" />
                      {t.productDetail.addToCart}
                    </>
                  )}
                </Button>
                <Button to="/consultation" variant="secondary" size="lg">
                  {t.productDetail.startCta}
                </Button>
              </div>
            </div>

            <div className="order-first md:order-last">
              <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <ProductVial
                  product={product}
                  researchLabel={t.productDetail.researchOnly}
                  className="h-72 md:h-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 md:grid-cols-3 md:py-16">
        {/* Overview + classification */}
        <div className="md:col-span-2">
          <h2 className="font-display text-xl font-semibold text-foreground">{t.productDetail.overview}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{product.blurb}</p>

          <h3 className="mt-8 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t.productDetail.partOf}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {cats.map((c) => (
              <Link
                key={c.id}
                to={`/program/${c.id}`}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-primary"
              >
                {c.short}
              </Link>
            ))}
          </div>
        </div>

        {/* Classification / safety aside */}
        <aside className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t.productDetail.classification}
          </h3>
          <span
            className={`mt-3 inline-flex items-center rounded-full px-3 py-1 font-display text-xs font-semibold ${
              TAG_TONES[product.tag] || TAG_TONES.supplement
            }`}
          >
            {product.tagLabel}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.tagNote}</p>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-muted p-4">
            <ShieldAlert size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-muted-foreground">{t.safety.disclaimerBody}</p>
          </div>
        </aside>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section id="related" className="scroll-mt-24 bg-primary-soft/40">
          <div className="container-page py-14 md:py-16">
            <h2 className="mb-8 font-display text-xl font-semibold text-foreground">
              {t.productDetail.relatedTitle}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
