# Domain Pitfalls

**Domain:** Agency corporate website — Next.js + Tailwind CSS v4 + Framer Motion + GSAP
**Project:** Webpage Belgrano
**Researched:** 2026-03-31

---

## Critical Pitfalls

Mistakes that cause rewrites, major regressions, or broken builds.

---

### Pitfall 1: GSAP ScrollTrigger Hydration Errors in Next.js 15

**What goes wrong:** GSAP's ScrollTrigger adds inline styles (e.g., `borderTopStyle: solid`) to the `<body>` tag during client-side rendering. Next.js 15's enhanced hydration detection catches this server/client mismatch and throws hydration errors in production, sometimes causing entire sections to not animate.

**Why it happens:** GSAP is a vanilla JS library that directly mutates the DOM. SSR renders clean HTML; GSAP then patches the DOM on the client. The diff is caught by React's reconciler.

**Consequences:** Hydration errors appear in the console, certain animations silently fail, and in worst cases React bails out of the component tree entirely.

**Prevention:**
1. Add `style={{ borderTopStyle: 'solid' }}` to the `<body>` tag in `layout.tsx` so SSR and CSR outputs match.
2. Always mark animation components with `'use client'` directive.
3. Use `useGSAP()` from `@gsap/react` instead of bare `useEffect` — it implements `useIsomorphicLayoutEffect` internally and handles SSR gracefully.
4. Register plugins once: call `gsap.registerPlugin(ScrollTrigger)` in a single shared config file (e.g., `lib/gsap-config.ts`), not inside every component.

**Detection:** `Error: Hydration failed because the initial UI does not match` in browser console on first load.

**Phase:** Address during Phase 1 (foundation/setup) before any animation work begins.

---

### Pitfall 2: GSAP ScrollTrigger Memory Leaks on Page Navigation

**What goes wrong:** ScrollTrigger instances accumulate across soft navigations (Next.js App Router client-side transitions). Each navigation creates new ScrollTriggers without killing the previous ones. After 3-4 page visits, animations stutter, CPU spikes, and the browser tab becomes sluggish.

**Why it happens:** GSAP ScrollTriggers are imperative — they must be manually killed. Unlike Framer Motion's declarative cleanup, GSAP relies on the developer to return a cleanup function or use `useGSAP()`'s automatic revert.

**Consequences:** Progressive performance degradation, visual glitches (animations fire multiple times), memory-induced tab crashes on mobile.

**Prevention:**
1. Use `useGSAP()` exclusively — it wraps `gsap.context()` which auto-reverts all animations when the component unmounts.
2. Never use `ScrollTrigger.killAll()` as a cleanup strategy — it's too broad and kills triggers belonging to other components.
3. Keep ScrollTrigger instances scoped to their component via `gsap.context(ctx => { ... }, containerRef)`.
4. Call `ScrollTrigger.refresh()` once after all DOM is stable (e.g., after fonts load), not on every render.

**Detection:** Open DevTools Performance tab. Record while navigating between pages. Look for growing number of scroll listeners and increasing memory.

**Phase:** Address during Phase 2 (animations), enforce as a pattern from the first animation component.

---

### Pitfall 3: Framer Motion + GSAP Animating the Same DOM Element

**What goes wrong:** When both libraries apply `transform` or `opacity` to the same element, they overwrite each other's inline styles. The last one to run wins — creating race conditions, flickering, and unpredictable visual state.

**Why it happens:** Both libraries use inline `style` attributes on the element. GSAP sets `transform: translate(...)` imperatively; Framer Motion sets it declaratively via React's reconciler. They fight for ownership of the same CSS property.

**Consequences:** Sections appear to animate, then snap to wrong positions. Hover states conflict with scroll triggers. Difficult to debug because behavior is order-dependent.

**Prevention:**
- Divide responsibilities clearly by element type:
  - **Framer Motion**: entrance animations (`whileInView`, `AnimatePresence`), hover/tap states, page transitions
  - **GSAP**: counter animations (Stats section), scroll-scrubbed progress effects, marquee if CSS is insufficient
- Never apply both libraries to the same DOM node.
- If a GSAP element needs an entrance animation, use GSAP for both the entrance AND the scroll effect.

**Detection:** Elements snapping unexpectedly after scroll. `transform` values flickering in browser DevTools Elements panel.

**Phase:** Establish division-of-responsibility contract before Phase 2 begins.

---

### Pitfall 4: Tailwind v4 `@theme` Config Breaking GSAP/Framer Inline Style Overrides

**What goes wrong:** Tailwind v4's CSS-first `@theme` approach generates CSS custom properties (e.g., `--color-black`) that conflict with inline `style` attributes injected by animation libraries. Specifically, Tailwind v4 changes how `transform` utilities compose — `transition-transform` now includes `scale` by default — which breaks `scale-X` animations silently.

**Why it happens:** Tailwind v4 moved from utility class concatenation to CSS variable composition. The `transform` property is now a CSS variable bundle, not a single value. GSAP overrides the full `transform` inline style, nuking Tailwind's composited values.

**Consequences:** Scale animations stop working. Button hover effects (scale transitions) snap instead of animate. Tailwind transform utilities and GSAP can produce invisible conflicts.

**Prevention:**
1. For elements GSAP animates: avoid Tailwind transform utilities (`scale-`, `rotate-`, `translate-`). Use GSAP to handle all transforms.
2. For Framer Motion elements: use Framer's `whileHover={{ scale: 1.02 }}` instead of Tailwind's `hover:scale-102`.
3. Test `transition-transform` and scale utilities early — if they behave unexpectedly, switch to `transition-all` as a diagnostic step.
4. Review Tailwind v4 upgrade guide's breaking changes section on transform utilities before writing any animation CSS.

**Detection:** Scale/rotate transitions that worked in v3 fail silently in v4. Button presses don't animate.

**Phase:** Address during Phase 1 (setup). Verify transform behavior with a smoke test before writing production animations.

---

## Moderate Pitfalls

---

### Pitfall 5: Missing `metadataBase` Breaks Open Graph Images

**What goes wrong:** Without `metadataBase` set in the root `layout.tsx`, Open Graph image URLs are relative (e.g., `/og-image.png`). Social platforms (LinkedIn, Twitter, WhatsApp) cannot fetch relative URLs, so link previews show no image. This is especially damaging for a B2B agency site where sharing a meeting proposal or a vertical page link with no thumbnail looks unprofessional.

**Prevention:**
```ts
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://belgrano.cl'),
  ...
}
```
Add this at project initialization. Also set `1200x630` OG images for each vertical page.

**Phase:** Phase 1 (setup) — add to the base layout, never defer.

---

### Pitfall 6: Duplicate Metadata Across All Pages Kills SEO

**What goes wrong:** All pages share the same `<title>` and `<meta description>` — a common mistake when the layout metadata is copy-pasted to each page without customization. Google interprets this as thin duplicate content.

**Prevention:**
- Use the `title.template` pattern: `{ template: '%s | Belgrano', default: 'Belgrano — IA, Marketing & Estrategia' }` in root layout.
- Each page exports its own `metadata` object with a unique title + description.
- Each vertical page (Bots, DOOH, Producciones, Academy) gets tailored metadata targeting its specific B2B buyer keyword.

**Phase:** Phase 2 (pages) — enforce as a checklist item when building each page.

---

### Pitfall 7: Scroll-Triggered Animations Firing on Mobile Destroy INP and CLS

**What goes wrong:** Complex scroll animations (multiple `ScrollTrigger` instances, Framer `whileInView` on many elements) are built and tested on desktop. On mobile, they cause jank (INP > 200ms) and layout shifts (CLS > 0.1) because low-end CPUs cannot sustain 60fps paint while also handling scroll events.

**Why it happens:** Mobile devices have 3-5x less GPU/CPU headroom. Scroll animation listeners run on the main thread. Each active `ScrollTrigger` consumes listener budget.

**Consequences:** Google Lighthouse mobile score drops below 50. Core Web Vitals fail (INP, CLS), hurting Google ranking. Prospects visiting on phone experience a broken, slow site — the opposite of the Linear.app-inspired quality signal.

**Prevention:**
1. Respect `prefers-reduced-motion`: wrap all Framer animations with `MotionConfig reducedMotion="user"`.
2. Apply `will-change: transform` sparingly — only on active animation targets, remove after animation ends.
3. Limit concurrent `whileInView` animations per viewport: maximum 3-4 active at once.
4. For mobile: reduce animation complexity with a `useMediaQuery('(max-width: 768px)')` check — simpler fade-in instead of slide + scale + blur.
5. Animate only `transform` and `opacity` — never `width`, `height`, `top`, `margin`.

**Detection:** Run Lighthouse with mobile throttling. Check DevTools Performance > Frames for red frames. Test on a real mid-range Android device.

**Phase:** Phase 2 (animations) — build mobile-first animation budget from the start, not as a post-launch fix.

---

### Pitfall 8: Contact Form Has No Rate Limiting — Invites Spam

**What goes wrong:** The Resend-powered contact form (Server Action or API Route) has no request rate limiting. Bots discover the endpoint and flood it with fake leads, exhausting the free Resend tier (100 emails/day), polluting the inbox, and making real leads hard to find.

**Why it happens:** Server Actions are public endpoints. `fetch('/api/contact', ...)` is the same as any other HTTP call — there's no built-in protection.

**Prevention:**
- Add IP-based rate limiting: max 3 submissions per IP per 10 minutes using in-memory rate limiting (sufficient for a low-traffic agency site).
- Add a honeypot field: a hidden `<input name="website" />` that bots fill but real users don't. Reject submissions where this field is non-empty.
- Validate all inputs server-side (email format, message length limits) before calling Resend.

**Phase:** Phase 3 (contact form) — implement rate limiting and honeypot before deploying the form endpoint.

---

### Pitfall 9: Geist Sans Not Self-Hosted Correctly Causes FOUT and CLS

**What goes wrong:** Geist Sans loaded without `next/font` causes Flash of Unstyled Text (FOUT) — the headline snaps from system font to Geist on load, creating a visible layout shift. With 800-900 weight headlines as the visual core of the design, this is jarring.

**Prevention:**
- Use `next/font/google` (or `next/font/local` if self-hosting the `.woff2` files) — it eliminates CLS via `size-adjust` and self-hosts the font to avoid Google Fonts privacy/performance issues.
- Load only the weights actually used: 400, 500, 700, 800 — skip intermediate weights.
- Set `display: 'swap'` for body text, `display: 'block'` for headline weights to prevent unstyled flash on critical text.

**Detection:** Run Lighthouse. CLS score > 0.1 often points to font loading. Check Network tab for font file load timing.

**Phase:** Phase 1 (setup) — configure fonts before building any UI.

---

## Minor Pitfalls

---

### Pitfall 10: `'use client'` Missing on Animation Components Breaks App Router Build

**What goes wrong:** Framer Motion's `motion` components and GSAP's `useGSAP` hook are client-only. Forgetting `'use client'` on a component that imports either causes a build error or silent runtime failure in Next.js App Router.

**Prevention:** Add `'use client'` at the top of every file that imports `motion`, `useAnimation`, `useGSAP`, or `useRef` for DOM access. Create a project convention: animation components live in `components/animations/` and always have `'use client'`.

**Phase:** Phase 1 (setup) — establish file structure convention.

---

### Pitfall 11: Marquee Built with JS Scroll Instead of CSS Animation Is Fragile

**What goes wrong:** Client logo marquee implemented with JavaScript scroll manipulation (requestAnimationFrame or GSAP infinite tween) can freeze on tab switch/return because browsers pause `rAF` on hidden tabs. CSS `@keyframes` scroll animations continue correctly.

**Prevention:** Use CSS `animation: scroll-x linear infinite` for the marquee. This is also more performant (GPU compositor) and accessible (pauses on `prefers-reduced-motion`).

**Phase:** Phase 2 (homepage sections) — implement marquee in CSS before reaching for GSAP.

---

### Pitfall 12: Vercel Environment Variable Missing at Deploy Time Breaks Email

**What goes wrong:** `RESEND_API_KEY` exists in `.env.local` during development but is never set in the Vercel project dashboard. The contact form silently fails in production — no email is sent, no error is shown to the user.

**Prevention:**
- Add all required environment variables to Vercel dashboard before the first deploy.
- Add a startup check in the contact route: `if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured')` to fail loudly.
- Keep a `.env.example` file listing all required keys without values — doubles as deploy checklist.

**Phase:** Phase 3 (contact form) — verify env vars at deploy time, not after.

---

### Pitfall 13: `tailwindcss-animate` (Shadcn dep) Not Compatible with Tailwind v4

**What goes wrong:** If any Shadcn/ui components are added later (even for a single UI element), `tailwindcss-animate` — its animation plugin dependency — is not compatible with Tailwind v4 out of the box. The plugin tries to add config via the v3 JavaScript API, which no longer works.

**Prevention:** This project intentionally avoids Shadcn/ui. If a UI component library is ever needed, verify v4 compatibility before adding. For custom animations, define them directly in `@theme` in CSS.

**Phase:** Ongoing — flag in any future dependency additions.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Project setup / layout | Missing `metadataBase`, font FOUT (Pitfalls 5, 9) | Set metadataBase and next/font in layout.tsx before any page work |
| GSAP/Framer Motion setup | Hydration errors, memory leaks (Pitfalls 1, 2) | Use useGSAP(), centralize plugin registration, add body style fix |
| Animation implementation | Library DOM conflict, Tailwind transform clash (Pitfalls 3, 4) | Establish element ownership rules; no dual-library on same node |
| Homepage sections | Marquee fragility (Pitfall 11) | CSS-only marquee |
| All pages | Duplicate metadata (Pitfall 6) | title.template + unique metadata per page |
| Mobile testing | Animation performance, jank (Pitfall 7) | Mobile Lighthouse + real device test before each phase closes |
| Contact form | Spam/rate limiting, env vars (Pitfalls 8, 12) | Rate limit + honeypot + .env.example |
| Production deploy | CLS, missing keys, OG images (Pitfalls 5, 9, 12) | Pre-deploy checklist: fonts, metadataBase, RESEND_API_KEY, OG images |

---

## Sources

- [GSAP Hydration Error in Next.js 15 — GSAP Community](https://gsap.com/community/forums/topic/43281-hydration-error-in-nextjs-15/)
- [Optimizing GSAP in Next.js 15 — Thomas Augot, Medium](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [Interactive UI Animations with GSAP & Framer Motion — Medium](https://medium.com/@toukir.ahamed.pigeon/interactive-ui-animations-with-gsap-framer-motion-f2765ae8a051)
- [Framer Motion Accessibility — motion.dev](https://motion.dev/docs/react-accessibility)
- [Framer Motion Performance Tips — Tillitsdone](https://tillitsdone.com/blogs/framer-motion-performance-tips/)
- [Tailwind CSS v4 Debugging Common Mistakes — Medium](https://medium.com/@sureshdotariya/debugging-tailwind-css-4-in-2025-common-mistakes-and-how-to-fix-them-b022e6cb0a63)
- [Tailwind v4 Migration Guide — Official Docs](https://tailwindcss.com/docs/upgrade-guide)
- [Button animation broken in Tailwind v4 — GitHub Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/17787)
- [Complete Next.js SEO Guide — Easton Dev](https://eastondev.com/blog/en/posts/dev/20251219-nextjs-seo-guide/)
- [Next.js SEO Metadata & Optimization — Digital Applied](https://www.digitalapplied.com/blog/nextjs-seo-guide)
- [Protecting React Hook Form from spam — Arcjet](https://blog.arcjet.com/protecting-a-react-hook-form-from-spam/)
- [Rate Limiting Server Actions in Next.js — Next.js Weekly](https://nextjsweekly.com/blog/rate-limiting-server-actions)
- [Core Web Vitals Optimization 2024 — Vercel Knowledge Base](https://vercel.com/kb/guide/optimizing-core-web-vitals-in-2024)
- [Custom fonts with next/font — Vercel Blog](https://vercel.com/blog/nextjs-next-font)
- [Comparing GSAP and Framer Motion in Next.js — UAV Development Blog](https://blog.uavdevelopment.io/blogs/comparing-the-performance-of-framer-motion-and-gsap-animations-in-next-js)
