// import { mainTranslator, mainTranslatorNew, mainTranslatorOld } from "@/app/[locale]/utils/azureService";
// import { NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";

// // export async function GET() {
// //   try {
// //     const translateDocumentRes = await mainTranslator();
// //     console.log("translateDocumentRes", translateDocumentRes);
// //     return NextResponse.json(translateDocumentRes, {
// //       status: 200,
// //     });
// //   } catch (error: any) {
// //     return NextResponse.json(
// //       { error: error.message || "Failed to translate the document." },
// //       {
// //         status: 500,
// //       }
// //     );
// //   }
// // }

// import { promises as fs } from 'fs'
// import { getMimeType } from "../../utils/helper";

// export async function POST(req: NextRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }
//   // const body = await req.json();
//   // const { filePath, from, to } = body;

//   const body = await req.formData();
//     const file = body.get("file") as File;
//     const from = body.get("from") as string;
//     const to = body.get("to") as string;

//     const FileInfo = {
//       fileType: file.type,
//       fileName: file.name,
//       fileSize: file.size,
//       fileBuffer: file.arrayBuffer,
//     }
//     console.log("FileInfo:",FileInfo)
//     // const uid = generateUniqueId({
//     //   length: 5,
//     // });
//     // const fileName = `${uid}_${file.name}`;

//   // console.log('uploaded file path', filePath)
//   // console.log('uploaded file path', file?.filePath)
//   // Replace 'filePath' with the path to your file

// // const filePath = "C:/Users/USER/Desktop/document.csv";

// // Read the contents of the file asynchronously
// // const fileContent = await fs.readFile(filePath, 'utf8');
// // const contentType = getMimeType(filePath);
// // const fileContent = await readFileAsync(filePath, 'utf8');

// try {
//   // const translateDocumentRes = await mainTranslatorOld(file, fileContent, from, to);
//   const translateDocumentRes = await mainTranslatorNew(file, from, to);
//   // console.log("== filecontent ==", fileContent);
//     console.log("translateDocumentRes in post", translateDocumentRes);

//     // res.setHeader("Content-Type", "application/pdf");
//     // res.setHeader(
//     //   "Content-Disposition",
//     //   'attachment; filename="document.pdf"'
//     // );
//     //   return res.status(200).send(translateDocumentRes);
//     // return res.send(translateDocumentRes);


//     // return NextResponse.json(
//     //   { data: translateDocumentRes },
//     //   {
//     //     status: 200,
//     //   }
//     // );

//     return new NextResponse(translateDocumentRes, {
//       status: 200,
//       headers: {
//         'Content-Type': `${file.type}`, // Adjust this based on your actual content type
//       },
//     });

//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.error || "Failed to translate the document." },
//       {
//         status: 500,
//       }
//     );
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle it ourselves
  },
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const from = formData.get('from') as string;
  const to = formData.get('to') as string;

  if (!file) {
    return NextResponse.json({ message: 'No file selected' }, { status: 400 });
  }

  const DOCUMENT_TRANSLATOR_ENDPOINT = 'https://language-a-i.cognitiveservices.azure.com';
  const TRANSLATOR_KEY = 'a38915a570704e338aafb2fd6d4c9725';
  const endpoint = DOCUMENT_TRANSLATOR_ENDPOINT;
  const path = '/translator/document:translate';
  const url = `${endpoint}${path}`;

  const headers = {
    'Ocp-Apim-Subscription-Key': TRANSLATOR_KEY,
  };

  const params = {
    sourceLanguage: from,
    targetLanguage: to,
    'api-version': '2024-05-01',
  };

  const uploadFormData = new FormData();
  uploadFormData.append('document', file);

  try {
    const response = await axios.post(url, uploadFormData, {
      headers,
      params,
      responseType: 'blob',
    });

    const responseData = await response.data;
    // const translatedFile = new Blob([blob], { type: response.headers['content-type'] });
    // const translatedFileUrl = URL.createObjectURL(translatedFile);

    return new NextResponse(responseData, {
      headers: {
        'Content-Disposition': `attachment; filename=Translated_${file.name}`,
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error during translation:', error);
    return NextResponse.json({ message: 'Translation failed' }, { status: 500 });
  }
}
