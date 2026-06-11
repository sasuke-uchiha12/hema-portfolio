import { Handshake } from 'lucide-react'
import { about } from '../data/content'

export default function About() {
  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]">
      <div className="relative aspect-[4/3]">
        <img
          src={about.image}
          alt={about.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold tracking-tight">About</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{about.bio}</p>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {about.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl tracking-tight">{stat.value}</div>
              <p className="text-[11px] text-white/60 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 bg-black/30 rounded-xl border border-white/10">
          <h4 className="text-sm font-medium tracking-tight text-white mb-2">Currently learning</h4>
          <p className="text-sm text-white/70">{about.currentlyLearning}</p>
        </div>

        <a
          href="#contact"
          className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-tight text-neutral-900 bg-white hover:bg-white/90 border border-white/10 transition-colors"
        >
          <Handshake className="w-4 h-4" />
          <span>Let's collaborate</span>
        </a>
      </div>
    </div>
  )
}
