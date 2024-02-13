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
      className="pt-48 flex flex-col md:flex-row w-[90%] max-w-6xl mx-auto"
    >
      <div className="w-full md:w-1/2 flex flex-col items-start gap-10 ml-5">
        <div className="flex flex-col">
          <h1 className="clamped-h1 text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] font-semibold leading-[4.5rem] mb-6 text-[#1F0610] text-center md:text-left">
            Empowering Global Communication and Language Mastery
          </h1>
          <p className="text-sm md:text-xl text-[#1F0610]/80 text-center md:text-left">
            With Language.ai, Translate with Precision, Learn with Passion,
            Connect with the World.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="font-bold w-full md:w-fit text-center">
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
          {/* <div aria-label="horizontal line" className="w-full h-[0.5px] bg-[#1F0610]"></div>
            <br /> */}
          <hr className="w-full h-[0.5px] bg-[#1f0610] border-0 mb-4" />
          <div className="flex gap-2 items-center">
            <Image width={152} height={40} src={avatars} alt="Avatars" />
            <div className="flex flex-col font-medium">
              <span className="flex gap-2 items-center font-semibold">
                <Image
                  width={116}
                  height={20}
                  src={stars}
                  alt="Star"
                  className="w-full h-fit"
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
          className="w-full h-auto -mr-10"
        />
      </div>
    </section>
  );
};
