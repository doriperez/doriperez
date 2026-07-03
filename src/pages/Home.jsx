import Ticker from "../components/layout/Ticker.jsx"
import Hero from "../components/sections/Hero.jsx"
import Programs from "../components/sections/Programs.jsx"
import Insights from "../components/sections/Insights.jsx"
import HsaShop from "../components/sections/HsaShop.jsx"
import Membership from "../components/sections/Membership.jsx"
import Safety from "../components/sections/Safety.jsx"

export default function Home() {
  return (
    <>
      <Ticker />
      <Hero />
      <Programs />
      <Insights />
      <HsaShop />
      <Membership />
      <Safety />
    </>
  )
}
