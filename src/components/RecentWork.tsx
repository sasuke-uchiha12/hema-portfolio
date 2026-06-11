import {
  Bot,
  Code2,
  Database,
  Shield,
  Eye,
  Camera,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { projects, type Project } from '../data/content'

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Code2,
  Database,
  Shield,
  Eye,
  Camera,
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = iconMap[project.categoryIcon] ?? Bot
  const aspectClass = project.aspect === '16/9' ? 'aspect-[16/9]' : 'aspect-[4/3]'

  return (
    <article className="group break-inside-avoid mb-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className={`relative ${aspectClass}`}>
        <img
          src={project.image}
          alt={project.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Icon className="w-4 h-4" />
          <span>{project.category}</span>
        </div>
        <h3 className="mt-2 text-base font-semibold tracking-tight">{project.title}</h3>
        <p className="text-sm text-white/70 mt-1">{project.description}</p>
      </div>
    </article>
  )
}

export default function RecentWork() {
  return (
    <section
      id="work"
      className="max-w-7xl sm:px-6 sm:mt-20 border-white/10 border-t mt-16 mx-auto pt-10 px-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl tracking-tight">Recent Work</h2>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm tracking-tight text-white/70 hover:text-white transition-colors"
        >
          <span>View all</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-6 columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
