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
      { icon: 'skill-icons:python-dark', label: 'Python' },
      { icon: 'skill-icons:typescript', label: 'TypeScript' },
      { icon: 'skill-icons:javascript', label: 'JavaScript' },
    ],
  },
  {
    heading: 'AI & ML',
    items: [
      { icon: 'skill-icons:pytorch-dark', label: 'PyTorch' },
      { icon: 'skill-icons:tensorflow-dark', label: 'TensorFlow' },
      { icon: 'skill-icons:scikitlearn-dark', label: 'Scikit-learn' },
      { icon: 'skill-icons:opencv-dark', label: 'OpenCV' },
      { icon: 'logos:hugging-face-icon', label: 'Hugging Face' },
    ],
  },
  {
    heading: 'Web & UI',
    items: [
      { icon: 'skill-icons:react-dark', label: 'React' },
      { icon: 'skill-icons:vuejs-dark', label: 'Vue / Vuetify' },
      { icon: 'skill-icons:tailwindcss-dark', label: 'Tailwind' },
    ],
  },
  {
    heading: 'Tools',
    items: [
      { icon: 'skill-icons:jupyter-dark', label: 'Jupyter' },
      { icon: 'skill-icons:git', label: 'Git' },
      { icon: 'skill-icons:github-dark', label: 'GitHub' },
      { icon: 'skill-icons:vscode-dark', label: 'VS Code' },
      { icon: 'skill-icons:linux-dark', label: 'Linux' },
    ],
  },
]

function TechBadge({ icon, label }: TechItem) {
  return (
    <div className="flex flex-col items-center gap-2 group">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-200">
        <Icon icon={icon} width={28} height={28} />
      </div>
      <span className="text-[11px] text-white/50 group-hover:text-white/80 transition-colors tracking-tight text-center">
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
