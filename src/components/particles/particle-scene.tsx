'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ParticlesMesh } from './particles-mesh'

// Fullscreen fixed canvas that lives behind all page content on the home.
// z-0 so navbar (z-50) and content (z-10 in page.tsx if needed) float above.
// pointer-events-none so it never intercepts clicks.
// Respects prefers-reduced-motion — hidden entirely if user opted out.
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

  // Adaptive particle count — mobile halves it to stay at 60fps on mid-range GPUs
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const particleCount = isMobile ? 8000 : 20000

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      style={{ contain: 'layout paint', mixBlendMode: 'screen' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <ParticlesMesh count={particleCount} />
      </Canvas>
    </div>
  )
}
