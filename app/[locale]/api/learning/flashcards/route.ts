import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token")?.value;
  if (!sessionToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = sessionToken.replace("mock_token_", "");

  try {
    const flashcards = await prisma.flashcard.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(flashcards, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch flashcards" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token")?.value;
  if (!sessionToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = sessionToken.replace("mock_token_", "");

  try {
    const { front, back } = await req.json();
    const flashcard = await prisma.flashcard.create({
      data: { userId, front, back },
    });
    return NextResponse.json(flashcard, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create flashcard" }, { status: 500 });
  }
}
