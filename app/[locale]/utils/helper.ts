import { Locale } from "@/i18n.config";
import {
  supportedFormatsAr,
  supportedFormatsBn,
  supportedFormatsDe,
  supportedFormatsEs,
  supportedFormatsFr,
  supportedFormatsHi,
  supportedFormatsJa,
  supportedFormatsPt,
  supportedFormatsRu,
  supportedFormatsZh,
} from "./supportedFormatsLocale";

const supportedFormats = [
  {
    extension: ".txt",
    mimeType: "text/plain",
    description: "An unformatted text document.",
    fileType: "Plain Text",
  },
  {
    extension: ".txv",
    mimeType: "text/tab-separated-values",
    description:
      "A text file format that uses tabs to separate values and newlines to separate records.",
    fileType: "Tab Separated Values",
  },
  {
    extension: ".tab",
    mimeType: "text/tab-separated-values",
    description:
      "A text file format that uses tabs to separate values and newlines to separate records.",
    fileType: "Tab Separated Values",
  },
  {
    extension: ".csv",
    mimeType: "text/csv",
    description:
      "A text file format that uses commas as a delimiter between values.",
    fileType: "Comma Separated Values",
  },
  {
    extension: ".html",
    mimeType: "text/html",
    description:
      "HTML is a standard markup language used to structure web pages and content.",
    fileType: "HyperText Markup Language",
  },
  {
    extension: ".htm",
    mimeType: "text/html",
    description:
      "HTML is a standard markup language used to structure web pages and content.",
    fileType: "HyperText Markup Language",
  },
  {
    extension: ".mthml",
    mimeType: "message/rfc822",
    description: "A web page archive file format.",
    fileType: "MHTML",
  },
  {
    extension: ".mht",
    mimeType: "application/x-mimearchive",
    description: "A web page archive file format.",
    fileType: "MHTML",
  },
  {
    extension: ".pptx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    description:
      "An XML-based file format used for PowerPoint slideshow presentations.",
    fileType: "Microsoft PowerPoint",
  },
  {
    extension: ".xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    description: "An XML-based file format used for Excel spreadsheets.",
    fileType: "Microsoft Excel",
  },
  {
    extension: ".docx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    description: "An XML-based file format used for Word documents.",
    fileType: "Microsoft Word",
  },
  {
    extension: ".msg",
    mimeType: "application/vnd.ms-outlook",
    description: "A file format used for stored Outlook mail message objects.",
    fileType: "Microsoft Outlook",
  },
  {
    extension: ".xlf",
    mimeType: "application/xliff+xml",
    description:
      "A standardized XML-based file format widely used in translation and localization software processing.",
    fileType: "Xml Localization Interchange",
  },
  {
    extension: ".xliff",
    mimeType: "application/xliff+xml",
    description:
      "A standardized XML-based file format widely used in translation and localization software processing.",
    fileType: "Xml Localization Interchange",
  },
];
const localeSupportedFormatsMap = {
  en: supportedFormats,
  es: supportedFormatsEs,
  ar: supportedFormatsAr,
  bn: supportedFormatsBn,
  de: supportedFormatsDe,
  fr: supportedFormatsFr,
  hi: supportedFormatsHi,
  ja: supportedFormatsJa,
  pt: supportedFormatsPt,
  ru: supportedFormatsRu,
  zh: supportedFormatsZh,
};
export const supportedFormatsGroupedByFileType = (locale: Locale) => {
  const supportedFormats =
    localeSupportedFormatsMap[locale] || localeSupportedFormatsMap["en"];
  const grouped = supportedFormats.reduce(
    (acc, format) => {
      if (!acc[format.fileType]) {
        acc[format.fileType] = {
          extensions: [],
          mimeType: format.mimeType,
          description: format.description,
        };
      }
      acc[format.fileType].extensions.push(format.extension);
      return acc;
    },
    {} as Record<
      string,
      { extensions: string[]; mimeType: string; description: string }
    >,
  );

  return Object.entries(grouped).map(([fileType, data]) => ({
    fileType,
    extensions: data.extensions.join(", "),
    mimeType: data.mimeType,
    description: data.description,
  }));
};

export function getExtension(filePath: string) {
  return filePath.slice(filePath.lastIndexOf("."));
}
export function getMimeType(filePath: string) {
  const extension = getExtension(filePath);
  const format = supportedFormats.find(
    (format) => format.extension === extension.toLowerCase(),
  );
  return format ? format.mimeType : "text/plain";
}

export const generateAcceptObject = () => {
  return supportedFormats.reduce(
    (acc, format) => {
      if (!acc[format.mimeType]) {
        acc[format.mimeType] = [];
      }
      acc[format.mimeType].push(format.extension);
      return acc;
    },
    {} as { [key: string]: string[] },
  );
};
