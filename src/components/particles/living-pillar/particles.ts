// Wave Field — band-based particle engine.
//
// Each particle belongs to one "band" (a horizontal sin curve). The particle's
// position along the band is a parametric `t` ∈ [0, 1]. The display target is:
//   targetX = t * fieldWidth + tailJitterX
//   targetY = band.y0 + sin(targetX * band.freq + time * band.speed + band.phase)
//             * band.amp + perpendicularJitterY
// The spring (cursor + return) chases that moving target, so cursor pushes
// deform the band temporarily and it springs back to wherever the wave is.

import { FIELD_CONFIG, BAND_SPECS, type BandSpec } from './config'

export type WaveParticle = {
  bandIdx: number
  t: number              // 0..1 — parametric position along the band
  jitterAlongX: number   // small offset along the band (so particles don't sit on a perfect line)
  jitterPerpY: number    // perpendicular offset → band thickness
  size: number
  alpha: number          // base alpha (per-particle, randomized)
  fadeAlpha: number      // permanent alpha multiplier from edge / right-fade rules
  x: number              // current display X
  y: number              // current display Y
  vx: number
  vy: number
}

export type CursorState = {
  x: number
  y: number
  active: boolean
}

const TWO_PI = Math.PI * 2

function smoothstep(t: number) {
  if (t <= 0) return 0
  if (t >= 1) return 1
  return t * t * (3 - 2 * t)
}

// Returns the sum of `density` weights across the band specs — used to split
// the total particle budget proportionally between bands.
function totalDensity(bands: readonly BandSpec[]): number {
  let s = 0
  for (const b of bands) s += b.density
  return s
}

export function createWaveField(
  totalCount: number,
  width: number,
  height: number,
): WaveParticle[] {
  const cfg = FIELD_CONFIG
  const fieldWidth = width * cfg.FIELD_WIDTH_RATIO
  const fadeStartX = width * cfg.FADE_START
  const fadeEndX = width * cfg.FADE_END
  const fadeRangeX = Math.max(1, fadeEndX - fadeStartX)
  const edgeTopY = height * cfg.EDGE_FADE_TOP
  const edgeBottomY = height * (1 - cfg.EDGE_FADE_BOTTOM)
  const edgeRangeBottom = Math.max(1, height - edgeBottomY)

  const densitySum = totalDensity(BAND_SPECS)
  const particles: WaveParticle[] = []

  for (let bandIdx = 0; bandIdx < BAND_SPECS.length; bandIdx++) {
    const band = BAND_SPECS[bandIdx]
    const bandY0 = height * band.yRatio
    const bandCount = Math.round(totalCount * (band.density / densitySum))

    // How "deep" this band is in the perspective (top = far, bottom = close).
    const depthScale =
      cfg.PERSPECTIVE_TOP_SCALE +
      (cfg.PERSPECTIVE_BOTTOM_SCALE - cfg.PERSPECTIVE_TOP_SCALE) * band.yRatio

    for (let i = 0; i < bandCount; i++) {
      // Spread t evenly across the band but with a tiny per-particle offset so
      // the band doesn't read as discrete dots — feels more like a stroke.
      const t = (i + Math.random()) / bandCount
      const jitterAlongX = (Math.random() - 0.5) * 4
      const jitterPerpY = (Math.random() - 0.5) * band.thickness * 2

      // Initial display position uses the wave at t=0 so the field looks correct
      // on the very first frame before the loop has run once.
      const baseX = t * fieldWidth + jitterAlongX
      const targetY =
        bandY0 + Math.sin(baseX * band.freq + band.phase) * band.amp + jitterPerpY

      // Right-edge density fade — full alpha until FADE_START, ramps to 0 at FADE_END.
      const fadeT = (baseX - fadeStartX) / fadeRangeX
      const rightFade = 1 - smoothstep(fadeT)

      // Top/bottom soft vignette.
      let edgeFade = 1
      if (targetY < edgeTopY)
        edgeFade *= smoothstep(targetY / Math.max(1, edgeTopY))
      if (targetY > edgeBottomY)
        edgeFade *= 1 - smoothstep((targetY - edgeBottomY) / edgeRangeBottom)

      const fadeAlpha = rightFade * edgeFade
      if (fadeAlpha < 0.02) continue

      particles.push({
        bandIdx,
        t,
        jitterAlongX,
        jitterPerpY,
        size:
          (cfg.SIZE_MIN + Math.random() * (cfg.SIZE_MAX - cfg.SIZE_MIN)) *
          depthScale,
        alpha: cfg.ALPHA_MIN + Math.random() * (cfg.ALPHA_MAX - cfg.ALPHA_MIN),
        fadeAlpha,
        x: baseX,
        y: targetY,
        vx: 0,
        vy: 0,
      })
    }
  }

  return particles
}

// Single-frame physics step. Mutates particles in place — no allocations.
export function stepWaveField(
  particles: WaveParticle[],
  cursor: CursorState,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
): void {
  if (reducedMotion) return

  const cfg = FIELD_CONFIG
  const fieldWidth = width * cfg.FIELD_WIDTH_RATIO
  const radius = cfg.CURSOR_RADIUS
  const radiusSq = radius * radius

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    const band = BAND_SPECS[p.bandIdx]
    const bandY0 = height * band.yRatio

    // Compute the wave-displaced target for this particle.
    const targetX = p.t * fieldWidth + p.jitterAlongX
    const targetY =
      bandY0 +
      Math.sin(targetX * band.freq + time * band.speed + band.phase) * band.amp +
      p.jitterPerpY

    // 1) Cursor repulsion — distance check first, sqrt only when needed.
    if (cursor.active) {
      const dx = p.x - cursor.x
      const dy = p.y - cursor.y
      const distSq = dx * dx + dy * dy
      if (distSq < radiusSq && distSq > 1) {
        const dist = Math.sqrt(distSq)
        const force = ((radius - dist) / radius) * cfg.CURSOR_STRENGTH
        p.vx += (dx / dist) * force
        p.vy += (dy / dist) * force
      }
    }

    // 2) Spring back to the wave-displaced target.
    p.vx += (targetX - p.x) * cfg.SPRING_K
    p.vy += (targetY - p.y) * cfg.SPRING_K

    // 3) Damping.
    p.vx *= cfg.DAMPING
    p.vy *= cfg.DAMPING

    // 4) Integrate.
    p.x += p.vx
    p.y += p.vy
  }
}

export function drawWaveField(
  ctx: CanvasRenderingContext2D,
  particles: WaveParticle[],
): void {
  ctx.fillStyle = '#ffffff'
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
    const dynamicAlpha = Math.min(1, (p.alpha + speed * 0.04) * p.fadeAlpha)
    if (dynamicAlpha < 0.01) continue
    ctx.globalAlpha = dynamicAlpha
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, TWO_PI)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}
