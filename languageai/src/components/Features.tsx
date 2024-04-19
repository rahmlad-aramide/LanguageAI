import Image from "next/image";
import feature1 from "../assets/feature1.png";
import feature2 from "../assets/feature2.png";
import feature3 from "../assets/feature3.png";
import feature4 from "../assets/feature4.png";
export const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="pt-10 mt-10 pb-[4.5rem] bg-[#FFF9FB] w-full"
    >
      <div className="flex flex-col w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto">
        <h2 className="font-semibold text-lg md:text-4xl text-center text-[#101828] mx-4">
          We offer an array of cutting-edge features
        </h2>
        <p className="text-sm md:text-xl text-center text-[#475467] px-4 pt-3">
          At Language AI, we take pride in offering features designed to
          revolutionize your language experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-y-8 md:gap-8 pt-20">
          <div className="col-span-1 md:col-span-4 shadow-custom pb-4 md:pb-0 md:h-[428px] mt-8 rounded-lg">
            <div className="flex justify-end">
              <Image
                src={feature1}
                alt="Text-to-speech"
                width="372"
                height="304"
                className="rounded-tr-lg w-auto"
              />
            </div>
            <h3 className="font-semibold text-base md:text-xl text-[#101828] mx-4 md:mx-10">
              Text-to-Speech Functionality
            </h3>
            <p className="text-xs md:text-sm text-[#475467] mx-4 md:mx-10 pt-2">
              Convert written text into spoken words, allowing for auditory
              comprehension of text content.
            </p>
          </div>
          <div className="col-span-6 shadow-custom md:mb-8 rounded-lg pb-4">
            <div className="flex justify-center">
              <Image
                src={feature2}
                alt="Text-to-speech"
                width="576"
                height="1354"
                className="rounded-tr-lg w-auto md:min-h-[316px]"
              />
            </div>
            <h3 className="font-semibold text-base md:text-xl text-[#101828] mx-4 md:mx-10">
              Translation of Over 50 Languages
            </h3>
            <p className="text-xs md:text-sm text-[#475467] mx-4 md:mx-10 pt-2">
              Translate text content between more than 50 languages, breaking
              down language barriers and enabling communication across diverse
              linguistic landscapes.
            </p>
          </div>
          <div className="col-span-6 shadow-custom mb-8 rounded-lg pb-4 md:pb-0">
            <div className="flex">
              <h3 className="font-semibold text-base md:text-xl self-end text-[#101828] mx-4 md:mx-10 max-w-[15ch]">
                Ability to Copy the Output and Paste Anywhere
              </h3>
              <div className="flex justify-end">
                <Image
                  src={feature3}
                  alt="Text-to-speech"
                  width="475"
                  height="304"
                  className="rounded-tr-lg w-auto"
                />
              </div>
            </div>

            <p className="text-xs md:text-sm text-[#475467] mx-4 md:mx-10 pt-2">
              Translate text content between more than 50 languages, breaking
              down language barriers and enabling communication across diverse
              linguistic landscapes.
            </p>
          </div>
          <div className="col-span-4 shadow-custom pb-4 md:pb-0 md:h-[428px] -mt-8 rounded-lg">
            <div className="flex justify-center">
              <Image
                src={feature4}
                alt="Text-to-speech"
                width="417"
                height="300"
                className="rounded-tr-lg scale-90"
              />
            </div>
            <h3 className="font-semibold text-base md:text-xl text-[#101828] mx-4 md:mx-10 -mt-12">
              Convenient Drag-and-Drop Feature for File Translation
            </h3>
            <p className="text-xs md:text-sm text-[#475467] mx-4 md:mx-10 pt-2">
              Streamline the translation process by simply dragging and dropping
              files containing text content onto the platform, eliminating the
              need for manual input and enhancing efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
