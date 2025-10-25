import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { Locale, locales } from "@/i18n.config";
import SidebarPage from "@/src/components/Sidebar";
import TopNavPage from "@/src/components/TopNav";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);

  // ✅ Load translation messages for this locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen">
        {/* Sidebar (always visible on desktop) */}
        <SidebarPage />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          <TopNavPage />
          <main className="p-6 bg-gray-50 flex-1">{children}</main>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
