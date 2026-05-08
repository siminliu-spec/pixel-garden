# Pixel Garden — Claude Code Instructions

You are building Pixel Garden, an interactive web toy that teaches design system concepts through a pixel art garden metaphor.

## Core documents
- `DESIGN.md` — Complete visual specification. Every color, size, and spacing is defined there. Follow it exactly.

## Tech stack
- Vite + React + TypeScript
- CSS Custom Properties (NO Tailwind, NO CSS-in-JS)
- Tone.js (audio, add later)
- Fonts: Silkscreen, IBM Plex Mono, DotGothic16 (Google Fonts)

## Absolute rules
- All colors via CSS variables. Zero hardcoded hex values in components.
- Theme switching via `data-theme` attribute on `<html>`
- Minimum font size: 14px everywhere
- Silkscreen text: always `text-transform: uppercase`
- `?.3` causes syntax error → write `? 0.3`
- `return<svg` causes error → write `return <svg` (with space)
- Japanese text must be copy-pasted exactly from DESIGN.md, never translated or guessed

## Figma reference
- File: https://www.figma.com/design/RbnIqGE0y2FZ14VLjjaPjE/Pixel-Garden
- Desktop layout node: 505:19708
- Category tabs: Flowers / Greenery / Props (NOT "Seed" / "Structure")
- Garden grid: 16 col × 10 row (NOT 16×12)
- Grid Container: width fills canvas area, height ~891px
- Cells use `1fr` + `aspect-ratio: 1`, gap controlled by density variable

## Layout rules
- Never use maxWidth on display:grid elements directly
- All horizontal spacing must use clamp(min, preferred, max)
- Grid columns use repeat(N, 1fr) with fixed N
- Test all layout changes at 1440px AND 2560px viewport width
