"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Translation } from "@/src/components";
import { ModalProvider, NotificationProvider } from "@/src/contexts";

export default function TranslationHistory() {
  const t = useTranslations("TranslationHistory");
  const [showHistory, setShowHistory] = useState(true);

  const historyItems = [
    {
      id: 1,
      input: "Hello world",
      output: "Bonjour le monde",
      date: "2025-10-12",
    },
    { id: 2, input: "Good morning", output: "Buenos días", date: "2025-10-11" },
    {
      id: 3,
      input: "How are you?",
      output: "Wie geht’s dir?",
      date: "2025-10-10",
    },
  ];

  return (
    <NotificationProvider>
      <ModalProvider>
        <div className="flex h-full relative p-4 md:p-6 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex-1 transition-all duration-300 ${
              showHistory ? "md:mr-[320px]" : ""
            }`}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{t("StartNewTranslation")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Translation />
              </CardContent>
            </Card>
          </motion.div>

          {/* Collapsible History Panel */}
          <motion.aside
            initial={{ x: 300, opacity: 0 }}
            animate={{
              x: showHistory ? 0 : 300,
              opacity: showHistory ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="hidden md:block fixed right-0 top-24 w-[300px] h-[calc(100vh-6rem)] bg-white border-l shadow-lg overflow-y-auto p-4 z-30"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FaClock className="text-primary" /> {t("History")}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHistory(false)}
                className="text-gray-500"
              >
                <FaChevronRight />
              </Button>
            </div>

            {historyItems.map((item) => (
              <div
                key={item.id}
                className="p-3 border-b hover:bg-gray-50 rounded-lg mb-2 cursor-pointer"
              >
                <p className="text-sm text-gray-700 truncate">{item.input}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            ))}
          </motion.aside>

          {/* Toggle Button (if collapsed) */}
          {!showHistory && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowHistory(true)}
              className="hidden md:flex fixed right-2 top-28 z-40"
            >
              <FaChevronLeft />
            </Button>
          )}
        </div>
      </ModalProvider>
    </NotificationProvider>
  );
}
