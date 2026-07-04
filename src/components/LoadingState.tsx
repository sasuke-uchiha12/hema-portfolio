export default function LoadingState({ label = 'Loading content' }: { label?: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
      <div className="inline-flex items-center gap-3 text-sm text-white/50">
        <span className="h-2 w-2 rounded-full bg-white/50 animate-pulse" />
        <span>{label}</span>
      </div>
      <div className="mt-8 grid gap-4">
        <div className="h-24 rounded-2xl border border-white/10 bg-white/[0.03] animate-pulse" />
        <div className="h-24 rounded-2xl border border-white/10 bg-white/[0.025] animate-pulse" />
      </div>
    </div>
  )
}
