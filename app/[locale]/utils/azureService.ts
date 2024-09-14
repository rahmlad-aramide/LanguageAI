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
  fileName: string,
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
  fileName: string,
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
      translatedBlobName,
    );

    return translatedBlobUrl;
  } catch (error) {
    console.error("Error in document translation:", error);
    throw error;
  }
};

export const getTranslatedDocumentUrl = async (
  fileName: string,
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
    },
  );

  return response.data[0].translations[0].text;
  // return response.data[0].translations[0].text;
};

