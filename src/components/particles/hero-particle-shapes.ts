// Generators for the 3 morph targets of the hero particle entity.
// Each generator returns a Float32Array of xyz positions (length = count * 3).
// Same `count` and `seed` across generators keeps particle indices aligned so
// the vertex shader can interpolate between them per-particle without sorting.

export type ParticleField = {
  base: Float32Array
  mid: Float32Array
  end: Float32Array
  seeds: Float32Array
  sizes: Float32Array
  count: number
}

// Mulberry32 — small, fast, deterministic.
function mulberry32(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6D2B79F5) | 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Sphere — Fibonacci spiral for even distribution on the surface plus
// a small radial jitter so the surface reads as a cloud, not a shell.
function fillSphere(out: Float32Array, count: number, radius: number, rand: () => number) {
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = phi * i
    const jitter = 0.85 + rand() * 0.3
    const ri = radius * jitter
    const x = Math.cos(theta) * r * ri
    const z = Math.sin(theta) * r * ri
    const yi = y * ri
    out[i * 3 + 0] = x
    out[i * 3 + 1] = yi
    out[i * 3 + 2] = z
  }
}

// Cluster — irregular blobby shape: sphere with strong noise-driven radial
// distortion. Reads as the entity "compressing inward" mid-scroll.
function fillCluster(out: Float32Array, count: number, baseRadius: number, rand: () => number) {
  for (let i = 0; i < count; i++) {
    // Same Fibonacci layout but with much heavier per-particle radial variance
    // so the result feels organic instead of spherical.
    const u = rand()
    const v = rand()
    const theta = u * Math.PI * 2
    const phi = Math.acos(2 * v - 1)
    const noise =
      0.55 +
      0.35 * Math.sin(theta * 3 + phi * 2) +
      0.20 * Math.cos(phi * 5 - theta * 1.7)
    const r = baseRadius * Math.max(0.35, noise)
    out[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
    out[i * 3 + 1] = r * Math.cos(phi) * 0.85 // slightly squashed vertically
    out[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  }
}

// Torus — a horizontal ring with thickness. Reads as the entity "opening up".
function fillTorus(out: Float32Array, count: number, R: number, r: number, rand: () => number) {
  for (let i = 0; i < count; i++) {
    const u = rand() * Math.PI * 2
    const v = rand() * Math.PI * 2
    const tubeR = r * (0.7 + rand() * 0.6)
    const x = (R + tubeR * Math.cos(v)) * Math.cos(u)
    const z = (R + tubeR * Math.cos(v)) * Math.sin(u)
    const y = tubeR * Math.sin(v)
    out[i * 3 + 0] = x
    out[i * 3 + 1] = y
    out[i * 3 + 2] = z
  }
}

export function createHeroParticleField(count: number, seed = 1337): ParticleField {
  const rand = mulberry32(seed)

  const base = new Float32Array(count * 3)
  const mid = new Float32Array(count * 3)
  const end = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const sizes = new Float32Array(count)

  // Tuned to read well at hero camera distance ~5 units away.
  fillSphere(base, count, 1.55, mulberry32(seed + 1))
  fillCluster(mid, count, 1.85, mulberry32(seed + 2))
  fillTorus(end, count, 1.45, 0.55, mulberry32(seed + 3))

  for (let i = 0; i < count; i++) {
    seeds[i] = rand()
    // Bias toward smaller particles with a long tail of brighter highlights.
    sizes[i] = 0.6 + Math.pow(rand(), 1.8) * 1.2
  }

  return { base, mid, end, seeds, sizes, count }
}
