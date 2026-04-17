// src/components/ui/hero-mockups-v2.tsx
// Rich mini-mockups for the Hero cards (3D tilt + spotlight).
// Each shows a concrete product demo for the vertical.
// Pure HTML/CSS — aria-hidden, no images, no SVGs.
'use client'

import { verticales } from '@/lib/content/verticales'

const ACCENT = {
  intelligence: verticales.find((v) => v.slug === 'intelligence')?.accentColor ?? '#A855F7',
  media:        verticales.find((v) => v.slug === 'media')?.accentColor        ?? '#0EA5E9',
  brand:        verticales.find((v) => v.slug === 'brand')?.accentColor        ?? '#F59E0B',
}

// ─── Intelligence ─────────────────────────────────────────────────────────────
// Shows: active agents badge, WhatsApp chat exchange, resolution rate card
export function IntelligenceMockup() {
  const accent = ACCENT.intelligence

  return (
    <div
      aria-hidden="true"
      className="w-full bg-gray-950 border-b border-white/10 p-4 flex flex-col gap-3 overflow-hidden"
    >
      {/* Badge row */}
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
          style={{ background: `${accent}20`, color: accent }}
        >
          {/* Pulsing dot */}
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: '#4ade80' }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          </span>
          3 agentes activos
        </span>
        <span className="text-[9px] font-medium text-gray-500 uppercase tracking-widest ml-auto">
          Intelligence
        </span>
      </div>

      {/* WhatsApp-style chat */}
      <div className="flex flex-col gap-2">
        {/* User message — right aligned */}
        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-[#25d366]/15 border border-[#25d366]/20 px-3 py-1.5">
            <p className="text-[11px] text-gray-200 leading-snug">
              ¿Tienen hora disponible mañana?
            </p>
          </div>
        </div>
        {/* Bot message — left aligned */}
        <div className="flex justify-start gap-2">
          <div
            className="h-5 w-5 flex-shrink-0 rounded-full flex items-center justify-center mt-0.5 text-[9px] font-black text-white"
            style={{ background: accent }}
          >
            B
          </div>
          <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-white/8 border border-white/10 px-3 py-1.5">
            <p className="text-[11px] text-gray-200 leading-snug">
              Sí, 10:30 con la Dra. Pérez ✓
            </p>
          </div>
        </div>
      </div>

      {/* Resolution rate card */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">
            Resolución automática
          </p>
          <p className="text-xl font-black tabular-nums" style={{ color: accent }}>
            87%
          </p>
        </div>
        {/* Mini bar chart */}
        <div className="flex items-end gap-0.5 h-8 flex-shrink-0">
          {[55, 70, 60, 82, 87].map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-t-sm transition-all duration-700"
              style={{
                height: `${h}%`,
                background: i === 4 ? accent : `${accent}30`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Media ────────────────────────────────────────────────────────────────────
// Shows: reach headline + Q2 badge, channel bars, 3 KPIs
export function MediaMockup() {
  const accent = ACCENT.media
  const channels = [
    { label: 'TV',     pct: 45 },
    { label: 'DOOH',   pct: 25 },
    { label: 'Digital',pct: 20 },
    { label: 'Radio',  pct: 10 },
  ]
  const kpis = [
    { label: 'Freq', value: '3.2x' },
    { label: 'GRPs', value: '420' },
    { label: 'CPM',  value: '$4.8k' },
  ]

  return (
    <div
      aria-hidden="true"
      className="w-full bg-gray-950 border-b border-white/10 p-4 flex flex-col gap-3 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">
            Alcance proyectado
          </p>
          <p className="text-lg font-black text-white tabular-nums leading-tight">
            2.3M<span className="text-gray-400 text-[11px] font-semibold">/sem</span>
          </p>
        </div>
        <span
          className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold mt-0.5 flex-shrink-0"
          style={{ background: `${accent}20`, color: accent }}
        >
          Q2 2026
        </span>
      </div>

      {/* Channel bars */}
      <div className="flex flex-col gap-1.5">
        {channels.map((c) => (
          <div key={c.label} className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-gray-400 w-12 flex-shrink-0">
              {c.label}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${c.pct}%`, background: accent }}
              />
            </div>
            <span className="text-[9px] font-semibold text-gray-500 w-7 text-right flex-shrink-0">
              {c.pct}%
            </span>
          </div>
        ))}
      </div>

      {/* KPIs row */}
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center"
          >
            <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">
              {k.label}
            </p>
            <p className="text-[13px] font-black tabular-nums" style={{ color: accent }}>
              {k.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Brand ────────────────────────────────────────────────────────────────────
// Shows: activation title + "En terreno" badge, 3 KPIs, week visual L-D
export function BrandMockup() {
  const accent = ACCENT.brand
  const kpis = [
    { label: 'Leads',      value: '+340%' },
    { label: 'Contactos',  value: '1.2k' },
    { label: 'NPS',        value: '94' },
  ]
  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
  const activeDays = new Set(['L', 'M', 'X', 'J', 'V'])

  return (
    <div
      aria-hidden="true"
      className="w-full bg-gray-950 border-b border-white/10 p-4 flex flex-col gap-3 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">
            Activación
          </p>
          <p className="text-[13px] font-black text-white leading-tight">
            Retail Q2
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold mt-0.5 flex-shrink-0"
          style={{ background: `${accent}20`, color: accent }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
            style={{ background: accent }}
          />
          En terreno
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center"
          >
            <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest truncate">
              {k.label}
            </p>
            <p className="text-[13px] font-black tabular-nums" style={{ color: accent }}>
              {k.value}
            </p>
          </div>
        ))}
      </div>

      {/* Week visual */}
      <div className="flex items-center justify-between gap-1">
        {days.map((d) => {
          const active = activeDays.has(d)
          return (
            <div key={d} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[9px] font-semibold" style={{ color: active ? accent : '#4b5563' }}>
                {d}
              </span>
              <div
                className="h-6 w-full rounded-sm"
                style={{
                  background: active ? `${accent}30` : '#1f2937',
                  borderBottom: active ? `2px solid ${accent}` : '2px solid transparent',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
