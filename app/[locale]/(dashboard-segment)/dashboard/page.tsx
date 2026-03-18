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
  const [userName, setUserName] = useState("User");
  const [stats, setStats] = useState({
    totalTranslations: 0,
    wordsThisWeek: 0,
    documentsCount: 0,
    mostUsedLanguage: "N/A",
  });
  const [recentTranslations, setRecentTranslations] = useState<any[]>([]);

  useEffect(() => {
    const storedName = localStorage.getItem("user_name");
    if (storedName) setUserName(storedName);

    const fetchStats = async () => {
      try {
        const response = await fetch("/en/api/user/stats");
        const data = await response.json();
        if (response.ok) {
          setStats({
            totalTranslations: data.totalTranslations,
            wordsThisWeek: data.wordsThisWeek,
            documentsCount: data.documentsCount,
            mostUsedLanguage: data.mostUsedLanguage,
          });
          setRecentTranslations(data.recentTranslations);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
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
          {t("Welcome", { name: userName })}
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

          {recentTranslations.map((item) => (
            <div
              key={item.id}
              className="p-4 flex justify-between text-sm border-b last:border-none hover:bg-gray-50 transition"
            >
              <span className="truncate w-[40%]">{item.inputText}</span>
              <span>{item.sourceLanguage} → {item.targetLanguage}</span>
              <span className="text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
          {recentTranslations.length === 0 && (
            <div className="p-8 text-center text-gray-400">No recent translations found.</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
