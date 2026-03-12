# Irregular Algorithm Transparency Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an algorithm transparency module to the irregular period calculator page, displaying statistical methods and prediction formulas.

**Architecture:** A React component with responsive card layout (3 statistical cards + prediction window) using next-intl for translations, styled with Tailwind CSS, integrated between HowToCalculate and DeepKnowledge sections.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, next-intl

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `src/components/calculator/irregular-algorithm-transparency.tsx` | Create | Main component with 3 cards + prediction window |
| `messages/en.json` | Modify | Add English translations |
| `messages/es.json` | Modify | Add Spanish translations |
| `messages/fr.json` | Modify | Add French translations |
| `src/app/[locale]/irregular-period-calculator/page.tsx` | Modify | Import and integrate component |

---

## Chunk 1: Create Component

### Task 1: Create IrregularAlgorithmTransparency Component

**Files:**
- Create: `src/components/calculator/irregular-algorithm-transparency.tsx`

- [ ] **Step 1: Create the component file with full implementation**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * IrregularAlgorithmTransparency Section Component
 *
 * Displays statistical methods used for irregular period prediction:
 * - Average Cycle calculation
 * - Standard Deviation for variability
 * - Confidence Level determination
 * - Prediction Window visualization
 *
 * Layout:
 * - Desktop: 3 cards in a row + prediction window bar
 * - Mobile: Stacked cards + prediction window
 */
export function IrregularAlgorithmTransparency() {
  const t = useTranslations("irregularAlgorithmTransparency");

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          {t("title")}
        </h2>
      </div>

      {/* Container */}
      <div className="border-warmbeige-200 dark:border-dark-border dark:bg-dark-card overflow-hidden rounded-3xl border bg-white p-6 md:p-8">
        {/* Statistical Cards - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          <StatCard
            icon="📊"
            title={t("cards.averageCycle.title")}
            formula={t("cards.averageCycle.formula")}
          />
          <StatCard
            icon="📏"
            title={t("cards.standardDeviation.title")}
            formula={t("cards.standardDeviation.formula")}
          />
          <StatCard
            icon="🎯"
            title={t("cards.confidence.title")}
            rules={[
              t("cards.confidence.ruleHigh"),
              t("cards.confidence.ruleMedium"),
              t("cards.confidence.ruleLow"),
            ]}
          />
        </div>

        {/* Statistical Cards - Mobile */}
        <div className="space-y-4 md:hidden">
          <MobileStatCard
            icon="📊"
            title={t("cards.averageCycle.title")}
            formula={t("cards.averageCycle.formula")}
          />
          <MobileStatCard
            icon="📏"
            title={t("cards.standardDeviation.title")}
            formula={t("cards.standardDeviation.formula")}
          />
          <MobileConfidenceCard
            icon="🎯"
            title={t("cards.confidence.title")}
            rules={[
              t("cards.confidence.ruleHigh"),
              t("cards.confidence.ruleMedium"),
              t("cards.confidence.ruleLow"),
            ]}
          />
        </div>

        {/* Prediction Window */}
        <div className="mt-8 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50 md:mt-10 md:p-6">
          <h3 className="mb-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
            📅 {t("predictionWindow.title")}
          </h3>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-6 right-0 left-0 h-0.5 bg-gradient-to-r from-amber-300 via-primary-400 to-amber-300 dark:from-amber-600 dark:via-primary-500 dark:to-amber-600" />

              {/* Nodes */}
              <div className="relative grid grid-cols-3 gap-4">
                <PredictionNode
                  label={t("predictionWindow.earliest")}
                  variant="edge"
                />
                <PredictionNode
                  label={t("predictionWindow.mostLikely")}
                  variant="center"
                />
                <PredictionNode
                  label={t("predictionWindow.latest")}
                  variant="edge"
                />
              </div>
            </div>
          </div>

          {/* Mobile: Simple Row */}
          <div className="flex items-center justify-between gap-2 md:hidden">
            <MobilePredictionNode
              label={t("predictionWindow.earliest")}
              variant="edge"
            />
            <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-300 via-primary-400 to-amber-300 dark:from-amber-600 dark:via-primary-500 dark:to-amber-600" />
            <MobilePredictionNode
              label={t("predictionWindow.mostLikely")}
              variant="center"
            />
            <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-300 via-primary-400 to-amber-300 dark:from-amber-600 dark:via-primary-500 dark:to-amber-600" />
            <MobilePredictionNode
              label={t("predictionWindow.latest")}
              variant="edge"
            />
          </div>
        </div>

        {/* Learn More Link */}
        <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-700">
          <div className="text-center">
            <Link
              href="/editorial-policy"
              className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium transition-colors"
            >
              {t("learnMore")} →
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Desktop Stat Card Component
 */
function StatCard({
  icon,
  title,
  formula,
  rules,
}: {
  icon: string;
  title: string;
  formula?: string;
  rules?: string[];
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
      {/* Icon */}
      <div className="mb-2 text-2xl" aria-hidden="true">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-white">
        {title}
      </h3>

      {/* Formula or Rules */}
      {formula && (
        <div className="rounded-lg bg-white px-3 py-2 dark:bg-gray-700">
          <p className="font-mono text-xs text-gray-700 dark:text-gray-300">
            {formula}
          </p>
        </div>
      )}

      {rules && (
        <ul className="space-y-1 text-center">
          {rules.map((rule, index) => (
            <li
              key={index}
              className="text-xs text-gray-600 dark:text-gray-400"
            >
              {rule}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Mobile Stat Card Component
 */
function MobileStatCard({
  icon,
  title,
  formula,
}: {
  icon: string;
  title: string;
  formula: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
      <div className="text-xl" aria-hidden="true">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="mb-1 text-sm font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
          {formula}
        </p>
      </div>
    </div>
  );
}

/**
 * Mobile Confidence Card Component
 */
function MobileConfidenceCard({
  icon,
  title,
  rules,
}: {
  icon: string;
  title: string;
  rules: string[];
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
      <div className="flex items-center gap-3">
        <div className="text-xl" aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>
      <ul className="mt-2 space-y-1 pl-9">
        {rules.map((rule, index) => (
          <li
            key={index}
            className="text-xs text-gray-600 dark:text-gray-400"
          >
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Desktop Prediction Node Component
 */
function PredictionNode({
  label,
  variant,
}: {
  label: string;
  variant: "edge" | "center";
}) {
  const nodeStyles =
    variant === "center"
      ? "bg-primary-100 dark:bg-primary-900/50 border-primary-300 dark:border-primary-600"
      : "bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-600";

  return (
    <div className="flex flex-col items-center">
      {/* Node Circle */}
      <div
        className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${nodeStyles}`}
        role="img"
        aria-label={label}
      >
        <div
          className={`h-2 w-2 rounded-full ${variant === "center" ? "bg-primary-500 dark:bg-primary-400" : "bg-amber-500 dark:bg-amber-400"}`}
        />
      </div>

      {/* Label */}
      <p className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">
        {label}
      </p>
    </div>
  );
}

/**
 * Mobile Prediction Node Component
 */
function MobilePredictionNode({
  label,
  variant,
}: {
  label: string;
  variant: "edge" | "center";
}) {
  const nodeStyles =
    variant === "center"
      ? "bg-primary-100 dark:bg-primary-900/50 border-primary-300 dark:border-primary-600"
      : "bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-600";

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${nodeStyles}`}
        role="img"
        aria-label={label}
      >
        <div
          className={`h-1.5 w-1.5 rounded-full ${variant === "center" ? "bg-primary-500 dark:bg-primary-400" : "bg-amber-500 dark:bg-amber-400"}`}
        />
      </div>
      <p className="mt-1 text-[10px] font-medium text-gray-600 dark:text-gray-400">
        {label}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify component file was created**

Run: `ls -la src/components/calculator/irregular-algorithm-transparency.tsx`
Expected: File exists

---

## Chunk 2: Add Translations

### Task 2: Add English Translations

**Files:**
- Modify: `messages/en.json`

- [ ] **Step 1: Add irregularAlgorithmTransparency key after algorithmTransparency**

Locate the end of the `algorithmTransparency` section (around lines 373-375):
```json
    "learnMore": "Learn more about our Editorial Policy"
  },
  "howToCalculate": {
```

Insert the new section between `algorithmTransparency` and `howToCalculate`. The result should be:
```json
    "learnMore": "Learn more about our Editorial Policy"
  },
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
  },
  "howToCalculate": {
```

### Task 3: Add Spanish Translations

**Files:**
- Modify: `messages/es.json`

- [ ] **Step 1: Add irregularAlgorithmTransparency key after algorithmTransparency**

Insert between `algorithmTransparency` (ends around line 375) and `howToCalculate` sections:
```json
  },
  "irregularAlgorithmTransparency": {
    "title": "Cómo Calculamos Tu Período Irregular",
    "cards": {
      "averageCycle": {
        "title": "Ciclo Promedio",
        "formula": "Σ(días) / n"
      },
      "standardDeviation": {
        "title": "Desviación Estándar",
        "formula": "σ = √(Σ(x-x̄)²/n)"
      },
      "confidence": {
        "title": "Confianza",
        "ruleHigh": "σ≤3 días → Alta",
        "ruleMedium": "σ≤6 días → Media",
        "ruleLow": "σ>6 días → Baja"
      }
    },
    "predictionWindow": {
      "title": "Ventana de Predicción",
      "earliest": "Más Temprano",
      "mostLikely": "Más Probable",
      "latest": "Más Tardío"
    },
    "disclaimer": "Los resultados son solo estimaciones, no consejo médico. Los ciclos individuales pueden variar.",
    "learnMore": "Más información sobre nuestra Política Editorial"
  },
  "howToCalculate": {
```

### Task 4: Add French Translations

**Files:**
- Modify: `messages/fr.json`

- [ ] **Step 1: Add irregularAlgorithmTransparency key after algorithmTransparency**

Insert between `algorithmTransparency` (ends around line 376) and `howToCalculate` sections:
```json
  },
  "irregularAlgorithmTransparency": {
    "title": "Comment Nous Calculons Vos Règles Irrégulières",
    "cards": {
      "averageCycle": {
        "title": "Cycle Moyen",
        "formula": "Σ(jours) / n"
      },
      "standardDeviation": {
        "title": "Écart Type",
        "formula": "σ = √(Σ(x-x̄)²/n)"
      },
      "confidence": {
        "title": "Confiance",
        "ruleHigh": "σ≤3 jours → Élevée",
        "ruleMedium": "σ≤6 jours → Moyenne",
        "ruleLow": "σ>6 jours → Faible"
      }
    },
    "predictionWindow": {
      "title": "Fenêtre de Prédiction",
      "earliest": "Plus Tôt",
      "mostLikely": "Plus Probable",
      "latest": "Plus Tard"
    },
    "disclaimer": "Les résultats sont des estimations uniquement, pas des conseils médicaux. Les cycles individuels peuvent varier.",
    "learnMore": "En savoir plus sur notre Politique Éditoriale"
  },
  "howToCalculate": {
```

---

## Chunk 3: Integrate into Page

### Task 5: Import and Add Component to Page

**Files:**
- Modify: `src/app/[locale]/irregular-period-calculator/page.tsx`

- [ ] **Step 1: Add import statement at top of file**

After line 6 (`import { IrregularDeepKnowledge }...`), add:

```tsx
import { IrregularAlgorithmTransparency } from "@/components/calculator/irregular-algorithm-transparency";
```

- [ ] **Step 2: Add component between HowToCalculate and DeepKnowledge**

After line 234 (`</div>` closing IrregularHowToCalculate), add:

```tsx
        {/* Algorithm Transparency */}
        <div className="mt-24 w-full max-w-4xl">
          <IrregularAlgorithmTransparency />
        </div>
```

---

## Chunk 4: Verify Build

### Task 6: Run Build and Verify

- [ ] **Step 1: Run TypeScript type check**

Run: `cd d:/1-github/period-calculator && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Run production build**

Run: `cd d:/1-github/period-calculator && npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 3: Commit changes**

```bash
cd d:/1-github/period-calculator
git add src/components/calculator/irregular-algorithm-transparency.tsx
git add src/app/\[locale\]/irregular-period-calculator/page.tsx
git add messages/en.json messages/es.json messages/fr.json
git commit -m "$(cat <<'EOF'
feat: add algorithm transparency module to irregular period calculator

- Create IrregularAlgorithmTransparency component with 3 statistical cards
- Add prediction window visualization (Earliest → Most Likely → Latest)
- Add translations for en/es/fr
- Integrate between HowToCalculate and DeepKnowledge sections

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Verification Checklist

After implementation:

- [ ] Visual test: Desktop layout shows 3 cards in a row + prediction window
- [ ] Visual test: Mobile layout shows stacked cards
- [ ] Dark mode: All elements properly styled
- [ ] i18n: English translations display correctly
- [ ] i18n: Spanish translations display correctly (switch to /es)
- [ ] i18n: French translations display correctly (switch to /fr)
- [ ] Link: "Learn more about our Editorial Policy" navigates to /editorial-policy
- [ ] Accessibility: Screen reader can read all content
- [ ] Build: `npm run build` succeeds