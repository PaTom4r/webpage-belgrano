---
phase: 02-landing-page
plan: "04"
subsystem: sections
tags: [gsap, scroll-trigger, animated-counter, dark-section, server-component]
dependency_graph:
  requires:
    - 02-01 (animated-counter.tsx, scroll-reveal.tsx, gsap-config.ts)
  provides:
    - src/components/sections/how-it-works-section.tsx
    - src/components/sections/stats-section.tsx
  affects:
    - Landing page composition (02-05 will assemble all sections)
tech_stack:
  added: []
  patterns:
    - GSAP useGSAP() with gsap.matchMedia() for desktop/mobile split animations
    - ScrollTrigger pin+scrub for sequential step reveal
    - document.fonts.ready.then(ScrollTrigger.refresh) to fix pin offset after font load
    - Server Component shell with client AnimatedCounter islands
key_files:
  created:
    - src/components/sections/how-it-works-section.tsx
    - src/components/sections/stats-section.tsx
  modified: []
decisions:
  - Used gsap.matchMedia() with two conditions to cleanly separate desktop (pin+scrub) from mobile/reduced-motion (static) without any runtime branching
  - StatsSection kept as Server Component — AnimatedCounter provides its own 'use client' boundary, no duplication needed
metrics:
  duration_seconds: 127
  completed_date: "2026-04-01"
  tasks_completed: 2
  files_created: 2
  files_modified: 0
---

# Phase 02 Plan 04: HowItWorks + Stats Sections Summary

**One-liner:** GSAP pin+scrub HowItWorks section (3 steps reveal sequentially on scroll) and dark Stats section with 4 AnimatedCounter client islands (200+, 10x, 98%, $80M+).

## What Was Built

### Task 1: HowItWorks Section (commit: 6dd5af0)

`src/components/sections/how-it-works-section.tsx` — GSAP ScrollTrigger pin+scrub implementation:

- `useGSAP()` hook (not useEffect) for automatic cleanup on unmount
- `gsap.matchMedia()` with two exclusive conditions:
  - Desktop + no-preference: pins section, scrolls through 1500px budget, reveals step 2 and 3 with opacity+y animation on `scrub: 0.5`
  - Mobile or reduced-motion: sets all steps to opacity:1, y:0 immediately (static display)
- `document.fonts.ready.then(() => ScrollTrigger.refresh())` prevents pin starting at wrong offset after font load shifts layout
- All GSAP imported from `@/lib/gsap-config` — zero direct `gsap` imports
- ScrollReveal wrappers for section header (eyebrow + h2)
- 3 steps: Diagnóstico, Estrategia, Ejecución with card layout

### Task 2: Stats Section (commit: a7f7b8b)

`src/components/sections/stats-section.tsx` — Server Component with client islands:

- No `'use client'` directive — Server Component shell for zero JS overhead on static content
- `bg-dark` class (`#09090B` per CONTEXT.md locked decision) for visual contrast
- 4 AnimatedCounter instances rendered via `.map()`:
  - `+200` Empresas atendidas
  - `10x` ROI promedio
  - `98%` Satisfacción
  - `$80M+` Generados para clientes
- ScrollReveal staggered at `delay={i * 0.08}` for smooth grid entrance
- AnimatedCounter handles prefers-reduced-motion internally (no duplication in StatsSection)

## Verification Results

- TypeScript: 0 errors (`npx tsc --noEmit`)
- GSAP imports: only from `@/lib/gsap-config`, never direct `from 'gsap'`
- No `useEffect` in HowItWorksSection
- `ScrollTrigger.refresh()` present in `document.fonts.ready.then()` callback
- `gsap.matchMedia()` present with `min-width: 768px` breakpoint
- `bg-dark` present in StatsSection
- No `'use client'` in StatsSection

## Deviations from Plan

### Implementation Adjustment (non-breaking)

**Task 2 — AnimatedCounter count in grep:** The plan's done criteria expected `grep -c "AnimatedCounter" stats-section.tsx` to return 4, assuming one JSX element per stat written out manually. The implementation uses `.map()` over the `stats` array, which results in one JSX `<AnimatedCounter>` occurrence in source but 4 rendered instances at runtime. This is architecturally correct and produces the same result. The grep count of 3 (import line + comment + JSX) is expected for this pattern.

No architectural deviations. Plan executed as specified.

## Known Stubs

None — all 4 counter targets are real business data (200 empresas, 10x ROI, 98% satisfacción, $80M+ generados). Section header copy is production-ready. No placeholders.

## Self-Check

- [x] `src/components/sections/how-it-works-section.tsx` exists
- [x] `src/components/sections/stats-section.tsx` exists
- [x] Commit 6dd5af0 exists (HowItWorks)
- [x] Commit a7f7b8b exists (Stats)
- [x] TypeScript: 0 errors
- [x] All GSAP imports from `@/lib/gsap-config`

## Self-Check: PASSED
