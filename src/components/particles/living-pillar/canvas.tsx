// Living Pillar — public component.
// A self-contained <canvas> that fills its parent. Mount it inside a relatively
// positioned wrapper with a defined height and the column appears centered
// inside that wrapper, flowing upward with cursor reactivity.
'use client'

import { useRef } from 'react'
import { useLivingPillar } from './use-pillar'

type Props = {
  /** Optional className applied to the wrapping div. */
  className?: string
}

export function LivingPillarCanvas({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useLivingPillar({ canvasRef, containerRef })

  return (
    <div
      ref={containerRef}
      // touchAction: pan-y so vertical scroll on mobile never gets blocked,
      // while horizontal cursor moves on desktop still register normally.
      className={`absolute inset-0 ${className ?? ''}`}
      style={{ touchAction: 'pan-y' }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
