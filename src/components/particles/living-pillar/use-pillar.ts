// Hook that owns the Living Pillar animation loop. Mounts on a <canvas>
// element ref and a wrapping container ref; resizes with the container,
// listens to mouse events on the container, and runs the physics loop until
// unmount. Honors prefers-reduced-motion (renders one static frame and stops).
'use client'

import { useEffect } from 'react'

import { PILLAR_CONFIG } from './config'
import {
  createParticles,
  drawParticles,
  stepParticles,
  type CursorState,
  type Particle,
} from './particles'

type UsePillarOptions = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  containerRef: React.RefObject<HTMLElement | null>
}

function isMobileViewport(width: number) {
  return width < 768
}

export function useLivingPillar({ canvasRef, containerRef }: UsePillarOptions) {
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let particles: Particle[] = []
    const cursor: CursorState = { x: -9999, y: -9999, active: false }
    let cssWidth = 0
    let cssHeight = 0
    let dpr = 1
    let rafId = 0
    let startedAt = performance.now()

    const setupCanvas = () => {
      const rect = container.getBoundingClientRect()
      cssWidth = Math.max(1, Math.round(rect.width))
      cssHeight = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      // Match the framebuffer to the container size at the device pixel ratio
      // so particles stay crisp on retina without being oversized.
      canvas.width = Math.round(cssWidth * dpr)
      canvas.height = Math.round(cssHeight * dpr)
      canvas.style.width = `${cssWidth}px`
      canvas.style.height = `${cssHeight}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      const count = isMobileViewport(window.innerWidth)
        ? PILLAR_CONFIG.COUNT_MOBILE
        : PILLAR_CONFIG.COUNT_DESKTOP

      particles = createParticles(count, cssWidth, cssHeight)
    }

    const tick = () => {
      const now = performance.now()
      const elapsed = now - startedAt

      stepParticles(particles, cursor, cssWidth, cssHeight, elapsed, reducedMotion)

      ctx.clearRect(0, 0, cssWidth, cssHeight)
      drawParticles(ctx, particles)

      rafId = requestAnimationFrame(tick)
    }

    const onPointerMove = (e: PointerEvent) => {
      // Touch / pen events can fire pointermove during scrolling — only react
      // to a real mouse so vertical scroll on mobile never pulls the column
      // sideways.
      if (e.pointerType !== 'mouse') return
      const rect = container.getBoundingClientRect()
      cursor.x = e.clientX - rect.left
      cursor.y = e.clientY - rect.top
      cursor.active = true
    }

    const onPointerLeave = () => {
      cursor.active = false
      cursor.x = -9999
      cursor.y = -9999
    }

    // ResizeObserver keeps the canvas in sync with whatever the container does.
    const resizeObs = new ResizeObserver(() => {
      setupCanvas()
    })
    resizeObs.observe(container)

    container.addEventListener('pointermove', onPointerMove, { passive: true })
    container.addEventListener('pointerleave', onPointerLeave, { passive: true })
    container.addEventListener('pointerout', onPointerLeave, { passive: true })

    setupCanvas()
    startedAt = performance.now()

    if (reducedMotion) {
      // One static render, no loop.
      ctx.clearRect(0, 0, cssWidth, cssHeight)
      drawParticles(ctx, particles)
    } else {
      rafId = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(rafId)
      resizeObs.disconnect()
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
      container.removeEventListener('pointerout', onPointerLeave)
    }
  }, [canvasRef, containerRef])
}
