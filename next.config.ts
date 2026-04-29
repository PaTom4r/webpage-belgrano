import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        // SEO/GEO discovery files — públicas, refrescamos cada 24h.
        source: '/(llms.txt|sitemap.xml|robots.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
  // Canonical: belgrano.cl (apex). Cualquier hit a www.* se redirige permanente
  // al apex para no diluir signal SEO ni generar duplicate-content warnings.
  // Las verticales viven en /:slug directo desde 2026-04-29; redirijo /verticales/:slug
  // → /:slug con 301 para preservar cualquier link viejo crawleado por buscadores.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.belgrano.cl' }],
        destination: 'https://belgrano.cl/:path*',
        permanent: true,
      },
      {
        source: '/verticales/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        // Cualquier hijo accidental queda apuntado al slug raíz también.
        source: '/verticales/:slug/:rest*',
        destination: '/:slug/:rest*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
