import axios from "axios";
import { BlobServiceClient } from "@azure/storage-blob";
import { Readable } from "stream";

interface TranslationResponse {
  id: string;
  status: string;
  createdDateTime: string;
  lastActionDateTime: string;
  error: string | null;
}

export interface BaseTranslateProps {
  from: string;
  to: string;
}
export interface TranslateProps extends BaseTranslateProps {
  text: string;
}
export interface TranslateDocumentProps extends TranslateProps {
  file: File[];
}

const storageAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME as string;
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING as string;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME as string;
const outputContainerName = process.env
  .AZURE_STORAGE_OUTPUT_CONTAINER_NAME as string;
const documentTranslatorEndpoint = process.env
  .DOCUMENT_TRANSLATOR_ENDPOINT as string;
const textTranslatorEndpoint = process.env.TEXT_TRANSLATOR_ENDPOINT as string;
const translatorKey = process.env.TRANSLATOR_KEY as string;
const subscriptionRegion = process.env.SUBSCRIPTION_REGION as string;

export const uploadDocument = async (
  file: File,
  fileName: string
): Promise<string> => {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  // Convert file to stream
  const arrayBuffer = await file.arrayBuffer();
  const stream = Readable.from(Buffer.from(arrayBuffer));
  await blockBlobClient.uploadStream(stream);

  return blockBlobClient.url;
};

export const translateDocument = async (
  document: File,
  from: string,
  to: string,
  fileName: string
): Promise<any> => {
  const endpoint = documentTranslatorEndpoint;
  const route = "/translator/document:translate";

  const formData = new FormData();
  formData.append("document", document);

  try {
    const response = await axios.post(`${endpoint}${route}`, formData, {
      params: {
        sourceLanguage: from,
        targetLanguage: to,
        "api-version": "2024-05-01",
        type: "application/pdf",
      },
      headers: {
        "Ocp-Apim-Subscription-Key": translatorKey,
        "Ocp-Apim-Subscription-Region": subscriptionRegion,
        "Content-type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    });

    const translatedBlobName = `LanguageAI_${fileName}`;
    const translatedBlobUrl = await uploadDocument(
      response.data,
      translatedBlobName
    );

    return translatedBlobUrl;
  } catch (error) {
    console.error("Error in document translation:", error);
    throw error;
  }
};
export const translateDocument1 = async (
  documentUrl: string,
  from: string,
  to: string,
  fileName: string
): Promise<any> => {
  const response = await axios.post(
    `${documentTranslatorEndpoint}/translator/text/batch/v1.1/batches`,
    {
      inputs: [
        {
          storageType: "File",
          source: {
            sourceUrl: documentUrl,
            storageSource: "AzureBlob",
            language: from, // optional
          },
          targets: [
            {
              targetUrl: `https://${storageAccountName}.blob.core.windows.net/${outputContainerName}/`,
              // targetUrl: `https://${storageAccountName}.blob.core.windows.net/${outputContainerName}?sp=racw&st=2024-06-17T13:23:27Z&se=2024-06-17T21:23:27Z&sv=2022-11-02&sr=c&sig=U0NM42XjmhQ25EJGKe4IpYcYRbcQYtzzIbZKXEL%2FIYE%3D`,
              storageSource: "AzureBlob",
              category: "general",
              language: to,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "Ocp-Apim-Subscription-Key": translatorKey,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getTranslatedDocumentUrl = async (
  fileName: string
): Promise<string> => {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient =
    blobServiceClient.getContainerClient(outputContainerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  console.log("blcokblock url", blockBlobClient.url);
  return blockBlobClient.url;
};

export const translateText = async ({
  text,
  from,
  to,
}: TranslateProps): Promise<string> => {
  let params = new URLSearchParams();
  params.append("api-version", "3.0");
  params.append("from", from);
  params.append("to", to);

  const response = await axios.post(
    `${textTranslatorEndpoint}/translate`,
    [{ text }],
    {
      headers: {
        "Ocp-Apim-Subscription-Key": translatorKey,
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Region": subscriptionRegion,
      },
      params,
    }
  );

  return response.data[0].translations[0].text;
  // return response.data[0].translations[0].text;
};

import {
  DocumentTranslateParameters,
  isUnexpected,
} from "@azure-rest/ai-translation-document";
import createClient from "@azure-rest/ai-translation-document";

const endpoint = documentTranslatorEndpoint;
const apiKey = translatorKey;
const credentials = { key: apiKey ?? "" };

import { promises as fs } from 'fs';
export const mainTranslator = async(document: File,
  from: string,
  to: string,):Promise<any> => {
  console.log("== Synchronous Document Translation ==");

  let path = "C:/Users/USER/Desktop/document.pdf";
  const client = createClient(endpoint, credentials);
  const formData = new FormData();
  const fileContent = await fs.readFile('', 'utf8');
  formData.append("document", document);
  formData.get("document")

  const options: DocumentTranslateParameters = {
    queryParameters: {
      targetLanguage: "ar-AR",
    },
    contentType: "multipart/form-data",
    // body: [formData],
    body: [
      {
        name: "document",
        body: fileContent,
        filename: "document.pdf",
        contentType: "application/pdf",
      },
    ],
  };

  console.log({"body of the document": {
    name: "document",
    body: document,
    filename: document.name,
    contentType: "application/pdf",
  },})

  const response = await client.path("/document:translate").post(options);
  console.log('response from server:', response)
  if (isUnexpected(response)) {
    throw response.body;
  }
  console.log(
    "Response code: " + response.status + ", Response body: " + response.body
  );

  // mainTranslator().catch((err) => {
  //   console.error(err);
  // });

  return response.body;
}


export const mainTranslatorOld = async(document: File,
  fileContent: any,
  from: string,
  to: string,):Promise<any> => {
  console.log("== Synchronous Document Translation Starts ==");

  const client = createClient(endpoint, credentials);
  const formData = new FormData();
  formData.append("document", document);

  const options: DocumentTranslateParameters = {
    queryParameters: {
      targetLanguage: "ar-AR",
    },
    contentType: "multipart/form-data",
    body: [
      {
        name: "document",
        // body: fileContent,
        // body: "This is a test.",
        body: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <p>I am the test document</p>
            <p>Translation successful</p>
        </body>
        </html>
        `,
        filename: "document.pdf",
        contentType: "application/pdf",
      },
    ],
  };

  const response = await client.path("/document:translate").post(options);
  if (isUnexpected(response)) {
    throw response.body;
  }
  console.log(
    "Response code: " + response.status + ", Response body: " + response.body
  );
  console.log("== Synchronous Document Translation Ends ==");

  // mainTranslator().catch((err) => {
  //   console.error(err);
  // });

  return response.body;
}

import { readFile } from 'fs/promises';
// import { createClient, DocumentTranslateParameters, isUnexpected } from '@azure/ai-language-text';

export const mainTranslatorNew = async (
  filePath: string,
  from: string,
  to: string,
): Promise<any> => {
  console.log("== Synchronous Document Translation Starts ==");

  const client = createClient(endpoint, credentials);

  // Read the file content
  const fileContent = await readFile(filePath);

  // Get the file name and extension
  const fileName = filePath.split('/').pop() || 'document';
  const fileExtension = fileName.split('.').pop() || '';
  console.log("File name", fileName, 'fileExtension', fileExtension, "filePath", filePath)

  // Determine the content type based on the file extension
  let contentType = 'application/octet-stream'; // default
  if (fileExtension === 'txt') contentType = 'text/plain';
  if (fileExtension === 'html') contentType = 'text/html';
  if (fileExtension === 'pdf') contentType = 'application/pdf';
  // Add more content types as needed

  const options: DocumentTranslateParameters = {
    queryParameters: {
      targetLanguage: 'hi' //to,
    },
    contentType: "multipart/form-data",
    // contentType,
    body: [
      {
        name: "document",
        body: fileContent,
        filename: fileName,
        contentType: contentType,
      },
    ],
  };

  try {
    const response = await client.path("/document:translate").post(options);
    if (isUnexpected(response)) {
      throw response.body;
    }
    console.log(
      "Response code: " + response.status + ", Response body: " + response.body
    );
    console.log("== Synchronous Document Translation Ends ==");
    return response.body;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
    // return error;
  }
}