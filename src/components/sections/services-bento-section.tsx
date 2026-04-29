// src/components/sections/services-bento-section.tsx
// Bento grid for the 3 Belgrano service verticals.
// Intelligence spans 2 columns on desktop (primary vertical).
// Each card: icon, tags, description, CTA link.
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { verticales } from '@/lib/content/verticales'
import { VerticalIcon } from '@/components/ui/vertical-icon'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

const easing = [0.25, 0.1, 0.25, 1] as const

function BentoCard({
  slug,
  name,
  description,
  icon,
  tags,
  featured,
}: {
  slug: string
  name: string
  description: string
  icon: string
  tags?: string[]
  featured?: boolean
}) {
  return (
    <Link href={`/${slug}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2, ease: easing }}
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg p-6 transition-all duration-200 group-hover:border-gray-300 group-hover:shadow-md ${
          featured ? 'sm:p-8' : ''
        }`}
      >
        {/* Dot pattern on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            backgroundImage:
              'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Icon + name */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-bg-section">
            <VerticalIcon name={icon} className="h-4 w-4 text-text" />
          </div>
          <span className={`font-black tracking-tight text-text ${featured ? 'text-xl' : 'text-lg'}`}>
            {name}
          </span>
        </div>

        {/* Description */}
        <p
          className={`relative mt-4 leading-relaxed text-text-secondary ${
            featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
          }`}
        >
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="relative mt-5 flex flex-wrap gap-2">
            {tags.slice(0, featured ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-border bg-bg-section px-2.5 py-1 text-xs font-medium text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="relative mt-auto pt-6">
          <span className="text-sm font-semibold text-text underline-offset-4 transition-all group-hover:underline">
            Ver vertical →
          </span>
        </div>
      </motion.div>
    </Link>
  )
}

export function ServicesBentoSection() {
  const intelligence = verticales.find((v) => v.slug === 'intelligence')
  const media = verticales.find((v) => v.slug === 'media')
  const brand = verticales.find((v) => v.slug === 'brand')

  if (!intelligence || !media || !brand) return null

  return (
    <section id="servicios" aria-labelledby="servicios-heading" className="bg-bg-section py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
              Verticales
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2
              id="servicios-heading"
              className="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl"
            >
              Todo lo que hacemos.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Tres verticales especializadas que trabajan juntas cuando el proyecto lo requiere.
            </p>
          </ScrollReveal>
        </div>

        {/* Bento grid */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Intelligence — featured, spans 2 cols on lg */}
            <div className="sm:col-span-2">
              <BentoCard
                slug={intelligence.slug}
                name={intelligence.name}
                description={intelligence.description}
                icon={intelligence.icon}
                tags={intelligence.tags}
                featured
              />
            </div>

            {/* Media */}
            <div>
              <BentoCard
                slug={media.slug}
                name={media.name}
                description={media.description}
                icon={media.icon}
                tags={media.tags}
              />
            </div>

            {/* Brand — full width on mobile, 1 col on lg */}
            <div className="sm:col-span-2 lg:col-span-1">
              <BentoCard
                slug={brand.slug}
                name={brand.name}
                description={brand.description}
                icon={brand.icon}
                tags={brand.tags}
              />
            </div>

            {/* Bottom CTA card */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-transparent p-8 text-center">
                <p className="text-base font-semibold text-text">
                  ¿No sabes cuál es el vertical correcto para ti?
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  Cuéntanos tu desafío y te orientamos sin costo.
                </p>
                <Link
                  href="/#cta"
                  className="mt-6 inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                >
                  Hablemos
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
