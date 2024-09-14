"use client";
import { useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  Alert,
  Document,
  TrashCanIcon,
  UploadIcon,
  UploadIconActive,
} from "../../assets/svg";
import thumbGif from "@/src/assets/thumbs.gif";
import { Button } from "../shared/Button";
import { useModal, useNotification } from "../../contexts";
import { SelectLanguage } from "../shared/SelectLanguage";
import { Arrows } from "../../assets/svg";
import { selectedLanguageOption } from "../shared/helper";
import axios from "axios";
import generateUniqueId from "generate-unique-id";
import { generateAcceptObject } from "@/app/[locale]/utils/helper";

export function formatFileSize(fileSizeBytes: number) {
  // Define size units and their respective suffixes
  const sizeUnits = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  // Initialize variables
  let size = fileSizeBytes;
  let unitIndex = 0;

  // Convert to appropriate unit
  while (size >= 1024 && unitIndex < sizeUnits.length - 1) {
    size /= 1024.0;
    unitIndex += 1;
  }

  // Format the result with 2 decimal places
  const formattedSize = `${size.toFixed(2)} ${sizeUnits[unitIndex]}`;

  return formattedSize;
}

export function extractFileExtension(inputString: string) {
  // Use a regular expression to match the word after the .
  const match = inputString.match(/\.([^.]+)$/);

  // Check if there's a match
  if (match && match[1]) {
    // Extract the matched word and convert it to uppercase
    const extractedWordUppercase = match[1].toUpperCase();
    return extractedWordUppercase;
  } else {
    // Return null or handle the case where there is no match
    return null;
  }
}

export function addWhitespaceAfterComma(inputString: string) {
  const resultString = inputString.replace(/,/g, ", ");

  return resultString;
}

const DisplayErrorMessage = ({ errMessage = "" }) => {
  if (!errMessage) return;
  return (
    <div className={`flex mt-2 text-red-500 text-sm break-words`}>
      <div className="pt-0.5 mr-1">
        <Alert />
      </div>
      {errMessage === "Too many files"
        ? "Can't upload more than 10 files at once"
        : addWhitespaceAfterComma(errMessage)}
    </div>
  );
};
export default DisplayErrorMessage;

export const ClientUploadFile: React.FC<{
  instructionText1: string;
  instructionText2: string;
  instructionText3: string;
  or: string;
}> = ({ instructionText1, instructionText2, instructionText3, or }) => {
  const { notify } = useNotification();
  const { closeModal } = useModal();
  const [text, setText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [translatedDocument, setTranslatedDocument] = useState<Blob | null>(
    null,
  );
  const [translateButton, setTranslateButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("French");
  const [invert, setInvert] = useState<boolean>(false);
  const [entering, setEntering] = useState(false);
  const [clearError, setClearError] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File[] | null>(null);
  const sourceLang = `${selectedLanguageOption(sourceLanguage)?.key}`;
  const targetLang = `${selectedLanguageOption(targetLanguage)?.key}`;

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onFileDialogCancel: () => setUploadedFile(null),
      onFileDialogOpen: () => setUploadedFile(null),
      onDragEnter: () => setEntering(true),
      onDragLeave: () => setEntering(false),
      maxFiles: 1,
      multiple: false,
      accept: generateAcceptObject(),
      onDrop: (acceptedFiles, fileRejections) => {
        setEntering(false);
        setUploadedFile(acceptedFiles);
        fileRejections && setClearError(false);
      },
    });

  const acceptedFileItems = acceptedFiles.map((file, idx) => {
    return (
      <div key={idx} className="flex items-center gap-2">
        <div className="h-8">
          <Document fileExtension={extractFileExtension(file?.name) || "TXT"} />
        </div>
        <p className="text-xs font-semibold text-[#424348] text-left">
          {file.name}
        </p>
      </div>
    );
  });

  const fileRejectionItems = fileRejections.map(
    ({ errors }) => `${errors[0].message}`,
  );

  const handleTranslateDocument = async () => {
    setLoading(true);
    if (!uploadedFile) {
      setLoading(false);
      notify("Please, upload a file to translate", "error");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_DOCUMENT_TRANSLATOR_ENDPOINT;
    const path = "/translator/document:translate";
    const url = `${endpoint}${path}`;

    const headers = {
      "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_TRANSLATOR_KEY,
    };

    const params = {
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      "api-version": "2024-05-01",
    };

    const formData = new FormData();
    formData.append("document", uploadedFile[0], uploadedFile[0].name);
    try {
      const response = await axios.post(url, formData, {
        headers,
        params,
        responseType: "blob",
      });

      const result = await response.data;
      notify("Translated document successfully", "success");
      setTranslatedDocument(result);
    } catch (err: any) {
      console.log(err);
      notify(err.message, "error");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!translatedDocument) return;

    const url = window.URL.createObjectURL(translatedDocument);
    const a = document.createElement("a");
    a.href = url;
    const uid = generateUniqueId({
      length: 6,
    });
    const fileName = uploadedFile
      ? `LanguageAI_${uid}_${uploadedFile[0].name}`
      : `LanguageAI_${uid}.txt`;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    setTranslatedDocument(null);
    setUploadedFile(null);
    closeModal();
  };

  return (
    <div>
      <div
        className={`cursor-pointer max-w-lg mx-auto w-full min-h-[200px] h-fit rounded-lg border-dashed border-[0.861px] transition duration-200 border-primary/60 bg-primary/10`}
      >
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center p-4 md:p-10 rounded-lg ${
            entering ? "bg-primary/20 border-primary" : ""
          } ${uploadedFile ? "min-h-fit" : "min-h-[200px]"}`}
        >
          {!uploadedFile ||
          uploadedFile === null ||
          uploadedFile.length === 0 ||
          entering ? (
            <div
              className={`w-20 h-20 mb-4 rounded-full flex justify-center items-center`}
            >
              {entering ? <UploadIconActive /> : <UploadIcon />}
            </div>
          ) : (
            <div
              className={`w-20 h-20 bg-white/50 rounded-full flex justify-center items-center`}
            >
              <Image src={thumbGif} alt="Thumbs up gif" width={48} height={48} />
            </div>
          )}
          {!uploadedFile ||
          uploadedFile === null ||
          uploadedFile.length === 0 ? (
            <div>
              <p className="text-[#81848F] text-center mb-0.5">
                <span className="text-[#242428] font-semibold">
                  {instructionText1}
                </span>{" "}
                <br />
                {or} <span className="text-primary">{instructionText2}</span>
                &nbsp;
                {instructionText3}
              </p>
            </div>
          ) : entering ? (
            ""
          ) : (
            ""
          )}
          <input {...getInputProps()} />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-3.5 w-full max-w-lg lg:max-w-4xl p-2">
          <SelectLanguage
            type="document"
            gridCols={1}
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
            type="document"
            language={targetLanguage}
            setLanguage={setTargetLanguage}
            secondLanguage={sourceLanguage}
            onChange={() => {
              setOutput("");
              setTranslateButton(true);
            }}
            gridCols={1}
          />
        </div>
        {uploadedFile && (
          <div
            className={`flex w-full border-primary/60 border-dashed border rounded-lg p-2 ${
              acceptedFileItems.length === 1 ? "flex-row" : "flex-col"
            } justify-between items-center text-[#81848F] mt-2 text-center`}
          >
            <div
              className={`${
                acceptedFileItems.length === 1 ? "" : "w-full flex-col gap-1"
              } flex items-center`}
            >
              {acceptedFileItems}
            </div>
            <div className="flex flex-col-reverse items-end sm:flex-row gap-2 self-end">
              <Button
                onClick={handleTranslateDocument}
                disabled={loading || !!fileRejectionItems[0] || !translateButton}
                className="hover:bg-primary/80 bg-primary"
              >
                {loading ? "Translating..." : "Translate"}
              </Button>
              <Button
                onClick={() => {
                  setUploadedFile(null);
                  setClearError(true);
                }}
                className="hover:bg-white bg-transparent transition duration-200 p-0"
              >
                <TrashCanIcon />
              </Button>
            </div>
          </div>
        )}
      </div>
      {translatedDocument && (
        <Button onClick={handleDownload} className="flex mx-auto mt-4">
          Download Translated Document
        </Button>
      )}
      <DisplayErrorMessage
        errMessage={clearError ? "" : fileRejectionItems[0]}
      />
    </div>
  );
};
