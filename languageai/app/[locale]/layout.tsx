import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import { monaSans } from "@/app/[locale]/fonts";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale, locales } from "@/i18n.config";
import useTextDirection from "@/src/hooks/useTextDirection";
import Head from "next/head";

export const metadata: Metadata = {
  title: "LanguageAI",
  description: "LanguageAI: Translate texts and documents in 130+ languages effortlessly. Break language barriers and connect globally with our easy-to-use platform.",
  generator: "Rahmlad",
  applicationName: "LanguageAI",
  referrer: "origin-when-cross-origin",
  keywords: ["Language", "AI", "LanguageAI", "Translation", "Document"],
  authors: [
    { name: "Abdrahman Oladimeji", url: "https://linkedin.com/in/rahmlad" },
  ],
  creator: "Abdrahman Oladimeji",
  publisher: "Abdrahman Oladimeji",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default function PageLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const dir = useTextDirection();
  return (
    <html lang={locale} dir={dir}>
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
      <body className={monaSans.className}>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
      <Analytics />
    </html>
  );
}
