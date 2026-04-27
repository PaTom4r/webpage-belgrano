// The actual <points> mesh.
// - Builds BufferGeometry once from the precomputed shapes.
// - Owns the ShaderMaterial and all uniforms.
// - useFrame pulls scroll progress + cursor state from refs and writes uniforms
//   without touching React state.
'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useEffect } from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  NormalBlending,
  ShaderMaterial,
  type Points,
} from 'three'

import { createHeroParticleField } from './hero-particle-shapes'
import { HERO_COLOR_TIMELINE, sampleColorTimeline } from './color-timeline'
import type { CursorState } from './use-cursor-position'
import { heroVertexShader, heroFragmentShader } from './hero-particle-shaders'

type Props = {
  count: number
  bgColor: string
  baseColor: string
  pointSize: number
  cursorRef: React.RefObject<CursorState>
  scrollRef: React.RefObject<number>
  reducedMotion: boolean
}

export function HeroParticlesMesh({
  count,
  bgColor,
  baseColor,
  pointSize,
  cursorRef,
  scrollRef,
  reducedMotion,
}: Props) {
  const pointsRef = useRef<Points>(null)
  const targetColor = useRef(new Color(baseColor))
  const currentColor = useRef(new Color(baseColor))

  const { geometry, material } = useMemo(() => {
    const field = createHeroParticleField(count)

    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(field.base.slice(), 3)) // updated in shader
    geo.setAttribute('aBase', new BufferAttribute(field.base, 3))
    geo.setAttribute('aMid', new BufferAttribute(field.mid, 3))
    geo.setAttribute('aEnd', new BufferAttribute(field.end, 3))
    geo.setAttribute('aSeed', new BufferAttribute(field.seeds, 1))
    geo.setAttribute('aSize', new BufferAttribute(field.sizes, 1))

    const mat = new ShaderMaterial({
      vertexShader: heroVertexShader,
      fragmentShader: heroFragmentShader,
      transparent: true,
      depthWrite: false,
      // NormalBlending — additive saturated to a solid white block at this density.
      blending: NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uMorphProgress: { value: 0 },
        uPointSize: { value: pointSize },
        uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
        uColor: { value: new Color(baseColor) },
        uBgColor: { value: new Color(bgColor) },
        uCursor: { value: [999, 999] },
        uCursorRadius: { value: 0.22 },
        uOpacity: { value: 0 }, // fades in below
        uHasCursor: { value: 0 },
      },
    })

    return { geometry: geo, material: mat }
  }, [count, baseColor, bgColor, pointSize])

  // Fade in once after mount so first paint never flashes.
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 600)
      ;(material.uniforms.uOpacity.value as number) = t
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [material])

  // Update bg/color when props change (will be more interesting in Phase 2).
  useEffect(() => {
    ;(material.uniforms.uBgColor.value as Color).set(bgColor)
  }, [material, bgColor])

  useFrame((_, delta) => {
    const u = material.uniforms

    // Time always advances so wobble keeps breathing.
    u.uTime.value += delta

    if (reducedMotion) {
      u.uMorphProgress.value = 0
      u.uHasCursor.value = 0
      return
    }

    // Scroll-driven morph.
    u.uMorphProgress.value = scrollRef.current ?? 0

    // Cursor — copy the ref values in (no allocation).
    const cursor = cursorRef.current
    if (cursor) {
      const arr = u.uCursor.value as number[]
      arr[0] = cursor.ndc.x
      arr[1] = cursor.ndc.y
      u.uHasCursor.value = cursor.active ? 1 : 0
    }

    // Sample color timeline (Phase 1 = constant white; Phase 2 will scroll-drive this).
    sampleColorTimeline(HERO_COLOR_TIMELINE, scrollRef.current ?? 0, targetColor.current)
    currentColor.current.lerp(targetColor.current, Math.min(1, delta * 4))
    ;(u.uColor.value as Color).copy(currentColor.current)
  })

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
}
