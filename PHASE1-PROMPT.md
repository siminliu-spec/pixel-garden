# Phase 1 Prompt — paste this into Claude Code

Read DESIGN.md completely, then build the following. Desktop only, Spring theme as default. No interactions except theme switching.

## Step 1: CSS Token System

Create `src/styles/tokens.css`:
- `:root` sets layout tokens (spacing, opacity, radius, border)
- `[data-theme="spring"]` (also on `:root` as default) sets 26 color variables (15 seed + 11 UI)
- Repeat for midsummer, autumn, winter, peach, mono — all 6 themes
- Use exact hex values from DESIGN.md tables

Create `src/styles/typography.css`:
- Import Google Fonts: Silkscreen (400,700), IBM Plex Mono (400,500), DotGothic16 (400)
- Define CSS classes for all 13 type styles from DESIGN.md section 2
- Silkscreen classes: always include `text-transform: uppercase`
- type-data class: include `font-variant-numeric: tabular-nums`

## Step 2: AppShell Layout

Create `src/components/AppShell.tsx`:
- `display: flex; height: 100vh;`
- Left: PanelLeft component (296px fixed)
- Right: CanvasArea component (flex: 1)

Create `src/components/PanelLeft.tsx`:
- `width: 296px; background: var(--ui-surface-panel);`
- Right border: `1px dashed var(--ui-border-default)`
- 3 sections stacked with horizontal dashed dividers between them:

Section 1 — Soil (height ~413px):
- SectionHeader: EN="SOIL — THEME" JP="土壌 トークン"
- 6 ThemeCards in 2 col × 3 row grid (col-gap 8px, row-gap 16px, padding 16px)
- Each ThemeCard: 128×99px, placeholder colored rectangle (120×60px using theme's surface-canvas color) + JP label below
- Labels: 春の目覚め, 真夏の太陽, 秋の黄昏, 冬の霜, 桃色の夢, 墨と紙
- Selected state: 2px dashed var(--ui-border-active), bg var(--ui-surface-hover)
- Click a card → sets `document.documentElement.dataset.theme` to that theme's key

Section 2 — Density (height ~284px):
- SectionHeader: EN="DENSITY" JP="密度 · そみつど"
- 5 OptionItems in 2 col × 3 row grid (last row 1 item):
  LUSH/密集, COMFY/ほどよい, EASY/自然 (default selected), BREEZY/ゆとり, WILD/まばら
- Each 128×56px with a placeholder icon area (24×24) on left

Section 3 — Depth (height ~212px):
- SectionHeader: EN="DEPTH" JP="奥行き · おくゆき"
- 4 OptionItems in 2 col × 2 row grid:
  PLAIN/ありのまま (default selected), SOFT/ほのか, DEEP/奥行き, MISTY/おぼろ

## Step 3: Canvas Area

Create `src/components/CanvasArea.tsx`:
- `flex: 1; background: var(--ui-surface-canvas); padding: 24px;`
- Inner flex column, gap between sections

Header row (height 55px):
- Left side: "PIXEL GARDEN" (type-display) with theme JP name below (type-jp-subtitle, var(--ui-text-secondary))
- Right side: 3 buttons inline, 8px gap
  - "0/100" ghost button (76×33px)
  - "RESET" ghost button (76×33px)  
  - "GARDEN REPORT" primary button (148×33px)
- Button styles: IBM Plex Mono 14px uppercase, border-radius: 0, padding: 8px 16px
- Ghost: border 1px dashed var(--ui-border-default), bg transparent
- Primary: border 1.5px dashed var(--ui-border-active), bg var(--ui-surface-hover)

Grid Container (fills remaining width, height ~891px):
- CSS Grid: 16 col × 10 row using `repeat(16, 1fr)` and `repeat(10, 1fr)`
- Each cell: `aspect-ratio: 1; border-radius: 2px;`
- Default gap: 6px (Easy density) via CSS variable `--grid-gap`
- Grid centered horizontally within container
- Living soil effect: each empty cell gets a background color computed from row position:
  - Convert var(--ui-surface-canvas) and var(--seed-ground) to HSL
  - Interpolate 40% from canvas toward ground based on row (0=back/top, 9=front/bottom)
  - Add sine noise per cell for organic feel
  - For now, use Spring's canvas (#EEF7E4) and ground (#C0A060) as hardcoded HSL, make it theme-aware later
- Empty state text: "DRAG A SEED ONTO THE GARDEN" centered, type-heading-3, var(--ui-text-secondary)

Seed Selection bar (height 75px, bottom):
- 3 placeholder tab buttons centered: "FLOWERS" / "GREENERY" / "PROPS"
- Each: 130×75px, type-heading-3, border 1px dashed var(--ui-border-default)
- Simple rectangle placeholders for now (pixel art border comes later)

## Step 4: Wire it up

- Modify `src/App.tsx` to render AppShell
- Set default theme to "spring" on mount
- Run `npm run dev`, verify no errors
- Verify: clicking ThemeCards switches all colors
- Verify: all 3 panel sections render with correct Japanese text
- Verify: grid shows 16×10 cells with living soil gradient
- Verify: header shows title, JP subtitle, and 3 buttons
