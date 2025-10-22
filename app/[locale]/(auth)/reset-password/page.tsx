import { useTranslations } from "next-intl";
import PasswordResetForm from "./reset-password";

export default function PasswordResetPage() {
  const t = useTranslations("ResetPassword");
  const tValidation = useTranslations("validation");

  return (
    <PasswordResetForm
      headingText={t("heading.headingText")}
      bodyText={t("heading.bodyText")}
      passwordLabel={t("body.passwordLabel")}
      confirmPasswordLabel={t("body.confirmPasswordLabel")}
      buttonText={t("body.buttonText")}
      isSuccessHeadingText={t("success.isSuccessHeadingText")}
      isSuccessBodyText={t("success.isSuccessBodyText")}
      isSuccessLink={t("success.isSuccessLink")}
      validationMessages={{
        passwordMin: tValidation("passwordMin"),
        confirmPasswordMin: tValidation("confirmPasswordMin"),
        refinePassword: tValidation("refinePassword"),
      }}
    />
  );
}
