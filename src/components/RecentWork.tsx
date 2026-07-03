import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/content'
import ProjectCard from './ProjectCard'

export default function RecentWork() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section
      id="work"
      className="max-w-7xl sm:px-6 sm:mt-20 border-white/10 border-t mt-16 mx-auto pt-10 px-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl tracking-tight">Recent Work</h2>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm tracking-tight text-white/70 hover:text-white transition-colors"
        >
          <span>View all</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mt-6 columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
