'use client'

import { useEffect, useRef } from 'react'

// Tracks document scroll as 0..1 progress. Updated via scroll + resize events
// with requestAnimationFrame throttling. Returns a ref so R3F's useFrame can
// read the latest value every tick without causing re-renders.
export function useScrollProgress() {
  const progressRef = useRef(0)

  useEffect(() => {
    let rafId = 0
    const update = () => {
      rafId = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const scroll = window.scrollY
      progressRef.current = max > 0 ? Math.min(1, Math.max(0, scroll / max)) : 0
    }
    const tick = () => {
      if (rafId) return
      rafId = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', tick)
    return () => {
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return progressRef
}
