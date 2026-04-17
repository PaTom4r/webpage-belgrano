// src/components/sections/marquee-section.tsx
// Infinite logo marquee with Framer Motion + progressive edge blur.
// Logos in grayscale, full color on hover. Duplicated for seamless loop.
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const logos = [
  { id: 'clc', name: 'Clínica Las Condes', src: '/logos/clc.svg', width: 190, height: 45 },
  { id: 'seguros-clc', name: 'Seguros CLC', src: '/logos/seguros-clc.svg', width: 155, height: 30 },
  { id: 'tnt-sports', name: 'TNT Sports', src: '/logos/tnt-sports.svg', width: 130, height: 40 },
  { id: 'warner-bros', name: 'Warner Bros.', src: '/logos/warner-bros.svg', width: 50, height: 46 },
  { id: 'hbo', name: 'HBO', src: '/logos/hbo.svg', width: 100, height: 40 },
  { id: 'point-cola', name: 'Point Cola', src: '/logos/point-cola.png', width: 120, height: 40 },
]

// Triplicar para asegurar loop sin saltos visibles
const allLogos = [...logos, ...logos, ...logos]

export function MarqueeSection() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-bg py-10">
      {/* Edge fade — left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent sm:w-32"
      />
      {/* Edge fade — right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent sm:w-32"
      />

      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-text-secondary">
        Empresas que confían en nosotros
      </p>

      {/* Marquee track */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex flex-shrink-0 items-center gap-16 px-8"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex-shrink-0 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                priority={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
