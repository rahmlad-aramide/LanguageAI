import { useLocale, useTranslations } from "next-intl";
import { roboto } from "@/app/[locale]/fonts";
import { stepsData } from "@/app/[locale]/data";
import { StepProps } from "@/types";
import { Locale } from "@/i18n.config";
import Link from "next/link";

const Step: React.FC<StepProps> = ({
  icon,
  background,
  border,
  number,
  heading,
  body,
}) => {
  const locale = useLocale() as Locale;
  const isArabic = locale === "ar";
  return (
    <div className="flex flex-col items-center md:items-start">
      <div
        style={{ background: background, borderColor: border }}
        className={`border w-24 h-24 rounded-lg flex justify-center items-center`}
      >
        {icon()}
      </div>
      <div
        style={roboto.style}
        className="bg-[#FEEBF3] rounded-xl h-6 flex items-center leading-none px-2 text-sm text-[#090909] mt-4 mb-6 md:my-5"
      >
        {number}
      </div>
      <h3 className="font-semibold text-center md:text-3xl mb-2">{heading}</h3>
      <p
        className={`text-sm font-medium text-center md:text-xl max-w-[35ch] md:max-w-[40ch] ${isArabic ? "md:text-right" : "md:text-left"}`}
      >
        {body}
      </p>
    </div>
  );
};

export const HowItWorks: React.FC = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations("HowItWorks");
  return (
    <section
      id="how-it-works"
      className="w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] lg:w-[calc(100%_-_300px)] max-w-6xl mx-auto mb-36"
    >
      <h2 className="font-semibold text-lg md:text-4xl text-center text-[#101828] mx-4 mt-20">
        {t("heading.headingText")}
      </h2>
      <p className="text-sm md:text-xl text-center text-[#475467] px-4 pt-3">
        {t("heading.bodyText")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16 my-6 md:my-12">
        {stepsData.map((step, idx) => (
          <Step
            background={step.background}
            body={t(`gridContents.step${idx + 1}.body`)}
            border={step.border}
            heading={t(`gridContents.step${idx + 1}.heading`)}
            icon={step.icon}
            number={t(`gridContents.step${idx + 1}.number`)}
            key={step.number}
          />
        ))}
      </div>
      <Link href={`/${locale}/demo`} className="flex mx-auto w-fit border outline-transparent focus:outline-black border-primary disabled:border-disabled bg-primary disabled:bg-disabled disabled:cursor-not-allowed hover:bg-opacity-80 text-white py-2.5 px-[1.125rem] rounded-lg transition duration-200 mt-4 md:mt-10">{t('demo')}</Link>
    </section>
  );
};
