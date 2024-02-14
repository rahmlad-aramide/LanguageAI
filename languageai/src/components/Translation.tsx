"use client";
import { useState } from "react";
import { SelectLanguage } from "./shared/SelectLanguage";
import { Arrows } from "../assets/svg";
import { Button } from ".";
import { inter } from "@/app/page";

export const Translation: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("French");
  const [invert, setInvert] = useState(false);

  return (
    <section id="translate">
      <div className="bg-[#EE076814] w-[calc(100%_-_16px)] sm:w-[calc(100%_-_28px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto rounded-[2.5rem] mt-7 md:mt-14 pt-11 pb-4 px-8 md:px-11">
        <h2 className="font-semibold text-lg md:text-4xl text-center text-[#101828] mx-4">
          Translate your words or documents
        </h2>
        <p className="text-sm md:text-xl text-center text-[#475467] px-4 pt-3">
          Choose the language you want to transitioned into below:
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-3.5 w-full max-w-3xl lg:max-w-4xl mx-auto mb-4 mt-2 md:mt-10">
          <SelectLanguage
            language={sourceLanguage}
            setLanguage={setSourceLanguage}
            secondLanguage={targetLanguage}
          />
          <Button
            variant="text"
            className={`${
              invert ? "rotate-180" : "rotate-360"
            } transition duration-200 outline-transparent focus:outline-primary px-0`}
            onClick={() => {
              setSourceLanguage(targetLanguage);
              setTargetLanguage(sourceLanguage);
              setInvert(!invert);
            }}
          >
            <Arrows />
          </Button>
          <SelectLanguage
            language={targetLanguage}
            setLanguage={setTargetLanguage}
            secondLanguage={sourceLanguage}
          />
        </div>
        <div className="flex justify-center w-full max-w-3xl lg:max-w-4xl mx-auto mb-8">
          <textarea
            className="w-full h-64 rounded-lg shadow border-[0.4px] border-primary outline-none focus:border-2 resize-none p-5"
            // rows={5}
            placeholder="Select the language pair and input or paste the text for translation"
          />
        </div>
        <div className="w-full max-w-sm mx-auto">
          <Button fullWidth={true} className="font-bold">
            Translate
          </Button>
          <Button
            fullWidth={true}
            variant="text"
            className={`${inter.className} text-primary font-bold italic underline underline-offset-4 mt-6 mb-2 pt-0 pb-0`}
          >
            <em>Or upload A PDF document</em>
          </Button>
          <p
            className={`${inter.className} font-light text-[#475467] text-center`}
          >
            <em>Document size: Max 10MB</em>
          </p>
        </div>
      </div>
    </section>
  );
};
