const HF_TOKEN = process.env.HUGGINGFACE_TOKEN;

async function queryHF(model: string, data: any) {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      headers: { Authorization: `Bearer ${HF_TOKEN}`, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "HF Inference API failed");
  }
  return await response.json();
}

export async function translateTextHF({ text, from, to }: { text: string; from: string; to: string }) {
  // Using mbart-large-50-many-to-many-mmt for translation
  const result = await queryHF("facebook/mbart-large-50-many-to-many-mmt", {
    inputs: text,
    parameters: { src_lang: from, tgt_lang: to }
  });
  return result[0]?.translation_text || result[0]?.generated_text || "Translation failed";
}

export async function summarizeTextHF(text: string) {
  const result = await queryHF("facebook/bart-large-cnn", {
    inputs: text,
  });
  return result[0]?.summary_text || "Summarization failed";
}

export async function extractKeywordsHF(text: string) {
  // Using a POS tagging model or a keyword extraction model
  const result = await queryHF("dbmdz/bert-large-cased-finetuned-conll03-english", {
    inputs: text,
  });
  // Simple heuristic to extract entities as keywords
  if (Array.isArray(result)) {
    return Array.from(new Set(result.map((item: any) => item.word))).slice(0, 10);
  }
  return [];
}

export async function rewriteTextHF(text: string, style: string) {
  const prompt = `Rewrite the following text to be ${style}: ${text}`;
  const result = await queryHF("google/flan-t5-large", {
    inputs: prompt,
  });
  return result[0]?.generated_text || "Rewriting failed";
}
