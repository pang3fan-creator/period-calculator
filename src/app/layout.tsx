import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://periodcalculator.site"),
  title: {
    default: "Period Calculator - Free & Private Menstrual Cycle Tracker",
    template: "%s | Period Calculator",
  },
  description:
    "Calculate your next period, fertile window, and ovulation date. 100% private - all data stays in your browser. No login required.",
  keywords: [
    "period calculator",
    "menstrual cycle calculator",
    "ovulation calculator",
    "irregular period calculator",
    "fertile window calculator",
  ],
  authors: [{ name: "Period Calculator" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Period Calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Period Calculator",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
      fr: "/fr",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
