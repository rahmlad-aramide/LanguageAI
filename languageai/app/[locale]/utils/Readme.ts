import * as fs from 'fs';
import * as path from 'path';
import { AzureKeyCredential } from '@azure/core-auth';
import { SingleDocumentTranslationClient, DocumentTranslateContent } from '@azure/ai-translation-document';


//npm install @azure/core-auth @azure/ai-translation-document


async function sampleSingleDocumentTranslation() {
    // create variables for your resource api key, document translation endpoint, and target language
    const key = "<your-api-key>";
    const endpoint = "<your-document-translation-endpoint>";
    const targetLanguage = "{target-language-code}";

    // initialize a new instance of the SingleDocumentTranslationClient object to interact with the synchronous Document Translation feature
    const client = new SingleDocumentTranslationClient(endpoint, new AzureKeyCredential(key));

    // absolute path to your document
    const filePath = "C:/{your-file-path}/document-translation-sample.docx";
    const fileName = path.basename(filePath);
    const fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    console.log(`File for translation: ${fileName}`);

    const fileContents = fs.readFileSync(filePath, 'utf8');
    //or file.files[0]

    const documentContent: [string, string, string] = [fileName, fileContents, fileType];
    const documentTranslateContent = new DocumentTranslateContent({ document: documentContent });

    const responseStream = await client.documentTranslate(documentTranslateContent, targetLanguage);

    // Note: The TypeScript SDK might handle the response differently. 
    // You may need to adjust this part based on the actual return type of documentTranslate.
    const translatedResponse = await streamToString(responseStream);
    console.log(`Translated response: ${translatedResponse}`);
}

// Helper function to convert a ReadableStream to a string
async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}

if (require.main === module) {
    sampleSingleDocumentTranslation().catch(err => console.error(err));
}

// New prompt

import { BlobServiceClient } from '@azure/storage-blob';
import { AzureKeyCredential } from '@azure/core-auth';
import { SingleDocumentTranslationClient, DocumentTranslateContent } from '@azure/ai-translation-document';

async function sampleSingleDocumentTranslation() {
    // Azure Document Translation settings
    const translationKey = "<your-translation-api-key>";
    const translationEndpoint = "<your-document-translation-endpoint>";
    const targetLanguage = "{target-language-code}";

    // Azure Blob Storage settings
    const storageConnectionString = "<your-storage-connection-string>";
    const containerName = "<your-container-name>";

    // Initialize clients
    const translationClient = new SingleDocumentTranslationClient(translationEndpoint, new AzureKeyCredential(translationKey));
    const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Source document details
    const fileName = "document-translation-sample.docx";
    const fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    const fileContents = "... your file contents ..."; // You'd typically read this from a file or receive it from a request

    const documentContent: [string, string, string] = [fileName, fileContents, fileType];
    const documentTranslateContent = new DocumentTranslateContent({ document: documentContent });

    // Translate document
    const responseStream = await translationClient.documentTranslate(documentTranslateContent, targetLanguage);

    // Convert stream to buffer
    const translatedBuffer = await streamToBuffer(responseStream);

    // Upload translated document to Blob storage
    const blobName = `translated_${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(translatedBuffer, translatedBuffer.length);

    console.log(`Translated document uploaded to: ${blockBlobClient.url}`);
}

async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

if (require.main === module) {
    sampleSingleDocumentTranslation().catch(err => console.error(err));
}