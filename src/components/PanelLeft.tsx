const themes = [
  { key: 'spring', label: '春の目覚め', canvasColor: '#EEF7E4' },
  { key: 'midsummer', label: '真夏の太陽', canvasColor: '#FAFFD7' },
  { key: 'autumn', label: '秋の黄昏', canvasColor: '#2A1E18' },
  { key: 'winter', label: '冬の霜', canvasColor: '#1B2129' },
  { key: 'peach', label: '桃色の夢', canvasColor: '#FFF9FA' },
  { key: 'mono', label: '墨と紙', canvasColor: '#060606' },
]

const densities = [
  { en: 'LUSH', jp: '密集', gap: 0 },
  { en: 'COMFY', jp: 'ほどよい', gap: 3 },
  { en: 'EASY', jp: '自然', gap: 6 },
  { en: 'BREEZY', jp: 'ゆとり', gap: 12 },
  { en: 'WILD', jp: 'まばら', gap: 20 },
]

const depths = [
  { en: 'PLAIN', jp: 'ありのまま', intensity: 0 },
  { en: 'SOFT', jp: 'ほのか', intensity: 0.4 },
  { en: 'DEEP', jp: '奥行き', intensity: 0.7 },
  { en: 'MISTY', jp: 'おぼろ', intensity: 1.0 },
]

function SectionHeader({ en, jp }: { en: string; jp: string }) {
  return (
    <div style={{ padding: '16px 16px 0 16px' }}>
      <div className="type-heading-1" style={{ color: 'var(--ui-text-secondary)' }}>{en}</div>
      <div className="type-jp-subtitle" style={{ color: 'var(--ui-text-secondary)', marginTop: 4 }}>{jp}</div>
    </div>
  )
}

interface PanelLeftProps {
  activeTheme: string
  onThemeChange: (key: string) => void
  gridGap: number
  onGridGapChange: (gap: number) => void
  depthIntensity: number
  onDepthIntensityChange: (intensity: number) => void
}

export default function PanelLeft({
  activeTheme, onThemeChange, gridGap, onGridGapChange, depthIntensity, onDepthIntensityChange,
}: PanelLeftProps) {
  return (
    <div style={{
      width: '100%', height: '100vh', background: 'var(--ui-surface-panel)',
      borderRight: '1px dashed var(--ui-border-default)',
      display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden',
    }}>
      <div>
        <SectionHeader en="SOIL — THEME" jp="土壌 トークン" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 16 }}>
          {themes.map((t) => {
            const sel = activeTheme === t.key
            return (
              <button key={t.key} onClick={() => onThemeChange(t.key)} style={{
                background: sel ? 'var(--ui-surface-hover)' : 'transparent',
                border: sel ? '2px dashed var(--ui-border-active)' : '1px dashed var(--ui-border-default)',
                borderRadius: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 8, padding: 8,
              }}>
                <div style={{ width: '100%', height: 50, background: t.canvasColor, borderRadius: 0 }} />
                <span className="type-jp-option" style={{ color: 'var(--ui-text-primary)', fontSize: 11 }}>{t.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ borderTop: '1px dashed var(--ui-border-default)' }} />

      <div>
        <SectionHeader en="DENSITY" jp="密度 · そみつど" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 16 }}>
          {densities.map((d) => {
            const sel = gridGap === d.gap
            return (
              <button key={d.en} onClick={() => onGridGapChange(d.gap)} style={{
                background: sel ? 'var(--ui-surface-hover)' : 'transparent',
                border: sel ? '1.5px dashed var(--ui-border-active)' : '1px dashed var(--ui-border-default)',
                borderRadius: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px',
              }}>
                <div style={{ width: 20, height: 20, background: 'var(--ui-border-default)', borderRadius: 2, flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div className="type-heading-4" style={{ color: 'var(--ui-text-primary)', fontSize: 11 }}>{d.en}</div>
                  <div className="type-jp-option" style={{ color: 'var(--ui-text-secondary)', fontSize: 10 }}>{d.jp}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ borderTop: '1px dashed var(--ui-border-default)' }} />

      <div>
        <SectionHeader en="DEPTH" jp="奥行き · おくゆき" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 16 }}>
          {depths.map((d) => {
            const sel = depthIntensity === d.intensity
            return (
              <button key={d.en} onClick={() => onDepthIntensityChange(d.intensity)} style={{
                background: sel ? 'var(--ui-surface-hover)' : 'transparent',
                border: sel ? '1.5px dashed var(--ui-border-active)' : '1px dashed var(--ui-border-default)',
                borderRadius: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px',
              }}>
                <div style={{ width: 20, height: 20, background: 'var(--ui-border-default)', borderRadius: 2, flexShrink: 0 }} />
                <div style={{ textAlign: 'left' }}>
                  <div className="type-heading-4" style={{ color: 'var(--ui-text-primary)', fontSize: 11 }}>{d.en}</div>
                  <div className="type-jp-option" style={{ color: 'var(--ui-text-secondary)', fontSize: 10 }}>{d.jp}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}