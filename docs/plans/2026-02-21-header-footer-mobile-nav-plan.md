# Header / Footer / Mobile Nav Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement the three layout shell components (Header, Footer, MobileNav) with theme toggle, language selector, and mobile settings panel.

**Architecture:** Pure Tailwind + hand-written components. Header and MobileNav are Client Components (need `useState`, `useTheme`, `useRouter`). Footer is a Server Component. All text uses `next-intl` translations. Navigation uses `next-intl/navigation` `Link` and `usePathname`.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, next-intl 4, next-themes 0.4

**Design Doc:** `docs/plans/2026-02-21-header-footer-mobile-nav-design.md`

---

### Task 1: Add i18n translation keys for footer, settings, and header

**Files:**

- Modify: `messages/en.json`
- Modify: `messages/es.json`
- Modify: `messages/fr.json`

**Step 1: Add keys to en.json**

Add `footer`, `settings`, and `header` namespaces after the existing `home` block:

```json
"header": {
  "toggleTheme": "Toggle theme",
  "selectLanguage": "Select language"
},
"footer": {
  "tagline": "Free & Private Menstrual Cycle Tracker",
  "links": "Links",
  "trust": "Trust",
  "trustText": "Your data never leaves your device.",
  "copyright": "© {year} Period Calculator. All rights reserved."
},
"settings": {
  "title": "Settings",
  "theme": "Theme",
  "light": "Light",
  "dark": "Dark",
  "language": "Language",
  "close": "Close"
}
```

**Step 2: Add keys to es.json**

```json
"header": {
  "toggleTheme": "Cambiar tema",
  "selectLanguage": "Seleccionar idioma"
},
"footer": {
  "tagline": "Seguimiento Menstrual Gratuito y Privado",
  "links": "Enlaces",
  "trust": "Confianza",
  "trustText": "Tus datos nunca salen de tu dispositivo.",
  "copyright": "© {year} Calculadora de Periodo. Todos los derechos reservados."
},
"settings": {
  "title": "Ajustes",
  "theme": "Tema",
  "light": "Claro",
  "dark": "Oscuro",
  "language": "Idioma",
  "close": "Cerrar"
}
```

**Step 3: Add keys to fr.json**

```json
"header": {
  "toggleTheme": "Changer le thème",
  "selectLanguage": "Sélectionner la langue"
},
"footer": {
  "tagline": "Suivi Menstruel Gratuit et Privé",
  "links": "Liens",
  "trust": "Confiance",
  "trustText": "Vos données ne quittent jamais votre appareil.",
  "copyright": "© {year} Calculateur de Règles. Tous droits réservés."
},
"settings": {
  "title": "Paramètres",
  "theme": "Thème",
  "light": "Clair",
  "dark": "Sombre",
  "language": "Langue",
  "close": "Fermer"
}
```

**Step 4: Run build to verify JSON is valid**

Run: `npm run build`
Expected: Build succeeds, no JSON parse errors.

**Step 5: Commit**

```bash
git add messages/en.json messages/es.json messages/fr.json
git commit -m "feat: add i18n keys for header, footer, and settings"
```

---

### Task 2: Implement Header component

**Files:**

- Modify: `src/components/layout/header.tsx` (replace stub)

**Step 1: Write the Header component**

Replace the entire file with a `"use client"` component containing:

1. **Logo** — `Link` (from `@/i18n/routing`) pointing to `/`, styled `font-heading text-primary-400 text-xl font-bold`
2. **ThemeToggle** — a `button` with `min-h-[48px] min-w-[48px]`, uses `useTheme()` from `next-themes`. Renders sun SVG when theme is dark, moon SVG when light. `aria-label` from `useTranslations("header")("toggleTheme")`. Use `mounted` state to avoid hydration mismatch (render placeholder until `useEffect` sets `mounted = true`).
3. **LanguageSelector** — desktop only (`hidden md:block`):
   - Trigger button: displays current locale code uppercase (EN/ES/FR) + chevron-down SVG, `aria-expanded`, `aria-haspopup="listbox"`
   - Dropdown panel: `absolute right-0 top-full mt-2 rounded-xl bg-white dark:bg-dark-card shadow-soft`, `z-50`
   - Three items: `{ code: "en", label: "English" }, { code: "es", label: "Español" }, { code: "fr", label: "Français" }`
   - Each item: `min-h-[44px]`, `role="option"`, `aria-selected` for current locale, checkmark SVG on active
   - Click handler: `useRouter()` from `@/i18n/routing`, call `router.replace(pathname, { locale: newLocale })`
   - Close on outside click: `useEffect` with `mousedown` listener on `document`, check `ref.contains(target)`
   - Close on Escape key

**Imports needed:**

```typescript
"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Locale } from "@/i18n/config";
```

**Outer wrapper styles (same as existing stub):**

```
<header className="sticky top-0 z-50 border-b border-warmbeige-200 bg-ivory-50/80 backdrop-blur-md dark:border-dark-border dark:bg-dark-bg/80">
  <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
```

**Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds, zero errors.

**Step 3: Commit**

```bash
git add src/components/layout/header.tsx
git commit -m "feat: implement header with theme toggle and language selector"
```

---

### Task 3: Implement Footer component

**Files:**

- Modify: `src/components/layout/footer.tsx` (replace stub)

**Step 1: Write the Footer component**

This is a **Server Component** (no `"use client"`). Uses `useTranslations("footer")` and `useTranslations("nav")`.

Structure:

```
<footer className="border-t border-warmbeige-200 bg-ivory-50 pb-20 dark:border-dark-border dark:bg-dark-bg md:pb-0">
  <div className="mx-auto max-w-7xl px-4 py-12">
    <div className="space-y-8 text-center md:grid md:grid-cols-3 md:gap-8 md:space-y-0 md:text-left">
      {/* Left: Brand */}
      {/* Center: Links */}
      {/* Right: Trust */}
    </div>
    {/* Copyright bar */}
  </div>
</footer>
```

**Left column — Brand:**

- Logo text: `font-heading text-primary-400 text-lg font-bold`
- Tagline: `mt-2 text-sm text-gray-500 dark:text-gray-400`, content from `t("tagline")`

**Center column — Links:**

- Title: `text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300`, content from `t("links")`
- Links list: `mt-3 space-y-2`
- Each link: `Link` from `@/i18n/routing`, `text-sm text-gray-500 hover:text-primary-400 transition-colors`
- Items: Privacy Policy → `/privacy-policy`, Editorial Policy → `/editorial-policy`, Blog → `/blog`
- Link text from `useTranslations("nav")`: `tNav("privacyPolicy")`, `tNav("editorialPolicy")`, `tNav("blog")`

**Right column — Trust:**

- Inline lock SVG (16x16) + trust text from `t("trustText")`
- `flex items-start gap-2` (on md), centered on mobile

**Copyright bar:**

- `mt-8 border-t border-warmbeige-200 pt-6 text-center text-xs text-gray-400 dark:border-dark-border`
- Content: `t("copyright", { year: new Date().getFullYear() })`

**Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/layout/footer.tsx
git commit -m "feat: implement 3-column footer with brand, links, and trust"
```

---

### Task 4: Implement MobileNav component

**Files:**

- Modify: `src/components/layout/mobile-nav.tsx` (replace stub)

**Step 1: Write the MobileNav component**

`"use client"` component. Contains two parts: bottom tab bar + settings panel overlay.

**Imports:**

```typescript
"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Locale } from "@/i18n/config";
```

**Bottom tab bar:**

```
<nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-warmbeige-200 bg-ivory-50/95 backdrop-blur-md dark:border-dark-border dark:bg-dark-bg/95 md:hidden"
     style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
  <div className="grid h-16 grid-cols-4">
    {/* 4 NavItems */}
  </div>
</nav>
```

**Each NavItem (Home, Irregular, Ovulation):**

- Wrapped in `Link` from `@/i18n/routing`
- `flex flex-col items-center justify-center gap-1`
- Icon: inline SVG 24x24
- Label: `text-xs`
- Active state: compare `usePathname()` result. Active → `text-primary-400`, inactive → `text-gray-400 dark:text-gray-500`
- Route matching:
  - Home: `pathname === "/"`
  - Irregular: `pathname === "/irregular-period-calculator"`
  - Ovulation: `pathname === "/ovulation-calculator"`

**Settings button (4th tab):**

- `<button>` instead of `Link`
- Gear SVG icon + label from `useTranslations("settings")("title")`
- `onClick` → `setSettingsOpen(true)`
- Highlight when panel is open: `text-primary-400`

**Settings panel overlay:**

- Render conditionally when `settingsOpen === true`
- Backdrop: `fixed inset-0 z-[60] bg-black/40`, `onClick` → close
- Panel: `fixed bottom-0 left-0 right-0 z-[70] rounded-t-2xl bg-white dark:bg-dark-surface`
  - Animate in: use CSS transition `transform translate-y-0` (open) / `translate-y-full` (closed)
  - To animate properly, always render the panel but toggle a CSS class
- Panel header: title + close button (✕ SVG)
- Theme section:
  - Label from `tSettings("theme")`
  - Two buttons side by side in a `grid grid-cols-2 gap-2` container
  - Light button: sun SVG + `tSettings("light")`, active when `theme === "light"` → `bg-primary-400 text-white`, inactive → `bg-warmbeige-100 dark:bg-dark-card`
  - Dark button: moon SVG + `tSettings("dark")`, similar logic
  - `onClick` → `setTheme("light")` / `setTheme("dark")`
  - Use `mounted` pattern same as Header ThemeToggle
- Language section:
  - Label from `tSettings("language")`
  - Three radio-style items: `{ code: "en", label: "English" }, { code: "es", label: "Español" }, { code: "fr", label: "Français" }`
  - Each: `min-h-[48px]`, filled circle on active locale, empty circle on inactive
  - `onClick` → `router.replace(pathname, { locale: code })`, then close panel

**Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/layout/mobile-nav.tsx
git commit -m "feat: implement mobile bottom nav with settings panel"
```

---

### Task 5: Integrate layout components into locale layout

**Files:**

- Modify: `src/app/[locale]/layout.tsx:34-50` (the return statement)
- Modify: `src/app/[locale]/page.tsx` (adjust padding)

**Step 1: Update locale layout**

Add imports at top of `src/app/[locale]/layout.tsx`:

```typescript
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
```

Update the return JSX to wrap children with layout components:

```tsx
<html lang={locale} suppressHydrationWarning>
  <body
    className={`${playfair.variable} ${inter.variable} font-body antialiased`}
  >
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
      </NextIntlClientProvider>
    </ThemeProvider>
  </body>
</html>
```

**Step 2: Adjust page.tsx padding**

In `src/app/[locale]/page.tsx`, the `<main>` wrapper is now in layout, so the page's outer element should change from `<main>` to `<div>` and remove `min-h-screen`:

```tsx
<div className="flex flex-col items-center px-4 py-16">
```

**Step 3: Run build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Run dev server and visually verify**

Run: `npm run dev`
Check:

- Desktop: Header shows Logo + theme toggle + language dropdown
- Desktop: Footer shows 3 columns
- Mobile (resize to < 768px): Bottom nav shows 4 tabs, header hides language selector
- Mobile: Settings tab opens panel with theme + language options
- Theme toggle works in both desktop and mobile
- Language switching works, URL updates correctly
- Dark mode renders correct colors

**Step 5: Commit**

```bash
git add src/app/\[locale\]/layout.tsx src/app/\[locale\]/page.tsx
git commit -m "feat: integrate header, footer, and mobile nav into layout"
```

---

### Task 6: Run lint + format + final build

**Step 1: Run prettier**

Run: `npx prettier --write "src/components/layout/**/*.tsx" "src/app/[locale]/layout.tsx" "src/app/[locale]/page.tsx" "messages/*.json"`
Expected: Files formatted.

**Step 2: Run eslint**

Run: `npm run lint`
Expected: Zero errors.

**Step 3: Run final build**

Run: `npm run build`
Expected: Build succeeds with zero errors and zero warnings (except the known middleware deprecation warning).

**Step 4: Commit if any formatting changes**

```bash
git add -A
git commit -m "style: format layout components"
```
