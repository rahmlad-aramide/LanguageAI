"use client";
import { useEffect, useRef, useState } from "react";
import { SelectLanguage } from "./shared/SelectLanguage";
import { Arrows } from "../assets/svg";
import { Button } from ".";
import { inter } from "@/app/fonts";
import { selectedLanguageOption } from "./shared/helper";
import translate from "@/app/api";
import { useNotification } from "../contexts";

export const Translation: React.FC = () => {
  const { notify } = useNotification();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [translateButton, setTranslateButton] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false);
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("French");
  const [invert, setInvert] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const sourceLang = `${selectedLanguageOption(sourceLanguage)?.key}`;
  const targetLang = `${selectedLanguageOption(targetLanguage)?.key}`;

  useEffect(() => {
    if (output) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [output]);

  return (
    <section id="translate">
      <div className="bg-[#EE076814] w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto rounded-xl md:rounded-[2.5rem] mt-7 md:mt-14 pt-11 pb-4 px-8 md:px-11">
        <h2 className="font-semibold text-lg md:text-4xl text-center text-[#101828] mx-4">
          Translate your words or documents
        </h2>
        <p className="text-sm md:text-xl text-center text-[#475467] px-4 pt-3">
          Choose the language you want to transitioned into below:
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-3.5 w-full max-w-lg lg:max-w-4xl mx-auto mb-4 mt-2 md:mt-10">
          <SelectLanguage
            language={sourceLanguage}
            setLanguage={setSourceLanguage}
            secondLanguage={targetLanguage}
            onChange={()=>{setTranslateButton(true); setText(""); setOutput("")}}
          />
          <Button
            variant="text"
            className={`${
              invert ? "rotate-180" : "rotate-360"
            } transition duration-200 outline-transparent focus:outline-primary px-0`}
            onClick={() => {
              setSourceLanguage(targetLanguage);
              setTargetLanguage(sourceLanguage);
              if (output && text) {
                setText(output);
                setOutput(text);
              }
              setInvert(!invert);
            }}
          >
            <Arrows />
          </Button>
          <SelectLanguage
            language={targetLanguage}
            setLanguage={setTargetLanguage}
            secondLanguage={sourceLanguage}
            onChange={()=>{setOutput(""); setTranslateButton(true)}}
          />
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setOutput("");
            if (!text.trim()) {
              setLoading(false);
              notify("Please, enter the texts to translate", "error");
              return;
            }

            try {
              // Attempt to translate the text
              const translatedText = await translate({
                text,
                sourceLang,
                targetLang,
              });

              // If successful, update the output state and clear any existing error
              setOutput(translatedText);
              setError(null);
              notify("Text translated successfully!", "success");
              setTranslateButton(false);
            } catch (error) {
              if (error instanceof Error) {
                setError(error.message);
                notify(error.message, "error");
              } else {
                setError("An unexpected error occurred");
                notify("An unexpected error occurred", "error");
                console.log(error);
              }
              setOutput("");
            } finally {
              if (error) {
                notify(error, "error");
              }
              if (output) {
                notify("Text translated successfully!", "success");
              }
              setLoading(false);
            }
          }}
        >
          <div className="flex flex-col md:flex-row gap-8 justify-center w-full max-w-lg lg:max-w-4xl mx-auto mb-8 mt-8 md:mt-0">
            <textarea
              className="w-full h-64 rounded-lg shadow border-[0.4px] border-primary outline-none focus:border-2 resize-none p-5"
              ref={inputRef}
              value={text}
              onChange={(e) => {setText(e.target.value); output && setTranslateButton(true)}}
              placeholder="Select the language pair and input or paste the text for translation"
            />
            {isVisible && (
              <textarea
                className="w-full h-64 rounded-lg shadow border-[0.4px] border-primary outline-none focus:border-2 resize-none p-5"
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                placeholder="Your output will be displayed here"
              />
            )}
          </div>
          <div className="w-full max-w-sm mx-auto">
            {translateButton &&
              <Button
                fullWidth={true}
                className="font-bold"
                type="submit"
                disabled={loading}
              >
                {loading ? "Translating..." : "Translate"}
              </Button>
            }
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
        </form>
      </div>
    </section>
  );
};
