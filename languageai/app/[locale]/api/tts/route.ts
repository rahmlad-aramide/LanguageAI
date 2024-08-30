// app/api/tts/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { SpeechConfig, AudioConfig, SpeechSynthesizer } from '@azure/cognitiveservices-speech-sdk';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ message: 'Text is required' }, { status: 400 });
  }

  const speechConfig = SpeechConfig.fromSubscription(process.env.AZURE_SPEECH_KEY as string, process.env.AZURE_REGION as string);
  const audioConfig = AudioConfig.fromAudioFileOutput('output.wav');
  const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

  return new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(
      text,
      result => {
        synthesizer.close();
        resolve(NextResponse.json({ message: 'Synthesis completed', audioData: result.audioData }));
      },
      error => {
        synthesizer.close();
        reject(NextResponse.json({ message: 'Synthesis failed', error: error.message }, { status: 500 }));
      }
    );
  });
}
