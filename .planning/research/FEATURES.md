# Feature Landscape

**Domain:** B2B agency corporate website (AI / marketing / strategy)
**Project:** Grupo Belgrano — Chilean AI agency, 4 verticals
**Researched:** 2026-03-31
**Confidence:** HIGH (multiple authoritative sources, cross-verified)

---

## Table Stakes

Features users expect. Missing = product feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear value proposition in the hero (above the fold) | Visitors decide to stay or leave in <5 seconds — they need to know what you do, who it's for, and why it matters | Low | One headline, one subheadline, one primary CTA. No jargon. |
| Sticky responsive navbar | Navigation must be instantly accessible on all devices; 64%+ of B2B searches happen on mobile | Low | 4-6 items max. Backdrop blur is fine. Hamburger on mobile. |
| Mobile-first responsive layout | 64%+ of searches on mobile; non-responsive sites lose significant traffic | Medium | Mobile breakpoints for every section, not just navbar |
| Fast load time (<2s) | Pages at 5.7s convert at 0.6% vs 1.9% at 2.4s — every second costs leads | Medium | Optimize images, use Next.js image component, no heavy 3D |
| Service / vertical descriptions | B2B buyers need to understand what they're buying before they contact you | Low | Each vertical gets clear outcome-oriented copy, not feature lists |
| Client logos / social proof | "92% of people trust recommendations from others" — recognizable brands signal legitimacy | Low | CLC, Seguros CLC, TNT Sports / Warner Bros, AFP Modelo are strong |
| Primary CTA (contact / schedule meeting) | If there's no clear next step, visitors leave without converting | Low | Must appear in navbar, hero, and at least once per vertical section |
| Contact form with email delivery | Visitors expect a way to reach out that doesn't require a phone call | Low | Resend API integration — already in scope |
| Footer with contact info and navigation | Basic trust signal; Google expects it; users look there for verification | Low | Email, location (Chile), links to pages, social profiles |
| SEO fundamentals | B2B decision-makers use Google; without SEO you don't exist organically | Medium | Title tags, meta descriptions, Open Graph, semantic HTML, schema markup |
| HTTPS / security | Browsers flag HTTP sites; missing HTTPS destroys trust immediately | Low | Automatic on Vercel |
| About / Nosotros page | B2B buyers buy from people; they want to know who's behind the agency | Low | Company narrative, founding story, positioning, values |
| Individual vertical detail pages | Generic service listings don't convert; dedicated pages allow deeper proof per service | High | One page per vertical: Bots, DOOH, Producciones, Academy |
| Stats / proof numbers | Quantified results (leads generated, campaigns run, clients trained) build instant credibility | Low | Animated counters already planned — keep them |
| Consistent brand identity | Inconsistent colors/fonts erode professionalism; first impression matters | Low | Black/white/Geist Sans system — already defined |

---

## Differentiators

Features that set this site apart. Not universally expected, but meaningful conversion lifters.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Scroll-triggered animations (Framer Motion + GSAP) | Creates a premium, modern SaaS feel that most Chilean agency sites lack; signals technical capability | Medium | Already planned. Keep subtle — performance > decoration |
| Animated stats counters (GSAP) | Numbers in motion draw the eye; "3,000+ leads generated" lands harder when it counts up | Low | Already planned |
| Client logo marquee (animated) | Continuous scroll of logos reinforces social proof without taking vertical space | Low | Already planned. CLC, Seguros CLC, TNT Sports are excellent anchors |
| Vertical-specific proof metrics on each detail page | Each vertical page with its own "results" block (e.g., DOOH reach numbers, chatbot resolution rate) | Medium | Highly differentiating vs. generic service pages |
| "How It Works" process section | B2B buyers need to visualize the engagement before committing; 3-step process reduces friction | Low | Already planned as a landing section; should also appear on each vertical page |
| Booking CTA (Calendly or equivalent) | Embedding direct scheduling removes the "we'll contact you" waiting game; shown to lift conversions 30-70% | Low | Consider embedding Calendly widget inline in the CTA section alongside the form |
| FAQ / objection handling section | Addresses "how much does it cost?", "how long does it take?", "do you work with SMEs?" before the sales call | Medium | Not currently planned — HIGH impact for conversion. Add to vertical pages at minimum |
| WhatsApp CTA (floating or in footer) | Chilean B2B buyers communicate heavily via WhatsApp; adding WA contact reduces friction for local audience | Low | Not currently planned — relevant for Chilean market specifically |
| Dark section contrast (Light/Dark alternation) | Creates visual rhythm, sections feel intentional; prevents wall-of-white fatigue | Low | Already in design direction |
| Open Graph preview images per page | When prospects share the site on WhatsApp, Slack, or email, a proper preview builds credibility | Low | Cheap to implement, high perceived professionalism |
| Testimonials with name + company + role | "Santiago Romero, CEO at Clínica Las Condes" converts far better than anonymous quotes | Medium | Requires permission from clients; worth prioritizing |
| Case study snippets on vertical pages | Brief 2-3 line proof stories ("We built X for Y, they got Z result") within vertical pages | Medium | More powerful than bullet point lists of features |

---

## Anti-Features

Features to explicitly NOT build. Each has a reason based on research findings.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Three.js / 3D scenes | Already eliminated in v2; heavy, slow, hurts performance — pages at 5.7s convert at 0.6% | Use Framer Motion entrance animations and GSAP counters instead |
| Lenis smooth scroll | Extra dependency, complicates scroll event handling, mobile quirks; native scroll works better | Use native browser scroll with scroll-margin-top for anchors |
| Blog / Content section | Not core to lead generation MVP; risks becoming stale; creates maintenance burden | Defer until there's a content strategy; static case study pages are higher ROI |
| CMS integration (Contentful, Sanity, etc.) | Complexity without benefit for a static agency site that changes quarterly at most | Hardcode content in Next.js components; update via code when copy changes |
| User authentication / login area | No use case exists for v1; adds security surface area and complexity | If a client portal is needed later, it's a separate app |
| E-commerce / payments | Not applicable to the business model | Contact form → meeting → proposal → invoice separately |
| Pricing tables | Chilean B2B agency deals are always custom; public pricing creates anchoring problems and competitor intel | Use "contact us for a quote" with ROI framing instead |
| Pop-ups / interstitials | Dark patterns damage trust, increase bounce rate, and feel spammy; especially bad for premium B2B positioning | Use sticky CTAs and contextual in-section CTAs instead |
| Auto-playing video with sound | Alienates mobile users, violates browser autoplay policies, and feels intrusive | Use muted looping MP4 (Remotion assets), always muted, with play button option |
| Generic stock photography | Signals lack of originality; B2B decision-makers recognize stock photos and distrust them | Use abstract geometric backgrounds, real client logos, and brand illustrations |
| Excessive micro-animations on every element | Visual noise that competes for attention; slows perceived performance | Animate on entrance only (once), not on hover for every element |
| Long multi-field contact form | More fields = fewer completions; asking for budget/company size on first contact is a dealbreaker | Name + email + message + optional phone. Qualification happens on the call, not the form |
| Cookie consent banner (complex) | Chile does not have strict GDPR-equivalent enforcement requiring elaborate consent; complex banners hurt UX | Add simple privacy policy link in footer; keep analytics lightweight (no ad tracking) |
| Chat bot / live chat widget | Adds load, requires human coverage or degrades experience with bot; premium positioning doesn't need it | The contact form + WhatsApp CTA cover the use case better |

---

## Feature Dependencies

```
Client logos (marquee) → requires confirmed client permissions
Testimonials with attribution → requires client permission AND quotes collected
Booking CTA (Calendly) → requires Calendly account setup + event type configuration
Contact form (Resend) → requires Resend API key + verified sending domain
Vertical detail pages → each requires unique proof metrics and copy per vertical
FAQ section → requires knowing the top 5-7 sales objections Belgrano encounters
WhatsApp CTA → requires dedicated WA Business number for the agency
Open Graph images → requires a design pass to create per-page preview images
Stats section → requires real numbers (leads generated, clients, campaigns, etc.)
Case study snippets → requires documented client results with permission to publish
SEO meta per page → requires final copy for each page before writing meta descriptions
```

---

## MVP Recommendation

**Prioritize (ship with v1):**
1. Hero with clear value proposition + primary CTA above the fold
2. Client logo marquee (CLC, Seguros CLC, TNT Sports, AFP Modelo)
3. Verticales section on landing (4 cards → links to detail pages)
4. HowItWorks (3-step process, landing page)
5. Animated stats counters (GSAP)
6. Contact form (Resend) — the core conversion mechanism
7. 4 vertical detail pages with outcome-oriented copy + metrics + dedicated CTA
8. About / Nosotros page
9. SEO fundamentals (title, meta, OG, schema)
10. Responsive + mobile-first throughout
11. FAQ section on vertical pages (handle top 4-5 objections per service)

**Add in v1 if low-effort:**
- WhatsApp floating CTA (single component, high local impact)
- Open Graph images per page (Next.js metadata API, fast to implement)
- Calendly embed in the CTA section (alongside the form, not replacing it)

**Defer to v2:**
- Blog / content section
- Video testimonials
- A/B testing setup
- CMS integration
- Personalization by industry

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Table stakes features | HIGH | Multiple authoritative B2B agency sources cross-confirmed |
| Differentiators | MEDIUM-HIGH | Conversion lift numbers from Calendly (+30-70%) are vendor-reported; treat as directional |
| Anti-features | HIGH | Based on consistent patterns across multiple CRO studies and agency-specific articles |
| Chilean market specifics | MEDIUM | WhatsApp usage pattern is well-documented for LATAM; Chile-specific data limited |
| Booking CTA vs form | MEDIUM | Studies show lift but context varies; using both in parallel is the safe bet |

---

## Sources

- [11 Surefire Website Conversion Best Practices for Agencies — ManyRequests](https://www.manyrequests.com/blog/agency-website)
- [10 Website Design Best Practices for Marketing Agencies in 2025 — PHENYX](https://www.phenyx.co/post/10-website-design-best-practices-for-marketing-agencies-in-2025)
- [19 Best B2B Websites in 2026: Examples & Best Practices — Khod](https://www.khod.io/resource-center/articles/best-b2b-websites)
- [10 Critical Website Design Mistakes That Kill Conversions (2025) — Webstacks](https://www.webstacks.com/blog/website-design-mistakes)
- [Boosting website leads by 30-70% using Calendly forms — Webgate Digital](https://webgate.digital/use-cases/boosting-website-leads-using-calendly-forms/)
- [Trust Signals: What They Are and Why They Matter — Trustmary](https://trustmary.com/social-proof/trust-signals/)
- [Best CTA Placement Strategies For 2026 Landing Pages — LandingPageFlow](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages)
- [Top B2B Website Design Trends for 2026 — Axon Garside](https://www.axongarside.com/blog/b2b-website-design-trends-2026)
- [Best Practices for Building a High-Performing B2B Website in 2026 — Grafit Agency](https://www.grafit.agency/blog/best-practices-for-building-a-high-performing-b2b-website-in-2026)
- [The Power of Social Proof: Using Case Studies and Testimonials — Intentsify](https://intentsify.io/blog/what-is-social-proof/)
