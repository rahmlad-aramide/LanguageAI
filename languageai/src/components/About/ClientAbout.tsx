'use client'
import React, { useState } from "react";
import { Button } from "../shared/Button";
import Image from "next/image";
import aboutImg from "@/src/assets/about.webp";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n.config";

export const ClientAbout: React.FC<{
  heading: string;
  bodyStrong: string;
  bodyNormal: string;
  bodyNormal1: string;
  bodyMore: string;
  bodyLess: string;
}> = ({ heading, bodyStrong, bodyNormal, bodyNormal1, bodyMore, bodyLess }) => {
  const locale = useLocale() as Locale;
  const isArabic = locale === "ar";
  const [seeMore, setSeeMore] = useState(false);
  const toggleMore = () => {
    setSeeMore(!seeMore);
  }

  return (
    <section id="about" className="bg-[#FFF4F9]">
      <div className="flex flex-col md:flex-row justify-center w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto">
        <div className="flex flex-col justify-center items-center md:items-start w-full md:w-1/2 mb-0 mt-10 md:my-10">
          <h2 className="font-semibold text-2xl md:text-4xl text-[#101828] mb-4 text-center md:text-left">
            {heading}
          </h2>
          <p
            className={`!leading-loose mb-3 md:mb-6 text-sm font-medium md:text-xl text-center ${isArabic ? "md:text-right" : "md:text-left"}`}
          >
            <strong>{bodyStrong}</strong>&nbsp;
            {bodyNormal}
          </p>
          {seeMore && (
            <p
              className={`!leading-loose mb-10 md:mb-16 text-sm font-medium md:text-xl text-center ${isArabic ? "md:text-right" : "md:text-left"}`}
            >
              {bodyNormal1}
            </p>
          )}
          {seeMore ? <Button onClick={toggleMore}>{bodyLess}</Button> : <Button onClick={toggleMore}>{bodyMore}</Button>}
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src={aboutImg}
            width={626}
            height={686}
            alt="About languageai"
            className="flex"
          />
        </div>
      </div>
    </section>
  );
};
