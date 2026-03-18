import { Flashcards } from "@/src/components/Learning/Flashcards";
import { DailyLearning } from "@/src/components/Learning/DailyLearning";

export default function LearningPage() {
  return (
    <div className="p-6 space-y-12">
      <Flashcards />
      <DailyLearning />
    </div>
  );
}
