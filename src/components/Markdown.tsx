import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Markdown renderer styled to match the site's minimal B&W theme.
// Code blocks stay monochrome to sit quietly against the dark background.
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="max-w-2xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-10 mb-3 text-xl sm:text-2xl tracking-tight text-white">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-2 text-lg tracking-tight text-white">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">{children}</p>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 decoration-white/30 hover:decoration-white transition-colors"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="mt-4 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="mt-4 space-y-2 list-decimal pl-5">{children}</ol>,
          li: ({ children }) => (
            <li className="flex gap-3 text-sm sm:text-base leading-relaxed text-white/70">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
              <span>{children}</span>
            </li>
          ),
          strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic text-white/80">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 border-white/20 pl-4 text-sm sm:text-base italic text-white/60">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = (className ?? '').includes('language-')
            if (isBlock) {
              return (
                <code className="font-mono text-[12px] sm:text-[13px] text-white/90">
                  {children}
                </code>
              )
            }
            return (
              <code className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-white/10 text-white/90">
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="mt-5 overflow-auto rounded-xl border border-white/10 bg-black/40 p-4">
              {children}
            </pre>
          ),
          hr: () => <hr className="my-8 border-white/10" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
