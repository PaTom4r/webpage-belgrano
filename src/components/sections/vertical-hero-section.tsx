// src/components/sections/vertical-hero-section.tsx
// Dark-background hero for vertical detail pages.
// Reuses inline SVG icon map (same 4 icons as VerticalCard).
// Server Component — no animations needed above the fold behavior handled by CSS.
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { Container } from '@/components/layout/container'
import type { Vertical } from '@/lib/content/verticales'

function VerticalPageIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    MessageCircle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    Monitor: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    Film: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /><line x1="17" y1="17" x2="22" y2="17" />
      </svg>
    ),
    GraduationCap: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
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
