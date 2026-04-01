# Requirements: Webpage Belgrano

**Defined:** 2026-03-31
**Core Value:** Clearly communicate Belgrano's 4 verticals and convert visitors into leads/meetings

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Project scaffolded with Next.js 16, Tailwind CSS v4, Framer Motion, GSAP
- [x] **FOUND-02**: Brand tokens defined in Tailwind v4 @theme (colors, typography, spacing)
- [x] **FOUND-03**: Geist Sans loaded via next/font with proper fallbacks
- [x] **FOUND-04**: GSAP centralized config with useGSAP() hook and hydration fix
- [x] **FOUND-05**: metadataBase configured in root layout for OG image resolution
- [x] **FOUND-06**: Responsive layout system (mobile-first breakpoints)

### Landing Page

- [x] **LAND-01**: Sticky navbar with logo, navigation links, CTA button, and backdrop blur on scroll
- [x] **LAND-02**: Hero section with headline, subtitle, primary CTA, and fade-in/slide-up animations
- [x] **LAND-03**: Client logo marquee with infinite horizontal scroll (CLC, Seguros CLC, TNT Sports/Warner Bros)
- [x] **LAND-04**: Verticales section with 4 cards (icon, name, description, "Saber mas" link to detail page)
- [x] **LAND-05**: HowItWorks section with 3-step visual timeline (Diagnostico, Estrategia, Ejecucion)
- [x] **LAND-06**: Stats section with GSAP-animated counters (4 key metrics)
- [x] **LAND-07**: CTA section with contact form and meeting scheduling option
- [x] **LAND-08**: Footer with logo, tagline, navigation links, and copyright

### Vertical Pages

- [ ] **VERT-01**: Dynamic route for vertical detail pages (/verticales/[slug])
- [ ] **VERT-02**: Bots Conversacionales page with hero, expanded description, metrics, client references
- [ ] **VERT-03**: DOOH page with hero, expanded description, metrics, client references
- [ ] **VERT-04**: Producciones page with hero, expanded description, metrics
- [ ] **VERT-05**: Academy page with hero, expanded description, metrics, client references
- [x] **VERT-06**: FAQ section per vertical (5-7 questions addressing common objections)
- [x] **VERT-07**: Content stored as TypeScript data files (lib/content/verticales.ts)

### About Page

- [ ] **ABOUT-01**: Company narrative section (history, mission, what Belgrano is)
- [ ] **ABOUT-02**: Values/differentiators section (AI-native, integrated services)
- [ ] **ABOUT-03**: Team positioning section (how the team works, expertise areas)

### Conversion

- [ ] **CONV-01**: Contact form with name, email, company, message fields
- [ ] **CONV-02**: Form submission via Server Action with Zod validation
- [ ] **CONV-03**: Email delivery via Resend (branded HTML templates for lead + team notification)
- [ ] **CONV-04**: Calendly embed for direct meeting scheduling alongside contact form
- [ ] **CONV-05**: Floating WhatsApp CTA button (links to Belgrano's WA Business)
- [ ] **CONV-06**: Rate limiting on form submission (honeypot field + IP-based)
- [ ] **CONV-07**: Form success/error states with user feedback

### Animations

- [x] **ANIM-01**: Framer Motion scroll-triggered entrance animations (fade-in, slide-up, stagger)
- [x] **ANIM-02**: GSAP-powered counter animations for Stats section
- [x] **ANIM-03**: GSAP scroll-scrubbed animation for HowItWorks timeline
- [x] **ANIM-04**: Smooth hover/interaction micro-animations on cards and buttons
- [x] **ANIM-05**: prefers-reduced-motion support (disable/simplify animations when requested)
- [x] **ANIM-06**: Mobile animation budget (simplified animations on smaller viewports)

### SEO

- [ ] **SEO-01**: Unique title and description meta tags per page
- [ ] **SEO-02**: Open Graph images per page (static PNGs for v1)
- [ ] **SEO-03**: Automatic sitemap.xml generation via Next.js sitemap.ts
- [ ] **SEO-04**: robots.txt configuration
- [ ] **SEO-05**: JSON-LD structured data (Organization + LocalBusiness schema)
- [ ] **SEO-06**: Semantic HTML (proper heading hierarchy, landmark elements)

### Deploy

- [ ] **DEPLOY-01**: Vercel deployment configured with production environment
- [ ] **DEPLOY-02**: belgrano.cl domain connected to Vercel
- [ ] **DEPLOY-03**: Environment variables configured (RESEND_API_KEY, etc.)
- [ ] **DEPLOY-04**: Lighthouse performance score >= 90 on mobile

## v2 Requirements

### Enhanced Content

- **CONT-01**: Blog/resources section with articles
- **CONT-02**: Case study detail pages with full client stories
- **CONT-03**: Testimonials carousel with attributed quotes (name, role, company)
- **CONT-04**: Video assets integration (from Remotion pipeline)

### Advanced Features

- **ADV-01**: CMS integration for content management
- **ADV-02**: Multi-language support (English version)
- **ADV-03**: Dark mode toggle
- **ADV-04**: Analytics dashboard for form submissions

## Out of Scope

| Feature | Reason |
|---------|--------|
| Three.js / 3D scenes | Intentionally dropped from v1 for performance and simplicity |
| Lenis smooth scroll | Native scroll is simpler and more mobile-compatible |
| User authentication | No login functionality needed for a corporate site |
| E-commerce / payments | Not applicable to agency website |
| Blue/violet color scheme | v1 brand, v2 is minimalist black + white |
| Code migration from landing-belgrano | Clean build from scratch, different design direction |
| CMS integration | Static content is sufficient for launch |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| LAND-01 | Phase 2 | Complete |
| LAND-02 | Phase 2 | Complete |
| LAND-03 | Phase 2 | Complete |
| LAND-04 | Phase 2 | Complete |
| LAND-05 | Phase 2 | Complete |
| LAND-06 | Phase 2 | Complete |
| LAND-07 | Phase 2 | Complete |
| LAND-08 | Phase 2 | Complete |
| VERT-01 | Phase 3 | Pending |
| VERT-02 | Phase 3 | Pending |
| VERT-03 | Phase 3 | Pending |
| VERT-04 | Phase 3 | Pending |
| VERT-05 | Phase 3 | Pending |
| VERT-06 | Phase 3 | Complete |
| VERT-07 | Phase 3 | Complete |
| ABOUT-01 | Phase 4 | Pending |
| ABOUT-02 | Phase 4 | Pending |
| ABOUT-03 | Phase 4 | Pending |
| CONV-01 | Phase 5 | Pending |
| CONV-02 | Phase 5 | Pending |
| CONV-03 | Phase 5 | Pending |
| CONV-04 | Phase 5 | Pending |
| CONV-05 | Phase 5 | Pending |
| CONV-06 | Phase 5 | Pending |
| CONV-07 | Phase 5 | Pending |
| ANIM-01 | Phase 2 | Complete |
| ANIM-02 | Phase 2 | Complete |
| ANIM-03 | Phase 2 | Complete |
| ANIM-04 | Phase 2 | Complete |
| ANIM-05 | Phase 2 | Complete |
| ANIM-06 | Phase 2 | Complete |
| SEO-01 | Phase 6 | Pending |
| SEO-02 | Phase 6 | Pending |
| SEO-03 | Phase 6 | Pending |
| SEO-04 | Phase 6 | Pending |
| SEO-05 | Phase 6 | Pending |
| SEO-06 | Phase 6 | Pending |
| DEPLOY-01 | Phase 7 | Pending |
| DEPLOY-02 | Phase 7 | Pending |
| DEPLOY-03 | Phase 7 | Pending |
| DEPLOY-04 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 44 total
- Mapped to phases: 44
- Unmapped: 0

---
*Requirements defined: 2026-03-31*
*Last updated: 2026-03-31 after initial definition*
