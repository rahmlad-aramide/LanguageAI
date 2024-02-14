"use client";
import { StepProps, stepsData } from "@/app/data";
import { inter } from "@/app/fonts";

const Step: React.FC<StepProps> = ({
  icon,
  background,
  border,
  number,
  heading,
  body,
}) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div
        style={{ background: background, borderColor: border }}
        className={`border w-24 h-24 rounded-lg flex justify-center items-center`}
      >
        {icon()}
      </div>
      <div
        style={inter.style}
        className="bg-[#FEEBF3] rounded-xl px-2 text-sm text-[#090909] mt-4 mb-6 md:my-5"
      >
        {number}
      </div>
      <h2 className="font-semibold text-center md:text-3xl mb-2">{heading}</h2>
      <p className="text-sm font-medium text-center md:text-left md:text-xl max-w-[35ch] md:max-w-[40ch]">
        {body}
      </p>
    </div>
  );
};
export const HowItWorks: React.FC = () => {
  return (
    <section className="w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] mx-auto mb-36">
      <h2 className="font-semibold text-lg md:text-4xl text-center text-[#101828] mx-4 mt-20">
        Get to know how it works in just three STEPS!
      </h2>
      <p className="text-sm md:text-xl text-center text-[#475467] px-4 pt-3">
        Kindly follow the steps below to know how the translations works
        perfectly
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16 mt-6 md:mt-12">
        {stepsData.map((step) => (
          <Step
            background={step.background}
            body={step.body}
            border={step.border}
            heading={step.heading}
            icon={step.icon}
            number={step.number}
            key={step.number}
          />
        ))}
      </div>
    </section>
  );
};
