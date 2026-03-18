import { translateTextHF } from "@/app/[locale]/utils/huggingFaceService";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
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
      const session = await getSession(sessionToken);

      if (session) {
        await prisma.translation.create({
            data: {
                userId: session.userId,
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
}
