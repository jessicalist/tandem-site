import ImagePlaceholder from "./ImagePlaceholder";

const TOOLS = [
  {
    icon: "🔬",
    name: "TRFinder",
    desc: "Fast tandem repeat detection for short- and long-read sequencing data. Supports Hamming and edit distance.",
    imgLabel: "TRFinder interface / output figure",
    href: "#",
  },
  {
    icon: "📈",
    name: "RepeatScope",
    desc: "Visualization and statistical analysis of repeat distributions across chromosomes and genomes.",
    imgLabel: "RepeatScope visualization figure",
    href: "#",
  },
  {
    icon: "🗂️",
    name: "TR-DB",
    desc: "Curated database of tandem repeats with functional annotations and cross-species comparisons.",
    imgLabel: "TR-DB database screenshot",
    href: "#",
  },
  {
    icon: "⚡",
    name: "ApproxTR",
    desc: "Approximate tandem repeat finder supporting insertions, deletions, and substitutions.",
    imgLabel: "ApproxTR output example",
    href: "#",
  },
];

const NEWS = [
  {
    month: "Jan",
    day: "15",
    year: 2025,
    title: "New paper accepted in Journal of Computational Biology",
    desc: "Our work on approximate tandem repeat detection with bounded edit distance has been accepted for publication.",
  },
  {
    month: "Nov",
    day: "08",
    year: 2024,
    title: "Presenting at RECOMB 2024",
    desc: "Dr. Sokol presented our latest results on genome-wide repeat profiling at RECOMB 2024 in Boston.",
  },
  {
    month: "Sep",
    day: "22",
    year: 2024,
    title: "TRFinder v2.1 released",
    desc: "New version includes support for long-read nanopore data and improved performance on large chromosomes.",
  },
  {
    month: "Aug",
    day: "05",
    year: 2024,
    title: "NSF Grant Awarded",
    desc: "We received NSF funding to continue our work on repeat structure and disease association.",
  },
];

export default function ToolsAndNews() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start">
          {/* TOOLS */}
          <div id="tools">
            <div className="section-header">
              <div>
                <p className="section-label">Open Source</p>
                <h2 className="section-title">Tools & Software</h2>
              </div>
              <a href="#" className="see-all">
                GitHub →
              </a>
            </div>
            <div className="flex flex-col gap-3.5">
              {TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="border border-border rounded overflow-hidden bg-ice-blue hover:bg-white transition-colors duration-200"
                >
                  <ImagePlaceholder
                    height="100px"
                    variant="figure"
                    label={tool.imgLabel}
                    className="!rounded-none !border-0 border-b border-border"
                  />
                  <div className="flex gap-3 items-start p-4">
                    <span
                      className="text-[20px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      {tool.icon}
                    </span>
                    <div>
                      <h4 className="font-heading text-[14px] font-semibold text-deep-blue mb-1">
                        {tool.name}
                      </h4>
                      <p className="font-body text-[13px] text-gray leading-[1.5] mb-1.5">
                        {tool.desc}
                      </p>
                      <a
                        href={tool.href}
                        className="font-body text-[13px] font-semibold text-med-blue no-underline hover:text-deep-blue hover:underline transition-colors duration-200"
                      >
                        Download / Docs →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEWS */}
          <div id="news">
            <div className="section-header">
              <div>
                <p className="section-label">Latest</p>
                <h2 className="section-title">News & Updates</h2>
              </div>
            </div>
            <div className="flex flex-col">
              {NEWS.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-4 py-[18px] items-start ${i < NEWS.length - 1 ? "border-b border-[#E8EDF2]" : ""}`}
                >
                  <div className="flex flex-col items-center bg-ice-blue border border-sky-blue rounded-sm px-2.5 py-2 min-w-[52px] shrink-0 text-center">
                    <span className="font-heading text-[10px] font-bold uppercase tracking-[0.08em] text-deep-blue leading-none mb-0.5">
                      {item.month}
                    </span>
                    <span className="font-heading text-[22px] font-bold text-deep-blue leading-none">
                      {item.day}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading text-[14px] font-semibold text-deep-blue mb-1 leading-[1.4]">
                      {item.title}
                    </h4>
                    <p className="font-body text-[13px] text-gray leading-[1.5]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
