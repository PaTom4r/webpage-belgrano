import type { MetadataRoute } from 'next'

// Política explícita para bots de IA (2026):
// - Allow para training+search bots de OpenAI/Anthropic/Perplexity/Google/Apple/Cohere
//   porque Belgrano vende visibilidad: discoverability > control de training data.
// - Block solo Bytespider (TikTok/ByteDance, contestado, valor B2B Chile bajo).
// - Default `*: allow:/` se mantiene como red de seguridad.
const ALLOWED_AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'cohere-ai',
  'cohere-training-data-crawler',
  'meta-externalagent',
  'Meta-ExternalFetcher',
]

const BLOCKED_BOTS = ['Bytespider']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...ALLOWED_AI_BOTS.map((userAgent) => ({ userAgent, allow: '/' })),
      ...BLOCKED_BOTS.map((userAgent) => ({ userAgent, disallow: '/' })),
    ],
    sitemap: 'https://belgrano.cl/sitemap.xml',
    host: 'https://belgrano.cl',
  }
}
