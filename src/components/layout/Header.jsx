import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronDown, Menu, X, ArrowRight, ShoppingBag, User } from "lucide-react"
import Logo from "../ui/Logo.jsx"
import Button from "../ui/Button.jsx"
import LanguageSwitcher from "../ui/LanguageSwitcher.jsx"
import { useContent } from "../../i18n/LangContext.jsx"
import { useCart } from "../../cart/CartContext.jsx"
import { useAuth } from "../../auth/AuthContext.jsx"

// Cart icon button with a live item-count badge.
function CartButton({ label }) {
  const { count } = useCart()
  return (
    <Link
      to="/cart"
      className="relative rounded-full p-2 text-foreground hover:bg-muted"
      aria-label={`${label}${count > 0 ? ` (${count})` : ""}`}
    >
      <ShoppingBag size={20} aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  )
}

// Account icon: links to the account page when signed in, sign-in when not.
function AccountButton({ label }) {
  const { isAuthed } = useAuth()
  return (
    <Link
      to={isAuthed ? "/account" : "/login"}
      className="rounded-full p-2 text-foreground hover:bg-muted"
      aria-label={label}
    >
      <User size={20} aria-hidden="true" />
    </Link>
  )
}

export default function Header() {
  const { t, nav } = useContent()
  const { isAuthed } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const megaRef = useRef(null)
  const { pathname, hash } = useLocation()

  // Close menus on route/hash change.
  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [pathname, hash])

  // Close mega-menu on outside click / Escape.
  useEffect(() => {
    if (!megaOpen) return
    const onClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false)
    }
    const onKey = (e) => e.key === "Escape" && setMegaOpen(false)
    document.addEventListener("mousedown", onClick)
    window.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      window.removeEventListener("keydown", onKey)
    }
  }, [megaOpen])

  const links = [
    { label: t.header.shop, href: "/#hsa-store" },
    { label: "Membership", href: "/membership" },
    { label: t.header.safety, href: "/#safety" },
    { label: t.header.journal, href: "/journal" },
    { label: t.header.faq, href: "/faq" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label={t.header.primaryNav}>
          <div ref={megaRef} className="relative">
            <button
              onClick={() => setMegaOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              aria-haspopup="true"
              aria-expanded={megaOpen}
            >
              {t.header.programs}
              <ChevronDown
                size={15}
                aria-hidden="true"
                className={megaOpen ? "rotate-180 transition-transform" : "transition-transform"}
              />
            </button>

            {megaOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-[42rem] max-w-[90vw] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-soft-lg">
                <div className="grid grid-cols-2 gap-1">
                  {nav.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className="group flex flex-col gap-1 rounded-xl p-4 transition-colors hover:bg-primary-soft"
                    >
                      <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary">
                        {item.label}
                      </span>
                      <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/#programs"
                  className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-muted px-4 py-3 text-sm font-semibold text-primary hover:bg-primary-soft"
                >
                  {t.header.allPrograms}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>

          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <AccountButton label={isAuthed ? "Your account" : "Sign in"} />
          <CartButton label={t.cart.open} />
          <Button to="/consultation" size="sm">
            {t.header.consult}
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 lg:hidden">
          <AccountButton label={isAuthed ? "Your account" : "Sign in"} />
          <CartButton label={t.cart.open} />
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full p-2 text-foreground hover:bg-muted"
            aria-label={mobileOpen ? t.header.closeMenu : t.header.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav className="border-t border-border bg-card lg:hidden" aria-label={t.header.mobileNav}>
          <div className="container-page py-4">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t.header.programs}
            </p>
            {nav.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="block rounded-xl px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-3 border-t border-border" />
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block rounded-xl px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-4">
              <Button to="/consultation" className="w-full">
                {t.header.consult}
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
