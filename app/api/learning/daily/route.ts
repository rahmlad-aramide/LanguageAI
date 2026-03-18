import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token")?.value;
  const session = await getSession(sessionToken);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = session.userId;

  try {
    // Fetch recent translations to generate a "Daily Quiz"
    const translations = await prisma.translation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    if (translations.length === 0) {
        return NextResponse.json({
            message: "No translations found to generate quiz.",
            quiz: []
        }, { status: 200 });
    }

    const quiz = translations.map(t => ({
        question: t.inputText,
        answer: t.outputText,
        options: [t.outputText, "Alternative A", "Alternative B", "Alternative C"].sort(() => Math.random() - 0.5)
    }));

    return NextResponse.json({ quiz }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch daily lesson" }, { status: 500 });
  }
}
