"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "..";
import { useNotification } from "../../contexts";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

interface Message {
  id: string;
  message: string;
  translatedText: string;
  isUser: boolean;
}

export const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/en/api/chat");
        const data = await response.json();
        if (response.ok) setMessages(data);
      } catch (error) {
        console.error("Failed to fetch chat history", error);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const userMsg = input;
    setInput("");

    try {
      // 1. Translate user message (Mocking real-time translation)
      const transRes = await fetch("/en/api/translate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMsg, from: "en", to: "fr" }),
      });
      const translatedText = await transRes.json();

      // 2. Save user message
      const saveRes = await fetch("/en/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, translatedText, isUser: true }),
      });
      const savedMsg = await saveRes.json();
      setMessages((prev) => [...prev, savedMsg]);

      // 3. Simulate bot response
      setTimeout(async () => {
        const botMsg = "I received your message: " + translatedText;
        const botTransRes = await fetch("/en/api/translate-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: botMsg, from: "en", to: "fr" }),
        });
        const botTranslated = await botTransRes.json();

        const botSaveRes = await fetch("/en/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: botMsg, translatedText: botTranslated, isUser: false }),
        });
        const savedBotMsg = await botSaveRes.json();
        setMessages((prev) => [...prev, savedBotMsg]);
      }, 1000);

    } catch (error) {
      notify("Failed to send message", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-2xl mx-auto">
      <div className="bg-primary p-4 text-white font-bold flex items-center gap-2">
        <FaRobot /> Live Chat Translation
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.isUser ? "bg-primary text-white rounded-tr-none" : "bg-gray-100 text-gray-800 rounded-tl-none"}`}>
              <div className="flex items-center gap-2 mb-1 text-[10px] opacity-70 uppercase font-bold">
                {msg.isUser ? <FaUser /> : <FaRobot />} {msg.isUser ? "You" : "Translator Bot"}
              </div>
              <p className="text-sm font-medium">{msg.message}</p>
              <div className="mt-2 pt-2 border-t border-black/10 text-xs italic">
                {msg.translatedText}
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message to translate..."
          className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
        />
        <Button type="submit" disabled={loading} className="rounded-xl px-4 py-2">
          <FaPaperPlane />
        </Button>
      </form>
    </div>
  );
};
