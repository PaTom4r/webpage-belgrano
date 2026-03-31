# Phase 1: Foundation - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning
**Mode:** Auto-generated (infrastructure phase — discuss skipped)

<domain>
## Phase Boundary

A working Next.js app with all design tokens, fonts, GSAP hydration fix, and layout shell in place so every subsequent phase can build without retrofitting.

Requirements: FOUND-01 through FOUND-06.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion — pure infrastructure phase. Use ROADMAP phase goal, success criteria, and research findings to guide decisions.

Key constraints from research:
- Next.js 16 with App Router, Turbopack default
- Tailwind CSS v4 with @theme inline in globals.css
- Geist Sans via next/font
- GSAP centralized config with useGSAP() hook
- metadataBase in root layout for OG resolution
- Mobile-first responsive breakpoints
- Motion package (framer-motion v12+) — use motion/react imports
- No Three.js, no Lenis, no next-seo

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code.

### Established Patterns
- Research recommends: Server Components by default, "use client" only at leaf nodes
- GSAP registration in shared lib/gsap-config.ts, not per-component
- Content as TypeScript data files in lib/content/

### Integration Points
- Root layout (app/layout.tsx) is the integration hub for fonts, metadata, providers
- globals.css holds all Tailwind v4 @theme tokens

</code_context>

<specifics>
## Specific Ideas

No specific requirements — infrastructure phase. Follow research STACK.md recommendations.

</specifics>

<deferred>
## Deferred Ideas

None — infrastructure phase.

</deferred>
