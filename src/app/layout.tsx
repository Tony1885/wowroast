import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WoWRoast.com - Get Your WoW Character Roasted",
  description:
    "Enter your World of Warcraft character and get a brutal, AI-powered roast based on your M+ score, raid progression, and Warcraft Logs parses.",
  openGraph: {
    title: "WoWRoast.com",
    description: "Get your WoW character absolutely destroyed by AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#07070a] text-gray-200 antialiased">
        {children}
      </body>
    </html>
  );
}
