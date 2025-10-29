"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { FaUpload, FaPlus, FaLanguage } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import Link from "next/link";

export default function Dashboard() {
  const t = useTranslations("Dashboard");
  const [stats, setStats] = useState({
    totalTranslations: 128,
    wordsThisWeek: 4200,
    documentsCount: 23,
    mostUsedLanguage: "English → French",
  });

  useEffect(() => {
    // Later you can fetch actual data from your backend here
  }, []);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          {t("Welcome", { name: "Olamide" })}
        </h1>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Link href="/translation-history">
            <Button className="flex items-center gap-2">
              <FaPlus /> {t("StartTranslation")}
            </Button>
          </Link>
          <Button variant="outline" className="flex items-center gap-2">
            <FaUpload /> {t("UploadDocument")}
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">
              {t("TotalTranslations")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats.totalTranslations}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">
              {t("MostUsedLanguage")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-lg font-medium">
            <FaLanguage className="text-primary" />
            {stats.mostUsedLanguage}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">
              {t("WordsThisWeek")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats.wordsThisWeek.toLocaleString()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">
              {t("DocumentsCount")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-2xl font-semibold">
            <BsGraphUp className="text-primary" />
            {stats.documentsCount}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Translations Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">
          {t("RecentTranslations")}
        </h2>

        <div className="bg-white border rounded-xl shadow-sm">
          <div className="p-4 border-b text-sm text-gray-500 flex justify-between">
            <span>Input</span>
            <span>Target</span>
            <span>Date</span>
          </div>

          {[
            {
              text: "Hello world",
              lang: "English → French",
              date: "2025-10-10",
            },
            {
              text: "Good morning",
              lang: "English → Spanish",
              date: "2025-10-09",
            },
            {
              text: "Translate this text",
              lang: "English → German",
              date: "2025-10-08",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 flex justify-between text-sm border-b last:border-none hover:bg-gray-50 transition"
            >
              <span className="truncate w-[40%]">{item.text}</span>
              <span>{item.lang}</span>
              <span className="text-gray-500">{item.date}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
