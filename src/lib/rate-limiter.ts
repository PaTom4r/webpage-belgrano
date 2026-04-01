// src/lib/rate-limiter.ts
// In-memory IP rate limiter: 5 requests per hour per IP.
// Note: resets on server restart/redeploy — acceptable for an agency contact form.

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 5

export function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false }
  }

  entry.count++
  return { allowed: true }
}
