'use client'

import { useEffect, useRef, useState } from 'react'

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

  useEffect(() => {
    if (!shouldLoad) return

    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      document.head.appendChild(link)
    }

    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.head.appendChild(script)
    } else if (typeof (window as any).Calendly?.initInlineWidget === 'function') {
      ;(window as any).Calendly.initInlineWidget({ url, parentElement: containerRef.current })
    }
  }, [shouldLoad, url])

  return (
    <div ref={containerRef} className={className}>
      <div className="overflow-clip rounded-2xl bg-white">
        {shouldLoad ? (
          <div
            className="calendly-inline-widget w-full"
            data-url={url}
            style={{ minWidth: '320px', height: '700px', overflowY: 'hidden' }}
          />
        ) : (
          <div className="flex w-full items-center justify-center" style={{ height: '700px' }}>
            <div className="text-sm text-gray-400">Cargando calendario...</div>
          </div>
        )}
      </div>
    </div>
  )
}
