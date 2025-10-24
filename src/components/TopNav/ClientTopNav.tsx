"use client";

import { usePathname } from "next/navigation";

export default function ClientTopNav() {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/translation-history": "TranslationHistory",
    "/settings": "Settings",
    "/account": "AccountSettings",
  };

  const title = titles[pathname] || "Dashboard";

  return (
    <header>
      <div className="fixed top-0 left-0 z-40 bg-white flex justify-between items-center px-10 h-20 lg:h-24 border-b w-full md:w-[calc(100%-14rem)] md:left-[14rem]">
        <h1 className="text-xl lg:text-3xl font-semibold">{title}</h1>
      </div>
    </header>
  );
};
