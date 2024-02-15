import Image from "next/image";
// import { Button } from "./shared/Button";
import hero from "../assets/hero.png";
import avatars from "../assets/avatars.png";
import stars from "../assets/stars.png";
import { Button } from ".";

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="pt-8 md:pt-16 space-y-10 flex flex-col md:flex-row  w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto"
    >
      <div className="w-full md:w-1/2 flex flex-col items-start gap-10 ml-0 md:ml-5">
        <div className="flex flex-col w-full">
          <h1 className="clamped-h1 font-semibold leading-[2.8125rem] md:leading-[3.5rem] lg:leading-[4.5rem] mb-6 text-[#1F0610] text-center md:text-left max-w-[20ch] mx-auto">
            Empowering Global Communication and Language Mastery
          </h1>
          <p className="text-sm md:text-xl text-[#1F0610]/80 text-center md:text-left max-w-[38ch] md:max-w-full mx-auto">
            With Language.ai, Translate with Precision, Learn with Passion,
            Connect with the World.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-[calc(100%_-_16px)] sm:w-[calc(100%_-_28px)] md:w-fit mx-auto md:ml-0">
          <Button className="font-bold w-full md:w-fit max-w-sm mx-auto text-center">
            Translate Your Words
          </Button>
          <Button
            variant="text"
            className="underline underline-offset-4 font-semibold w-full md:w-fit text-center"
          >
            Or drop a file
          </Button>
        </div>
        <div className="flex flex-col w-full">
          <hr className="w-full h-[0.5px] bg-[#1f0610] border-0 mb-4 opacity-50 md:opacity-100" />
          <div className="flex gap-1 sm:gap-2 items-center justify-center md:justify-start">
            <Image width={152} height={40} src={avatars} alt="Avatars" />
            <div className="flex flex-col font-medium text-xs md:text-base">
              <span className="flex gap-0 sm:gap-2 justify-start items-center font-semibold">
                <Image
                  width={116}
                  height={20}
                  src={stars}
                  alt="Star"
                  className="w-full h-fit scale-90 md:scale-100 -ml-1.5"
                />
                5.0
              </span>
              from 120+ reviews
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-end">
        <Image
          src={hero}
          width={1341}
          height={1168}
          alt="A 3 by 3 grid of shapes and images"
          className="w-full h-auto mr-0 md:-mr-10"
        />
      </div>
    </section>
  );
};
