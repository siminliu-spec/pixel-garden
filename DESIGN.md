# Pixel Garden — Design Specification

> Figma source: `RbnIqGE0y2FZ14VLjjaPjE` · Desktop node: `505:19708`
> This is the single source of truth for code implementation.

---

## 1. Color Tokens (CSS Custom Properties)

Theme switching: set `data-theme` on `<html>`. All 26 variables swap at once.

### Seed Tokens (15 vars × 6 themes)

| Token | Spring | Midsummer | Autumn | Winter | 桃色の夢 | Mono |
|---|---|---|---|---|---|---|
| --seed-bloom-warm | #FF9EB8 | #FF6F3F | #FF9645 | #D999AC | #FF63A4 | #B2B2B2 |
| --seed-bloom-warm-light | #FFC6D5 | #FFB085 | #FFC055 | #EFCDD6 | #FFCFE3 | #D0D0D0 |
| --seed-bloom-cool | #B2A2FF | #49D8FF | #B497CB | #AFB4DE | #CCB6F7 | #808080 |
| --seed-bloom-cool-light | #D1C9FF | #C5E9FA | #D5C2E4 | #CED2EF | #E7E3F7 | #929292 |
| --seed-stem | #72D984 | #7EFFAB | #8DE4B3 | #6EAD9C | #8DE4B3 | #5E5E5E |
| --seed-stem-dark | #3E9753 | #3E9762 | #3E9762 | #467460 | #3F8C63 | #4C4C4C |
| --seed-bark | #A68D74 | #C49F8A | #B79B8C | #748596 | #B79B8C | #383838 |
| --seed-stamen | #E8B84D | #FF9E00 | #FFE17D | #C9B58C | #FFC055 | #A2A2A2 |
| --seed-bloom-yellow | #FFEF44 | #FCE300 | #FFEF44 | #FFF491 | #FFEF44 | #C0C0C0 |
| --seed-accent | #FF90C0 | #FF5C5E | #E4896A | #D9A8B6 | #FF649D | #E0E0E0 |
| --seed-highlight | #FBFFEF | #FFF200 | #FFFDE0 | #F4F9FF | #FFCBD6 | #F2F2F2 |
| --seed-water | #A9E6F7 | #7ADFF7 | #A1CCDB | #A6D6EE | #AADDF2 | #6E6E6E |
| --seed-stone | #B0AEA7 | #E7DBC4 | #BAC7D3 | #A5AFBA | #BAC7D3 | #3C3C3C |
| --seed-ground | #C0A060 | #F6DBAD | #DBC7A1 | #A9B9CA | #DBC7A1 | #181818 |
| --seed-empty | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF |

### UI Tokens (11 vars × 6 themes)

| Token | Spring | Midsummer | Autumn | Winter | 桃色の夢 | Mono |
|---|---|---|---|---|---|---|
| --ui-surface-canvas | #EEF7E4 | #FAFFD7 | #2A1E18 | #1B2129 | #FFF9FA | #060606 |
| --ui-surface-panel | #EDF7E1 | #F2F9C0 | #3D302A | #2D3642 | #FCE9ED | #0A0A0A |
| --ui-surface-hover | #C8E8B0 | #E9F3A1 | #302010 | #3E4B5C | #F5D0DA | #161616 |
| --ui-border-default | #A0C880 | #EEDBA1 | #F6E0A0 | #182030 | #F7CBD6 | #1A1A1A |
| --ui-border-active | #1A3010 | #D9B244 | #E8C8A0 | #C0D8F0 | #FFD0E0 | #C8C8C8 |
| --ui-text-primary | #2A3D24 | #4A352F | #FFEFBE | #E8F1F7 | #4A393E | #C8C8C8 |
| --ui-text-secondary | #5A8A30 | #A67C52 | #A67C52 | #6888B0 | #C05880 | #606060 |
| --ui-accent-score | #FBBF24 | #FFD55F | #FFE07D | #FBBF24 | #FFE07D | #FBBF24 |
| --ui-accent-danger | #E24B4A | #D93030 | #FF708A | #E24B4A | #FF708A | #E24B4A |
| --ui-accent-cta | #68D988 | #D05A20 | #FF7A45 | #6AC7D4 | #4A9EB0 | #FFFFFF |

Light: Spring, Midsummer, 桃色の夢. Dark: Autumn, Winter, Mono.

### Layout Tokens (constant)

```
--space-2: 2px; --space-4: 4px; --space-8: 8px;
--space-12: 12px; --space-16: 16px; --space-24: 24px;
--opacity-full: 1; --opacity-muted: 0.6; --opacity-subtle: 0.5; --opacity-faint: 0.35;
--radius-none: 0; --radius-small: 2px; --radius-round: 50%;
--border-default: 1px; --border-active: 1.5px;
```

---

## 2. Typography

Fonts: Silkscreen (headings, UPPERCASE), IBM Plex Mono (UI), DotGothic16 (JP). Min size: 14px.

| Class | Font | Weight | Size/LH | Tracking | Case |
|---|---|---|---|---|---|
| type-display | Silkscreen | 700 | 22/26 | +2px | UPPER |
| type-heading-1 | Silkscreen | 700 | 16/20 | +2px | UPPER |
| type-heading-2 | Silkscreen | 700 | 14/17 | +1.5px | UPPER |
| type-heading-3 | Silkscreen | 400 | 14/17 | +1px | UPPER |
| type-heading-4 | Silkscreen | 400 | 14/17 | +0.5px | UPPER |
| type-jp-subtitle | DotGothic16 | 400 | 14/20 | — | — |
| type-jp-option | DotGothic16 | 400 | 14/18 | — | — |
| type-button-primary | IBM Plex Mono | 500 | 14/17 | — | UPPER |
| type-button-secondary | IBM Plex Mono | 400 | 14/17 | — | UPPER |
| type-body | IBM Plex Mono | 400 | 14/21 | — | sentence |
| type-body-emphasis | IBM Plex Mono | 500 | 14/21 | — | sentence |
| type-caption | IBM Plex Mono | 400 | 14/20 | — | sentence |
| type-data | IBM Plex Mono | 500 | 14/17 | — | tabular-nums |

---

## 3. Desktop Layout (1728 × 1117)

### AppShell
`display: flex; height: 100vh;`

### PanelLeft (296px fixed)
- `background: var(--ui-surface-panel)`
- Right edge: `1px dashed var(--ui-border-default)`
- 3 sections, each separated by horizontal dashed line:
  - Soil — Theme (0–413px): SectionHeader + 6 ThemeCards in 2×3 grid
  - Density (413–697px): SectionHeader + 5 OptionItems in 2×3 grid (last row 1)
  - Depth (697–909px): SectionHeader + 4 OptionItems in 2×2 grid

### CanvasArea (flex: 1, i.e. 1432px)
- `background: var(--ui-surface-canvas)`
- Padding: 24px all sides
- Inner content area: 1384 × 1069px, flex column

#### Header (1384 × 55px)
- Left: "PIXEL GARDEN" (type-display) + "春の目覚め" below (type-jp-subtitle)
- Right: 3 buttons inline, 8px gap
  - "0/100" — score display, 76×33px, IBM Plex Mono, `border: 1px dashed var(--ui-border-default)`
  - "RESET" — ghost button, 76×33px, same border style
  - "GARDEN REPORT" — primary CTA, 148×33px, `background: var(--ui-surface-hover)`, `border: 1.5px dashed var(--ui-border-active)`
- All buttons: `border-radius: 0`, IBM Plex Mono 14px uppercase, `padding: 8px 16px`

#### Grid Container (1384 × 891px, starts at y=79)
- `display: grid; grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat(10, 1fr);`
- `aspect-ratio: 1` on each cell to stay square
- Gap: controlled by density (default 6px = Easy)
- Grid centered horizontally if cells don't fill full width
- Empty state: "DRAG A SEED ONTO THE GARDEN" centered, type-heading-3, var(--ui-text-secondary)

**Living soil effect on empty cells:**
```
t = row / 9                           // 0 = back (top), 1 = front (bottom)
baseColor = lerp(Surface_Canvas, Ground, t × 0.4)
depthFade = (1 - t) × depthIntensity
opacity = 1 - depthFade × 0.85
noise = sin(col×3.7 + row×2.1) × 0.5 + sin(col×1.3 + row×5.9) × 0.3
Apply noise ±2 to H, S, L
```

#### Seed Selection (1384 × 75px, starts at y=994)
- 3 CategoryTabs centered: FLOWERS / GREENERY / PROPS
- Each tab: 130×75px, gap ~24px between
- Top 40px: 3 mini seed icons
- Bottom 35px: pixel-art border frame (5×5px squares) + label (type-heading-3)

---

## 4. Density & Depth

### Density (controls grid gap)
| EN | JP | Gap |
|---|---|---|
| Lush | 密集 | 0px |
| Comfy | ほどよい | 3px |
| Easy (default) | 自然 | 6px |
| Breezy | ゆとり | 12px |
| Wild | まばら | 20px |

### Depth (controls row opacity fade)
| EN | JP | Intensity |
|---|---|---|
| Plain (default) | ありのまま | 0 |
| Soft | ほのか | 0.4 |
| Deep | 奥行き | 0.7 |
| Misty | おぼろ | 1.0 |

---

## 5. Component Quick-Ref

### SectionHeader
- EN: type-heading-1, var(--ui-text-secondary). JP: type-jp-subtitle.
- Padding: 24px left, 16px top, 4px gap between lines.
- Instances: "SOIL — THEME" / "土壌 トークン", "DENSITY" / "密度 · そみつど", "DEPTH" / "奥行き · おくゆき"

### ThemeCard (128 × 99px)
- ThemeCover (120×60px pixel art) + JP label (DotGothic16 12px centered)
- Selected: 2px dashed var(--ui-border-active), bg var(--ui-surface-hover)
- Default: 1px dashed var(--ui-border-default)
- Grid: 2 col × 3 row, col-gap 8px, row-gap 16px, padding 16px
- Labels: 春の目覚め, 真夏の太陽, 秋の黄昏, 冬の霜, 桃色の夢, 墨と紙

### OptionItem (128 × 56px)
- Icon (24×24) left + EN name (type-heading-4) + JP name (type-jp-option) right
- Selected: 1.5px dashed var(--ui-border-active), bg var(--ui-surface-hover)

### Header Buttons
- No custom component needed. Simple `<button>` with:
  - `font: 500 14px 'IBM Plex Mono'; text-transform: uppercase;`
  - `padding: 8px 16px; border-radius: 0; cursor: pointer;`
  - Ghost: `border: 1px dashed var(--ui-border-default); background: transparent;`
  - Primary: `border: 1.5px dashed var(--ui-border-active); background: var(--ui-surface-hover);`

---

## 6. Figma Node Reference
| Element | Node ID |
|---|---|
| Desktop layout | 505:19708 |
| Theme panel | 505:19709 |
| Header | 509:5901 |
| Grid Container | 505:20597 |
| Seed Selection | 505:21190 |

---

## 7. Code Pitfalls
- `?.3` → write `? 0.3`
- `return<svg` → write `return <svg`
- Silkscreen: always `text-transform: uppercase`
- `font-variant-numeric: tabular-nums` on type-data
