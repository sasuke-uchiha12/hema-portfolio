import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '../types'

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-white/20 hover:bg-white/[0.05] transition-colors"
    >
      <div className="flex items-center gap-3 text-xs text-white/50">
        <span>{post.date}</span>
        <span className="text-white/30">·</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="mt-3 text-lg sm:text-xl tracking-tight text-white flex items-start justify-between gap-3">
        <span>{post.title}</span>
        <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-white/30 group-hover:text-white/70 transition-colors" />
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-white/60">{post.excerpt}</p>

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
    </Link>
  )
}
