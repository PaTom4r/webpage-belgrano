---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [nextjs, tailwind, gsap, framer-motion, typescript, eslint]

# Dependency graph
requires: []
provides:
  - Next.js 16.2.1 App Router scaffold with TypeScript and src/ directory structure
  - Tailwind CSS v4.2.2 CSS-first configuration via @tailwindcss/postcss in postcss.config.mjs
  - Brand @theme tokens (7 colors, typography chain to next/font, spacing scale, breakpoints)
  - Centralized GSAP plugin registration (ScrollTrigger + useGSAP) in lib/gsap-config.ts
  - Root layout with Geist + Inter fonts, GSAP hydration fix, metadataBase, and Analytics
  - ESLint 9 flat config for TypeScript linting
  - Passing npm run build and npm run lint
affects:
  - 01-02-layout-shell (inherits @theme tokens, layout.tsx, gsap-config.ts patterns)
  - All subsequent phases (every component uses these brand tokens and GSAP module)

# Tech tracking
tech-stack:
  added:
    - next@16.2.1
    - react@19.2.4
    - react-dom@19.2.4
    - typescript@6.0.2
    - tailwindcss@4.2.2
    - "@tailwindcss/postcss@4.2.2"
    - framer-motion@12.38.0
    - gsap@3.14.2
    - "@gsap/react@2.1.2"
    - sharp@0.34.5
    - "@vercel/analytics@2.0.1"
    - eslint@9.39.4
    - "@eslint/js@10.0.1"
    - typescript-eslint@8.58.0
  patterns:
    - Tailwind v4 CSS-first configuration — no tailwind.config.js, all tokens in @theme block
    - GSAP centralized registration — single module, never per-component registerPlugin
    - GSAP hydration fix — body style={{ borderTopStyle: 'solid' }} pre-applied in layout
    - next/font/google with variable option for Geist + Inter font chain
    - ESLint 9 flat config (eslint.config.mjs) instead of .eslintrc

key-files:
  created:
    - package.json
    - postcss.config.mjs
    - next.config.ts
    - tsconfig.json
    - eslint.config.mjs
    - .gitignore
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx
    - src/lib/gsap-config.ts
  modified: []

key-decisions:
  - "Manual scaffold instead of create-next-app: project directory had existing files (.planning/, CLAUDE.md) that create-next-app refused to overwrite — built equivalent structure from scratch"
  - "ESLint 9 flat config instead of next lint: next lint was removed in Next.js 16 — switched lint script to eslint src with @eslint/js + typescript-eslint flat config"
  - "Tailwind v4 out of box via npm install: installed tailwindcss@latest which resolved to v4.2.2 directly, no v3 downgrade needed"
  - "GSAP hydration fix applied proactively: body style={{ borderTopStyle: solid }} in layout.tsx prevents ScrollTrigger hydration mismatch before any animations are built"

patterns-established:
  - "Pattern 1: All GSAP imports come from @/lib/gsap-config — never import gsap directly in components"
  - "Pattern 2: Font chain — Geist.variable on <html>, @theme --font-sans references var(--font-geist)"
  - "Pattern 3: @theme (not @theme inline) for brand tokens — plain @theme generates both CSS vars and utility classes"
  - "Pattern 4: No tailwind.config.js — all v4 configuration in globals.css @theme block"

requirements-completed: [FOUND-01, FOUND-02, FOUND-04]

# Metrics
duration: 9min
completed: 2026-03-31
---

# Phase 1 Plan 01: Foundation Scaffold Summary

**Next.js 16.2.1 scaffolded with Tailwind v4 CSS-first @theme brand tokens, centralized GSAP plugin registration, and GSAP hydration fix in root layout**

## Performance

- **Duration:** 9 min
- **Started:** 2026-03-31T23:11:06Z
- **Completed:** 2026-03-31T23:21:01Z
- **Tasks:** 3 (+ 1 auto-fix)
- **Files modified:** 10

## Accomplishments
- Full Next.js 16.2.1 + TypeScript project structure created from scratch (create-next-app bypassed due to non-empty directory)
- Tailwind v4.2.2 CSS-first setup with all brand tokens (@theme block, 7 colors, font chain, spacing, breakpoints)
- Centralized GSAP module at lib/gsap-config.ts — ScrollTrigger + useGSAP registered once, exported for all components
- Root layout.tsx with Geist/Inter via next/font, metadataBase, and GSAP hydration fix pre-applied
- Build passes (Next.js 16.2.1 Turbopack) and ESLint 9 flat config linting passes

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js app and install all dependencies** - `bc9ea28` (feat)
2. **Task 2: Configure Tailwind v4 brand tokens in globals.css** - `f066665` (feat)
3. **Task 3: Create centralized GSAP config module** - `3355c7f` (feat)
4. **Deviation fix: Configure ESLint 9 flat config** - `d387697` (fix)

## Files Created/Modified
- `package.json` - Next.js 16.2.1 project with all dependencies, npm scripts
- `postcss.config.mjs` - Tailwind v4 PostCSS plugin (@tailwindcss/postcss)
- `next.config.ts` - Image AVIF/WebP formats, standard Next.js config
- `tsconfig.json` - TypeScript config with @/* path alias, bundler module resolution
- `eslint.config.mjs` - ESLint 9 flat config with @eslint/js + typescript-eslint
- `.gitignore` - Standard Next.js ignores (node_modules, .next, .env)
- `src/app/globals.css` - @import "tailwindcss" + @theme brand tokens block
- `src/app/layout.tsx` - Root layout with Geist+Inter fonts, metadataBase, GSAP hydration fix, Analytics
- `src/app/page.tsx` - Minimal placeholder (main > h1 Belgrano)
- `src/lib/gsap-config.ts` - Centralized GSAP plugin registration and exports

## Decisions Made
- **Manual scaffold** instead of create-next-app: project directory already contained .planning/, CLAUDE.md, and research files. create-next-app refused to write into non-empty dirs. Built equivalent structure manually — same outcome, verified build passes.
- **Tailwind v4 confirmed via npm install**: `npm install tailwindcss@latest` resolved to 4.2.2 directly. No v3 migration needed.
- **ESLint 9 flat config**: Next.js 16 dropped `next lint` command. Used `eslint src` with @eslint/js + typescript-eslint recommended configs as flat config. Clean, modern approach.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Manual scaffold instead of create-next-app**
- **Found during:** Task 1 (scaffold)
- **Issue:** create-next-app refused to write into non-empty directory containing .planning/, CLAUDE.md, research-verticales-v2.md
- **Fix:** Initialized npm manually, installed next + react + react-dom + typescript, created tsconfig.json, postcss.config.mjs, next.config.ts, and all src/ files from scratch following the exact patterns from 01-RESEARCH.md
- **Files modified:** package.json, tsconfig.json, postcss.config.mjs, next.config.ts, src/app/layout.tsx, src/app/page.tsx, src/app/globals.css
- **Verification:** npm run build exits 0
- **Committed in:** bc9ea28, f066665

**2. [Rule 1 - Bug] ESLint 9 flat config instead of next lint**
- **Found during:** Final verification (build && lint)
- **Issue:** `next lint` was removed in Next.js 16 — running it produced "Invalid project directory provided, no such directory: .../lint" error. The plan's final verification step (`npm run lint`) failed.
- **Fix:** Updated lint script to `eslint src`, installed @eslint/js + typescript-eslint, created eslint.config.mjs with flat config (ESLint 9 pattern). Removed eslint-config-next (incompatible with ESLint 9 flat config + circular reference error).
- **Files modified:** package.json, package-lock.json, eslint.config.mjs
- **Verification:** `npm run lint` exits 0 on src/ directory
- **Committed in:** d387697

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both auto-fixes necessary for build/lint to work. No scope creep. All success criteria met.

## Issues Encountered
- create-next-app v16 refuses non-empty directories even with --yes flag — manual setup required
- next lint removed from Next.js 16 CLI — ESLint 9 flat config is the correct replacement

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Foundation scaffold complete — all dependencies installed, build passing, lint passing
- Tailwind v4 @theme tokens available for all components in Phase 01-02 and beyond
- GSAP centralized config ready — import from @/lib/gsap-config in 'use client' components
- Root layout.tsx has GSAP hydration fix pre-applied — no retrofitting needed
- metadataBase set to https://belgrano.cl — all OG image paths resolve correctly

---
*Phase: 01-foundation*
*Completed: 2026-03-31*

## Self-Check: PASSED

| Check | Status |
|-------|--------|
| src/app/globals.css exists | FOUND |
| src/lib/gsap-config.ts exists | FOUND |
| src/app/layout.tsx exists | FOUND |
| postcss.config.mjs exists | FOUND |
| next.config.ts exists | FOUND |
| 01-01-SUMMARY.md exists | FOUND |
| Commit bc9ea28 exists | FOUND |
| Commit f066665 exists | FOUND |
| Commit 3355c7f exists | FOUND |
| Commit d387697 exists | FOUND |
