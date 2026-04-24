// MediaShowcase — scroll-driven theater reveal.
// Each video is pinned to the viewport while the user scrolls, growing from
// a small rounded card into a full-bleed cinematic frame. Text sidebar
// reveals in parallel with stagger. Two sequential theaters: commercial TV
// then in-broadcast LED banner — the Point Cola case told through scroll.
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/layout/container'
import { ScrollReveal } from '@/components/animations/scroll-reveal'

interface MediaShowcaseProps {
  accent?: string
}

interface Theater {
  index: string
  src: string
  label: string
  channel: string
  headline: string
  description: string
  metric: { value: string; unit: string }
}

const theaters: Theater[] = [
  {
    index: '01',
    src: '/video-media-2.mp4',
    label: 'Comercial TV',
    channel: 'Pauta televisiva · cobertura nacional',
    headline: 'Un referente del fútbol en pantalla',
    description:
      'Pieza publicitaria con una figura deportiva como embajador de marca. Distribución en pauta televisiva abierta y cable, con alcance nacional y frecuencia efectiva medida por GRPs.',
    metric: { value: 'ATL', unit: 'Televisión abierta + cable' },
  },
  {
    index: '02',
    src: '/video-media-1.mp4',
    label: 'Huincha LED',
    channel: 'Publicidad virtual · en vivo',
    headline: 'La marca en la huincha del partido',
    description:
      'Huincha LED en el costado inferior de la transmisión en vivo. Tecnología de reemplazo virtual para personalizar la señal por mercado, con audiencia cautiva en tiempo real.',
    metric: { value: 'LIVE', unit: 'Audiencia deportiva cautiva' },
  },
]

function TheaterSection({
  theater,
  accent,
}: {
  theater: Theater
  accent: string
}) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Scale: small → full → small again as it leaves viewport
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.82, 1, 1, 0.92])
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [28, 0, 0, 20],
  )
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.55, 1, 1, 0.55])

  // Text reveals as section enters, exits as it leaves
  const textOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.75, 0.92],
    [0, 1, 1, 0],
  )
  const textY = useTransform(scrollYProgress, [0.1, 0.3], [40, 0])
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 0.9], [0, 1, 1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '200vh' }}
      aria-label={`Caso ${theater.label}`}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-dark">
        {/* Ambient accent glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: glowOpacity,
            background: `radial-gradient(50% 50% at 50% 50%, ${accent}22 0%, transparent 70%)`,
          }}
        />

        {/* Index + Label sticky info */}
        <motion.div
          className="pointer-events-none absolute left-6 top-6 z-20 sm:left-10 sm:top-10"
          style={{ opacity: textOpacity }}
        >
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs font-bold tracking-widest"
              style={{ color: accent }}
            >
              {theater.index}
            </span>
            <span className="h-px w-8" style={{ backgroundColor: `${accent}80` }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bg/80">
              {theater.label}
            </span>
          </div>
        </motion.div>

        {/* Video frame */}
        <motion.div
          style={{
            scale,
            borderRadius,
            opacity,
          }}
          className="relative aspect-video w-[94vw] max-w-[1600px] overflow-hidden bg-black shadow-2xl"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          >
            <source src={theater.src} type="video/mp4" />
          </video>

          {/* Vignette for readability */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 25%, transparent 65%, rgba(0,0,0,0.8) 100%)',
            }}
          />

          {/* Bottom-left caption overlay */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="absolute bottom-0 left-0 right-0 z-10 p-8 sm:p-12 lg:p-16"
          >
            <div className="flex flex-col gap-3 sm:max-w-2xl">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ color: accent }}
              >
                {theater.channel}
              </span>
              <h3
                className="text-3xl font-extrabold leading-tight tracking-tight text-bg sm:text-4xl lg:text-5xl"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              >
                {theater.headline}
              </h3>
              <p
                className="text-sm leading-relaxed text-bg/80 sm:text-base sm:leading-relaxed"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}
              >
                {theater.description}
              </p>
            </div>
          </motion.div>

          {/* Metric badge top-right */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="absolute right-6 top-6 z-10 flex items-center gap-2 rounded-full border bg-black/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md sm:right-10 sm:top-10"
          >
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="text-bg">{theater.metric.value}</span>
            <span className="hidden text-bg/60 sm:inline">·</span>
            <span className="hidden text-bg/60 sm:inline">
              {theater.metric.unit}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function MediaShowcase({ accent = '#0EA5E9' }: MediaShowcaseProps) {
  return (
    <div id="caso-point-cola" className="bg-dark">
      {/* Intro block */}
      <section className="flex min-h-[70vh] items-center bg-dark py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span
                className="text-xs font-bold uppercase tracking-[0.22em]"
                style={{ color: accent }}
              >
                Caso · Point Cola
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-bg sm:text-5xl lg:text-6xl">
                Una marca,
                <br />
                <span style={{ color: accent }}>dos canales</span>, un mismo momento.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-bg/70 sm:text-lg">
                El mismo día que Point Cola estaba en pantalla con un comercial
                protagonizado por un referente del fútbol, también estaba en la
                huincha LED de la transmisión del partido. Mix de medios ejecutado.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.24}>
              <div className="mt-10 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-bg/50">
                <span>Scrollea</span>
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block"
                  style={{ color: accent }}
                >
                  ↓
                </motion.span>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Theater 1: Commercial TV */}
      <TheaterSection theater={theaters[0]} accent={accent} />

      {/* Theater 2: LED banner */}
      <TheaterSection theater={theaters[1]} accent={accent} />

      {/* Closing strip with both thumbnails */}
      <section className="bg-dark py-20 sm:py-24">
        <Container>
          <ScrollReveal className="text-center">
            <p
              className="text-xs font-bold uppercase tracking-[0.22em]"
              style={{ color: accent }}
            >
              Mismo día · misma marca · dos canales
            </p>
            <p className="mx-auto mt-5 max-w-xl text-xl font-medium text-bg/80 sm:text-2xl">
              Eso es operar el mix de medios — no pensarlos por separado, sino
              orquestarlos para que lleguen juntos.
            </p>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  )
}
