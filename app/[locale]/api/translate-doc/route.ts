import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("document") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const endpoint = process.env.DOCUMENT_TRANSLATOR_ENDPOINT;
    const path = "/translator/document:translate";
    const url = `${endpoint}${path}`;

    const headers = {
      "Ocp-Apim-Subscription-Key": process.env.TRANSLATOR_KEY,
      "Content-Type": "application/octet-stream",
    };

    const params = {
      sourceLanguage: "en",
      targetLanguage: "fr",
      "api-version": "2024-05-01",
    };

    const fileBuffer = await file.arrayBuffer();

    const response = await axios.post(url, fileBuffer, {
      headers,
      params,
      responseType: "arraybuffer",
    });

    return new NextResponse(response.data, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="LanguageAI_${file.name}"`,
      },
    });
  } catch (error) {
    console.error("Error during translation:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
