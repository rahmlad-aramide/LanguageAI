import { NextApiResponse } from "next";
import {
  translateDocument,
  getTranslatedDocumentUrl,
} from "@/app/[locale]/utils/azureService";
import { NextRequest, NextResponse } from "next/server";
import generateUniqueId from "generate-unique-id";

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = await req.formData();
    const file = body.get("file") as File;
    const from = body.get("from") as string;
    const to = body.get("to") as string;
    const uid = generateUniqueId({
      length: 5,
    });
    const fileName = `${uid}_${file.name}`;

    try {
      const translateDocumentRes = await translateDocument(
        file,
        from,
        to,
        fileName,
      );
      console.log("translateDocumentRes", translateDocumentRes);
      const translatedDocumentUrl = await getTranslatedDocumentUrl(fileName);
      console.log("getTranslatedDocumentUrl", getTranslatedDocumentUrl);
      return NextResponse.json(translatedDocumentUrl, {
        status: 200,
      });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Failed to translate the document." },
        {
          status: 500,
        },
      );
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
