# Ovulation Calculator Design Document

## Overview

This document outlines the design for the `/ovulation-calculator` page, a specialized tool for users tracking ovulation and fertility windows.

## Core Features

### 1. Input Form
- **Fields** (same as homepage):
  - Last period start date
  - Average cycle length (21-35 days)
  - Period length (2-7 days)
- **New Feature**: Purpose Toggle
  - "I'm trying to conceive" (备孕)
  - "I'm avoiding pregnancy" (避孕)

### 2. Results Display
- **Prediction Cards**: 4 cards showing:
  - Ovulation Day (highlighted)
  - Fertile Window (highlighted)
  - Next Period
  - PMS Period
- **Calendar View**: Simplified view showing only ovulation and fertile window
- **Contraception Warning**: Tooltip showing disclaimer when user selects "avoiding pregnancy"

### 3. Add to Calendar
- Export ovulation dates and fertile window to calendar apps

## UI/UX Decisions

| Feature | Decision | Rationale |
|---------|----------|-----------|
| Purpose Selection | Toggle Switch | Simple, space-efficient |
| Contraception Warning | Tooltip | Non-intrusive, available on-demand |
| Calendar View | Simplified | Focus on fertility info only |

## Component Architecture

```
OvulationCalculator (container)
├── OvulationCalculatorForm (inputs + toggle)
├── OvulationResultsDisplay
│   ├── PredictionCards (fertility-focused)
│   ├── CalendarView (simplified)
│   └── AddToCalendar
└── ContraceptionWarning (tooltip, conditional)
```

## Data Flow

1. User enters cycle data + selects purpose (conceive/avoid)
2. Calculate cycle using existing `calculateCycle()` algorithm
3. Display results with fertility-focused presentation
4. If "avoiding pregnancy" mode: show warning tooltip

## Key Files to Create/Modify

| Action | File Path |
|--------|-----------|
| Create | `src/components/calculator/ovulation-calculator-form.tsx` |
| Create | `src/components/calculator/ovulation-prediction-cards.tsx` |
| Create | `src/components/calculator/ovulation-results-display.tsx` |
| Create | `src/components/calculator/ovulation-period-calculator.tsx` |
| Modify | `src/app/[locale]/ovulation-calculator/page.tsx` |
| Modify | `messages/en.json` |
| Modify | `messages/es.json` |
| Modify | `messages/fr.json` |

## Internationalization

New translation keys needed:
- `ovulationCalculator.title`
- `ovulationCalculator.subtitle`
- `ovulationCalculator.purpose`
- `ovulationCalculator.tryingToConceive`
- `ovulationCalculator.avoidingPregnancy`
- `ovulationCalculator.contraceptionWarning`
- `ovulationCalculator.contraceptionWarningText`
- And standard form/labels (reused from calculator)

## Design Principles

1. **Fertility First**: Prioritize ovulation and fertile window information
2. **Privacy-First**: All data stored locally, no server uploads
3. **Accessibility**: Full keyboard navigation, ARIA labels, high contrast
4. **Mobile-First**: Touch-friendly 48px minimum tap targets
