export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/55 px-10 py-9 sm:py-7 sm:px-5">
      <div className="max-w-[1120px] mx-auto flex flex-col items-start gap-5 flex-wrap sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-white font-heading text-[16px] mb-1.5">
            Sokol Lab <span className="text-sky-blue font-normal">// Tandem Repeat Research</span>
          </div>
          <p className="font-body text-[13px]">
            Department of Computer and Information Science · Brooklyn College · CUNY
          </p>
        </div>
        <div className="text-left sm:text-right font-body text-[13px]">
          <p>© {new Date().getFullYear()} Dina Sokol. All rights reserved.</p>
          <p className="mt-1">
            <a href="#" className="text-sky-blue no-underline hover:underline">Accessibility</a> · <a href="#" className="text-sky-blue no-underline hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
