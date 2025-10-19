import { useTranslations } from "next-intl";
import SignupForm from "./RegisterForm";

export default function LoginPage() {
  const t = useTranslations("Signup");
  const tValidation = useTranslations("signUpvalidation");

  return (
    <SignupForm
      headingText={t("heading.headingText")}
      fullNameLabel={t("body.fullNameLabel")}
      emailLabel={t("body.emailLabel")}
      emailPlaceholder={t("body.emailPlaceholder")}
      passwordLabel={t("body.passwordLabel")}
      passwordPlaceholder={t("body.passwordPlaceholder")}
      confirmPasswordLabel={t("body.confirmPasswordLabel")}
      confirmPasswordPlaceholder={t("body.confirmPasswordPlaceholder")}
      languageLabel={t("body.languageLabel")}
      arabicSelect={t("body.arabicSelect")}
      englishSelect={t("body.englishSelect")}
      frenchSelect={t("body.frenchSelect")}
      germanSelect={t("body.germanSelect")}
      chineseSelect={t("body.chineseSelect")}
      buttonText={t("body.buttonText")}
      signinText={t("body.signinText")}
      signinLink={t("body.signinLink")}
      validationMessages={{
        fullName: tValidation("fullName"),
        invalidEmail: tValidation("invalidEmail"),
        passwordMin: tValidation("passwordMin"),
        confirmPassswordMin: tValidation("confirmPasswordMin"),
        languagePreferred: tValidation("languagePreferred"),
        refinePassword: tValidation("refinePassword"),
      }}
    />
  );
}
