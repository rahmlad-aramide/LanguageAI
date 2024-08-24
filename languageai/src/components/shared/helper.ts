import {
  documentLanguagesData,
  navLanguagesData,
  textLanguagesData,
} from "@/app/[locale]/data";

export const selectedLanguageOption = (language: string) =>
  textLanguagesData.find((option) => option.language === language);

export const selectedDocLanguageOption = (language: string) =>
  documentLanguagesData.find((option) => option.language === language);

export const selectedNavLanguageOption = (locale: string) =>
  navLanguagesData.find((option) => option.key === locale);

export const selectedNavLocaleOption = (language: string) =>
  navLanguagesData.find((option) => option.language === language);
