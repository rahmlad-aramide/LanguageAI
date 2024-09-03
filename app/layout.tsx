import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { monaSans } from "@/app/[locale]/fonts";

export const metadata: Metadata = {
  title: "LanguageAI - Texts and Documents Translator.",
  description:
    "LanguageAI: Translate texts and documents in 130+ languages effortlessly. Break language barriers and connect globally with our easy-to-use platform.",
  generator: "Rahmlad",
  applicationName: "LanguageAI",
  referrer: "origin-when-cross-origin",
  keywords: [
    "language",
    "ai",
    "LanguageAI",
    "translation",
    "translate",
    "document",
    "translator"
  ],
  authors: [
    { name: "Abdrahman Oladimeji", url: "https://linkedin.com/in/rahmlad" },
  ],
  creator: "Abdrahman Oladimeji",
  publisher: "Abdrahman Oladimeji",
  metadataBase: new URL('https://uselanguageai.xyz'),
  alternates: {
    languages: {
      'en': '/en',
      'ar': '/ar',
      'fr': '/fr',
      'es': '/es',
      'de': '/de',
      'hi': '/hi',
      'zh': '/zh',
      'pt': '/pt',
      'ru': '/ru',
      'ja': '/ja',
      'bn': '/bn',
    },
  },
  openGraph: {
    images: '/og.png',
  },
  twitter: {
    images: '/og.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={monaSans.className}>{children}</body>
      <Analytics />
    </html>
  );
}
