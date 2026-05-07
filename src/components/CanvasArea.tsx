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

function getCellColor(row: number, _col: number, theme: string, depthIntensity: number): string {
  const themeColors: Record<string, { h: number; s: number; l: number; groundH: number; groundS: number; groundL: number }> = {
    spring:    { h: 130, s: 30, l: 94, groundH: 110, groundS: 40, groundL: 78 },
    midsummer: { h: 68,  s: 35, l: 93, groundH: 50,  groundS: 45, groundL: 82 },
    autumn:    { h: 25,  s: 25, l: 15, groundH: 30,  groundS: 20, groundL: 30 },
    winter:    { h: 215, s: 22, l: 14, groundH: 210, groundS: 18, groundL: 30 },
    peach:     { h: 345, s: 30, l: 95, groundH: 350, groundS: 25, groundL: 85 },
    mono:      { h: 0,   s: 0,  l: 4,  groundH: 0,   groundS: 0,  groundL: 18 },
  };

  const col = _col;
  const colors = themeColors[theme] || themeColors.spring;
  const t = row / 9;
  const noise = (Math.sin(col * 3.7 + row * 2.1) * 0.5 + Math.sin(col * 1.3 + row * 5.9) * 0.3) * 2;
  const blend = t * 0.3;
  const h = colors.h + (colors.groundH - colors.h) * blend + noise;
  const s = colors.s + (colors.groundS - colors.s) * blend + noise;
  const l = colors.l + (colors.groundL - colors.l) * blend + noise;
  const depthFade = (1 - t) * depthIntensity;
  const opacity = (1 - depthFade * 0.85) * 0.55;

  return `hsla(${h}, ${Math.max(0, Math.min(60, s))}%, ${Math.max(3, Math.min(97, l))}%, ${opacity})`;
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
          overflow: 'hidden',
          position: 'relative',
          marginTop: 24,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1200,
            height: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
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
          <span
            className="type-heading-3"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'var(--ui-text-secondary)',
              pointerEvents: 'none',
            }}
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
          marginTop: 'auto',
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
