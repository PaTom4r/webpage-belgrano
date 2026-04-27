// Maps a 0..1 scroll progress value to a particle color.
// Phase 1 only uses the hero band (returns white). Phase 2 will extend this
// across the verticales reveal to drive the teal / sky / orange transitions.

import { Color } from 'three'

export type ColorStop = {
  at: number      // 0..1 — position along the timeline
  hex: string     // CSS hex
}

// Phase 1: solid white through the hero. Phase 2 swaps this for a multi-stop
// timeline covering hero + intelligence + media + brand + stats.
export const HERO_COLOR_TIMELINE: ColorStop[] = [
  { at: 0.0, hex: '#ffffff' },
  { at: 1.0, hex: '#ffffff' },
]

// Reusable scratch colors so we never allocate inside useFrame.
const a = new Color()
const b = new Color()

export function sampleColorTimeline(
  timeline: ColorStop[],
  progress: number,
  out: Color,
): Color {
  if (timeline.length === 0) return out.set('#ffffff')
  if (timeline.length === 1) return out.set(timeline[0].hex)

  const p = Math.min(1, Math.max(0, progress))

  // Find surrounding stops.
  let lo = timeline[0]
  let hi = timeline[timeline.length - 1]
  for (let i = 0; i < timeline.length - 1; i++) {
    if (p >= timeline[i].at && p <= timeline[i + 1].at) {
      lo = timeline[i]
      hi = timeline[i + 1]
      break
    }
  }

  const span = Math.max(0.0001, hi.at - lo.at)
  const t = (p - lo.at) / span
  a.set(lo.hex)
  b.set(hi.hex)
  return out.copy(a).lerp(b, t)
}
