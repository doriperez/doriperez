import { useSearchParams } from "react-router-dom"
import Membership from "../components/sections/Membership.jsx"

export default function MembershipPage() {
  const [params] = useSearchParams()
  const canceled = params.get("canceled") === "1"

  return (
    <>
      {canceled ? (
        <div className="container-page pt-6">
          <p role="alert" className="rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
            Checkout was canceled — you have not been charged. You can join anytime.
          </p>
        </div>
      ) : null}
      <Membership />
    </>
  )
}
