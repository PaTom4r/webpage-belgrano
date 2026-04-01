// src/components/animations/animated-counter.tsx
// GSAP-powered counter that animates from 0 to target when scrolled into view.
// Respects prefers-reduced-motion: skips animation, shows final value immediately.
// Import GSAP exclusively from '@/lib/gsap-config' — never directly from 'gsap'.
'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-config'

interface AnimatedCounterProps {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // Full animation for users with no motion preference
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate() {
          if (counterRef.current) {
            counterRef.current.textContent =
              prefix + Math.round(obj.val).toLocaleString('es-CL') + suffix
          }
        },
      })
    })

    // Reduced motion: show final value immediately, no animation
    mm.add('(prefers-reduced-motion: reduce)', () => {
      if (counterRef.current) {
        counterRef.current.textContent = prefix + target.toLocaleString('es-CL') + suffix
      }
    })
  }, { scope: counterRef })

  return (
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
