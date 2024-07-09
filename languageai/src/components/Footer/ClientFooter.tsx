"use client";
import Image from "next/image";
import Link from "next/link";
import icon from "../../assets/icon-white.png";
import arrow from "../../assets/arrow-white.png";
import { Button } from "..";
import { mainTranslator } from "@/app/[locale]/utils/azureService";
import { useCallback, useState } from "react";
import { testTranslator } from "@/app/[locale]/api";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n.config";
import { ArrowDark, ThreeFeathers } from "@/src/assets/svg";

export const ClientFooter: React.FC <{
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
}> = ({ headingText, bodyText, buttonText, linksHeading, legalHeading, linksLink1, linksLink2, linksLink3, legalLink1, legalLink2, legalLink3 }) => {
  const [file, setFile] = useState<File | null>(null);
  const locale = useLocale() as Locale;
  const isArabic = locale === 'ar';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  const handleTranslate = useCallback(async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }
    console.log(`
        file: ${file},
        fileName: ${file.name}
        body: ${file.text},
        contentType: "application/pdf",
        type: ${file.type}
        arrayBuffer: ${file.arrayBuffer}
        `);

    const formData = new FormData();
    formData.append("document", file);
    console.log("Translate button clicked");
    try {
      const response = await fetch("/api/test", {
        method: "POST",
        body: formData,
      });

      console.log("translated text in test translator", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response?.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "translated.html");
      document.body.appendChild(link);
      link.click();
      link?.parentNode?.removeChild(link);
      console.log("translated text in test translator", response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.log("error from testTranslation catch body:", errorMessage);
    }
  }, [file]);
  return (
    <>
      <section className="w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] mx-auto justify-center">
        <div className="flex flex-col md:hidden my-20">
        <ThreeFeathers className="flex mx-auto -mb-5" />
          <div className="flex items-center justify-center gap-2 mb-6">
            <h2 className="text-2xl text-[#050B2CCC] font-semibold">
              {headingText}
            </h2>
            <ArrowDark className={`w-8 h-6 ${isArabic? "rotate-180": "rotate-0"}`} />
            <Image
              src={arrow}
              width={32}
              height={25}
              alt="Right arrow"
              className={`hidden w-8 h-6 ${isArabic? "rotate-180": "rotate-0"}`}
            />
          </div>
          <div>
            <Button
              onClick={handleTranslate}
              variant="primary"
              className="font-bold"
              fullWidth={true}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </section>
      <footer id="footer" className="flex h-full bg-[#050B2C] py-16">
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
                className={`w-8 h-6 ${isArabic? "rotate-180": "rotate-0"}`}
              />
            </div>
            <div>
              <Button
                onClick={handleTranslate}
                variant="white"
                className="font-bold"
              >
                {buttonText}
              </Button>
            </div>
          </div>
          <input
            type="file"
            name="document"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col md:flex-row justify-between space-y-6 gap-2">
            <div>
              <Link
                href="#"
                aria-label="Language.ai"
                className="flex flex-row mb-6 items-center gap-2 text-lg font-bold text-white"
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
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-white">
              <div>
                <h2 className="font-bold text-xl mb-5">{linksHeading}</h2>
                <ul className="space-y-4">
                  <li>
                    <a href="#">{linksLink1}</a>
                  </li>
                  <li>
                    <a href="#">{linksLink2}</a>
                  </li>
                  <li>
                    <a href="#">{linksLink3}</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="font-bold text-xl mb-5">{legalHeading}</h2>
                <ul className="space-y-4">
                  <li>
                    <a href="#">{legalLink1}</a>
                  </li>
                  <li>
                    <a href="#">{legalLink2}</a>
                  </li>
                  <li>
                    <a href="#">{legalLink3}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
