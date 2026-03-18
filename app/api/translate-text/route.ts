import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import * as hf from "@/app/utils/huggingFaceService";
import * as azure from "@/app/utils/azureService";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { text, from, to } = body;

    try {
        const provider = process.env.AI_PROVIDER || "huggingface";
        let translatedText: string;

        if (provider === "azure") {
            translatedText = await azure.translateText({ text, from: from || "en", to: to || "fr" });
        } else {
            translatedText = await hf.translateTextHF({ text, from, to });
        }

        // Persist to database if user is logged in
        const sessionToken = req.cookies.get("session_token")?.value;
        const session = await getSession(sessionToken);

        if (session) {
            await prisma.translation.create({
                data: {
                    userId: session.userId,
                    inputText: text,
                    outputText: translatedText,
                    sourceLanguage: from,
                    targetLanguage: to,
                    type: "text"
                }
            });
        }

        return NextResponse.json(translatedText, { status: 200 });
    } catch (error: any) {
        console.error("translateText Error", error);
        return NextResponse.json(
            { error: error.message || "Failed to translate the texts." },
            { status: 500 }
        );
    }
}
