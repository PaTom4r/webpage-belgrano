# Phase 4: About Page - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

/nosotros page with company narrative, values/differentiators, and team positioning. Reuses established layout patterns (Section, Container, ScrollReveal).

Requirements: ABOUT-01, ABOUT-02, ABOUT-03.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices at Claude's discretion:
- Page layout and section structure
- Company narrative content (Belgrano = AI-native Chilean agency, integrated services across 4 verticals)
- Values section (key differentiator: only agency that builds the bot, installs the screens, produces the content, AND trains the team)
- Team positioning (how the team works, expertise areas — no individual photos needed)
- Reuse Section, Container, ScrollReveal from existing components
- Breadcrumb at top (Home > Nosotros)

Key brand context from CLAUDE.md:
- Grupo Belgrano: Marketing + IA + Estrategia de negocios
- Tagline: "Tu negocio. Nuestra inteligencia."
- Located in Santiago, Chile
- Tone: Directo, seguro, calido. No corporativo ni frio.
- AI-native differentiator

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- src/components/layout/section.tsx, container.tsx
- src/components/animations/scroll-reveal.tsx
- src/components/ui/breadcrumb.tsx (created in Phase 3)
- Established pattern: Server Components by default

### Integration Points
- app/nosotros/page.tsx — new route
- Navbar already has "Nosotros" link (from site.ts navLinks)

</code_context>

<specifics>
## Specific Ideas

None beyond brand context.

</specifics>

<deferred>
## Deferred Ideas

None.

</deferred>
