import Image from "next/image";
import feature1 from "../assets/feature1.webp";
import feature2 from "../assets/feature2.webp";
import feature3 from "../assets/feature3.webp";
import feature4 from "../assets/feature4.webp";
import { useTranslations } from "next-intl";

export const Features: React.FC = () => {
  const t = useTranslations("Features");
  return (
    <section
      id="features"
      className="pt-10 mt-10 pb-[4.5rem] bg-[#FFF9FB] w-full"
    >
      <div className="flex flex-col w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto">
        <h1 className="font-semibold text-lg md:text-4xl text-center text-[#101828] mx-4">
          {t("heading.headingText")}
        </h1>
        <p className="text-sm md:text-xl text-center text-[#475467] px-4 pt-3">
          {t("heading.bodyText")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-y-10 md:gap-8 pt-6 md:pt-20">
          <div className="col-span-1 md:col-span-4 shadow-custom pb-4 md:pb-0 md:h-[428px] mt-8 rounded-lg max-w-[450px] md:max-w-full mx-auto">
            <div className="flex justify-end">
              <Image
                src={feature1}
                alt="Text-to-speech"
                width="372"
                height="304"
                className="rounded-tr-lg"
              /> 
            </div>
            <h3 className="font-semibold text-base md:text-xl text-[#101828] mx-4 md:mx-10">
              {t("gridContents.feature1.headingText")}
            </h3>
            <p className="text-xs md:text-sm text-[#475467] mx-4 md:mx-10 pt-2">
              {t("gridContents.feature2.bodyText")}
            </p>
          </div>
          <div className="col-span-6 shadow-custom md:mb-8 rounded-lg pb-4 max-w-[450px] md:max-w-full mx-auto">
            <div className="flex justify-center">
              <Image
                src={feature2}
                alt="Translation of 130+ languages"
                width="2031"
                height="864"
                className="rounded-tr-lg w-auto md:min-h-[316px] object-contain"
              />
            </div>
            <h3 className="font-semibold text-base md:text-xl text-[#101828] mx-4 md:mx-10">
              {t("gridContents.feature2.headingText")}
            </h3>
            <p className="text-xs md:text-sm text-[#475467] mx-4 md:mx-10 pt-2">
              {t("gridContents.feature2.bodyText")}
            </p>
          </div>
          <div className="col-span-6 shadow-custom mb-8 rounded-lg pb-4 md:pb-0 max-w-[450px] md:max-w-full mx-auto">
            <div className="flex flex-col-reverse sm:flex-row justify-between">
              <h3 className="font-semibold text-base md:text-xl self-start sm:self-end text-[#101828] ml-4 md:ml-10 sm:w-1/2 sm:max-w-[21ch]">
                {t("gridContents.feature3.headingText")}
              </h3>
              <div className="flex justify-end self-end sm:w-1/2">
                <Image
                  src={feature3}
                  alt="Text output copy and paste feature"
                  width="420"
                  height="304"
                  className="rounded-tr-lg"
                />
              </div>
            </div>
            <p className="text-xs md:text-sm text-[#475467] mx-4 md:mx-10 pt-2">
              {t("gridContents.feature3.bodyText")}
            </p>
          </div>
          <div className="col-span-4 shadow-custom pb-4 md:pb-0 md:h-[428px] -mt-8 rounded-lg max-w-[450px] md:max-w-full mx-auto">
            <div className="flex justify-center">
              <Image
                src={feature4}
                alt="Drag and drop for file upload"
                width="1310"
                height="960"
                className="rounded-tr-lg scale-90"
              />
            </div>
            <h3 className="font-semibold text-base md:text-xl text-[#101828] mx-4 md:mx-10 -mt-12">
              {t("gridContents.feature4.headingText")}
            </h3>
            <p className="text-xs md:text-sm text-[#475467] mx-4 md:mx-10 pt-2">
              {t("gridContents.feature4.bodyText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
