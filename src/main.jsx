import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { LangProvider } from "./i18n/LangContext.jsx"
import { CartProvider } from "./cart/CartContext.jsx"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LangProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </LangProvider>
  </StrictMode>,
)
