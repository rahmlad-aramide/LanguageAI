import { NextRequest, NextResponse } from "next/server";
import { extractKeywordsHF } from "@/app/utils/huggingFaceService";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 });

    const keywords = await extractKeywordsHF(text);
    return NextResponse.json(keywords, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
