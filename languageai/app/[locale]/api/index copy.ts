interface LanguageProps {
  sourceLang: string;
  targetLang: string;
}
interface ITranslateProps extends LanguageProps {
  text: string;
}
interface ITranslatePdfDocumentProps extends LanguageProps {
  document: any;
}

export default async function translate({
  text,
  sourceLang,
  targetLang,
}: ITranslateProps): Promise<string> {
  // Validate input parameters
  if (!text || !sourceLang || !targetLang) {
    throw new Error(
      "All parameters (text, sourceLang, targetLang) must be provided"
    );
  }

  try {
    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_TRANSLATION_API_URL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify({
          inputs: text,
          parameters: { src_lang: sourceLang, tgt_lang: targetLang },
        }),
      }
    );

    if (!apiResponse.ok) {
      // Attempt to parse JSON error message or fallback to status text
      const errorBody = await apiResponse.json().catch(() => null);
      const errorMessage =
        apiResponse.status === 503
          ? "Please, try again after some time..."
          : errorBody?.message ||
            apiResponse.statusText ||
            "Unknown error occurred";
      throw new Error(`Translation API failed: ${errorMessage}`);
    }

    const data = await apiResponse.json();

    // Assuming the API returns a response in a specific format; adjust accordingly
    if (!data || !data[0] || !data[0].translation_text) {
      throw new Error("Invalid API response format");
    }

    return data[0].translation_text;
  } catch (error) {
    // Re-throw the error to be handled by the caller
    throw new Error(`Translation failed: ${error}`);
  }
}

export async function translateText ({text,
  sourceLang,
  targetLang,
}: ITranslateProps): Promise<string> {
  if (!text || !sourceLang || !targetLang) {
    throw new Error(
      "All parameters (text, sourceLang, targetLang) must be provided"
    );
  }

  try {
  const response = await fetch('/api/translate-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      from: sourceLang,
      to: targetLang,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage =
      response.status === 503
        ? "Please, try again after some time..."
        : response.statusText ||
         errorBody?.message ||
          "Unknown error occurred";
    throw new Error(`Translation API failed: ${errorMessage}`);
  }

  const result = await response.json();
  return result.translatedText;
} catch (error: any){
  throw new Error(`Translation failed: ${error}`);
}
};
