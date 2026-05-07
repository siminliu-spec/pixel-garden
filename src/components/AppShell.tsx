import { useState, useCallback } from 'react'
import PanelLeft from './PanelLeft'
import CanvasArea from './CanvasArea'

export default function AppShell() {
  const [theme, setTheme] = useState('spring')
  const [gridGap, setGridGap] = useState(6)
  const [depthIntensity, setDepthIntensity] = useState(0)

  const handleThemeChange = useCallback((key: string) => {
    setTheme(key)
    document.documentElement.dataset.theme = key
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <PanelLeft
        activeTheme={theme}
        onThemeChange={handleThemeChange}
        gridGap={gridGap}
        onGridGapChange={setGridGap}
        depthIntensity={depthIntensity}
        onDepthIntensityChange={setDepthIntensity}
      />
      <CanvasArea theme={theme} gridGap={gridGap} depthIntensity={depthIntensity} />
    </div>
  )
}
