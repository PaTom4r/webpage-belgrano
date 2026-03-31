# Phase 1: Foundation - Research

**Researched:** 2026-03-31
**Domain:** Next.js 16 + Tailwind v4 + Geist Sans + GSAP hydration + responsive layout shell
**Confidence:** HIGH (all versions verified against npm registry 2026-03-31; key patterns verified against official docs)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
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

### Claude's Discretion
All implementation choices are at Claude's discretion — pure infrastructure phase.

### Deferred Ideas (OUT OF SCOPE)
None — infrastructure phase.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | Project scaffolded with Next.js 16, Tailwind CSS v4, Framer Motion, GSAP | create-next-app pattern verified; all packages confirmed at latest stable versions |
| FOUND-02 | Brand tokens defined in Tailwind v4 @theme (colors, typography, spacing) | @theme directive verified in official Tailwind v4 docs; CSS variable naming conventions confirmed |
| FOUND-03 | Geist Sans loaded via next/font with proper fallbacks | `next/font/google` Geist import verified in official Next.js 16.2.1 docs; variable font approach confirmed |
| FOUND-04 | GSAP centralized config with useGSAP() hook and hydration fix | useGSAP() pattern verified on gsap.com/resources/React/; body style={borderTopStyle: 'solid'} fix documented |
| FOUND-05 | metadataBase configured in root layout for OG image resolution | metadataBase syntax verified in Next.js 16.2.1 official docs |
| FOUND-06 | Responsive layout system (mobile-first breakpoints) | Tailwind v4 breakpoint tokens confirmed; --breakpoint-* namespace documented |
</phase_requirements>

---

## Summary

Phase 1 is a pure greenfield scaffolding phase — no source files exist yet in the project root. The task is to create the entire Next.js application from scratch, configure all tooling, and establish the patterns that every subsequent phase will inherit. Getting this phase right is critical because retrofitting GSAP hydration fixes, metadataBase, or Tailwind v4 token structure onto an already-built app is expensive.

The stack is fully resolved with no ambiguity: Next.js 16.2.1 (confirmed latest), Tailwind v4.2.2 (CSS-first), Geist Sans from `next/font/google`, GSAP 3.14.2 + @gsap/react 2.1.2, and framer-motion 12.38.0. All versions verified against the npm registry on 2026-03-31.

The two most technically sensitive tasks are the GSAP hydration fix (body `style` attribute must pre-match the server render) and the Tailwind v4 `@theme` setup (CSS-first, no `tailwind.config.js`). Both have clear, documented solutions. The rest of the phase is standard Next.js App Router patterns.

**Primary recommendation:** Scaffold with `create-next-app`, immediately install animation packages, configure `globals.css` with all brand tokens in a single `@theme` block, load Geist from `next/font/google` as a variable font applied to `<html>`, apply the GSAP hydration fix to `<body>`, and set `metadataBase` — all in the root layout before writing any UI components.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.1 | Full-stack React framework + routing | `latest` tag on npm 2026-03-31. App Router, Turbopack default, React 19, React Compiler built in |
| react | 19.x (bundled) | UI library | Bundled with Next.js 16; Server Components default; zero JS for static content |
| typescript | 6.0.2 | Type safety | Bundled with Next.js; mandatory for maintainability |
| tailwindcss | 4.2.2 | Utility-first CSS | CSS-first v4: no config file, @theme tokens in CSS. ~70% smaller output vs v3 |
| @tailwindcss/postcss | 4.2.2 | PostCSS integration | Required adapter for Tailwind v4 in Next.js. Replaces old `tailwindcss` + `autoprefixer` combo |
| geist | 1.7.0 | Font package (local woff2 files) | Vercel's official font, used via `next/font/google` import — no npm install needed |

### Animation
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| framer-motion | 12.38.0 | Entrance animations, scroll triggers, hover states | Section entrances (whileInView), page transitions, micro-interactions |
| gsap | 3.14.2 | Counter animations, scroll-scrubbed timelines | Stats counters, HowItWorks timeline scrub, any imperative timeline |
| @gsap/react | 2.1.2 | GSAP React integration (useGSAP hook) | Every component using GSAP — replaces useEffect, provides auto-cleanup |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| sharp | 0.34.5 | Server-side image processing | Auto-used by Next.js; add to `dependencies` (not devDependencies) |
| @vercel/analytics | 2.0.1 | Privacy-first analytics | Add `<Analytics />` to root layout — zero config |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next/font/google (Geist) | geist npm package + localFont | npm package gives offline access; next/font/google auto-self-hosts and is simpler. Official Next.js docs use next/font/google for Geist. |
| @theme (global vars) | @theme inline (inlined values) | @theme inline inlines actual values into utilities; @theme generates CSS vars. For a single-theme site with no dark mode toggle in v1, either works. Use @theme inline when referencing CSS vars from other vars to avoid resolution issues. |
| Tailwind v4 | Tailwind v3 | v3 is maintenance-only. New project must use v4. |

**Installation:**
```bash
# 1. Bootstrap (no --turbopack flag needed — it's default in Next.js 16)
npx create-next-app@latest webpage-belgrano \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

# 2. Animation libraries
npm install framer-motion gsap @gsap/react

# 3. Image processing (must be in dependencies, not devDependencies)
npm install sharp

# 4. Analytics
npm install @vercel/analytics
```

**Version verification (npm registry, 2026-03-31):**
```
next@16.2.1, tailwindcss@4.2.2, @tailwindcss/postcss@4.2.2
framer-motion@12.38.0, gsap@3.14.2, @gsap/react@2.1.2
sharp@0.34.5, @vercel/analytics@2.0.1, typescript@6.0.2
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, providers, GSAP fix
│   ├── page.tsx            # Home page (landing)
│   ├── globals.css         # @import "tailwindcss" + @theme tokens
│   ├── verticales/
│   │   └── [slug]/
│   │       └── page.tsx    # Dynamic vertical pages
│   ├── sobre-nosotros/
│   │   └── page.tsx
│   └── contacto/
│       └── page.tsx
├── components/
│   ├── ui/                 # Generic UI primitives (Button, Card, etc.)
│   ├── layout/             # Navbar, Footer, Section wrappers
│   └── animations/         # All 'use client' animation wrappers
├── lib/
│   ├── gsap-config.ts      # Single file: gsap.registerPlugin(ScrollTrigger, useGSAP)
│   ├── content/
│   │   └── verticales.ts   # Content as TypeScript data (VERT-07)
│   └── schemas/            # Zod schemas (Phase 5)
└── public/
    └── images/             # Static assets, OG images
```

### Pattern 1: Root Layout with All Foundation Concerns
**What:** Single `app/layout.tsx` handles fonts, metadata, GSAP hydration fix, and analytics in one place.
**When to use:** Always — this is the App Router pattern. Keep layout.tsx as a Server Component; push interactivity to leaf nodes.

```typescript
// app/layout.tsx
// Source: https://nextjs.org/docs/app/getting-started/fonts + https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'
import { Geist, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://belgrano.cl'),
  title: {
    template: '%s | Belgrano',
    default: 'Belgrano — IA, Marketing & Estrategia',
  },
  description: 'Agencia chilena de IA aplicada, marketing y estrategia de negocio.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${inter.variable}`}>
      {/* GSAP hydration fix: borderTopStyle pre-matches what ScrollTrigger injects */}
      <body style={{ borderTopStyle: 'solid' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Pattern 2: Tailwind v4 CSS-First Brand Tokens
**What:** All design tokens live in `globals.css` inside a single `@theme` block. No `tailwind.config.js`.
**When to use:** Every styling decision. Other components reference these tokens via Tailwind utilities.

```css
/* app/globals.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-bg: #ffffff;
  --color-bg-section: #f9fafb;
  --color-dark: #09090b;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  --color-accent: #000000;

  /* Typography */
  --font-sans: var(--font-geist), 'Inter', system-ui, sans-serif;
  --font-fallback: 'Inter', system-ui, sans-serif;

  /* Font weights (for headline-heavy design) */
  --font-weight-heading: 800;
  --font-weight-subheading: 700;
  --font-weight-body: 400;
  --font-weight-medium: 500;

  /* Spacing scale */
  --spacing-section: 6rem;
  --spacing-section-sm: 4rem;

  /* Breakpoints (mobile-first) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### Pattern 3: GSAP Centralized Config
**What:** One file registers all GSAP plugins. Imported by the first component that needs GSAP — never per-component.
**When to use:** Import this file in any 'use client' component that uses GSAP.

```typescript
// lib/gsap-config.ts
// Source: https://gsap.com/resources/React/
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
```

```typescript
// Example component using GSAP correctly
// components/animations/CounterAnimation.tsx
'use client'
import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-config'

export function CounterAnimation({ target }: { target: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animations here auto-cleanup on unmount via gsap.context()
    gsap.from(containerRef.current, {
      textContent: 0,
      duration: 2,
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    })
  }, { scope: containerRef })

  return <div ref={containerRef}>{target}</div>
}
```

### Pattern 4: Motion (Framer Motion v12) Usage
**What:** Import from `motion/react` (rebranded package name) for all React usage.
**When to use:** Entrance animations, hover states, page transitions — on 'use client' components.

```typescript
// components/animations/FadeInSection.tsx
'use client'
import { motion } from 'motion/react'

export function FadeInSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
```

### Pattern 5: Responsive Layout Shell
**What:** Mobile-first layout using Tailwind v4 responsive prefixes. Max-width container with horizontal padding.
**When to use:** Wrap all page content sections.

```typescript
// components/layout/Container.tsx
export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

// components/layout/Section.tsx
export function Section({ children, className = '', dark = false }: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${dark ? 'bg-dark text-bg' : 'bg-bg text-text'} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
```

### Anti-Patterns to Avoid
- **GSAP in useEffect:** Always use `useGSAP()` from `@gsap/react`. Plain `useEffect` with GSAP leaks ScrollTrigger instances across navigation.
- **`gsap.registerPlugin()` inside components:** Register once in `lib/gsap-config.ts`. Calling inside components registers on every render — causes duplicate instances.
- **Missing 'use client' on animation components:** Next.js App Router renders by default as Server Components. Any import of `motion`, `useGSAP`, `useRef` for DOM access requires `'use client'` at file top.
- **Both Framer Motion + GSAP on the same DOM node:** They fight for the `transform` property. Assign responsibility by element type (see Don't Hand-Roll table).
- **`tailwind.config.js` for v4:** Tailwind v4 is CSS-first. Do not create a `tailwind.config.js` — it's v3 pattern. All config lives in `globals.css`.
- **Loading Geist without `next/font`:** Causes FOUT (Flash of Unstyled Text) and CLS. Always use `next/font/google` with the `variable` option.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading without CLS | Manual `<link rel="preload">` for fonts | `next/font/google` with `variable` option | next/font handles `size-adjust`, `font-display`, self-hosting automatically. Manual approach always has FOUT. |
| GSAP cleanup on unmount | `useEffect` return function with `kill()` | `useGSAP()` from @gsap/react | useGSAP wraps `gsap.context()` which reverts all animations automatically. Manual cleanup always misses edge cases. |
| CSS custom properties for tokens | `:root { --color-x: ... }` in CSS | `@theme { --color-x: ... }` in Tailwind v4 | @theme creates both the CSS var AND the utility class (bg-x, text-x). `:root` only creates the var — no utility class. |
| OG image URL construction | Manual string concatenation for absolute URLs | `metadataBase` in root layout | Without metadataBase, relative OG paths break on every social platform. One line in layout.tsx fixes all pages. |
| Scroll-triggered viewport detection | IntersectionObserver + useState | `whileInView` in Framer Motion | IntersectionObserver has known bugs with SSR hydration. Framer's whileInView is tested against React 19 and handles this correctly. |
| Responsive breakpoints | Hardcoded media queries in components | Tailwind `sm:`, `md:`, `lg:` prefixes | Tailwind v4 breakpoints are defined once in @theme and auto-generated for every utility. Consistency guaranteed. |

**Key insight:** In Next.js 16 App Router, the framework provides first-class solutions for fonts, metadata, and image optimization. Any custom implementation is worse because it lacks the framework's optimization hooks (priority hints, preconnect, size-adjust).

---

## Common Pitfalls

### Pitfall 1: GSAP ScrollTrigger Hydration Error
**What goes wrong:** ScrollTrigger adds `borderTopStyle: solid` to `<body>` during client render. Next.js 16's hydration checker catches the SSR/CSR mismatch and throws `Error: Hydration failed`.
**Why it happens:** GSAP mutates the DOM imperatively; React's reconciler sees unexpected differences from server HTML.
**How to avoid:** Pre-apply `style={{ borderTopStyle: 'solid' }}` to the `<body>` tag in `app/layout.tsx`. The server HTML will already have this style, so GSAP's injection becomes a no-op.
**Warning signs:** `Error: Hydration failed because the initial UI does not match` in browser console on first load.

### Pitfall 2: `@theme inline` vs `@theme` Confusion
**What goes wrong:** Using `@theme` when tokens reference other CSS variables causes the variable chain to break at runtime.
**Why it happens:** `@theme` generates `.bg-x { background-color: var(--color-x); }` — but if `--color-x` itself references another var that doesn't exist as a Tailwind var, the chain breaks. `@theme inline` inlines the actual value into utilities instead of referencing via var.
**How to avoid:** For v1 (single theme, no dark mode toggle), use plain `@theme`. If any token value references `var(--font-geist)` (from next/font), that CSS variable is injected by Next.js at runtime — this reference works. Confirm tokens work with a quick visual smoke test.
**Warning signs:** Background colors or font families showing as browser defaults even though utility classes are applied.

### Pitfall 3: Geist Not Applied to Headline Elements
**What goes wrong:** Geist is loaded and its className applied to `<html>`, but Tailwind's `font-sans` utility overrides it on specific elements because `--font-sans` in @theme doesn't include `var(--font-geist)`.
**Why it happens:** next/font injects a CSS variable (e.g. `--font-geist`) on the element. @theme's `--font-sans` must reference this variable to chain the font families correctly.
**How to avoid:** Use `Geist({ subsets: ['latin'], variable: '--font-geist' })` (the `variable` option) — this gives a CSS variable instead of a className. Then in @theme: `--font-sans: var(--font-geist), 'Inter', system-ui, sans-serif`. Apply both `geist.variable` and `inter.variable` as classNames on `<html>`.
**Warning signs:** Text renders in Inter or system-ui instead of Geist. Check if `--font-geist` is visible in DevTools > Elements > computed styles on `<html>`.

### Pitfall 4: create-next-app Installs Tailwind v3 Instead of v4
**What goes wrong:** Running `create-next-app` may scaffold with Tailwind v3 (still common in templates) creating a `tailwind.config.ts` file and using `@tailwind base/components/utilities` syntax — incompatible with the v4 CSS-first approach.
**Why it happens:** create-next-app template may not yet default to v4. The installed version depends on the template.
**How to avoid:** After scaffolding, check `package.json` for `tailwindcss` version. If it shows `^3.x`, run `npm install tailwindcss@latest @tailwindcss/postcss` and replace `tailwind.config.ts` + `globals.css` content with v4 patterns. Delete `postcss.config.js` and create `postcss.config.mjs`.
**Warning signs:** `globals.css` contains `@tailwind base;` directive (v3 pattern). `tailwind.config.ts` exists.

### Pitfall 5: `framer-motion` vs `motion/react` Import Path
**What goes wrong:** Some guides show `import { motion } from 'framer-motion'` while v12+ docs show `import { motion } from 'motion/react'`. The old path still works but may diverge in future versions.
**Why it happens:** The package was rebranded from "Framer Motion" to "Motion" at v11+. Both import paths resolve to the same code in v12, but `motion/react` is the canonical path going forward.
**How to avoid:** Use `motion/react` for all new code in this project. Consistency matters more than the specific path, but align with the current docs.
**Warning signs:** Mix of import styles across files (not functionally broken in v12, but indicates inconsistency).

---

## Code Examples

Verified patterns from official sources:

### Root Layout (complete)
```typescript
// app/layout.tsx
// Sources: next/font docs + metadata docs (nextjs.org, verified 2026-03-31)
import type { Metadata } from 'next'
import { Geist, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://belgrano.cl'),
  title: {
    template: '%s | Belgrano',
    default: 'Belgrano — IA, Marketing & Estrategia',
  },
  description: 'Agencia chilena de IA aplicada, marketing digital y estrategia de negocio.',
  openGraph: {
    siteName: 'Belgrano',
    locale: 'es_CL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${inter.variable}`}>
      <body style={{ borderTopStyle: 'solid' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### globals.css (complete)
```css
/* app/globals.css */
/* Source: tailwindcss.com/docs/theme (verified 2026-03-31) */
@import "tailwindcss";

@theme {
  /* Brand colors */
  --color-bg: #ffffff;
  --color-bg-section: #f9fafb;
  --color-dark: #09090b;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  --color-accent: #000000;
  --color-border: #e5e7eb;

  /* Typography — chain to next/font CSS variables */
  --font-sans: var(--font-geist), 'Inter', system-ui, sans-serif;
  --font-fallback: 'Inter', system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;

  /* Breakpoints (Tailwind v4 default, explicitly declared for clarity) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### postcss.config.mjs
```javascript
// postcss.config.mjs
// Source: tailwindcss.com/docs/guides/nextjs (verified 2026-03-31)
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

### GSAP config module
```typescript
// lib/gsap-config.ts
// Source: gsap.com/resources/React/ (verified 2026-03-31)
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
```

### metadataBase pattern
```typescript
// Source: nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase (verified 2026-03-31)
export const metadata: Metadata = {
  metadataBase: new URL('https://belgrano.cl'),
  // All relative OG image paths are now resolved to absolute URLs automatically
  openGraph: {
    images: '/og-image.png',  // resolves to https://belgrano.cl/og-image.png
  },
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` with `theme.extend` | CSS-first `@theme` in globals.css | Tailwind v4 (2025) | No JS config file. All tokens as CSS variables. |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 (2025) | Single import statement replaces 3 directives. |
| `import { motion } from 'framer-motion'` | `import { motion } from 'motion/react'` | Motion v11+ | Package rebranded; old path still works in v12 but use new path for new code. |
| `useEffect` for GSAP | `useGSAP()` from @gsap/react | @gsap/react v2+ | Auto-cleanup via gsap.context(), handles SSR, React strict mode safe. |
| `next-seo` package | Native `export const metadata` | Next.js 13+ (App Router) | No package needed. Built into the framework. |
| `next-sitemap` post-build script | `app/sitemap.ts` convention | Next.js 13+ (App Router) | No package needed. Auto-served at /sitemap.xml. |

**Deprecated/outdated:**
- `tailwind.config.js`: v3 pattern — do not create in this project
- `next-seo` npm package: Pages Router pattern — do not install
- `useEffect` for GSAP animations: replaced by `useGSAP()` in all new code
- `framer-motion` direct import path: still works but `motion/react` is canonical in v12+

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js 16 runtime | Yes | v24.14.0 | — |
| npm | Package management | Yes | 11.9.0 | — |
| Git | Version control | Yes | (in PATH) | — |
| next@16.2.1 | FOUND-01 | Not yet installed | — | Run create-next-app |
| tailwindcss@4.2.2 | FOUND-02 | Not yet installed | — | Installed via npm post-scaffold |
| gsap@3.14.2 | FOUND-04 | Not yet installed | — | Installed via npm post-scaffold |
| @gsap/react@2.1.2 | FOUND-04 | Not yet installed | — | Installed via npm post-scaffold |
| framer-motion@12.38.0 | FOUND-01 | Not yet installed | — | Installed via npm post-scaffold |

**Missing dependencies with no fallback:** None — all install via npm.

**Current project state:** Greenfield — no `package.json`, no `src/` directory, no `node_modules`. Phase 1 must create the entire application from scratch. The first task is running `create-next-app`.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None yet — greenfield project |
| Config file | No test framework installed; Wave 0 must establish this |
| Quick run command | `npm run build` (build validation as proxy) |
| Full suite command | `npm run build && npm run lint` |

**Note:** For a pure infrastructure phase with no business logic, the appropriate validation is:
1. `npm run dev` starts without errors
2. `npm run build` produces a successful build
3. Browser console shows zero hydration errors on first load
4. Font renders correctly (visual check)
5. Tailwind utilities work in a smoke test component

Unit tests are not meaningful for Phase 1's concerns (scaffolding, config, fonts, GSAP setup). The phase gate is a passing build + zero console errors.

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | App scaffolded and runs | smoke | `npm run dev` (manual verify) | Wave 0 (create) |
| FOUND-02 | Brand tokens consumable from components | smoke | `npm run build` | Wave 0 (create) |
| FOUND-03 | Geist Sans renders, no font flash | visual | Lighthouse CLS check | Wave 0 (create) |
| FOUND-04 | GSAP plugins registered, zero hydration errors | smoke | Browser console check | Wave 0 (create) |
| FOUND-05 | metadataBase set, OG URLs absolute | smoke | `npm run build` (build error if missing) | Wave 0 (create) |
| FOUND-06 | Layout reflows at sm/md/lg breakpoints | visual | Browser DevTools responsive mode | Wave 0 (create) |

### Sampling Rate
- **Per task commit:** `npm run build` (catches TypeScript errors, missing imports)
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Full build green + zero browser console errors verified manually

### Wave 0 Gaps
- [ ] Entire `src/` directory — does not exist yet (greenfield)
- [ ] `app/layout.tsx` — root layout with all Phase 1 concerns
- [ ] `app/globals.css` — Tailwind v4 @theme tokens
- [ ] `lib/gsap-config.ts` — centralized GSAP registration
- [ ] `postcss.config.mjs` — Tailwind v4 PostCSS plugin
- [ ] `package.json` — created by create-next-app, then extended

*(All infrastructure; no separate test files needed for this phase — validation is build success + visual verification)*

---

## Open Questions

1. **Geist availability in `next/font/google` for Next.js 16**
   - What we know: The official Next.js 16 docs (`version: 16.2.1, lastUpdated: 2026-03-25`) show `import { Geist } from 'next/font/google'` as the canonical example in `app/layout.tsx`. This is the official pattern.
   - What's unclear: Whether `create-next-app@latest` already includes Geist in the scaffold or if it must be added manually.
   - Recommendation: After scaffolding, check if Geist is already imported in the generated `layout.tsx`. If not, add it following the verified pattern above.

2. **`@theme inline` for `--font-sans` referencing `var(--font-geist)`**
   - What we know: `@theme` generates CSS variables; `@theme inline` inlines values. When `--font-sans: var(--font-geist)`, the `var(--font-geist)` is a runtime CSS variable injected by next/font — not a Tailwind theme variable. This cross-reference should work with plain `@theme`.
   - What's unclear: Whether Tailwind v4 resolves the `var(--font-geist)` reference correctly at build time or if it requires `@theme inline`.
   - Recommendation: Start with plain `@theme`. If font-sans utilities don't apply Geist, switch the font-related tokens to `@theme inline`.

---

## Project Constraints (from CLAUDE.md)

The following directives from `./CLAUDE.md` are binding:

| Directive | Applies To |
|-----------|-----------|
| Stack: Next.js (latest stable) + Tailwind CSS v4 + Framer Motion + GSAP | All code in this phase |
| No Three.js, no Lenis | Do not install or reference these |
| Design: Minimalist, Linear.app-inspired, white/black/grey palette | globals.css tokens must use the specified hex values |
| Typography: Geist Sans primary, Inter fallback, headlines 800-900 weight | Font loading and @theme font tokens |
| Colors: #ffffff, #f9fafb, #09090B, #111827, #6B7280, #000000 | @theme color tokens |
| Package manager: npm | Use npm, not pnpm or yarn |
| No code migration from landing-belgrano or belgrano repos | Build from scratch |
| Soluciones simples y directas, nunca sobre-ingeniería | Keep files focused, no unnecessary abstractions |
| ES modules, async/await | Use ESM syntax throughout |
| camelCase (JS/TS), kebab-case (file names) | gsap-config.ts, globals.css, layout.tsx |
| `GSD:execute-phase` for planned phase work | Follow GSD workflow |

---

## Sources

### Primary (HIGH confidence)
- `https://nextjs.org/docs/app/getting-started/fonts` (v16.2.1, lastUpdated 2026-03-25) — Geist via next/font/google, variable font pattern
- `https://nextjs.org/docs/app/api-reference/functions/generate-metadata` (v16.2.1, lastUpdated 2026-03-25) — metadataBase syntax, metadata object structure
- `https://tailwindcss.com/docs/guides/nextjs` — Tailwind v4 + Next.js setup, postcss.config.mjs
- `https://tailwindcss.com/docs/theme` — @theme directive, CSS variable naming conventions
- `https://gsap.com/resources/React/` — useGSAP() hook, plugin registration pattern, SSR handling
- npm registry (2026-03-31) — all package versions verified as current `latest`

### Secondary (MEDIUM confidence)
- `https://github.com/tailwindlabs/tailwindcss/discussions/18560` — @theme vs @theme inline distinction (community discussion, matches official docs explanation)
- `PITFALLS.md` (project research, 2026-03-31) — GSAP hydration fix (body style), memory leak patterns, font CLS prevention

### Tertiary (LOW confidence)
- None — all critical claims verified with official sources.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against npm registry 2026-03-31
- Architecture patterns: HIGH — verified against Next.js 16.2.1 official docs and GSAP docs
- Tailwind v4 @theme tokens: HIGH — verified against official Tailwind CSS docs
- GSAP hydration fix: HIGH — documented in GSAP community + official React guide
- Pitfalls: HIGH — cross-referenced PITFALLS.md (project research) with official docs

**Research date:** 2026-03-31
**Valid until:** 2026-04-30 (stable stack; Tailwind v4 and Next.js 16 unlikely to have breaking changes in 30 days)
