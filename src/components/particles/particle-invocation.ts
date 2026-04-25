export type InvocationVertical = 'intelligence' | 'media' | 'brand'

export interface InvocationWindows {
  segment: [number, number]
  visual: [number, number, number]
  eyebrow: [number, number, number]
  title: [number, number, number]
  body: [number, number, number]
  chips: [number, number, number]
  cta: [number, number, number]
}

const SEGMENTS: Record<InvocationVertical, [number, number]> = {
  intelligence: [0, 0.34],
  media: [0.34, 0.68],
  brand: [0.68, 1],
}

function interpolate(start: number, end: number, value: number) {
  return start + (end - start) * value
}

function makeWindow(
  segmentStart: number,
  segmentEnd: number,
  startRatio: number,
  endRatio: number,
): [number, number, number] {
  const start = interpolate(segmentStart, segmentEnd, startRatio)
  const end = interpolate(segmentStart, segmentEnd, endRatio)
  const mid = interpolate(start, end, 0.55)
  return [Number(start.toFixed(4)), Number(mid.toFixed(4)), Number(end.toFixed(4))]
}

export function createVerticalInvocationWindows(vertical: InvocationVertical): InvocationWindows {
  const [segmentStart, segmentEnd] = SEGMENTS[vertical]

  return {
    segment: [segmentStart, segmentEnd],
    visual: makeWindow(segmentStart, segmentEnd, 0.04, 0.32),
    eyebrow: makeWindow(segmentStart, segmentEnd, 0.12, 0.34),
    title: makeWindow(segmentStart, segmentEnd, 0.18, 0.44),
    body: makeWindow(segmentStart, segmentEnd, 0.28, 0.54),
    chips: makeWindow(segmentStart, segmentEnd, 0.42, 0.68),
    cta: makeWindow(segmentStart, segmentEnd, 0.56, 0.86),
  }
}
