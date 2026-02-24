#!/bin/bash
cd "d:/1-github/period-calculator"
npx prettier --write "src/app/layout.tsx" "src/app/sitemap.ts" "src/app/[locale]/page.tsx" "src/app/[locale]/irregular-period-calculator/page.tsx" "src/app/[locale]/ovulation-calculator/page.tsx" "src/app/[locale]/layout.tsx"
