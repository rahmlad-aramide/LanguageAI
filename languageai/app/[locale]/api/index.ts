import { TranslateDocumentProps, TranslateProps } from "../utils/azureService";

export async function translateText ({text,
  from,
  to,
}: TranslateProps): Promise<string> {
  if (!text || !from || !to) {
    throw new Error(
      "All parameters (text, sourceLang, targetLang) must be provided"
    );
  }

  try {
  const response = await fetch('/en/api/translate-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      from,
      to,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage =
        response.statusText ||
         errorBody?.message ||
          "Unknown error occurred";
    throw new Error(`Translation API failed: ${errorMessage}`);
  }

  const result = await response.json();
  return result;
} catch (error: any){
  throw new Error(`Translation failed: ${error}`);
}
};

export async function translateDocument ({file,
  from,
  to,
}: TranslateDocumentProps): Promise<string> {
  if (!file || !from || !to) {
    throw new Error(
      "All parameters (file, sourceLang, targetLang) must be provided"
    );
  }

  try {
  const response = await fetch('/en/api/translate-document', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file,
      from,
      to,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage =
        response.statusText ||
         errorBody?.message ||
          "Unknown error occurred";
    throw new Error(`Translation API failed: ${errorMessage}`);
  }

  const result = await response.json();
  return result;
} catch (error: any){
  throw new Error(`Translation failed: ${error}`);
}
};

export async function testTranslator (): Promise<string> {

  try {
  const response = await fetch('/api/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage =
        response.statusText ||
         errorBody?.message ||
          "Unknown error occurred";
    throw new Error(`Translation API failed: ${errorMessage}`);
  }

  const result = await response.json();
  return result;
} catch (error: any){
  throw new Error(`Translation failed: ${error}`);
}
};


