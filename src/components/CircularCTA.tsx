"use client";
import Image from "next/image";
import text from "../assets/circle-text.png";
import play from "../assets/play.png";
import Link from "next/link";
import { useLocale } from "next-intl";

export const CircularCTA: React.FC = () => {
  const locale = useLocale();
  return (
    <div className="flex justify-center items-center h-fit py-2 -mt-12 md:-mb-8 xs:-mt-16 ml-0 md:ml-20 lg:ml-0 scale-[0.6]">
      <Link href={`${locale}/demo`}>
        <Image
          src={play}
          alt="Watch Demo"
          className="relative cursor-pointer z-10 hover:scale-90 active:scale-100 transition duration-200"
        />
      </Link>
      <Image
        src={text}
        alt="Translate your words/documents below."
        className="absolute animate-spin-slow hover:animate-none"
      />
    </div>
  );
};
