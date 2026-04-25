# Belgrano Particle Orchestrator A+C Spec

Fecha: 2026-04-24

## Decision

Direction approved: **A + C = Orchestrator + Live UI**.

The particle system must stop behaving like ambient decoration. The goal is to make the website feel like an AI company by using particles as an intelligent visual layer that assembles, connects, reveals, and then gets out of the way.

## Problem To Fix

The current/previous particle implementation is not enough because it mostly keeps particles floating above or beside page content. It improves atmosphere, but it does not create a meaningful scroll-driven experience.

Do not continue by only changing opacity, colors, or side placement. The structure must be replaced with a narrative particle system.

## Product Feeling

The particles should feel like Belgrano's invisible operating system:

- Loose data enters the scene.
- It organizes into systems.
- It forms UI fragments, cards, metrics, and connection lines.
- It reveals business information at the right scroll moment.
- It dissolves before conversion surfaces so forms and CTAs stay clean.

Avoid literal robots, humanoids, robot hands, mascots, or anything that suggests robots are physically manipulating the website. The metaphor is orchestration, not characters.

## Recommended Experience

### Hero: Dormant Intelligence

Particles are quiet, sparse, and spatial. They sit inside the office atmosphere like latent intelligence. They must not compete with the headline or the office image.

Behavior:

- Low density.
- Slow parallax depth.
- Small shimmer on scroll start.
- No large formations yet.

### Verticales: Orchestrated Assembly

This is the main stage.

As the user scrolls through verticales, particles should assemble into different structures per vertical:

- **Intelligence**: nodes, agent paths, chat bubbles, decision graph, system cards.
- **Media**: waves, coverage sweeps, signal paths, screen grid, reach arcs.
- **Brand**: denser material particles, activation energy, field/event geometry, warm kinetic clusters.

The particles should appear to invoke or build the existing vertical panel UI, not just float behind it.

### Demo/UI Moments: Live UI

Particles should construct small interface elements:

- cards,
- chips,
- metric pills,
- thin connection lines,
- node clusters,
- demo panels,
- progress paths.

Important: actual text and CTAs must remain DOM content for SEO and accessibility. Particles can visually support or trace around elements, but text should not live inside canvas.

### Stats: Condensation

Particles should condense behind the metric values, as if results are being computed from data.

Behavior:

- Brief ring/field compression around numbers.
- Controlled density behind stats only.
- Never obscure labels.

### CTA: Dissolve

Particles must retreat.

Behavior:

- Fade to near zero.
- Move away from input fields and buttons.
- Leave the form and Calendly clean.

## Architecture Proposal

### `ParticleOrchestrator`

High-level controller that reads page/section scroll state and chooses the current scene.

Responsibilities:

- Track active section.
- Map scroll progress to narrative beats.
- Expose scene state to canvas and optional DOM effects.

### `ParticleCanvas`

Three.js / React Three Fiber render layer.

Responsibilities:

- Render particles in 3D.
- Support morphing formations.
- Keep pointer events disabled.
- Respect `prefers-reduced-motion`.
- Reduce density on mobile.

### `ParticleTimeline`

Pure logic layer that maps scroll progress to beats:

- idle,
- assemble,
- connect,
- reveal,
- dissolve.

This should be testable without WebGL.

### `DOM Hooks`

Section markers and measured anchors for particles to react to real page elements.

Examples:

- hero headline bounds,
- vertical panel bounds,
- stats number positions,
- CTA form bounds.

The canvas uses these anchors to avoid covering important text and to make particles look like they are building around real UI.

## Implementation Scope

First implementation target: **home page only**.

Do not start by spreading this across every route. Build the complete experience on the home first:

1. Hero idle.
2. Verticales orchestrated assembly.
3. Stats condensation.
4. CTA dissolve.

After that feels right, extend the pattern to `/verticales/intelligence`.

## Current Implementation Notes

The recent particle changes introduced:

- `src/components/particles/particle-director.ts`
- section-aware state in `particle-scene.tsx`
- shader formation logic in `particles-mesh.tsx`
- `id="verticales"` on the home verticales section
- `scripts/tests/particle-director.test.mjs`

These can be reused only as scaffolding if helpful. The visual concept itself should be replaced by the A+C orchestration model, not merely tuned.

## Visual Prototype Reference

A temporary storyboard exists at:

`public/particle-storyboard.html`

It explains the approved A+C direction:

- A: Orchestrator
- C: Live UI

This is a communication artifact, not production UI.

## Avoid

- Particles floating as a decorative cloud with no narrative role.
- Heavy particles over readable text.
- Particles over form fields or Calendly.
- Robot characters or robot manipulation.
- Neon cyberpunk overload.
- Baking real copy into canvas.
- Scroll hijacking.

## Success Criteria

The home page should feel like the website is being intelligently assembled as the user scrolls.

A viewer should understand:

- Belgrano does AI, media, and brand execution.
- Intelligence is the operating layer.
- The motion supports comprehension.
- The site still converts clearly through CTAs.

Performance and accessibility requirements:

- `npm.cmd run lint` has no new errors.
- `npm.cmd run build` succeeds.
- `prefers-reduced-motion` disables or heavily simplifies particle motion.
- Desktop and mobile browser checks confirm text and CTAs remain readable.
