export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/70">
        <p className="font-medium text-white">Could not load content.</p>
        <p className="mt-2 text-white/50">{message}</p>
      </div>
    </div>
  )
}
