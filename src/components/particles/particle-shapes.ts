export interface OrchestratorField {
  base: Float32Array
  intelligence: Float32Array
  media: Float32Array
  brand: Float32Array
  stats: Float32Array
  cta: Float32Array
  depth: Float32Array
  seed: Float32Array
  role: Float32Array
}

function random(index: number, salt = 0) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453123
  return x - Math.floor(x)
}

function writePoint(target: Float32Array, index: number, x: number, y: number, z: number) {
  target[index * 3] = x
  target[index * 3 + 1] = y
  target[index * 3 + 2] = z
}

function pointOnRect(t: number, cx: number, cy: number, width: number, height: number) {
  const p = t % 1
  if (p < 0.25) return [cx - width / 2 + width * (p / 0.25), cy - height / 2] as const
  if (p < 0.5) return [cx + width / 2, cy - height / 2 + height * ((p - 0.25) / 0.25)] as const
  if (p < 0.75) return [cx + width / 2 - width * ((p - 0.5) / 0.25), cy + height / 2] as const
  return [cx - width / 2, cy + height / 2 - height * ((p - 0.75) / 0.25)] as const
}

function writeBase(field: Float32Array, i: number) {
  const side = random(i, 2) > 0.5 ? 1 : -1
  const x = side * (2.8 + random(i, 3) * 4.3)
  const y = (random(i, 4) - 0.5) * 7.4
  const z = -7.6 + random(i, 5) * 4.8
  writePoint(field, i, x, y, z)
}

function writeIntelligence(field: Float32Array, i: number, count: number) {
  const lane = i % 4
  const t = i / Math.max(count - 1, 1)
  const z = -4.5 + random(i, 12) * 1.7

  if (lane === 0) {
    const node = i % 9
    const angle = node * 0.9 + random(i, 9) * 0.3
    const radius = 0.65 + (node % 3) * 0.62
    writePoint(field, i, 3.25 + Math.cos(angle) * radius, Math.sin(angle) * radius, z)
    return
  }

  if (lane === 1) {
    const card = Math.floor((i / 4) % 3)
    const [x, y] = pointOnRect(t * 8, 2.35 + card * 1.08, 1.15 - card * 0.8, 1.0, 0.48)
    writePoint(field, i, x, y, z)
    return
  }

  if (lane === 2) {
    const bubble = Math.floor((i / 6) % 3)
    const [x, y] = pointOnRect(t * 12, 0.75 + bubble * 0.5, 0.95 - bubble * 0.75, 1.45, 0.5)
    writePoint(field, i, x, y, z)
    return
  }

  writePoint(field, i, 0.55 + t * 5.2, Math.sin(t * 18.849) * 0.85, z)
}

function writeMedia(field: Float32Array, i: number, count: number) {
  const t = i / Math.max(count - 1, 1)
  const lane = i % 5
  const z = -4.8 + random(i, 22) * 1.9

  if (lane < 2) {
    const x = -0.15 + t * 6.4
    const wave = Math.sin(t * 18.849 + lane * 1.2) * (0.55 + lane * 0.22)
    writePoint(field, i, x, wave + 0.7 - lane * 0.9, z)
    return
  }

  if (lane === 2) {
    const col = i % 8
    const row = Math.floor(i / 8) % 4
    writePoint(field, i, 2.15 + col * 0.46, -1.45 + row * 0.48, z)
    return
  }

  const arc = t * Math.PI * 1.15
  writePoint(field, i, 2.7 + Math.cos(arc) * 3.0, -0.35 + Math.sin(arc) * 1.5, z)
}

function writeBrand(field: Float32Array, i: number) {
  const cluster = i % 4
  const centers = [
    [1.0, 0.95],
    [2.25, -0.55],
    [3.75, 0.4],
    [5.0, -1.0],
  ] as const
  const angle = random(i, 31) * Math.PI * 2
  const radius = 0.18 + random(i, 32) * (0.72 + cluster * 0.08)
  const [cx, cy] = centers[cluster]
  const x = cx + Math.cos(angle) * radius
  const y = cy + Math.sin(angle) * radius * 0.72
  const z = -4.4 + random(i, 33) * 1.8
  writePoint(field, i, x, y, z)
}

function writeStats(field: Float32Array, i: number) {
  const stat = i % 4
  const centers = [
    [-3.45, 0.38],
    [-1.15, 0.38],
    [1.15, 0.38],
    [3.45, 0.38],
  ] as const
  const angle = random(i, 41) * Math.PI * 2
  const radius = 0.32 + random(i, 42) * 0.52
  const [cx, cy] = centers[stat]
  writePoint(field, i, cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, -4.2)
}

function writeCta(field: Float32Array, i: number) {
  const side = random(i, 51) > 0.45 ? 1 : -1
  const x = side * (4.8 + random(i, 52) * 3.5)
  const y = -0.5 + (random(i, 53) - 0.5) * 4.8
  const z = -7.2 + random(i, 54) * 2.5
  writePoint(field, i, x, y, z)
}

export function createOrchestratorField(count: number): OrchestratorField {
  const base = new Float32Array(count * 3)
  const intelligence = new Float32Array(count * 3)
  const media = new Float32Array(count * 3)
  const brand = new Float32Array(count * 3)
  const stats = new Float32Array(count * 3)
  const cta = new Float32Array(count * 3)
  const depth = new Float32Array(count)
  const seed = new Float32Array(count)
  const role = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    writeBase(base, i)
    writeIntelligence(intelligence, i, count)
    writeMedia(media, i, count)
    writeBrand(brand, i)
    writeStats(stats, i)
    writeCta(cta, i)

    seed[i] = random(i, 99)
    depth[i] = 0.25 + random(i, 100) * 0.75
    role[i] = i % 5
  }

  return { base, intelligence, media, brand, stats, cta, depth, seed, role }
}
