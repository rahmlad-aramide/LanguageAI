import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token")?.value;
  const session = await getSession(sessionToken);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.userId;

  try {
    const totalTranslations = await prisma.translation.count({ where: { userId } });
    const documentsCount = await prisma.translation.count({ where: { userId, type: "document" } });
    const recentTranslations = await prisma.translation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return NextResponse.json({
      totalTranslations,
      documentsCount,
      recentTranslations,
      wordsThisWeek: totalTranslations * 50, // Mock word count
      mostUsedLanguage: "Multiple",
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
