"use client";
import Image from "next/image";
import text from "../assets/circle-text.png";
import play from "../assets/play.png";

export const CircularCTA: React.FC = () => {
  return (
    <div className="hidden md:flex justify-center items-center h-fit py-2 -mb-8 -mt-16 scale-[0.6]">
      <Image
        src={play}
        alt="Watch Demo"
        className="relative cursor-pointer z-10"
      />
      <Image
        src={text}
        alt="Translate your words/documents below."
        className="absolute animate-spin-slow hover:animate-none"
      />
    </div>
  );
};
