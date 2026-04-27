// Tracks pointer position over the canvas as NDC (-1..1).
// rAF-throttled so high-frequency mousemove never overdraws.
// Returns a ref containing { ndc: { x, y }, active: boolean }.
'use client'

import { useEffect, useRef } from 'react'

export type CursorState = {
  ndc: { x: number; y: number }
  active: boolean
}

export function useCursorPosition<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
) {
  const stateRef = useRef<CursorState>({
    ndc: { x: 999, y: 999 }, // start off-screen so initial paint has no repulsion
    active: false,
  })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let pendingX = 0
    let pendingY = 0
    let pendingActive = false
    let rafId: number | null = null

    const flush = () => {
      stateRef.current.ndc.x = pendingX
      stateRef.current.ndc.y = pendingY
      stateRef.current.active = pendingActive
      rafId = null
    }

    const queueFlush = () => {
      if (rafId === null) rafId = requestAnimationFrame(flush)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      pendingX = x
      pendingY = y
      pendingActive = true
      queueFlush()
    }

    const onPointerLeave = () => {
      pendingActive = false
      pendingX = 999
      pendingY = 999
      queueFlush()
    }

    el.addEventListener('pointermove', onPointerMove, { passive: true })
    el.addEventListener('pointerleave', onPointerLeave, { passive: true })
    el.addEventListener('pointerout', onPointerLeave, { passive: true })

    return () => {
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', onPointerLeave)
      el.removeEventListener('pointerout', onPointerLeave)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [containerRef])

  return stateRef
}
