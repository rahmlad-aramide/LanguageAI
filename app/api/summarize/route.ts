import { NextRequest, NextResponse } from "next/server";
import { summarizeTextHF } from "@/app/utils/huggingFaceService";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 });

    const summary = await summarizeTextHF(text);
    return NextResponse.json(summary, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
