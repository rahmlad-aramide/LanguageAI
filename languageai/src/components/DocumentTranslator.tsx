"use client";
// import React, { useState } from "react";
// import axios from "axios";

// const DocumentTranslator: React.FC = () => {
//   const [sourceFile, setSourceFile] = useState<File | null>(null);
//   const [translatedFile, setTranslatedFile] = useState<Blob | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setSourceFile(event.target.files[0]);
//     }
//   };

//   const handleTranslate = async () => {
//     if (!sourceFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     const endpoint = process.env.NEXT_PUBLIC_DOCUMENT_TRANSLATOR_ENDPOINT;
//     const path = "/translator/document:translate";
//     const url = `${endpoint}${path}`;

//     const headers = {
//       "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_TRANSLATOR_KEY,
//     };

//     const params = {
//       sourceLanguage: "en",
//       targetLanguage: "fr",
//       "api-version": "2024-05-01",
//     };

//     const formData = new FormData();
//     formData.append("document", sourceFile, sourceFile.name);

//     try {
//       const response = await axios.post(url, formData, {
//         headers,
//         params,
//         responseType: "blob",
//       });

//       console.log("response", response);
//       setTranslatedFile(response.data);
//     } catch (error) {
//       console.error("Error during translation:", error);
//     }
//   };

//   const handleDownload = () => {
//     if (!translatedFile) return;

//     const url = window.URL.createObjectURL(translatedFile);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `Translated_${sourceFile?.name}`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleTranslate}>Translate</button>
//       {translatedFile && (
//         <button onClick={handleDownload}>Download Translated File</button>
//       )}
//     </div>
//   );
// };

// export default DocumentTranslator;

"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "./shared/Button";

export const DocumentTranslator: React.FC = () => {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [translatedFile, setTranslatedFile] = useState<Blob | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSourceFile(event.target.files[0]);
    }
  };

  const handleTranslate = async () => {
    if (!sourceFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("document", sourceFile);

    try {
      const response = await axios.post("/en/api/translate-doc", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      setTranslatedFile(response.data);
      console.log("response data", response.data);
      return response;
    } catch (error) {
      console.error("Error during translation:", error);
    }
  };

  const handleDownload = () => {
    if (!translatedFile) return;

    const url = window.URL.createObjectURL(translatedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Translated_${sourceFile?.name}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-lightPrimary py-10">
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleTranslate}>Translate</Button>
      {translatedFile && (
        <Button onClick={handleDownload}>Download Translated File</Button>
      )}
    </div>
  );
};
