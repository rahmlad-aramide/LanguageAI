"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "..";
import { languagesData } from "@/app/data";

interface SelectLanguageProps {
  language: string;
  setLanguage: (language: string) => void;
  // disabled: boolean;
  secondLanguage: string;
}

// <Image src={`https://flagcdn.com/16x12/${option.code}.png`} alt="" className="w-4 h-3 mr-2" />
export const SelectLanguage: React.FC<SelectLanguageProps> = ({
  language,
  setLanguage,
  secondLanguage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLanguageOption = languagesData.find(
    (option) => option.language === language
  );

  return (
    <div className="relative w-full">
      <Button
        variant="outlined"
        className="w-full border rounded px-3 py-2 bg-transparent shadow outline-none flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLanguageOption ? (
          <>
            <Image
              src={`https://flagcdn.com/16x12/${selectedLanguageOption.flag}.png`}
              alt=""
              width={16}
              height={12}
              className="w-4 h-3 mr-3"
              // unoptimized={true} // Use unoptimized for external URLs not configured in next.config.js
            />
            <span className="font-medium">
              {selectedLanguageOption.language}
            </span>
          </>
        ) : (
          <span>Select a language</span>
        )}
        <span
          className={`${
            isOpen ? "rotate-180" : ""
          } transition duration-200 ml-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-down"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </Button>
      {isOpen && (
        <ul className="absolute grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 w-full h-80 md:h-40 overflow-y-auto border rounded mt-1 bg-white shadow outline-primary outline-offset-4 z-10">
          {languagesData.map((option) => (
            <li
              key={option.key}
              className={`${
                option.language === secondLanguage
                  ? "hover:bg-transparent opacity-60 cursor-not-allowed"
                  : "hover:bg-gray-100 opacity-100 cursor-pointer"
              } px-3 py-2 flex items-center`}
              onClick={() => {
                option.language !== secondLanguage &&
                  setLanguage(option.language);
                setIsOpen(false);
              }}
            >
              <Image
                src={`https://flagcdn.com/16x12/${option.flag}.png`}
                alt=""
                className="w-4 h-3 mr-2"
                width={16}
                height={12}
                unoptimized={true}
              />
              <span>{option.language}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
