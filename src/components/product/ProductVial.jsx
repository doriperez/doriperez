// 10 mL vial product image keyed by classification.
const VIAL_IMAGES = {
  rx: "/images/vial-rx.png",
  compounded: "/images/vial-compounded.png",
  supplement: "/images/vial-supplement.png",
}

/**
 * Renders the branded 10 mL IVDora vial (emblem-only label) with the product
 * name listed as a clear caption beneath it, followed by a small
 * "for research only" line.
 *
 * The vial artwork only carries the IVDora emblem, and the product name is
 * rendered as real text so it stays crisp, legible, and accurate for every
 * product at any size.
 */
export default function ProductVial({ product, researchLabel, className = "", showCaption = true }) {
  const src = VIAL_IMAGES[product.tag] || VIAL_IMAGES.supplement

  return (
    <figure className={`flex flex-col items-center ${className}`}>
      <img
        src={src || "/placeholder.svg"}
        alt={`${product.name} — 10 mL IVDora vial, for research use only`}
        className="min-h-0 flex-1 object-contain"
        width={1024}
        height={1024}
        loading="lazy"
      />
      {showCaption && (
        <figcaption className="mt-2 shrink-0 text-center leading-tight">
          <span className="block text-balance font-display text-base font-semibold text-foreground">
            {product.name}
          </span>
          <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-muted-foreground">
            {researchLabel}
          </span>
        </figcaption>
      )}
    </figure>
  )
}
