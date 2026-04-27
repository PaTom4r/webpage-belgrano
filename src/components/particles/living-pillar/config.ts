// Tunables for the Wave Field particle engine.
//
// The field is built from N "bands" — horizontal sin curves stacked vertically.
// Particles travel ALONG each band (parametric t), with a small perpendicular
// jitter to give the band thickness. Each band has its own amplitude /
// frequency / speed / phase, so the overall picture reads as 6-12 visible
// crests / ridges undulating organically — not a uniform haze.

export type BandSpec = {
  yRatio: number     // band centerline as a fraction of canvas height
  amp: number        // wave amplitude (px)
  freq: number       // spatial frequency along X
  speed: number      // temporal speed
  phase: number      // initial phase offset
  thickness: number  // perpendicular jitter (px) — gives the band thickness
  density: number    // particles per band (relative weight, not absolute count)
}

// Band layout — denser + thicker at the bottom (closer to the camera), wispier
// at the top (further away). Phases are spread so the bands never line up.
export const BAND_SPECS: readonly BandSpec[] = [
  { yRatio: 0.10, amp: 18, freq: 0.0085, speed: 0.00055, phase: 0.0, thickness: 6,  density: 0.8 },
  { yRatio: 0.20, amp: 26, freq: 0.0060, speed: 0.00040, phase: 1.3, thickness: 7,  density: 0.9 },
  { yRatio: 0.30, amp: 32, freq: 0.0050, speed: 0.00065, phase: 2.6, thickness: 8,  density: 1.0 },
  { yRatio: 0.40, amp: 40, freq: 0.0042, speed: 0.00038, phase: 3.9, thickness: 10, density: 1.0 },
  { yRatio: 0.50, amp: 36, freq: 0.0055, speed: 0.00050, phase: 5.0, thickness: 11, density: 1.05 },
  { yRatio: 0.60, amp: 44, freq: 0.0045, speed: 0.00072, phase: 0.7, thickness: 12, density: 1.1 },
  { yRatio: 0.70, amp: 38, freq: 0.0050, speed: 0.00045, phase: 2.1, thickness: 14, density: 1.15 },
  { yRatio: 0.80, amp: 32, freq: 0.0070, speed: 0.00060, phase: 4.4, thickness: 14, density: 1.15 },
  { yRatio: 0.90, amp: 22, freq: 0.0095, speed: 0.00055, phase: 1.8, thickness: 12, density: 1.0 },
] as const

export const FIELD_CONFIG = {
  // Total particle budget split across bands proportional to density weights.
  COUNT_DESKTOP: 5500,
  COUNT_MOBILE: 1800,

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

  // Cursor repulsion — real physical force, falls off linearly with distance.
  CURSOR_RADIUS: 160,
  CURSOR_STRENGTH: 4.5,

  // Spring chases the wave-displaced target each frame.
  SPRING_K: 0.05,
  DAMPING: 0.86,

  // Particle visuals.
  SIZE_MIN: 0.5,
  SIZE_MAX: 1.8,
  ALPHA_MIN: 0.45,
  ALPHA_MAX: 0.95,
} as const

export type FieldConfig = typeof FIELD_CONFIG
