import { Suspense } from "react";
import { Video } from "./video";
import { Footer, Navbar } from "@/src/components";
import { ModalProvider, NotificationProvider } from "@/src/contexts";
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n.config";
import { LoadingIndicator } from "@/src/assets/svg";

export default function DemoVideo({
  params: { locale },
}: Readonly<{ params: { locale: Locale } }>) {
  unstable_setRequestLocale(locale);
  return (
    <NotificationProvider>
      <ModalProvider>
        <header className="sticky top-0 bg-white md:bg-transparent z-50">
          <Navbar />
        </header>
        <main>
          <Suspense
            fallback={
              <div className="w-full h-full flex justify-center items-center">
                <LoadingIndicator />
              </div>
            }
          >
            <Video />
          </Suspense>
        </main>
        <Footer />
      </ModalProvider>
    </NotificationProvider>
  );
}
