'use client'
import React, { useRef, useState } from 'react';

export default function TTSPlayer() {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleTextToSpeech = async () => {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: 'Hello, this is a test for text to speech' }),
    });

    const data = await response.json();
    const audioBlob = new Blob([data.audioData], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);

    setAudioSrc(audioUrl);
  };

  return (
    <div>
      <button onClick={handleTextToSpeech}>Generate Speech</button>
      {audioSrc && (
        <div>
          <audio ref={audioRef} src={audioSrc} />
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleStop}>Stop</button>
        </div>
      )}
    </div>
  );
}
