import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bot, Code2, Database, Shield, Eye, Camera, type LucideIcon } from 'lucide-react'
import { type Project } from '../data/content'

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Code2,
  Database,
  Shield,
  Eye,
  Camera,
}

export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const Icon = iconMap[project.categoryIcon] ?? Bot
  const aspectClass = project.aspect === '16/9' ? 'aspect-[16/9]' : 'aspect-[4/3]'

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="block break-inside-avoid mb-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative ${aspectClass}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        ) : (
          // Clean monochrome placeholder until a real image is added
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.06] to-white/[0.015]">
            <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)]" />
            <Icon
              className="w-9 h-9 text-white/15 transition-colors duration-300"
              style={{ color: hovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)' }}
            />
          </div>
        )}
        {project.image && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        )}
      </div>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Icon className="w-4 h-4" />
          <span>{project.category}</span>
        </div>
        <h3 className="mt-2 text-base font-semibold tracking-tight">{project.title}</h3>
        <p className="text-sm text-white/70 mt-1">{project.description}</p>
      </div>
    </Link>
  )
}
