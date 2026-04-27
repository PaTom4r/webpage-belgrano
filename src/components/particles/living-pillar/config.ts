// Tunables for the Living Pillar particle engine.
// All values are designed to be edited in isolation — each constant has a
// single observable effect so iteration is fast.

export const PILLAR_CONFIG = {
  // Particle counts. Mobile is much lighter so the animation loop stays
  // smooth on midrange phones while idling above 30fps.
  COUNT_DESKTOP: 6000,
  COUNT_MOBILE: 2500,

  // Strands — number of independent vertical flows the particles split across.
  // Centers are expressed as a fraction of canvas width. The leftmost desktop
  // center sits at 0.0 (the canvas left edge) so its strand bleeds off-screen
  // when the canvas itself is anchored to the page's left edge.
  STRAND_COUNT_DESKTOP: 3,
  STRAND_COUNT_MOBILE: 2,
  STRAND_CENTERS_DESKTOP: [0.02, 0.34, 0.66] as const,
  STRAND_CENTERS_MOBILE: [0.34, 0.66] as const,
  STRAND_WIDTH_RATIO: 0.16, // gaussian half-spread per strand, vs canvas width

  // Cursor repulsion. Real physical force, falls off linearly with distance.
  CURSOR_RADIUS: 160,
  CURSOR_STRENGTH: 4.5,

  // Spring force pulling each particle back toward its strand anchor (X only —
  // Y is the lifecycle axis so it stays free).
  SPRING_K: 0.04,

  // Continuous upward bias — the "blood flow" sensation. Lowered from 0.55
  // because the previous value read as a quick scroll instead of a slow drift.
  UPWARD_BIAS: 0.22,

  // Helix twist — small horizontal sin oscillation as a function of Y.
  // Together these give the DNA-strand feel without being literal.
  HELIX_AMP: 0.07,
  HELIX_FREQ: 0.012,
  HELIX_SPEED: 0.00045,

  // Curl noise — slower horizontal turbulence layered on top of the helix.
  CURL_AMP: 0.05,
  CURL_FREQ: 0.005,
  CURL_SPEED: 0.0006,

  // Velocity damping per frame — keeps particles from oscillating forever.
  DAMPING: 0.92,

  // Particle size + alpha range.
  SIZE_MIN: 0.6,
  SIZE_MAX: 2.0,
  ALPHA_MIN: 0.30,
  ALPHA_MAX: 0.90,

  // Per-particle base speed (used for upward bias multiplier).
  SPEED_MIN: 0.25,
  SPEED_MAX: 0.95,

  // Reset margin so the lifecycle wrap is invisible at viewport edges.
  WRAP_MARGIN: 16,
} as const

export type PillarConfig = typeof PILLAR_CONFIG
