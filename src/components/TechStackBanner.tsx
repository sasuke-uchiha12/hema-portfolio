import { useState } from 'react'
import { Icon } from '@iconify/react'
import type { TechStack } from '../types'

type TechItem = {
  icon: string
  label: string
}

type TechGroup = {
  heading: string
  items: TechItem[]
}

// The headline stack — what Hema actually builds with day to day.
const core: TechItem[] = [
  { icon: 'simple-icons:python', label: 'Python' },
  { icon: 'simple-icons:pytorch', label: 'PyTorch' },
  { icon: 'simple-icons:huggingface', label: 'Hugging Face' },
]

const groups: TechGroup[] = [
  {
    heading: 'Languages',
    items: [
      { icon: 'simple-icons:typescript', label: 'TypeScript' },
      { icon: 'simple-icons:javascript', label: 'JavaScript' },
    ],
  },
  {
    heading: 'AI & ML',
    items: [
      { icon: 'simple-icons:tensorflow', label: 'TensorFlow' },
      { icon: 'simple-icons:scikitlearn', label: 'Scikit-learn' },
      { icon: 'simple-icons:opencv', label: 'OpenCV' },
      { icon: 'simple-icons:numpy', label: 'NumPy' },
    ],
  },
  {
    heading: 'Web & UI',
    items: [
      { icon: 'simple-icons:react', label: 'React' },
      { icon: 'simple-icons:vuedotjs', label: 'Vue / Vuetify' },
      { icon: 'simple-icons:tailwindcss', label: 'Tailwind' },
    ],
  },
  {
    heading: 'Tools & Cloud',
    items: [
      { icon: 'simple-icons:jupyter', label: 'Jupyter' },
      { icon: 'simple-icons:git', label: 'Git' },
      { icon: 'simple-icons:github', label: 'GitHub' },
      { icon: 'simple-icons:visualstudiocode', label: 'VS Code' },
      { icon: 'simple-icons:linux', label: 'Linux' },
      { icon: 'simple-icons:amazonwebservices', label: 'AWS' },
      { icon: 'simple-icons:gimp', label: 'GIMP' },
    ],
  },
]

function TechBadge({ icon, label, emphasis = false }: TechItem & { emphasis?: boolean }) {
  const [hovered, setHovered] = useState(false)
  // Emphasis signals "core" through brightness, not size — keeps the row compact.
  const idleIcon = emphasis ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)'
  const idleBorder = emphasis ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.10)'
  const idleLabel = emphasis ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)'
  const hoverIcon = emphasis ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)'
  const hoverLabel = emphasis ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.65)'
  return (
    <div
      className="flex flex-col items-center gap-2 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300"
        style={{
          background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
          borderColor: hovered ? 'rgba(255,255,255,0.18)' : idleBorder,
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: hovered ? '0 6px 16px -6px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <Icon
          icon={icon}
          width={24}
          height={24}
          style={{
            color: hovered ? hoverIcon : idleIcon,
            transition: 'color 0.3s',
          }}
        />
      </div>
      <span
        className="text-[11px] tracking-tight text-center transition-colors duration-300"
        style={{ color: hovered ? hoverLabel : idleLabel }}
      >
        {label}
      </span>
    </div>
  )
}

export default function TechStackBanner({ techStack }: { techStack: TechStack }) {
  return (
    <section id="stack" className="max-w-7xl sm:px-6 sm:mt-16 mt-12 mx-auto px-4">
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl tracking-tight text-white">Tech Stack</h2>
          <p className="text-white/60 mt-2 text-sm">Tools and technologies I work with</p>
        </div>

        {/* Core stack — emphasized via brightness, kept compact */}
        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
          <p className="text-[11px] font-medium text-white/50 uppercase tracking-widest">
            Core
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {core.map((item) => (
              <TechBadge key={item.label} {...item} emphasis />
            ))}
          </div>
        </div>

        {/* Supporting stack */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 lg:divide-x lg:divide-white/10">
          {groups.map((group) => (
            <div key={group.heading} className="lg:px-6 first:lg:pl-0 last:lg:pr-0">
              <p className="text-[11px] font-medium text-white/40 uppercase tracking-widest mb-4">
                {group.heading}
              </p>
              <div className="flex flex-wrap gap-4">
                {group.items.map((item) => (
                  <TechBadge key={item.label} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            <span className="text-white/60">Focus areas:</span> {techStack.focus}
          </p>
        </div>
      </div>
    </section>
  )
}
