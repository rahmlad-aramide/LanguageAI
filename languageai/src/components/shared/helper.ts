import { languagesData } from "@/app/data";

export const selectedLanguageOption = (language: string) =>
  languagesData.find((option) => option.language === language);

// export const handleSpeak = (text: string) => {
//   console.log("speaker text",text)
  
// };

// export const handleCopy = 