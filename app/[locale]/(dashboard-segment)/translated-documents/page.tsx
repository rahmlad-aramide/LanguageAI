"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaFileDownload, FaTrashAlt, FaFileAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function TranslatedDocumentsPage() {
  const t = useTranslations("TranslatedDocuments");

  const documents = [
    {
      id: 1,
      name: "Business Proposal.pdf",
      lang: "English → French",
      words: 1200,
      date: "2025-10-10",
    },
    {
      id: 2,
      name: "Legal Contract.docx",
      lang: "English → Spanish",
      words: 2500,
      date: "2025-10-05",
    },
    {
      id: 3,
      name: "Technical Guide.txt",
      lang: "German → English",
      words: 800,
      date: "2025-09-28",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end w-full"
      >
        <Button className="mt-4 md:mt-0 flex items-center gap-2">
          <FaFileAlt /> {t("UploadNewDocument")}
        </Button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t("DocumentsList")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base border-collapse">
                <thead>
                  <tr className="border-b text-gray-500 text-left">
                    <th className="p-3">{t("FileName")}</th>
                    <th className="p-3">{t("LanguagePair")}</th>
                    <th className="p-3">{t("WordCount")}</th>
                    <th className="p-3">{t("Date")}</th>
                    <th className="p-3 text-right">{t("Actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="p-3 font-medium text-gray-800">
                        {doc.name}
                      </td>
                      <td className="p-3">{doc.lang}</td>
                      <td className="p-3">{doc.words.toLocaleString()}</td>
                      <td className="p-3 text-gray-500">{doc.date}</td>
                      <td className="p-3 flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <FaFileDownload />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <FaTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
