import ImagePlaceholder from './ImagePlaceholder'

const ACCENT_STYLES: Record<string, string> = {
  blue: 'border-t-med-blue',
  teal: 'border-t-teal',
  sky:  'border-t-sky-blue',
}

const AREAS = [
  {
    icon: '🔍',
    title: 'Tandem Repeat Detection',
    desc: 'Efficient string algorithms for identifying tandem repeats in large genomic datasets, including near-perfect and approximate repeats under various distance metrics.',
    accent: 'blue',
    imgVariant: 'helix' as const,
    imgLabel: 'Repeat detection visualization',
  },
  {
    icon: '🧬',
    title: 'Repeat Classification & Annotation',
    desc: 'Computational methods for categorizing tandem repeats by structure, period length, and evolutionary conservation across genomes and species.',
    accent: 'teal',
    imgVariant: 'microscopy' as const,
    imgLabel: 'Genome browser annotation figure',
  },
  {
    icon: '⚙️',
    title: 'String Algorithmics',
    desc: 'Theoretical foundations and combinatorial properties of repetitions in strings. Optimal-time algorithms for pattern matching, suffix arrays, and indexing.',
    accent: 'sky',
    imgVariant: 'chart' as const,
    imgLabel: 'Algorithm complexity chart',
  },
  {
    icon: '📊',
    title: 'Genome-Wide Repeat Analysis',
    desc: 'Large-scale computational surveys of tandem repeats across reference genomes, exploring their distribution, density, and functional significance.',
    accent: 'sky',
    imgVariant: 'chart' as const,
    imgLabel: 'Genome-wide distribution figure',
  },
  {
    icon: '🏥',
    title: 'Biomedical Applications',
    desc: 'Linking tandem repeat variation to disease phenotypes. Analysis of repeat expansions associated with neurological disorders and other genetic conditions.',
    accent: 'blue',
    imgVariant: 'microscopy' as const,
    imgLabel: 'Disease association figure',
  },
  {
    icon: '🖥️',
    title: 'Software & Tool Development',
    desc: 'Open-source bioinformatics tools enabling reproducible and scalable repeat analysis. Designed for usability by the broader research community.',
    accent: 'teal',
    imgVariant: 'figure' as const,
    imgLabel: 'Tool interface / workflow figure',
  },
]

export default function ResearchSection() {
  return (
    <section className="py-16 bg-white" id="research">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="section-label">Focus Areas</p>
            <h2 className="section-title">Research Areas</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AREAS.map((area) => (
            <div key={area.title} className={`border border-t-[3px] rounded overflow-hidden bg-off-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${ACCENT_STYLES[area.accent]}`}>
              <ImagePlaceholder
                height="160px"
                variant={area.imgVariant}
                label={area.imgLabel}
                className="!rounded-none !border-0 border-b border-border"
              />
              <div className="px-[22px] pt-5 pb-6">
                <span className="text-[22px] block mb-2.5" aria-hidden="true">{area.icon}</span>
                <h3 className="font-heading text-[15px] font-semibold text-deep-blue mb-2 tracking-[-0.01em]">{area.title}</h3>
                <p className="font-body text-[14px] text-gray leading-[1.6]">{area.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
