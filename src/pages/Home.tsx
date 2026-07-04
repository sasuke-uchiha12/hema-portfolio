import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import RecentWork from '../components/RecentWork'
import Experience from '../components/Experience'
import Certifications from '../components/Certifications'
import TechStackBanner from '../components/TechStackBanner'
// import TrustedBy from '../components/TrustedBy'  // kept for reference
import About from '../components/About'
import Footer from '../components/Footer'
import HeroBackground from '../components/HeroBackground'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import { getCertifications, getExperience, getProfile, getProjects } from '../lib/api'
import type { Certification, Profile, Project, TimelineItem } from '../types'

type HomeData = {
  profile: Profile
  projects: Project[]
  timeline: TimelineItem[]
  certifications: Certification[]
}

export default function Home() {
  const [data, setData] = useState<HomeData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    Promise.all([getProfile(), getProjects(), getExperience(), getCertifications()])
      .then(([profile, projects, timeline, certifications]) => {
        if (!cancelled) {
          setData({ profile, projects, timeline, certifications })
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unexpected loading error')
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen">
      <HeroBackground />

      <Navbar resumeUrl={data?.profile.identity.resumeUrl} />
      {error && <ErrorState message={error} />}
      {!error && !data && <LoadingState />}
      {data && (
        <>
          <Hero profile={data.profile} />
          <RecentWork projects={data.projects} />
          <Experience timeline={data.timeline} />
          <Certifications certifications={data.certifications} />
          <TechStackBanner techStack={data.profile.techStack} />
          <About about={data.profile.about} />

          <Footer profile={data.profile} />
        </>
      )}
    </div>
  )
}
