"use client";
import { navLanguagesData } from "@/app/[locale]/data";
import { usePathname, useRouter, type Locale } from "@/i18n.config";
import Image from "next/image";
import { selectedNavLanguageOption } from "./shared/helper";
import { useState } from "react";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState(locale);

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale;
    setCurrentLocale(newLocale)
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex justify-center items-center border-b-2 transition-colors duration-200 border-transparent hover:border-[rgba(31,6,16,0.70)] focus:ring focus:border-[rgba(31,6,16,0.70)] focus-within:border-[rgba(31,6,16,0.70)] mb-3 md:mb-0">
      <Image
        src={`https://flagcdn.com/16x12/${selectedNavLanguageOption(locale)?.flag}.png`}
        alt="Flag image"
        width={16}
        height={12}
        className="w-4 h-3 mr-1"
      />
      <select
        value={currentLocale}
        onChange={changeLocale}
        className="outline-none border-none bg-transparent font-semibold text-[rgba(31,6,16,0.70)]"
      >
        {navLanguagesData.map((loc) => (
          <option key={loc.key} value={loc.key}>
            {loc.language}
          </option>
        ))}
      </select>
    </div>
  );
}
