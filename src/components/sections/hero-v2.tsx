'use client'
// Hero v2 — split layout: copy left, animated tabs right.
// Each tab panel uses HeroTabPanel: copy column (eyebrow + title + desc + chips + CTA)
// alongside the visual mockup + a real case card below it.
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedTabs } from '@/components/ui/animated-tabs'
import { ClientLogosRow } from '@/components/ui/client-logos-row'
import { verticales } from '@/lib/content/verticales'

// Accent colors sourced from verticales.ts — single source of truth
const ACCENT = {
  intelligence: verticales.find((v) => v.slug === 'intelligence')?.accentColor ?? '#7AA2FF',
  media:        verticales.find((v) => v.slug === 'media')?.accentColor        ?? '#FF9958',
  brand:        verticales.find((v) => v.slug === 'brand')?.accentColor        ?? '#4ADE80',
}

// ── Mockups (compact, fit half-width column) ────────────────────────────────

function IntelligenceMockup() {
  const accent = ACCENT.intelligence
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-75" style={{ background: accent }} />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          </span>
          <span className="text-[10px] font-medium text-gray-300 tracking-wide uppercase">3 agentes activos</span>
        </div>
        <span className="text-[9px] text-gray-400">24/7</span>
      </div>

      <div className="rounded-lg bg-white/[0.04] border border-white/5 p-2.5 space-y-1.5">
        <div className="flex items-start gap-1.5">
          <div className="mt-0.5 h-4 w-4 rounded-full bg-white/15 shrink-0 flex items-center justify-center">
            <span className="text-[8px] text-gray-300">U</span>
          </div>
          <div className="rounded-md bg-white/[0.06] px-2 py-1">
            <span className="text-[10px] text-gray-200">¿Tienen hora disponible mañana?</span>
          </div>
        </div>
        <div className="flex items-start gap-1.5 justify-end">
          <div className="rounded-md px-2 py-1" style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}>
            <span className="text-[10px]" style={{ color: accent }}>Sí, 10:30 con la Dra. Pérez ✓</span>
          </div>
          <div className="mt-0.5 h-4 w-4 rounded-full shrink-0 flex items-center justify-center" style={{ background: accent }}>
            <span className="text-[8px] text-black font-bold">B</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white/[0.04] border border-white/5 p-2.5 flex items-center justify-between">
        <div>
          <div className="text-base font-black text-white leading-none">87%</div>
          <div className="text-[9px] text-gray-400 mt-0.5">resolución automática</div>
        </div>
        <div className="flex items-end gap-0.5 h-5">
          {[40, 55, 48, 65, 70, 85].map((h, i) => (
            <div key={i} className="w-1 rounded-t-sm" style={{ height: `${h}%`, background: accent, opacity: 0.35 + i * 0.1 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function MediaMockup() {
  const accent = ACCENT.media
  const channels = [
    { name: 'TV',      pct: 45 },
    { name: 'DOOH',    pct: 25 },
    { name: 'Digital', pct: 20 },
    { name: 'Radio',   pct: 10 },
  ]
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[9px] text-gray-400 uppercase tracking-wide">Alcance proyectado</div>
          <div className="text-base font-black text-white leading-none mt-0.5">2.3M <span className="text-[9px] font-normal text-gray-400">/ sem</span></div>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}44` }}>
          Q2 2026
        </span>
      </div>

      <div className="rounded-lg bg-white/[0.04] border border-white/5 p-2.5 space-y-1.5">
        {channels.map((c) => (
          <div key={c.name} className="flex items-center gap-2">
            <span className="text-[10px] text-gray-200 w-12 shrink-0">{c.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: accent }} />
            </div>
            <span className="text-[9px] text-gray-400 w-9 text-right tabular-nums">{c.pct}%</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1">
        {[
          { l: 'Freq.', v: '3.2x' },
          { l: 'GRPs',  v: '420' },
          { l: 'CPM',   v: '$4.8k' },
        ].map((k) => (
          <div key={k.l} className="rounded border border-white/5 bg-white/[0.03] px-1.5 py-1">
            <div className="text-[9px] text-gray-400">{k.l}</div>
            <div className="text-[10px] text-white font-semibold">{k.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BrandMockup() {
  const accent = ACCENT.brand
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const active = [1, 2, 3, 4]
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="rounded-lg bg-white/[0.04] border border-white/5 p-2.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold text-white">Activación retail Q2</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}44` }}>
            En terreno
          </span>
        </div>
        <div className="text-[9px] text-gray-400">Mall Plaza · 6 locales</div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {[
          { v: '+340%', l: 'leads' },
          { v: '1.2k',  l: 'contactos' },
          { v: '94',    l: 'NPS' },
        ].map((k) => (
          <div key={k.l} className="rounded-lg bg-white/[0.04] border border-white/5 p-1.5">
            <div className="text-sm font-black leading-none" style={{ color: accent }}>{k.v}</div>
            <div className="text-[9px] text-gray-400 mt-0.5">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white/[0.04] border border-white/5 p-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-gray-400 uppercase tracking-wide">Semana</span>
          <span className="text-[9px] text-gray-400">4 / 7</span>
        </div>
        <div className="flex gap-1">
          {days.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className="w-full h-4 rounded"
                style={{ background: active.includes(i) ? accent : 'rgba(255,255,255,0.08)' }}
              />
              <span className="text-[8px] text-gray-400">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Hero tab panel — copy + visual + case card ──────────────────────────────

interface PanelProps {
  accent: string
  eyebrow: string
  title: string
  description: string
  chips: string[]
  ctaHref: string
  ctaLabel: string
  mockup: React.ReactNode
  caseEmoji: string
  caseTitle: string
  caseMetric: string
  caseFootnote: string
}

function HeroTabPanel({
  accent, eyebrow, title, description, chips, ctaHref, ctaLabel,
  mockup, caseEmoji, caseTitle, caseMetric, caseFootnote,
}: PanelProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.15fr_1fr] md:gap-6">
      {/* Left: copy */}
      <div className="flex flex-col gap-3.5">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ color: accent }}
        >
          • {eyebrow}
        </span>
        <h3 className="text-xl font-black leading-tight tracking-tight text-white sm:text-2xl">
          {title}
        </h3>
        <p className="text-[13px] leading-relaxed text-gray-300">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium text-gray-200"
              style={{ borderColor: `${accent}33`, background: `${accent}11` }}
            >
              {c}
            </span>
          ))}
        </div>
        <Link
          href={ctaHref}
          className="mt-1 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: accent }}
        >
          {ctaLabel} →
        </Link>
      </div>

      {/* Right: mockup + case card */}
      <div className="flex flex-col gap-3">
        {mockup}
        <div className="border-t border-white/5 pt-3">
          <div className="flex items-start gap-2">
            <span className="text-base leading-none" aria-hidden="true">{caseEmoji}</span>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold text-white">{caseTitle}</div>
              <div className="text-[10px] mt-0.5" style={{ color: accent }}>{caseMetric}</div>
              <div className="text-[9px] text-gray-400 mt-0.5">{caseFootnote}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Tab definitions ─────────────────────────────────────────────────────────

const heroTabs = [
  {
    id: 'intelligence',
    label: 'Intelligence',
    content: (
      <HeroTabPanel
        accent={ACCENT.intelligence}
        eyebrow="IA APLICADA"
        title="Inteligencia que atiende, vende y resuelve por ti."
        description="Agentes 24/7 que contestan WhatsApp, automatizan procesos y se integran a tu CRM. Construidos a medida — no licencias genéricas."
        chips={['Chatbots', 'Automatización', 'Integraciones', 'Academy SENCE']}
        ctaHref="/verticales/intelligence"
        ctaLabel="Ver Intelligence"
        mockup={<IntelligenceMockup />}
        caseEmoji="🏥"
        caseTitle="Clínica Las Condes"
        caseMetric="Bot médico · 87% resolución automática"
        caseFootnote="Operación 24/7 desde 2024"
      />
    ),
  },
  {
    id: 'media',
    label: 'Media',
    content: (
      <HeroTabPanel
        accent={ACCENT.media}
        eyebrow="PLAN DE MEDIOS"
        title="Pauta integrada en TV, radio, vía pública, DOOH y digital."
        description="Compramos y operamos tu mix completo. Negociamos directo con canales — sin intermediarios — y medimos lo que mueve el negocio."
        chips={['TV', 'Radio', 'Vía pública', 'DOOH', 'Programática']}
        ctaHref="/verticales/media"
        ctaLabel="Ver Media"
        mockup={<MediaMockup />}
        caseEmoji="📺"
        caseTitle="TNT Sports + Warner Bros"
        caseMetric="15+ años operando medios en Chile"
        caseFootnote="24h para ajustar pauta cuando el mercado cambia"
      />
    ),
  },
  {
    id: 'brand',
    label: 'Brand',
    content: (
      <HeroTabPanel
        accent={ACCENT.brand}
        eyebrow="ACTIVACIONES"
        title="Experiencias de marca que venden en terreno."
        description="Trade marketing, stands, BTL y eventos. Idea, diseño, producción y operación bajo un solo equipo. Sin subcontratar lo crítico."
        chips={['BTL', 'Stands', 'Trade marketing', 'Eventos', 'Sampling']}
        ctaHref="/verticales/brand"
        ctaLabel="Ver Brand"
        mockup={<BrandMockup />}
        caseEmoji="🎯"
        caseTitle="Activación retail Q2"
        caseMetric="+340% leads · 1.2K contactos"
        caseFootnote="6 locales · 8 hostess en Mall Plaza"
      />
    ),
  },
]

// ── Hero ─────────────────────────────────────────────────────────────────────

export function HeroV2() {
  return (
    <section
      className="min-h-screen pb-16 pt-28 lg:pt-32"
      style={{ background: 'var(--color-bg-landing)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div>
            <motion.h1
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
              className="text-5xl font-black leading-[1.02] tracking-tight text-text sm:text-6xl lg:text-7xl"
            >
              Operamos el{' '}
              <span className="relative inline-block">
                crecimiento
                <span
                  className="absolute bottom-0.5 left-0 w-full rounded-full"
                  style={{ height: '3px', background: 'var(--color-text)' }}
                />
              </span>{' '}
              de tu marca.
            </motion.h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
              Operamos tu mix de medios, IA y activaciones bajo un solo equipo.
              Resultados medibles desde el día 1.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/#cta"
                className="inline-flex items-center rounded-lg bg-text px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Hablemos
              </Link>
              <Link
                href="/#proceso"
                className="text-sm font-medium text-text-secondary transition-colors hover:text-text"
              >
                Ver cómo trabajamos →
              </Link>
            </div>

            {/* Social proof — client logos */}
            <div className="mt-12">
              <ClientLogosRow variant="compact" label="Confían en nosotros" />
            </div>
          </div>

          {/* Right: animated tabs */}
          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0, 0, 1] }}
            className="w-full"
          >
            <AnimatedTabs tabs={heroTabs} defaultTab="intelligence" autoRotateMs={5000} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
