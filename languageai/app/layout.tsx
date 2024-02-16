import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://res.cloudinary.com/dh4rm7b7b/image/upload/b_rgb:FFFFFF/c_pad,ar_1:1/v1707299721/Language-AI/logo_l1j3ny.png"
  ),
  title: "LanguageAI",
  description: "Empowering Global Communication and Language Mastery",
  generator: "Rahmlad",
  applicationName: "LanguageAI",
  referrer: "origin-when-cross-origin",
  keywords: ["Language", "AI", "LanguageAI", "Translation"],
  authors: [
    { name: "Abdrahman Oladimeji", url: "https://linkedin.com/in/rahmlad" },
  ],
  creator: "Abdrahman Oladimeji",
  publisher: "Abdrahman Oladimeji",
  // openGraph: {
  //   title: "LanguageAI",
  //   description:
  //     "With LanguageAI, Translate with Precision, Learn with Passion, Connect with the World",
  //   url: "https://",
  //   siteName: "LanguageAI",
  //   images: [
  //     {
  //       url: "https://res.cloudinary.com/dh4rm7b7b/image/upload/b_rgb:FFFFFF/c_pad,ar_1:1/v1707299721/Language-AI/logo_l1j3ny.png", // Must be an absolute URL
  //       width: 399,
  //       height: 399,
  //     },
  //     {
  //       url: "https://res.cloudinary.com/dh4rm7b7b/image/upload/b_rgb:FFFFFF/c_pad,ar_1:1/v1707299721/Language-AI/logo_l1j3ny.png", // Must be an absolute URL
  //       width: 1200,
  //       height: 1200,
  //       alt: "LanguageAI",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <link rel="preload" href="Mona-Sans.woff2" as="font" type="font/woff2" crossorigin> */}
      {/* <Link rel="preload" href="/Mona-Sans.woff2" as="font" type="font/woff2"></Link> */}
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
