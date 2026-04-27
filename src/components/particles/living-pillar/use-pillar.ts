// Hook that owns the Wave Field animation loop. Mounts on a <canvas> element
// ref and a wrapping container ref; resizes with the container, listens to
// mouse events on the container, and runs the physics loop until unmount.
// Honors prefers-reduced-motion (renders one static frame and stops).
//
// Note: the cursor listener is attached to `window`, not the container. This
// works around a layout pitfall where higher-z DOM (the headline wrapper) sits
// on top of the canvas at typical zoom levels and would otherwise eat the
// pointermove events. The handler still maps the event into canvas-local
// coords using the container's bounding rect.
'use client'

import { useEffect } from 'react'

import { FIELD_CONFIG } from './config'
import {
  createWaveField,
  drawWaveField,
  stepWaveField,
  type CursorState,
  type WaveField,
} from './particles'

type UsePillarOptions = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  containerRef: React.RefObject<HTMLElement | null>
}

function isMobileViewport(width: number) {
  return width < 768
}

function particleCountFor(viewportWidth: number): number {
  return isMobileViewport(viewportWidth)
    ? FIELD_CONFIG.COUNT_MOBILE
    : FIELD_CONFIG.COUNT_DESKTOP
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

    let field: WaveField | null = null
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

      field = createWaveField(
        particleCountFor(window.innerWidth),
        cssWidth,
        cssHeight,
      )
    }

    const tick = () => {
      if (!field) return
      const now = performance.now()
      const elapsed = now - startedAt

      stepWaveField(field, cursor, cssWidth, cssHeight, elapsed, reducedMotion)

      ctx.clearRect(0, 0, cssWidth, cssHeight)
      drawWaveField(ctx, field)

      rafId = requestAnimationFrame(tick)
    }

    // Map a window-level mouse event into canvas-local coords. Returns true
    // when the cursor is over the canvas, false otherwise.
    const updateCursorFromEvent = (e: MouseEvent | PointerEvent): boolean => {
      const rect = container.getBoundingClientRect()
      const localX = e.clientX - rect.left
      const localY = e.clientY - rect.top
      const inside =
        localX >= 0 &&
        localY >= 0 &&
        localX <= rect.width &&
        localY <= rect.height
      cursor.x = localX
      cursor.y = localY
      cursor.active = inside
      return inside
    }

    const onPointerMove = (e: PointerEvent) => {
      // Skip touch / pen so vertical scroll on mobile never deforms the field.
      if (e.pointerType && e.pointerType !== 'mouse') return
      updateCursorFromEvent(e)
    }

    const onMouseMove = (e: MouseEvent) => {
      updateCursorFromEvent(e)
    }

    const onWindowLeave = () => {
      cursor.active = false
      cursor.x = -9999
      cursor.y = -9999
    }

    const resizeObs = new ResizeObserver(() => {
      setupCanvas()
    })
    resizeObs.observe(container)

    // Listen on window so the listener is never blocked by overlay elements
    // (headline wrapper, etc.) regardless of z-index or zoom level.
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onWindowLeave, { passive: true })
    document.addEventListener('mouseleave', onWindowLeave, { passive: true })

    setupCanvas()
    startedAt = performance.now()

    if (reducedMotion && field) {
      ctx.clearRect(0, 0, cssWidth, cssHeight)
      drawWaveField(ctx, field)
    } else {
      rafId = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(rafId)
      resizeObs.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onWindowLeave)
      document.removeEventListener('mouseleave', onWindowLeave)
    }
  }, [canvasRef, containerRef])
}
