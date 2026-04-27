// GSAP ScrollTrigger that scrubs a 0..1 progress value across the hero element.
// The mesh reads the resulting ref inside useFrame to update uMorphProgress.
// Using a ref (not state) avoids re-rendering React on every scroll tick.
'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'

export function useHeroScrollProgress<T extends HTMLElement>(
  triggerRef: React.RefObject<T | null>,
) {
  const progressRef = useRef(0)

  useEffect(() => {
    const el = triggerRef.current
    if (!el) return

    const proxy = { p: 0 }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.3,
      onUpdate: (self) => {
        // gsap.to() with scrub already smooths self.progress, but using the
        // proxy lets us read whatever GSAP last wrote regardless of throttling.
        gsap.to(proxy, { p: self.progress, duration: 0, overwrite: true })
        progressRef.current = self.progress
      },
    })

    return () => {
      st.kill()
    }
  }, [triggerRef])

  return progressRef
}
