import { useTranslations } from "next-intl";
import { ClientNavbar } from "./ClientNavbar";

export const Navbar: React.FC = () => {
  const t = useTranslations("Navbar");
  const tDemo = useTranslations("HowItWorks");
  return (
    <ClientNavbar
      link1={t("navLinks.link1")}
      link2={t("navLinks.link2")}
      link3={t("navLinks.link3")}
      link4={tDemo("demo")}
    />
  );
};
