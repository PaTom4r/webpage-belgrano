export type ParticleSectionId = 'hero' | 'verticales' | 'stats' | 'cta' | 'default'
export type ParticleBeat = 'idle' | 'assemble' | 'connect' | 'reveal' | 'condense' | 'dissolve'
export type ParticleVertical = 'none' | 'intelligence' | 'media' | 'brand'

export interface ParticleSectionMeasurement {
  id: ParticleSectionId
  top: number
  height: number
}

export interface ParticleTimelineInput {
  scrollY: number
  viewportHeight: number
  documentHeight: number
  sections: ParticleSectionMeasurement[]
}

export interface ParticleTimelineState {
  activeSection: ParticleSectionId
  vertical: ParticleVertical
  beat: ParticleBeat
  pageProgress: number
  sectionProgress: number
  beatProgress: number
  accent: string
  opacity: number
  pointSize: number
  formation: number
  scatter: number
  turbulence: number
  connectionOpacity: number
}

const ACCENTS = {
  intelligence: '#20808D',
  media: '#0EA5E9',
  brand: '#F97316',
  white: '#ffffff',
} as const

export const DEFAULT_PARTICLE_TIMELINE_STATE: ParticleTimelineState = {
  activeSection: 'default',
  vertical: 'none',
  beat: 'idle',
  pageProgress: 0,
  sectionProgress: 0,
  beatProgress: 0,
  accent: ACCENTS.white,
  opacity: 0.12,
  pointSize: 0.82,
  formation: 0,
  scatter: 0.8,
  turbulence: 0.1,
  connectionOpacity: 0,
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function inverseLerp(start: number, end: number, value: number) {
  if (start === end) return 0
  return clamp((value - start) / (end - start))
}

function getSectionProgress(
  section: ParticleSectionMeasurement,
  scrollY: number,
  viewportHeight: number,
) {
  const scrollableDistance = section.height - viewportHeight

  if (scrollableDistance > 0) {
    return clamp((scrollY - section.top) / scrollableDistance)
  }

  const viewportMidpoint = scrollY + viewportHeight * 0.5
  return clamp((viewportMidpoint - section.top) / Math.max(section.height, 1))
}

function resolveActiveSection(
  sections: ParticleSectionMeasurement[],
  scrollY: number,
  viewportHeight: number,
) {
  const viewportProbe = scrollY + viewportHeight * 0.18
  const containing = sections.find(
    (section) => viewportProbe >= section.top && viewportProbe < section.top + section.height,
  )

  if (containing) return containing

  return sections.reduce<ParticleSectionMeasurement | null>((closest, section) => {
    if (!closest) return section
    const sectionCenter = section.top + section.height * 0.5
    const closestCenter = closest.top + closest.height * 0.5
    return Math.abs(sectionCenter - viewportProbe) < Math.abs(closestCenter - viewportProbe)
      ? section
      : closest
  }, null)
}

function getVertical(progress: number): ParticleVertical {
  if (progress < 0.34) return 'intelligence'
  if (progress < 0.68) return 'media'
  return 'brand'
}

function getVerticalBeat(progress: number): ParticleBeat {
  if (progress < 0.34) return 'assemble'
  if (progress < 0.68) return 'connect'
  return 'reveal'
}

function getVerticalFormation(vertical: ParticleVertical) {
  if (vertical === 'intelligence') return 1
  if (vertical === 'media') return 2
  if (vertical === 'brand') return 3
  return 0
}

function getVerticalAccent(vertical: ParticleVertical) {
  if (vertical === 'intelligence') return ACCENTS.intelligence
  if (vertical === 'media') return ACCENTS.media
  if (vertical === 'brand') return ACCENTS.brand
  return ACCENTS.white
}

function getBeatProgress(progress: number, vertical: ParticleVertical) {
  if (vertical === 'intelligence') return inverseLerp(0, 0.34, progress)
  if (vertical === 'media') return inverseLerp(0.34, 0.68, progress)
  if (vertical === 'brand') return inverseLerp(0.68, 1, progress)
  return progress
}

export function getParticleTimelineState(input: ParticleTimelineInput): ParticleTimelineState {
  const maxScroll = Math.max(input.documentHeight - input.viewportHeight, 1)
  const pageProgress = clamp(input.scrollY / maxScroll)
  const active = resolveActiveSection(input.sections, input.scrollY, input.viewportHeight)

  if (!active) {
    return { ...DEFAULT_PARTICLE_TIMELINE_STATE, pageProgress }
  }

  const sectionProgress = getSectionProgress(active, input.scrollY, input.viewportHeight)

  if (active.id === 'hero') {
    return {
      activeSection: 'hero',
      vertical: 'none',
      beat: 'idle',
      pageProgress,
      sectionProgress,
      beatProgress: sectionProgress,
      accent: ACCENTS.white,
      opacity: 0.1,
      pointSize: 0.62,
      formation: 0,
      scatter: 0.78,
      turbulence: 0.08,
      connectionOpacity: 0,
    }
  }

  if (active.id === 'verticales') {
    const vertical = getVertical(sectionProgress)
    const beat = getVerticalBeat(sectionProgress)

    return {
      activeSection: 'verticales',
      vertical,
      beat,
      pageProgress,
      sectionProgress,
      beatProgress: getBeatProgress(sectionProgress, vertical),
      accent: getVerticalAccent(vertical),
      opacity: 0.42,
      pointSize: 0.9,
      formation: getVerticalFormation(vertical),
      scatter: 0.18,
      turbulence: 0.2,
      connectionOpacity: beat === 'reveal' ? 0.18 : 0.34,
    }
  }

  if (active.id === 'stats') {
    return {
      activeSection: 'stats',
      vertical: 'none',
      beat: 'condense',
      pageProgress,
      sectionProgress,
      beatProgress: sectionProgress,
      accent: ACCENTS.media,
      opacity: 0.26,
      pointSize: 0.86,
      formation: 4,
      scatter: 0.05,
      turbulence: 0.11,
      connectionOpacity: 0.16,
    }
  }

  if (active.id === 'cta') {
    return {
      activeSection: 'cta',
      vertical: 'none',
      beat: 'dissolve',
      pageProgress,
      sectionProgress,
      beatProgress: clamp(sectionProgress * 3 + 0.35),
      accent: ACCENTS.white,
      opacity: 0.012,
      pointSize: 0.54,
      formation: 5,
      scatter: 1.95,
      turbulence: 0.05,
      connectionOpacity: 0,
    }
  }

  return {
    ...DEFAULT_PARTICLE_TIMELINE_STATE,
    pageProgress,
    sectionProgress,
    beatProgress: sectionProgress,
  }
}
