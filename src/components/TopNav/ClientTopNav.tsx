"use client";

import { usePathname } from "@/i18n.config";
import { useTranslations } from "next-intl";

export default function ClientTopNav() {
  const pathname = usePathname();
  const t = useTranslations("TopNav");

  const titles: Record<string, string> = {
    "/dashboard": t("Dashboard"),
    "/translation-history": t("TranslationHistory"),
    "/settings": t("Settings"),
    "/account": t("AccountSettings"),
  };

  const title = titles[pathname] || t("Dashboard");

  return (
    <header>
      <div className="fixed top-0 left-0 z-40 bg-white flex justify-between items-center px-10 h-20 lg:h-24 border-b w-full md:w-[calc(100%-250px)] md:left-[250px]">
        <h1 className="text-xl lg:text-3xl font-semibold">{title}</h1>
      </div>
    </header>
  );
}
