import { NextApiResponse } from "next";
import { translateTextHF } from "@/app/[locale]/utils/huggingFaceService";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = await req.formData();
    const file = body.get("file") as File;
    const from = body.get("from") as string;
    const to = body.get("to") as string;

    try {
      // For document translation with HF, we'll read the text from the file and translate it
      const text = await file.text();
      const translatedText = await translateTextHF({ text, from, to });

      // Persist to database if user is logged in
      const sessionToken = req.cookies.get("session_token")?.value;
      if (sessionToken) {
        const userId = sessionToken.replace("mock_token_", "");
        await prisma.translation.create({
            data: {
                userId,
                inputText: file.name,
                outputText: translatedText,
                sourceLanguage: from,
                targetLanguage: to,
                type: "document"
            }
        });
      }

      return NextResponse.json(translatedText, {
        status: 200,
      });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Failed to translate the document." },
        {
          status: 500,
        },
      );
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
