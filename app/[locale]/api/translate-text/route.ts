import { NextApiResponse } from "next";
import { translateText } from "@/app/[locale]/utils/azureService";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = await req.json();
    const { text, from, to } = body;
    try {
      const translatedText = await translateText({ text, from, to });
      return NextResponse.json(translatedText, {
        status: 200,
      });
    } catch (error: any) {
      console.log("translateText Error", error);
      return NextResponse.json(
        { error: error.message || "Failed to translate the texts." },
        {
          status: 500,
        },
      );
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
