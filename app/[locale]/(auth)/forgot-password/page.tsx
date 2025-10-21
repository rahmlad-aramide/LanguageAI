import { useTranslations } from "next-intl";
import ForgotPasswordForm from "./forgot-password";

export default function ForgotPasswordPage() {
  const t = useTranslations("ForgotPassword");
  const tValidation = useTranslations("validation");

  return (
    <ForgotPasswordForm
      headingText={t("heading.headingText")}
      bodyText={t("heading.bodyText")}
      emailLabel={t("body.emailLabel")}
      emailPlaceholder={t("body.emailPlaceholder")}
      validationMessages={{
        invalidEmail: tValidation("invalidEmail"),
      }}
    />
  );
}
