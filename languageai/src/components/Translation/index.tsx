import { useTranslations } from "next-intl";
import { ClientTranslation } from "./ClientTranslation";

export const Translation: React.FC = () => {
  const t = useTranslations("Translation");
  return (
    <ClientTranslation
      headingText={t("heading.headingText")}
      bodyText={t("heading.bodyText")}
      buttonText={t("cta.buttonText")}
      buttonLink={t("cta.buttonLink")}
      instructionText={t("cta.instructionText")}
      placeholder={t("placeholder")}
      placeholder2={t("placeholder2")}
      instructionText1={t("uploadContent.instructionText1")}
      instructionText2={t("uploadContent.instructionText2")}
      instructionText3={t("uploadContent.instructionText3")}
      or={t("uploadContent.or")}
    />
  );
};
