'use client'

import { useEffect } from 'react'

interface CalendlyEmbedProps {
  url?: string
  className?: string
}

export function CalendlyEmbed({
  url = 'https://calendly.com/belgrano/reunion-estrategica',
  className,
}: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly widget script once
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      // Already loaded — trigger init if needed
      if (typeof (window as any).Calendly !== 'undefined') {
        (window as any).Calendly.initInlineWidgets()
      }
      return
    }
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  return (
    <div className={className}>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <div
        className="calendly-inline-widget min-h-[630px] w-full"
        data-url={url}
        style={{ minWidth: '320px' }}
      />
    </div>
  )
}
