// The Canvas wrapper for the hero particle entity.
// - Mounts the R3F <Canvas> contained inside whatever element wraps it (no fixed positioning).
// - Picks a particle count + point size based on viewport width.
// - Owns the cursor + scroll refs so children only see ref objects, never re-rendering.
// - Skips the heavy work entirely on prefers-reduced-motion AND when WebGL isn't available
//   (Suspense fallback shows a faint static gradient so the layout never collapses).
'use client'

import { Canvas } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'

import { HeroParticlesMesh } from './hero-particles-mesh'
import { useCursorPosition } from './use-cursor-position'
import { useHeroScrollProgress } from './use-hero-scroll'

type Props = {
  /** Element that defines the scroll range scrubbed by the morph (the hero <section>). */
  scrollTriggerRef: React.RefObject<HTMLElement | null>
  /** Background color the particles fade toward when the cursor is near them. */
  bgColor?: string
  /** Initial particle color — Phase 1 keeps this white throughout the hero. */
  baseColor?: string
}

export function HeroParticleEntity({
  scrollTriggerRef,
  bgColor = '#09090B',
  baseColor = '#ffffff',
}: Props) {
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useCursorPosition(canvasContainerRef)
  const scrollRef = useHeroScrollProgress(scrollTriggerRef)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window === 'undefined' ? 1440 : window.innerWidth,
  )

  // Track prefers-reduced-motion live.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Track viewport for desktop/mobile particle budgets. Coarse — only fires on resize.
  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const { count, pointSize } = useMemo(() => {
    if (viewportWidth < 768) return { count: 5000, pointSize: 5.5 }
    if (viewportWidth < 1280) return { count: 9000, pointSize: 5.0 }
    return { count: 14000, pointSize: 4.6 }
  }, [viewportWidth])

  return (
    <div
      ref={canvasContainerRef}
      className="absolute inset-0"
      style={{
        // Touch scrolling stays smooth — only x-pan would conflict with vertical scroll.
        touchAction: 'pan-y',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <HeroParticlesMesh
          count={count}
          baseColor={baseColor}
          bgColor={bgColor}
          pointSize={pointSize}
          cursorRef={cursorRef}
          scrollRef={scrollRef}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  )
}
