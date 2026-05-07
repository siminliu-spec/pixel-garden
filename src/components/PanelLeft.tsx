
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
    <div style={{ padding: '16px 24px 0 24px' }}>
      <div className="type-heading-1" style={{ color: 'var(--ui-text-secondary)' }}>
        {en}
      </div>
      <div className="type-jp-subtitle" style={{ color: 'var(--ui-text-secondary)', marginTop: 4 }}>
        {jp}
      </div>
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
  activeTheme,
  onThemeChange,
  gridGap,
  onGridGapChange,
  depthIntensity,
  onDepthIntensityChange,
}: PanelLeftProps) {

  return (
    <div
      style={{
        width: 296,
        minWidth: 296,
        background: 'var(--ui-surface-panel)',
        borderRight: '1px dashed var(--ui-border-default)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Section 1: Soil / Theme */}
      <div>
        <SectionHeader en="SOIL — THEME" jp="土壌 トークン" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 8,
            rowGap: 16,
            padding: 16,
          }}
        >
          {themes.map((t) => {
            const selected = activeTheme === t.key
            return (
              <button
                key={t.key}
                onClick={() => onThemeChange(t.key)}
                style={{
                  width: 128,
                  height: 99,
                  background: selected ? 'var(--ui-surface-hover)' : 'transparent',
                  border: selected
                    ? '2px dashed var(--ui-border-active)'
                    : '1px dashed var(--ui-border-default)',
                  borderRadius: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: 0,
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 60,
                    background: t.canvasColor,
                    borderRadius: 0,
                  }}
                />
                <span
                  className="type-jp-option"
                  style={{ color: 'var(--ui-text-primary)' }}
                >
                  {t.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px dashed var(--ui-border-default)' }} />

      {/* Section 2: Density */}
      <div>
        <SectionHeader en="DENSITY" jp="密度 · そみつど" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 8,
            rowGap: 8,
            padding: 16,
          }}
        >
          {densities.map((d) => {
            const selected = gridGap === d.gap
            return (
              <button
                key={d.en}
                onClick={() => onGridGapChange(d.gap)}
                style={{
                  width: 128,
                  height: 56,
                  background: selected ? 'var(--ui-surface-hover)' : 'transparent',
                  border: selected
                    ? '1.5px dashed var(--ui-border-active)'
                    : '1px dashed var(--ui-border-default)',
                  borderRadius: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '0 8px',
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    background: 'var(--ui-border-default)',
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div className="type-heading-4" style={{ color: 'var(--ui-text-primary)' }}>
                    {d.en}
                  </div>
                  <div className="type-jp-option" style={{ color: 'var(--ui-text-secondary)' }}>
                    {d.jp}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px dashed var(--ui-border-default)' }} />

      {/* Section 3: Depth */}
      <div>
        <SectionHeader en="DEPTH" jp="奥行き · おくゆき" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 8,
            rowGap: 8,
            padding: 16,
          }}
        >
          {depths.map((d) => {
            const selected = depthIntensity === d.intensity
            return (
              <button
                key={d.en}
                onClick={() => onDepthIntensityChange(d.intensity)}
                style={{
                  width: 128,
                  height: 56,
                  background: selected ? 'var(--ui-surface-hover)' : 'transparent',
                  border: selected
                    ? '1.5px dashed var(--ui-border-active)'
                    : '1px dashed var(--ui-border-default)',
                  borderRadius: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '0 8px',
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    background: 'var(--ui-border-default)',
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div className="type-heading-4" style={{ color: 'var(--ui-text-primary)' }}>
                    {d.en}
                  </div>
                  <div className="type-jp-option" style={{ color: 'var(--ui-text-secondary)' }}>
                    {d.jp}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
