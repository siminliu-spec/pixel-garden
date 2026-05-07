import { useMemo } from 'react'

const COLS = 16
const ROWS = 10

const themeJpNames: Record<string, string> = {
  spring: '春の目覚め',
  midsummer: '真夏の太陽',
  autumn: '秋の黄昏',
  winter: '冬の霜',
  peach: '桃色の夢',
  mono: '墨と紙',
}

function getCellColor(row: number, col: number, _theme: string, depthIntensity: number): string {
  const t = row / 9
  const noise = (Math.sin(col * 3.7 + row * 2.1) * 0.5 + Math.sin(col * 1.3 + row * 5.9) * 0.3) * 2

  // Base color: cool mint green — watercolor wash
  const h = 120 + (100 - 120) * t * 0.4 + noise
  const s = 25 + (18 - 25) * t * 0.4 + noise
  const l = 93 - t * 8 + noise

  // Depth fade + global translucency
  const depthFade = (1 - t) * depthIntensity
  const opacity = (1 - depthFade * 0.85) * 0.5

  return `hsla(${h}, ${Math.max(10, Math.min(40, s))}%, ${Math.max(70, Math.min(98, l))}%, ${opacity})`
}

interface CanvasAreaProps {
  theme: string
  gridGap: number
  depthIntensity: number
}

export default function CanvasArea({ theme, gridGap, depthIntensity }: CanvasAreaProps) {
  const cells = useMemo(() => {
    const result: { row: number; col: number; color: string }[] = []
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        result.push({ row: r, col: c, color: getCellColor(r, c, theme, depthIntensity) })
      }
    }
    return result
  }, [theme, depthIntensity])

  return (
    <div
      style={{
        flex: 1,
        background: 'var(--ui-surface-canvas)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 55,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div>
          <div className="type-display" style={{ color: 'var(--ui-text-primary)' }}>
            PIXEL GARDEN
          </div>
          <div className="type-jp-subtitle" style={{ color: 'var(--ui-text-secondary)' }}>
            {themeJpNames[theme] || '春の目覚め'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{
              width: 76,
              height: 33,
              font: "500 14px 'IBM Plex Mono', monospace",
              textTransform: 'uppercase',
              padding: '8px 16px',
              borderRadius: 0,
              border: '1px dashed var(--ui-border-default)',
              background: 'transparent',
              color: 'var(--ui-text-primary)',
              cursor: 'pointer',
            }}
          >
            0/100
          </button>
          <button
            style={{
              width: 76,
              height: 33,
              font: "500 14px 'IBM Plex Mono', monospace",
              textTransform: 'uppercase',
              padding: '8px 16px',
              borderRadius: 0,
              border: '1px dashed var(--ui-border-default)',
              background: 'transparent',
              color: 'var(--ui-text-primary)',
              cursor: 'pointer',
            }}
          >
            RESET
          </button>
          <button
            style={{
              width: 148,
              height: 33,
              font: "500 14px 'IBM Plex Mono', monospace",
              textTransform: 'uppercase',
              padding: '8px 16px',
              borderRadius: 0,
              border: '1.5px dashed var(--ui-border-active)',
              background: 'var(--ui-surface-hover)',
              color: 'var(--ui-text-primary)',
              cursor: 'pointer',
            }}
          >
            GARDEN REPORT
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          marginTop: 24,
        }}
      >
        <div
          style={{
            width: '100%',
            minHeight: 700,
            height: '80vh',
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            gap: `${gridGap}px`,
          }}
        >
          {cells.map((cell, i) => (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                borderRadius: 2,
                background: cell.color,
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            className="type-heading-3"
            style={{ color: 'var(--ui-text-secondary)' }}
          >
            DRAG A SEED ONTO THE GARDEN
          </span>
        </div>
      </div>

      {/* Seed Selection Bar */}
      <div
        style={{
          height: 75,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          flexShrink: 0,
          marginTop: 24,
        }}
      >
        {['FLOWERS', 'GREENERY', 'PROPS'].map((tab) => (
          <div
            key={tab}
            className="type-heading-3"
            style={{
              width: 130,
              height: 75,
              border: '1px dashed var(--ui-border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ui-text-primary)',
            }}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  )
}
