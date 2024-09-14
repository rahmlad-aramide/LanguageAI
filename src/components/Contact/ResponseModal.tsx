"use client";
import Image from "next/image";
import thumb from "@/src/assets/thumbs.gif";
import { AlertIcon } from "@/src/assets/svg";

export const ResponseModal: React.FC<{
  successful: boolean;
  name: string;
}> = ({ successful, name }) => {
  return (
    <>
      <h1 className="text-center flex justify-center">
        {successful ? (
          <Image
            src={thumb}
            width={150}
            height={135}
            className="w-[100px] h-[100px]"
            alt="✨"
          />
        ) : (
          <AlertIcon className="w-[80px] h-[80px]" />
        )}
      </h1>
      <h2 className="font-semibold text-center text-3xl mb-4">
        {successful ? "Success!" : "Oops!"}
      </h2>
      {successful ? (
        <p className="my-2 text-center">
          Thanks for reaching out, {name}! We&apos;ve received your message, and
          it&apos;s getting the attention it deserves. Stay tuned—our response
          will be with you shortly.
        </p>
      ) : (
        <p className="my-2 text-center">
          Something went wrong {name}. Give it another go in a little while!
        </p>
      )}
    </>
  );
};
