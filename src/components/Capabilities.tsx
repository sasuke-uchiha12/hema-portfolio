import { Sparkles, Terminal } from 'lucide-react'
import { techStack, ragSnippet, timeline } from '../data/content'

function TechStackCard() {
  return (
    <div className="bg-white/5 border-white/10 border rounded-2xl p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-white/80" />
        <h3 className="text-xl font-semibold tracking-tight">Tech Stack</h3>
      </div>

      <div className="mt-3 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-white/80 mb-2">Frontend &amp; UI</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.frontend.map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs rounded-md bg-white/10 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-white/80 mb-2">AI &amp; Backend</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.ai.map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs rounded-md bg-white/10 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-black/30 rounded-lg border border-white/10">
        <p className="text-xs text-white/70 leading-relaxed">
          <span className="font-medium text-white/80">Focus areas:</span> {techStack.focus}
        </p>
      </div>
    </div>
  )
}

function colorizeRag(code: string) {
  return code
    .replace(/\b(from|import|def|return)\b/g, '<span style="color:#ff7b72">$1</span>')
    .replace(/\b(FastAPI|rag|tracers|embed|search|rerank|answer|trace)\b/g, '<span style="color:#79c0ff">$1</span>')
    .replace(/\b(app|q_vec|chunks|ranked|q|user_id|k|filters)\b/g, '<span style="color:#ffa657">$1</span>')
    .replace(/(@\w+)/g, '<span style="color:#a5a5a5">$1</span>')
    .replace(/(\.(post|get|put|delete)\b)/g, '<span style="color:#d2a8ff">$1</span>')
    .replace(/"([^"]*)"/g, '<span style="color:#a5d6ff">"$1"</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#a5d6ff">$1</span>')
    .replace(/\b(True|False|None)\b/g, '<span style="color:#ff7b72">$1</span>')
    .replace(/\b(str)\b/g, '<span style="color:#ff7b72">$1</span>')
}

function RagPipelineCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-white/80" />
          <h3 className="text-xl font-semibold tracking-tight">Vision Transformer</h3>
        </div>
        <span className="text-[11px] text-white/60">~42 lines</span>
      </div>
      <pre
        className="text-[12px] leading-relaxed overflow-auto text-white/90 bg-black/40 border-white/10 border rounded-xl mt-3 p-3 font-mono"
        style={{ fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas" }}
        dangerouslySetInnerHTML={{ __html: colorizeRag(ragSnippet) }}
      />
    </div>
  )
}

function TimelineCard() {
  return (
    <div className="bg-white/5 border-white/10 border rounded-2xl p-4">
      <div className="flex items-center gap-2">
        {/* Simple timeline icon using inline SVG since lucide doesn't have one */}
        <svg
          className="w-4 h-4 text-white/80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path d="M9 5v4" />
          <rect width="4" height="6" x="7" y="9" rx="1" />
          <path d="M9 15v2" />
          <path d="M17 3v2" />
          <rect width="4" height="8" x="15" y="5" rx="1" />
          <path d="M17 13v3" />
        </svg>
        <h3 className="text-xl font-semibold tracking-tight">Timeline</h3>
      </div>

      <ol className="mt-3">
        {timeline.map((item, i) => (
          <li
            key={item.year}
            className={`relative pl-6 border-l border-white/10 ${i < timeline.length - 1 ? 'pb-4' : ''}`}
          >
            <span
              className={`absolute left-[-5px] top-1.5 w-2 h-2 rounded-full ${
                item.current ? 'bg-white' : i === 1 ? 'bg-white/80' : 'bg-white/60'
              }`}
            />
            <p className="text-xs text-white/60">{item.year}</p>
            <p className="text-sm font-medium tracking-tight">{item.role}</p>
            <p className="text-xs text-white/60 mt-1">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Capabilities() {
  return (
    <section
      id="stack"
      className="max-w-7xl sm:px-6 sm:mt-20 border-t border-white/10 mt-16 mx-auto pt-10 px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <TechStackCard />
        <RagPipelineCard />
        <TimelineCard />
      </div>
    </section>
  )
}
