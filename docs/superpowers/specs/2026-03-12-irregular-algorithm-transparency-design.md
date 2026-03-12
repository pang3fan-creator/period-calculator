# Irregular Period Calculator Algorithm Transparency Module Design

## Context

The irregular period calculator page (`/irregular-period-calculator`) currently lacks a direct algorithm transparency display. After users complete the calculation, they cannot immediately understand "how this result was calculated."

**Goal**: Add an "Algorithm Transparency" module to the irregular period calculator page, displaying the statistical methods and prediction formulas behind the calculator, building user trust.

---

## Design Decisions

### Location

**Position**: Between HowToCalculate and DeepKnowledge sections

**Rationale**:
- Consistent with the homepage layout
- Users just learned "how to use" from HowToCalculate, naturally curious about "how it works"
- Before DeepKnowledge's in-depth educational content

### Content Depth

**Depth**: Comprehensive transparency

**Includes**:
1. Three statistical indicator cards (Average Cycle, Standard Deviation, Confidence)
2. Prediction Window visualization (Earliest → Most Likely → Latest)
3. Disclaimer linking to Editorial Policy

### Visual Style

**Style**: Three-card statistical display

**Layout**:
- Desktop (≥768px): 3 cards in a row + prediction window bar below
- Mobile (<768px): Stacked cards + prediction window

### Title Style

**Title**: "How We Calculate Your Irregular Period"

---

## Component Structure

### File Location

```
src/components/calculator/irregular-algorithm-transparency.tsx
```

### Props

```typescript
// No props, pure display component
```

### Dependencies

- `next-intl` - Internationalization
- `@/i18n/routing` - Link component

---

## Content Specification

### Statistical Cards

| Card | Icon | Title | Content |
|------|------|-------|---------|
| 1 | 📊 | Average Cycle | Formula: `Σ(days) / n` |
| 2 | 📏 | Standard Deviation | Formula: `σ = √(Σ(x-x̄)²/n)` |
| 3 | 🎯 | Confidence | Rules: High (σ≤3), Medium (σ≤6), Low (σ>6) |

> **Note**: The Confidence card displays logic rules rather than a mathematical formula, as confidence level is determined by threshold comparison rather than calculation. |

### Prediction Window

| Node | Label | Formula |
|------|-------|---------|
| Earliest | Earliest | `Average - Std Dev` |
| Most Likely | Most Likely | `Average` |
| Latest | Latest | `Average + Std Dev` |

### Disclaimer

**Text**: "Results are estimates only, not medical advice. Individual cycles may vary."

**Link**: Navigate to `/editorial-policy` page

---

## Internationalization

### Translation Keys

> **Naming Rationale**: Using `irregularAlgorithmTransparency` as a separate namespace (rather than nesting under `irregularCalculator`) maintains consistency with the homepage's `algorithmTransparency` namespace pattern. Both are top-level keys for their respective calculator pages.

```json
{
  "irregularAlgorithmTransparency": {
    "title": "How We Calculate Your Irregular Period",
    "cards": {
      "averageCycle": {
        "title": "Average Cycle",
        "formula": "Σ(days) / n"
      },
      "standardDeviation": {
        "title": "Standard Deviation",
        "formula": "σ = √(Σ(x-x̄)²/n)"
      },
      "confidence": {
        "title": "Confidence",
        "ruleHigh": "σ≤3 days → High",
        "ruleMedium": "σ≤6 days → Medium",
        "ruleLow": "σ>6 days → Low"
      }
    },
    "predictionWindow": {
      "title": "Prediction Window",
      "earliest": "Earliest",
      "mostLikely": "Most Likely",
      "latest": "Latest"
    },
    "disclaimer": "Results are estimates only, not medical advice. Individual cycles may vary.",
    "learnMore": "Learn more about our Editorial Policy"
  }
}
```

### Supported Languages

- English (en)
- Spanish (es)
- French (fr)

---

## Visual Design

### Layout (Desktop)

```
┌──────────────────────────────────────────────────────────────────┐
│         How We Calculate Your Irregular Period                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   📊        │  │   📏        │  │   🎯        │             │
│  │  Average    │  │  Std Dev    │  │ Confidence  │             │
│  │  Cycle      │  │             │  │             │             │
│  │             │  │             │  │             │             │
│  │ Σ(days)/n   │  │ σ=√(...)    │  │ σ≤3→High   │             │
│  │             │  │             │  │ σ≤6→Medium │             │
│  │             │  │             │  │ σ>6→Low    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📅 Prediction Window                                       │ │
│  │                                                             │ │
│  │  ─────●────────────●────────────●──────                    │ │
│  │   Earliest      Most Likely      Latest                    │ │
│  │  (Avg - σ)       (Avg)        (Avg + σ)                    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ────────────────────────────────────────────────────────────── │
│  ⚠️ Results are estimates only, not medical advice.            │
│               Learn more about our Editorial Policy →           │
└──────────────────────────────────────────────────────────────────┘
```

### Layout (Mobile)

```
┌───────────────────────────────┐
│  How We Calculate Your        │
│  Irregular Period             │
├───────────────────────────────┤
│  ┌───────────────────────────┐│
│  │ 📊 Average Cycle          ││
│  │ Σ(days)/n                 ││
│  └───────────────────────────┘│
│  ┌───────────────────────────┐│
│  │ 📏 Standard Deviation     ││
│  │ σ=√(Σ(x-x̄)²/n)           ││
│  └───────────────────────────┘│
│  ┌───────────────────────────┐│
│  │ 🎯 Confidence             ││
│  │ σ≤3→High, σ≤6→Medium      ││
│  │ σ>6→Low                   ││
│  └───────────────────────────┘│
│  ┌───────────────────────────┐│
│  │ 📅 Prediction Window      ││
│  │ Earliest → Likely → Latest││
│  └───────────────────────────┘│
│  ─────────────────────────────│
│  ⚠️ Results are estimates...  │
│   Learn more about our        │
│   Editorial Policy →          │
└───────────────────────────────┘
```

### Styling

- **Card border radius**: `rounded-3xl` (consistent with existing components)
- **Border**: `border-warmbeige-200 dark:border-dark-border`
- **Background**: `bg-white dark:bg-dark-card`
- **Dark mode**: Fully supported

### Prediction Window Styling

**Colors**:
- Timeline line: `bg-primary-300 dark:bg-primary-600`
- Earliest node: `bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-600`
- Most Likely node: `bg-primary-100 dark:bg-primary-900/50 border-primary-300 dark:border-primary-600`
- Latest node: `bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-600`
- Connecting line between nodes: `h-0.5 bg-gradient-to-r from-amber-300 via-primary-400 to-amber-300`

**Spacing**:
- Node size: `h-12 w-12` (desktop), `h-10 w-10` (mobile)
- Gap between nodes: `gap-4` (flexbox)
- Card padding: `p-6 md:p-8`

---

## Accessibility

### ARIA Labels

- Card containers: No special ARIA needed (semantic HTML sufficient)
- Icon emojis: Use `aria-hidden="true"` (decorative only)
- Formula text: Wrapped in `<p>` with `font-mono` class
- Prediction Window nodes: `role="img"` with `aria-label` describing the node
- Link: Standard `<Link>` component with descriptive text

### Keyboard Navigation

- All interactive elements (link only) are keyboard accessible via default browser behavior
- No custom keyboard interactions needed (pure display component)
- Focus visible states: Default Tailwind `focus:ring` classes

### Screen Reader Considerations

- Mathematical formulas presented as text (not MathML) for broader compatibility
- Confidence rules structured as list items for clear reading
- Section title provides context for all content

---

## Implementation Checklist

1. **Create Component**
   - [ ] Create `src/components/calculator/irregular-algorithm-transparency.tsx`
   - [ ] Implement responsive card layout
   - [ ] Implement prediction window visualization

2. **Add Translations**
   - [ ] Update `messages/en.json`
   - [ ] Update `messages/es.json`
   - [ ] Update `messages/fr.json`

3. **Integrate into Page**
   - [ ] Import component in `src/app/[locale]/irregular-period-calculator/page.tsx`
   - [ ] Add component between HowToCalculate and DeepKnowledge sections

4. **Testing**
   - [ ] Visual test (desktop + mobile)
   - [ ] Dark mode test
   - [ ] Internationalization test (en/es/fr)
   - [ ] Link test (Editorial Policy navigation)
   - [ ] Accessibility test (keyboard navigation, screen reader)

---

## Algorithm Reference

From `src/lib/calculator/irregular-calculator.ts`:

```typescript
// Average Cycle Length
const averageCycleLength = calculateMean(cycleLengths);
// Formula: sum of all cycle days / number of cycles

// Standard Deviation
const standardDeviation = calculateStandardDeviation(cycleLengths, averageCycleLength);
// Formula: √(Σ(xᵢ - x̄)² / n)

// Confidence Level
function determineConfidenceLevel(stdDev: number): ConfidenceLevel {
  if (stdDev <= 3) return "high";
  if (stdDev <= 6) return "medium";
  return "low";
}

// Prediction Window
const mostLikely = addDays(lastPeriodStart, Math.round(averageCycleLength));  // LastPeriodStart + Average
const earliest = addDays(mostLikely, -windowDays);  // MostLikely - StdDev
const latest = addDays(mostLikely, windowDays);  // MostLikely + StdDev
```

---

## Verification

### Manual Testing

1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/irregular-period-calculator`
3. Verify module position: Between HowToCalculate and DeepKnowledge
4. Verify responsive: Resize browser window
5. Verify dark mode: Toggle theme
6. Verify i18n: Switch language (en/es/fr)
7. Verify links: Click Editorial Policy link

### Build Testing

```bash
npm run build
npm run start
```

Ensure production build succeeds with no TypeScript errors.