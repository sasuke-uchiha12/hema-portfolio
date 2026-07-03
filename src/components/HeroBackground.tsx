import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean
      init: () => void
      destroy?: () => void
    }
  }
}

const PROJECT_ID = 'cqcLtDwfoHqqRPttBbQE'
const CDN = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js'

export default function HeroBackground() {
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true

    if (window.UnicornStudio?.isInitialized) {
      window.UnicornStudio.init()
      return
    }

    window.UnicornStudio = { isInitialized: false, init: () => {} }

    const script = document.createElement('script')
    script.src = CDN
    script.onload = () => {
      if (!window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init()
        window.UnicornStudio.isInitialized = true
      }
    }
    ;(document.head || document.body).appendChild(script)

    return () => {
      window.UnicornStudio?.destroy?.()
    }
  }, [])

  return (
    <div className="absolute top-0 w-full -z-10 h-[815px] pointer-events-none">
      <div
        data-us-project={PROJECT_ID}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  )
}
