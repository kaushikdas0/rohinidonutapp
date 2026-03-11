# Roadmap: Rohini Donut App

## Overview

Three phases take this project from zero to spinning neon donut. Foundation gets the toolchain running, Design System establishes the dark+neon visual language through MUI theming, and Donut Experience brings the animated centerpiece to life on a polished single-page layout.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - React + Vite project with MUI, Phosphor Icons, and custom font ready to use
- [ ] **Phase 2: Design System** - Dark + neon color palette, MUI theme, and component showcase
- [ ] **Phase 3: Donut Experience** - Animated 3D spinning donut on a styled single-page layout

## Phase Details

### Phase 1: Foundation
**Goal**: Developer can run the app and use MUI components, Phosphor Icons, and the custom font in any new component
**Depends on**: Nothing (first phase)
**Requirements**: SETUP-01, SETUP-02, SETUP-03, SETUP-04
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` starts the app in a browser with no errors
  2. A MUI component (e.g., Button) renders with the custom ThemeProvider applied
  3. A Phosphor Icon renders in a component
  4. All text renders in the chosen playful/rounded font (not browser default)
**Plans:** 1 plan

Plans:
- [ ] 01-01-PLAN.md -- Scaffold Vite project with MUI, Phosphor Icons, and Quicksand font

### Phase 2: Design System
**Goal**: The dark + neon visual identity is fully defined in code and visually verified through a component showcase
**Depends on**: Phase 1
**Requirements**: STYLE-01, STYLE-02, STYLE-03
**Success Criteria** (what must be TRUE):
  1. Color palette tokens (primary, secondary, accent, background, surface) are defined and produce a dark background with vibrant neon accents
  2. MUI components (buttons, inputs, cards, typography) all render in the custom theme without manual overrides
  3. A showcase page displays all themed components together for visual verification
**Plans**: TBD

Plans:
- [ ] 02-01: TBD

### Phase 3: Donut Experience
**Goal**: A visitor sees a visually striking animated donut as the centerpiece of a polished single page
**Depends on**: Phase 2
**Requirements**: DONUT-01, DONUT-02, DONUT-03, LAYOUT-01, LAYOUT-02
**Success Criteria** (what must be TRUE):
  1. A CSS/SVG donut spins with a convincing 3D effect on the page
  2. The donut glows with neon effects that match the established color palette
  3. User can pause, play, change speed, and reverse the animation direction
  4. The donut is centered as the hero element with title and tagline visible around it
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/1 | Not started | - |
| 2. Design System | 0/? | Not started | - |
| 3. Donut Experience | 0/? | Not started | - |
