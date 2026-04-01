---
phase: 02-landing-page
plan: 01
subsystem: foundation-content-animations
tags: [content, animations, framer-motion, gsap, layout]
dependency_graph:
  requires: [01-foundation]
  provides: [content-data, animation-primitives, global-motion-config]
  affects: [02-02, 02-03, 02-04, 02-05]
tech_stack:
  added: [react-hook-form@7.x, zod@4.x, "@hookform/resolvers@5.x"]
  patterns: [framer-motion whileInView, GSAP matchMedia, thin client-boundary pattern]
key_files:
  created:
    - src/lib/content/verticales.ts
    - src/lib/content/site.ts
    - src/components/animations/scroll-reveal.tsx
    - src/components/animations/animated-counter.tsx
    - src/components/client-providers.tsx
  modified:
    - src/app/layout.tsx
    - package.json
    - package-lock.json
decisions:
  - "Import from framer-motion (not motion/react) — motion package not installed, framer-motion v12 is the installed package"
  - "ClientProviders thin wrapper keeps layout.tsx as Server Component while enabling MotionConfig client context"
  - "Used --legacy-peer-deps for npm install due to pre-existing eslint version conflict in devDependencies"
metrics:
  duration: 13 minutes
  completed: "2026-04-01"
  tasks: 3
  files: 8
---

# Phase 02 Plan 01: Foundation Dependencies and Animation Primitives Summary

Content data files, form dependencies, and animation primitives installed — the building blocks for all subsequent landing page sections.

## What Was Built

### Task 1: Dependencies + Content Data Files (commit 22e10cb)
- Installed `react-hook-form@^7.72.0`, `zod@^4.3.6`, `@hookform/resolvers@^5.2.2`
- Created `src/lib/content/verticales.ts` — exports `Vertical` interface and `verticales` array with 4 items (bots, dooh, producciones, academy)
- Created `src/lib/content/site.ts` — exports `siteConfig`, `navLinks` (4 items), `footerData`

### Task 2: Animation Primitives (commit c561974)
- Created `src/components/animations/scroll-reveal.tsx` — Framer Motion `whileInView` wrapper for section entrances; `'use client'`
- Created `src/components/animations/animated-counter.tsx` — GSAP counter with `ScrollTrigger`; uses `gsap.matchMedia()` for `prefers-reduced-motion`; imports GSAP from `@/lib/gsap-config` exclusively

### Task 3: Global Reduced-Motion Config (commit 60d6639)
- Created `src/components/client-providers.tsx` — thin `'use client'` wrapper with `MotionConfig reducedMotion="user"`
- Updated `src/app/layout.tsx` to wrap children in `ClientProviders`; layout remains a Server Component (metadata export preserved)
- GSAP hydration fix (`borderTopStyle: 'solid'`) preserved on body element

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Used `framer-motion` instead of `motion/react`**
- **Found during:** Task 2 (TypeScript compile error)
- **Issue:** Plan specified `import from 'motion/react'` but the standalone `motion` package is not installed. The project uses `framer-motion@12.38.0` which is the same underlying library.
- **Fix:** Changed all `motion/react` imports to `framer-motion` in `scroll-reveal.tsx`, `client-providers.tsx`. Same API, same behavior — `framer-motion` v12 is effectively the `motion` library under its old name.
- **Files modified:** `src/components/animations/scroll-reveal.tsx`, `src/components/client-providers.tsx`
- **Commits:** c561974, 60d6639

**2. [Rule 3 - Blocking] `--legacy-peer-deps` for npm install**
- **Found during:** Task 1 (npm install error)
- **Issue:** Pre-existing conflict between `@eslint/js@10.0.1` (requires `eslint@^10`) and `eslint@9.39.4` in devDependencies caused ERESOLVE.
- **Fix:** Used `npm install --legacy-peer-deps`. This is the correct approach for pre-existing peer conflicts that don't affect the production dependencies being added.
- **Impact:** None on runtime; ESLint version conflict pre-existed before this plan.

## Known Stubs

None — all exported data is real content (Belgrano's actual verticals, copy, nav structure). No placeholder flows to UI rendering.

## Self-Check

- [x] `src/lib/content/verticales.ts` exists with `Vertical` interface + 4 verticales
- [x] `src/lib/content/site.ts` exists with `siteConfig`, `navLinks`, `footerData`
- [x] `src/components/animations/scroll-reveal.tsx` exists with `whileInView` pattern
- [x] `src/components/animations/animated-counter.tsx` exists with GSAP `matchMedia`
- [x] `src/components/client-providers.tsx` exists with `reducedMotion="user"`
- [x] `src/app/layout.tsx` uses `ClientProviders` wrapper
- [x] GSAP hydration fix (`borderTopStyle: 'solid'`) preserved
- [x] `npx tsc --noEmit` passes with 0 errors
- [x] Commits 22e10cb, c561974, 60d6639 exist
