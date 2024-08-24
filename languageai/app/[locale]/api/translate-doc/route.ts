import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { mainTranslatorLatest } from "../../utils/azureService";

export async function POST(request: NextRequest) {
  const endpoint = process.env.DOCUMENT_TRANSLATOR_ENDPOINT;
  const path = "/translator/document:translate";
  const url = `${endpoint}${path}`;

  const headers = {
    "Ocp-Apim-Subscription-Key": process.env.TRANSLATOR_KEY,
    "Content-Type": "application/octet-stream",
  };

  const params = {
    sourceLanguage: "fr",
    targetLanguage: "en",
    "api-version": "2024-05-01",
  };

  try {
    const formData = await request.formData();
    const file = formData.get("document") as File;
    const arrayBuffer = await file.arrayBuffer();

    const response = await axios.post(url, arrayBuffer, {
      headers,
      params,
      responseType: "arraybuffer",
    });
    return new NextResponse(response.data, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error: any) {
    console.error("Error during translation on server:", error);
    return NextResponse.json({ message: error.error }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
