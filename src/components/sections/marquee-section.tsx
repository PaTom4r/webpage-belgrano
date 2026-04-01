// src/components/sections/marquee-section.tsx
// Client logo strip with infinite CSS scroll animation.
// Array duplicated for seamless loop — keys use id+index to avoid collision.
// Server Component (no animations require JS — CSS only).
import Image from 'next/image'

const logos = [
  { id: 'clc', name: 'Clínica Las Condes', src: '/logos/clc.svg', width: 190, height: 45 },
  { id: 'seguros-clc', name: 'Seguros CLC', src: '/logos/seguros-clc.svg', width: 155, height: 30 },
  { id: 'tnt-sports', name: 'TNT Sports', src: '/logos/tnt-sports.svg', width: 130, height: 40 },
  { id: 'warner-bros', name: 'Warner Bros.', src: '/logos/warner-bros.svg', width: 50, height: 46 },
  { id: 'hbo', name: 'HBO', src: '/logos/hbo.svg', width: 100, height: 40 },
  { id: 'point-cola', name: 'Point Cola', src: '/logos/point-cola.png', width: 120, height: 40 },
]

// Duplicate for seamless infinite loop
const allLogos = [...logos, ...logos]

export function MarqueeSection() {
  return (
    <div className="overflow-hidden border-y border-border bg-bg-section py-10">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-text-secondary">
        Empresas que confían en nosotros
      </p>
      <div className="flex w-max marquee-track items-center gap-16 px-8">
        {allLogos.map((logo, i) => (
          <div key={`${logo.id}-${i}`} className="flex-shrink-0 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              priority={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
