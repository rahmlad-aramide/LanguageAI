"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal, useNotification } from "@/src/contexts";

interface CorrectionModalProps {
  originalTranslation: string;
}

export const CorrectionModal = ({ originalTranslation }: CorrectionModalProps) => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModal();
  const { notify } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/corrections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalTranslation,
          suggestedTranslation: suggestion,
        }),
      });

      if (response.ok) {
        notify("Thank you for your suggestion!", "success");
        closeModal();
      } else {
        const data = await response.json();
        notify(data.error || "Failed to submit suggestion", "error");
      }
    } catch (error) {
      notify("Failed to submit suggestion", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md w-full bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Suggest a Correction</h2>
      <p className="text-sm text-gray-600 mb-4">
        Original: <span className="italic">&quot;{originalTranslation}&quot;</span>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="suggestion">Your Translation</Label>
          <Input
            id="suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Enter a better translation..."
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};
