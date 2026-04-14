// PillsSectionV2 — horizontal tag pills showing services/verticals.
// Server Component — no client JS needed.
const pills = [
  'Belgrano Intelligence',
  'Belgrano Media',
  'Belgrano Brand',
  'DOOH',
  'Chatbots IA',
  'Academy',
  'Trade Marketing',
  'Media Planning',
  'Automatización',
]

export function PillsSectionV2() {
  return (
    <section
      className="border-y py-5"
      style={{
        background: 'var(--color-bg-landing)',
        borderColor: 'var(--color-border-soft)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-medium uppercase tracking-widest text-text-secondary">
            Lo que operamos
          </span>
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border px-3 py-1 text-xs font-medium text-text-secondary transition-colors hover:border-text hover:text-text cursor-default"
              style={{ borderColor: 'var(--color-border-soft)' }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
