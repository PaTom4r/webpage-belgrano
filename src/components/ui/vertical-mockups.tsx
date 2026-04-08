// src/components/ui/vertical-mockups.tsx
// HTML/CSS mini-mockups for each Belgrano vertical, used in hero cards.
// Each mockup is purely decorative — aria-hidden.
'use client'

export function MediaMockup() {
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
      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
        <span className="text-[11px] font-semibold text-white tracking-tight">Media Planning</span>
        <span className="text-[9px] text-gray-500 uppercase tracking-widest">Q2</span>
      </div>

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
  return (
    <div
      aria-hidden="true"
      className="w-full aspect-[2/1] bg-gray-900 border-b border-white/10 p-3 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        <span className="text-[11px] font-semibold text-white tracking-tight">Belgrano Intelligence</span>
      </div>

      {/* Diagram: central AI Engine + 2 branches */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2 relative">
        {/* Central node */}
        <div className="rounded-md border border-white/30 bg-white/10 px-3 py-1.5 relative z-10">
          <p className="text-[10px] font-bold text-white tracking-wide">AI Engine</p>
        </div>

        {/* Connector lines */}
        <div className="relative w-full h-3">
          <div className="absolute left-1/2 top-0 h-3 w-px bg-white/30" />
          <div className="absolute left-1/4 top-3 right-1/4 h-px bg-white/30" />
          <div className="absolute left-1/4 top-3 h-2 w-px bg-white/30" />
          <div className="absolute right-1/4 top-3 h-2 w-px bg-white/30" />
        </div>

        {/* Two branches */}
        <div className="flex items-center justify-between w-full px-1 gap-2">
          <div className="flex-1 rounded-md border border-white/15 bg-gray-950 px-2 py-1 text-center">
            <p className="text-[9px] font-semibold text-white leading-tight">AI Solutions</p>
          </div>
          <div className="flex-1 rounded-md border border-white/15 bg-gray-950 px-2 py-1 text-center">
            <p className="text-[9px] font-semibold text-white leading-tight">Academy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BrandMockup() {
  return (
    <div
      aria-hidden="true"
      className="w-full aspect-[2/1] bg-gray-900 border-b border-white/10 p-3 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
        <span className="text-[11px] font-semibold text-white tracking-tight">Brand Activation</span>
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
      </div>

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

export function VerticalMockup({ slug }: { slug: string }) {
  switch (slug) {
    case 'media':        return <MediaMockup />
    case 'intelligence': return <IntelligenceMockup />
    case 'brand':        return <BrandMockup />
    default:             return null
  }
}
