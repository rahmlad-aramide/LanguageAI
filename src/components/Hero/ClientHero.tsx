"use client";
import Image from "next/image";
import hero from "@/src/assets/hero.webp";
import heroMobile from "@/src/assets/hero-mobile.webp";
import avatars from "@/src/assets/avatars.webp";
import stars from "@/src/assets/stars.png";
import { Button } from "@/src/components/shared/Button";
import { useModal } from "@/src/contexts";
import { UploadFile } from "@/src/components";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n.config";
import Link from "next/link";
import { useEffect } from "react";

export const ClientHero: React.FC<{
  headingText: string;
  bodyText: string;
  buttonText: string;
  buttonLink: string;
  reviews: string;
  instructionText1: string;
  instructionText2: string;
  instructionText3: string;
  or: string;
}> = ({
  headingText,
  bodyText,
  buttonText,
  buttonLink,
  reviews,
  instructionText1,
  instructionText2,
  instructionText3,
  or,
}) => {
  const { openModal } = useModal();
  const locale = useLocale() as Locale;
  const isArabic = locale === "ar";

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);
  

  return (
    <section
      id="home"
      className="pt-8 md:pt-16 flex flex-col md:flex-row  w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto gap-5"
    >
      <div className="w-full md:w-1/2 flex flex-col items-start gap-10 mt-3 md:-mt-3">
        <div className="flex flex-col w-full">
          <h1
            className={`clamped-h1 font-semibold leading-[2.8125rem] md:leading-[3.5rem] lg:leading-[4.5rem] mb-6 text-[#1F0610] text-center max-w-[20ch] mx-auto ${isArabic ? "md:text-right" : "md:text-left"}`}
          >
            {headingText}
          </h1>
          <p
            className={`text-sm md:text-xl text-[#1F0610]/80 ${isArabic ? "md:mr-0 md:ml-auto text-center md:text-right max-w-full mr-auto ml-auto" : "md:ml-0 md:mr-auto text-center md:text-left mr-auto ml-auto max-w-[38ch] md:max-w-full"}`}
          >
            {bodyText}
          </p>
        </div>
        <div
          className={`flex flex-col md:flex-row gap-3 w-[calc(100%_-_16px)] sm:w-[calc(100%_-_28px)] md:w-fit mx-auto ${isArabic ? "md:mr-0" : "md:ml-0"}`}
        >
          <Link href={`/${locale}/#translate`} className="font-bold text-center border outline-transparent focus:outline-black border-primary hover:border-primary/80 disabled:border-disabled bg-primary hover:bg-primary/80 disabled:bg-disabled disabled:cursor-not-allowed text-white py-2.5 px-[1.125rem] rounded-lg transition-all w-full md:w-auto mx-auto max-w-sm">
              {buttonText}
          </Link>
          <Button
            onClick={() => {
              openModal(
                <UploadFile
                  instructionText1={instructionText1}
                  instructionText2={instructionText2}
                  instructionText3={instructionText3}
                  or={or}
                />,
              );
            }}
            variant="text"
            className="underline underline-offset-4 font-semibold w-full md:w-fit text-center"
          >
            {buttonLink}
          </Button>
        </div>
        <div className="flex flex-col w-full">
          <hr className="w-full mx-auto md:mx-0 max-w-sm h-[0.5px] bg-[#1f0610] border-0 mb-4 opacity-50 md:opacity-100" />
          <div className="flex gap-1 sm:gap-2 items-center justify-center md:justify-start">
            <Image width={152} height={40} src={avatars} alt="Avatars" />
            <div className="flex flex-col font-medium text-xs md:text-base">
              <span className="flex gap-0 sm:gap-2 justify-start items-center font-semibold">
                <Image
                  width={116}
                  height={20}
                  src={stars}
                  alt="Star"
                  className="w-full h-fit scale-90 md:scale-100 -ml-1.5"
                />
                5.0
              </span>
              {reviews}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        <Image
          src={hero}
          width={1179}
          height={1168}
          alt="A 3 by 3 grid of shapes and images"
          className="hidden w-full h-auto md:flex"
        />
        <Image
          src={heroMobile}
          width={700}
          height={847}
          alt="A 3 by 3 grid of shapes and images"
          className="flex w-full h-auto md:hidden mt-8"
        />
      </div>
    </section>
  );
};
