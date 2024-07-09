import React from "react";
import { Button } from "./shared/Button";
import Image from "next/image";
import aboutImg from '@/src/assets/about.png';
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n.config";

export const About: React.FC = () => {
  const t = useTranslations("About");
  const locale = useLocale() as Locale;
  const isArabic = locale === 'ar';
  return (
    <section id="about" className="bg-[#FFF4F9]">
      <div className="flex flex-col md:flex-row justify-center w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] lg:w-[calc(100%_-_300px)] max-w-6xl mx-auto">
        <div className="flex flex-col justify-center items-center md:items-start w-full md:w-1/2 mb-0 mt-10 md:my-10">
          <h2 className="font-semibold text-2xl md:text-4xl text-[#101828] mb-4 text-center md:text-left">{t("heading")}</h2>
          <p className={`!leading-loose mb-10 md:mb-16 text-sm font-medium md:text-xl text-center ${isArabic ? "md:text-right" : "md:text-left"}`}>
            <strong>{t("body.strong")}</strong>&nbsp;
            {t("body.normal")}
          </p>
          <Button>{t("body.button")}</Button>
        </div>
        <div className="w-full md:w-1/2">
          <Image src={aboutImg} width={626} height={686} alt="About languageai" className="flex" />
        </div>
      </div>
    </section>
  );
};

