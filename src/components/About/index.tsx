import { useTranslations } from "next-intl";
import { ClientAbout } from "./ClientAbout";

export const About: React.FC = () => {
  const t = useTranslations("About");

  return (
    <ClientAbout
      heading={t("heading")}
      bodyStrong={t("body.strong")}
      bodyNormal={t("body.normal")}
      bodyNormal1={t("body.normal1")}
      bodyMore={t("body.more")}
      bodyLess={t("body.less")}
    />
  );
};
