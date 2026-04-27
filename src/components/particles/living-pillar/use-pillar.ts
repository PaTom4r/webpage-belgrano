// Hook that owns the Wave Field animation loop. Mounts on a <canvas> element
// ref and a wrapping container ref; resizes with the container, listens to
// mouse events on the container, and runs the physics loop until unmount.
// Honors prefers-reduced-motion (renders one static frame and stops).
'use client'

import { useEffect } from 'react'

import { FIELD_CONFIG } from './config'
import {
  createWaveField,
  drawWaveField,
  stepWaveField,
  type CursorState,
  type FieldDimensions,
  type WaveParticle,
} from './particles'

type UsePillarOptions = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  containerRef: React.RefObject<HTMLElement | null>
}

function isMobileViewport(width: number) {
  return width < 768
}

function dimensionsFor(viewportWidth: number): FieldDimensions {
  if (isMobileViewport(viewportWidth)) {
    return { cols: FIELD_CONFIG.COLS_MOBILE, rows: FIELD_CONFIG.ROWS_MOBILE }
  }
  return { cols: FIELD_CONFIG.COLS_DESKTOP, rows: FIELD_CONFIG.ROWS_DESKTOP }
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

    let particles: WaveParticle[] = []
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

      canvas.width = Math.round(cssWidth * dpr)
      canvas.height = Math.round(cssHeight * dpr)
      canvas.style.width = `${cssWidth}px`
      canvas.style.height = `${cssHeight}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      const dims = dimensionsFor(window.innerWidth)
      particles = createWaveField(dims, cssWidth, cssHeight)
    }

    const tick = () => {
      const now = performance.now()
      const elapsed = now - startedAt

      stepWaveField(particles, cursor, elapsed, reducedMotion)

      ctx.clearRect(0, 0, cssWidth, cssHeight)
      drawWaveField(ctx, particles)

      rafId = requestAnimationFrame(tick)
    }

    const onPointerMove = (e: PointerEvent) => {
      // Touch / pen events can fire pointermove during scrolling — only react
      // to a real mouse so vertical scroll on mobile never deforms the field.
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
      ctx.clearRect(0, 0, cssWidth, cssHeight)
      drawWaveField(ctx, particles)
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
