'use client'

import { useEffect, useRef, useState, type MutableRefObject } from 'react'
import { Canvas } from '@react-three/fiber'
import { ParticlesMesh } from './particles-mesh'
import {
  DEFAULT_PARTICLE_TIMELINE_STATE,
  getParticleTimelineState,
  type ParticleSectionId,
  type ParticleSectionMeasurement,
  type ParticleTimelineState,
} from './particle-timeline'

const SECTION_IDS: ParticleSectionId[] = ['hero', 'verticales', 'stats', 'cta']

function measureSections() {
  return SECTION_IDS.flatMap<ParticleSectionMeasurement>((id) => {
    const element = document.getElementById(id)
    if (!element) return []
    const rect = element.getBoundingClientRect()

    return {
      id,
      top: rect.top + window.scrollY,
      height: rect.height,
    }
  })
}

function useParticleOrchestrator(): MutableRefObject<ParticleTimelineState> {
  const stateRef = useRef<ParticleTimelineState>(DEFAULT_PARTICLE_TIMELINE_STATE)

  useEffect(() => {
    let rafId = 0
    let sections = measureSections()

    const update = () => {
      rafId = 0
      sections = sections.length === SECTION_IDS.length ? sections : measureSections()
      stateRef.current = getParticleTimelineState({
        scrollY: window.scrollY,
        viewportHeight: window.innerHeight,
        documentHeight: document.documentElement.scrollHeight,
        sections,
      })
    }

    const tick = () => {
      if (rafId) return
      rafId = requestAnimationFrame(update)
    }

    const remeasure = () => {
      sections = measureSections()
      tick()
    }

    update()
    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', remeasure)
    return () => {
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', remeasure)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return stateRef
}

// Scroll-driven orchestration layer. Particles morph into UI-like formations
// that support the section narrative, then dissolve before conversion surfaces.
export function ParticleScene() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sceneState = useParticleOrchestrator()

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (prefersReducedMotion) return null

  // Adaptive particle count: mobile keeps the experience light.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const particleCount = isMobile ? 5200 : 14000

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20"
      style={{
        contain: 'layout paint',
        mixBlendMode: 'screen',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <ParticlesMesh count={particleCount} sceneState={sceneState} />
      </Canvas>
    </div>
  )
}
