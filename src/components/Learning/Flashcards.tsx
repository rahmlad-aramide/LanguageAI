"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "..";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export const Flashcards: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("/api/learning/flashcards");
        const data = await response.json();
        if (response.ok && data.length > 0) {
          setCards(data);
        } else {
            // Fallback default cards
            setCards([
                { id: "1", front: "Hello", back: "Bonjour" },
                { id: "2", front: "Thank you", back: "Merci" },
                { id: "3", front: "Goodbye", back: "Au revoir" },
            ]);
        }
      } catch (error) {
        console.error("Failed to fetch flashcards", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  if (loading) return <div>Loading cards...</div>;

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-gray-50 rounded-2xl shadow-inner max-w-xl mx-auto">
      <h3 className="text-3xl font-bold text-primary">Language Flashcards</h3>

      <div className="relative w-full h-64 perspective-1000">
        <AnimatePresence mode="wait">
          {cards.length > 0 ? (
            <motion.div
              key={currentIndex + (isFlipped ? "-back" : "-front")}
              initial={{ rotateY: isFlipped ? -180 : 0, opacity: 0 }}
              animate={{ rotateY: isFlipped ? 180 : 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full h-full bg-white rounded-3xl shadow-xl flex items-center justify-center cursor-pointer p-6 border-2 border-primary/10"
            >
              <p className="text-4xl font-semibold text-center text-gray-800">
                {isFlipped ? cards[currentIndex]?.back : cards[currentIndex]?.front}
              </p>
            </motion.div>
          ) : (
            <div className="w-full h-full bg-white rounded-3xl shadow-xl flex items-center justify-center p-6 border-2 border-primary/10">
              <p className="text-gray-400">No cards available</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6">
        <Button onClick={handlePrev} variant="outline" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
          <FaChevronLeft />
        </Button>
        <span className="text-lg font-medium text-gray-600">
          {currentIndex + 1} / {cards.length}
        </span>
        <Button onClick={handleNext} variant="outline" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
          <FaChevronRight />
        </Button>
      </div>

      <p className="text-sm text-gray-400 italic">Tip: Click the card to flip!</p>
    </div>
  );
};
