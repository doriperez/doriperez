import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import ProductCard from "../components/product/ProductCard.jsx"
import Button from "../components/ui/Button.jsx"
import { useContent } from "../i18n/LangContext.jsx"

export default function Category() {
  const { id } = useParams()
  const { t, getCategory } = useContent()
  const category = getCategory(id)

  if (!category) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-foreground">{t.categoryPage.notFound}</h1>
        <Button to="/" className="mt-6">
          {t.categoryPage.backHome}
        </Button>
      </div>
    )
  }

  return (
    <>
      <section className="bg-primary-soft/50">
        <div className="container-page py-14 md:py-20">
          <Link
            to="/#programs"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {t.header.allPrograms}
          </Link>
          <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {category.short}
          </span>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-3xl font-semibold text-foreground md:text-4xl">
            {category.label}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {category.description}
          </p>
          <Button to="/consultation" size="lg" className="mt-8">
            {t.categoryPage.startCta}
          </Button>
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <h2 className="mb-8 font-display text-xl font-semibold text-foreground">
          {t.categoryPage.optionsTitle(category.label)}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {category.products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
