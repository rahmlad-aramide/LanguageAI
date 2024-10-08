"use client";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { inter } from "@/app/[locale]/fonts";
import { SelectLanguage } from "../shared/SelectLanguage";
import {
  Arrows,
  Copy,
  Mic,
  MicPause,
  MicPlay,
  MicStop,
  Speaker,
} from "../../assets/svg";
import { Button } from "..";
import { selectedLanguageOption } from "../shared/helper";
import { translateText } from "@/app/[locale]/api";
import { useModal, useNotification } from "../../contexts";
import { TextArea } from "../shared/TextArea";
import { UploadFile } from "../UploadFile";
import { useVoiceToText } from "react-speakup";

export const ClientTranslation: React.FC<{
  headingText: string;
  bodyText: string;
  buttonText: string;
  buttonLink: string;
  instructionText: string;
  placeholder: string;
  placeholder2: string;
  instructionText1: string;
  instructionText2: string;
  instructionText3: string;
  or: string;
}> = ({
  headingText,
  bodyText,
  buttonText,
  buttonLink,
  instructionText,
  placeholder,
  placeholder2,
  instructionText1,
  instructionText2,
  instructionText3,
  or,
}) => {
  const { notify } = useNotification();
  const { openModal } = useModal();
  const { startListening, stopListening, transcript, reset } = useVoiceToText({continuous: false});
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [translateButton, setTranslateButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("French");
  const [invert, setInvert] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [micOn, setMicOn] = useState<boolean>(false);
  const [micMode, setMicMode] = useState<"play" | "pause" | "stop">("play");

  const sourceLang = `${selectedLanguageOption(sourceLanguage)?.key}`;
  const targetLang = `${selectedLanguageOption(targetLanguage)?.key}`;

  useEffect(() => {
    if (output) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [output]);

  const handleMic = useCallback(() => {
    if(sourceLang === 'en' || targetLang === 'en'){
      setMicOn(true);
      startListening();
      notify("Start speaking now...", "inform");
    } else {  
      notify("Sorry, this works better for English...", "inform");
    }
  }, [sourceLang, targetLang, notify, startListening]);

  const handleStop = useCallback(() => {
    setMicOn(false);
    setMicMode("stop");
    stopListening();
    notify("Recording stopped, you can translate now!", "success");
    setTranslateButton(true);
  }, [notify, stopListening]);

  const handleSpeak = useCallback(
    (text: string) => {
      if(sourceLang === 'en' || targetLang === 'en'){
        if ("speechSynthesis" in window && text) {
          const utterance = new SpeechSynthesisUtterance(text);
          window.speechSynthesis.speak(utterance);
          notify("You are now listening to your texts...", "inform");
        } else {
          notify("Sorry, Text-to-Speech is not supported.", "warn");
        }
      } else {
          notify("Sorry, this works better for English...", "inform");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, sourceLang, targetLang],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setOutput("");

      if (!text.trim()) {
        setLoading(false);
        notify("Please, enter the texts to translate", "error");
        return;
      }

      try {
        const translatedText = await translateText({
          text,
          from: sourceLang,
          to: targetLang,
        });
        setOutput(translatedText);
        notify("Text translated successfully!", "success");
        setTranslateButton(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        notify(errorMessage, "error");
        setOutput("");
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      text,
      sourceLang,
      targetLang,
      translateText,
      notify,
      setLoading,
      setOutput,
      setTranslateButton,
    ],
  );

  useEffect(() => {
    if (micMode === "play") {
      setText(transcript.trim());
    }
  
    if (micMode === "stop") {
      setText(transcript.trim());
    }
  }, [transcript, micMode]);
  

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard && output) {
        await navigator.clipboard.writeText(output);
        notify("Text copied to clipboard!", "success");
      } else {
        notify("Sorry, Clipboard functionality is not supported.", "warn");
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
      notify("Failed to copy text. Please try again.", "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <section>
      <div id="translate" className="h-7 md:h-20"></div>
      <div className="bg-[#EE076814] w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto rounded-xl md:rounded-[2.5rem] pt-11 pb-4 px-4 sm:px-8 md:px-11">
        <h3 className="font-semibold text-lg md:text-4xl text-center text-[#101828] mx-4">
          {headingText}
        </h3>
        <p className="text-sm md:text-xl text-center text-[#475467] px-4 pt-3">
          {bodyText}
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-3.5 w-full max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto mb-4 mt-2 md:mt-10">
          <SelectLanguage
            type="text"
            language={sourceLanguage}
            setLanguage={setSourceLanguage}
            secondLanguage={targetLanguage}
            onChange={() => {
              setTranslateButton(true);
              setText("");
              setOutput("");
            }}
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
            type="text"
            language={targetLanguage}
            setLanguage={setTargetLanguage}
            secondLanguage={sourceLanguage}
            onChange={() => {
              setOutput("");
              setTranslateButton(true);
            }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8 justify-center w-full max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto mb-8 mt-8 md:mt-0">
            <div className="w-full h-64 flex flex-col items-end rounded-lg bg-white shadow border-[0.4px] border-primary outline-none focus-within:border-2 resize-none">
              <TextArea
                refProp={inputRef}
                value={text}
                placeholder={placeholder}
                onChange={(e) => {
                  setText(e.target.value);
                  output && setTranslateButton(true);
                }}
              />
              <div className="flex justify-end w-full items-center">
                {micOn && (
                  <div className="flex gap-2 mx-2 md:mx-4 m-4 mt-1">
                    <Button
                      onClick={handleStop}
                      className="rounded-2xl !px-1.5 md:!px-3 !py-1 max-h-6 !bg-[#FEEBF3] border-[#FEEBF3] focus:border-primary disabled:border-[#FEEBF3]"
                    >
                      <MicStop className="h-4" />
                    </Button>
                  </div>
                )}
                <div className="flex gap-2 mx-2 md:mx-4 m-4 mt-1 ml-auto">
                  <Button
                    onClick={() => handleSpeak(text)}
                    disabled={!text}
                    className="rounded-2xl !px-1.5 md:!px-3 !py-1 max-h-6 !bg-[#FEEBF3] border-[#FEEBF3] focus:border-primary disabled:border-[#FEEBF3]"
                  >
                    <Speaker className="h-4" />
                  </Button>
                  <Button
                    onClick={handleMic}
                    className="rounded-2xl !px-1.5 md:!px-3 !py-1 max-h-6 !bg-[#FEEBF3] border-[#FEEBF3] focus:border-primary disabled:border-[#FEEBF3]"
                  >
                    <Mic />
                  </Button>
                </div>
              </div>
            </div>
            {isVisible && (
              <div className="w-full h-64 flex flex-col items-end rounded-lg bg-white shadow border-[0.4px] border-primary outline-none focus-within:border-2 resize-none">
                <TextArea
                  refProp={outputRef}
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  placeholder={placeholder2}
                />
                <div className="flex gap-2 m-4 mt-1">
                  <Button
                    onClick={() => handleSpeak(output)}
                    disabled={!output || micOn}
                    className="rounded-2xl !px-1.5 md:!px-3 !py-1 max-h-6 !bg-[#FEEBF3] border-[#FEEBF3] focus:border-primary disabled:border-[#FEEBF3]"
                  >
                    <Speaker className="h-4" />
                  </Button>
                  <Button
                    onClick={handleCopy}
                    className="rounded-2xl !px-1.5 md:!px-3 !py-1 max-h-6 !bg-[#FEEBF3] border-[#FEEBF3] focus:border-primary disabled:border-[#FEEBF3]"
                  >
                    <Copy />
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="w-full max-w-sm mx-auto">
            {translateButton && (
              <Button
                fullWidth={true}
                className="font-bold"
                type="submit"
                disabled={loading || micOn}
                loading={loading}
              >
                {buttonText}
              </Button>
            )}
            <Button
              onClick={() =>
                openModal(
                  <UploadFile
                    instructionText1={instructionText1}
                    instructionText2={instructionText2}
                    instructionText3={instructionText3}
                    or={or}
                  />,
                )
              }
              fullWidth={true}
              variant="text"
              className={`${inter.className} text-primary font-bold italic underline underline-offset-4 mt-6 mb-2 pt-0 pb-0`}
            >
              {buttonLink}
            </Button>
            <p
              className={`${inter.className} font-light text-[#475467] text-center`}
            >
              <em>{instructionText}</em>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
