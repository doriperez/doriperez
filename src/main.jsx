import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { LangProvider } from "./i18n/LangContext.jsx"
import { CartProvider } from "./cart/CartContext.jsx"
import { AuthProvider } from "./auth/AuthContext.jsx"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LangProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </LangProvider>
  </StrictMode>,
)
