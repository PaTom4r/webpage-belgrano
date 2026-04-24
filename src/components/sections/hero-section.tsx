// src/components/sections/hero-section.tsx
// Cinematic hero: office bg (Santiago + Andes + BELGRANO en hormigón).
// Headline "BELGRANO GROUP" achicado y alineado a la derecha,
// posicionado sobre la zona de la cordillera. Min-h-[78vh] para respirar.
// El accordion horizontal se sacó — ahora el spotlight de verticales vive
// en <VerticalesReveal /> abajo, como sección scroll-driven pinned.
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const easing = [0.25, 0.1, 0.25, 1] as const

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: easing },
})

// LCP-safe: headline starts visible so Lighthouse can measure it immediately.
const headlineFade = {
  initial: { opacity: 1, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easing },
}

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="flex flex-col">
      {/* Zone 1 — Cinematic image full visible. Min-h-[78vh] for breathing room. */}
      <div className="relative isolate flex min-h-[78vh] flex-col justify-end overflow-hidden bg-dark pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32">
        {/* Background image: BELGRANO office + Santiago + Andes (no blur, full opacity) */}
        <Image
          src="/hero/office-belgrano-santiago.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />

        {/* Gradient overlay — clear on top (sky/mountains visible), dark at bottom (text contrast) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10"
        />

        {/* Grid texture overlay (radial masked, super sutil) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 70% at 70% 50%, black 30%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse 80% 70% at 70% 50%, black 30%, transparent 100%)',
          }}
        />

        {/* Content — alineado a la derecha sobre la cordillera (opción A) */}
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12" style={{ zIndex: 2 }}>
          <div className="ml-auto max-w-2xl text-right">
            {/* Headline achicado para no competir con BELGRANO en hormigón */}
            <motion.h1
              id="hero-heading"
              {...headlineFade}
              className="text-4xl font-black uppercase tracking-tighter text-white leading-[0.95] sm:text-5xl lg:text-6xl"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
            >
              BELGRANO GROUP
            </motion.h1>

            {/* Bajada — texto explicativo del grupo, blanco puro + textShadow doble para contraste sobre foto */}
            <motion.p
              {...fadeUp(0.1)}
              className="ml-auto mt-4 text-base font-medium text-white sm:text-lg lg:mt-6 lg:text-xl"
              style={{ textShadow: '0 2px 14px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.6)' }}
            >
              Belgrano Group: Media, Intelligence y Brand. Conectamos IA, medios y ejecución
              en terreno para impulsar resultados reales en cada punto de contacto.
            </motion.p>
          </div>
        </div>
      </div>

    </section>
  )
}
