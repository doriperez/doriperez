import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Header from "./components/layout/Header.jsx"
import Footer from "./components/layout/Footer.jsx"
import Home from "./pages/Home.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"
import Category from "./pages/Category.jsx"
import FAQ from "./pages/FAQ.jsx"
import Journal from "./pages/Journal.jsx"
import JournalAdmin from "./pages/JournalAdmin.jsx"
import Consultation from "./pages/Consultation.jsx"
import Cart from "./pages/Cart.jsx"
import CheckoutSuccess from "./pages/CheckoutSuccess.jsx"
import MembershipPage from "./pages/Membership.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Account from "./pages/Account.jsx"

// Scrolls to top on route change, and to the hash target when present.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/program/:id" element={<Category />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/admin" element={<JournalAdmin />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/success" element={<CheckoutSuccess />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
