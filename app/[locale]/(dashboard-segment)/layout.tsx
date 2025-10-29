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
      <div className="min-h-screen flex bg-gray-50">
        {/* ✅ Sidebar on the left */}
        <SidebarPage />

        {/* ✅ Main area beside sidebar */}
        <div className="flex-1 flex flex-col">
          {/* ✅ Top Nav stays at the top of the content area */}
          <TopNavPage />

          {/* ✅ Main content below TopNav */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
