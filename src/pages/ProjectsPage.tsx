import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/content'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>

        <h1 className="mt-6 text-2xl sm:text-3xl tracking-tight">All Projects</h1>
        <p className="mt-2 text-sm text-white/60">{projects.length} projects and counting</p>

        <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
