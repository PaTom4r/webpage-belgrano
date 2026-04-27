// Living Pillar — particle pool + per-frame physics.
// Pure functions on a flat array of Particle objects so the animation loop
// in use-pillar.ts can stay branch-light and allocation-free per frame.

import { PILLAR_CONFIG } from './config'

export type Particle = {
  x: number
  y: number
  originX: number          // X anchor — center of this particle's strand
  vx: number
  vy: number
  speed: number            // upward bias multiplier
  size: number             // px
  alpha: number            // 0..1 — modulated by velocity at draw time
  helixSeed: number        // 0..2π — phase offset so particles don't twist in lockstep
}

export type CursorState = {
  x: number
  y: number
  active: boolean
}

const TWO_PI = Math.PI * 2

// Box-Muller-ish gaussian for column distribution (denser at center, sparser at edges).
function gaussian(): number {
  const u = Math.max(1e-6, Math.random())
  const v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TWO_PI * v)
}

export function createParticles(
  count: number,
  width: number,
  height: number,
  strandCenterRatios: readonly number[],
): Particle[] {
  const cfg = PILLAR_CONFIG
  const halfWidth = (width * cfg.STRAND_WIDTH_RATIO) / 2

  // Pre-compute strand center X coordinates (in canvas px).
  const strandCenters = strandCenterRatios.map((r) => width * r)
  const strandCount = Math.max(1, strandCenters.length)

  const out: Particle[] = new Array(count)

  for (let i = 0; i < count; i++) {
    // Round-robin assignment keeps each strand at roughly the same particle count.
    const strandIdx = i % strandCount
    const center = strandCenters[strandIdx]

    // Gaussian X around the strand center, clamped to ±2σ so outliers don't drift far.
    const g = Math.max(-2.2, Math.min(2.2, gaussian()))
    const offsetX = (g / 2.2) * halfWidth
    const originX = center + offsetX

    out[i] = {
      x: originX,
      y: Math.random() * height,
      originX,
      vx: 0,
      vy: 0,
      speed: cfg.SPEED_MIN + Math.random() * (cfg.SPEED_MAX - cfg.SPEED_MIN),
      size: cfg.SIZE_MIN + Math.random() * (cfg.SIZE_MAX - cfg.SIZE_MIN),
      alpha: cfg.ALPHA_MIN + Math.random() * (cfg.ALPHA_MAX - cfg.ALPHA_MIN),
      helixSeed: Math.random() * TWO_PI,
    }
  }

  return out
}

// Single-frame physics step. Mutates particles in place — no allocations.
export function stepParticles(
  particles: Particle[],
  cursor: CursorState,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
): void {
  if (reducedMotion) return // particles stay at their origins

  const cfg = PILLAR_CONFIG
  const radius = cfg.CURSOR_RADIUS
  const radiusSq = radius * radius
  // Clamp distance for the runaway guard — relative to strand width, not the
  // whole canvas, so cursor edge cases never let a particle escape its strand.
  const maxOffset = width * cfg.STRAND_WIDTH_RATIO

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

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

    // 2) Spring back to strand center (X only — Y is the lifecycle axis).
    p.vx += (p.originX - p.x) * cfg.SPRING_K

    // 3) Helix twist — sin oscillation tied to Y so the strand visibly twists.
    p.vx +=
      Math.sin(p.y * cfg.HELIX_FREQ + p.helixSeed + time * cfg.HELIX_SPEED) *
      cfg.HELIX_AMP

    // 4) Curl noise — slower horizontal turbulence layered on top of the helix.
    p.vx +=
      Math.sin(time * cfg.CURL_SPEED + p.y * cfg.CURL_FREQ + p.helixSeed) *
      cfg.CURL_AMP

    // 5) Continuous upward flow (the "blood through a vein" feel).
    p.vy -= p.speed * cfg.UPWARD_BIAS

    // 6) Damping.
    p.vx *= cfg.DAMPING
    p.vy *= cfg.DAMPING

    // 7) Integrate.
    p.x += p.vx
    p.y += p.vy

    // 8) Lifecycle vertical wrap — when the particle exits the top, reset to the
    //    bottom with a small random offset so re-entries don't pulse in waves.
    if (p.y < -cfg.WRAP_MARGIN) {
      p.y = height + cfg.WRAP_MARGIN + Math.random() * 20
      p.vy = 0
    }

    // Hard horizontal clamp relative to the particle's strand center.
    if (p.x < p.originX - maxOffset) p.x = p.originX - maxOffset
    if (p.x > p.originX + maxOffset) p.x = p.originX + maxOffset
  }
}

export function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
): void {
  ctx.fillStyle = '#ffffff'
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    // Velocity-modulated alpha — fast particles read brighter, idle ones dim.
    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
    const dynamicAlpha = Math.min(1, p.alpha + speed * 0.05)
    ctx.globalAlpha = dynamicAlpha
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, TWO_PI)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}
