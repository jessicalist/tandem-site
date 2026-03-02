const STATS = [
  { num: '40+', label: 'Publications' },
  { num: '20+', label: 'Years of Research' },
  { num: '10+', label: 'Algorithms Developed' },
  { num: '1,000+', label: 'Citations' },
]

export default function StatsBar() {
  return (
    <div className="bg-ice-blue border-b border-sky-blue px-10 py-6">
      <div className="max-w-[1120px] mx-auto grid grid-cols-2 md:grid-cols-4 text-center">
        {STATS.map((s, i) => (
          <div key={i} className={`flex flex-col gap-1 py-2 ${i < STATS.length - 1 ? 'border-r border-sky-blue' : ''}`}>
           <span className="font-heading text-[28px] font-bold text-deep-blue leading-none">{s.num}</span>
            <span className="font-body text-[12px] font-semibold text-gray uppercase tracking-[0.07em]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
