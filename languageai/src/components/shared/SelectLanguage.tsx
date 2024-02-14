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
  const [searchTerm, setSearchTerm] = useState("");

  const selectedLanguageOption = languagesData.find(
    (option) => option.language === language
  );

  const filteredLanguages = languagesData.filter((option) =>
    option.language.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="absolute w-full z-10 shadow border rounded-lg">
          <input
            type="text"
            placeholder="Search language..."
            className="w-full px-3 py-2 border-b focus:outline-none rounded-t-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 w-full h-fit max-h-72 md:max-h-40 overflow-y-auto bg-white outline-primary outline-offset-4 rounded-b-lg">
            {filteredLanguages.map((option) => (
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
        </div>
      )}
    </div>
  );
};
