---
phase: 02-landing-page
plan: 02
subsystem: landing-page-sections
tags: [navbar, hero, marquee, footer, framer-motion, css-animation, server-component]
dependency_graph:
  requires: [02-01]
  provides: [navbar, hero-section, marquee-section, footer]
  affects: [02-05-layout-integration]
tech_stack:
  added: []
  patterns:
    - Scroll event listener with passive flag for Navbar glass effect
    - Framer Motion initial/animate for above-fold Hero (NOT whileInView)
    - CSS @keyframes marquee with prefers-reduced-motion pause
    - Duplicated logo array with id+index keys for seamless marquee loop
    - Server Components for Footer and Marquee (zero client JS)
key_files:
  created:
    - src/components/layout/navbar.tsx
    - src/components/layout/mobile-menu.tsx
    - src/components/sections/hero-section.tsx
    - src/components/sections/marquee-section.tsx
    - src/components/layout/footer.tsx
    - public/logos/clc.svg
    - public/logos/seguros-clc.svg
    - public/logos/tnt-sports.svg
    - public/logos/afp-modelo.svg
  modified:
    - src/app/globals.css
decisions:
  - "Used framer-motion (not motion/react) — framer-motion v12 is the installed package per STATE.md decision from 02-01"
  - "Hero uses initial/animate (not whileInView) — above-fold content must animate on mount, not scroll"
  - "Marquee keys use id+index pattern to prevent React key collision when logo array is duplicated"
  - "Logo SVGs are placeholder quality — real brand assets replace them before launch"
metrics:
  duration: 5m
  completed: "2026-04-01T00:43:31Z"
  tasks_completed: 3
  files_created: 9
  files_modified: 1
---

# Phase 02 Plan 02: Navbar, Hero, Marquee, Footer Summary

**One-liner:** Fixed navbar with scroll glass effect + Framer Motion initial/animate Hero + CSS marquee strip + static Server Component Footer.

## What Was Built

### Task 1: Navbar + Mobile Menu (commits: abd8814)

**`src/components/layout/navbar.tsx`** — Client Component. Fixed `h-16` header at `z-50`. Passive scroll listener sets `scrolled` state at `window.scrollY > 10`. When scrolled: `bg-white/90 backdrop-blur-sm border-b border-border`. Desktop nav with 4 links + CTA button. Mobile hamburger at `md:hidden`. Imports `navLinks` and `siteConfig` from `@/lib/content/site`.

**`src/components/layout/mobile-menu.tsx`** — Client Component. `AnimatePresence` fade `(opacity, y: -8 → 0)` overlay positioned `top-16` under navbar. Renders nav links + "Hablemos" CTA. Closes on link click.

### Task 2: Hero Section (commit: 338547c)

**`src/components/sections/hero-section.tsx`** — Client Component. `min-h-svh` section with `pt-16` to clear navbar. Subtle CSS grid background decoration. Staggered `fadeUp` animation helper: `initial { opacity: 0, y: 30 }` → `animate { opacity: 1, y: 0 }` with delay 0/0.1/0.2/0.3/0.4s for badge, headline, subtitle, CTAs, social proof. Uses `framer-motion` (not `motion/react`). No `whileInView` — fires on mount.

### Task 3: Marquee, Footer, CSS, Logos (commit: 4fb0bd1)

**`src/app/globals.css`** — Added `@keyframes marquee-scroll` (translateX 0 → -50%) + `.marquee-track` class (25s linear infinite) + `prefers-reduced-motion` pause rule.

**`public/logos/`** — 4 placeholder SVG logos: clc.svg (120×40), seguros-clc.svg (140×40), tnt-sports.svg (130×40), afp-modelo.svg (140×40). Gray background with text, sufficient for development.

**`src/components/sections/marquee-section.tsx`** — Server Component (no `"use client"`). Logos array duplicated to `allLogos` for seamless loop. Keys use `${logo.id}-${i}` pattern to prevent React key collision. `next/image` for each logo. Grayscale + opacity with hover reveal. `.marquee-track` CSS class drives animation.

**`src/components/layout/footer.tsx`** — Server Component. 3-column grid: brand + tagline, navigation links from `footerData.links`, contact email from `siteConfig.email`. Copyright from `footerData.copyright`. Zero client JS.

## Deviations from Plan

### Auto-applied corrections

**1. [Rule 2 - Critical correction] Import from framer-motion not motion/react**
- **Found during:** Task 1 setup
- **Issue:** Plan code samples used `import { motion } from 'motion/react'` but `motion` package is not installed. Only `framer-motion` v12 is in `package.json`. STATE.md already documented this decision from Plan 02-01.
- **Fix:** All components use `import { motion, AnimatePresence } from 'framer-motion'` — consistent with existing `scroll-reveal.tsx`.
- **Files modified:** navbar.tsx, mobile-menu.tsx, hero-section.tsx
- **Commits:** Included in per-task commits

## Known Stubs

- **Logo SVGs** (`public/logos/*.svg`): Placeholder gray boxes with text. Real brand assets (CLC, Seguros CLC, TNT Sports/Warner Bros., AFP Modelo) must be sourced before launch. These flow to MarqueeSection but don't break the plan's goal — the marquee section is functional with placeholders.

## Self-Check

Checking files exist and commits recorded...

## Self-Check: PASSED

All 9 created files confirmed present. All 3 task commits (abd8814, 338547c, 4fb0bd1) confirmed in git log.
