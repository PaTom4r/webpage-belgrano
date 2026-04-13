// src/components/ui/vertical-mockups.tsx
// HTML/CSS mini-mockups for each Belgrano vertical, used in hero cards.
// Each mockup is purely decorative — aria-hidden.
'use client'

import { VerticalIcon } from '@/components/ui/vertical-icon'

export function MediaMockup({ hideHeader }: { hideHeader?: boolean }) {
  const channels = [
    { label: 'TV', share: 35 },
    { label: 'DOOH', share: 25 },
    { label: 'Radio', share: 15 },
    { label: 'OOH', share: 15 },
    { label: 'Digital', share: 10 },
  ]

  return (
    <div
      aria-hidden="true"
      className="w-full aspect-[2/1] bg-gray-900 border-b border-white/10 p-3 flex flex-col overflow-hidden"
    >
      {/* Header */}
      {!hideHeader && (
        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
          <div className="flex items-center gap-1.5">
            <VerticalIcon name="Monitor" className="h-3 w-3 text-white" />
            <span className="flex items-baseline gap-1">
              <span className="text-[10px] font-medium text-gray-400">Belgrano</span>
              <span className="text-sm font-extrabold text-white tracking-tight">Media</span>
            </span>
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">Planificación de medios</span>
        </div>
      )}

      {/* Channel bars */}
      <div className="flex flex-col gap-1.5 flex-1 justify-center">
        {channels.map((c) => (
          <div key={c.label} className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-gray-400 w-10 flex-shrink-0">
              {c.label}
            </span>
            <div className="flex-1 h-2 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-700 group-hover:bg-white"
                style={{ width: `${c.share * 2}%` }}
              />
            </div>
            <span className="text-[9px] font-semibold text-gray-500 w-7 text-right">
              {c.share}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function IntelligenceMockup() {
  const courses = [
    { name: 'IA para ventas', pct: 87 },
    { name: 'Copilot 365', pct: 64 },
    { name: 'n8n avanzado', pct: 41 },
  ]

  return (
    <div
      aria-hidden="true"
      className="w-full h-[220px] md:h-[260px] bg-gray-900 border-b border-white/10 p-3 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <VerticalIcon name="Brain" className="h-3 w-3 text-white" />
          <span className="flex items-baseline gap-1">
            <span className="text-[10px] font-medium text-gray-400">Belgrano</span>
            <span className="text-sm font-extrabold text-white tracking-tight">Intelligence</span>
          </span>
        </div>
        <span className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">IA + Academy</span>
      </div>

      {/* Body — two-column split */}
      <div className="flex flex-1 gap-3 overflow-hidden min-h-0">
        {/* Left column — AI Solutions */}
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest flex-shrink-0">
            AI Solutions
          </span>
          {/* KPI tiles */}
          <div className="flex flex-col gap-1.5 flex-1 justify-center">
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-2 py-1.5">
              <span className="text-[10px] text-gray-400">Agentes activos</span>
              <span className="text-[13px] font-black text-white tabular-nums">12</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-2 py-1.5">
              <span className="text-[10px] text-gray-400">Tareas / día</span>
              <span className="text-[13px] font-black text-white tabular-nums">4.2k</span>
            </div>
            <div className="flex flex-col gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Precisión</span>
                <span className="text-[13px] font-black text-white tabular-nums">94%</span>
              </div>
              <div className="h-1 w-full rounded-full bg-gray-800 overflow-hidden">
                <div className="h-full rounded-full bg-white transition-all duration-700 w-[40%] group-hover:w-[94%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-white/10 flex-shrink-0" />

        {/* Right column — Academy */}
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest flex-shrink-0">
            Academy
          </span>
          <div className="flex flex-col gap-2 flex-1 justify-center">
            {courses.map((c) => (
              <div key={c.name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-300 truncate pr-1">{c.name}</span>
                  <span className="text-[9px] font-semibold text-gray-500 flex-shrink-0">{c.pct}%</span>
                </div>
                <div className="h-1 w-full rounded-full bg-gray-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white/70 transition-all duration-700"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function BrandMockup({ hideHeader }: { hideHeader?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="w-full aspect-[2/1] bg-gray-900 border-b border-white/10 p-3 flex flex-col overflow-hidden"
    >
      {/* Header */}
      {!hideHeader && (
        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
          <div className="flex items-center gap-1.5">
            <VerticalIcon name="Megaphone" className="h-3 w-3 text-white" />
            <span className="flex items-baseline gap-1">
              <span className="text-[10px] font-medium text-gray-400">Belgrano</span>
              <span className="text-sm font-extrabold text-white tracking-tight">Brand</span>
            </span>
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">Trade marketing</span>
        </div>
      )}

      {/* Stand scene */}
      <div className="flex-1 flex flex-col items-center justify-end relative">
        {/* Stand / screen */}
        <div className="w-[70%] rounded-t-md border border-white/20 bg-gray-950 p-2 flex flex-col items-center">
          <p className="text-[10px] font-black text-white uppercase tracking-[0.15em] leading-none">
            BELGRANO
          </p>
          <div className="mt-1.5 h-4 w-full rounded-sm bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
            <div className="h-1 w-1/2 rounded-full bg-white/50 transition-all duration-700 group-hover:w-3/4" />
          </div>
        </div>

        {/* Base */}
        <div className="w-[80%] h-1 bg-gray-800 rounded-b-sm" />

        {/* Audience silhouettes */}
        <div className="mt-2 flex items-end justify-center gap-1.5 w-full">
          <div className="h-3 w-2 rounded-t-full bg-gray-700" />
          <div className="h-4 w-2 rounded-t-full bg-gray-600" />
          <div className="h-3.5 w-2 rounded-t-full bg-gray-700" />
          <div className="h-4 w-2 rounded-t-full bg-gray-600" />
          <div className="h-3 w-2 rounded-t-full bg-gray-700" />
        </div>
      </div>
    </div>
  )
}

export function VerticalMockup({ slug, hideHeader }: { slug: string; hideHeader?: boolean }) {
  switch (slug) {
    case 'media':        return <MediaMockup hideHeader={hideHeader} />
    case 'intelligence': return <IntelligenceMockup />
    case 'brand':        return <BrandMockup hideHeader={hideHeader} />
    default:             return null
  }
}
