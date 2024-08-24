import { Download, Paste, Select } from "@/src/assets/svg";
import { ILanguagesData, StepProps } from "@/types";

export const navLanguagesData: ILanguagesData[] = [
  {
    language: "Arabic",
    key: "ar",
    flag: "sa",
  },
  {
    language: "English",
    key: "en",
    flag: "gb",
  },
  {
    language: "Chinese",
    key: "zh",
    flag: "cn",
  },
  {
    language: "Spanish",
    key: "es",
    flag: "es",
  },
  {
    language: "Hindi",
    key: "hi",
    flag: "in",
  },
  {
    language: "Bengali",
    key: "bn",
    flag: "in",
  },
  {
    language: "Portuguese",
    key: "pt",
    flag: "pt",
  },
  {
    language: "Russian",
    key: "ru",
    flag: "ru",
  },
  {
    language: "Japanese",
    key: "ja",
    flag: "jp",
  },
  {
    language: "French",
    key: "fr",
    flag: "fr",
  },
  {
    language: "German",
    key: "de",
    flag: "de",
  },
];

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

export const documentLanguagesData: ILanguagesData[] = [
  { language: "Afrikaans", key: "af", flag: "za" },
  { language: "Albanian", key: "sq", flag: "al" },
  { language: "Amharic", key: "am", flag: "et" },
  { language: "Arabic", key: "ar", flag: "sa" },
  { language: "Armenian", key: "hy", flag: "am" },
  { language: "Assamese", key: "as", flag: "in" },
  { language: "Azerbaijani (Latin)", key: "az", flag: "az" },
  { language: "Bangla", key: "bn", flag: "bd" },
  { language: "Bashkir", key: "ba", flag: "ru" },
  { language: "Basque", key: "eu", flag: "es" },
  { language: "Bosnian (Latin)", key: "bs", flag: "ba" },
  { language: "Bulgarian", key: "bg", flag: "bg" },
  { language: "Cantonese (Traditional)", key: "yue", flag: "hk" },
  { language: "Catalan", key: "ca", flag: "es" },
  { language: "Chinese (Literary)", key: "lzh", flag: "cn" },
  { language: "Chinese Simplified", key: "zh-Hans", flag: "cn" },
  { language: "Chinese Traditional", key: "zh-Hant", flag: "tw" },
  { language: "Croatian", key: "hr", flag: "hr" },
  { language: "Czech", key: "cs", flag: "cz" },
  { language: "Danish", key: "da", flag: "dk" },
  { language: "Dari", key: "prs", flag: "af" },
  { language: "Divehi", key: "dv", flag: "mv" },
  { language: "Dutch", key: "nl", flag: "nl" },
  { language: "English", key: "en", flag: "gb" },
  { language: "Estonian", key: "et", flag: "ee" },
  { language: "Faroese", key: "fo", flag: "fo" },
  { language: "Fijian", key: "fj", flag: "fj" },
  { language: "Filipino", key: "fil", flag: "ph" },
  { language: "Finnish", key: "fi", flag: "fi" },
  { language: "French", key: "fr", flag: "fr" },
  { language: "French (Canada)", key: "fr-ca", flag: "ca" },
  { language: "Galician", key: "gl", flag: "es" },
  { language: "Georgian", key: "ka", flag: "ge" },
  { language: "German", key: "de", flag: "de" },
  { language: "Greek", key: "el", flag: "gr" },
  { language: "Gujarati", key: "gu", flag: "in" },
  { language: "Haitian Creole", key: "ht", flag: "ht" },
  { language: "Hebrew", key: "he", flag: "il" },
  { language: "Hindi", key: "hi", flag: "in" },
  { language: "Hmong Daw (Latin)", key: "mww", flag: "cn" },
  { language: "Hungarian", key: "hu", flag: "hu" },
  { language: "Icelandic", key: "is", flag: "is" },
  { language: "Indonesian", key: "id", flag: "id" },
  { language: "Interlingua", key: "ia", flag: "eu" },
  { language: "Inuinnaqtun", key: "ikt", flag: "ca" },
  { language: "Inuktitut", key: "iu", flag: "ca" },
  { language: "Inuktitut (Latin)", key: "iu-Latn", flag: "ca" },
  { language: "Irish", key: "ga", flag: "ie" },
  { language: "Italian", key: "it", flag: "it" },
  { language: "Japanese", key: "ja", flag: "jp" },
  { language: "Kannada", key: "kn", flag: "in" },
  { language: "Kazakh (Cyrillic)", key: "kk", flag: "kz" },
  { language: "Kazakh (Latin)", key: "kk-latn", flag: "kz" },
  { language: "Khmer", key: "km", flag: "kh" },
  { language: "Klingon", key: "tlh-Latn", flag: "qon" },
  { language: "Klingon (plqaD)", key: "tlh-Piqd", flag: "qon" },
  { language: "Korean", key: "ko", flag: "kr" },
  { language: "Kurdish (Arabic) (Central)", key: "ku-arab", flag: "iq" },
  { language: "Kurdish (Latin) (Northern)", key: "ku-latn", flag: "iq" },
  { language: "Kyrgyz (Cyrillic)", key: "ky", flag: "kg" },
  { language: "Lao", key: "lo", flag: "la" },
  { language: "Latvian", key: "lv", flag: "lv" },
  { language: "Lithuanian", key: "lt", flag: "lt" },
  { language: "Macedonian", key: "mk", flag: "mk" },
  { language: "Malagasy", key: "mg", flag: "mg" },
  { language: "Malay (Latin)", key: "ms", flag: "my" },
  { language: "Malayalam", key: "ml", flag: "in" },
  { language: "Maltese", key: "mt", flag: "mt" },
  { language: "Maori", key: "mi", flag: "nz" },
  { language: "Marathi", key: "mr", flag: "in" },
  { language: "Mongolian (Cyrillic)", key: "mn-Cyrl", flag: "mn" },
  { language: "Mongolian (Traditional)", key: "mn-Mong", flag: "mn" },
  { language: "Myanmar (Burmese)", key: "my", flag: "mm" },
  { language: "Nepali", key: "ne", flag: "np" },
  { language: "Norwegian", key: "nb", flag: "no" },
  { language: "Odia", key: "or", flag: "in" },
  { language: "Pashto", key: "ps", flag: "af" },
  { language: "Persian", key: "fa", flag: "ir" },
  { language: "Polish", key: "pl", flag: "pl" },
  { language: "Portuguese (Brazil)", key: "pt-br", flag: "br" },
  { language: "Portuguese (Portugal)", key: "pt-pt", flag: "pt" },
  { language: "Punjabi", key: "pa", flag: "in" },
  { language: "Queretaro Otomi", key: "otq", flag: "mx" },
  { language: "Romanian", key: "ro", flag: "ro" },
  { language: "Russian", key: "ru", flag: "ru" },
  { language: "Samoan (Latin)", key: "sm", flag: "ws" },
  { language: "Serbian (Cyrillic)", key: "sr-Cyrl", flag: "rs" },
  { language: "Serbian (Latin)", key: "sr-latn", flag: "rs" },
  { language: "Slovak", key: "sk", flag: "sk" },
  { language: "Slovenian", key: "sl", flag: "si" },
  { language: "Somali", key: "so", flag: "so" },
  { language: "Spanish", key: "es", flag: "es" },
  { language: "Swahili (Latin)", key: "sw", flag: "tz" },
  { language: "Swedish", key: "sv", flag: "se" },
  { language: "Tahitian", key: "ty", flag: "pf" },
  { language: "Tamil", key: "ta", flag: "in" },
  { language: "Tatar (Latin)", key: "tt", flag: "ru" },
  { language: "Telugu", key: "te", flag: "in" },
  { language: "Thai", key: "th", flag: "th" },
  { language: "Tibetan", key: "bo", flag: "cn" },
  { language: "Tigrinya", key: "ti", flag: "er" },
  { language: "Tongan", key: "to", flag: "to" },
  { language: "Turkish", key: "tr", flag: "tr" },
  { language: "Turkmen (Latin)", key: "tk", flag: "tm" },
  { language: "Ukrainian", key: "uk", flag: "ua" },
  { language: "Upper Sorbian", key: "hsb", flag: "de" },
  { language: "Urdu", key: "ur", flag: "pk" },
  { language: "Uyghur (Arabic)", key: "ug", flag: "cn" },
  { language: "Uzbek (Latin)", key: "uz", flag: "uz" },
  { language: "Vietnamese", key: "vi", flag: "vn" },
  { language: "Welsh", key: "cy", flag: "gb" },
  { language: "Yucatec Maya", key: "yua", flag: "mx" },
  { language: "Zulu", key: "zu", flag: "za" },
];

export const textLanguagesData: ILanguagesData[] = [
  { language: "Afrikaans", key: "af", flag: "za" },
  { language: "Albanian", key: "sq", flag: "al" },
  { language: "Amharic", key: "am", flag: "et" },
  { language: "Arabic", key: "ar", flag: "sa" },
  { language: "Armenian", key: "hy", flag: "am" },
  { language: "Assamese", key: "as", flag: "in" },
  { language: "Azerbaijani (Latin)", key: "az", flag: "az" },
  { language: "Bangla", key: "bn", flag: "bd" },
  { language: "Bashkir", key: "ba", flag: "ru" },
  { language: "Basque", key: "eu", flag: "es" },
  { language: "Bhojpuri", key: "bho", flag: "in" },
  { language: "Bodo", key: "brx", flag: "in" },
  { language: "Bosnian (Latin)", key: "bs", flag: "ba" },
  { language: "Bulgarian", key: "bg", flag: "bg" },
  { language: "Cantonese (Traditional)", key: "yue", flag: "hk" },
  { language: "Catalan", key: "ca", flag: "es" },
  { language: "Chinese (Literary)", key: "lzh", flag: "cn" },
  { language: "Chinese Simplified", key: "zh-Hans", flag: "cn" },
  { language: "Chinese Traditional", key: "zh-Hant", flag: "tw" },
  { language: "chiShona", key: "sn", flag: "zw" },
  { language: "Croatian", key: "hr", flag: "hr" },
  { language: "Czech", key: "cs", flag: "cz" },
  { language: "Danish", key: "da", flag: "dk" },
  { language: "Dari", key: "prs", flag: "af" },
  { language: "Divehi", key: "dv", flag: "mv" },
  { language: "Dogri", key: "doi", flag: "in" },
  { language: "Dutch", key: "nl", flag: "nl" },
  { language: "English", key: "en", flag: "gb" },
  { language: "Estonian", key: "et", flag: "ee" },
  { language: "Faroese", key: "fo", flag: "fo" },
  { language: "Fijian", key: "fj", flag: "fj" },
  { language: "Filipino", key: "fil", flag: "ph" },
  { language: "Finnish", key: "fi", flag: "fi" },
  { language: "French", key: "fr", flag: "fr" },
  { language: "French (Canada)", key: "fr-ca", flag: "ca" },
  { language: "Galician", key: "gl", flag: "es" },
  { language: "Georgian", key: "ka", flag: "ge" },
  { language: "German", key: "de", flag: "de" },
  { language: "Greek", key: "el", flag: "gr" },
  { language: "Gujarati", key: "gu", flag: "in" },
  { language: "Haitian Creole", key: "ht", flag: "ht" },
  { language: "Hausa", key: "ha", flag: "ng" },
  { language: "Hebrew", key: "he", flag: "il" },
  { language: "Hindi", key: "hi", flag: "in" },
  { language: "Hmong Daw (Latin)", key: "mww", flag: "cn" },
  { language: "Hungarian", key: "hu", flag: "hu" },
  { language: "Icelandic", key: "is", flag: "is" },
  { language: "Igbo", key: "ig", flag: "ng" },
  { language: "Indonesian", key: "id", flag: "id" },
  { language: "Inuinnaqtun", key: "ikt", flag: "ca" },
  { language: "Inuktitut", key: "iu", flag: "ca" },
  { language: "Inuktitut (Latin)", key: "iu-Latn", flag: "ca" },
  { language: "Irish", key: "ga", flag: "ie" },
  { language: "Italian", key: "it", flag: "it" },
  { language: "Japanese", key: "ja", flag: "jp" },
  { language: "Kannada", key: "kn", flag: "in" },
  { language: "Kashmiri", key: "ks", flag: "in" },
  { language: "Kazakh", key: "kk", flag: "kz" },
  { language: "Khmer", key: "km", flag: "kh" },
  { language: "Kinyarwanda", key: "rw", flag: "rw" },
  { language: "Klingon", key: "tlh-Latn", flag: "qon" },
  { language: "Klingon (plqaD)", key: "tlh-Piqd", flag: "qon" },
  { language: "Konkani", key: "gom", flag: "in" },
  { language: "Korean", key: "ko", flag: "kr" },
  { language: "Kurdish (Central)", key: "ku", flag: "iq" },
  { language: "Kurdish (Northern)", key: "kmr", flag: "iq" },
  { language: "Kyrgyz (Cyrillic)", key: "ky", flag: "kg" },
  { language: "Lao", key: "lo", flag: "la" },
  { language: "Latvian", key: "lv", flag: "lv" },
  { language: "Lithuanian", key: "lt", flag: "lt" },
  { language: "Lingala", key: "ln", flag: "cd" },
  { language: "Lower Sorbian", key: "dsb", flag: "de" },
  { language: "Luganda", key: "lug", flag: "ug" },
  { language: "Macedonian", key: "mk", flag: "mk" },
  { language: "Maithili", key: "mai", flag: "in" },
  { language: "Malagasy", key: "mg", flag: "mg" },
  { language: "Malay (Latin)", key: "ms", flag: "my" },
  { language: "Malayalam", key: "ml", flag: "in" },
  { language: "Maltese", key: "mt", flag: "mt" },
  { language: "Maori", key: "mi", flag: "nz" },
  { language: "Marathi", key: "mr", flag: "in" },
  { language: "Mongolian (Cyrillic)", key: "mn-Cyrl", flag: "mn" },
  { language: "Mongolian (Traditional)", key: "mn-Mong", flag: "mn" },
  { language: "Myanmar", key: "my", flag: "mm" },
  { language: "Nepali", key: "ne", flag: "np" },
  { language: "Norwegian", key: "nb", flag: "no" },
  { language: "Nyanja", key: "nya", flag: "mw" },
  { language: "Odia", key: "or", flag: "in" },
  { language: "Pashto", key: "ps", flag: "af" },
  { language: "Persian", key: "fa", flag: "ir" },
  { language: "Polish", key: "pl", flag: "pl" },
  { language: "Portuguese (Brazil)", key: "pt", flag: "br" },
  { language: "Portuguese (Portugal)", key: "pt-pt", flag: "pt" },
  { language: "Punjabi", key: "pa", flag: "in" },
  { language: "Queretaro Otomi", key: "otq", flag: "mx" },
  { language: "Romanian", key: "ro", flag: "ro" },
  { language: "Rundi", key: "run", flag: "bi" },
  { language: "Russian", key: "ru", flag: "ru" },
  { language: "Samoan (Latin)", key: "sm", flag: "ws" },
  { language: "Serbian (Cyrillic)", key: "sr-Cyrl", flag: "rs" },
  { language: "Serbian (Latin)", key: "sr-Latn", flag: "rs" },
  { language: "Sesotho", key: "st", flag: "za" },
  { language: "Sesotho sa Leboa", key: "nso", flag: "za" },
  { language: "Setswana", key: "tn", flag: "bw" },
  { language: "Sindhi", key: "sd", flag: "pk" },
  { language: "Sinhala", key: "si", flag: "lk" },
  { language: "Slovak", key: "sk", flag: "sk" },
  { language: "Slovenian", key: "sl", flag: "si" },
  { language: "Somali (Arabic)", key: "so", flag: "so" },
  { language: "Spanish", key: "es", flag: "es" },
  { language: "Swahili (Latin)", key: "sw", flag: "tz" },
  { language: "Swedish", key: "sv", flag: "se" },
  { language: "Tahitian", key: "ty", flag: "pf" },
  { language: "Tamil", key: "ta", flag: "in" },
  { language: "Tatar (Latin)", key: "tt", flag: "ru" },
  { language: "Telugu", key: "te", flag: "in" },
  { language: "Thai", key: "th", flag: "th" },
  { language: "Tibetan", key: "bo", flag: "cn" },
  { language: "Tigrinya", key: "ti", flag: "er" },
  { language: "Tongan", key: "to", flag: "to" },
  { language: "Turkish", key: "tr", flag: "tr" },
  { language: "Turkmen (Latin)", key: "tk", flag: "tm" },
  { language: "Ukrainian", key: "uk", flag: "ua" },
  { language: "Upper Sorbian", key: "hsb", flag: "de" },
  { language: "Urdu", key: "ur", flag: "pk" },
  { language: "Uyghur (Arabic)", key: "ug", flag: "cn" },
  { language: "Uzbek (Latin)", key: "uz", flag: "uz" },
  { language: "Vietnamese", key: "vi", flag: "vn" },
  { language: "Welsh", key: "cy", flag: "gb" },
  { language: "Xhosa", key: "xh", flag: "za" },
  { language: "Yoruba", key: "yo", flag: "ng" },
  { language: "Yucatec Maya", key: "yua", flag: "mx" },
  { language: "Zulu", key: "zu", flag: "za" },
];
