"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ClientTopNav() {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}\b/, "");

  const titles: Record<string, string> = {
    "/dashboard": t("Dashboard"),
    "/translation-history": t("TranslationHistory"),
    "/translated-documents": t("TranslatedDocuments"),
    "/settings": t("Settings"),
    "/account": t("AccountSettings"),
  };

  const currentTitle =
    titles[pathWithoutLocale] ||
    Object.entries(titles).find(([key]) =>
      pathWithoutLocale.startsWith(`${key}/`),
    )?.[1] ||
    "Dashboard";

  return (
    <header className="bg-white border-b h-16 lg:h-20 flex items-center px-6 md:px-10 shadow-sm sticky top-0 z-40">
      <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
        {currentTitle}
      </h1>
    </header>
  );
}
