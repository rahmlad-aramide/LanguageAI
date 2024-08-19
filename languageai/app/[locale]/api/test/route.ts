import { mainTranslator, mainTranslatorNew, mainTranslatorOld } from "@/app/[locale]/utils/azureService";
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

import { promises as fs } from 'fs'

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = await req.formData();
  const file = body.get("document") as File;
  const from = body.get("from") as string;
  const to = body.get("to") as string;

  console.log('uploaded file', file)
  // console.log('uploaded file path', file?.filePath)
  // Replace 'filePath' with the path to your file
const filePath = "C:/Users/USER/Desktop/index.txt";
// Read the contents of the file asynchronously
const fileContent = await fs.readFile(filePath, 'utf8');
// const fileContent = await readFileAsync(filePath, 'utf8');

try {
  // const translateDocumentRes = await mainTranslatorOld(file, fileContent, from, to);
  const translateDocumentRes = await mainTranslatorNew(filePath, from, to);
  console.log("========filecontent", fileContent);
    console.log("translateDocumentRes in post", translateDocumentRes);

    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader(
    //   "Content-Disposition",
    //   'attachment; filename="document.pdf"'
    // );
    //   return res.status(200).send(translateDocumentRes);
    return res.send(translateDocumentRes);
  } catch (error: any) {
    return NextResponse.json(
      { error: error || "Failed to translate the document." },
      {
        status: 500,
      }
    );
  }
}
