'use client'

import Link from 'next/link'
//import { useState } from 'react'


const NAV_ITEMS = [
  { label: 'Research', href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'Tools & Data', href: '#tools' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  // const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Institutional banner */}
      <div className="bg-[#154360] text-white/75 font-body text-[12px] text-center px-5 py-[7px] tracking-[0.02em]">
        Department of Computer and Information Science · Brooklyn College, City University of New York
        &nbsp;|&nbsp;
        <a href="mailto:dsokol@brooklyn.cuny.edu" className="text-sky-blue no-underline hover:underline">dsokol@brooklyn.cuny.edu</a>
      </div>

      <nav className="bg-deep-blue border-b-[3px] border-med-blue sticky top-0 z-[200]">
        <div className="max-w-[1120px] mx-auto px-10 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-[17px] text-white no-underline py-[18px] tracking-[-0.02em] whitespace-nowrap">
            Sokol Lab <span className="text-sky-blue font-normal">// Tandem Repeats</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex list-none gap-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          {/* <button
            className={styles.hamburger}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>*/}
        </div> 

        {/* Mobile menu
        {mobileOpen && (
          <div className={styles.mobileMenu}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )} */}
      </nav>
    </>
  )
}
