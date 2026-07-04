import { useState } from 'react'
import { ChevronDown, ExternalLink } from 'lucide-react'
import type { Certification } from '../types'

export default function Certifications({ certifications }: { certifications: Certification[] }) {
  const [open, setOpen] = useState(false)

  return (
    <section
      id="certifications"
      className="max-w-7xl sm:px-6 sm:mt-20 border-white/10 border-t mt-16 mx-auto pt-10 px-4"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between text-left"
      >
        <h2 className="text-xl sm:text-2xl tracking-tight">Certifications</h2>
        <span className="flex items-center gap-3">
          <span className="text-xs text-white/50">{certifications.length} credentials</span>
          <ChevronDown
            className="w-4 h-4 text-white/50 transition-transform duration-300"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="mt-8 max-w-3xl divide-y divide-white/10 border-t border-white/10">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="py-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm sm:text-base text-white tracking-tight hover:text-white/70 transition-colors"
                    >
                      {cert.title}
                      <ExternalLink className="w-3 h-3 text-white/40" />
                    </a>
                  ) : (
                    <h3 className="text-sm sm:text-base text-white tracking-tight">{cert.title}</h3>
                  )}
                  <p className="mt-0.5 text-xs text-white/50">{cert.issuer}</p>
                </div>
                <span className="text-xs text-white/40 tracking-wide shrink-0">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
