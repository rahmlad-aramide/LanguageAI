const supportedFormats = [
    { extension: ".txt", mimeType: "text/plain", description: "An unformatted text document." },
    { extension: ".txv", mimeType: "text/tab-separated-values", description: "A text file format that uses tabs to separate values and newlines to separate records." },
    { extension: ".tab", mimeType: "text/tab-separated-values", description: "A text file format that uses tabs to separate values and newlines to separate records." },
    { extension: ".csv", mimeType: "text/csv", description: "A text file format that uses commas as a delimiter between values." },
    { extension: ".html", mimeType: "text/html", description: "HTML is a standard markup language used to structure web pages and content." },
    { extension: ".htm", mimeType: "text/html", description: "HTML is a standard markup language used to structure web pages and content." },
    { extension: ".mthml", mimeType: "message/rfc822", description: "A web page archive file format." },
    { extension: ".mht", mimeType: "application/x-mimearchive", description: "A web page archive file format." },
    { extension: ".pptx", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation", description: "An XML-based file format used for PowerPoint slideshow presentations." },
    { extension: ".xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", description: "An XML-based file format used for Excel spreadsheets." },
    { extension: ".docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", description: "An XML-based file format used for Word documents." },
    { extension: ".msg", mimeType: "application/vnd.ms-outlook", description: "A file format used for stored Outlook mail message objects." }
];

export function getExtension(filePath: string) {
    return filePath.slice(filePath.lastIndexOf("."));
}
export function getMimeType(filePath: string) {
    const extension = getExtension(filePath);
    const format = supportedFormats.find(format => format.extension === extension.toLowerCase());
    return format ? format.mimeType : 'text/plain';
}

export const generateAcceptObject = () => {
    return supportedFormats.reduce((acc, format) => {
      if (!acc[format.mimeType]) {
        acc[format.mimeType] = [];
      }
      acc[format.mimeType].push(format.extension);
      return acc;
    }, {} as { [key: string]: string[] });
  };