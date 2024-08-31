import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import { monaSans } from "@/app/[locale]/fonts";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale, locales } from "@/i18n.config";
import useTextDirection from "@/src/hooks/useTextDirection";

export const metadata: Metadata = {
  title: "LanguageAI - AI Texts and Documents Translator",
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
  metadataBase: new URL('https://languageai.vercel.app'),
  alternates: {
    canonical: '/',
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
      <body className={monaSans.className}>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
      <Analytics />
    </html>
  );
}
