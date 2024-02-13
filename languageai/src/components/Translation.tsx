"use client";
import Image from "next/image";
import { useState } from "react";
import { SelectLanguage } from ".";

// type LanguageOption = {
//   code: string; // Country code for the flag
//   language: string; // Language name
// };

// // Define your languages and corresponding flags
// const languageOptions: LanguageOption[] = [
//   { code: "ng", language: "Hausa" },
//   { code: "fr", language: "French" },
//   { code: "es", language: "Spanish" },
//   { code: "de", language: "German" },
//   { code: "jp", language: "Japanese" },
//   { code: "cn", language: "Chinese" },
//   { code: "ru", language: "Russian" },
// ];

// interface SelectLanguageProps {
//   language: string;
//   setLanguage: (language: string) => void;
// }

// // <Image src={`https://flagcdn.com/16x12/${option.code}.png`} alt="" className="w-4 h-3 mr-2" />
// export const SelectLanguage: React.FC<SelectLanguageProps> = ({
//   language,
//   setLanguage,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative">
//       <button
//         className="w-full border rounded px-3 py-2 bg-white shadow outline-none flex items-center justify-between"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span>
//           <Image
//             src={`https://flagcdn.com/16x12/ng.png`}
//             alt=""
//             width={16}
//             height={12}
//             className="w-4 h-3 mr-2"
//           />
//         </span>
//         <span>{language || "Select a language"}</span>
//         <span>▼</span>
//       </button>
//       {isOpen && (
//         <div className="absolute border rounded mt-1 bg-white shadow outline-none z-10">
//           {languageOptions.map(
//             (option) =>
//               option.language !== language && (
//                 <div
//                   key={option.code}
//                   className="px-3 py-2 flex items-center cursor-pointer hover:bg-gray-100"
//                   onClick={() => {
//                     setLanguage(option.language);
//                     setIsOpen(false);
//                   }}
//                 >
//                   <span>
//                     <Image
//                       src={`https://flagcdn.com/16x12/ng.png`}
//                       alt=""
//                       className="w-4 h-3 mr-2"
//                       width={16}
//                       height={12}
//                     />
//                   </span>
//                   <span className="mr-2">{option.language}</span>
//                 </div>
//               )
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// import { Button, SelectLanguage } from ".";
// LanguageOption.tsx
// type LanguageOption = {
//   code: string; // Country code for the flag
//   language: string; // Language name
// };

// // Define your languages and corresponding flags
// const languageOptions: LanguageOption[] = [
//   { code: "ng", language: "Hausa" },
//   { code: "fr", language: "French" },
//   { code: "es", language: "Spanish" },
//   { code: "de", language: "German" },
//   { code: "jp", language: "Japanese" },
//   { code: "cn", language: "Chinese" },
//   { code: "ru", language: "Russian" },
// ];

// interface SelectLanguageProps {
//   language: string;
//   setLanguage: (language: string) => void;
// }

// export const SelectLanguage: React.FC<SelectLanguageProps> = ({
//   language,
//   setLanguage,
// }) => {
//   return (
//     <select
//       className="w-full border rounded px-3 py-2 bg-white shadow outline-none"
//       value={language}
//       onChange={(e) => setLanguage(e.target.value)}
//     >
//       {languageOptions.map(
//         (option) =>
//           option.language !== language && (
//             <option key={option.code} value={option.language}>
//               <div className="flex items-center">
//                 <Image
//                   src={`https://flagcdn.com/16x12/${option.code}.png`}
//                   alt={option.language}
//                   className="w-4 h-3 mr-2"
//                   width={16}
//                   height={12}
//                 />
//                 {option.language}
//               </div>
//             </option>
//           )
//       )}
//     </select>
//   );
// };

export const Translation: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  return (
    <section>
      <div className="bg-[#EE076814] w-[90%] max-w-6xl mx-auto rounded-[2.5rem]">
        <h2>Translate your words or documents</h2>
        <p>Choose the language you want to transitioned into below:</p>
        <div className="flex">
          {/* <Button>French</Button>
          <Button>English</Button> */}
          <SelectLanguage
            language={sourceLanguage}
            setLanguage={setSourceLanguage}
          />
          <SelectLanguage
            language={targetLanguage}
            setLanguage={setTargetLanguage}
          />
          <select name="a" id="a">
            <option value="b">b</option>
            <option value="b">b</option>
            <option value="b">b</option>
            <option value="b">b</option>
          </select>
        </div>
      </div>
    </section>
  );
};
