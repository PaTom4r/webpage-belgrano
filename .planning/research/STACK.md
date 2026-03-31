# Technology Stack

**Project:** Grupo Belgrano — Corporate Agency Website
**Researched:** 2026-03-31
**Confidence:** HIGH (all versions verified against live npm registry)

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.2.1 | Full-stack React framework | Latest stable as of March 2026. Turbopack is now default for dev and build — faster cold starts. App Router is fully mature. React Compiler integration (automatic memoization) ships built-in. No configuration needed beyond `create-next-app`. |
| React | 19.x (bundled with Next.js 16) | UI library | Comes with Next.js 16. React 19 Server Components are the default — zero JS for static sections (navbar, footer, most content) means faster LCP. |
| TypeScript | 6.0.2 | Type safety | Mandatory for maintainability. Next.js 16 ships with TypeScript support out of the box. |

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.2.2 | Utility-first CSS | v4 is CSS-first: no `tailwind.config.js`, configuration lives in CSS via `@theme`. Content detection is automatic. Production CSS is ~70% smaller than v3 (6-12 KB gzipped vs 20-30 KB). Matches the project's minimalist, whitespace-heavy design perfectly. |
| @tailwindcss/postcss | 4.2.2 | PostCSS integration | Required for Tailwind v4 in Next.js via PostCSS. Replaces `tailwindcss` + `autoprefixer` from v3. Single plugin in `postcss.config.mjs`. |

**Setup:** `postcss.config.mjs` with `{ plugins: { '@tailwindcss/postcss': {} } }`. In `globals.css`: `@import "tailwindcss"`. Define custom tokens (`--color-bg`, `--color-text`, etc.) via `@theme` block in the same CSS file.

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| framer-motion (motion) | 12.38.0 | Entrance animations, scroll triggers | Rebranded to "Motion" — import from `motion/react` in new code, `framer-motion` still works. Requires `'use client'` directive. Use `whileInView` for section entrances, `useScroll` + `useTransform` for parallax. Zero breaking changes in v12. |
| gsap | 3.14.2 | Counter animations, scroll-scrubbed sequences | Industry standard for timeline-based and scroll-synchronized animations. `ScrollTrigger` plugin handles the Stats section counters and any scrubbed horizontal/vertical sequences. Lighter than Framer for this use case. |
| @gsap/react | 2.1.2 | GSAP React integration | Provides `useGSAP()` hook — replaces `useEffect` for GSAP code, handles automatic cleanup on unmount and route changes. Prevents memory leaks across Next.js navigation. |

**GSAP Pattern:** Create a single `lib/gsap.ts` that calls `gsap.registerPlugin(ScrollTrigger)` once. Use `useGSAP()` in every component that needs GSAP. Call `ScrollTrigger.refresh()` after React renders to avoid layout glitches.

### Forms and Validation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-hook-form | 7.72.0 | Form state management | v7 stable; v8 is in beta (breaking changes), do not use yet. Uncontrolled components = minimal re-renders. Pairs with Zod via resolver. |
| zod | 4.3.6 | Schema validation | v4 is stable and is the industry standard for TypeScript-first validation. Validate both client-side (RHF resolver) and server-side (in the Server Action) with the same schema. |
| @hookform/resolvers | 5.2.2 | Bridge between RHF and Zod | Required adapter. v5.2.2 is verified compatible with RHF 7.x and Zod 4.x. |

**Pattern:** Define schema in `lib/schemas/contact.ts`. Use `zodResolver` in `useForm`. On submit, call a Server Action (`'use server'`) that validates with `schema.safeParse()` again before calling Resend. Never trust client-side validation alone.

### Email Delivery

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| resend | 6.10.0 | Email API | Purpose-built for developers. Free tier covers a startup's contact form volume easily. Official Next.js integration with Server Actions. Configured domain on belgrano.cl for trusted deliverability. |
| react-email | 5.2.10 | Email template rendering | React component syntax for email templates. `npx react-email dev` for local preview. Eliminates raw HTML strings. Maintained by the Resend team — guaranteed compatibility. |

### SEO

Next.js 16 handles SEO natively in the App Router — no third-party library needed.

| Capability | How | Notes |
|------------|-----|-------|
| Title, description, OG | `export const metadata` or `generateMetadata()` in each `page.tsx` | Built-in. No `next-seo` needed in 2026. |
| Open Graph images | `opengraph-image.png` static file or `opengraph-image.tsx` dynamic | Place per route for per-page OG cards. |
| Structured data (JSON-LD) | Inline `<script type="application/ld+json">` in Server Component | Use `Organization` + `WebSite` schema on root layout, `Service` schema on vertical pages. |
| Sitemap | `app/sitemap.ts` returning `MetadataRoute.Sitemap` | Auto-served at `/sitemap.xml`. No package needed. |
| robots.txt | `app/robots.ts` returning `MetadataRoute.Robots` | Auto-served at `/robots.txt`. No package needed. |
| Canonical URLs | `alternates.canonical` in metadata object | Prevents duplicate content issues. |

**Do NOT install `next-seo`** — it is a v4/Pages Router pattern. Everything it provides is now built into Next.js 16 App Router natively.

### Image Optimization

| Capability | How | Notes |
|------------|-----|-------|
| next/image | Built-in Next.js component | Auto-converts to WebP/AVIF, lazy-loads, prevents CLS via `width`/`height` or `fill`. Use for all client logos, team photos, vertical screenshots. |
| sharp | 0.34.5 | Server-side image processing | Installed as a dependency — Next.js uses it automatically on Vercel. No configuration needed. Add as `npm install sharp` to ensure it is in `dependencies` (not dev). |
| formats | `['image/avif', 'image/webp']` in `next.config.ts` | AVIF has better compression but WebP has broader support. Declare both and Next.js negotiates via `Accept` header. |

**Pattern:** All images go through `next/image`. Never use a plain `<img>` tag. For the logo marquee, use `next/image` with `priority={false}` since they are below the fold.

### Analytics

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @vercel/analytics | 2.0.1 | Page view and event tracking | Zero-config on Vercel. Privacy-first (no cookies, no GDPR banner needed). Free on Hobby plan up to 50K events/month — more than enough for a B2B agency site. Add `<Analytics />` to root layout. Done. |

**Decision rationale:** Plausible ($9/month) and PostHog (overkill for a marketing site) are unnecessary here. Vercel Analytics covers the actual need: knowing which pages get traffic and where users come from. If conversion funnel analysis becomes needed later, PostHog can be added without removing Vercel Analytics.

### Deployment

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | — | Hosting and CI/CD | First-class Next.js support (same team). Zero-config deploy. Automatic preview URLs per branch. Domain management for belgrano.cl is straightforward. Edge CDN included. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 16 | Astro | Astro is excellent for static sites but Framer Motion + GSAP work better in React. The contact form Server Action needs Node runtime. Next.js is the correct choice given animation requirements. |
| Styling | Tailwind v4 | Tailwind v3 | v3 is in maintenance mode. v4 has smaller output and CSS-first config. New project should start on v4. |
| Animation | framer-motion + GSAP | GSAP only | GSAP alone lacks the React-native `whileInView` / variant system that Framer Motion provides for component-level entrance animations. Using both is the industry standard for agency sites. |
| Animation | framer-motion + GSAP | Lenis + GSAP | Explicitly out of scope. Native scroll is sufficient; Lenis adds complexity without meaningful benefit on a multi-page corporate site. |
| Email | Resend + react-email | Nodemailer + SendGrid | Nodemailer requires SMTP config and has no preview tooling. SendGrid is enterprise-oriented and more expensive. Resend + react-email is the current standard for Next.js projects. |
| Forms | react-hook-form v7 | react-hook-form v8 | v8 is beta (released 2026-01-11) with breaking changes. Not production-ready. Stay on v7. |
| SEO | Built-in metadata API | next-seo | next-seo is a Pages Router pattern. In App Router, `generateMetadata()` is the official API. Using both creates conflicts. |
| Sitemap | `app/sitemap.ts` | next-sitemap | next-sitemap is a post-build script pattern from Pages Router days. App Router's built-in `sitemap.ts` is cleaner and has no build step dependency. |
| Analytics | @vercel/analytics | Plausible | Plausible costs $9/month for what @vercel/analytics gives for free on Vercel. No meaningful difference in features for a B2B corporate site. |
| 3D | — | Three.js | Explicitly out of scope. Dropped from v2 for performance reasons. Correct decision. |

---

## Installation

```bash
# Bootstrap
npx create-next-app@latest webpage-belgrano \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack-flag-needed  # Turbopack is default in Next.js 16

# Animation
npm install framer-motion gsap @gsap/react

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Email
npm install resend react-email

# Image processing (ensure it's in dependencies, not devDependencies)
npm install sharp

# Analytics
npm install @vercel/analytics

# Tailwind v4 PostCSS (if create-next-app doesn't set it up)
npm install -D @tailwindcss/postcss tailwindcss
```

---

## Key Configuration Files

**`postcss.config.mjs`**
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

**`app/globals.css`** (Tailwind v4 CSS-first)
```css
@import "tailwindcss";

@theme {
  --color-bg: #ffffff;
  --color-bg-section: #f9fafb;
  --color-dark: #09090b;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  --color-accent: #000000;
  --font-sans: 'Geist', 'Inter', system-ui, sans-serif;
}
```

**`next.config.ts`** (image formats)
```ts
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}
export default config
```

---

## Sources

- Next.js 16 release: https://nextjs.org/blog/next-16
- Tailwind CSS v4 PostCSS setup: https://tailwindcss.com/docs/installation/using-postcss
- Tailwind v4 Next.js guide: https://tailwindcss.com/docs/guides/nextjs
- Motion (Framer Motion v12): https://motion.dev/docs/react
- GSAP React guide: https://gsap.com/resources/React/
- GSAP in Next.js 15: https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232
- Next.js Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Next.js sitemap built-in: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js robots built-in: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Resend + Next.js: https://resend.com/docs/send-with-nextjs
- Vercel Analytics quickstart: https://vercel.com/docs/analytics/quickstart

**npm versions verified 2026-03-31:**
- `next@16.2.1`, `tailwindcss@4.2.2`, `@tailwindcss/postcss@4.2.2`
- `framer-motion@12.38.0`, `gsap@3.14.2`, `@gsap/react@2.1.2`
- `react-hook-form@7.72.0`, `zod@4.3.6`, `@hookform/resolvers@5.2.2`
- `resend@6.10.0`, `react-email@5.2.10`
- `@vercel/analytics@2.0.1`, `sharp@0.34.5`, `typescript@6.0.2`
