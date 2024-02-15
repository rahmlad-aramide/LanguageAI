import { languagesData } from "@/app/data";

export const selectedLanguageOption = (language:string) => languagesData.find(
    (option) => option.language === language
  );