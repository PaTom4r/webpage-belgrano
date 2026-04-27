// Tunables for the Wave Field particle engine.
//
// The field is built from N "bands" — horizontal sin curves stacked vertically.
// Particles travel ALONG each band (parametric t), with a small perpendicular
// jitter to give the band thickness. Each band has its own amplitude /
// frequency / speed / phase, so the overall picture reads as 6-12 visible
// crests / ridges undulating organically — not a uniform haze.

export type BandSpec = {
  yRatio: number          // band centerline as a fraction of canvas height
  amp: number             // wave amplitude (px)
  freq: number            // spatial frequency along X
  speed: number           // temporal speed
  phase: number           // initial phase offset
  thickness: number       // perpendicular jitter (px) — gives the band thickness
  density: number         // particles per band (relative weight, not absolute count)
  depth: 0 | 1 | 2        // 0 = background (soft, larger, no glow), 2 = foreground (sharp, glow)
}

// Band layout — 6 bands distributed across 3 depth tiers (2-2-2: back/mid/front).
// Fewer bands than the wave-field default but each one is fatter and more
// prominent — bigger amp, more thickness, larger particles. Reads as a small
// number of distinct rivers crossing the canvas instead of a uniform haze.
// Phases spread so the bands never line up.
export const BAND_SPECS: readonly BandSpec[] = [
  { yRatio: 0.15, amp: 38, freq: 0.0058, speed: 0.00045, phase: 0.0, thickness: 14, density: 0.9,  depth: 0 },
  { yRatio: 0.30, amp: 56, freq: 0.0042, speed: 0.00060, phase: 2.1, thickness: 18, density: 1.0,  depth: 1 },
  { yRatio: 0.45, amp: 48, freq: 0.0050, speed: 0.00038, phase: 4.0, thickness: 20, density: 1.05, depth: 2 },
  { yRatio: 0.60, amp: 62, freq: 0.0040, speed: 0.00072, phase: 1.0, thickness: 22, density: 1.1,  depth: 1 },
  { yRatio: 0.75, amp: 54, freq: 0.0048, speed: 0.00050, phase: 3.2, thickness: 22, density: 1.1,  depth: 0 },
  { yRatio: 0.90, amp: 36, freq: 0.0072, speed: 0.00055, phase: 5.0, thickness: 16, density: 0.95, depth: 2 },
] as const

export const FIELD_CONFIG = {
  // Total particle budget split across bands proportional to density weights.
  // Lower than the wave-field default because the new draw path connects
  // particles with translucent fiber lines — fewer points read as denser mass.
  COUNT_DESKTOP: 1100,
  COUNT_MOBILE: 540,

  // Field span — particles only exist in the LEFT portion of the canvas.
  // FIELD_WIDTH_RATIO is how far right the band lines extend; the right-side
  // density fade starts inside that range so particles thin out before the
  // headline area.
  FIELD_WIDTH_RATIO: 0.78,
  FADE_START: 0.46, // fraction of canvas width — alpha begins to drop here
  FADE_END: 0.74,   // fully invisible past this point (text reads cleanly)

  // Soft vertical vignette so bands at the very top/bottom don't read as
  // hard cutoffs against the canvas edges.
  EDGE_FADE_TOP: 0.04,
  EDGE_FADE_BOTTOM: 0.04,

  // Pseudo-perspective: bottom bands read as closer (bigger / brighter
  // particles), top bands as farther (smaller / dimmer).
  PERSPECTIVE_TOP_SCALE: 0.55,
  PERSPECTIVE_BOTTOM_SCALE: 1.05,

  // Cursor repulsion — softer than the wave-field default so the fibers feel
  // organic, not jelly. Falls off linearly with distance.
  CURSOR_RADIUS: 140,
  CURSOR_STRENGTH: 2.6,

  // Spring chases the wave-displaced target each frame.
  SPRING_K: 0.05,
  DAMPING: 0.86,

  // Particle visuals — bigger so the few-bands-but-prominent feel is honored.
  SIZE_MIN: 1.0,
  SIZE_MAX: 3.0,
  ALPHA_MIN: 0.5,
  ALPHA_MAX: 0.95,

  // Threads — fiber lines connecting consecutive particles within a band.
  LINE_ALPHA_MULT: 0.42,
  LINE_WIDTH_BY_DEPTH: [2.0, 1.5, 1.0] as const, // back, mid, front
  // Drop segments longer than this — happens when the cursor pushes a particle
  // out of band, otherwise the line stretches into a long diagonal. Slightly
  // higher than the previous default because particles are now larger and a
  // little more spread.
  MAX_SEGMENT_PX: 32,

  // Glow — additive radial-gradient sprite drawn under the core pass for
  // bands with depth >= GLOW_DEPTH_MIN. Sprite is cached per radius bucket.
  GLOW_DEPTH_MIN: 1,
  GLOW_SIZE_MULT: 3.5,
  GLOW_ALPHA: 0.18,

  // Per-depth modulation of size and alpha applied to lines, glow and core.
  // Index = BandSpec.depth (0 = back / soft / dim, 2 = front / sharp / bright).
  DEPTH_ALPHA_MULT: [0.55, 0.85, 1.0] as const,
  DEPTH_SIZE_MULT: [1.6, 1.0, 0.85] as const,
} as const

export type FieldConfig = typeof FIELD_CONFIG
