"use client";
import Image from "next/image";
import Link from "next/link";
import icon from "../../assets/icon-white.webp";
import arrow from "../../assets/arrow-white.png";
import { Button } from "..";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n.config";
import { ArrowDark, ThreeFeathers } from "@/src/assets/svg";
import { useModal, useNotification } from "@/src/contexts";
import { TCs } from "../Translation/TCs";
import { PrivacyPolicy } from "../Translation/PrivacyPolicy";
import { CookiesPolicy } from "../Translation/CookiesPolicy";

export const ClientFooter: React.FC<{
  headingText: string;
  bodyText: string;
  buttonText: string;
  linksHeading: string;
  legalHeading: string;
  linksLink1: string;
  linksLink2: string;
  linksLink3: string;
  legalLink1: string;
  legalLink2: string;
  legalLink3: string;
  designedBy: string;
  developedBy: string;
  note: string;
}> = ({
  headingText,
  bodyText,
  buttonText,
  linksHeading,
  legalHeading,
  linksLink1,
  linksLink2,
  linksLink3,
  legalLink1,
  legalLink2,
  legalLink3,
  designedBy,
  developedBy,
  note
}) => {
  const locale = useLocale() as Locale;
  const isArabic = locale === "ar";
  const {notify} = useNotification();
  const { openModal } = useModal();

  return (
    <>
      <section className="w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] mx-auto justify-center">
        <div className="flex flex-col md:hidden my-20">
          <ThreeFeathers className="flex mx-auto -mb-5" />
          <div className="flex items-center justify-center gap-2 mb-6">
            <h2 className="text-2xl text-[#050B2CCC] font-semibold">
              {headingText}
            </h2>
            <ArrowDark
              className={`w-8 h-6 ${isArabic ? "rotate-180" : "rotate-0"}`}
            />
            <Image
              src={arrow}
              width={32}
              height={25}
              alt="Right arrow"
              className={`hidden w-8 h-6 ${isArabic ? "rotate-180" : "rotate-0"}`}
            />
          </div>
          <div>
            <Button variant="primary" onClick={()=>notify("Sorry, this is a coming soon feature...", "inform")} className="font-bold" fullWidth={true}>
              {buttonText}
            </Button>
          </div>
        </div>
      </section>
      <footer id="footer" className="flex flex-col justify-center h-full bg-[#050B2C] py-16">
        <div className="bg-primary w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto rounded-3xl px-4 py-6 sm:px-6 md:px-8 md:py-11">
          <div className="hidden md:flex justify-between mb-11">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl text-white font-semibold">
                {headingText}
              </h2>
              <Image
                src={arrow}
                width={32}
                height={25}
                alt="Right arrow"
                className={`w-8 h-6 ${isArabic ? "rotate-180" : "rotate-0"}`}
              />
            </div>
            <div>
              <Button variant="white" onClick={()=>notify("ChatBot is also coming soon...", "inform")} className="font-bold">
                {buttonText}
              </Button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-6 gap-2">
            <div className="flex flex-col justify-between">
              <div>
                <Link
                  href="#"
                  aria-label="Language.ai"
                  className="flex flex-row mb-6 items-center gap-2 text-lg font-bold text-white logo"
                >
                  <Image
                    src={icon}
                    width={97}
                    height={96}
                    alt="Language.ai"
                    className="w-6 h-6"
                  />
                  <span>Language.ai</span>
                </Link>
                <h2 className="text-white font-medium max-w-[60ch]">
                  {bodyText}
                </h2>
              </div>
              <p className="text-white mt-4 hidden md:block">{designedBy} <Link className="border-b" href={'https://linkedin.com/in/taofeeqahbello'} target="_blank">Pheeqoh</Link> & {developedBy} <Link className="border-b" href={'https://linkedin.com/in/rahmlad'} target="_blank">Rahmlad</Link> &copy; 2024 </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-white">
              <div>
                <h2 className="font-bold text-xl mb-5">{linksHeading}</h2>
                <ul className="space-y-4">
                  <li>
                    <Link href={`/${locale}/#how-it-works`}>{linksLink1}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/#features`}>{linksLink2}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/#about`}>{linksLink3}</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="font-bold text-xl mb-5">{legalHeading}</h2>
                <ul className="space-y-4">
                  <li>
                    <button className="text-left legal cursor-pointer" onClick={()=>openModal(<CookiesPolicy />)}>{legalLink1}</button>
                  </li>
                  <li>
                    <button className="text-left legal cursor-pointer" onClick={()=>openModal(<PrivacyPolicy />)}>{legalLink2}</button>
                  </li>
                  <li>
                    <button className="text-left legal cursor-pointer" onClick={()=>openModal(<TCs />)}>{legalLink3}</button>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-white mt-4 md:hidden">{designedBy} <Link className="border-b" href={'https://linkedin.com/in/taofeeqahbello'} target="_blank">Pheeqoh</Link> & {developedBy} <Link className="border-b" href={'https://linkedin.com/in/rahmlad'} target="_blank">Rahmlad</Link> &copy; 2024 </p>
          </div>
        </div>
        <p className="mt-1 text-center text-xs text-gray-400 px-4">{note}</p>
      </footer>
    </>
  );
};
