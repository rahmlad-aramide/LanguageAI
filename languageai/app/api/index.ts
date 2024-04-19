interface ITranslateProps {
  text: string;
  sourceLang: string;
  targetLang: string;
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
