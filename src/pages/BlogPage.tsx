import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogCard from '../components/BlogCard'
import { blogPosts } from '../data/content'

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

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

      <Footer />
    </div>
  )
}
