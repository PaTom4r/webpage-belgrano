// Wave Field — band-based particle engine with fiber connections, depth tiers
// and additive glow.
//
// Each particle belongs to one "band" (a horizontal sin curve). The particle's
// position along the band is a parametric `t` ∈ [0, 1]. The display target is:
//   targetX = t * fieldWidth + tailJitterX
//   targetY = band.y0 + sin(targetX * band.freq + time * band.speed + band.phase)
//             * band.amp + perpendicularJitterY
// The spring (cursor + return) chases that moving target, so cursor pushes
// deform the band temporarily and it springs back to wherever the wave is.
//
// Render is a 3-pass back-to-front per frame:
//   1. Lines: connect consecutive particles within a band with translucent
//      strokes — reads as fibers/strands.
//   2. Glow:  additive radial-gradient sprite under foreground bands only.
//      Requires a non-transparent background (the hero is bg-black, OK).
//   3. Core:  the existing arc draw, modulated by depth tier.
//
// `BandSpec.depth` (0 = back, 2 = front) is the master modulator — back bands
// get larger size + lower alpha + thicker line + no glow (reads as out-of-focus),
// front bands get smaller size + higher alpha + thinner line + glow (sharp).

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

export type WaveField = {
  particles: WaveParticle[]
  /** bandSlices[bandIdx] = particle indices in the same band, ordered by t ascending. */
  bandSlices: number[][]
  /** Glow sprites cached per radius bucket (rounded integer in logical px). */
  glowSprites: Map<number, HTMLCanvasElement>
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
): WaveField {
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
  const bandSlices: number[][] = Array.from({ length: BAND_SPECS.length }, () => [])

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

      // Particles are pushed in t-ascending order per band, so bandSlices is
      // pre-sorted without needing a separate sort pass.
      bandSlices[bandIdx].push(particles.length)
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

  return { particles, bandSlices, glowSprites: new Map() }
}

// Single-frame physics step. Mutates particles in place — no allocations.
export function stepWaveField(
  field: WaveField,
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
  const particles = field.particles

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

// Lazily build (and cache) a small offscreen canvas containing a radial
// white→transparent gradient. Reused across frames as a glow sprite. Bucketed
// by integer radius so the cache stays bounded (≤ ~6 entries given our size
// range) and `drawImage` calls are dirt-cheap.
function getOrCreateGlowSprite(
  cache: Map<number, HTMLCanvasElement>,
  radius: number,
): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null
  const r = Math.max(2, Math.round(radius))
  const cached = cache.get(r)
  if (cached) return cached

  const size = r * 2
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const grad = ctx.createRadialGradient(r, r, 0, r, r, r)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.4, 'rgba(255,255,255,0.55)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  cache.set(r, canvas)
  return canvas
}

// 3-pass render — lines (under), glow (additive), core (on top).
//
// NOTE: The glow pass uses globalCompositeOperation='lighter', which adds
// pixel values against whatever is behind the canvas. The hero is bg-black,
// so the additive math is exactly what we want. If this canvas ever moves
// onto a non-black surface, the glow will look wrong; check it.
export function drawWaveField(
  ctx: CanvasRenderingContext2D,
  field: WaveField,
): void {
  const cfg = FIELD_CONFIG
  const particles = field.particles
  const bandSlices = field.bandSlices

  // Draw bands in depth order (back first) so foreground glow + core land
  // on top of background lines.
  const bandOrder = bandSlices
    .map((_, idx) => idx)
    .sort((a, b) => BAND_SPECS[a].depth - BAND_SPECS[b].depth)

  const maxSegSq = cfg.MAX_SEGMENT_PX * cfg.MAX_SEGMENT_PX

  // ─── Pass 1: Lines (source-over, low alpha) ────────────────────────────────
  ctx.strokeStyle = '#ffffff'
  for (const bandIdx of bandOrder) {
    const band = BAND_SPECS[bandIdx]
    const slice = bandSlices[bandIdx]
    if (slice.length < 2) continue
    const depthA = cfg.DEPTH_ALPHA_MULT[band.depth]
    ctx.lineWidth = cfg.LINE_WIDTH_BY_DEPTH[band.depth]

    for (let k = 0; k < slice.length - 1; k++) {
      const a = particles[slice[k]]
      const b = particles[slice[k + 1]]
      const dx = b.x - a.x
      const dy = b.y - a.y
      // Skip stretched segments — happens when the cursor pulls one neighbor
      // out of band; otherwise the line draws an ugly diagonal.
      if (dx * dx + dy * dy > maxSegSq) continue
      const segmentAlpha =
        Math.min(a.alpha, b.alpha) *
        Math.min(a.fadeAlpha, b.fadeAlpha) *
        cfg.LINE_ALPHA_MULT *
        depthA
      if (segmentAlpha < 0.01) continue
      ctx.globalAlpha = segmentAlpha
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
  }

  // ─── Pass 2: Glow (additive, foreground bands only) ────────────────────────
  ctx.globalCompositeOperation = 'lighter'
  for (const bandIdx of bandOrder) {
    const band = BAND_SPECS[bandIdx]
    if (band.depth < cfg.GLOW_DEPTH_MIN) continue
    const depthA = cfg.DEPTH_ALPHA_MULT[band.depth]
    const depthS = cfg.DEPTH_SIZE_MULT[band.depth]
    const slice = bandSlices[bandIdx]
    for (let k = 0; k < slice.length; k++) {
      const p = particles[slice[k]]
      const glowR = p.size * depthS * cfg.GLOW_SIZE_MULT
      const sprite = getOrCreateGlowSprite(field.glowSprites, glowR)
      if (!sprite) continue
      const a = Math.min(1, p.alpha * p.fadeAlpha * depthA * cfg.GLOW_ALPHA)
      if (a < 0.005) continue
      ctx.globalAlpha = a
      const dr = sprite.width / 2
      ctx.drawImage(sprite, p.x - dr, p.y - dr)
    }
  }
  ctx.globalCompositeOperation = 'source-over'

  // ─── Pass 3: Core (existing arc draw, depth-modulated) ─────────────────────
  ctx.fillStyle = '#ffffff'
  for (const bandIdx of bandOrder) {
    const band = BAND_SPECS[bandIdx]
    const depthA = cfg.DEPTH_ALPHA_MULT[band.depth]
    const depthS = cfg.DEPTH_SIZE_MULT[band.depth]
    const slice = bandSlices[bandIdx]
    for (let k = 0; k < slice.length; k++) {
      const p = particles[slice[k]]
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      const dynamicAlpha = Math.min(1, (p.alpha + speed * 0.04) * p.fadeAlpha * depthA)
      if (dynamicAlpha < 0.01) continue
      ctx.globalAlpha = dynamicAlpha
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * depthS, 0, TWO_PI)
      ctx.fill()
    }
  }

  ctx.globalAlpha = 1
}
