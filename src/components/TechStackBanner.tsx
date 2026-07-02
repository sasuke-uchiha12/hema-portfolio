import { useState } from 'react'
import { Icon } from '@iconify/react'

type TechItem = {
  icon: string
  label: string
}

type TechGroup = {
  heading: string
  items: TechItem[]
}

const groups: TechGroup[] = [
  {
    heading: 'Languages',
    items: [
      { icon: 'simple-icons:python', label: 'Python' },
      { icon: 'simple-icons:typescript', label: 'TypeScript' },
      { icon: 'simple-icons:javascript', label: 'JavaScript' },
    ],
  },
  {
    heading: 'AI & ML',
    items: [
      { icon: 'simple-icons:pytorch', label: 'PyTorch' },
      { icon: 'simple-icons:tensorflow', label: 'TensorFlow' },
      { icon: 'simple-icons:scikitlearn', label: 'Scikit-learn' },
      { icon: 'simple-icons:opencv', label: 'OpenCV' },
      { icon: 'simple-icons:huggingface', label: 'Hugging Face' },
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
    heading: 'Tools',
    items: [
      { icon: 'simple-icons:jupyter', label: 'Jupyter' },
      { icon: 'simple-icons:git', label: 'Git' },
      { icon: 'simple-icons:github', label: 'GitHub' },
      { icon: 'simple-icons:visualstudiocode', label: 'VS Code' },
      { icon: 'simple-icons:linux', label: 'Linux' },
    ],
  },
]

function TechBadge({ icon, label }: TechItem) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="flex flex-col items-center gap-2 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300"
        style={{
          background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
          borderColor: hovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.10)',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: hovered ? '0 8px 20px -6px rgba(0,0,0,0.6)' : 'none',
        }}
      >
        <Icon
          icon={icon}
          width={24}
          height={24}
          style={{
            color: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)',
            transition: 'color 0.3s',
          }}
        />
      </div>
      <span
        className="text-[11px] tracking-tight text-center transition-colors duration-300"
        style={{ color: hovered ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.40)' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function TechStackBanner() {
  return (
    <section className="max-w-7xl sm:px-6 sm:mt-16 mt-12 mx-auto px-4">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 p-6 sm:p-8">
        {/* Background accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(255,255,255,0.05),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.12]" />
        </div>

        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl tracking-tight text-white">Tech Stack</h2>
            <p className="text-white/60 mt-2 text-sm">Tools and technologies I work with</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 lg:divide-x lg:divide-white/10">
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
        </div>
      </div>
    </section>
  )
}
