// Tunables for the Living Pillar particle engine.
// All values are designed to be edited in isolation — each constant has a
// single observable effect so iteration is fast.

export const PILLAR_CONFIG = {
  // Particle counts. Mobile is much lighter so the animation loop stays
  // smooth on midrange phones while idling above 30fps.
  COUNT_DESKTOP: 6000,
  COUNT_MOBILE: 2500,

  // Pillar geometry (relative to canvas dimensions).
  PILLAR_WIDTH_RATIO: 0.35,         // pillar width vs canvas width
  PILLAR_CENTER_RATIO: 0.5,         // horizontal center position (0.5 = canvas center)

  // Cursor repulsion. Real physical force, falls off linearly with distance.
  CURSOR_RADIUS: 160,               // px — radius of influence
  CURSOR_STRENGTH: 4.5,             // multiplier on the force magnitude

  // Spring force pulling each particle back toward its column anchor (X only —
  // Y is the lifecycle axis so it stays free).
  SPRING_K: 0.04,

  // Continuous upward bias — the "blood flow" sensation.
  UPWARD_BIAS: 0.55,

  // Helix twist — small horizontal sin oscillation as a function of Y.
  // Together these give the DNA-strand feel without being literal.
  HELIX_AMP: 0.08,
  HELIX_FREQ: 0.012,
  HELIX_SPEED: 0.0006,

  // Curl noise — slow horizontal turbulence layered on top of the helix.
  CURL_AMP: 0.06,
  CURL_FREQ: 0.005,
  CURL_SPEED: 0.0008,

  // Velocity damping per frame — keeps particles from oscillating forever.
  DAMPING: 0.92,

  // Particle size + alpha range.
  SIZE_MIN: 0.6,
  SIZE_MAX: 2.0,
  ALPHA_MIN: 0.30,
  ALPHA_MAX: 0.90,

  // Per-particle base speed (used for upward bias multiplier).
  SPEED_MIN: 0.30,
  SPEED_MAX: 1.20,

  // Reset margin so the lifecycle wrap is invisible at viewport edges.
  WRAP_MARGIN: 16,
} as const

export type PillarConfig = typeof PILLAR_CONFIG
