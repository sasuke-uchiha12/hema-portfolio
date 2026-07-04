import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import { getProfile, getProjects } from '../lib/api'
import type { Profile, Project } from '../types'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    Promise.all([getProjects(), getProfile()])
      .then(([items, profileData]) => {
        if (!cancelled) {
          setProjects(items)
          setProfile(profileData)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unexpected loading error')
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar resumeUrl={profile?.identity.resumeUrl} />

      {loading && <LoadingState label="Loading projects" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && (
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
      )}

      {profile && <Footer profile={profile} />}
    </div>
  )
}
