# Phase 3: Vertical Pages - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

4 dedicated vertical detail pages (/verticales/bots, /verticales/dooh, /verticales/producciones, /verticales/academy) with outcome-oriented copy, proof metrics, FAQ, and CTA. Dynamic route with generateStaticParams(). All content from a single TypeScript data file.

Requirements: VERT-01 through VERT-07.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion. Key guidelines:
- Page structure: top-to-bottom conversion funnel (Hero → Description → Metrics → Client refs → FAQ → CTA)
- FAQ: accordion with expand/collapse animation
- Metrics: large numbers in grid, consistent with Stats section style
- CTA: reuse CTA component from landing with vertical-specific headline
- Content: extend existing verticales.ts with description, metrics, FAQ, clients per vertical
- Navigation: breadcrumb at top of page (Home > Servicios > [Vertical])
- Dynamic route: app/verticales/[slug]/page.tsx with generateStaticParams()
- Content source: research-verticales-v2.md has detailed copy for all 4 verticals (in trabajo/webpage-belgrano/)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- src/lib/content/verticales.ts — already has basic vertical data (icon, name, description, slug, metrics, clients)
- src/components/sections/cta-section.tsx — reusable CTA with dark bg
- src/components/animations/scroll-reveal.tsx — entrance animations
- src/components/layout/section.tsx — section wrapper with dark/light
- src/components/layout/container.tsx — responsive container

### Established Patterns
- Server Components by default, "use client" only for interaction (accordion)
- Content as TypeScript data files
- Framer Motion for entrances via ScrollReveal

### Integration Points
- Vertical cards on landing already link to /verticales/[slug]
- Navbar persists in layout.tsx (already wired)

</code_context>

<specifics>
## Specific Ideas

- Use content from research-verticales-v2.md (in the project root) for detailed vertical copy
- Each vertical needs 5-7 FAQ questions addressing common sales objections
- Producciones vertical has no client references yet — use description only

</specifics>

<deferred>
## Deferred Ideas

None — all vertical page features are in scope for this phase.

</deferred>
