// ClientLogosRow — fila de logos clientes en grayscale, hover a color.
// Reusable: hero (compact) y stats (full). Usa archivos de public/logos/.
import Image from 'next/image'

const logos = [
  { src: '/logos/clc.svg',         alt: 'Clínica Las Condes' },
  { src: '/logos/seguros-clc.svg', alt: 'Seguros CLC' },
  { src: '/logos/hbo.svg',         alt: 'HBO' },
  { src: '/logos/tnt-sports.svg',  alt: 'TNT Sports' },
  { src: '/logos/warner-bros.svg', alt: 'Warner Bros.' },
  { src: '/logos/point-cola.png',  alt: 'Point Cola' },
]

interface Props {
  variant?: 'compact' | 'full'
  label?: string
}

export function ClientLogosRow({ variant = 'compact', label }: Props) {
  const height = variant === 'compact' ? 22 : 32
  const gap    = variant === 'compact' ? 'gap-x-7 gap-y-3' : 'gap-x-10 gap-y-4'

  return (
    <div className="w-full">
      {label && (
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-text-secondary">
          {label}
        </p>
      )}
      <div className={`flex flex-wrap items-center ${gap}`}>
        {logos.map((l) => (
          <div
            key={l.alt}
            className="flex items-center justify-center opacity-60 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={l.src}
              alt={l.alt}
              width={height * 4}
              height={height}
              style={{ height: `${height}px`, width: 'auto' }}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
