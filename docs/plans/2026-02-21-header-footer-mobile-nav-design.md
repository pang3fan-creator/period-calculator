# Header / Footer / Mobile Nav Design

**Date:** 2026-02-21
**Status:** Approved
**Approach:** Pure Tailwind + hand-written components (zero UI library dependencies)

---

## Decisions Summary

| Component         | Decision                                                       |
| ----------------- | -------------------------------------------------------------- |
| Header            | Minimal: Logo + theme icon button + language dropdown          |
| Mobile Nav        | 4 Tab: Home / Irregular / Ovulation / Settings                 |
| Language Selector | Dropdown menu (EN/ES/FR)                                       |
| Footer            | Standard 3-column layout                                       |
| Theme Toggle      | Sun/moon icon button (desktop: Header, mobile: Settings panel) |

---

## 1. Header

### Desktop (md+)

```
┌──────────────────────────────────────────────────────────┐
│  Period Calculator              [☀/🌙]  [EN ▼]          │
└──────────────────────────────────────────────────────────┘
```

### Mobile (<md)

```
┌──────────────────────────────────────┐
│  Period Calculator        [☀/🌙]    │
└──────────────────────────────────────┘
```

Language selector hidden on mobile (moved to Settings panel).

### Specs

- Position: `sticky top-0 z-50`
- Background: `bg-ivory-50/80 backdrop-blur-md`, dark: `dark:bg-dark-bg/80`
- Height: `h-16` (64px)
- Max width: `max-w-7xl mx-auto`
- Logo: `font-heading text-primary-400 text-xl font-bold`, links to home
- Theme button: 48x48 touch target, `ghost` variant, inline SVG sun/moon
- Language dropdown: `hidden md:block`, `useState` toggle

### Language Dropdown

- Trigger: current locale code (EN/ES/FR) + chevron-down SVG
- Panel: `absolute right-0 top-full mt-2`, white card + `shadow-soft` + `rounded-xl`
- Each item: `min-h-[44px]`, checkmark on active locale
- Close on outside click (`useEffect` document click listener)
- Accessibility: `aria-expanded`, `aria-haspopup="listbox"`, `role="option"`

### Component Structure

```
Header ("use client")
├── Logo (Link → /)
├── ThemeToggle (next-themes useTheme)
└── LanguageSelector (useState + next-intl useRouter)
```

---

## 2. Mobile Bottom Nav

### Layout

```
┌──────────────────────────────────────────────┐
│   🏠        📈        🧲        ⚙️          │
│  Home    Irregular  Ovulation  Settings      │
└──────────────────────────────────────────────┘
```

### Specs

- Position: `fixed bottom-0 left-0 right-0 z-50`
- Visibility: `md:hidden`
- Background: `bg-ivory-50/95 backdrop-blur-md`, dark: `dark:bg-dark-bg/95`
- Height: `h-16` + `pb-[env(safe-area-inset-bottom)]` (iOS safe area)
- Grid: `grid grid-cols-4`
- Each item: `flex flex-col items-center justify-center gap-1`, min 48px touch target
- Active state: `text-primary-400`, inactive: `text-gray-400`

### Icons (inline SVG, 24x24)

- Home: house icon
- Irregular: wave/chart icon
- Ovulation: calendar/heart icon
- Settings: gear icon

### Settings Panel

Bottom sheet overlay, triggered by Settings tab:

```
┌──────────────────────────────────┐
│  Settings                    ✕   │
│                                  │
│  Theme                           │
│  ┌────────────────────────────┐  │
│  │  ☀️ Light    🌙 Dark       │  │
│  └────────────────────────────┘  │
│                                  │
│  Language                        │
│  ┌────────────────────────────┐  │
│  │  ● English                 │  │
│  │  ○ Español                 │  │
│  │  ○ Français                │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

- Slide-in from bottom with `translate-y` animation
- Semi-transparent backdrop overlay
- Close on backdrop click or ✕ button
- Theme: two side-by-side buttons, active mode highlighted
- Language: radio button list, auto-switch locale on select

### Route Highlighting

Using `usePathname()`:

- `/` or `/{locale}` → Home active
- `/irregular-period-calculator` → Irregular active
- `/ovulation-calculator` → Ovulation active
- Settings has no route, panel state only

### Body Bottom Padding

`<main>` needs `pb-20 md:pb-0` to prevent content hidden behind fixed nav.

### Component Structure

```
MobileNav ("use client")
├── NavItem × 3 (Link with active state)
├── SettingsButton (triggers panel)
└── SettingsPanel (conditional render)
    ├── ThemeSelector (next-themes)
    └── LanguageSelector (next-intl router)
```

---

## 3. Footer

### Desktop (md+)

```
┌──────────────────────────────────────────────────────────────┐
│  Period Calculator         Links              Trust          │
│  Free & Private            Privacy Policy     🔒 100%       │
│  Menstrual Cycle           Editorial Policy   Private.       │
│  Tracker                   Blog               Your data      │
│                                               never leaves   │
│                                               your device.   │
│  ─────────────────────────────────────────────────────────── │
│  © 2026 Period Calculator. All rights reserved.              │
└──────────────────────────────────────────────────────────────┘
```

### Mobile (<md)

Stacks vertically, center-aligned. Bottom padding for MobileNav clearance.

### Specs

- Background: `bg-ivory-50 dark:bg-dark-bg`
- Border: `border-t border-warmbeige-200 dark:border-dark-border`
- Padding: `py-12 px-4`
- Max width: `max-w-7xl mx-auto`
- Grid: desktop `md:grid md:grid-cols-3 md:gap-8`, mobile `space-y-8 text-center`
- Mobile bottom padding: `pb-20 md:pb-0`

### Three Columns

**Left - Brand**

- Logo: `font-heading text-primary-400 text-lg font-bold`
- Tagline: `text-sm text-gray-500 dark:text-gray-400 mt-2`
- Content: "Free & Private Menstrual Cycle Tracker"

**Center - Links**

- Title: `text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider`
- Links: `space-y-2 mt-3`, each `text-sm text-gray-500 hover:text-primary-400 transition-colors`
- Items: Privacy Policy → `/privacy-policy`, Editorial Policy → `/editorial-policy`, Blog → `/blog`

**Right - Trust**

- Lock SVG icon + trust copy
- `text-sm text-gray-500 dark:text-gray-400`

**Copyright Bar**

- Divider: `border-t border-warmbeige-200 dark:border-dark-border mt-8 pt-6`
- Text: `text-center text-xs text-gray-400`

### i18n

New `footer` namespace in `messages/*.json`:

```json
"footer": {
  "tagline": "Free & Private Menstrual Cycle Tracker",
  "links": "Links",
  "trust": "Trust",
  "trustText": "Your data never leaves your device.",
  "copyright": "© {year} Period Calculator. All rights reserved."
}
```

### Component Structure

```
Footer (Server Component - no "use client")
├── BrandColumn (Logo + tagline)
├── LinksColumn (3 × Link with next-intl locale handling)
├── TrustColumn (lock icon + copy)
└── CopyrightBar
```

---

## 4. Layout Integration

Update `src/app/[locale]/layout.tsx` to include Header, Footer, and MobileNav:

```
<body>
  <ThemeProvider>
    <NextIntlClientProvider>
      <Header />
      <main className="pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </NextIntlClientProvider>
  </ThemeProvider>
</body>
```

---

## 5. New Files

| File                                   | Type   | Purpose                                      |
| -------------------------------------- | ------ | -------------------------------------------- |
| `src/components/layout/header.tsx`     | Client | Header with theme toggle + language selector |
| `src/components/layout/footer.tsx`     | Server | 3-column footer                              |
| `src/components/layout/mobile-nav.tsx` | Client | Bottom nav + settings panel                  |

All three files already exist as stubs and will be replaced.

## 6. Modified Files

| File                          | Change                                      |
| ----------------------------- | ------------------------------------------- |
| `src/app/[locale]/layout.tsx` | Import and render Header, Footer, MobileNav |
| `src/app/[locale]/page.tsx`   | Remove page-level padding if conflicting    |
| `src/app/globals.css`         | Add safe-area-inset utility if needed       |
| `messages/en.json`            | Add `footer` namespace                      |
| `messages/es.json`            | Add `footer` namespace (Spanish)            |
| `messages/fr.json`            | Add `footer` namespace (French)             |
