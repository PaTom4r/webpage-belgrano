'use client'

import { useEffect, useRef, useState } from 'react'
import { InlineWidget } from 'react-calendly'

interface CalendlyEmbedProps {
  url?: string
  className?: string
}

export function CalendlyEmbed({
  url = 'https://calendly.com/belgrano/30min',
  className,
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  // Lazy-load: only render the widget when it scrolls into the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <InlineWidget
          url={url}
          styles={{ height: '700px', minWidth: '320px' }}
        />
      ) : (
        <div className="flex w-full items-center justify-center rounded-2xl bg-white/5" style={{ height: '700px' }}>
          <div className="text-sm text-gray-400">Cargando calendario...</div>
        </div>
      )}
    </div>
  )
}
