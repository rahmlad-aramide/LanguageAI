import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { monaSans } from "@/app/[locale]/fonts";

export const metadata: Metadata = {
  title: "LanguageAI",
  description: "Empowering Global Communication and Language Mastery",
  generator: "Rahmlad",
  applicationName: "LanguageAI",
  referrer: "origin-when-cross-origin",
  keywords: ["language", "ai", "LanguageAI", "translation", "translate", "document"],
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
      <body className={monaSans.className}>
          {children}
      </body>
      <Analytics />
    </html>
  );
}