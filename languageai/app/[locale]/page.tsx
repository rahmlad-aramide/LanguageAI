import "regenerator-runtime/runtime";
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n.config";
import {
  About,
  CircularCTA,
  Hero,
  HowItWorks,
  Navbar,
  Translation,
  Features,
  Footer,
} from "@/src/components";
import { ModalProvider, NotificationProvider } from "@/src/contexts";
import { SupportedFormats } from "@/src/components/SupportedFormat";

export default function Home({
  params: { locale },
}: Readonly<{ params: { locale: Locale } }>) {
  unstable_setRequestLocale(locale);

  return (
    <NotificationProvider>
      <ModalProvider>
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
        </main>
        <Footer />
      </ModalProvider>
    </NotificationProvider>
  );
}
