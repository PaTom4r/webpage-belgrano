// Tunables for the Wave Field particle engine.
// Each particle sits on a relaxed grid; per-frame physics moves each one
// toward a target position computed from layered sin/cos waves so the whole
// field undulates like a flag or a sand dune seen at a low angle.

export const FIELD_CONFIG = {
  // Grid resolution. Total particles = COLS * ROWS (minus those past the
  // right-edge fade). 80×100 = 8000 → about 5500 visible after the fade.
  COLS_DESKTOP: 80,
  ROWS_DESKTOP: 100,
  COLS_MOBILE: 44,
  ROWS_MOBILE: 60,

  // Region of the canvas where the field lives. The grid spans this fraction
  // of the canvas width and the full canvas height. Beyond FADE_END the
  // particles' alpha goes to zero — that's where the headline sits.
  FIELD_WIDTH_RATIO: 0.95,
  FADE_START: 0.55, // fraction of canvas width at which alpha begins to drop
  FADE_END: 0.92,   // fully invisible past this point

  // Top + bottom soft vignette so the field doesn't read as a hard rectangle.
  EDGE_FADE_TOP: 0.08,
  EDGE_FADE_BOTTOM: 0.08,

  // Layered wave displacement applied to each particle's grid (baseX, baseY)
  // to produce the target the spring chases each frame.
  WAVE_AMP_Y_1: 22,
  WAVE_FREQ_X_1: 0.011,
  WAVE_FREQ_Y_1: 0.000,
  WAVE_SPEED_1: 0.00045,

  WAVE_AMP_Y_2: 14,
  WAVE_FREQ_X_2: 0.025,
  WAVE_FREQ_Y_2: 0.018,
  WAVE_SPEED_2: 0.00080,

  WAVE_AMP_Y_3: 9,
  WAVE_FREQ_X_3: 0.000,
  WAVE_FREQ_Y_3: 0.022,
  WAVE_SPEED_3: 0.00065,

  // Subtle horizontal sway so the bands of particles drift sideways too.
  SWAY_AMP: 6,
  SWAY_FREQ_Y: 0.014,
  SWAY_SPEED: 0.00070,

  // Pseudo-perspective — the bottom of the field reads as "closer". Top rows
  // shrink/dim relative to bottom rows so the whole thing looks like a
  // wave receding into the distance.
  PERSPECTIVE_TOP_SCALE: 0.55,
  PERSPECTIVE_BOTTOM_SCALE: 1.0,

  // Cursor repulsion (real physical force, falls off linearly with distance).
  CURSOR_RADIUS: 150,
  CURSOR_STRENGTH: 4.0,

  // Spring + damping for the wave-target chase.
  SPRING_K: 0.05,
  DAMPING: 0.86,

  // Particle visuals.
  SIZE_MIN: 0.6,
  SIZE_MAX: 1.7,
  ALPHA_MIN: 0.45,
  ALPHA_MAX: 0.95,

  // Per-particle jitter (relative to grid cell) so the grid doesn't read as
  // a perfect lattice.
  JITTER: 0.55,
} as const

export type FieldConfig = typeof FIELD_CONFIG
