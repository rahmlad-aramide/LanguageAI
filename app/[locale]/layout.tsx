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
  description: "Translate texts and documents in 130+ languages effortlessly with LanguageAI. Break language barriers, connect globally, and enjoy a seamless, user-friendly experience on our advanced translation platform.",
  generator: "Rahmlad", 
  applicationName: "LanguageAI",
  referrer: "origin-when-cross-origin",
  keywords: ["language", "ai", "file", "translate", "documents", 'texts', 'translator'],
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
    siteName: "LanguageAI",
    url: "https://uselanguageai.xyz"
  },
  twitter: {
    images: '/og.png',
    site: "https://uselanguageai.xyz"
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
