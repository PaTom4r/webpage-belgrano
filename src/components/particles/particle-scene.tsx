'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ParticlesMesh } from './particles-mesh'

// Ambient vertical particle column — lives BEHIND most of the page content
// at z-[1], visible only through sections that have transparent or
// semi-transparent backgrounds. The body bg is dark so particles blend into
// the page atmosphere rather than sitting on top as an overlay.
// pointer-events-none so it never intercepts clicks.
// Respects prefers-reduced-motion — canvas hidden entirely if user opted out.
export function ParticleScene() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (prefersReducedMotion) return null

  // Adaptive particle count — mobile halves it for mid-range GPUs
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const particleCount = isMobile ? 8000 : 18000

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20"
      style={{ contain: 'layout paint', mixBlendMode: 'screen' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <ParticlesMesh count={particleCount} />
      </Canvas>
    </div>
  )
}
