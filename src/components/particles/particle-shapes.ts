// Ambient vertical particle field — distributed over the full page height
// with variable Z depth for parallax. Particles are biased toward the sides
// (x tails) so the center column stays open for content. Shaders read depth
// and per-particle seed to modulate brightness, size, and motion noise.

export interface AmbientField {
  positions: Float32Array // xyz per particle
  depth: Float32Array     // normalized 0..1 (0 = far, 1 = near) — for parallax & size
  speed: Float32Array     // per-particle drift speed (0.3..1.2)
  seed: Float32Array      // per-particle randomization for shader noise
}

export function ambientVerticalField(count: number): AmbientField {
  const positions = new Float32Array(count * 3)
  const depth = new Float32Array(count)
  const speed = new Float32Array(count)
  const seed = new Float32Array(count)

  const xWidth = 14 // wider so bias pushes particles outside content area
  const yHeight = 10
  const zNear = -2
  const zFar = -8

  for (let i = 0; i < count; i++) {
    // X: aggressive bias toward sides — pow 0.3 makes the distribution
    // heavily weighted to the tails, leaving the center clearer for content.
    const u = Math.random() * 2 - 1
    const xSigned = Math.sign(u) * Math.pow(Math.abs(u), 0.3)
    const x = xSigned * (xWidth / 2)

    // Y: uniform along visible column
    const y = (Math.random() - 0.5) * yHeight

    // Z: mostly far/mid (atmospheric), few near (to avoid covering content)
    const layer = Math.random()
    let z: number
    if (layer < 0.65) z = zFar + Math.random() * 2          // far (-8..-6)
    else if (layer < 0.92) z = -5 + Math.random() * 1.5     // mid (-5..-3.5)
    else z = zNear - Math.random() * 1                       // near (-3..-2) — few

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    depth[i] = (z - zFar) / (zNear - zFar) // 0 far → 1 near
    speed[i] = 0.3 + depth[i] * 0.9
    seed[i] = Math.random()
  }

  return { positions, depth, speed, seed }
}
