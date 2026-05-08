import { useMemo, useEffect, useState, useRef } from 'react'

const COLS = 16
const ROWS = 10

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
    spring: { h: 130, s: 30, l: 94, groundH: 110, groundS: 40, groundL: 78 },
    midsummer: { h: 68, s: 35, l: 93, groundH: 50, groundS: 45, groundL: 82 },
    autumn: { h: 25, s: 25, l: 15, groundH: 30, groundS: 20, groundL: 30 },
    winter: { h: 215, s: 22, l: 14, groundH: 210, groundS: 18, groundL: 30 },
    peach: { h: 345, s: 30, l: 95, groundH: 350, groundS: 25, groundL: 85 },
    mono: { h: 0, s: 0, l: 4, groundH: 0, groundS: 0, groundL: 18 },
  }
  const col = _col
  const colors = themeColors[theme] || themeColors.spring
  const t = row / 9
  const noise = (Math.sin(col * 3.7 + row * 2.1) * 0.5 + Math.sin(col * 1.3 + row * 5.9) * 0.3) * 2
  const blend = t * 0.3
  const h = colors.h + (colors.groundH - colors.h) * blend + noise
  const s = colors.s + (colors.groundS - colors.s) * blend + noise
  const l = colors.l + (colors.groundL - colors.l) * blend + noise
  const depthFade = (1 - t) * depthIntensity
  const opacity = (1 - depthFade * 0.85) * 0.55
  return `hsla(${h}, ${Math.max(0, Math.min(60, s))}%, ${Math.max(3, Math.min(97, l))}%, ${opacity})`
}

interface CanvasAreaProps {
  theme: string
  gridGap: number
  depthIntensity: number
}

export default function CanvasArea({ theme, gridGap, depthIntensity }: CanvasAreaProps) {
  const isDesktop = useIsDesktop()
  const MOBILE_COLS = 10
  const MOBILE_ROWS = 16

  const cells = useMemo(() => {
    const result: { color: string }[] = []
    // Both desktop and mobile: same 160 cells in row-major order
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        result.push({ color: getCellColor(r, c, theme, depthIntensity) })
    return result
  }, [theme, depthIntensity])

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [cellSize, setCellSize] = useState(0)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const compute = () => {
      const H = el.clientHeight
      const W = el.clientWidth
      const gap = isDesktop ? gridGap : Math.max(1, Math.floor(gridGap / 2))
      const cols = isDesktop ? COLS : MOBILE_COLS
      const rows = isDesktop ? ROWS : MOBILE_ROWS
      const fromH = Math.floor((H - gap * (rows - 1)) / rows)
      const fromW = Math.floor((W - gap * (cols - 1)) / cols)
      setCellSize(Math.max(0, Math.min(fromH, fromW)))
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [isDesktop, gridGap])

  const ghostBtn: React.CSSProperties = {
    height: 33,
    font: "500 14px 'IBM Plex Mono', monospace",
    textTransform: 'uppercase',
    padding: '8px 16px',
    borderRadius: 0,
    border: '1px dashed var(--ui-border-default)',
    background: 'transparent',
    color: 'var(--ui-text-primary)',
    cursor: 'pointer',
  }

  const mobileGap = Math.max(1, Math.floor(gridGap / 2))
  const cols = isDesktop ? COLS : MOBILE_COLS
  const rows = isDesktop ? ROWS : MOBILE_ROWS
  const gap = isDesktop ? gridGap : mobileGap

  return (
    <div style={{ flex: 1, minWidth: 0, background: 'var(--ui-surface-canvas)', padding: isDesktop ? 16 : 8, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100vh' }}>

      {isDesktop ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div className="type-display" style={{ color: 'var(--ui-text-primary)' }}>PIXEL GARDEN</div>
            <div className="type-jp-subtitle" style={{ color: 'var(--ui-text-secondary)' }}>{themeJpNames[theme]}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ ...ghostBtn, width: 76 }}>0/100</button>
            <button style={{ ...ghostBtn, width: 76 }}>RESET</button>
            <button style={{ ...ghostBtn, width: 148, border: '1.5px dashed var(--ui-border-active)', background: 'var(--ui-surface-hover)' }}>GARDEN REPORT</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="type-display" style={{ color: 'var(--ui-text-primary)', fontSize: 18 }}>PIXEL GARDEN</div>
            <div className="type-jp-subtitle" style={{ color: 'var(--ui-text-secondary)', fontSize: 11 }}>{themeJpNames[theme]}</div>
          </div>
          <button style={{ ...ghostBtn, padding: '6px 10px', height: 28, fontSize: 12 }}>0/100</button>
          <button style={{ ...ghostBtn, padding: '6px 10px', height: 28, fontSize: 12, border: '1.5px dashed var(--ui-border-active)', background: 'var(--ui-surface-hover)' }}>THEMES</button>
        </div>
      )}

      <div ref={wrapperRef} style={{ flex: 1, minHeight: 0, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {cellSize > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
            gap: `${gap}px`,
          }}>
            {cells.map((cell, i) => (
              <div key={i} style={{ borderRadius: 2, background: cell.color }} />
            ))}
            <span className="type-heading-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--ui-text-secondary)', pointerEvents: 'none', textAlign: 'center', fontSize: isDesktop ? undefined : 12 }}>
              DRAG A SEED ONTO THE GARDEN
            </span>
          </div>
        )}
      </div>

      {!isDesktop && (
        <div style={{ display: 'flex', gap: 8, marginTop: 6, flexShrink: 0 }}>
          <button style={{ ...ghostBtn, flex: 1, height: 30, fontSize: 12, padding: '4px 8px' }}>RESET</button>
          <button style={{ ...ghostBtn, flex: 1, height: 30, fontSize: 12, padding: '4px 8px', border: '1.5px dashed var(--ui-border-active)', background: 'var(--ui-surface-hover)' }}>REPORT</button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isDesktop ? 24 : 6, flexShrink: 0, marginTop: 6, height: isDesktop ? 75 : 40 }}>
        {['FLOWERS', 'GREENERY', 'PROPS'].map((tab) => (
          <div key={tab} className="type-heading-3" style={{ width: isDesktop ? 130 : undefined, flex: isDesktop ? undefined : 1, height: isDesktop ? 75 : 40, border: '1px dashed var(--ui-border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ui-text-primary)', fontSize: isDesktop ? undefined : 11 }}>
            {tab}
          </div>
        ))}
      </div>
    </div>
  )
}