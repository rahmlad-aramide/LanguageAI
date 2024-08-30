import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { monaSans } from "@/app/[locale]/fonts";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale, locales } from "@/i18n.config";
import useTextDirection from "@/src/hooks/useTextDirection";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://res.cloudinary.com/dh4rm7b7b/image/upload/b_rgb:FFFFFF/c_pad,ar_1:1/v1707299721/Language-AI/logo_l1j3ny.png",
  ),
  title: "LanguageAI",
  description: "Empowering Global Communication and Language Mastery",
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
export default function RootLayout({
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
