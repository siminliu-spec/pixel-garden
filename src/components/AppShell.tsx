import { useState, useEffect, useCallback } from 'react'
import PanelLeft from './PanelLeft'
import CanvasArea from './CanvasArea'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 960px)').matches : true
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 960px)')
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isDesktop
}

export default function AppShell() {
  const [theme, setTheme] = useState('spring')
  const [gridGap, setGridGap] = useState(6)
  const [depthIntensity, setDepthIntensity] = useState(0)
  const isDesktop = useIsDesktop()

  const handleThemeChange = useCallback((key: string) => {
    setTheme(key)
    document.documentElement.dataset.theme = key
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {isDesktop && (
        <div style={{ width: 220, minWidth: 220, flexShrink: 0, overflowY: 'auto', overflowX: 'hidden' }}>
          <PanelLeft
            activeTheme={theme}
            onThemeChange={handleThemeChange}
            gridGap={gridGap}
            onGridGapChange={setGridGap}
            depthIntensity={depthIntensity}
            onDepthIntensityChange={setDepthIntensity}
          />
        </div>
      )}
      <CanvasArea theme={theme} gridGap={gridGap} depthIntensity={depthIntensity} />
    </div>
  )
}