'use client'

const BASES = 'ATCGATCGATCGATCG'.split('')
const SEQUENCE = Array(16).fill(BASES).flat().join('')

const BASE_COLORS: Record<string, string> = {
  A: '#2E86C1',
  T: '#148F77',
  C: '#AED6F1',
  G: '#1A5276',
}

export default function SequenceTicker() {
  // Duplicate for seamless loop
  const full = SEQUENCE + SEQUENCE

  return (
    <div className="overflow-hidden w-full bg-transparent py-2" aria-hidden="true">
      <div className="inline-flex gap-0.5 animate-ticker whitespace-nowrap">
        {full.split('').map((base, i) => (
          <span
            key={i}
            className="font-heading text-[11px] font-bold tracking-[0.08em] opacity-35 hover:opacity-60 transition-opacity duration-200"
            style={{ color: BASE_COLORS[base] ?? '#AED6F1' }}
          >
            {base}
          </span>
        ))}
      </div>
    </div>
  )
}
