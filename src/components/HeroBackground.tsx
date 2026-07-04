import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized?: boolean
      init: () => void
      destroy?: () => void
    }
  }
}

const PROJECT_ID = 'cqcLtDwfoHqqRPttBbQE'
const CDN = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js'
let unicornScriptPromise: Promise<void> | null = null

function loadUnicornScript() {
  if (window.UnicornStudio?.init) {
    return Promise.resolve()
  }

  if (unicornScriptPromise) {
    return unicornScriptPromise
  }

  unicornScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${CDN}"]`)
    const script = existingScript ?? document.createElement('script')

    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener('error', () => reject(new Error('Failed to load Unicorn Studio')), {
      once: true,
    })

    if (!existingScript) {
      script.src = CDN
      script.async = true
      script.defer = true
      ;(document.head || document.body).appendChild(script)
    }
  })

  return unicornScriptPromise
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const initialized = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || prefersReducedMotion()) return

    let active = true
    let timeoutId: number | undefined
    let idleId: number | undefined

    const clearScheduledInit = () => {
      window.clearTimeout(timeoutId)
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
      timeoutId = undefined
      idleId = undefined
    }

    const initScene = async () => {
      if (initialized.current) return

      try {
        await loadUnicornScript()
        if (!active || initialized.current) return

        window.UnicornStudio?.init()
        if (window.UnicornStudio) {
          window.UnicornStudio.isInitialized = true
        }
        initialized.current = true
      } catch (error) {
        console.warn(error)
      }
    }

    const scheduleInit = () => {
      clearScheduledInit()

      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => void initScene(), { timeout: 1200 })
        return
      }

      timeoutId = globalThis.setTimeout(() => void initScene(), 450)
    }

    const destroyScene = () => {
      clearScheduledInit()
      if (!initialized.current) return

      window.UnicornStudio?.destroy?.()
      if (window.UnicornStudio) {
        window.UnicornStudio.isInitialized = false
      }
      initialized.current = false
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scheduleInit()
          return
        }

        destroyScene()
      },
      { rootMargin: '160px 0px' },
    )

    const handleVisibilityChange = () => {
      if (document.hidden) {
        destroyScene()
      }
    }

    observer.observe(container)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      active = false
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      destroyScene()
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute top-0 w-full -z-10 h-[815px] pointer-events-none">
      <div
        data-us-project={PROJECT_ID}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  )
}
