// src/components/sections/home/verticales-reveal.tsx
// Scroll-driven reveal de las 3 verticales Belgrano.
// Patrón: outer 400vh, inner sticky top-16 h-screen con 2 columnas.
//  - Izquierda (40%) = texto explicativo pinned, con progress pill 01/02/03 y barra de color interpolado.
//  - Derecha (60%) = 3 paneles apilados en la misma posición con cross-fade según scrollYProgress.
// Mobile (<md): stack vertical sin sticky, cada vertical es una card full-width.
'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { verticales } from '@/lib/content/verticales'
import { Container } from '@/components/layout/container'

// Tracker manual — calcula progress (0→1) del elemento respecto al viewport.
// Más robusto que useScroll({ target }) en combos Next 16 + Turbopack + React 19.
// Usa scroll + resize listeners con rAF throttling y actualiza un MotionValue.
function useElementProgress(ref: React.RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0)

  useEffect(() => {
    if (!ref.current) return
    let rafId = 0

    const update = () => {
      rafId = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // progress=0 cuando section top = viewport top
      // progress=1 cuando section bottom = viewport bottom
      const distance = rect.height - vh
      if (distance <= 0) {
        progress.set(0)
        return
      }
      const scrolled = -rect.top
      progress.set(Math.min(1, Math.max(0, scrolled / distance)))
    }

    const tick = () => {
      if (rafId) return
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', tick)
    return () => {
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [ref, progress])

  return progress
}

interface PanelVisualProps {
  accent: string
  variant: 'intelligence' | 'media' | 'brand'
}

// Placeholder visual por vertical. Aspect-video, gradientes + patterns
// que evocan el concepto final (neural net / LED / activación).
// Se reemplaza en Phase 2 con los MP4 generados por Veo 3.1.
function PanelVisual({ accent, variant }: PanelVisualProps) {
  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl"
      style={{ boxShadow: `0 40px 120px -40px ${accent}55` }}
    >
      {/* Base gradient — accent wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(90% 70% at 50% 40%, ${accent}66 0%, ${accent}22 40%, #000 100%)`,
        }}
      />

      {/* Pattern overlay por variante */}
      {variant === 'intelligence' && <NeuralPattern accent={accent} />}
      {variant === 'media' && <LedPattern accent={accent} />}
      {variant === 'brand' && <BrandPattern accent={accent} />}

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Placeholder label */}
      <div className="absolute bottom-3 right-3 z-10 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
        Placeholder · video próximamente
      </div>
    </div>
  )
}

// 3 patterns decorativos — todos aria-hidden, puramente estéticos.
function NeuralPattern({ accent }: { accent: string }) {
  const nodes = [
    { x: 20, y: 30 }, { x: 45, y: 22 }, { x: 70, y: 35 },
    { x: 30, y: 55 }, { x: 55, y: 50 }, { x: 80, y: 60 },
    { x: 25, y: 78 }, { x: 60, y: 75 },
  ]
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Connection lines */}
      {nodes.flatMap((a, i) =>
        nodes.slice(i + 1).map((b, j) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 35) return null
          return (
            <line
              key={`${i}-${j}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={accent}
              strokeWidth={0.15}
              opacity={0.5}
            />
          )
        }),
      )}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={1.8} fill={accent} opacity={0.9} />
          <circle cx={n.x} cy={n.y} r={3.2} fill={accent} opacity={0.2} />
        </g>
      ))}
    </svg>
  )
}

function LedPattern({ accent }: { accent: string }) {
  const bars = Array.from({ length: 18 })
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-end justify-center gap-1 px-6 pb-6">
      {bars.map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{
            height: `${20 + Math.abs(Math.sin(i * 0.7)) * 50}%`,
            background: `linear-gradient(to top, ${accent}cc, ${accent}22)`,
            opacity: 0.6 + Math.abs(Math.sin(i * 0.5)) * 0.3,
          }}
        />
      ))}
    </div>
  )
}

function BrandPattern({ accent }: { accent: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(circle at 30% 40%, ${accent}80 0%, transparent 25%),
          radial-gradient(circle at 70% 60%, ${accent}66 0%, transparent 30%),
          radial-gradient(circle at 50% 50%, ${accent}22 0%, transparent 60%)
        `,
        filter: 'blur(8px)',
      }}
    />
  )
}

interface PanelContentProps {
  slug: string
  eyebrow: string
  name: string
  benefit: string
  chips: string[]
  accent: string
  variant: 'intelligence' | 'media' | 'brand'
}

function Panel({ slug, eyebrow, name, benefit, chips, accent, variant }: PanelContentProps) {
  return (
    <Link
      href={`/verticales/${slug}`}
      className="group block"
    >
      <PanelVisual accent={accent} variant={variant} />

      <div className="mt-6 flex flex-col gap-3">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          {eyebrow}
        </p>
        <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          {name}
        </h3>
        <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          {benefit}
        </p>
        {chips.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {chips.slice(0, 4).map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold text-white"
                style={{
                  borderColor: `${accent}55`,
                  backgroundColor: `${accent}14`,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        )}
        <span
          className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 group-hover:border-white group-hover:bg-white group-hover:text-black"
        >
          Saber más →
        </span>
      </div>
    </Link>
  )
}

export function VerticalesReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollYProgress = useElementProgress(containerRef)

  // Cross-fade tight: crossovers de 0.04 progress para que no se vea texto apilado.
  // Intelligence: full 0.00–0.30, fade 0.30–0.34
  // Media:        fade-in 0.30–0.34, full 0.34–0.64, fade 0.64–0.68
  // Brand:        fade-in 0.64–0.68, full 0.68–1.00
  const intelOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.30, 0.34],
    [1, 1, 0],
  )
  const mediaOpacity = useTransform(
    scrollYProgress,
    [0.30, 0.34, 0.64, 0.68],
    [0, 1, 1, 0],
  )
  const brandOpacity = useTransform(
    scrollYProgress,
    [0.64, 0.68, 1.0],
    [0, 1, 1],
  )

  // Parallax sutil Y en cada panel — más sutil para que no compita con el fade
  const intelY = useTransform(scrollYProgress, [0, 0.34], ['0%', '-6%'])
  const mediaY = useTransform(scrollYProgress, [0.30, 0.68], ['6%', '-6%'])
  const brandY = useTransform(scrollYProgress, [0.64, 1], ['6%', '0%'])

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Active index — para el pill 01/02/03 (midpoint de cada cross-fade)
  const activeIndex = useTransform<number, number>(scrollYProgress, (v) => {
    if (v < 0.32) return 1
    if (v < 0.66) return 2
    return 3
  })

  // Pull data + accents de verticales.ts
  const intelligence = verticales.find((v) => v.slug === 'intelligence')
  const media = verticales.find((v) => v.slug === 'media')
  const brand = verticales.find((v) => v.slug === 'brand')

  if (!intelligence || !media || !brand) return null

  const accents = {
    intelligence: intelligence.accentColor ?? '#20808D',
    media: media.accentColor ?? '#0EA5E9',
    brand: brand.accentColor ?? '#F97316',
  }

  // Build desktop panels array
  const panels: Array<
    PanelContentProps & { opacity: MotionValue<number>; y: MotionValue<string> }
  > = [
    {
      slug: 'intelligence',
      eyebrow: intelligence.eyebrow ?? 'IA APLICADA',
      name: intelligence.name,
      benefit: intelligence.benefitHeadline,
      chips: intelligence.chips ?? [],
      accent: accents.intelligence,
      variant: 'intelligence',
      opacity: intelOpacity,
      y: intelY,
    },
    {
      slug: 'media',
      eyebrow: media.eyebrow ?? 'PLANIFICACIÓN DE MEDIOS',
      name: media.name,
      benefit: media.benefitHeadline,
      chips: media.chips ?? [],
      accent: accents.media,
      variant: 'media',
      opacity: mediaOpacity,
      y: mediaY,
    },
    {
      slug: 'brand',
      eyebrow: brand.eyebrow ?? 'TRADE & EXPERIENCIAS',
      name: brand.name,
      benefit: brand.benefitHeadline,
      chips: brand.chips ?? [],
      accent: accents.brand,
      variant: 'brand',
      opacity: brandOpacity,
      y: brandY,
    },
  ]

  return (
    <section
      aria-labelledby="verticales-heading"
      className="relative bg-dark text-white"
    >
      {/* DESKTOP — sticky scroll-driven reveal */}
      <div ref={containerRef} className="relative hidden md:block" style={{ height: '400vh' }}>
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center overflow-hidden">
          <Container>
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              {/* Left — sticky text */}
              <div className="col-span-5 flex flex-col justify-center gap-6">
                <p
                  className="text-xs font-bold uppercase tracking-[0.24em] text-white/50"
                >
                  Qué hacemos
                </p>
                <h2
                  id="verticales-heading"
                  className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                  Tres verticales,
                  <br />
                  <span className="text-white/80">un mismo equipo</span>
                </h2>
                <p className="max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
                  Operamos tres verticales que se potencian entre sí — inteligencia,
                  medios y marca. Cada una con su expertise. Todas con la misma
                  obsesión: resultados medibles.
                </p>

                {/* Progress indicator */}
                <div className="mt-8 flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-white/40">
                    <ActiveIndex activeIndex={activeIndex} />
                    {' / 03'}
                  </span>
                  <div className="relative h-px flex-1 overflow-hidden bg-white/10">
                    <motion.div
                      className="absolute inset-y-0 left-0"
                      style={{
                        width: progressWidth,
                        background: `linear-gradient(to right, ${accents.intelligence} 0%, ${accents.media} 50%, ${accents.brand} 100%)`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right — stacked panels con cross-fade */}
              <div className="relative col-span-7">
                {panels.map((p) => (
                  <motion.div
                    key={p.slug}
                    className="absolute inset-0 flex items-center"
                    style={{ opacity: p.opacity, y: p.y }}
                  >
                    <div className="w-full">
                      <Panel
                        slug={p.slug}
                        eyebrow={p.eyebrow}
                        name={p.name}
                        benefit={p.benefit}
                        chips={p.chips}
                        accent={p.accent}
                        variant={p.variant}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* MOBILE — stacked cards, sin sticky */}
      <div className="md:hidden">
        <Container>
          <div className="flex flex-col gap-4 py-16">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/50">
              Qué hacemos
            </p>
            <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-white">
              Tres verticales,
              <br />
              <span className="text-white/80">un mismo equipo</span>
            </h2>
            <p className="text-base leading-relaxed text-white/60">
              Operamos tres verticales que se potencian entre sí — inteligencia,
              medios y marca. Cada una con su expertise. Todas con la misma
              obsesión: resultados medibles.
            </p>

            <div className="mt-8 flex flex-col gap-10">
              {panels.map((p) => (
                <Panel
                  key={p.slug}
                  slug={p.slug}
                  eyebrow={p.eyebrow}
                  name={p.name}
                  benefit={p.benefit}
                  chips={p.chips}
                  accent={p.accent}
                  variant={p.variant}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

// Tiny helper — renderiza el número activo como texto, reactivo al MotionValue.
// Framer permite renderizar un MotionValue<string> como hijo de motion.*
function ActiveIndex({ activeIndex }: { activeIndex: MotionValue<number> }) {
  const display = useTransform(activeIndex, (v) => `0${v}`)
  return <motion.span className="tabular-nums">{display}</motion.span>
}
