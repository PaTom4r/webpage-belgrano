'use client'
// FeaturesGridSection — "Lo que operamos" bento layout.
// Intelligence card is large (2-col × 2-row), Media + Brand are standard, Academy is a footer strip.
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Monitor, Megaphone, GraduationCap, Stethoscope, Shield, Clock } from 'lucide-react'
import { verticales } from '@/lib/content/verticales'

const intel  = verticales.find((v) => v.slug === 'intelligence')!
const media  = verticales.find((v) => v.slug === 'media')!
const brand  = verticales.find((v) => v.slug === 'brand')!

// ── Small card (Media / Brand) ────────────────────────────────────────────────
function SmallCard({ v, icon, ctaLabel }: { v: typeof media; icon: React.ReactNode; ctaLabel: string }) {
  const accent = v.accentColor ?? '#ffffff'
  const metric = v.metrics?.[0]
  return (
    <motion.div
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.25, 0, 0, 1] }}
      className="flex flex-col justify-between rounded-2xl border p-6 h-full"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-soft)' }}
    >
      <div>
        {/* Accent dot + icon */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}18`, border: `1px solid ${accent}33` }}>
            <span style={{ color: accent }}>{icon}</span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
            {v.slug}
          </span>
        </div>
        <h3 className="text-lg font-black leading-tight tracking-tight text-text">{v.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{v.tagline}</p>
      </div>

      <div className="mt-5 space-y-3">
        {metric && (
          <div className="rounded-xl p-3" style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
            <div className="text-xl font-black leading-none" style={{ color: accent }}>{metric.value}</div>
            <div className="mt-0.5 text-xs text-text-secondary">{metric.label}</div>
          </div>
        )}
        <Link
          href={`/verticales/${v.slug}`}
          className="text-sm font-medium transition-colors hover:opacity-70"
          style={{ color: accent }}
        >
          {ctaLabel} →
        </Link>
      </div>
    </motion.div>
  )
}

// ── Academy small card ────────────────────────────────────────────────────────
function AcademyCard() {
  return (
    <motion.div
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.25, 0, 0, 1] }}
      className="flex flex-col justify-between rounded-2xl border p-6 h-full"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-soft)' }}
    >
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-text">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-text">
            academy
          </span>
        </div>
        <h3 className="text-lg font-black leading-tight tracking-tight text-text">Belgrano Academy</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Formación certificada SENCE para que tu equipo opere IA de verdad en su trabajo diario.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <div className="rounded-xl p-3 bg-gray-50 border border-gray-200">
          <div className="text-xl font-black leading-none text-text">SENCE</div>
          <div className="mt-0.5 text-xs text-text-secondary">certificación oficial</div>
        </div>
        <Link
          href="/verticales/intelligence#academy"
          className="text-sm font-medium text-text transition-opacity hover:opacity-60"
        >
          Ver Academy →
        </Link>
      </div>
    </motion.div>
  )
}

// ── Large Intelligence card ───────────────────────────────────────────────────
function IntelCard() {
  const accent = intel.accentColor ?? '#7AA2FF'
  const metric = intel.metrics?.[0]
  return (
    <motion.div
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
      className="flex h-full flex-col justify-between rounded-2xl border p-7"
      style={{ background: '#0f1015', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      {/* Header */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}18`, border: `1px solid ${accent}33` }}>
            <Brain className="h-4 w-4" style={{ color: accent }} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
            intelligence
          </span>
        </div>
        <h3 className="text-2xl font-black leading-tight tracking-tight text-white">{intel.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">{intel.tagline}</p>
      </div>

      {/* Use cases list — real-world Intelligence deployments */}
      <div className="my-6 rounded-xl p-4 space-y-2.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="text-[10px] font-medium uppercase tracking-wide text-gray-400 mb-2">
          Casos en producción
        </div>
        {[
          { Icon: Stethoscope, title: 'Bot médico CLC',     metric: '87% resolución' },
          { Icon: Shield,      title: 'Onboarding Seguros', metric: '−60% tiempo' },
          { Icon: Clock,       title: 'Triage 24/7',         metric: '3 agentes activos' },
        ].map(({ Icon, title, metric }) => (
          <div key={title} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.03] px-3 py-2 border border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: `${accent}18`, border: `1px solid ${accent}33` }}>
                <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
              </div>
              <span className="text-[12px] font-medium text-gray-200">{title}</span>
            </div>
            <span className="text-[10px] font-semibold tabular-nums" style={{ color: accent }}>{metric}</span>
          </div>
        ))}
      </div>

      {/* Bottom: metric from verticales + link */}
      <div className="space-y-3">
        {metric && (
          <div className="rounded-xl p-3" style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
            <div className="text-lg font-black leading-none" style={{ color: accent }}>{metric.value}</div>
            <div className="mt-0.5 text-xs text-gray-400">{metric.label}</div>
          </div>
        )}
        <div className="flex items-center gap-4">
          <Link href="/verticales/intelligence" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: accent }}>
            Ver agentes →
          </Link>
          <Link href="/verticales/intelligence#academy" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-300">
            Academy →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function FeaturesGridSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 max-w-xl"
        >
          <h2 className="text-3xl font-black leading-tight tracking-tight text-text lg:text-4xl">
            Lo que operamos.
          </h2>
          <p className="mt-3 text-base text-text-secondary">
            Tres verticales integradas + formación SENCE. Un solo operador del crecimiento de tu marca.
          </p>
        </motion.div>

        {/* Bento grid: Intel (1 col × 2 rows) + Media / Brand / Academy stacked right */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-3">
          <div className="lg:col-span-2 lg:row-span-3">
            <IntelCard />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <SmallCard v={media} icon={<Monitor className="h-4 w-4" />} ctaLabel="Ver plan de medios" />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <SmallCard v={brand} icon={<Megaphone className="h-4 w-4" />} ctaLabel="Ver activaciones" />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <AcademyCard />
          </div>
        </div>
      </div>
    </section>
  )
}
