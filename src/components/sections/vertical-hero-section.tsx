// src/components/sections/vertical-hero-section.tsx
// Dark-background hero for vertical detail pages.
// Reuses inline SVG icon map (same 4 icons as VerticalCard).
// Server Component — no animations needed above the fold behavior handled by CSS.
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { Container } from '@/components/layout/container'
import type { Vertical } from '@/lib/content/verticales'

function VerticalPageIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    Monitor: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    Brain: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
        <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
        <path d="M6 18a4 4 0 0 1-1.967-.516" />
        <path d="M19.967 17.484A4 4 0 0 1 18 18" />
      </svg>
    ),
    Megaphone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
  }
  return <>{icons[name] ?? null}</>
}

interface VerticalHeroSectionProps {
  vertical: Vertical
}

export function VerticalHeroSection({ vertical }: VerticalHeroSectionProps) {
  return (
    <section aria-labelledby="vertical-hero-heading" className="bg-dark py-20 sm:py-24 lg:py-32">
      <Container>
        <ScrollReveal>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 text-bg/70">
            <VerticalPageIcon name={vertical.icon} />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h1 id="vertical-hero-heading" className="mt-8 text-5xl font-extrabold tracking-tight text-bg sm:text-6xl lg:text-7xl">
            {vertical.name}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-xl font-medium text-bg/60 sm:text-2xl">
            {vertical.tagline}
          </p>
        </ScrollReveal>
      </Container>
    </section>
  )
}
