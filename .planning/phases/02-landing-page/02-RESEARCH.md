# Phase 2: Landing Page - Research

**Researched:** 2026-03-31
**Domain:** Next.js 16 App Router — multi-section landing page with Framer Motion entrances + GSAP counters/scroll-scrub
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Layout & Visual Density**
- Navbar: 64px height, transparent on top → glass (backdrop-blur) on scroll
- Hero: full viewport (100vh), centered content, maximizes first impression
- Section vertical spacing: py-24 (96px) desktop, py-16 (64px) mobile — generous whitespace
- Dark sections: Stats + CTA get dark bg (#09090B), rest is light (#ffffff or #f9fafb)

**Animation Strategy**
- Framer Motion entrances: fade-in + slide-up 30px, stagger 0.1s between siblings. Use whileInView with once: true
- Stats counters: GSAP countUp on ScrollTrigger enter, duration 2s, ease power2.out
- HowItWorks: GSAP ScrollTrigger pin + scrub — steps reveal sequentially as user scrolls
- Reduced motion: disable all motion completely, show final state instantly (no fade, no counter)
- Element ownership rule: Framer Motion handles entrance/hover, GSAP handles counters and scroll-scrub. NEVER both on the same DOM element.

### Claude's Discretion
- Content & CTA approach — dual form+CTA, card hover effects, marquee style, stats numbers — Claude has full flexibility here
- Specific copy text — use CLAUDE-webpage-belgrano.md content (already defined in spec)
- Visual micro-interactions on buttons and links
- Exact marquee implementation details

### Deferred Ideas (OUT OF SCOPE)
- Calendly embed — Phase 5 (Contact & Conversion)
- WhatsApp floating button — Phase 5
- Resend form integration — Phase 5 (form UI built here, integration later)
- Testimonials carousel — v2
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LAND-01 | Sticky navbar with logo, navigation links, CTA button, and backdrop blur on scroll | Navbar must be `"use client"` for scroll detection. `useScrollY` or window scroll listener. `backdrop-blur-sm` + `bg-white/80` on scroll. Height locked to 64px via `h-16`. |
| LAND-02 | Hero section with headline, subtitle, primary CTA, and fade-in/slide-up animations | 100vh full-viewport section. Framer Motion `motion.div` variants with `initial/animate` (not `whileInView` — hero is above fold). Stagger children 0.1s. |
| LAND-03 | Client logo marquee with infinite horizontal scroll (CLC, Seguros CLC, TNT Sports/Warner Bros) | CSS `@keyframes` scroll-x infinite. No GSAP/rAF (freezes on tab switch). `next/image` for logo files in `public/logos/`. `prefers-reduced-motion` pauses it. |
| LAND-04 | Verticales section with 4 cards (icon, name, description, "Saber mas" link to detail page) | Server Component. Links to `/verticales/[slug]` — slugs: `bots`, `dooh`, `producciones`, `academy`. Content from `lib/content/verticales.ts`. Card hover via Framer `whileHover`. |
| LAND-05 | HowItWorks section with 3-step visual timeline (Diagnostico, Estrategia, Ejecucion) | GSAP ScrollTrigger pin + scrub. Container ref passed to `useGSAP`. Steps reveal as user scrolls. Pinned section stays fixed while scroll budget is consumed. |
| LAND-06 | Stats section with GSAP-animated counters (4 key metrics) | `AnimatedCounter` client component. `gsap.to({ val: 0 }, { val: target, duration: 2, ease: 'power2.out', onUpdate })`. ScrollTrigger `once: true`. Dark section (`bg-dark`). |
| LAND-07 | CTA section with contact form and meeting scheduling option | Form UI only — no Resend integration (Phase 5). `react-hook-form` + `zod` schema defined here. Submission disabled or shows "coming soon" state. Dark section. |
| LAND-08 | Footer with logo, tagline, navigation links, and copyright | Server Component. Static content from `lib/content/site.ts`. No client JS. |
| ANIM-01 | Framer Motion scroll-triggered entrance animations (fade-in, slide-up, stagger) | `ScrollReveal` wrapper component (`"use client"`). `whileInView={{ opacity: 1, y: 0 }}` + `initial={{ opacity: 0, y: 30 }}`. `once: true` viewport setting. |
| ANIM-02 | GSAP-powered counter animations for Stats section | `useGSAP` + `ScrollTrigger`. Import from `lib/gsap-config.ts`. Counter targets: 200 (empresas), 10 (ROI x), 98 (satisfaccion %), 80 ($M generados). |
| ANIM-03 | GSAP scroll-scrubbed animation for HowItWorks timeline | `ScrollTrigger` with `pin: true`, `scrub: 1`. Steps revealed via timeline segments linked to scroll position. |
| ANIM-04 | Smooth hover/interaction micro-animations on cards and buttons | Framer `whileHover={{ scale: 1.02, y: -2 }}` on cards. Button press: `whileTap={{ scale: 0.97 }}`. Never use Tailwind `hover:scale-` on animated elements (v4 transform conflict). |
| ANIM-05 | prefers-reduced-motion support (disable/simplify animations when requested) | `MotionConfig reducedMotion="user"` wraps entire app in layout. GSAP check: `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)` — skip `gsap.to()` calls, jump to final state. |
| ANIM-06 | Mobile animation budget (simplified animations on smaller viewports) | `useMediaQuery('(max-width: 768px)')` hook or CSS media query in GSAP `matchMedia`. On mobile: fade-in only (no slide), HowItWorks scrub disabled (show steps statically), counter still runs. |
</phase_requirements>

---

## Summary

Phase 2 builds 8 landing page sections — Navbar, Hero, Marquee, Verticales, HowItWorks, Stats, CTA, Footer — on top of the Phase 1 foundation (Container, Section, GSAP config, brand tokens). The critical technical challenge is coordinating two animation libraries on the same page without conflicts: Framer Motion owns all entrance animations and hover micro-interactions, GSAP owns the Stats counters and HowItWorks scrubbed timeline.

The Phase 1 scaffold already resolved the hardest infrastructure problems: GSAP hydration fix is in place (`body style={{ borderTopStyle: 'solid' }}`), `gsap-config.ts` centralizes plugin registration, `globals.css` has all brand tokens, Container and Section components cover layout. Phase 2 only needs to build components — zero infrastructure work remains.

The CTA section includes the form UI shell (react-hook-form + zod schema), but form submission is intentionally not wired (Resend integration is Phase 5). This is the correct scope boundary per CONTEXT.md.

**Primary recommendation:** Build sections in DOM order. Each section is isolated — no cross-section state. Start with the static sections (Navbar, Hero, Footer), then CSS-animated Marquee, then Framer Motion sections (Verticales, HowItWorks structure), then GSAP sections (Stats counters, HowItWorks scrub). Add animations last so content is correct before motion is layered.

---

## Standard Stack

### Core (all installed — verified in package.json)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | ^16.2.1 | App Router framework | Already installed. Phase 1 complete. |
| framer-motion | ^12.38.0 | Entrance + hover animations | Already installed. Import from `motion/react` in new code. |
| gsap | ^3.14.2 | Counters + scroll-scrub | Already installed. Use via `lib/gsap-config.ts`. |
| @gsap/react | ^2.1.2 | `useGSAP()` hook | Already installed. All GSAP code must use this. |
| tailwindcss | ^4.2.2 | Utility classes | Already installed. Tokens in globals.css. |

### New installs needed for Phase 2

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| react-hook-form | ^7.72.0 | CTA form state | Form UI built in Phase 2; integration in Phase 5 |
| zod | ^4.3.6 | Schema validation | Define contact schema now, reuse in Phase 5 |
| @hookform/resolvers | ^5.2.2 | RHF + Zod bridge | Required adapter |

**Installation:**
```bash
npm install react-hook-form zod @hookform/resolvers
```

**Note:** `react-hook-form v8` is still in beta as of March 2026. Use v7.

### No new installs for animation work
All GSAP and Framer Motion packages are already present from Phase 1. Do not add `lenis`, `@motionone/dom`, or any additional animation packages.

---

## Architecture Patterns

### File structure for Phase 2

```
src/
├── app/
│   └── page.tsx                    # Replace smoke test — compose 8 sections
│
├── components/
│   ├── layout/
│   │   ├── navbar.tsx              # "use client" — scroll detection
│   │   ├── footer.tsx              # Server Component
│   │   └── mobile-menu.tsx         # "use client" — hamburger overlay
│   │
│   ├── sections/
│   │   ├── hero-section.tsx        # Server shell + child ScrollReveal wrappers
│   │   ├── marquee-section.tsx     # "use client" — CSS infinite scroll
│   │   ├── verticales-section.tsx  # Server Component — card grid
│   │   ├── how-it-works-section.tsx # "use client" — GSAP pin+scrub
│   │   ├── stats-section.tsx       # Server shell — dark bg
│   │   ├── cta-section.tsx         # Server shell — dark bg, form inside
│   │   └── footer-section.tsx      # (see layout/footer.tsx)
│   │
│   ├── animations/
│   │   ├── scroll-reveal.tsx       # "use client" — Framer Motion wrapper
│   │   └── animated-counter.tsx    # "use client" — GSAP counter
│   │
│   ├── forms/
│   │   └── contact-form.tsx        # "use client" — RHF form UI (no submit yet)
│   │
│   └── ui/
│       ├── button.tsx              # Server — static variant
│       ├── card.tsx                # Server — static variant
│       └── badge.tsx               # Server — label/tag
│
└── lib/
    ├── gsap-config.ts              # EXISTS — do not modify
    └── content/
        ├── site.ts                 # NEW — nav links, footer copy, global strings
        └── verticales.ts           # NEW — 4 vertical data objects
```

### Pattern 1: ScrollReveal Wrapper (Framer Motion)

The canonical pattern for all section entrance animations. Server Component sections stay pure — they render static HTML. Only the specific animated wrapper element becomes a client component.

```typescript
// src/components/animations/scroll-reveal.tsx
'use client'
import { motion, MotionConfig } from 'motion/react'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

Usage in a Server Component section:
```typescript
// src/components/sections/hero-section.tsx (Server Component — no "use client")
import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { Section } from '@/components/layout/section'

export function HeroSection() {
  return (
    <section className="flex min-h-svh items-center justify-center bg-bg">
      <div className="text-center">
        <ScrollReveal>
          <h1 className="text-6xl font-extrabold tracking-tight lg:text-8xl">
            Tu negocio.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="text-6xl font-extrabold tracking-tight lg:text-8xl">
            Nuestra inteligencia.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-xl text-text-secondary">...</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

### Pattern 2: AnimatedCounter (GSAP)

GSAP counter with ScrollTrigger. Uses `useGSAP` from the centralized config — never import GSAP directly.

```typescript
// src/components/animations/animated-counter.tsx
'use client'
import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-config'

interface AnimatedCounterProps {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
}

export function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counterRef.current,
        start: 'top 80%',
        once: true,
      },
      onUpdate() {
        if (counterRef.current) {
          counterRef.current.textContent =
            prefix + Math.round(obj.val).toLocaleString('es-CL') + suffix
        }
      },
    })
  }, { scope: counterRef })

  return (
    <span ref={counterRef}>{prefix}0{suffix}</span>
  )
}
```

### Pattern 3: Navbar with Scroll Detection

```typescript
// src/components/layout/navbar.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 h-16 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-white/90 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      {/* nav content */}
    </header>
  )
}
```

**Important:** Navbar must be added to `app/layout.tsx` (not `page.tsx`) so it persists across pages.

### Pattern 4: HowItWorks GSAP Pin + Scrub

```typescript
// src/components/sections/how-it-works-section.tsx
'use client'
import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-config'

export function HowItWorksSectionAnimated() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const steps = gsap.utils.toArray<HTMLElement>('.how-step')

    // Pin the section for the duration of steps reveal
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${steps.length * 400}`,
      pin: true,
      scrub: 1,
    })

    // Animate each step in
    steps.forEach((step, i) => {
      gsap.from(step, {
        opacity: 0,
        y: 40,
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top+=${i * 400} top`,
          end: `top+=${(i + 1) * 400} top`,
          scrub: 1,
        },
      })
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* steps */}
    </div>
  )
}
```

### Pattern 5: CSS Marquee (no JS)

```css
/* in globals.css or component module */
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-track {
  animation: marquee-scroll 20s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation-play-state: paused; }
}
```

```typescript
// src/components/sections/marquee-section.tsx (Server Component possible)
export function MarqueeSection() {
  const logos = [...logos, ...logos] // duplicate for seamless loop
  return (
    <div className="overflow-hidden py-12">
      <div className="flex w-max marquee-track gap-16">
        {logos.map((logo, i) => (
          <Image key={i} src={logo.src} alt={logo.alt} width={120} height={40} />
        ))}
      </div>
    </div>
  )
}
```

### Pattern 6: prefers-reduced-motion Global Config

Add `MotionConfig` at the root level in `app/layout.tsx`:

```typescript
// app/layout.tsx — add MotionConfig wrapper
import { MotionConfig } from 'motion/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ borderTopStyle: 'solid' }}>
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  )
}
```

GSAP reduced motion check (add inside `useGSAP` blocks):
```typescript
const mm = gsap.matchMedia()
mm.add('(prefers-reduced-motion: no-preference)', () => {
  // full animation
})
mm.add('(prefers-reduced-motion: reduce)', () => {
  // jump to final state immediately
  if (counterRef.current) counterRef.current.textContent = prefix + target + suffix
})
```

### Pattern 7: Content Data Files

```typescript
// src/lib/content/verticales.ts
export interface Vertical {
  slug: string
  name: string
  tagline: string
  description: string
  metrics?: string[]
  clients?: string[]
  icon: string // lucide icon name or SVG path
}

export const verticales: Vertical[] = [
  {
    slug: 'bots',
    name: 'Bots Conversacionales',
    tagline: 'Tu negocio responde solo. Siempre.',
    description: 'Chatbots WhatsApp con IA que atienden, venden y derivan 24/7...',
    metrics: ['70-85% resolución automática', '30-50% reducción costos'],
    clients: ['Clínica Las Condes', 'Seguros CLC'],
    icon: 'message-circle',
  },
  // ... 3 more
]
```

### Anti-Patterns to Avoid

- **Hero uses `whileInView`:** The Hero is above the fold — `whileInView` fires only when element enters viewport. Use `initial/animate` for hero (fires on mount, not scroll).
- **Navbar in `page.tsx`:** Navbar in the home page component unmounts when navigating to other pages. Put it in `layout.tsx`.
- **GSAP on same element as Framer:** If a card has `whileHover` from Framer, never add a GSAP ScrollTrigger to the same card wrapper — use a parent or child element for GSAP.
- **Raw `useEffect` for GSAP:** All GSAP code must use `useGSAP()`. Raw `useEffect` does not handle Next.js route cleanup.
- **`ScrollTrigger.killAll()` in cleanup:** Too broad. Use `gsap.context()` scope via `useGSAP` instead.
- **Tailwind `hover:scale-X` on animated elements:** Tailwind v4 `transform` CSS var conflicts with GSAP/Framer inline styles. Use `whileHover={{ scale: 1.02 }}` instead.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Entrance animations | Custom CSS transition system | Framer Motion `whileInView` | whileInView handles IntersectionObserver, timing, cleanup automatically |
| Counter animation | `setInterval` count-up | GSAP `gsap.to()` with `onUpdate` | GSAP handles easing, frame-rate independence, and ScrollTrigger sync |
| Scroll detection for navbar | `scroll` event + `getBoundingClientRect` | `window.scrollY > 10` with passive listener | Simple and sufficient; avoid over-engineering |
| Infinite marquee | `requestAnimationFrame` loop | CSS `@keyframes` + `animation: infinite` | CSS runs on compositor thread, never freezes on tab switch |
| Mobile breakpoint detection | `window.innerWidth` resize listener | `useMediaQuery` hook or Tailwind responsive classes | Avoids hydration mismatch for SSR |
| Form state management | `useState` for each field | `react-hook-form` | RHF handles validation, dirty state, error display, uncontrolled pattern |

**Key insight:** Every custom solution in this domain (scroll counters, marquees, entrance animations) has at least one non-obvious edge case: tab visibility, resize events, cleanup on unmount, hydration mismatch. The libraries handle all of these.

---

## Common Pitfalls

### Pitfall 1: Hero animated with `whileInView` instead of `animate`
**What goes wrong:** `whileInView` only fires when the element enters the viewport. The Hero section IS the viewport on load — so if the initial state is `opacity: 0`, the page opens to a blank white screen.
**Why it happens:** Developers copy `whileInView` from lower sections to the Hero by mistake.
**How to avoid:** Use `initial={{ opacity: 0, y: 30 }}` + `animate={{ opacity: 1, y: 0 }}` for Hero. `whileInView` is correct for all sections below the fold.
**Warning signs:** Hero appears blank for 0.5s on page load.

### Pitfall 2: Navbar not in layout — disappears on navigation
**What goes wrong:** Navbar placed in `app/page.tsx` unmounts when the user navigates to `/verticales/bots` or `/nosotros`.
**How to avoid:** Navbar and Footer both belong in `app/layout.tsx`. The home page's `page.tsx` renders the 8 landing sections only.

### Pitfall 3: GSAP ScrollTrigger not refreshed after layout shift
**What goes wrong:** The HowItWorks pin calculates scroll offsets when the component mounts. If images or fonts load after mount, they shift the layout — the pin starts at the wrong scroll position.
**How to avoid:** Call `ScrollTrigger.refresh()` after a small delay or after the `fonts.ready` promise: `document.fonts.ready.then(() => ScrollTrigger.refresh())`.

### Pitfall 4: `MotionConfig` missing — animations run for reduced-motion users
**What goes wrong:** Without `MotionConfig reducedMotion="user"`, Framer Motion animations run for all users including those who have set `prefers-reduced-motion: reduce` in their OS.
**How to avoid:** Wrap `{children}` in `app/layout.tsx` with `<MotionConfig reducedMotion="user">`. This is a one-line addition.

### Pitfall 5: Marquee duplicated array causes key collision
**What goes wrong:** `[...logos, ...logos].map((logo, i) => <Image key={i} />)` — React keys are `0, 1, 2, 0, 1, 2`. React may reuse DOM nodes incorrectly.
**How to avoid:** Use a unique key: `key={${logo.slug}-${i}}` or generate IDs. The `i` index alone is not unique across duplicated arrays.

### Pitfall 6: CTA form wired to action before Phase 5
**What goes wrong:** Form `action` or `onSubmit` calls a Server Action that doesn't exist yet → build error or runtime 404.
**How to avoid:** Phase 2 builds form UI only. Submit handler should be a no-op or display a disabled state. Import of `submitContact` action is deferred to Phase 5.

### Pitfall 7: `next/image` without `width`/`height` causes CLS
**What goes wrong:** Client logos in the marquee section without `width` and `height` cause layout shifts as the browser reserves no space before images load.
**How to avoid:** All `<Image>` tags need explicit `width` and `height` (e.g., `width={120} height={40}`). Use `priority={false}` since marquee logos are below fold.

---

## Code Examples

### Framer Motion stagger pattern (verified)

```typescript
// Source: motion.dev/docs/react (whileInView, stagger)
'use client'
import { motion } from 'motion/react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function VerticalesSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {verticales.map((v) => (
        <motion.div key={v.slug} variants={itemVariants}>
          <VerticalCard vertical={v} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### GSAP matchMedia for mobile/reduced-motion (verified)

```typescript
// Source: gsap.com/docs/v3/GSAP/gsap.matchMedia()
useGSAP(() => {
  const mm = gsap.matchMedia()

  mm.add(
    {
      isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      isMobile: '(max-width: 767px)',
      isReduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isDesktop, isReduced } = context.conditions!

      if (isReduced) {
        // Jump to final state
        return
      }

      if (isDesktop) {
        // Full pin + scrub animation
        ScrollTrigger.create({ /* ... */ })
      } else {
        // Mobile: simple fade only, no pin
      }
    }
  )
}, { scope: containerRef })
```

### Section composition in page.tsx

```typescript
// src/app/page.tsx
import { Navbar } from '@/components/layout/navbar'
import { HeroSection } from '@/components/sections/hero-section'
import { MarqueeSection } from '@/components/sections/marquee-section'
import { VerticalesSection } from '@/components/sections/verticales-section'
import { HowItWorksSection } from '@/components/sections/how-it-works-section'
import { StatsSection } from '@/components/sections/stats-section'
import { CTASection } from '@/components/sections/cta-section'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <VerticalesSection />
      <HowItWorksSection />
      <StatsSection />
      <CTASection />
    </main>
  )
}
```

Navbar and Footer go in `layout.tsx`, not `page.tsx`.

---

## Project Constraints (from CLAUDE.md)

These directives from the project CLAUDE.md are mandatory. The planner must verify every task complies.

| Directive | Source | Enforcement |
|-----------|--------|-------------|
| Stack: Next.js + Tailwind v4 + Framer Motion + GSAP. No Three.js, no Lenis. | CLAUDE.md Constraints | Phase 2 must not add Three.js, Lenis, or any alternative animation library |
| Design: Minimalist, Linear.app-inspired. White backgrounds, black typography, generous whitespace. | CLAUDE.md Constraints | Section backgrounds: `#ffffff` or `#f9fafb`. Dark sections: `#09090B`. No blues or violets. |
| Typography: Geist Sans primary, Inter fallback. Headlines 800-900 weight, tight tracking. | CLAUDE.md Constraints | `font-extrabold` (`font-weight: 800`) for h1/h2. `tracking-tight`. Already configured in globals.css. |
| Colors: #ffffff, #f9fafb, #09090B, #111827, #6B7280, #000000. | CLAUDE.md Constraints | All tokens defined in globals.css @theme. Use CSS var names (`bg-bg`, `bg-dark`, `text-text-secondary`). |
| Package manager: npm | CLAUDE.md Constraints | Use `npm install`, not `pnpm` or `yarn` |
| No code migration from landing-belgrano | CLAUDE.md Constraints | All components must be written fresh |
| GSD workflow enforcement: use `/gsd:execute-phase`, not direct edits | CLAUDE.md GSD Workflow | Internal to GSD system — already satisfied by this planning process |
| Server Components by default, `"use client"` only for animation/interaction | CONTEXT.md Code Context | All section shells are Server Components. Only animation wrappers and Navbar get `"use client"` |
| GSAP uses `useGSAP()` hook only — no raw `useEffect` for GSAP | CONTEXT.md Code Context | Every GSAP component must import from `@/lib/gsap-config` and use `useGSAP` |
| Tailwind v4 CSS-first — tokens via @theme in globals.css | CONTEXT.md Code Context | No inline color values. Always use Tailwind class names for brand colors |

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import { motion } from 'framer-motion'` | `import { motion } from 'motion/react'` | framer-motion v12 (2024) | Old import still works but new code should use `motion/react` |
| `useEffect` for GSAP | `useGSAP()` from `@gsap/react` | @gsap/react v2 (2023) | Auto-cleanup on unmount — prevents memory leaks in Next.js routing |
| CSS `will-change: transform` on all animated elements | Apply `will-change` only during active animation, remove after | 2024 best practice | Reduces GPU memory pressure on mobile |
| `ScrollTrigger.killAll()` for cleanup | `gsap.context().revert()` via `useGSAP` scope | @gsap/react v2 | Scoped cleanup prevents killing other components' triggers |
| `next-seo` package | `export const metadata` in each `page.tsx` | Next.js 13+ App Router | No package needed — built into framework |

**Deprecated/outdated:**
- `MotionConfig` from `framer-motion/dist/framer-motion.cjs`: import from `motion/react` only
- GSAP `TweenMax`/`TweenLite`: consolidated into `gsap` main package since v3

---

## Environment Availability

Step 2.6: No new external dependencies for Phase 2. All CLI tools and runtime dependencies were verified in Phase 1.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js dev/build | Verified Phase 1 | — | — |
| npm | package installs | Verified Phase 1 | — | — |
| framer-motion | ANIM-01, ANIM-04, ANIM-05 | In package.json | ^12.38.0 | — |
| gsap + @gsap/react | ANIM-02, ANIM-03 | In package.json | ^3.14.2 / ^2.1.2 | — |
| react-hook-form | LAND-07 form UI | Not installed | — | Install in Phase 2 |
| zod | LAND-07 schema | Not installed | — | Install in Phase 2 |
| @hookform/resolvers | LAND-07 adapter | Not installed | — | Install in Phase 2 |

**Missing dependencies with no fallback:** none — all missing items can be installed with `npm install`.

**Client logos (public assets):** Logo image files for CLC, Seguros CLC, TNT Sports/Warner Bros, AFP Modelo must exist in `public/logos/` before MarqueeSection can render. If not available, use text-only fallback or placeholder SVG rectangles during development.

---

## Validation Architecture

`workflow.nyquist_validation` is `true` in config.json — this section is required.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — no test files, no jest.config, no vitest.config |
| Config file | None — Wave 0 must create |
| Quick run command | `npm test -- --passWithNoTests` (after Wave 0 setup) |
| Full suite command | `npm test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LAND-01 | Navbar renders with logo + nav links + CTA | unit | `npm test -- -t "Navbar"` | Wave 0 |
| LAND-02 | Hero section renders headline, subtitle, CTA | unit | `npm test -- -t "HeroSection"` | Wave 0 |
| LAND-03 | Marquee renders all logo images | unit | `npm test -- -t "MarqueeSection"` | Wave 0 |
| LAND-04 | Verticales renders 4 cards with correct slugs | unit | `npm test -- -t "VerticalesSection"` | Wave 0 |
| LAND-05 | HowItWorks renders 3 steps | unit | `npm test -- -t "HowItWorksSection"` | Wave 0 |
| LAND-06 | StatsSection renders 4 stat items | unit | `npm test -- -t "StatsSection"` | Wave 0 |
| LAND-07 | CTA form renders name/email/company/message fields | unit | `npm test -- -t "ContactForm"` | Wave 0 |
| LAND-08 | Footer renders logo, tagline, copyright | unit | `npm test -- -t "Footer"` | Wave 0 |
| ANIM-01 | ScrollReveal renders children | unit | `npm test -- -t "ScrollReveal"` | Wave 0 |
| ANIM-05 | MotionConfig present in layout | unit | `npm test -- -t "MotionConfig"` | Wave 0 |
| ANIM-02, ANIM-03, ANIM-04, ANIM-06 | GSAP/scroll animations | manual-only | Visual inspection + Lighthouse mobile | — |

**Manual-only justification:** ANIM-02/ANIM-03 (GSAP ScrollTrigger) and ANIM-06 (mobile budget) require a real browser environment with scroll simulation. jsdom does not support `IntersectionObserver` or `scrollY` — automated testing for these behaviors is not reliable without Playwright (deferred to Phase 7 polish).

### Sampling Rate
- **Per task commit:** `npm test -- --passWithNoTests` (quick, no browser needed)
- **Per wave merge:** `npm test` (full suite)
- **Phase gate:** Full suite green + manual visual check of all 8 sections on desktop and mobile before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `jest.config.ts` or `vitest.config.ts` — test framework config
- [ ] `package.json` test script — `"test": "vitest"` or `"test": "jest"`
- [ ] `src/__tests__/components/` — test directory
- [ ] Framework install: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom`

**Recommended framework:** Vitest (faster than Jest, native ESM support for Next.js 16, no babel config needed). Use `jsdom` as environment.

---

## Open Questions

1. **Client logo files**
   - What we know: Logos needed for CLC, Seguros CLC, TNT Sports/Warner Bros, AFP Modelo
   - What's unclear: Are SVGs or PNGs available in the project assets? Is `public/logos/` populated?
   - Recommendation: Check `public/` directory before building MarqueeSection. If empty, use text-only placeholder logos initially; real assets can be dropped in without code changes.

2. **HowItWorks mobile behavior**
   - What we know: GSAP pin+scrub is the locked desktop pattern
   - What's unclear: ANIM-06 says "simplified animations on smaller viewports" — should HowItWorks become a static step list on mobile, or a simple fade-in stagger?
   - Recommendation: On mobile (< 768px), render steps as a vertical static timeline with Framer Motion stagger entrance. The GSAP scrub is disabled. This satisfies ANIM-06 without a separate mobile component.

3. **Verticales section `sections/` sub-folder**
   - What we know: `VerticalesSection` is Server Component but has animated children
   - What's unclear: Whether the whole section goes in `components/sections/verticales-section.tsx` or splits into a server shell + client card grid
   - Recommendation: Server shell renders the section heading. Client `VerticalesCards` component handles `motion.div` stagger. Same pattern as other sections.

---

## Sources

### Primary (HIGH confidence)
- Existing codebase: `src/lib/gsap-config.ts`, `src/components/layout/container.tsx`, `src/components/layout/section.tsx`, `src/app/layout.tsx`, `src/app/globals.css` — verified Phase 1 output
- `.planning/research/STACK.md` — stack verified against npm registry 2026-03-31
- `.planning/research/ARCHITECTURE.md` — architecture verified against Next.js official docs
- `.planning/research/PITFALLS.md` — pitfalls verified against GSAP forums + official docs
- `CLAUDE-webpage-belgrano.md` — authoritative content spec (all copy pre-defined)
- `.planning/phases/02-landing-page/02-CONTEXT.md` — locked user decisions

### Secondary (MEDIUM confidence)
- GSAP `useGSAP` + `matchMedia` patterns: gsap.com/resources/React/ + gsap.com/docs/v3/GSAP/gsap.matchMedia()
- Framer Motion v12 `whileInView` + `MotionConfig`: motion.dev/docs/react
- CSS marquee pattern: community-verified across multiple sources, consistent with CSS spec

### Tertiary (LOW confidence — not applicable)
None — all findings sourced from HIGH or MEDIUM confidence sources.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified in package.json; 3 new installs confirmed via npm registry in Phase 1 stack research
- Architecture: HIGH — patterns derived from existing Phase 1 code + official Next.js App Router docs
- Animation patterns: HIGH — derived from established GSAP/Framer docs and existing gsap-config.ts
- Pitfalls: HIGH — sourced from PITFALLS.md (Phase 1 research) + Hero/Navbar-specific pitfalls from direct code analysis

**Research date:** 2026-03-31
**Valid until:** 2026-04-30 (stable libraries — Framer Motion, GSAP, Next.js release cadence is slow for breaking changes)
