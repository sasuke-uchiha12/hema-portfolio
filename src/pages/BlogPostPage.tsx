import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Markdown from '../components/Markdown'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import { getBlogPost, getProfile } from '../lib/api'
import type { BlogPost, Profile } from '../types'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    Promise.all([slug ? getBlogPost(slug) : Promise.resolve(null), getProfile()])
      .then(([postData, profileData]) => {
        if (!cancelled) {
          setPost(postData)
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
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar resumeUrl={profile?.identity.resumeUrl} />
        <LoadingState label="Loading post" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar resumeUrl={profile?.identity.resumeUrl} />
        <ErrorState message={error} />
        {profile && <Footer profile={profile} />}
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar resumeUrl={profile?.identity.resumeUrl} />
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-16 text-center">
          <h1 className="text-2xl tracking-tight">Post not found</h1>
          <Link
            to="/blog"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to blog</span>
          </Link>
        </section>
        {profile && <Footer profile={profile} />}
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar resumeUrl={profile?.identity.resumeUrl} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Blog</span>
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/50">
          <span>{post.date}</span>
          <span className="text-white/30">·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="mt-3 text-2xl sm:text-4xl tracking-tight text-white leading-tight">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] tracking-tight text-white/50 border border-white/10 rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {post.coverImage && (
          <div className="mt-8 relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10">
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mt-8 border-t border-white/10 pt-8">
          <Markdown>{post.content}</Markdown>
        </div>
      </article>

      {profile && <Footer profile={profile} />}
    </div>
  )
}
