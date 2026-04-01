// Home page — composes all 8 landing sections.
// Navbar and Footer are in layout.tsx (persistent across all pages).
import { HeroSection } from '@/components/sections/hero-section'
import { MarqueeSection } from '@/components/sections/marquee-section'
import { VerticalesSection } from '@/components/sections/verticales-section'
import { HowItWorksSection } from '@/components/sections/how-it-works-section'
import { StatsSection } from '@/components/sections/stats-section'
import { CtaSection } from '@/components/sections/cta-section'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <VerticalesSection />
      <HowItWorksSection />
      <StatsSection />
      <CtaSection />
    </main>
  )
}
