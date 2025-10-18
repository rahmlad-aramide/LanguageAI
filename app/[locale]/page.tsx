import "regenerator-runtime/runtime";
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n.config";
import {
  CircularCTA,
  Hero,
  HowItWorks,
  Navbar,
  Translation,
  Features,
  Footer,
  About,
} from "@/src/components";
import { ModalProvider, NotificationProvider } from "@/src/contexts";
import { SupportedFormats } from "@/src/components/SupportedFormat";
import Link from "next/link";
import Contact from "@/src/components/Contact";

export default function Home({
  params: { locale },
}: Readonly<{ params: { locale: Locale } }>) {
  unstable_setRequestLocale(locale);

  return (
    <NotificationProvider>
      <ModalProvider>
        <Link
          href="/#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </Link>

        <header className="sticky top-0 bg-white md:bg-transparent z-50">
          <Navbar />
        </header>
        <main className="relative">
          <Hero />
          <CircularCTA />
          <Translation />
          <Features />
          <HowItWorks />
          <SupportedFormats />
          <About />
          <Contact />
        </main>
        <Footer />
      </ModalProvider>
    </NotificationProvider>
  );
}
