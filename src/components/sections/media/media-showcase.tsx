// MediaShowcase — compact case study (Point Cola).
// Two videos shown as small autoplay cards with caption alongside, instead of
// the previous full-bleed scroll-pinned theater. Reads as a quick "case study"
// without taking over the page or forcing the user to scroll through 4 viewports.
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { Container } from '@/components/layout/container'

const easing = [0.25, 0.1, 0.25, 1] as const

interface MediaShowcaseProps {
  accent?: string
}

interface CaseClip {
  index: string
  src: string
  label: string
  channel: string
  headline: string
  description: string
}

const clips: CaseClip[] = [
  {
    index: '01',
    src: '/video-media-2.mp4',
    label: 'Comercial TV',
    channel: 'Pauta televisiva · cobertura nacional',
    headline: 'Un referente del fútbol en pantalla',
    description:
      'Pieza publicitaria con una figura deportiva como embajador. Distribución en pauta televisiva abierta y cable, con alcance nacional y frecuencia efectiva.',
  },
  {
    index: '02',
    src: '/video-media-1.mp4',
    label: 'Huincha LED',
    channel: 'Publicidad virtual · en vivo',
    headline: 'La marca en la huincha del partido',
    description:
      'Huincha LED en el costado inferior de la transmisión en vivo. Tecnología de reemplazo virtual para personalizar la señal por mercado.',
  },
]

const headingChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
}

const headingContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const cardItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
}

function ClipCard({ clip, accent }: { clip: CaseClip; accent: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(videoRef, { margin: '-25% 0px -25% 0px' })

  // Autoplay only when in view — saves CPU and battery on mobile.
  if (typeof window !== 'undefined' && videoRef.current) {
    if (inView && videoRef.current.paused) {
      videoRef.current.play().catch(() => {})
    } else if (!inView && !videoRef.current.paused) {
      videoRef.current.pause()
    }
  }

  return (
    <motion.article
      variants={cardItem}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
      style={{
        backgroundImage: `linear-gradient(135deg, ${accent}10 0%, transparent 60%)`,
      }}
    >
      {/* Video frame — 16:9 contained inside the card */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          <source src={clip.src} type="video/mp4" />
        </video>
        {/* Top-left index pill */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className="font-mono text-[11px] font-bold tracking-widest"
            style={{ color: accent }}
          >
            {clip.index}
          </span>
          <span className="h-px w-6" style={{ backgroundColor: `${accent}80` }} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">
            {clip.label}
          </span>
        </div>
      </div>

      {/* Caption block */}
      <div className="flex flex-col gap-3 p-6 sm:p-7">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          {clip.channel}
        </span>
        <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
          {clip.headline}
        </h3>
        <p className="text-sm leading-relaxed text-white/70">
          {clip.description}
        </p>
      </div>

      {/* Hover-only glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at top, ${accent}25, transparent 60%)`,
        }}
      />
    </motion.article>
  )
}

export function MediaShowcase({ accent = '#0EA5E9' }: MediaShowcaseProps) {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? 'visible' : 'hidden'

  return (
    <section
      id="caso-point-cola"
      className="relative overflow-hidden bg-dark py-20 sm:py-24 lg:py-28"
      aria-label="Caso Point Cola"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at top, ${accent}1A 0%, transparent 60%)`,
        }}
      />

      <Container>
        {/* Heading block */}
        <motion.div
          className="mb-12 mx-auto max-w-3xl text-center"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingContainer}
        >
          <motion.span
            variants={headingChild}
            className="text-xs font-bold uppercase tracking-[0.22em]"
            style={{ color: accent }}
          >
            Caso · Point Cola
          </motion.span>
          <motion.h2
            variants={headingChild}
            className="mt-4 font-black uppercase leading-[0.95] tracking-tighter text-white text-3xl sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.035em' }}
          >
            Una marca, dos canales, un mismo momento
          </motion.h2>
          <motion.p
            variants={headingChild}
            className="mt-5 text-base text-white/70 sm:text-lg"
          >
            El mismo día Point Cola estaba en pantalla con un comercial
            protagonizado por un referente del fútbol y en la huincha LED de
            la transmisión del partido. Mix de medios ejecutado.
          </motion.p>
        </motion.div>

        {/* Cards grid 2-col */}
        <motion.div
          className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8"
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridContainer}
        >
          {clips.map((clip) => (
            <ClipCard key={clip.index} clip={clip} accent={accent} />
          ))}
        </motion.div>

        {/* Closing strip */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: easing }}
          className="mx-auto mt-12 max-w-xl text-center text-base font-medium text-white/75 sm:mt-14 sm:text-lg"
        >
          Eso es operar el mix de medios — no pensarlos por separado, sino
          orquestarlos para que lleguen juntos.
        </motion.p>
      </Container>
    </section>
  )
}
