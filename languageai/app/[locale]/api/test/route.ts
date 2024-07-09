import { mainTranslator } from "@/app/[locale]/utils/azureService";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const translateDocumentRes = await mainTranslator();
//     console.log("translateDocumentRes", translateDocumentRes);
//     return NextResponse.json(translateDocumentRes, {
//       status: 200,
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message || "Failed to translate the document." },
//       {
//         status: 500,
//       }
//     );
//   }
// }

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = await req.formData();
  const file = body.get("document") as File;
  const from = body.get("from") as string;
  const to = body.get("to") as string;

  try {
    const translateDocumentRes = await mainTranslator(file, from, to);
    console.log("translateDocumentRes in post", translateDocumentRes);

    res.setHeader("Content-Type", "text/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="translated.html"'
    );
    //   return res.status(200).send(translateDocumentRes);
    return res.send(translateDocumentRes);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to translate the document." },
      {
        status: 500,
      }
    );
  }
}
