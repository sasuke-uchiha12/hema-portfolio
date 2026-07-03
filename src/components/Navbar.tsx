import { useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { identity } from '../data/content'

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#code', label: 'Code' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      <nav className="flex items-center justify-between border-b border-white/10 pb-4">
        {/* Brand */}
        {/* <a href="#" className="inline-flex items-center gap-2">
          <svg
            className="w-9 h-9 md:w-14 md:h-14"
            viewBox="0 0 48 48"
            aria-hidden="true"
            strokeWidth="2"
          >
            <path d="M24 8 L40 36 H8 Z" fill="currentColor" />
          </svg>
          <span className="text-sm sm:text-base font-medium tracking-tight">{identity.name}</span>
        </a> */}

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 hover:text-white tracking-tight transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={identity.resumeUrl}
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium tracking-tight text-white bg-white/10 hover:bg-white/15 border border-white/10 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Resume</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-white/5 shadow-sm overflow-hidden">
          <div className="px-4 py-3 grid gap-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-white/90 tracking-tight py-1.5"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="border-t border-white/10 px-4 py-3">
            <a
              href={identity.resumeUrl}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-tight text-neutral-900 bg-white hover:bg-white/90 border border-white/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
