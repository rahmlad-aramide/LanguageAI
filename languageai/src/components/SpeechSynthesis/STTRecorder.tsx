'use client'

import React, { useRef, useState } from 'react';

export default function STTRecorder() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStartRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks: Blob[] = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          setRecording(false);
          handleSpeechToText(audioBlob);
        };

        mediaRecorder.start();
        setRecording(true);

        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000); // Stop recording after 5 seconds
      });
    }
  };

  const handleSpeechToText = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await fetch('/api/stt', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setTranscript(data.recognizedText);
  };

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

  return (
    <div>
      <button onClick={handleStartRecording} disabled={recording}>
        {recording ? 'Recording...' : 'Start Recording'}
      </button>

      {audioBlob && (
        <div>
          <audio ref={audioRef} src={URL.createObjectURL(audioBlob)} />
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleStop}>Stop</button>
        </div>
      )}

      {transcript && (
        <div>
          <h3>Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
}
