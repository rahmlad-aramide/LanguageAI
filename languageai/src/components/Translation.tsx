"use client";
import "regenerator-runtime/runtime";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { inter } from "@/app/fonts";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { SelectLanguage } from "./shared/SelectLanguage";
import {
  Arrows,
  Copy,
  Mic,
  MicPause,
  MicPlay,
  MicStop,
  Speaker,
} from "../assets/svg";
import { Button } from ".";
import { selectedLanguageOption } from "./shared/helper";
import translate from "@/app/api";
import { useNotification } from "../contexts";
import { TextArea } from "./shared/TextArea";

export const Translation: React.FC = () => {
  const { notify } = useNotification();
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
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
  const [micOn, setMicOn] = useState<boolean>(listening);
  const [micMode, setMicMode] = useState<"play" | "pause" | "stop">("play");

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

  const handleMic = useCallback(() => {
    setMicOn(true);
    notify("Start speaking to your mic...", "inform");
    if (!browserSupportsSpeechRecognition) {
      setMicOn(false);
      notify("Your browser does not support speech recognition", "warn");
    }
    SpeechRecognition.startListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserSupportsSpeechRecognition]);

  const handlePause = useCallback(() => {
    setMicMode("play");
    SpeechRecognition.stopListening();
    notify("Recording paused...", "inform");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = useCallback(() => {
    setMicOn(true);
    setMicMode("pause");
    notify("Continue speaking to your mic...", "inform");
    SpeechRecognition.startListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStop = useCallback(() => {
    setMicOn(false);
    setMicMode("stop");
    SpeechRecognition.stopListening();
    notify("Recording stopped, you can translate now!", "success");
    setTranslateButton(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSpeak = useCallback(
    (text: string) => {
      if ("speechSynthesis" in window && text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
        notify("You are now listening to your texts...", "inform");
      } else {
        notify("Sorry, Text-to-Speech is not supported.", "warn");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text]
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
        const translatedText = await translate({
          text,
          sourceLang,
          targetLang,
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
      translate,
      notify,
      setLoading,
      setOutput,
      setTranslateButton,
    ]
  );

  useEffect(() => {
    micMode === "play" && setText(transcript);
    micMode === "pause" &&
      setText((prev) => prev.trim() + " " + transcript.trim());
  }, [transcript, micMode]);

  const handleCopy = useCallback(async () => {
    if (navigator.clipboard && text) {
      await navigator.clipboard.writeText(text);
      notify("Text copied to clipboard!", "success");
    } else {
      notify("Sorry, Clipboard functionality is not supported.", "warn");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

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
          <div className="flex flex-col md:flex-row gap-8 justify-center w-full max-w-lg lg:max-w-4xl mx-auto mb-8 mt-8 md:mt-0">
            <div className="w-full h-64 flex flex-col items-end rounded-lg bg-white shadow border-[0.4px] border-primary outline-none focus-within:border-2 resize-none">
              <TextArea
                ref={inputRef}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  output && setTranslateButton(true);
                }}
              />
              <div className="flex justify-between w-full items-center">
                {micOn && (
                  <div className="flex gap-2 mx-2 md:mx-4 m-4 mt-1">
                    <Button
                      onClick={handlePause}
                      disabled={!listening}
                      className="rounded-2xl !px-1.5 md:!px-3 !py-1 max-h-6 !bg-[#FEEBF3] border-[#FEEBF3] focus:border-primary disabled:border-[#FEEBF3]"
                    >
                      <MicPause className="h-4" />
                    </Button>
                    <Button
                      disabled={listening || micMode === "pause"}
                      onClick={handleContinue}
                      className="rounded-2xl !px-1.5 md:!px-3 !py-1 max-h-6 !bg-[#FEEBF3] border-[#FEEBF3] focus:border-primary disabled:border-[#FEEBF3]"
                    >
                      <MicPlay className="h-4" />
                    </Button>
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
                    disabled={listening}
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
                  ref={outputRef}
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  placeholder="Your output will be displayed here"
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
              >
                {loading ? "Translating..." : "Translate"}
              </Button>
            )}
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
