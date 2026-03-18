"use client";

import React, { useState, useEffect } from "react";
import { Button } from "..";
import { useNotification } from "../../contexts";
import { motion } from "framer-motion";

interface QuizQuestion {
  question: string;
  answer: string;
  options: string[];
}

export const DailyLearning: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { notify } = useNotification();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("/api/learning/daily");
        const data = await response.json();
        if (response.ok) {
          setQuiz(data.quiz);
        }
      } catch (error) {
        console.error("Failed to fetch daily quiz", error);
      }
    };
    fetchQuiz();
  }, []);

  const handleAnswer = (option: string) => {
    if (option === quiz[currentIndex].answer) {
      setScore(score + 1);
      notify("Correct!", "success");
    } else {
      notify(`Wrong! The correct answer was: ${quiz[currentIndex].answer}`, "error");
    }

    if (currentIndex + 1 < quiz.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (quiz.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4 text-primary">Daily Learning Mode</h3>
        <p className="text-gray-500">Translate some texts first to generate your personalized daily quiz!</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-8 text-center bg-white rounded-xl shadow-md border-2 border-primary"
      >
        <h3 className="text-3xl font-bold mb-4 text-primary">Quiz Completed!</h3>
        <p className="text-xl mb-6 font-medium text-gray-700">Your Score: <span className="text-primary">{score}</span> / {quiz.length}</p>
        <Button onClick={() => { setCurrentIndex(0); setScore(0); setShowResult(false); }} className="px-8">
            Try Again
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800">Daily Quiz</h3>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
          Question {currentIndex + 1} of {quiz.length}
        </span>
      </div>

      <div className="mb-10">
        <p className="text-sm text-gray-400 uppercase tracking-wider mb-2 font-bold">Translate this:</p>
        <h4 className="text-3xl font-semibold text-gray-900 leading-tight">&quot;{quiz[currentIndex].question}&quot;</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quiz[currentIndex].options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(option)}
            className="p-5 text-left border-2 border-gray-100 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 font-medium text-gray-700 shadow-sm"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
