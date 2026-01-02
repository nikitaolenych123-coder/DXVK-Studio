import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

export function BrandToast() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show toast after a brief delay
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    // Hide toast after 8 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 9000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-slide-up">
      <button
        onClick={() => window.open('https://guinto2.gumroad.com/l/dxvkstudio', '_blank')}
        className="glass-card px-4 py-3 border-accent-vulkan/30 bg-studio-900/95 backdrop-blur-xl hover:border-accent-vulkan/50 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <img
            src="/icon.png"
            alt="DXVK Studio"
            className="w-8 h-8 rounded-lg shadow-sm"
          />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-studio-100">DXVK Studio</p>
              <ExternalLink className="w-3 h-3 text-studio-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-studio-400">
              by <span className="text-accent-vulkan font-medium">Zendevve</span>
            </p>
          </div>
        </div>
      </button>
    </div>
  )
}
