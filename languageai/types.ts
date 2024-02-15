// types.ts
export interface ILanguagesData {
  language: string;
  key: string;
  flag: string;
}

export interface StepProps {
  icon: () => JSX.Element;
  background: string;
  border: string;
  number: string;
  heading: string;
  body: string;
}

export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

export interface TranslationResponse {
  translatedText: string;
}
