# Design Brief

**App**: WTOL — Premium Territory-Based Fitness Game  
**Theme**: Dark Luxury with Glassmorphism  
**Tone**: Sophisticated, premium, refined — warm gold accents with deep charcoal elegance.

## Purpose
Gamified territory control through GPS-tracked runs and workouts on an integrated Google Map. Users claim real zones with refined luxury aesthetics, defended or stolen in real-time competition. Premium visual experience with glassmorphism and gold/amber accents.

## Color Palette
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Background | 0.10 0 0 | Deep black, primary surface |
| Foreground | 0.95 0.005 0 | Bright white, all text |
| Card | 0.16 0.008 50 | Elevated glassmorphic surface |
| Primary (Gold) | 0.68 0.18 70 | Warm premium gold, CTAs, territory |
| Accent (Amber) | 0.75 0.22 60 | Vibrant amber, highlights, active states |
| Muted | 0.20 0.01 50 | Subtle backgrounds, secondary elements |
| Border | 0.22 0.012 50 | Refined separation, card edges |
| Destructive | 0.62 0.28 15 | Error states, loss indicators |

## Typography
| Use | Font | Weight | Scale |
|-----|------|--------|-------|
| Display (Headers) | Instrument Serif | 400–700 | 28–48px |
| Body (Copy) | Satoshi | 400–600 | 14–16px |
| Mono (Stats, Code) | Geist Mono | 400–500 | 12–14px |

## Structural Zones
- **Header**: Glassmorphic card (`glass-card`), GPS status (gold pulsing dot), navigation, bottom border
- **Map Zone**: Full-bleed Google Map, SVG territory overlays, bottom UI chrome with glassmorphic controls
- **Territory Cards**: Glassmorphic with gold left border, territory name, owned by, claim timestamp
- **Activity Feed**: Glassmorphic cards with gold-amber accent left borders, hover-lift animation
- **Leaderboard**: Tabular layout, glassmorphic rows, gold zone indicators, trophy badges

## Elevation & Depth
Glassmorphism with backdrop blur, inset shadows, and refined borders. Depth via transparency, layering, and subtle elevation. Gold/amber borders create hierarchy and visual interest.

## Spacing & Rhythm
Mobile-first grid: 4px baseline. Padding: 12px (compact), 16px (standard), 24px (premium). Gap: 8px (tight), 12px (standard), 16px (loose). Breathing room around hero sections.

## Component Patterns
- **GPS Status**: Gold pulsing dot in header (`gps-active`, `gps-acquiring`, `gps-error`)
- **Territory Zones**: Gold/amber color on map and feed (`territory-gold`, `territory-amber`)
- **Buttons**: Glassmorphic with gold border, hover glow shadow (`glass-button`)
- **Cards**: Glassmorphic with backdrop blur, gold accent borders (`glass-card`, `gold-accent-border`)

## Motion
- **Transition**: All 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Hover**: Lift animation with shadow enhancement (`hover-lift`)
- **GPS Pulse**: Gold pulsing on active/acquiring (`gold-pulse`), static on error
- **Entrance**: Fade-in 0.4s on load, staggered for depth

## Constraints
- All glass effects use `backdrop-blur-md` with `bg-opacity-80` for readability
- No neon colors; all territory indicators use refined gold/amber palette
- GPS status always visible in header; mission-critical reliability signal
- Territory colors instantly recognizable at a glance (map readability)
- Google Maps integration with custom overlay for zone claims

## Signature Detail
Premium glassmorphic cards with inset gold borders and subtle glow shadow — luxury fitness UI that stands apart from generic territory games.
