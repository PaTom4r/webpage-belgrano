# Prompts — Home verticales reveal (3 visuals hero)

Guía para generar los 3 visuales con **OpenAI gpt-image-2** (imagen) y animar con **Veo 3.1** (image-to-video). Paleta A.

---

## Workflow por vertical

1. **Iterar imagen** en ChatGPT / OpenAI Playground con el prompt de imagen abajo. Ajustá hasta que te guste.
2. **Guardar imagen final** como `public/home/<slug>.webp` (donde `<slug>` = `intelligence`, `media` o `brand`).
3. **Pasar imagen a Veo 3.1** (image-to-video) con el prompt de animación.
4. **Tier strategy**: Fast para iterar animación → Lite para validar → Normal para master final.
5. **Guardar MP4 final** como `public/home/<slug>.mp4`.
6. Me avisás qué vertical está listo y yo flipeo la config → aparece en la home.

---

## Parámetros generales

**Para OpenAI gpt-image-2** (o fallback `gpt-image-1`):
- Size: `1536x1024` (landscape 3:2, recorta bien a aspect-video)
- Quality: `high`
- n: 1
- Style: photorealistic cinematic

**Para Veo 3.1** (image-to-video):
- Duración: **3 segundos**
- Resolución: 1080p
- Obligatorio en el prompt: `"seamless loop, first frame matches last frame, continuous motion"`
- Si el loop sale con salto → fallback ffmpeg cross-fade 200ms entre final e inicio (te lo armo cuando pase)

---

## 1. Intelligence — `#20808D` deep teal

### Prompt imagen (OpenAI)

```
Extreme close-up abstract visualization of a neural network.
Glowing deep teal nodes (hex #20808D) connected by thin pulsing lines.
Floating particles in the background, shallow depth of field with cinematic bokeh.
Dark rich-black environment with subtle film grain.
Photorealistic 3D render, volumetric lighting, high detail.
Composition centered, 3:2 landscape, no text, no logos.
```

### Prompt animación (Veo 3.1)

```
Slow rotational camera orbit around the neural network.
Nodes pulse in rhythm with a soft breathing motion.
Particles drift gently in the background with subtle parallax depth.
Camera holds its speed throughout, no zoom.
Seamless 3-second loop, first frame matches last frame, continuous motion.
```

### Vibe a buscar
Mystical pero contenido. No techy-futurista-azul. No corporativo-stock. Calma + pulso. Deep teal dominante, casi monocromo con pequeños acentos cyan más brillantes en los nodos.

### Iteraciones típicas si no gusta
- Muy vacío → agregar "more nodes, denser network"
- Muy saturado → "more negative space, fewer connections"
- Verde en vez de teal → "pure teal hue #20808D, not green"
- Demasiado Matrix → "organic flow, not grid-aligned"

---

## 2. Media — `#0EA5E9` electric sky

### Prompt imagen (OpenAI)

```
Wide cinematic shot of an empty professional sports stadium at blue-hour dusk.
Perimeter LED billboards along the pitch edge glowing soft electric cyan (#0EA5E9).
Low atmospheric fog drifting across the field.
Stadium floodlights casting warm halos over empty seats.
Shot on 35mm lens, eye-level from the tribune, medium-wide composition.
Shallow depth of field, subtle film grain, rich blacks, deep shadows with preserved highlight detail.
Dark cinematic color grade with cool blue base.
No players, no text, no logos. Landscape 3:2.
```

### Prompt animación (Veo 3.1)

```
Slow dolly push-in toward the LED panels along the pitch.
Subtle flicker on the LED signage, very gentle light pulse.
Faint fog drifting left to right across the field.
Camera holds at the midpoint then returns gently to starting position.
Seamless 3-second loop, first frame matches last frame.
```

### Vibe a buscar
Cinematográfico estilo Netflix sport documentary. No neón sobrio. No estadio lleno. La atmósfera importa más que el detalle arquitectónico — que sienta a "broadcast waiting to happen".

### Iteraciones típicas si no gusta
- Muy azul genérico → "specific electric cyan hex #0EA5E9 on the LED panels"
- Muy vacío (frío) → "warmer floodlight halos, tungsten temperature"
- LEDs muy brillantes → "LEDs glowing soft, not blinding"
- Muy amplio → "tighter framing on the pitch edge and billboards"

---

## 3. Brand — `#F97316` warm orange

### Prompt imagen (OpenAI)

```
Premium brand activation stand in a modern gallery / retail space.
Warm orange accent lighting (hex #F97316) illuminating a minimalist product display.
Soft bokeh background with out-of-focus crowd silhouettes.
Cinematic tungsten color grade, deep shadows with orange rim-light on objects.
Shallow depth of field, shot on 50mm prime.
Luxurious materiality — concrete, glass, brushed metal.
High detail on the central object, background dissolves into warm glow.
Landscape 3:2, no text, no logos, no brand marks.
```

### Prompt animación (Veo 3.1)

```
Slow dolly around the central display, 15-degree arc.
Warm orange accent light pulsing softly, breathing rhythm.
Background bokeh shimmers as crowd silhouettes shift gently.
Shallow depth breathing — focus slightly drifts forward and back.
Seamless 3-second loop, first frame matches last frame.
```

### Vibe a buscar
Editorial de experiential marketing premium. No fiesta. No corporate event. Calidez táctil, humano pero sin mostrar caras. Tipo campaña de Apple Store opening pero con estética orange.

### Iteraciones típicas si no gusta
- Muy vacío → "add more depth, crowd silhouettes in background"
- Muy fiesta → "minimalist, gallery-like, quiet presence"
- Naranja muy saturado → "warm orange #F97316 as ACCENT only, not wash"
- Muy genérico → "specific product on display, editorial styling"

---

## Checklist de entrega por vertical

Cuando tengas el MP4 final, verificar:

- [ ] Duración 3s (±0.5s)
- [ ] Loop sin salto visible (primer y último frame idénticos)
- [ ] Resolución 1080p mínima
- [ ] Audio removido (los videos de la home van muted)
- [ ] Peso final < 5 MB (si pesa más, re-encodeá con ffmpeg: `ffmpeg -i in.mp4 -vcodec libx264 -crf 26 -an out.mp4`)
- [ ] Color dominante coincide con el accent del vertical (teal / sky / orange)

Dropeá el archivo en:
```
public/home/intelligence.mp4
public/home/media.mp4
public/home/brand.mp4
```

Y si también tenés la imagen base (para usar como poster del `<video>`):
```
public/home/intelligence.webp
public/home/media.webp
public/home/brand.webp
```

Me avisás por vertical y yo lo flipeo.

---

## Costos estimados (referencia)

| Vertical | OpenAI img (5 iter) | Veo Fast (5 × 3s) | Veo Lite (2 × 3s) | Veo Normal master (1 × 3s) | Total |
|---|---|---|---|---|---|
| Intelligence | ~$1.00 | ~$0.75 | ~$0.90 | ~$1.50 | **~$4.15** |
| Media | ~$1.00 | ~$0.75 | ~$0.90 | ~$1.50 | **~$4.15** |
| Brand | ~$1.00 | ~$0.75 | ~$0.90 | ~$1.50 | **~$4.15** |
| **Total** | | | | | **~$12–15** |

Son estimaciones gruesas. Veo tiers exactos varían por región/billing.
