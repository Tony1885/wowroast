import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const ADSENSE_PUB_ID = "ca-pub-8348522858446705";

export const metadata: Metadata = {
  metadataBase: new URL("https://wowroast.com"),
  title: {
    default: "WoWRoast.com - Get Your WoW Character Roasted by AI",
    template: "%s | WoWRoast.com",
  },
  description:
    "Enter your World of Warcraft character name and get a brutal, AI-powered roast based on your Mythic+ score, raid progression, item level, and Warcraft Logs parses. Free, instant, savage.",
  keywords: [
    "WoW",
    "World of Warcraft",
    "roast",
    "character roast",
    "M+ score",
    "mythic plus",
    "raid progression",
    "warcraft logs",
    "raider.io",
    "WoW roast generator",
    "AI roast",
    "character analysis",
    "WoW meme",
  ],
  authors: [{ name: "WoWRoast" }],
  creator: "WoWRoast",
  openGraph: {
    title: "WoWRoast.com - Get Your WoW Character Destroyed by AI",
    description:
      "Paste your character name and let AI roast your gameplay. M+ score, raid prog, parses - nothing is safe.",
    url: "https://wowroast.com",
    siteName: "WoWRoast.com",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WoWRoast.com - AI-Powered WoW Character Roasts",
    description:
      "Get your WoW character brutally roasted by AI. Enter your name, get destroyed.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://wowroast.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#07070a" />
      </head>
      <body className="min-h-screen bg-[#07070a] text-gray-200 antialiased">
        {children}
        <Analytics />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
