const PUBS = [
  {
    year: 2010,
    journal: "The Journal of Biological Databases and Curation",
    tag: "Algorithms",
    tagColor: "blue",
    title:
      "TRedD—A database for tandem repeats over the edit distance",
    authors: [
      { name: "Sokol, D.", highlight: true },
      { name: "Atagun, F" },
    ],
    href: "https://academic.oup.com/database/article/doi/10.1093/database/baq003/403520",
  },
  {
    year: 2009,
    journal: "Brooklyn College Department of Computer and Information Science",
    tag: "Genomics",
    tagColor: "teal",
    title: "TandemGraph: A Graphical Tool for Modeling String Regularities",
    authors: [{ name: "Sokol, D.", highlight: true }, { name: "Rakhamimov, R." }],
    href: "https://tandem.sci.brooklyn.cuny.edu/references/camera09.pdf",
  },
  {
    year: 2007,
    journal: "Theoretical Computer Science",
    tag: "Theory",
    tagColor: "sky",
    title:
      "Tandem Repeats over the Edit Distance ERROR LINK",
    authors: [
      { name: "Sokol, D.", highlight: true },
      { name: "Tojeira, J." },
    ],
    href: "#",
  },
  {
    year: 2006,
    journal: "Brooklyn College Department of Computer and Information Science",
    tag: "Conference",
    tagColor: "blue",
    title:
      "Filtering Tandem Repeats in DNA Sequences",
    authors: [
      { name: "Sokol, D.", highlight: true },
      { name: "Tojeira, J." },
    ],
    href: "https://tandem.sci.brooklyn.cuny.edu/references/biocomp06.pdf",
  },
  {
    year: 2001,
    journal: "Genome Research",
    tag: "Disease",
    tagColor: "teal",
    title:
      "An Algorithm for Approximate Tandem Repeats",
    authors: [{ name: "Landau, G." }, {name: "Schmidt, J."}, { name: "Sokol, D.", highlight: true }],
    href: "https://tandem.sci.brooklyn.cuny.edu/references/jcb.pdf",
  },
];

const TAG_STYLES: Record<string, string> = {
  blue: "text-med-blue bg-med-blue/[0.07] border border-med-blue/25",
  teal: "text-teal bg-teal/[0.07] border border-teal/25",
  sky: "text-deep-blue bg-sky-blue/25 border border-sky-blue/50",
};

function formatAuthors(authors: { name: string; highlight?: boolean }[]) {
  return authors.map((a, i) => (
    <span key={i}>
      {i > 0 && ", "}
      {a.highlight ? (
        <strong key={a.name} className="text-charcoal italic">
          {a.name}
        </strong>
      ) : (
        a.name
      )}
    </span>
  ));
}

export default function Publications() {
  return (
    <section className="py-16 bg-off-white" id="publications">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="section-label">Peer-Reviewed Work</p>
            <h2 className="section-title">Selected Publications</h2>
          </div>
          <a href="#" className="see-all">
            All on Google Scholar →
          </a>
        </div>

        <div className="flex flex-col gap-4">
          {PUBS.map((pub) => (
            <article
              key={pub.title}
              className="bg-white border border-border border-l-4 border-l-med-blue rounded-r hover:border-l-teal transition-colors duration-200 px-6 py-5"
            >
              <div className="flex items-center gap-2.5 flex-wrap mb-2">
                <span className="font-heading text-[11px] font-bold text-white bg-deep-blue px-2 py-0.5 rounded-sm tracking-[0.04em]">
                  {pub.year}
                </span>
                <span className="font-body text-[13px] italic text-gray">
                  {pub.journal}
                </span>
                <span
                  className={`font-heading text-[10px] font-bold tracking-[0.06em] uppercase px-2 py-0.5 rounded-sm ${TAG_STYLES[pub.tagColor]}`}
                >
                  {pub.tag}
                </span>
              </div>
              <h3 className="font-heading text-[15px] font-semibold leading-[1.4] mb-1.5">
                <a
                  href={pub.href}
                  className="text-deep-blue no-underline hover:text-med-blue hover:underline transition-colors duration-200"
                >
                  {pub.title}
                </a>
              </h3>
              <p className="font-body text-[14px] text-gray">
                {formatAuthors(pub.authors)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
