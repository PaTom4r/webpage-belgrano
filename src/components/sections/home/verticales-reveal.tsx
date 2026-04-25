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
import {
  createVerticalInvocationWindows,
  type InvocationVertical,
} from '@/components/particles/particle-invocation'

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

// Config de assets por vertical. Flipear a `/home/<slug>.mp4` cuando Pato
// dropee el video final en public/home/. Mientras sea null, se renderiza
// el placeholder SVG. Ver docs/home-verticales-prompts.md para el flujo.
const MEDIA_ASSETS: Record<
  'intelligence' | 'media' | 'brand',
  { video: string | null; poster: string | null }
> = {
  intelligence: { video: '/home/intelligence.mp4', poster: '/home/intelligence.png' },
  media: { video: null, poster: null },
  brand: { video: null, poster: null },
}

interface PanelVisualProps {
  accent: string
  variant: InvocationVertical
  scrollYProgress?: MotionValue<number>
}

interface ParticleInvokeProps {
  accent: string
  children: React.ReactNode
  className?: string
  progress?: MotionValue<number>
  range?: [number, number, number]
}

function ParticleInvoke({ accent, children, className, progress, range }: ParticleInvokeProps) {
  if (!progress || !range) {
    return <div className={className}>{children}</div>
  }

  return (
    <ParticleInvokeAnimated accent={accent} className={className} progress={progress} range={range}>
      {children}
    </ParticleInvokeAnimated>
  )
}

interface ParticleInvokeAnimatedProps {
  accent: string
  children: React.ReactNode
  className?: string
  progress: MotionValue<number>
  range: [number, number, number]
}

function ParticleInvokeAnimated({
  accent,
  children,
  className,
  progress,
  range,
}: ParticleInvokeAnimatedProps) {
  const [start, mid, end] = range
  const opacity = useTransform(progress, [0, start, mid, end, 1], [0.12, 0.12, 0.78, 1, 1])
  const dustOpacity = useTransform(progress, [0, start, mid, end, 1], [0, 0, 1, 0, 0])
  const clipPath = useTransform(
    progress,
    [0, start, mid, end, 1],
    [
      'inset(0 100% 0 0)',
      'inset(0 100% 0 0)',
      'inset(0 24% 0 0)',
      'inset(0 0% 0 0)',
      'inset(0 0% 0 0)',
    ],
  )
  const filter = useTransform(progress, [0, start, mid, end, 1], ['blur(12px)', 'blur(12px)', 'blur(3px)', 'blur(0px)', 'blur(0px)'])
  const y = useTransform(progress, [start, end], [18, 0])
  const dustX = useTransform(progress, [start, end], ['-28%', '108%'])

  return (
    <div className={`relative isolate ${className ?? ''}`}>
      <motion.div style={{ opacity, clipPath, filter, y, willChange: 'opacity, clip-path, filter, transform' }}>
        {children}
      </motion.div>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-3 z-10"
        style={{
          opacity: dustOpacity,
          x: dustX,
          backgroundImage: `
            radial-gradient(circle, ${accent} 0 1px, transparent 1.6px),
            radial-gradient(circle, rgba(255,255,255,0.9) 0 1px, transparent 1.5px)
          `,
          backgroundSize: '9px 9px, 17px 17px',
          backgroundPosition: '0 0, 8px 5px',
          maskImage: 'linear-gradient(to right, transparent 0%, black 22%, black 62%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 22%, black 62%, transparent 100%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}

function ParticleInvokeBlock({ accent, children, progress, range }: ParticleInvokeProps) {
  if (!progress || !range) return <>{children}</>

  return (
    <ParticleInvokeBlockAnimated accent={accent} progress={progress} range={range}>
      {children}
    </ParticleInvokeBlockAnimated>
  )
}

function ParticleInvokeBlockAnimated({
  accent,
  children,
  progress,
  range,
}: Required<Pick<ParticleInvokeProps, 'accent' | 'children' | 'progress' | 'range'>>) {
  const [start, mid, end] = range
  const blockOpacity = useTransform(progress, [0, start, mid, end, 1], [0, 0, 0.66, 1, 1])
  const dustOpacity = useTransform(progress, [0, start, mid, end, 1], [0, 0, 1, 0.08, 0])
  const scale = useTransform(progress, [start, mid, end], [0.96, 1.015, 1])
  const clipPath = useTransform(
    progress,
    [0, start, mid, end, 1],
    [
      'inset(48% 48% 48% 48% round 12px)',
      'inset(48% 48% 48% 48% round 12px)',
      'inset(14% 10% 12% 10% round 12px)',
      'inset(0% 0% 0% 0% round 12px)',
      'inset(0% 0% 0% 0% round 12px)',
    ],
  )

  return (
    <div className="relative isolate">
      <motion.div
        style={{
          opacity: blockOpacity,
          clipPath,
          scale,
          willChange: 'opacity, clip-path, transform',
        }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-xl"
        style={{
          opacity: dustOpacity,
          border: `1px solid ${accent}88`,
          boxShadow: `0 0 32px ${accent}44, inset 0 0 28px ${accent}1f`,
          backgroundImage: `
            radial-gradient(circle at 18% 26%, ${accent} 0 1px, transparent 1.8px),
            radial-gradient(circle at 82% 18%, ${accent} 0 1px, transparent 1.8px),
            radial-gradient(circle at 54% 76%, rgba(255,255,255,0.92) 0 1px, transparent 1.8px)
          `,
          backgroundSize: '10px 10px, 14px 14px, 18px 18px',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}

// Visual per-vertical. Cuando hay demo (Intelligence + scrollYProgress) → panel
// translúcido que deja ver el video de fondo de la sección. Cuando NO hay demo
// (Media/Brand por ahora sin video) → video inline o placeholder SVG.
function PanelVisual({ accent, variant, scrollYProgress }: PanelVisualProps) {
  const asset = MEDIA_ASSETS[variant]
  const hasDemo = variant === 'intelligence' && !!scrollYProgress

  // Panel intelligence con demo: transparente, deja ver el video bg de la sección
  if (hasDemo && scrollYProgress) {
    return (
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl"
        style={{
          boxShadow: `0 40px 120px -40px ${accent}55`,
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <IntelligenceDemo scrollYProgress={scrollYProgress} accent={accent} />
      </div>
    )
  }

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl"
      style={{ boxShadow: `0 40px 120px -40px ${accent}55` }}
    >
      {asset.video ? (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={asset.poster ?? undefined}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={asset.video} type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)',
            }}
          />
        </>
      ) : (
        <>
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
        </>
      )}
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

// Demo scroll-driven de 3 pasos del orquestador de cobranza.
// Rangos de scrollYProgress dentro del panel Intelligence (0.00 – 0.30):
//   Paso 1 "Entrante":    0.00 – 0.10  (cliente escribe WhatsApp)
//   Paso 2 "Orquestando": 0.10 – 0.20  (agente consulta 4 sistemas)
//   Paso 3 "Resuelto":    0.20 – 0.30  (respuesta + métricas)
// Cada paso cross-fade de 0.02 al entrar/salir.
interface IntelligenceDemoProps {
  scrollYProgress: MotionValue<number>
  accent: string
}

function IntelligenceDemo({ scrollYProgress, accent }: IntelligenceDemoProps) {
  // Step opacities — handoff limpio en 0.10 y 0.20
  const step1Opacity = useTransform(
    scrollYProgress,
    [0.0, 0.02, 0.08, 0.10],
    [0, 1, 1, 0],
  )
  const step2Opacity = useTransform(
    scrollYProgress,
    [0.10, 0.12, 0.18, 0.20],
    [0, 1, 1, 0],
  )
  const step3Opacity = useTransform(
    scrollYProgress,
    [0.20, 0.22, 0.30],
    [0, 1, 1],
  )

  // Sub-animations step 2 — cards staggered
  const card1Op = useTransform(scrollYProgress, [0.120, 0.130], [0, 1])
  const card2Op = useTransform(scrollYProgress, [0.135, 0.145], [0, 1])
  const card3Op = useTransform(scrollYProgress, [0.150, 0.160], [0, 1])
  const card4Op = useTransform(scrollYProgress, [0.165, 0.175], [0, 1])

  // Step label reactivo — tipo string explícito para aceptar union literal
  const stepLabel = useTransform<number, string>(scrollYProgress, (v) => {
    if (v < 0.10) return '01 · Entrante'
    if (v < 0.20) return '02 · Orquestando'
    return '03 · Resuelto'
  })

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Step badge top-right */}
      <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
        <motion.span className="tabular-nums">{stepLabel}</motion.span>
      </div>

      {/* STEP 1 — Cliente escribe */}
      <motion.div
        style={{ opacity: step1Opacity }}
        className="absolute inset-0 flex flex-col items-start justify-center gap-3 p-8 sm:p-12"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
          Cliente · WhatsApp
        </p>
        <div className="max-w-[70%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur-md sm:text-base">
          Hola, necesito ponerme al día con mi deuda
        </div>
        <div className="ml-2 mt-1 flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: accent }}
          />
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: accent, animationDelay: '0.15s' }}
          />
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: accent, animationDelay: '0.3s' }}
          />
          <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-white/50">
            Agente procesando
          </span>
        </div>
      </motion.div>

      {/* STEP 2 — Orquestación sistemas */}
      <motion.div
        style={{ opacity: step2Opacity }}
        className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12"
      >
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          Consultando 4 sistemas
        </p>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <motion.div style={{ opacity: card1Op }}>
            <SystemCard label="CRM" value="Identidad validada" accent={accent} />
          </motion.div>
          <motion.div style={{ opacity: card2Op }}>
            <SystemCard label="Ledger" value="Deuda: $450.000" accent={accent} />
          </motion.div>
          <motion.div style={{ opacity: card3Op }}>
            <SystemCard
              label="Motor de ofertas"
              value="3 planes generados"
              accent={accent}
            />
          </motion.div>
          <motion.div style={{ opacity: card4Op }}>
            <SystemCard
              label="Pasarela de pago"
              value="Link seguro emitido"
              accent={accent}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* STEP 3 — Resuelto */}
      <motion.div
        style={{ opacity: step3Opacity }}
        className="absolute inset-0 flex flex-col items-end justify-center gap-4 p-8 sm:p-12"
      >
        <p
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          Respuesta end-to-end
        </p>
        <div
          className="max-w-[78%] rounded-2xl rounded-br-sm border px-4 py-3 text-sm backdrop-blur-md sm:text-base"
          style={{
            background: `${accent}22`,
            borderColor: `${accent}66`,
            color: 'white',
          }}
        >
          Te ofrezco <strong>3 cuotas de $150.000</strong> sin interés.
          <br />
          Tu link de pago:{' '}
          <span className="underline" style={{ color: accent }}>
            pagar.belgrano.cl/x7k
          </span>
        </div>
        <div className="mt-2 flex flex-wrap justify-end gap-2">
          <MetricPill value="12s" label="Tiempo" accent={accent} />
          <MetricPill value="4" label="Sistemas" accent={accent} />
          <MetricPill value="0" label="Intervención humana" accent={accent} />
        </div>
      </motion.div>
    </div>
  )
}

function SystemCard({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent: string
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
        />
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">
          {label}
        </p>
      </div>
      <p className="mt-0.5 text-xs font-semibold text-white sm:text-sm">{value}</p>
    </div>
  )
}

function MetricPill({
  value,
  label,
  accent,
}: {
  value: string
  label: string
  accent: string
}) {
  return (
    <div
      className="flex items-baseline gap-1.5 rounded-full border px-3 py-1 backdrop-blur-md"
      style={{
        borderColor: `${accent}55`,
        background: `${accent}14`,
      }}
    >
      <span className="text-xs font-bold text-white sm:text-sm">{value}</span>
      <span className="text-[9px] font-semibold uppercase tracking-wider text-white/60">
        {label}
      </span>
    </div>
  )
}

interface PanelContentProps {
  slug: string
  eyebrow: string
  name: string
  benefit: string
  chips: string[]
  accent: string
  variant: InvocationVertical
  scrollYProgress?: MotionValue<number>
}

function Panel({
  slug,
  eyebrow,
  name,
  benefit,
  chips,
  accent,
  variant,
  scrollYProgress,
}: PanelContentProps) {
  const invocation = createVerticalInvocationWindows(variant)

  return (
    <Link
      href={`/verticales/${slug}`}
      className="group block"
    >
      <ParticleInvokeBlock accent={accent} progress={scrollYProgress} range={invocation.visual}>
        <PanelVisual accent={accent} variant={variant} scrollYProgress={scrollYProgress} />
      </ParticleInvokeBlock>

      <div className="mt-6 flex flex-col gap-3">
        <ParticleInvoke accent={accent} progress={scrollYProgress} range={invocation.eyebrow}>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ color: accent }}
          >
            {eyebrow}
          </p>
        </ParticleInvoke>
        <ParticleInvoke accent={accent} progress={scrollYProgress} range={invocation.title}>
          <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {name}
          </h3>
        </ParticleInvoke>
        <ParticleInvoke accent={accent} progress={scrollYProgress} range={invocation.body}>
          <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {benefit}
          </p>
        </ParticleInvoke>
        {chips.length > 0 && (
          <ParticleInvoke accent={accent} progress={scrollYProgress} range={invocation.chips}>
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
          </ParticleInvoke>
        )}
        <ParticleInvoke
          accent={accent}
          className="self-start"
          progress={scrollYProgress}
          range={invocation.cta}
        >
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 group-hover:border-white group-hover:bg-white group-hover:text-black">
            Saber más →
          </span>
        </ParticleInvoke>
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

  // Pointer-events por panel — solo el panel activo recibe clicks. Resuelve bug
  // donde el último panel (Brand) capturaba clicks aún con opacity 0 por estar
  // stacked con absolute inset-0.
  const intelPE = useTransform<number, 'auto' | 'none'>(
    scrollYProgress,
    (v) => (v < 0.32 ? 'auto' : 'none'),
  )
  const mediaPE = useTransform<number, 'auto' | 'none'>(
    scrollYProgress,
    (v) => (v >= 0.32 && v < 0.66 ? 'auto' : 'none'),
  )
  const brandPE = useTransform<number, 'auto' | 'none'>(
    scrollYProgress,
    (v) => (v >= 0.66 ? 'auto' : 'none'),
  )

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
    PanelContentProps & {
      opacity: MotionValue<number>
      y: MotionValue<string>
      pointerEvents: MotionValue<'auto' | 'none'>
    }
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
      pointerEvents: intelPE,
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
      pointerEvents: mediaPE,
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
      pointerEvents: brandPE,
    },
  ]

  return (
    <section
      id="verticales"
      aria-labelledby="verticales-heading"
      className="relative bg-dark text-white"
    >
      {/* DESKTOP — sticky scroll-driven reveal */}
      <div ref={containerRef} className="relative hidden md:block" style={{ height: '700vh' }}>
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center overflow-hidden">
          {/* Background video layer — section-wide. Inclinado a la derecha
              con fade izquierdo via mask gradient. Vive detrás de TODO.
              Mientras solo tenemos intelligence.mp4, lo usamos como atmósfera
              constante; el tint accent cambia por vertical (abajo). */}
          <div aria-hidden="true" className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/home/intelligence.png"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: 'right center',
                maskImage:
                  'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 28%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,1) 80%)',
                WebkitMaskImage:
                  'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 28%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,1) 80%)',
              }}
            >
              <source src="/home/intelligence.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay general para legibilidad del texto */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.25) 100%)',
              }}
            />

            {/* Tint accent por vertical — cada layer tiene opacity
                atada al scroll; se cross-fade entre sí. Interpolado. */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: intelOpacity,
                background: `radial-gradient(ellipse 70% 60% at 80% 50%, ${accents.intelligence}22 0%, transparent 60%)`,
              }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: mediaOpacity,
                background: `radial-gradient(ellipse 70% 60% at 80% 50%, ${accents.media}22 0%, transparent 60%)`,
              }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: brandOpacity,
                background: `radial-gradient(ellipse 70% 60% at 80% 50%, ${accents.brand}22 0%, transparent 60%)`,
              }}
            />
          </div>

          <Container>
            <div className="relative z-10 grid grid-cols-12 gap-8 lg:gap-12">
              {/* Left — sticky text */}
              <div className="col-span-5 flex flex-col justify-center gap-6">
                <ParticleInvoke
                  accent={accents.intelligence}
                  progress={scrollYProgress}
                  range={[0.01, 0.04, 0.08]}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-[0.24em] text-white/50"
                  >
                    Qué hacemos
                  </p>
                </ParticleInvoke>
                <ParticleInvoke
                  accent={accents.intelligence}
                  progress={scrollYProgress}
                  range={[0.04, 0.08, 0.15]}
                >
                  <h2
                    id="verticales-heading"
                    className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
                    style={{ textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}
                  >
                    Tres verticales,
                    <br />
                    <span className="text-white/80">un mismo equipo</span>
                  </h2>
                </ParticleInvoke>
                <ParticleInvoke
                  accent={accents.intelligence}
                  progress={scrollYProgress}
                  range={[0.1, 0.16, 0.24]}
                >
                  <p
                    className="max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
                    style={{ textShadow: '0 1px 14px rgba(0,0,0,0.85)' }}
                  >
                    Operamos tres verticales que se potencian entre sí — inteligencia,
                    medios y marca. Cada una con su expertise. Todas con la misma
                    obsesión: resultados medibles.
                  </p>
                </ParticleInvoke>

                {/* Progress indicator */}
                <ParticleInvoke
                  accent={accents.intelligence}
                  progress={scrollYProgress}
                  range={[0.18, 0.22, 0.3]}
                >
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
                </ParticleInvoke>
              </div>

              {/* Right — stacked panels con cross-fade */}
              <div className="relative col-span-7">
                {panels.map((p) => (
                  <motion.div
                    key={p.slug}
                    className="absolute inset-0 flex items-center"
                    style={{
                      opacity: p.opacity,
                      y: p.y,
                      pointerEvents: p.pointerEvents,
                    }}
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
                        scrollYProgress={scrollYProgress}
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
