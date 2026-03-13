import type { OvulationPurpose } from "@/components/calculator/ovulation-period-calculator";

/**
 * Ovulation theme configuration for dual-theme styling
 * Provides distinct visual experiences for "conceive" vs "avoid" purposes
 */

export interface OvulationThemeColors {
  border: string;
  bg: string;
  text: string;
  darkBorder?: string;
  darkBg?: string;
  darkText?: string;
}

export interface OvulationTheme {
  /** Color configurations for different period types */
  colors: {
    ovulation: OvulationThemeColors;
    fertile: OvulationThemeColors;
    period: OvulationThemeColors;
    pms: OvulationThemeColors;
  };
  /** Border radius class */
  rounded: string;
  /** Shadow class */
  shadow: string;
  /** Icon set for different period types */
  icons: {
    ovulation: string;
    fertile: string;
    period: string;
    pms: string;
  };
  /** Translation key prefix - null means use standard keys */
  textPrefix: "conceive" | "avoid" | null;
}

/**
 * Standard theme configuration for general period calculator
 * Style: Neutral, professional, standard
 */
const standardTheme: OvulationTheme = {
  colors: {
    ovulation: {
      border: "border-violet-400",
      bg: "bg-violet-50",
      text: "text-violet-700",
      darkBorder: "dark:border-violet-500",
      darkBg: "dark:bg-violet-950/30",
      darkText: "dark:text-violet-300",
    },
    fertile: {
      border: "border-emerald-400",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      darkBorder: "dark:border-emerald-500",
      darkBg: "dark:bg-emerald-950/30",
      darkText: "dark:text-emerald-300",
    },
    period: {
      border: "border-rose-300",
      bg: "bg-rose-50",
      text: "text-rose-700",
      darkBorder: "dark:border-rose-500",
      darkBg: "dark:bg-rose-950/30",
      darkText: "dark:text-rose-300",
    },
    pms: {
      border: "border-amber-300",
      bg: "bg-amber-50",
      text: "text-amber-700",
      darkBorder: "dark:border-amber-500",
      darkBg: "dark:bg-amber-950/30",
      darkText: "dark:text-amber-300",
    },
  },
  rounded: "rounded-3xl",
  shadow: "shadow-lg shadow-primary-200/30 dark:shadow-primary-900/20",
  icons: {
    ovulation: "🥚",
    fertile: "🌸",
    period: "🌙",
    pms: "✨",
  },
  textPrefix: null,
};

/**
 * Theme configuration for "Trying to conceive" mode
 * Style: Romantic, warm, encouraging
 */
const conceiveTheme: OvulationTheme = {
  colors: {
    ovulation: {
      border: "border-violet-400",
      bg: "bg-gradient-to-r from-pink-50 to-violet-50",
      text: "text-violet-700",
      darkBorder: "dark:border-violet-500",
      darkBg: "dark:from-pink-950/30 dark:to-violet-950/30",
      darkText: "dark:text-violet-300",
    },
    fertile: {
      border: "border-emerald-400",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      darkBorder: "dark:border-emerald-500",
      darkBg: "dark:bg-emerald-950/30",
      darkText: "dark:text-emerald-300",
    },
    period: {
      border: "border-rose-300",
      bg: "bg-rose-50",
      text: "text-rose-700",
      darkBorder: "dark:border-rose-500",
      darkBg: "dark:bg-rose-950/30",
      darkText: "dark:text-rose-300",
    },
    pms: {
      border: "border-amber-300",
      bg: "bg-amber-50",
      text: "text-amber-700",
      darkBorder: "dark:border-amber-500",
      darkBg: "dark:bg-amber-950/30",
      darkText: "dark:text-amber-300",
    },
  },
  rounded: "rounded-3xl",
  shadow: "shadow-lg shadow-primary-200/30 dark:shadow-primary-900/20",
  icons: {
    ovulation: "💕",
    fertile: "🌸",
    period: "🌙",
    pms: "✨",
  },
  textPrefix: "conceive",
};

/**
 * Theme configuration for "Avoiding pregnancy" mode
 * Style: Professional, cautious, warning-oriented
 */
const avoidTheme: OvulationTheme = {
  colors: {
    ovulation: {
      border: "border-amber-500",
      bg: "bg-amber-50",
      text: "text-amber-700",
      darkBorder: "dark:border-amber-600",
      darkBg: "dark:bg-amber-950/30",
      darkText: "dark:text-amber-300",
    },
    fertile: {
      border: "border-red-400",
      bg: "bg-red-50",
      text: "text-red-700",
      darkBorder: "dark:border-red-500",
      darkBg: "dark:bg-red-950/30",
      darkText: "dark:text-red-300",
    },
    period: {
      border: "border-slate-300",
      bg: "bg-slate-50",
      text: "text-slate-700",
      darkBorder: "dark:border-slate-600",
      darkBg: "dark:bg-slate-950/30",
      darkText: "dark:text-slate-300",
    },
    pms: {
      border: "border-blue-300",
      bg: "bg-blue-50",
      text: "text-blue-700",
      darkBorder: "dark:border-blue-500",
      darkBg: "dark:bg-blue-950/30",
      darkText: "dark:text-blue-300",
    },
  },
  rounded: "rounded-2xl",
  shadow: "",
  icons: {
    ovulation: "⚠️",
    fertile: "🛡️",
    period: "📅",
    pms: "ℹ️",
  },
  textPrefix: "avoid",
};

/**
 * Get theme configuration based on purpose
 * - undefined: Standard theme (for general period calculator)
 * - "conceive": Romantic theme for trying to conceive
 * - "avoid": Professional theme for avoiding pregnancy
 */
export function getOvulationTheme(
  purpose: OvulationPurpose | undefined,
): OvulationTheme {
  if (purpose === undefined) {
    return standardTheme;
  }
  return purpose === "conceive" ? conceiveTheme : avoidTheme;
}

/**
 * Build complete Tailwind class string for a card
 */
export function buildCardClasses(
  theme: OvulationTheme,
  colorKey: keyof OvulationTheme["colors"],
  isFeatured = false,
): string {
  const color = theme.colors[colorKey];
  const baseClasses = [
    "flex items-center gap-3 p-3 sm:gap-4 sm:p-5",
    theme.rounded,
    "border-2",
    color.border,
    color.bg,
    color.text,
  ];

  if (color.darkBorder) baseClasses.push(color.darkBorder);
  if (color.darkBg) {
    // Handle gradient background for dark mode
    if (color.bg.includes("gradient")) {
      baseClasses.push(color.darkBg);
    } else {
      baseClasses.push(color.darkBg);
    }
  }
  if (color.darkText) baseClasses.push(color.darkText);

  if (theme.shadow) baseClasses.push(theme.shadow);

  if (isFeatured) {
    baseClasses.push("col-span-full");
  }

  return baseClasses.join(" ");
}

/**
 * Build calendar day cell classes based on period type and purpose
 */
export function getCalendarDayClasses(
  periodType: "period" | "ovulation" | "fertile" | "pms" | null,
  purpose: OvulationPurpose | undefined,
): string {
  const theme = getOvulationTheme(purpose);
  const baseStyles =
    "flex h-11 min-h-[44px] items-center justify-center rounded-2xl text-sm font-medium transition-all";

  if (!periodType) {
    return `${baseStyles} text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`;
  }

  const color = theme.colors[periodType];
  const classes = [baseStyles, "border-2", color.border, color.bg, color.text];

  if (color.darkBorder) classes.push(color.darkBorder);
  if (color.darkBg && !color.darkBg.includes("gradient")) {
    classes.push(color.darkBg);
  } else if (color.darkBg) {
    // For gradient backgrounds, use a simpler dark background
    classes.push("dark:bg-gray-900/40");
  }
  if (color.darkText) classes.push(color.darkText);

  if (periodType === "ovulation") {
    classes.push("font-bold");
  }

  return classes.join(" ");
}
