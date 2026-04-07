// src/components/ui/vertical-mockups.tsx
// HTML/CSS mini-mockups for each Belgrano vertical, used in hero cards.
// Each mockup is purely decorative — aria-hidden.
'use client'

export function ChatMockup() {
  return (
    <div
      aria-hidden="true"
      className="w-full aspect-[4/3] bg-gray-900 border-b border-white/10 p-3 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
        <span className="text-[9px] font-semibold text-white tracking-tight">Belgrano · Online</span>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2 flex-1">
        {/* Incoming bubble */}
        <div className="max-w-[78%] rounded-lg rounded-tl-none bg-gray-800 px-2 py-1.5">
          <p className="text-[8px] text-gray-300 leading-tight">Hola, ¿en qué te puedo ayudar?</p>
        </div>

        {/* Outgoing bubble */}
        <div className="max-w-[70%] self-end rounded-lg rounded-tr-none bg-white px-2 py-1.5">
          <p className="text-[8px] text-gray-900 leading-tight">Te ayudo ya mismo</p>
        </div>

        {/* Typing indicator — always animated */}
        <div className="flex items-center gap-1 rounded-lg bg-gray-800 px-2 py-1.5 w-fit">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms] [animation-duration:900ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:180ms] [animation-duration:900ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:360ms] [animation-duration:900ms]" />
        </div>
      </div>
    </div>
  )
}

export function ScreenMockup() {
  return (
    <div
      aria-hidden="true"
      className="w-full aspect-[4/3] bg-gray-900 border-b border-white/10 flex items-center justify-center overflow-hidden p-3"
    >
      {/* Outer bezel */}
      <div className="w-full max-w-[82%] rounded-md border-2 border-gray-700 bg-gray-950 shadow-xl">
        {/* Screen face */}
        <div className="relative rounded-sm bg-black p-3 flex flex-col items-center justify-center min-h-[70px]">
          {/* LIVE badge */}
          <div className="absolute top-1.5 left-2 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 group-hover:animate-pulse" />
            <span className="text-[6px] font-bold text-white uppercase tracking-widest">Live</span>
          </div>

          {/* Content — rotates with opacity on hover */}
          <div className="text-center mt-2">
            <p className="text-[10px] font-black text-white uppercase tracking-[0.15em] leading-none">
              BELGRANO
            </p>
            <p className="text-[7px] text-gray-400 mt-1 tracking-wide transition-opacity duration-500 group-hover:opacity-60">
              IA media
            </p>
            <p className="text-[7px] text-white/0 group-hover:text-white/70 mt-0.5 tracking-wide transition-all duration-500">
              en vivo
            </p>
          </div>
        </div>

        {/* Stand shadow */}
        <div className="h-1.5 bg-gray-800 rounded-b-sm" />
      </div>
    </div>
  )
}

export function VideoMockup() {
  return (
    <div
      aria-hidden="true"
      className="w-full aspect-[4/3] border-b border-white/10 overflow-hidden"
    >
      <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-950 flex flex-col">
        {/* HD badge */}
        <div className="absolute top-2 right-2 rounded bg-white/20 px-1.5 py-0.5">
          <span className="text-[7px] font-bold text-white uppercase tracking-wide">HD</span>
        </div>

        {/* Play button */}
        <div className="flex-1 flex items-center justify-center">
          <div className="h-9 w-9 rounded-full border-2 border-white/50 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_16px_rgba(255,255,255,0.35)]">
            <span className="text-white text-xs ml-0.5 leading-none">▶</span>
          </div>
        </div>

        {/* Scrubber */}
        <div className="px-3 pb-3 space-y-1">
          <div className="relative w-full h-1 rounded-full bg-white/20">
            <div className="h-full w-[28%] rounded-full bg-white transition-all duration-700 group-hover:w-[42%]" />
            {/* Scrubber dot */}
            <div className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white shadow transition-all duration-700 group-hover:left-[42%] left-[28%] -translate-x-1/2" />
          </div>
          <div className="flex justify-between">
            <span className="text-[7px] text-white/50">0:08</span>
            <span className="text-[7px] text-white/50">0:30</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SlideMockup() {
  return (
    <div
      aria-hidden="true"
      className="w-full aspect-[4/3] bg-gray-900 border-b border-white/10 p-3 overflow-hidden"
    >
      <div className="w-full h-full bg-gray-950 rounded border border-white/10 px-3 py-2.5 flex flex-col">
        {/* Module counter */}
        <p className="text-[7px] font-semibold text-gray-500 uppercase tracking-wider">
          Módulo 03 / 12
        </p>

        {/* Slide title */}
        <h4 className="mt-1.5 text-[10px] font-black text-white leading-tight">
          IA práctica para tu equipo
        </h4>

        {/* Bullets */}
        <ul className="mt-2 flex-1 space-y-1">
          <li className="flex items-center gap-1.5">
            <span className="text-[8px] text-green-400 leading-none">✓</span>
            <span className="text-[7px] text-gray-400 leading-none">Casos reales</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-[8px] text-green-400 leading-none">✓</span>
            <span className="text-[7px] text-gray-400 leading-none">Hands-on</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-[8px] text-green-400 leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">✓</span>
            <span className="text-[7px] text-gray-400 leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">Certificado</span>
          </li>
        </ul>

        {/* Progress bar */}
        <div className="mt-auto pt-2">
          <div className="w-full h-1 rounded-full bg-gray-800">
            <div className="h-full w-1/4 rounded-full bg-white transition-all duration-700 group-hover:w-1/3" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function VerticalMockup({ slug }: { slug: string }) {
  switch (slug) {
    case 'bots':         return <ChatMockup />
    case 'dooh':         return <ScreenMockup />
    case 'producciones': return <VideoMockup />
    case 'academy':      return <SlideMockup />
    default:             return null
  }
}
