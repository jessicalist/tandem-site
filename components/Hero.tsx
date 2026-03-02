import DnaHelix from './DnaHelix'
import SequenceTicker from './SequenceTicker'
import ImagePlaceholder from './ImagePlaceholder'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1A5276] via-[#154360] to-[#1a4971] text-white pt-[72px] px-10 pb-0" id="hero">
      {/* Decorative DNA helices */}
      <div className="hidden lg:block absolute left-0 top-[30px] animate-helix" aria-hidden="true">
        <DnaHelix width={90} height={420} opacity={0.35} />
      </div>
      <div className="hidden lg:block absolute right-0 bottom-[40px] animate-helix-reverse" aria-hidden="true">
        <DnaHelix width={90} height={380} opacity={0.2} color1="#EBF5FB" color2="#AED6F1" />
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[60px] items-center pb-14">
        {/* Main hero content */}
        <div className="animate-fade-up">
          <p className="flex items-center gap-2 font-body text-[12px] font-semibold tracking-[0.1em] uppercase text-sky-blue mb-[18px]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal shrink-0"
             /> Computational Biology · String Algorithms · Genomics
          </p>
          <h1 className="font-heading text-[26px] sm:text-[32px] lg:text-[42px] font-extrabold leading-[1.15] tracking-[-0.03em] mb-[22px]">
            Tandem Repeat<br />
            <em>Detection & Analysis</em>
          </h1>
          <p className="text-[17px] leading-[1.7] text-white/80 max-w-[540px] mb-[34px]">
            We develop efficient algorithms and computational tools for the identification,
            classification, and biological analysis of <strong>tandem repeats</strong> in genomic sequences —
            bridging string algorithmics with functional genomics.
          </p>
          {/*check claude on step 9 style.buttons*/}
          <div className="flex gap-3 flex-wrap">
            <a href="#publications" className="btn btn-primary">View Publications</a>
            <a href="#tools" className="btn btn-secondary">Tools & Software</a>
          </div>
        </div>

        {/* Researcher card */}
        <aside className="hidden lg:block bg-white/[0.07] border border-sky-blue/25 rounded-md overflow-hidden backdrop-blur-sm animate-fade-up [animation-delay:0.15s]">
          <ImagePlaceholder
            height="120px"
            label="Dr. Dina Sokol — Photo"
            variant="portrait"
          />
          <div className="p-5">
            <h2 className="font-heading text-[17px] font-bold text-white mb-1">Dr. Dina Sokol</h2>
            <p className="text-[13px] text-sky-blue mb-0.5">Associate Professor</p>
            <p className="text-[12px] text-white/50 mb-4">Brooklyn College · CUNY</p>
            <div className="flex flex-col gap-1.5">
              <a href="mailto:dsokol@brooklyn.cuny.edu" className="text-[13px] text-white/70 no-underline hover:text-sky-blue transition-colorsduration-200">
                ✉ dsokol@brooklyn.cuny.edu
              </a>
              <a href="#" className="text-[13px] text-white/70 no-underline hover:text-sky-blue transition-colorsduration-200">📄 Google Scholar</a>
              <a href="#" className="text-[13px] text-white/70 no-underline hover:text-sky-blue transition-colorsduration-200">🔗 ORCID</a>
              <a href="#" className="text-[13px] text-white/70 no-underline hover:text-sky-blue transition-colorsduration-200">🏛 Faculty Page</a>
            </div>
          </div>
        </aside>
      </div>

      {/* Sequence ticker at bottom */}
      <div className="border-t border-sky-blue/15 -mx-10">
        <SequenceTicker />
      </div>
    </section>
  )
}
