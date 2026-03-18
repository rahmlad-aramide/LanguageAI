"use client";

import { useState, useRef, useCallback } from "react";
import Tesseract from "tesseract.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotification } from "@/src/contexts";
import { translateText } from "@/app/[locale]/api";
import { FaCamera, FaUpload, FaSpinner } from "react-icons/fa";

export const ImageTranslation = () => {
  const [image, setImage] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        performOCR(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const performOCR = async (imageSrc: string) => {
    setLoading(true);
    setOcrText("");
    setTranslatedText("");
    try {
      const result = await Tesseract.recognize(imageSrc, "eng+fra+spa+deu+chi_sim");
      setOcrText(result.data.text);
      notify("Text extracted from image!", "success");

      // Auto-translate to English if not already
      const translated = await translateText({
        text: result.data.text,
        from: "auto",
        to: "en"
      });
      setTranslatedText(translated);
    } catch (error) {
      notify("OCR failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Image & Camera Translation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload or Capture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
              {image ? (
                <img src={image} alt="Selected" className="max-w-full max-h-full object-contain" />
              ) : (
                <FaCamera className="text-gray-300 text-5xl" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <Button onClick={() => fileInputRef.current?.click()} className="flex gap-2">
              <FaUpload /> Choose Image
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Extracted Text</h3>
              <div className="mt-1 p-3 bg-gray-100 rounded min-h-[100px] text-sm">
                {loading ? <FaSpinner className="animate-spin" /> : ocrText || "Waiting for image..."}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Translation (to English)</h3>
              <div className="mt-1 p-3 bg-primary/10 rounded min-h-[100px] text-sm font-medium">
                {loading ? <FaSpinner className="animate-spin" /> : translatedText || "Translation will appear here..."}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
