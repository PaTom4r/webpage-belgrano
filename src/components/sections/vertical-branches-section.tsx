// src/components/sections/vertical-branches-section.tsx
// Renders the internal branches of a vertical (e.g. Intelligence → AI Solutions + Academy).
// Light bg section with 2-column grid of rich branch cards.
// Server Component.
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { Container } from '@/components/layout/container'
import type { VerticalBranch } from '@/lib/content/verticales'

interface VerticalBranchesSectionProps {
  branches: VerticalBranch[]
}

export function VerticalBranchesSection({ branches }: VerticalBranchesSectionProps) {
  if (!branches || branches.length === 0) return null

  return (
    <section className="bg-bg-section py-16 sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Dos ramas, un solo tronco
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Cómo trabaja por dentro
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {branches.map((branch, i) => (
            <ScrollReveal key={branch.name} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-bg p-8 shadow-sm">
                {/* Branch label */}
                <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  {branch.name}
                </p>

                {/* Headline */}
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
                  {branch.headline}
                </h3>

                {/* Description */}
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  {branch.description}
                </p>

                {/* Features */}
                {branch.features && branch.features.length > 0 && (
                  <ul className="mt-6 space-y-2.5">
                    {branch.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-text">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-text text-[11px] font-bold text-bg"
                        >
                          ✓
                        </span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tags */}
                {branch.tags && branch.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {branch.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-border bg-bg-section px-3 py-1 text-xs font-medium text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
