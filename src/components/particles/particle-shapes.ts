// Generates Float32Array of xyz positions for each particle shape.
// Each shape MUST return EXACTLY `count` particles so morph interpolation
// stays aligned (particle[i] in shape A morphs to particle[i] in shape B).

export function sphereShape(count: number, radius = 3): Float32Array {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere distribution — even spread, no clumping
    const k = i + 0.5
    const phi = Math.acos(1 - (2 * k) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * k
    const r = radius * (0.7 + Math.random() * 0.3)
    positions[i * 3] = Math.cos(theta) * Math.sin(phi) * r
    positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * r
    positions[i * 3 + 2] = Math.cos(phi) * r
  }
  return positions
}

// 3 clusters in a horizontal row — evokes the 3 verticales. Each cluster is a
// small Gaussian blob. Cluster centers sit at x = [-3.2, 0, 3.2].
export function clustersShape(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const centers = [
    [-3.2, 0, 0],
    [0, 0, 0],
    [3.2, 0, 0],
  ]
  const per = Math.floor(count / 3)
  for (let i = 0; i < count; i++) {
    const cluster = Math.min(Math.floor(i / per), 2)
    const [cx, cy, cz] = centers[cluster]
    // Box-Muller for a Gaussian-ish blob (tighter than uniform)
    const u1 = Math.random() || 1e-6
    const u2 = Math.random()
    const r = Math.sqrt(-2 * Math.log(u1)) * 0.6
    const t = 2 * Math.PI * u2
    positions[i * 3] = cx + r * Math.cos(t)
    positions[i * 3 + 1] = cy + r * Math.sin(t) * 0.8
    positions[i * 3 + 2] = cz + (Math.random() - 0.5) * 1.2
  }
  return positions
}

// Horizontal wave / grid — evokes "results / data". 2D plane 8 wide x 4 tall
// with sine-wave displacement on Y based on X.
export function waveShape(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const cols = Math.ceil(Math.sqrt(count * 2))
  const rows = Math.ceil(count / cols)
  for (let i = 0; i < count; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = (col / cols - 0.5) * 8 + (Math.random() - 0.5) * 0.1
    const z = (row / rows - 0.5) * 4 + (Math.random() - 0.5) * 0.1
    // Sine wave on y, amplitude decays with distance from center
    const dist = Math.hypot(x, z)
    const y = Math.sin(x * 1.2 + z * 0.8) * 0.7 * Math.exp(-dist * 0.15)
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
  }
  return positions
}

// Ring / torus — evokes "orbit / connection / closure". Tilted slightly for depth.
export function ringShape(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const R = 3.2
  const r = 0.35
  for (let i = 0; i < count; i++) {
    const u = (i / count) * Math.PI * 2
    const v = Math.random() * Math.PI * 2
    const x = (R + r * Math.cos(v)) * Math.cos(u)
    const z = (R + r * Math.cos(v)) * Math.sin(u)
    const y = r * Math.sin(v) + (Math.random() - 0.5) * 0.2
    // tilt ~12° around x
    const tilt = 0.2
    const ty = y * Math.cos(tilt) - z * Math.sin(tilt)
    const tz = y * Math.sin(tilt) + z * Math.cos(tilt)
    positions[i * 3] = x
    positions[i * 3 + 1] = ty
    positions[i * 3 + 2] = tz
  }
  return positions
}
