// app/api/stt/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { SpeechConfig, AudioConfig, SpeechRecognizer } from '@azure/cognitiveservices-speech-sdk';
import formidable from 'formidable';
import { promises as fs } from 'fs';

export async function POST(req: NextRequest) {
  const form = formidable({});

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return resolve(NextResponse.json({ message: 'Error parsing file', error: err.message }, { status: 500 }));
      }

      //@ts-expect-error
      const audioFile = files?.audio[0];
      const buffer = await fs.readFile(audioFile.filepath);

      const speechConfig = SpeechConfig.fromSubscription(process.env.AZURE_SPEECH_KEY as string, process.env.AZURE_REGION as string);
      const audioConfig = AudioConfig.fromWavFileInput(buffer);
      const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

      recognizer.recognizeOnceAsync(
        result => {
          resolve(NextResponse.json({ recognizedText: result.text }));
        },
        error => {
          resolve(NextResponse.json({ message: 'Recognition failed', error: error.message }, { status: 500 }));
        }
      );
    });
  });
}
