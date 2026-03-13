# Ovulation Algorithm Transparency Differentiation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Differentiate the ovulation calculator's algorithm transparency section from the homepage by implementing a focused 3-node timeline.

**Architecture:** Modify the existing `OvulationAlgorithmTransparency` component to display 3 timeline nodes (Ovulation Day → Fertile Window → Next Period) instead of 4, with updated formulas. Update translation files for en/es/fr.

**Tech Stack:** Next.js, React, next-intl, Tailwind CSS

---

## Chunk 1: Update English Translations

### Task 1: Update ovulationAlgorithmTransparency translations in en.json

**Files:**
- Modify: `messages/en.json:433-448`

- [ ] **Step 1: Update the ovulationAlgorithmTransparency section in en.json**

Replace the existing `ovulationAlgorithmTransparency` object with:

```json
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
```

---

## Chunk 2: Update Spanish and French Translations

### Task 2: Update Spanish translations in es.json

**Files:**
- Modify: `messages/es.json` (ovulationAlgorithmTransparency section)

- [ ] **Step 1: Update the ovulationAlgorithmTransparency section in es.json**

Replace the existing `ovulationAlgorithmTransparency` object with:

```json
"ovulationAlgorithmTransparency": {
  "title": "Cómo Calculamos Tu Período de Ovulación",
  "timeline": {
    "ovulationDay": "Día de Ovulación",
    "fertileWindow": "Ventana Fértil",
    "nextPeriod": "Próximo Período"
  },
  "formulas": {
    "ovulationDay": "Último Período + Duración del Ciclo - 14 días",
    "fertileWindow": "Ovulación - 5 días a +1 día",
    "nextPeriod": "Último Período + Duración del Ciclo"
  },
  "disclaimer": "Los resultados son solo estimaciones, no consejo médico. Los ciclos individuales pueden variar.",
  "learnMore": "Más información sobre nuestra Política Editorial"
}
```

### Task 3: Update French translations in fr.json

**Files:**
- Modify: `messages/fr.json` (ovulationAlgorithmTransparency section)

- [ ] **Step 1: Update the ovulationAlgorithmTransparency section in fr.json**

Replace the existing `ovulationAlgorithmTransparency` object with:

```json
"ovulationAlgorithmTransparency": {
  "title": "Comment Nous Calculons Votre Période d'Ovulation",
  "timeline": {
    "ovulationDay": "Jour d'Ovulation",
    "fertileWindow": "Fenêtre Fertile",
    "nextPeriod": "Prochaines Règles"
  },
  "formulas": {
    "ovulationDay": "Dernières Règles + Durée du Cycle - 14 jours",
    "fertileWindow": "Ovulation - 5 jours à +1 jour",
    "nextPeriod": "Dernières Règles + Durée du Cycle"
  },
  "disclaimer": "Les résultats sont des estimations uniquement, pas un avis médical. Les cycles individuels peuvent varier.",
  "learnMore": "En savoir plus sur notre Politique Éditoriale"
}
```

---

## Chunk 3: Update Component Logic

### Task 4: Update OvulationAlgorithmTransparency component

**Files:**
- Modify: `src/components/calculator/ovulation-algorithm-transparency.tsx`

- [ ] **Step 1: Update desktop timeline grid and nodes (lines 31-70)**

Replace the desktop timeline section with:

```tsx
        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="from-primary-200 via-primary-400 to-primary-200 dark:from-primary-700 dark:via-primary-500 dark:to-primary-700 absolute top-[60px] right-0 left-0 h-0.5 bg-gradient-to-r" />

            {/* Timeline Nodes */}
            <div className="relative grid grid-cols-3 gap-6">
              {/* Node 1: Ovulation Day */}
              <TimelineNode
                icon="🥚"
                label={t("timeline.ovulationDay")}
                formula={t("formulas.ovulationDay")}
                position="start"
              />

              {/* Node 2: Fertile Window */}
              <TimelineNode
                icon="🎯"
                label={t("timeline.fertileWindow")}
                formula={t("formulas.fertileWindow")}
                position="middle"
              />

              {/* Node 3: Next Period */}
              <TimelineNode
                icon="📆"
                label={t("timeline.nextPeriod")}
                formula={t("formulas.nextPeriod")}
                position="end"
              />
            </div>
          </div>
        </div>
```

- [ ] **Step 2: Update mobile timeline items (lines 74-100)**

Replace the mobile timeline section with:

```tsx
        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden">
          <div className="relative space-y-6">
            {/* Vertical Line */}
            <div className="from-primary-200 via-primary-400 to-primary-200 dark:from-primary-700 dark:via-primary-500 dark:to-primary-700 absolute top-0 bottom-0 left-5 w-0.5 bg-gradient-to-b" />

            {/* Timeline Items */}
            <MobileTimelineItem
              icon="🥚"
              label={t("timeline.ovulationDay")}
              formula={t("formulas.ovulationDay")}
            />
            <MobileTimelineItem
              icon="🎯"
              label={t("timeline.fertileWindow")}
              formula={t("formulas.fertileWindow")}
            />
            <MobileTimelineItem
              icon="📆"
              label={t("timeline.nextPeriod")}
              formula={t("formulas.nextPeriod")}
            />
          </div>
        </div>
```

---

## Chunk 4: Verification

### Task 5: Run tests and build

- [ ] **Step 1: Run test suite**

Run: `npm test`
Expected: All 102 tests pass

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds without errors

- [ ] **Step 3: Visual verification**

Start dev server: `npm run dev`
Check:
- Desktop: Three nodes evenly distributed horizontally
- Mobile: Three nodes in vertical timeline
- Dark mode: Proper color contrast

---

## Acceptance Criteria

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