// One-time script to generate static OG images for all pages.
// Uses sharp to convert SVG to PNG at 1200x630px.
// Run: node scripts/generate-og.mjs

import sharp from 'sharp'
import { mkdir } from 'fs/promises'

const pages = [
  { file: 'og-default.png', title: 'Belgrano', subtitle: 'IA, Marketing &amp; Estrategia' },
  { file: 'og-bots.png', title: 'Bots Conversacionales', subtitle: 'Tu negocio responde solo. Siempre.' },
  { file: 'og-dooh.png', title: 'DOOH &amp; Se&#xF1;al&#xE9;tica Digital', subtitle: 'Tu marca en movimiento, donde importa.' },
  { file: 'og-producciones.png', title: 'Producciones Digitales', subtitle: 'Contenido que convierte, no solo impresiona.' },
  { file: 'og-academy.png', title: 'Belgrano Academy', subtitle: 'Tu equipo con superpoderes de IA.' },
  { file: 'og-nosotros.png', title: 'Nosotros', subtitle: 'Grupo Belgrano — Santiago, Chile' },
]

await mkdir('public/og', { recursive: true })

for (const page of pages) {
  const svgText = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#09090B"/>
    <rect x="0" y="0" width="8" height="630" fill="#ffffff"/>
    <text x="80" y="260" font-family="sans-serif" font-size="64" font-weight="800" fill="#ffffff">${page.title}</text>
    <text x="80" y="330" font-family="sans-serif" font-size="32" fill="#6B7280">${page.subtitle}</text>
    <text x="80" y="540" font-family="sans-serif" font-size="24" fill="#6B7280">belgrano.cl</text>
  </svg>`

  await sharp(Buffer.from(svgText)).png().toFile(`public/og/${page.file}`)
  console.log(`Generated: public/og/${page.file}`)
}

console.log('Done — 6 OG images created in public/og/')
