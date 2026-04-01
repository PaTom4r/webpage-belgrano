# Hero Redesign: 4 Mini Browser Mockups

## Context

The current hero is text-only (badge + headline + subtitle + CTAs + social proof). The redesign adds 4 mini browser window mockups below the CTAs, each representing a Belgrano service vertical. Inspired by Linear.app's hero pattern of showing a product interface below the headline.

## Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Layout | 4 mini browsers in a horizontal row | User wants all verticals visible at once without scrolling |
| Background | Hybrid: white headline → gradient → dark mockup zone | Headline keeps clean white feel, dark band makes white browsers pop |
| Mockup style | Mini browser windows with chrome (3 dots + URL bar) | Option C selected — professional, recognizable, light background |
| Vertical names | English, modern | Smart Agents, Digital Media, Creative Studio, Academy |
| Animation entrance | Stagger fadeUp (0.1s delay between each) | Elegant sequential reveal |
| Animation hover | Lift + subtle glow on mouse over | Interactive feel, each mockup responds independently |
| VerticalesSection below | Keep as-is | Hero = quick overview, VerticalesSection = deep dive with full details |

## Visual Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    [white bg + grid]                        │
│          Badge: "Agencia IA · Marketing · Estrategia"       │
│                                                             │
│               Tu negocio.                                   │
│               Nuestra inteligencia.                         │
│                                                             │
│          Subtitle (1-2 lines)                               │
│          [Agenda una reunión →]  [Ver qué hacemos]          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│              ░░░ gradient white → #09090b ░░░               │
├─────────────────────────────────────────────────────────────┤
│                    [dark bg #09090b]                         │
│                                                             │
│   Smart Agents    Digital Media   Creative Studio  Academy  │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌────────┐ │
│   │ ● ● ● ▬▬│   │ ● ● ● ▬▬│   │ ● ● ● ▬▬│   │ ● ● ● ▬│ │
│   │          │   │          │   │          │   │        │ │
│   │  Chat    │   │  Screen  │   │  Video   │   │ Course │ │
│   │  mockup  │   │  grid    │   │ timeline │   │progress│ │
│   │          │   │  mockup  │   │  mockup  │   │ mockup │ │
│   └──────────┘   └──────────┘   └──────────┘   └────────┘ │
│   metric text     metric text    metric text   metric text  │
│                                                             │
│        Más de 200 empresas confían en Belgrano              │
└─────────────────────────────────────────────────────────────┘
```

## Vertical Names & Content

### Smart Agents (was: Bots Conversacionales)
- **Mockup**: Chat interface — user message, AI response, user reply, confirm button
- **Metric below**: "70-85% resuelto sin humano"
- **Links to**: `/verticales/bots`

### Digital Media (was: DOOH & Señalética Digital)
- **Mockup**: 2x2 screen grid — one showing "LIVE", one showing "CLC", two placeholder screens. Status bar with "Red activa" and "500+"
- **Metric below**: "Pantallas en tiempo real"
- **Links to**: `/verticales/dooh`

### Creative Studio (was: Producciones Digitales)
- **Mockup**: Video player with play button, timeline tracks below, timestamp indicators
- **Metric below**: "3x más rápido que agencia"
- **Links to**: `/verticales/producciones`

### Academy (unchanged)
- **Mockup**: Course progress — "Módulo 3/8", progress bar at 37%, checklist with 2 completed items and 1 in progress
- **Metric below**: "200+ profesionales formados"
- **Links to**: `/verticales/academy`

## Animation Spec

### Mount Sequence (fires once on page load)
| Delay | Element | Animation |
|-------|---------|-----------|
| 0.0s | Badge | fadeUp: opacity 0→1, y 30→0, duration 0.6s |
| 0.0s | Headline | headlineFade: opacity 1→1, y 8→0 (LCP-safe) |
| 0.2s | Subtitle | fadeUp |
| 0.3s | CTAs | fadeUp |
| 0.5s | Mockup 1 (Smart Agents) | fadeUp: opacity 0→1, y 30→0 |
| 0.6s | Mockup 2 (Digital Media) | fadeUp (stagger +0.1s) |
| 0.7s | Mockup 3 (Creative Studio) | fadeUp (stagger +0.1s) |
| 0.8s | Mockup 4 (Academy) | fadeUp (stagger +0.1s) |
| 1.0s | Social proof | fadeUp |

Easing: `[0.25, 0.1, 0.25, 1]` (consistent with rest of site)

### Hover Interaction (continuous)
- Each mockup: `whileHover={{ y: -4, scale: 1.02 }}` with `transition: 0.2s`
- Shadow deepens on hover: `shadow-lg` → `shadow-xl`
- Subtle glow: `box-shadow: 0 0 20px rgba(255,255,255,0.05)` on hover (visible on dark bg)

## Responsive Behavior

### Desktop (lg: 1024px+)
- 4 mockups in a row, gap-4, max-w-5xl centered
- Names at text-base/lg above each browser

### Tablet (sm: 640px–1024px)
- 2x2 grid of mockups
- Names at text-sm

### Mobile (below 640px)
- 2x2 grid, more compact
- Browser chrome simplified (smaller dots)
- Metrics text hidden to save vertical space

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/ui/vertical-icon.tsx` | Create — extract shared SVG icon map |
| `src/components/ui/hero-mockups.tsx` | Create — 4 browser window mockups component |
| `src/components/sections/hero-section.tsx` | Rewrite — hybrid bg, integrate mockups |
| `src/components/ui/vertical-card.tsx` | Edit — import icon from shared component |

## Verification

1. `npm run build` — no errors
2. Playwright screenshots at 1280px and 375px widths
3. All 4 mockups clickable, linking to correct `/verticales/{slug}`
4. Mount animation sequence plays correctly
5. Hover lift effect works on each mockup independently
6. Gradient transition smooth between white and dark zones
