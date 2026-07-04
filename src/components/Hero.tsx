import { ArrowRight, Mail, MapPin, Cpu, Check } from 'lucide-react'
import type { Profile } from '../types'

export default function Hero({ profile }: { profile: Profile }) {
  const { identity, heroStats, heroImage } = profile

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left col */}
        <div className="lg:col-span-7">
          <h1 className="leading-none text-white tracking-tight">
            <span className="block text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] font-semibold">
              {identity.name.split(' ').map((word, i) => (
                <span key={i} className={i > 0 ? 'block' : ''}>
                  <span className="tracking-tighter">{word}</span>
                  {i === 0 && <span className="block" />}
                </span>
              ))}
            </span>
          </h1>

          <p className="sm:mt-5 sm:text-3xl leading-relaxed max-w-2xl text-base text-white/70 tracking-tight mt-4">
            {identity.title} — {identity.tagline}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-tight text-neutral-900 bg-white hover:bg-white/90 border border-white/10 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>View Work</span>
            </a>
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center justify-center gap-2 hover:bg-white/15 text-sm font-medium text-white tracking-tight bg-white/10 border-white/10 border rounded-full px-5 py-3 shadow-sm backdrop-blur transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{identity.email}</span>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 border-t border-white/10 pt-4">
              <MapPin className="w-[18px] h-[18px] text-white/50 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium tracking-tight">{identity.location}</p>
                <p className="text-xs text-white/60 mt-0.5">{identity.locationSub}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t border-white/10 pt-4">
              <Cpu className="w-[18px] h-[18px] text-white/50 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium tracking-tight">{identity.focus}</p>
                <p className="text-xs text-white/60 mt-0.5">{identity.focusSub}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t border-white/10 pt-4">
              <Check className="w-[18px] h-[18px] text-white/50 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium tracking-tight">{identity.availability}</p>
                <p className="text-xs text-white/60 mt-0.5">{identity.availabilitySub}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right col — photo card */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)] bg-white/5 rounded-3xl border border-white/10">
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'grayscale(100%) saturate(0.7) contrast(1.1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                    <div className="text-lg font-semibold tracking-tight text-white">{stat.value}</div>
                  </div>
                  <p className="text-[11px] text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
