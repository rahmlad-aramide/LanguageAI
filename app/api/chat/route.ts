import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token")?.value;
  const session = await getSession(sessionToken);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = session.userId;

  try {
    const messages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      take: 50,
    });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token")?.value;
  const session = await getSession(sessionToken);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = session.userId;

  try {
    const { message, translatedText, isUser } = await req.json();
    const chatMessage = await prisma.chatMessage.create({
      data: { userId, message, translatedText, isUser },
    });
    return NextResponse.json(chatMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
