import { translateTextHF } from "@/app/utils/huggingFaceService";
import { translateDocument as translateDocumentAzure } from "@/app/utils/azureService";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const body = await req.formData();
    const file = body.get("file") as File;
    const from = body.get("from") as string;
    const to = body.get("to") as string;

    try {
      const provider = process.env.AI_PROVIDER || "huggingface";
      let result: string;

      if (provider === "azure") {
        result = await translateDocumentAzure(file, from, to, file.name);
      } else {
        // HF Fallback: read text and translate
        const text = await file.text();
        result = await translateTextHF({ text, from, to });
      }

      // Persist to database if user is logged in
      const sessionToken = req.cookies.get("session_token")?.value;
      const session = await getSession(sessionToken);

      if (session) {
        await prisma.translation.create({
            data: {
                userId: session.userId,
                inputText: file.name,
                outputText: result,
                sourceLanguage: from,
                targetLanguage: to,
                type: "document"
            }
        });
      }

      return NextResponse.json(result, {
        status: 200,
      });
    } catch (error: any) {
      console.error("translateDocument Error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to translate the document." },
        {
          status: 500,
        },
      );
    }
}
