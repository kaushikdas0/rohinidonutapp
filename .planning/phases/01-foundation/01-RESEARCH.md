# Phase 1: Foundation - Research

**Researched:** 2026-03-11
**Domain:** React + Vite project scaffolding, MUI theming, icon library, custom font
**Confidence:** HIGH

## Summary

Phase 1 is a standard greenfield React + Vite + TypeScript scaffold with three integrations: MUI for component library, Phosphor Icons for iconography, and Quicksand (via Fontsource) as the app-wide custom font. All four technologies are mature, well-documented, and have straightforward setup paths.

The key architectural decision is wiring the MUI ThemeProvider with Quicksand as the default font family, so that Phase 2 (Design System) can extend the theme without rewiring anything. The theme stub should be minimal but correctly structured.

**Primary recommendation:** Use `npm create vite@latest` with `react-ts` template, MUI v7 (latest stable), `@phosphor-icons/react` v2, and `@fontsource-variable/quicksand` for variable font support.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Font choice: Quicksand from Google Fonts -- elegant, modern rounded sans-serif
- Use as the default typography across the entire app (headings and body)
- Load weights 300-700 to cover light through bold usage

### Claude's Discretion
- Project folder structure (flat vs feature-based)
- Package manager choice (npm, pnpm, etc.)
- MUI version (latest stable)
- Emotion vs styled-components for MUI styling engine
- How deep the initial MUI theme stub goes (just enough for Phase 2 to build on)
- Vite config and dev tooling setup

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SETUP-01 | React + Vite project scaffolded with dev server running | Vite 7 + react-ts template, `npm run dev` on port 5173 |
| SETUP-02 | MUI installed with custom ThemeProvider wrapping the app | MUI v7 + Emotion, createTheme + ThemeProvider in main.tsx |
| SETUP-03 | Phosphor Icons installed and usable in components | @phosphor-icons/react v2.1.x, direct named imports |
| SETUP-04 | Playful/rounded custom font loaded from Google Fonts and set as default typography | @fontsource-variable/quicksand, integrated into MUI theme typography |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vite | 7.x (latest via create-vite) | Build tool + dev server | Default React scaffolding tool, fast HMR |
| React | 19.x | UI framework | Latest stable, paired with Vite template |
| TypeScript | 5.x | Type safety | Included in react-ts template |
| @mui/material | 7.x (latest stable, currently 7.3.9) | Component library | Locked decision, latest major is v7 |
| @emotion/react | 11.x | CSS-in-JS (MUI default engine) | MUI v7 default styling engine |
| @emotion/styled | 11.x | Styled components API | Required MUI peer dependency |
| @phosphor-icons/react | 2.1.x | Icon library | Locked decision, tree-shakable |
| @fontsource-variable/quicksand | 5.x | Self-hosted Quicksand font | Variable font, weights 300-700 in one file |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @mui/icons-material | N/A | MUI's icon set | NOT needed -- using Phosphor Icons instead |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Emotion (default) | styled-components | Extra config, no benefit for new project |
| @fontsource-variable | Google Fonts CDN link | CDN adds external dependency, fontsource is self-hosted and versionable |
| MUI v6 | MUI v7 | v7 is latest stable, greenfield project has no migration cost |

**Installation:**
```bash
# Scaffold project
npm create vite@latest rohinidonutapp -- --template react-ts
cd rohinidonutapp
npm install

# Add MUI + Emotion
npm install @mui/material @emotion/react @emotion/styled

# Add Phosphor Icons
npm install @phosphor-icons/react

# Add Quicksand font
npm install @fontsource-variable/quicksand
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── main.tsx            # Entry point, renders App with providers
├── App.tsx             # Root component, demo content for verification
├── theme/
│   └── theme.ts        # createTheme config with Quicksand + palette stub
├── vite-env.d.ts       # Vite type declarations
└── index.css           # Minimal global resets (if needed)
```

### Pattern 1: ThemeProvider at Root
**What:** Wrap the entire app in MUI's ThemeProvider at the top level (main.tsx)
**When to use:** Always -- all MUI components need theme context
**Example:**
```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import App from './App';

// Import Quicksand font (variable, all weights 300-700)
import '@fontsource-variable/quicksand';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
```

### Pattern 2: Theme Stub with Font Integration
**What:** Minimal createTheme that sets Quicksand as default and leaves room for Phase 2 expansion
**When to use:** This phase -- just enough theme to prove the font and MUI work together
**Example:**
```typescript
// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Quicksand Variable", sans-serif',
    // All variants inherit fontFamily by default
  },
  // Phase 2 will add: palette, spacing, component overrides
});
```

### Pattern 3: Phosphor Icons Usage
**What:** Import individual icons by name, use as React components with props
**Example:**
```typescript
import { DonutIcon, SparkleIcon } from '@phosphor-icons/react';

// Usage in JSX
<DonutIcon size={32} weight="duotone" />
<SparkleIcon color="#AE2983" weight="fill" />
```

### Anti-Patterns to Avoid
- **Importing all Phosphor icons via barrel export in dev:** Can slow down Vite HMR. Use named imports from the package root (tree-shaking handles production). If dev is slow, use deep imports: `import { BellSimpleIcon } from "@phosphor-icons/react/dist/csr/BellSimple"`
- **Adding Google Fonts via CDN link tag:** Breaks self-hosting, adds external dependency, harder to version-lock
- **Over-engineering the theme stub:** Phase 1 theme should be minimal. Phase 2 will define the full palette/overrides. Don't add colors or component overrides yet.
- **Skipping CssBaseline:** MUI's CssBaseline normalizes browser defaults. Without it, Quicksand won't be the universal default on all elements.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSS reset/normalize | Custom reset.css | MUI CssBaseline component | Handles browser normalization + integrates with MUI theme |
| Font loading | Manual @font-face declarations | @fontsource-variable/quicksand | Handles all weights, woff2, and proper font-display |
| Theme context | React context + state for theming | MUI ThemeProvider + createTheme | Handles deep component tree, SSR, CSS variables |

## Common Pitfalls

### Pitfall 1: Wrong Font Family String
**What goes wrong:** Text renders in browser default font, not Quicksand
**Why it happens:** The font-family string must exactly match what fontsource registers. Variable fonts use "Quicksand Variable" (with "Variable" suffix).
**How to avoid:** Use `fontFamily: '"Quicksand Variable", sans-serif'` in theme. Note the nested quotes.
**Warning signs:** Text looks like Times New Roman or system sans-serif instead of rounded.

### Pitfall 2: Missing Emotion Peer Dependencies
**What goes wrong:** Build errors or runtime crashes after installing @mui/material
**Why it happens:** MUI v7 requires both @emotion/react AND @emotion/styled as peer dependencies
**How to avoid:** Always install all three together: `npm install @mui/material @emotion/react @emotion/styled`

### Pitfall 3: Forgetting CssBaseline
**What goes wrong:** Inconsistent styling, browser defaults leak through, font not applied to body
**Why it happens:** MUI components use the theme, but native HTML elements don't unless CssBaseline normalizes them
**How to avoid:** Always include `<CssBaseline />` inside ThemeProvider

### Pitfall 4: MUI v7 Import Depth
**What goes wrong:** Import errors like "module not found"
**Why it happens:** MUI v7 updated package layout to use Node.js exports field. Deep imports beyond one level no longer work.
**How to avoid:** Use `import { createTheme } from '@mui/material/styles'` not `import createTheme from '@mui/material/styles/createTheme'`

## Code Examples

### Verification Component (App.tsx)
A component that proves all four SETUP requirements are met:

```typescript
// src/App.tsx
import { Button, Typography, Box, Container } from '@mui/material';
import { DonutIcon } from '@phosphor-icons/react';

function App() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        Rohini Donut App
      </Typography>
      <Typography variant="body1" gutterBottom>
        Foundation is working! This text should be in Quicksand.
      </Typography>
      <Box sx={{ my: 4 }}>
        <DonutIcon size={64} weight="duotone" />
      </Box>
      <Button variant="contained">
        MUI Button Works
      </Button>
    </Container>
  );
}

export default App;
```

This single component verifies:
- SETUP-01: App renders (Vite dev server running)
- SETUP-02: Button uses MUI theme (ThemeProvider applied)
- SETUP-03: DonutIcon renders (Phosphor Icons working)
- SETUP-04: All text is in Quicksand (custom font loaded)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| MUI v5 + legacy imports | MUI v7 + exports field | 2025 (v7 release) | Use single-level deep imports only |
| phosphor-react (v1) | @phosphor-icons/react (v2) | 2023 | Use scoped package name |
| typeface-quicksand | @fontsource-variable/quicksand | 2023 | Variable font, single import for all weights |
| Vite 5/6 | Vite 7 | 2025 | No breaking changes for basic React setup |
| Emotion is experimental in MUI | Emotion is default in MUI v7 | v5+ | Emotion is the standard, no config needed |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None yet -- greenfield project |
| Config file | none -- see Wave 0 |
| Quick run command | `npm run dev` (visual verification) |
| Full suite command | N/A |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SETUP-01 | Dev server starts without errors | smoke | `npm run dev` (manual) | N/A |
| SETUP-02 | MUI Button renders with ThemeProvider | manual-only | Visual check in browser | N/A |
| SETUP-03 | Phosphor Icon renders in component | manual-only | Visual check in browser | N/A |
| SETUP-04 | Text renders in Quicksand font | manual-only | Visual check in browser | N/A |

**Justification for manual-only:** This phase is pure scaffolding with visual outputs. Automated tests for "does a font render correctly" require screenshot comparison tooling that would be over-engineering for a foundation phase. The verification component (App.tsx) serves as a living smoke test.

### Sampling Rate
- **Per task commit:** `npm run dev` -- verify no build errors
- **Per wave merge:** `npm run build` -- verify production build succeeds
- **Phase gate:** Dev server running + all four visual checks pass

### Wave 0 Gaps
- [ ] Consider adding Vitest in a later phase if test automation is needed
- No test infrastructure needed for this scaffolding phase

## Open Questions

1. **Phosphor "Donut" icon availability**
   - What we know: Phosphor has 9000+ icons but "Donut" may not be a real icon name
   - What's unclear: Exact icon name for donut-related icons in Phosphor
   - Recommendation: Check phosphoricons.com during implementation, fall back to Cookie, CircleNotch, or any round food icon

## Sources

### Primary (HIGH confidence)
- [npm @mui/material](https://www.npmjs.com/package/@mui/material) - v7.3.9 confirmed as latest
- [MUI v7 announcement](https://mui.com/blog/material-ui-v7-is-here/) - breaking changes and migration info
- [MUI Theming docs](https://mui.com/material-ui/customization/theming/) - ThemeProvider + createTheme patterns
- [Fontsource Quicksand install page](https://fontsource.org/fonts/quicksand/install) - variable font install, weights 300-700
- [@phosphor-icons/react GitHub](https://github.com/phosphor-icons/react) - v2 usage, tree-shaking, icon weights
- [Vite Getting Started](https://vite.dev/guide/) - scaffold command, react-ts template

### Secondary (MEDIUM confidence)
- [npm vite](https://www.npmjs.com/package/vite) - v7.3.1 confirmed as latest
- [npm @phosphor-icons/react](https://www.npmjs.com/package/@phosphor-icons/react) - v2.1.10 confirmed
- [npm @fontsource-variable/quicksand](https://www.npmjs.com/package/@fontsource/quicksand) - v5.2.10 confirmed

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all packages verified on npm with current versions
- Architecture: HIGH - standard Vite + MUI setup, well-documented patterns
- Pitfalls: HIGH - known issues documented in official migration guides

**Research date:** 2026-03-11
**Valid until:** 2026-04-11 (stable ecosystem, 30-day validity)
