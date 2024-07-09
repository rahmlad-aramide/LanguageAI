import { useTranslations } from "next-intl";
import { ClientHero } from "./ClientHero";

export const Hero: React.FC = () => {
  const t = useTranslations("Hero");
  const tt = useTranslations("Translation");

  return (
    <ClientHero 
    headingText={t('heading.headingText')} 
    bodyText={t('heading.bodyText')} 
    buttonText={t('cta.buttonText')}
    buttonLink={t('cta.buttonLink')}
    reviews={t('ratings.reviews')}
    instructionText1={tt("uploadContent.instructionText1")}
      instructionText2={tt("uploadContent.instructionText2")}
      instructionText3={tt("uploadContent.instructionText3")}
      or={tt("uploadContent.or")}
    />
  );
};
