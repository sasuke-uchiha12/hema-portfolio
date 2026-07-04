import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogCard from '../components/BlogCard'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import { getBlogPosts, getProfile } from '../lib/api'
import type { BlogPost, Profile } from '../types'

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    Promise.all([getBlogPosts(), getProfile()])
      .then(([posts, profileData]) => {
        if (!cancelled) {
          setBlogPosts(posts)
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

      {loading && <LoadingState label="Loading blog" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
          <h1 className="text-2xl sm:text-3xl tracking-tight">Blog</h1>
          <p className="mt-2 text-sm text-white/60">
            Notes on AI, machine learning, and the things I build along the way.
          </p>

          <div className="mt-8 space-y-5">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {profile && <Footer profile={profile} />}
    </div>
  )
}
