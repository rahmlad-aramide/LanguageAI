import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token")?.value;
  if (!sessionToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = sessionToken.replace("mock_token_", "");

  try {
    const { originalTranslation, suggestedTranslation } = await req.json();
    const correction = await prisma.correction.create({
      data: { userId, originalTranslation, suggestedTranslation },
    });
    return NextResponse.json(correction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit correction" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const corrections = await prisma.correction.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(corrections, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch corrections" }, { status: 500 });
  }
}
