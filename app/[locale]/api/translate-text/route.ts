import { NextApiResponse } from "next";
import { translateTextHF } from "@/app/[locale]/utils/huggingFaceService";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = await req.json();
    const { text, from, to } = body;
    try {
      const translatedText = await translateTextHF({ text, from, to });

      // Persist to database if user is logged in
      const sessionToken = req.cookies.get("session_token")?.value;
      if (sessionToken) {
        const userId = sessionToken.replace("mock_token_", "");
        await prisma.translation.create({
            data: {
                userId,
                inputText: text,
                outputText: translatedText,
                sourceLanguage: from,
                targetLanguage: to,
                type: "text"
            }
        });
      }

      return NextResponse.json(translatedText, {
        status: 200,
      });
    } catch (error: any) {
      console.log("translateText Error", error);
      return NextResponse.json(
        { error: error.message || "Failed to translate the texts." },
        {
          status: 500,
        },
      );
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
