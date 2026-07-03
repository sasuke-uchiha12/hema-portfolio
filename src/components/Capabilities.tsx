import { Terminal } from 'lucide-react'
import { codeSnippet } from '../data/content'

const KEYWORDS = new Set([
  'import', 'from', 'def', 'return', 'class', 'super', 'self', 'for', 'in', 'if',
  'else', 'None', 'True', 'False', 'and', 'or', 'not',
])

// Single-pass tokenizer: each chunk is consumed once, so injected markup can
// never be re-scanned (which is what corrupted the previous multi-replace version).
function highlightCode(code: string) {
  const esc = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return esc.replace(
    /(#[^\n]*)|("[^"]*"|'[^']*')|\b(\d+(?:\.\d+)?)\b|([A-Za-z_]\w*)/g,
    (match, comment, str, num, word) => {
      if (comment) return `<span style="color:#8b949e">${comment}</span>`
      if (str) return `<span style="color:#a5d6ff">${str}</span>`
      if (num) return `<span style="color:#79c0ff">${num}</span>`
      if (word && KEYWORDS.has(word)) return `<span style="color:#ff7b72">${word}</span>`
      return match
    }
  )
}

export default function Capabilities() {
  return (
    <section
      id="code"
      className="max-w-7xl sm:px-6 sm:mt-20 border-t border-white/10 mt-16 mx-auto pt-10 px-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <h2 className="text-xl sm:text-2xl tracking-tight">How I build</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              A from-scratch Vision Transformer — patch embeddings, multi-head
              self-attention, and positional encodings — implemented in PyTorch for
              CIFAR-10 image classification.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
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
              dangerouslySetInnerHTML={{ __html: highlightCode(codeSnippet) }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
