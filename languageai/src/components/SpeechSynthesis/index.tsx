import STTRecorder from "./STTRecorder";
import TTSPlayer from "./TTSPlayer";

export default function SpeechSynthesis() {
  return (
    <div className="flex justify-evenly items-center">
      <div>
        <h1>Speech-to-Text Example</h1>
        <STTRecorder />
      </div>
      <div>
        <h1>Text-to-Speech Example</h1>
        <TTSPlayer />
      </div>
    </div>
  );
}
