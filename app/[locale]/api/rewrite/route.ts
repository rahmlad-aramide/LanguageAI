import { NextRequest, NextResponse } from "next/server";
import { rewriteTextHF } from "@/app/[locale]/utils/huggingFaceService";

export async function POST(req: NextRequest) {
  try {
    const { text, style } = await req.json();
    if (!text || !style) return NextResponse.json({ error: "Text and style are required" }, { status: 400 });

    const rewritten = await rewriteTextHF(text, style);
    return NextResponse.json(rewritten, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
