import { useTranslations } from "next-intl";
import { ClientFooter } from "./ClientFooter";

export const Footer: React.FC = () => {
  const t = useTranslations("Footer");
  return (
    <ClientFooter
      headingText={t("heading.headingText")}
      bodyText={t("heading.bodyText")}
      buttonText={t("heading.buttonText")}
      linksHeading={t("links.heading")}
      linksLink1={t("links.links.link1")}
      linksLink2={t("links.links.link2")}
      linksLink3={t("links.links.link3")}
      legalHeading={t("legal.heading")}
      legalLink1={t("legal.links.link1")}
      legalLink2={t("legal.links.link2")}
      legalLink3={t("legal.links.link3")}
    />
  );
};
