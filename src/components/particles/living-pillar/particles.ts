// Wave Field — particle pool + per-frame physics.
// Pure functions on a flat array of WaveParticle so the animation loop in
// use-pillar.ts can stay branch-light and allocation-free per frame.

import { FIELD_CONFIG } from './config'

export type WaveParticle = {
  baseX: number      // grid anchor X (in canvas pixels)
  baseY: number      // grid anchor Y
  x: number          // current display X
  y: number          // current display Y
  vx: number
  vy: number
  size: number       // px (already scaled by row depth)
  alpha: number      // per-particle base alpha (0..1)
  fadeAlpha: number  // permanent multiplier from edge/right-fade rules (0..1)
  phase: number      // 0..2π — desync per particle so the bands don't oscillate in lockstep
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

export type FieldDimensions = {
  cols: number
  rows: number
}

export function createWaveField(
  dims: FieldDimensions,
  width: number,
  height: number,
): WaveParticle[] {
  const cfg = FIELD_CONFIG
  const cols = dims.cols
  const rows = dims.rows
  const fieldWidth = width * cfg.FIELD_WIDTH_RATIO
  const cellW = fieldWidth / cols
  const cellH = height / rows
  const fadeStartX = width * cfg.FADE_START
  const fadeEndX = width * cfg.FADE_END
  const fadeRangeX = Math.max(1, fadeEndX - fadeStartX)
  const edgeTopY = height * cfg.EDGE_FADE_TOP
  const edgeBottomY = height * (1 - cfg.EDGE_FADE_BOTTOM)
  const edgeRangeBottom = Math.max(1, height - edgeBottomY)

  const particles: WaveParticle[] = []

  // Spill one extra cell on the top + bottom + left so the field never reads
  // as a hard rectangle — the canvas naturally clips overflow.
  for (let row = -1; row < rows + 1; row++) {
    for (let col = -1; col < cols; col++) {
      const baseX =
        col * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * cfg.JITTER
      const baseY =
        row * cellH + cellH / 2 + (Math.random() - 0.5) * cellH * cfg.JITTER

      // Right-edge density fade — full alpha until FADE_START, then ramps to 0.
      const fadeT = (baseX - fadeStartX) / fadeRangeX
      const rightFade = 1 - smoothstep(fadeT)

      // Top/bottom soft vignette.
      let edgeFade = 1
      if (baseY < edgeTopY) edgeFade *= smoothstep(baseY / Math.max(1, edgeTopY))
      if (baseY > edgeBottomY) edgeFade *= 1 - smoothstep((baseY - edgeBottomY) / edgeRangeBottom)

      const fadeAlpha = rightFade * edgeFade
      if (fadeAlpha < 0.02) continue // skip imperceptible particles to save draw cost

      // Perspective hint — top rows are "further", bottom rows "closer".
      const rowT = row / Math.max(1, rows - 1)
      const depthScale =
        cfg.PERSPECTIVE_TOP_SCALE +
        (cfg.PERSPECTIVE_BOTTOM_SCALE - cfg.PERSPECTIVE_TOP_SCALE) * rowT

      particles.push({
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        vx: 0,
        vy: 0,
        size:
          (cfg.SIZE_MIN + Math.random() * (cfg.SIZE_MAX - cfg.SIZE_MIN)) *
          depthScale,
        alpha: cfg.ALPHA_MIN + Math.random() * (cfg.ALPHA_MAX - cfg.ALPHA_MIN),
        fadeAlpha,
        phase: Math.random() * TWO_PI,
      })
    }
  }

  return particles
}

// Single-frame physics step. Mutates particles in place — no allocations.
export function stepWaveField(
  particles: WaveParticle[],
  cursor: CursorState,
  time: number,
  reducedMotion: boolean,
): void {
  if (reducedMotion) return // particles stay at their base grid

  const cfg = FIELD_CONFIG
  const radius = cfg.CURSOR_RADIUS
  const radiusSq = radius * radius

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // Layered sin/cos waves displace the particle's GRID position to give the
    // moving target the spring chases. Different frequencies + speeds prevent
    // the whole field from oscillating in unison.
    const waveY =
      Math.sin(p.baseX * cfg.WAVE_FREQ_X_1 + time * cfg.WAVE_SPEED_1 + p.phase) *
        cfg.WAVE_AMP_Y_1 +
      Math.sin(
        p.baseX * cfg.WAVE_FREQ_X_2 +
          p.baseY * cfg.WAVE_FREQ_Y_2 +
          time * cfg.WAVE_SPEED_2,
      ) * cfg.WAVE_AMP_Y_2 +
      Math.cos(p.baseY * cfg.WAVE_FREQ_Y_3 + time * cfg.WAVE_SPEED_3) *
        cfg.WAVE_AMP_Y_3

    const swayX =
      Math.sin(
        p.baseY * cfg.SWAY_FREQ_Y + time * cfg.SWAY_SPEED + p.phase,
      ) * cfg.SWAY_AMP

    const targetX = p.baseX + swayX
    const targetY = p.baseY + waveY

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
