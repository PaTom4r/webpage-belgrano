# Architecture Patterns

**Domain:** Multi-page corporate agency website (B2B lead generation)
**Project:** Grupo Belgrano — webpage-belgrano
**Researched:** 2026-03-31
**Confidence:** HIGH (verified against official Next.js docs + multiple community sources)

## Recommended Architecture

A **static-first, multi-page Next.js App Router site** with:
- All pages as React Server Components (RSC) by default
- Client boundaries pushed to leaf animation/interactive components only
- Server Actions for the contact form (no separate API route needed)
- No CMS, no database — content is co-located TypeScript data files

```
Static RSC Pages
     │
     ├── layout.tsx (root) ─── Navbar (Client) + Footer (Server)
     │
     ├── / (page.tsx)         ← Landing: 8 sections, all RSC shells
     │     └── HeroSection, MarqueeSection, etc.
     │
     ├── /verticales/bots     ← Vertical detail page
     ├── /verticales/dooh
     ├── /verticales/producciones
     ├── /verticales/academy
     │
     ├── /nosotros            ← About page
     │
     └── /contacto            ← Contact page + Server Action → Resend
```

## Component Boundaries

### Server Components (default — no "use client")

Everything that is structure, layout, or static content renders on the server.
Zero JavaScript sent to the client for these components.

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `app/layout.tsx` | Root HTML, fonts, global CSS, metadata defaults | Renders Navbar + page slots |
| `app/page.tsx` | Landing page shell, assembles 8 sections | All LandingSection components |
| `app/verticales/[slug]/page.tsx` | Vertical detail page shell | VerticalContent, VerticalCTA |
| `app/nosotros/page.tsx` | About page shell | TeamSection, ValuesSection |
| `app/contacto/page.tsx` | Contact page shell, owns Server Action | ContactForm (Client) |
| `components/sections/*` | Individual landing sections (Hero, Stats, etc.) | AnimatedCounter (Client), MarqueeTrack (Client) |
| `components/layout/Footer` | Footer links, logo, copyright | Static, no dependencies |
| `components/ui/*` | Button, Card, Badge — static variants | Used across all pages |
| `lib/content/verticales.ts` | Vertical copy data (TypeScript objects) | Imported by vertical pages |
| `lib/content/site.ts` | Global copy: nav links, footer, stats | Imported by layout + sections |

### Client Components ("use client" — hydrated in browser)

Only components that need browser APIs, event handlers, or animation libraries.

| Component | Responsibility | Why Client |
|-----------|---------------|------------|
| `components/layout/Navbar` | Sticky header, scroll detection, mobile menu | `useState`, `useEffect`, scroll events |
| `components/animations/AnimatedCounter` | GSAP counter for stats section | GSAP requires DOM access |
| `components/animations/ScrollReveal` | Framer Motion entrance wrappers | `motion` requires client runtime |
| `components/sections/MarqueeTrack` | CSS/JS logo marquee | Animation loop |
| `components/forms/ContactForm` | Form state, validation, submission feedback | `useState`, form events |
| `components/ui/MobileMenu` | Hamburger menu overlay | `useState`, focus trap |

### Server Action (not a component — server-side function)

| Action | Responsibility | Communicates With |
|--------|---------------|-------------------|
| `app/contacto/actions.ts` | Validates form input (Zod), calls Resend API | ContactForm (Client) calls it, Resend SDK sends email |

## Data Flow

```
Content Data Flow (build time):
  lib/content/verticales.ts
  lib/content/site.ts
        │
        ▼
  Server Components (pages, sections)
        │
        ▼
  Static HTML → Vercel CDN → Browser

Animation Data Flow (runtime, client only):
  Browser scroll events
        │
        ▼
  ScrollReveal (Framer Motion) / AnimatedCounter (GSAP)
        │
        ▼
  DOM mutations (no state lifted up)

Contact Form Data Flow:
  User input (ContactForm — Client)
        │  (Server Action call)
        ▼
  app/contacto/actions.ts (Server)
        │  Zod validation
        │  Resend SDK
        ▼
  Email delivered to belgrano inbox
        │  Response to client
        ▼
  ContactForm shows success/error state
```

## Suggested Build Order (Phase Dependencies)

Build in this order because each layer unblocks the next:

### 1. Foundation (unblocks everything)
- `next.config.ts`, `tailwind.config.ts` (v4 setup), `tsconfig.json`
- `app/layout.tsx` with Geist Sans font, base CSS tokens (colors, spacing)
- `lib/content/site.ts` with nav links, global copy
- `components/layout/Navbar` and `Footer`

Dependencies: Nothing. This is the base.

### 2. Landing Page Sections (unblocks vertical pages)
Build in DOM order — each section is isolated:
- Hero (static, large text + CTA button)
- Marquee (Client — logo strip animation)
- Verticales cards (links to vertical detail pages — build slugs first)
- HowItWorks (static step layout)
- Stats + AnimatedCounter (Client — GSAP)
- CTA section (static)

Dependencies: Foundation complete.

### 3. Vertical Detail Pages (unblocks SEO metadata)
- Route: `app/verticales/[slug]/page.tsx` with static params
- `lib/content/verticales.ts` data objects (one per vertical)
- `generateStaticParams()` for the 4 slugs: `bots`, `dooh`, `producciones`, `academy`
- Per-page `generateMetadata()` for unique title/description/OG

Dependencies: Landing Verticales section cards (slug names must match).

### 4. About Page
- `app/nosotros/page.tsx` — narrative + values
- No new component primitives needed (reuses section patterns from landing)

Dependencies: Foundation + UI components from earlier phases.

### 5. Contact Form + Email
- `app/contacto/page.tsx` + `ContactForm` (Client)
- `app/contacto/actions.ts` (Server Action)
- Zod validation schema
- Resend SDK integration, `.env.local` with `RESEND_API_KEY`

Dependencies: Foundation. Can be built in parallel with phases 2-4.

### 6. SEO + Metadata Pass
- Root `metadata` object in `app/layout.tsx`
- Per-page `metadata` exports for `/`, `/nosotros`, `/contacto`
- Per-vertical `generateMetadata` (already in phase 3)
- `app/sitemap.ts` (static generation)
- `app/robots.ts`
- OG images: static `opengraph-image.jpg` files per route

Dependencies: All pages must exist. Do last.

### 7. Polish + Vercel Deploy
- Framer Motion entrance animations on remaining sections
- Mobile responsiveness audit
- Core Web Vitals check (Lighthouse)
- Vercel project setup + `belgrano.cl` DNS

Dependencies: All content complete.

## File Organization

```
webpage-belgrano/
├── app/
│   ├── layout.tsx              # Root layout — fonts, global metadata, Navbar, Footer
│   ├── page.tsx                # Landing (/)
│   ├── nosotros/
│   │   └── page.tsx
│   ├── contacto/
│   │   ├── page.tsx
│   │   └── actions.ts          # Server Action for Resend
│   ├── verticales/
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic with generateStaticParams
│   ├── sitemap.ts
│   ├── robots.ts
│   └── globals.css             # Tailwind v4 directives + CSS tokens
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # "use client"
│   │   ├── Footer.tsx          # Server
│   │   └── MobileMenu.tsx      # "use client"
│   ├── sections/               # Landing page sections
│   │   ├── HeroSection.tsx     # Server
│   │   ├── MarqueeSection.tsx  # "use client"
│   │   ├── VerticalCards.tsx   # Server
│   │   ├── HowItWorks.tsx      # Server
│   │   ├── StatsSection.tsx    # Server shell
│   │   └── CTASection.tsx      # Server
│   ├── animations/
│   │   ├── ScrollReveal.tsx    # "use client" — Framer Motion wrapper
│   │   └── AnimatedCounter.tsx # "use client" — GSAP
│   ├── forms/
│   │   └── ContactForm.tsx     # "use client"
│   └── ui/                     # Primitives
│       ├── Button.tsx          # Server (static variants)
│       ├── Badge.tsx
│       └── Card.tsx
│
├── lib/
│   ├── content/
│   │   ├── site.ts             # Nav, footer, global copy
│   │   └── verticales.ts       # Per-vertical data objects
│   └── resend.ts               # Resend client singleton
│
├── public/
│   ├── logos/                  # Client logos for marquee
│   └── og/                     # OG images per page
│
└── types/
    └── vertical.ts             # TypeScript types for content data
```

## Key Architectural Decisions

### Static Generation Over SSR
All pages use `export const dynamic = 'force-static'` (implicit for pages with no dynamic data). This means Vercel serves pre-built HTML from CDN — no server cold starts, maximum performance. Only the Server Action at `/contacto/actions.ts` runs server-side at request time.

### No Separate API Route for Contact Form
Server Actions (Next.js App Router) handle the Resend call directly from the form submission. This eliminates the `/api/contact` route pattern from older Next.js. Fewer moving parts, type-safe end to end.

### Dynamic Slug Route Instead of 4 Static Files
`app/verticales/[slug]/page.tsx` with `generateStaticParams()` returning `['bots', 'dooh', 'producciones', 'academy']` is cleaner than 4 separate page files. Adding a 5th vertical later = add one object to `verticales.ts`. No new files.

### Animation Library Split
Framer Motion handles entrance animations (scroll reveal, fade-in — React-idiomatic, declarative).
GSAP handles the stats counter (requires precise timing control, DOM-centric). Do not mix both for the same element.

### Tailwind v4 CSS Tokens
Define the brand palette in `globals.css` as CSS custom properties using `@theme` (Tailwind v4 pattern), not in `tailwind.config.ts`. This keeps colors, fonts, and spacing as a single source of truth accessible in both Tailwind classes and GSAP code.

## Scalability Considerations

| Concern | Current (launch) | Later (if needed) |
|---------|-----------------|-------------------|
| Content updates | Edit TypeScript data files + redeploy | Add Contentlayer or MDX |
| New vertical | Add entry to `verticales.ts` | Same pattern, no new routes needed |
| Blog | Add `app/blog/[slug]/page.tsx` with MDX | Isolated, no impact on current structure |
| i18n | Add `[locale]` route group | Requires restructure but foundation is clean |
| Analytics | Add Vercel Analytics (1 import) | No architecture change needed |
| Videos (Remotion) | Drop MP4s in `public/` + `<video>` | No component rewrite |

## Anti-Patterns to Avoid

### Anti-Pattern 1: "use client" on Section Components
**What:** Adding `"use client"` to HeroSection or VerticalCards because they "might need animations later."
**Why bad:** Forces the entire section subtree into the client bundle. Every child of a Client Component is also a client component.
**Instead:** Keep sections as Server Components. Wrap only the specific animated child element (a `<h1>`, a `<div>`) in a `<ScrollReveal>` Client Component.

### Anti-Pattern 2: Separate `/api/contact` Route
**What:** Creating `app/api/contact/route.ts` to handle form submission.
**Why bad:** Unnecessary. Server Actions do the same thing with less boilerplate, better type safety, and no CORS concerns.
**Instead:** `"use server"` function in `app/contacto/actions.ts`, imported and called from `ContactForm`.

### Anti-Pattern 3: Putting All Components in One `/components` Directory
**What:** Flat `components/Button.tsx`, `components/Navbar.tsx`, `components/HeroSection.tsx` — no subdirectories.
**Why bad:** Unscalable at 20+ components. No signal about what's shared vs route-specific.
**Instead:** `layout/`, `sections/`, `animations/`, `forms/`, `ui/` subdirectories as specified above.

### Anti-Pattern 4: Duplicating Content Data in Each Page File
**What:** Hardcoding vertical copy (titles, metrics, CTAs) directly in `app/verticales/bots/page.tsx`.
**Why bad:** Updates require touching multiple files. Impossible to add a new vertical without creating a new page file.
**Instead:** `lib/content/verticales.ts` as the single source of truth. Pages are just renderers.

## Sources

- [Next.js Official Docs: Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) — HIGH confidence, fetched 2026-03-31
- [Next.js Official Docs: App Router](https://nextjs.org/docs/app) — HIGH confidence
- [Next.js Official Docs: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) — HIGH confidence
- [Next.js Guides: Forms with Server Actions](https://nextjs.org/docs/app/guides/forms) — HIGH confidence
- [Resend + Next.js Integration](https://resend.com/nextjs) — MEDIUM confidence (official Resend docs)
- [GSAP with Next.js: Fishtank Guide](https://www.getfishtank.com/insights/gsap-with-nextjs-and-sitecore-xm-cloud) — MEDIUM confidence
- [Next.js 16 App Router Project Structure: MakerKit](https://makerkit.dev/blog/tutorials/nextjs-app-router-project-structure) — MEDIUM confidence
- [Modern Full Stack Architecture Next.js 15: SoftwareMill](https://softwaremill.com/modern-full-stack-application-architecture-using-next-js-15/) — MEDIUM confidence
