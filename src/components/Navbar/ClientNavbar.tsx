"use client";
import Image from "next/image";
import { useState } from "react";
import icon from "../../assets/icon.webp";
import { Link, Locale } from "@/i18n.config";
import { useLocale } from "next-intl";
import LocaleSwitcher from "../LocaleSwitcher";

const linkHrefs = ["/#features", "/#how-it-works", "/#about", "/demo"];
const HamburgarMenu: React.FC<{ isToggled: boolean }> = ({ isToggled }) => {
  return (
    <div>
      <div
        className={`flex w-6 h-0.5 mb-1.5 bg-primary transition-all duration-200 ${
          !isToggled ? "" : "cross line1"
        }`}
      ></div>
      <div
        className={`flex w-6 h-0.5 mb-1.5 bg-primary transition-all duration-200 ${
          !isToggled ? "" : "cross line2"
        }`}
      ></div>
      <div
        className={`flex w-6 h-0.5 bg-primary transition-all duration-200 ${
          !isToggled ? "" : "cross line3"
        }`}
      ></div>
    </div>
  );
};
const SingleLink: React.FC<{
  link: string;
  href: string;
}> = ({ link, href }) => {
  return (
    <>
      <li className="mb-3 last:mb-0 md:mb-0">
        <Link
          href={href}
          className="font-semibold text-[rgba(31,6,16,0.70)] whitespace-nowrap"
        >
          {link}
        </Link>
      </li>
    </>
  );
};

export const ClientNavbar: React.FC<{
  link1: string;
  link2: string;
  link3: string;
  link4: string;
}> = ({ link1, link2, link3, link4 }) => {
  const locale = useLocale() as Locale;
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleOpenNav = () => {
    setIsToggled(!isToggled);
  };

  return (
    <nav
      id="navbar"
      className="flex justify-center items-center h-fit w-full z-50 shadow-md md:shadow-none"
    >
      <div className="md:bg-primary/10 backdrop-blur-[6px] flex justify-between items-center w-full sm:w-[calc(100%_-_32px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto py-3 md:mt-6 mb-0 md:mb-2 h-fit md:h-20 rounded-none md:rounded-full px-4 md:px-7 z-50">
        <div className="mr-4 md:bg-transparent">
          <Link
            href="/"
            aria-label="Language.ai"
            className="flex text-lg font-bold text-secondary items-center logo"
          >
            <Image
              src={icon}
              width={25}
              height={25}
              sizes="100vw"
              alt="LanguageAI Icon"
              className="w-6 h-6"
            />
            <span className="ml-2">Language.ai</span>
          </Link>
        </div>
        <button
          aria-label="Open Navbar"
          aria-haspopup="true"
          onClick={handleOpenNav}
          className="sticky md:hidden top-0 z-50 transition duration-200 bg-[#EE07680F] border py-2.5 px-2.5 rounded border-none"
        >
          <HamburgarMenu isToggled={isToggled} />
        </button>
        <div
          className={`flex absolute md:relative bg-white md:bg-transparent shadow-lg md:shadow-none border md:border-none rounded-xl md:rounded-full md:top-auto h-fit md:h-[50px] p-8 md:p-0 w-fit md:w-full max-w-[456px] transition-all duration-200 right-3 z-40 top-16 ${isToggled ? "translate-y-0" : "-translate-y-[150%]"} md:translate-y-0`}
        >
          <ul className="flex items-center md:justify-end flex-col md:flex-row mt-0 w-full gap-2 md:gap-5">
            <LocaleSwitcher locale={locale} />
            <SingleLink link={link1} href={linkHrefs[0]} />
            <span className="md:hidden lg:flex">
              <SingleLink link={link2} href={linkHrefs[1]} />
            </span>
            <SingleLink link={link3} href={linkHrefs[2]} />
            <SingleLink link={link4} href={linkHrefs[3]} />
          </ul>
        </div>
      </div>
    </nav>
  );
};
