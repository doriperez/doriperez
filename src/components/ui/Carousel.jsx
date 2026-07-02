import { useCallback, useEffect, useRef, useState } from "react"

/**
 * useCarousel — small headless hook powering auto-advancing carousels.
 * Returns index, controls, and auto-play pause handlers.
 */
export function useCarousel(length, { autoPlay = true, interval = 6000 } = {}) {
  const [index, setIndex] = useState(0)
  const timer = useRef(null)
  const paused = useRef(false)

  const go = useCallback(
    (next) => setIndex(((next % length) + length) % length),
    [length]
  )
  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  useEffect(() => {
    if (!autoPlay || length <= 1) return
    timer.current = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % length)
    }, interval)
    return () => clearInterval(timer.current)
  }, [autoPlay, interval, length])

  const pauseProps = {
    onMouseEnter: () => (paused.current = true),
    onMouseLeave: () => (paused.current = false),
    onFocus: () => (paused.current = true),
    onBlur: () => (paused.current = false),
  }

  return { index, setIndex: go, next, prev, pauseProps }
}

/** Dot indicators for carousels. */
export function Dots({ count, index, onSelect, label = "slide" }) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Carousel navigation">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === index}
          aria-label={`Go to ${label} ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            i === index ? "w-7 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/50"
          }`}
        />
      ))}
    </div>
  )
}
