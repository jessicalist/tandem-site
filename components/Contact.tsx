import ImagePlaceholder from "./ImagePlaceholder"

const PROFILE_LINKS = [
  { icon: '📄', label: 'Google Scholar Profile', href: '#' },
  { icon: '🔗', label: 'ORCID Record', href: '#' },
  { icon: '🐙', label: 'GitHub / Source Code', href: '#' },
  { icon: '🏛', label: 'Brooklyn College Faculty Page', href: '#' },
  { icon: '📚', label: 'PubMed Publications', href: '#' },
]

export default function Contact() {
  return (
    <section className= "py-16 bg-off-white" id="contact">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="section-label">Reach Out</p>
            <h2 className="section-title">Contact & Collaboration</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-start">
          {/* Left: info */}
          <div>
            <p className="font-body text-[15px] text-gray leading-[1.7] mb-7">
              We welcome collaborations with researchers working on genomics, bioinformatics,
              string algorithms, and related areas. Reach out regarding research questions,
              tool support, or potential joint projects.
            </p>
            <div className="flex flex-col gap-4 mb-7">
              <div className="flex gap-4">
                <span className="font-heading text-[11px] font-bold uppercase tracking-[0.07em] text-deep-blue min-w-[90px] pt-0.5 shrink-0">Email</span>
                <span className="font-body text-[15px] text-charcoal leading-[1.55]"> {/* what is leading*/}
                  <a href="mailto:dsokol@brooklyn.cuny.edu">dsokol@brooklyn.cuny.edu</a>
                </span>
              </div>
              <div className="flex gap-4">
                <span className="font-heading text-[11px] font-bold uppercase tracking-[0.07em] text-deep-blue min-w-[90px] pt-0.5 shrink-0">Address</span>
                <span className="font-body text-[15px] text-charcoal leading-[1.55]">
                  Department of Computer and Information Science<br />
                  Brooklyn College, CUNY<br />
                  2900 Bedford Ave, Brooklyn, NY 11210
                </span>
              </div>
              <div className="flex gap-4">
                <span className="font-heading text-[11px] font-bold uppercase tracking-[0.07em] text-deep-blue min-w-[90px] pt-0.5 shrink-0">Office Hours</span>
                <span className="font-body text-[15px] text-charcoal leading-[1.55]">By appointment</span>
              </div>
            </div>

            {/* DNA figure placeholder */}
            <ImagePlaceholder
              height="180px"
              variant="helix"
              label="Lab / department photo or research figure"
              className="labPhoto"
            />
          </div>

          {/* Right: links */}
          <div>
            <h3 className="font-heading text-[18px] font-bold text-deep-blue mb-[18px]">Profiles & Links</h3>
            <div className="flex flex-col gap-2.5">
              {PROFILE_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="flex items-center gap-3 px-[18px] py-3.5 bg-white border border-border rounded text-charcoal font-body text-[14px] font-semibold nounderline transition-all duration-200 hover:bg-ice-blue hover:border-med-blue hover:text-med-blue">
                  <span className="text-[18px] shrink-0" aria-hidden="true">{link.icon}</span>
                  <span>{link.label}</span>
                  <span className="ml-auto text-sky-blue text-[16px]">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
