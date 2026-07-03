import { timeline } from '../data/content'

export default function Experience() {
  return (
    <section
      id="experience"
      className="max-w-7xl sm:px-6 sm:mt-20 border-white/10 border-t mt-16 mx-auto pt-10 px-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl tracking-tight">Experience</h2>
        <span className="text-xs text-white/50">Education &amp; internships</span>
      </div>

      <ol className="mt-8 max-w-3xl relative border-l border-white/15">
        {timeline.map((item) => (
          <li key={item.year} className="relative pl-6 pb-10 last:pb-0">
            <span
              className={`absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full ${
                item.current ? 'bg-white' : 'bg-white/40'
              }`}
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-xs uppercase tracking-widest text-white/40">
                {item.year}
              </span>
              {item.current && (
                <span className="text-[10px] uppercase tracking-widest text-white/70 border border-white/20 rounded-full px-2 py-0.5">
                  Current
                </span>
              )}
            </div>
            <h3 className="mt-2 text-lg sm:text-xl tracking-tight text-white">{item.role}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
