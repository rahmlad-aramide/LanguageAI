import { useTranslations } from "next-intl";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const t = useTranslations("Login");
  const tValidation = useTranslations("validation");

  return (
    <LoginForm
      headingText={t("heading.headingText")}
      bodyText={t("heading.bodyText")}
      emailLabel={t("body.emailLabel")}
      emailPlaceholder={t("body.emailPlaceholder")}
      passwordLabel={t("body.passwordLabel")}
      passwordPlaceholder={t("body.passwordPlaceholder")}
      rememberText={t("body.rememberText")}
      forgotPasswordLink={t("body.forgotPasswordLink")}
      buttonText={t("body.buttonText")}
      registerText={t("body.registerText")}
      registerLink={t("body.registerLink")}
      validationMessages={{
        invalidEmail: tValidation("invalidEmail"), // ✅ Now this works
        passwordMin: tValidation("passwordMin"),
      }}
    />
  );
}
