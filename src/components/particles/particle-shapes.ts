// Generates Float32Array of xyz positions for each particle shape.
// Each shape must return EXACTLY `count` particles so morph interpolation aligns.

export function sphereShape(count: number, radius = 3): Float32Array {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere distribution — even spread, no clumping
    const k = i + 0.5
    const phi = Math.acos(1 - (2 * k) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * k
    const r = radius * (0.7 + Math.random() * 0.3) // slight radial noise
    positions[i * 3] = Math.cos(theta) * Math.sin(phi) * r
    positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * r
    positions[i * 3 + 2] = Math.cos(phi) * r
  }
  return positions
}

// Placeholders for future shapes (Fase 2+). Stubs return spheres of correct count
// so morph math doesn't NaN during staged rollout.
export function clustersShape(count: number): Float32Array {
  return sphereShape(count, 3)
}

export function waveShape(count: number): Float32Array {
  return sphereShape(count, 3)
}

export function ringShape(count: number): Float32Array {
  return sphereShape(count, 3)
}
