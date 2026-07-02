import { Link } from "react-router-dom"
import { Mail, Phone } from "lucide-react"
import Logo from "../ui/Logo.jsx"
import { site } from "../../data/site.js"
import { useContent } from "../../i18n/LangContext.jsx"

/**
 * Renders a link that is either an in-app route (Link) or an in-page
 * anchor / hash link (plain <a>), based on whether href contains "#".
 */
function FooterLink({ href, children }) {
  const isHash = href.includes("#")
  const cls = "text-sm text-muted-foreground transition-colors hover:text-primary"
  return isHash ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link to={href} className={cls}>
      {children}
    </Link>
  )
}

export default function Footer() {
  const { t, nav } = useContent()

  return (
    <footer id="contact" className="mt-auto border-t border-border bg-primary text-primary-foreground">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-4">
            <Logo to={null} variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-primary-foreground/75">
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 hover:text-accent">
                <Mail size={15} aria-hidden="true" />
                {site.contact.email}
              </a>
              <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 hover:text-accent">
                <Phone size={15} aria-hidden="true" />
                {site.contact.phone}
              </a>
            </div>
          </div>

          {/* Programs */}
          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
              {t.footer.programsHeading}
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link to={item.href} className="text-sm text-primary-foreground/75 transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Support */}
          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
                {t.footer.companyHeading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {t.footer.company.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
                {t.footer.supportHeading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {t.footer.support.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Legal / disclaimers */}
        <div className="mt-12 space-y-3 border-t border-primary-foreground/15 pt-8">
          <p className="text-xs leading-relaxed text-primary-foreground/55">{t.footer.legal}</p>
          <p className="text-xs italic leading-relaxed text-primary-foreground/45">{t.footer.placeholderNote}</p>
          <p className="pt-2 text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
