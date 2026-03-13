# Ovulation Algorithm Transparency Differentiation Design

**Date:** 2026-03-13
**Status:** Draft
**Author:** AI Assistant

---

## Problem Statement

The ovulation period calculator page (`/ovulation-period-calculator`) currently displays identical algorithm transparency content as the homepage. This creates:

1. **SEO duplicate content issues** - Search engines may penalize pages with identical content
2. **User experience mismatch** - Users visiting the ovulation calculator expect specialized content focused on ovulation prediction

### Current State

| Page | Component | Timeline Nodes |
|------|-----------|----------------|
| Homepage | `AlgorithmTransparency` | Last Period → Ovulation → Fertile Window → Next Period |
| Ovulation Page | `OvulationAlgorithmTransparency` | **Same as homepage** |

---

## Design Decision

**Approach:** Ovulation-focused three-node timeline

### Timeline Structure

```
Ovulation Day → Fertile Window → Next Period
```

### Node Details

| Position | Icon | Label | Formula |
|----------|------|-------|---------|
| Node 1 | 🥚 | Ovulation Day | Last Period + Cycle Length - 14 days |
| Node 2 | 🎯 | Fertile Window | Ovulation - 5 days to +1 day |
| Node 3 | 📆 | Next Period | Last Period + Cycle Length |

### Key Differentiation from Homepage

| Aspect | Homepage | Ovulation Page |
|--------|----------|----------------|
| Starting point | Last Period | **Ovulation Day** |
| Node count | 4 | **3** |
| Focus | Full cycle overview | **Ovulation prediction** |
| Target audience | General users | **Trying to conceive** |

---

## Implementation Details

### Files to Modify

1. **Component:** `src/components/calculator/ovulation-algorithm-transparency.tsx`
   - Update timeline node count from 4 to 3
   - Change timeline labels and formulas
   - Update `grid-cols-4` to `grid-cols-3`

2. **Translations:** `messages/en.json`
   - Update `ovulationAlgorithmTransparency.timeline` keys
   - Update `ovulationAlgorithmTransparency.formulas` keys

3. **Translations:** `messages/es.json`, `messages/fr.json`
   - Sync Spanish and French translations

### Translation Schema

```json
{
  "ovulationAlgorithmTransparency": {
    "title": "How We Calculate Your Ovulation Period",
    "timeline": {
      "ovulationDay": "Ovulation Day",
      "fertileWindow": "Fertile Window",
      "nextPeriod": "Next Period"
    },
    "formulas": {
      "ovulationDay": "Last Period + Cycle Length - 14 days",
      "fertileWindow": "Ovulation - 5 days to +1 day",
      "nextPeriod": "Last Period + Cycle Length"
    },
    "disclaimer": "Results are estimates only, not medical advice. Individual cycles may vary.",
    "learnMore": "Learn more about our Editorial Policy"
  }
}
```

---

## Verification

### Testing

1. Run existing test suite: `npm test`
2. Verify build: `npm run build`
3. Visual verification:
   - Desktop: Three nodes evenly distributed horizontally
   - Mobile: Three nodes in vertical timeline
   - Dark mode: Proper color contrast

### Acceptance Criteria

- [ ] Timeline displays exactly 3 nodes
- [ ] Node content matches the design specification
- [ ] All translations (en/es/fr) are updated
- [ ] Tests pass
- [ ] Build succeeds
- [ ] No visual regressions on desktop/mobile/dark mode

---

## Out of Scope

- Changes to homepage `AlgorithmTransparency` component
- Changes to `IrregularAlgorithmTransparency` component
- New component creation
- UI/UX redesign beyond content changes