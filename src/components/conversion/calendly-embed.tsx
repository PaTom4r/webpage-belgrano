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

  // Only load Calendly resources when the widget scrolls into the viewport.
  // This prevents the ~13 MB Calendly bundle from blocking LCP on initial page load.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // start loading 200px before visible
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Once in view, inject CSS and script
  useEffect(() => {
    if (!shouldLoad) return

    // Inject Calendly CSS only once
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      document.head.appendChild(link)
    }

    // Inject Calendly script only once
    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.head.appendChild(script)
    } else if (typeof (window as any).Calendly?.initInlineWidget === 'function') {
      // Already loaded — re-initialize
      ;(window as any).Calendly.initInlineWidget({ url, parentElement: containerRef.current })
    }
  }, [shouldLoad])

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && (
        <div
          className="calendly-inline-widget w-full"
          data-url={url}
          style={{ minWidth: '320px', height: '700px' }}
        />
      )}
      {!shouldLoad && (
        <div className="flex w-full items-center justify-center rounded-lg bg-gray-50" style={{ height: '700px' }}>
          <div className="text-sm text-gray-400">Cargando calendario...</div>
        </div>
      )}
    </div>
  )
}
