import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { monaSans } from "@/app/[locale]/fonts";
import Head from "next/head";

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
  ],
  authors: [
    { name: "Abdrahman Oladimeji", url: "https://linkedin.com/in/rahmlad" },
  ],
  creator: "Abdrahman Oladimeji",
  publisher: "Abdrahman Oladimeji",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head>
        <title>LanguageAI - Texts and Documents Translator</title>
        <meta
          name="title"
          content="LanguageAI - Texts and Documents Translator"
        />
        <meta
          name="description"
          content="LanguageAI: Translate texts and documents in 130+ languages effortlessly. Break language barriers and connect globally with our easy-to-use platform."
        />
        {/* Open Graph/Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://languageai.vercel.app" />
        <meta
          property="og:title"
          content="LanguageAI - Texts and Documents Translator"
        />
        <meta
          property="og:description"
          content="LanguageAI: Translate texts and documents in 130+ languages effortlessly. Break language barriers and connect globally with our easy-to-use platform."
        />
        <meta
          property="og:image"
          content="https://languageai.vercel.app/og.png"
        />
        <meta property="og:image" content="/og.png" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://languageai.vercel.app" />
        <meta
          property="twitter:title"
          content="LanguageAI - Texts and Documents Translator"
        />
        <meta
          property="twitter:description"
          content="LanguageAI: Translate texts and documents in 130+ languages effortlessly. Break language barriers and connect globally with our easy-to-use platform."
        />
        <meta
          property="twitter:image"
          content="https://languageai.vercel.app/og.png"
        />
        <meta
          property="twitter:image"
          content="/og.png"
        />
      </Head>
      <body className={monaSans.className}>{children}</body>
      <Analytics />
    </html>
  );
}
