import { Link, useParams } from 'react-router-dom'
import {
  Bot,
  Code2,
  Database,
  Shield,
  Eye,
  Camera,
  ArrowLeft,
  Github,
  type LucideIcon,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { projects } from '../data/content'

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Code2,
  Database,
  Shield,
  Eye,
  Camera,
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 text-center">
          <h1 className="text-2xl tracking-tight">Project not found</h1>
          <Link
            to="/projects"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all projects</span>
          </Link>
        </section>
        <Footer />
      </div>
    )
  }

  const Icon = iconMap[project.categoryIcon] ?? Bot
  const aspectClass = project.aspect === '16/9' ? 'aspect-[16/9]' : 'aspect-[4/3]'

  return (
    <div className="min-h-screen">
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All projects</span>
        </Link>

        <div className="mt-6 flex items-center gap-2 text-xs text-white/60">
          <Icon className="w-4 h-4" />
          <span>{project.category}</span>
          {project.year && (
            <>
              <span className="text-white/30">·</span>
              <span>{project.year}</span>
            </>
          )}
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl tracking-tight text-white">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
          {project.description}
        </p>

        {/* Hero image / placeholder */}
        <div
          className={`mt-8 relative ${aspectClass} rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]`}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.06] to-white/[0.015]">
              <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)]" />
              <Icon className="w-14 h-14 text-white/15" />
            </div>
          )}
        </div>

        {/* Longer write-up */}
        {project.details && (
          <div className="mt-10">
            <h2 className="text-sm font-medium uppercase tracking-widest text-white/40">Overview</h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
              {project.details}
            </p>
          </div>
        )}

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-medium uppercase tracking-widest text-white/40">
              Key highlights
            </h2>
            <ul className="mt-4 max-w-2xl space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-white/70">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech */}
        {project.tech && project.tech.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-medium uppercase tracking-widest text-white/40">
              Tech used
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs rounded-md bg-white/[0.06] border border-white/10 text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {project.link && (
          <div className="mt-10">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-tight text-neutral-900 bg-white hover:bg-white/90 border border-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        )}
      </article>

      <Footer />
    </div>
  )
}
