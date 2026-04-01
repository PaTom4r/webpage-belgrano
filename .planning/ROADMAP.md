# Roadmap: Webpage Belgrano

## Overview

Build Grupo Belgrano's corporate website from scratch — a multi-page B2B site with landing page, four vertical detail pages, About page, contact form, and full SEO/deploy. The site must generate meetings; everything else is secondary. Build order follows hard dependencies: foundation tokens before UI, landing before vertical pages (slug names must be stable), content before SEO pass, everything before deploy.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Project scaffold with design tokens, fonts, GSAP config, and layout shell (completed 2026-03-31)
- [x] **Phase 2: Landing Page** - All 8 landing sections with animations fully wired (completed 2026-04-01)
- [ ] **Phase 3: Vertical Pages** - 4 service vertical detail pages with proof, metrics, and FAQs
- [x] **Phase 4: About Page** - Company narrative, values, and team positioning (completed 2026-04-01)
- [x] **Phase 5: Contact & Conversion** - Contact form, Resend email delivery, Calendly, WhatsApp CTA (completed 2026-04-01)
- [ ] **Phase 6: SEO Pass** - Per-page metadata, OG images, sitemap, robots, structured data
- [ ] **Phase 7: Deploy** - Vercel production deploy with belgrano.cl domain and Lighthouse audit

## Phase Details

### Phase 1: Foundation
**Goal**: A working Next.js app with all design tokens, fonts, GSAP hydration fix, and layout shell in place so every subsequent phase can build without retrofitting
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` serves the app with Geist Sans rendered correctly and no font flash
  2. Tailwind v4 design tokens (brand colors, spacing, typography weights) are consumable from any component
  3. GSAP plugins are registered once globally and `useGSAP()` is the only hook used for GSAP — no hydration errors in console
  4. `metadataBase` is set in root layout so OG image URLs resolve to absolute paths
  5. Layout is responsive: content reflows correctly at mobile, tablet, and desktop breakpoints
**Plans**: 2 plans
Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js app, install deps, configure Tailwind v4 globals.css, create GSAP config module
- [x] 01-02-PLAN.md — Root layout with fonts + metadataBase + GSAP fix, Container/Section components, smoke test page
**UI hint**: yes

### Phase 2: Landing Page
**Goal**: Visitors land on a complete, animated landing page that communicates what Belgrano does and drives them toward a meeting
**Depends on**: Phase 1
**Requirements**: LAND-01, LAND-02, LAND-03, LAND-04, LAND-05, LAND-06, LAND-07, LAND-08, ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06
**Success Criteria** (what must be TRUE):
  1. Visitor can scroll through all 8 sections (Navbar, Hero, Marquee, Verticales, HowItWorks, Stats, CTA, Footer) without layout breaks
  2. Hero entrance animation (fade-in/slide-up) plays on load; Stats counters animate up when scrolled into view
  3. HowItWorks timeline scrubs as the user scrolls through it
  4. Clicking a vertical card ("Saber mas") navigates to the correct vertical detail page URL
  5. On a device with prefers-reduced-motion enabled, animations are disabled or simplified with no visual glitches
**Plans**: 5 plans
Plans:
- [x] 02-01-PLAN.md — Install deps, create content data files (site.ts, verticales.ts), animation primitives (ScrollReveal, AnimatedCounter), MotionConfig in layout
- [x] 02-02-PLAN.md — Navbar (scroll glass), Hero (Framer animate), Marquee (CSS infinite), Footer (Server Component)
- [x] 02-03-PLAN.md — Verticales section (4 cards, stagger, hover), CTA section (dark bg, form UI + Zod validation)
- [x] 02-04-PLAN.md — HowItWorks (GSAP pin+scrub), Stats section (dark bg, animated counters)
- [x] 02-05-PLAN.md — Compose all sections in page.tsx, wire Navbar+Footer in layout.tsx, visual verification
**UI hint**: yes

### Phase 3: Vertical Pages
**Goal**: A B2B buyer who clicks into any vertical sees a dedicated page with outcome-oriented copy, proof metrics, FAQ, and a CTA — enough to book a meeting without talking to sales first
**Depends on**: Phase 2
**Requirements**: VERT-01, VERT-02, VERT-03, VERT-04, VERT-05, VERT-06, VERT-07
**Success Criteria** (what must be TRUE):
  1. Navigating to `/verticales/bots`, `/verticales/dooh`, `/verticales/producciones`, and `/verticales/academy` each loads a unique, content-complete page
  2. Each vertical page shows its own hero, expanded description, proof metrics, and client references (where applicable)
  3. Each vertical page has a FAQ section with 5-7 questions visible and expandable
  4. Each vertical page has a dedicated CTA section linking to the contact form
  5. All vertical content is editable from a single TypeScript data file without touching page components
**Plans**: 3 plans
Plans:
- [x] 03-01-PLAN.md — Extend verticales.ts with full content (longDescription, structured metrics, FAQ per vertical) + FaqAccordion component
- [x] 03-02-PLAN.md — Dynamic route page.tsx with generateStaticParams + all vertical section components (hero, metrics, clients, faq, cta) wired together
- [x] 03-03-PLAN.md — Human visual verification of all 4 pages
**UI hint**: yes

### Phase 4: About Page
**Goal**: A potential B2B client who wants to know who they are hiring can read Belgrano's story, values, and how the team works
**Depends on**: Phase 3
**Requirements**: ABOUT-01, ABOUT-02, ABOUT-03
**Success Criteria** (what must be TRUE):
  1. The About page loads at `/nosotros` and shows a company narrative section with history and mission
  2. A values/differentiators section communicates what makes Belgrano distinct from generic agencies
  3. A team positioning section explains the expertise and working model (visible on mobile without truncation)
**Plans**: 1 plan
Plans:
- [x] 04-01-PLAN.md — Content data file (about.ts) + 3 section components (narrative, values, team) + /nosotros page route
**UI hint**: yes

### Phase 5: Contact & Conversion
**Goal**: A visitor who is ready to engage can submit a contact form, receive confirmation, and optionally book a meeting directly — with zero spam reaching the team inbox
**Depends on**: Phase 4
**Requirements**: CONV-01, CONV-02, CONV-03, CONV-04, CONV-05, CONV-06, CONV-07
**Success Criteria** (what must be TRUE):
  1. Visitor can submit the contact form with name, email, company, and message — and receives visible success feedback
  2. The Belgrano team receives a branded HTML notification email via Resend within seconds of submission
  3. The contact lead also receives a branded confirmation email
  4. A Calendly embed is visible on the contact page and opens a booking flow without leaving the site
  5. A floating WhatsApp button is visible on all pages and opens a pre-filled WhatsApp chat
  6. Submitting the form more than 5 times in a short window is silently blocked (rate limiting active)
**Plans**: 2 plans
Plans:
- [x] 05-01-PLAN.md — Install resend + react-email, rate limiter, extend contactSchema with honeypot, Server Action (submitContact), 2 email templates, wire form
- [x] 05-02-PLAN.md — CalendlyEmbed client component in CtaSection, FloatingWhatsApp button in root layout
**UI hint**: yes

### Phase 6: SEO Pass
**Goal**: Every page has accurate, unique metadata, a proper sitemap, and structured data so search engines and social platforms represent Belgrano correctly
**Depends on**: Phase 5
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06
**Success Criteria** (what must be TRUE):
  1. Each page (home, 4 verticals, about, contact) has a unique `<title>` and `<meta description>` visible in browser tab and view-source
  2. Sharing any page URL on WhatsApp or LinkedIn shows a correct thumbnail image and title (OG tags functional)
  3. `belgrano.cl/sitemap.xml` returns a valid XML file listing all public routes
  4. `belgrano.cl/robots.txt` returns a valid file allowing all crawlers
  5. A JSON-LD Organization schema block is present on the homepage (verifiable via Google Rich Results Test)
**Plans**: 2 plans
Plans:
- [x] 06-01-PLAN.md — Per-page metadata + OG images (static PNGs via sharp) + sitemap.ts + robots.ts
- [ ] 06-02-PLAN.md — JSON-LD Organization on homepage, Service schema on vertical pages, semantic HTML audit

### Phase 7: Deploy
**Goal**: The site is live at belgrano.cl with all environment variables configured, passing a Lighthouse mobile score of 90+ and loading in under 2 seconds
**Depends on**: Phase 6
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04
**Success Criteria** (what must be TRUE):
  1. `https://belgrano.cl` serves the production site with a valid SSL certificate
  2. All environment variables (RESEND_API_KEY, etc.) are set in Vercel and the contact form sends real emails in production
  3. Lighthouse mobile performance score is 90 or higher on the homepage
  4. No broken links, missing images, or console errors on the production URL
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete   | 2026-03-31 |
| 2. Landing Page | 5/5 | Complete   | 2026-04-01 |
| 3. Vertical Pages | 2/3 | In Progress|  |
| 4. About Page | 1/1 | Complete   | 2026-04-01 |
| 5. Contact & Conversion | 2/2 | Complete   | 2026-04-01 |
| 6. SEO Pass | 1/2 | In Progress|  |
| 7. Deploy | 0/TBD | Not started | - |
