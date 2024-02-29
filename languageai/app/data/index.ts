import { Download, Paste, Select } from "@/src/assets/svg";
import { ILanguagesData, StepProps } from "@/types";

export const languagesData: ILanguagesData[] = [
  {
    language: "Arabic",
    key: "ar_AR",
    flag: "sa",
  },
  {
    language: "Czech",
    key: "cs_CZ",
    flag: "cz",
  },
  {
    language: "German",
    key: "de_DE",
    flag: "de",
  },
  {
    language: "English",
    key: "en_XX",
    flag: "gb",
  },
  {
    language: "Spanish",
    key: "es_XX",
    flag: "es",
  },
  {
    language: "Estonian",
    key: "et_EE",
    flag: "ee",
  },
  {
    language: "Finnish",
    key: "fi_FI",
    flag: "fi",
  },
  {
    language: "French",
    key: "fr_XX",
    flag: "fr",
  },
  {
    language: "Gujarati",
    key: "gu_IN",
    flag: "in",
  },
  {
    language: "Hindi",
    key: "hi_IN",
    flag: "in",
  },
  {
    language: "Italian",
    key: "it_IT",
    flag: "it",
  },
  {
    language: "Japanese",
    key: "ja_XX",
    flag: "jp",
  },
  {
    language: "Kazakh",
    key: "kk_KZ",
    flag: "kz",
  },
  {
    language: "Korean",
    key: "ko_KR",
    flag: "kr",
  },
  {
    language: "Lithuanian",
    key: "lt_LT",
    flag: "lt",
  },
  {
    language: "Latvian",
    key: "lv_LV",
    flag: "lv",
  },
  {
    language: "Burmese",
    key: "my_MM",
    flag: "mm",
  },
  {
    language: "Nepali",
    key: "ne_NP",
    flag: "np",
  },
  {
    language: "Dutch",
    key: "nl_XX",
    flag: "nl",
  },
  {
    language: "Romanian",
    key: "ro_RO",
    flag: "ro",
  },
  {
    language: "Russian",
    key: "ru_RU",
    flag: "ru",
  },
  {
    language: "Sinhala",
    key: "si_LK",
    flag: "lk",
  },
  {
    language: "Turkish",
    key: "tr_TR",
    flag: "tr",
  },
  {
    language: "Vietnamese",
    key: "vi_VN",
    flag: "vn",
  },
  {
    language: "Chinese",
    key: "zh_CN",
    flag: "cn",
  },
  {
    language: "Afrikaans",
    key: "af_ZA",
    flag: "za",
  },
  {
    language: "Azerbaijani",
    key: "az_AZ",
    flag: "az",
  },
  {
    language: "Bengali",
    key: "bn_IN",
    flag: "in",
  },
  {
    language: "Persian",
    key: "fa_IR",
    flag: "ir",
  },
  {
    language: "Hebrew",
    key: "he_IL",
    flag: "il",
  },
  {
    language: "Croatian",
    key: "hr_HR",
    flag: "hr",
  },
  {
    language: "Indonesian",
    key: "id_ID",
    flag: "id",
  },
  {
    language: "Georgian",
    key: "ka_GE",
    flag: "ge",
  },
  {
    language: "Khmer",
    key: "km_KH",
    flag: "kh",
  },
  {
    language: "Macedonian",
    key: "mk_MK",
    flag: "mk",
  },
  {
    language: "Malayalam",
    key: "ml_IN",
    flag: "in",
  },
  {
    language: "Mongolian",
    key: "mn_MN",
    flag: "mn",
  },
  {
    language: "Marathi",
    key: "mr_IN",
    flag: "in",
  },
  {
    language: "Polish",
    key: "pl_PL",
    flag: "pl",
  },
  {
    language: "Pashto",
    key: "ps_AF",
    flag: "af",
  },
  {
    language: "Portuguese",
    key: "pt_XX",
    flag: "pt",
  },
  {
    language: "Swedish",
    key: "sv_SE",
    flag: "se",
  },
  {
    language: "Swahili",
    key: "sw_KE",
    flag: "ke",
  },
  {
    language: "Tamil",
    key: "ta_IN",
    flag: "in",
  },
  {
    language: "Telugu",
    key: "te_IN",
    flag: "in",
  },
  {
    language: "Thai",
    key: "th_TH",
    flag: "th",
  },
  {
    language: "Tagalog",
    key: "tl_XX",
    flag: "ph",
  },
  {
    language: "Ukrainian",
    key: "uk_UA",
    flag: "ua",
  },
  {
    language: "Urdu",
    key: "ur_PK",
    flag: "pk",
  },
  {
    language: "Xhosa",
    key: "xh_ZA",
    flag: "za",
  },
  {
    language: "Galician",
    key: "gl_ES",
    flag: "es",
  },
  {
    language: "Slovene",
    key: "sl_SI",
    flag: "si",
  },
];

export const stepsData: StepProps[] = [
  {
    icon: Select,
    background: "#F5FAFF",
    border: "#D2E9FF",
    number: "01",
    heading: "Select",
    body: "Choose your desired language you want to translate you doc/text to.",
  },
  {
    icon: Paste,
    background: "#FDFAF4",
    border: "#FAE0AE",
    number: "02",
    heading: "Paste",
    body: "Paste your text document or upload your document.",
  },
  {
    icon: Download,
    background: "#F1F0FF",
    border: "#D0CDFE",
    number: "03",
    heading: "Download",
    body: "Download your copy in just a few seconds.",
  },
];
