import { useTranslations } from "next-intl";
import { ClientContact } from "./ClientContact";

export default function Contact (){
    const t = useTranslations("Contact");
    return (
        <ClientContact
            headingText={t("heading.headingText")}
            headingBody={t("heading.bodyText")}
            nameLabel={t("body.nameLabel")}
            namePlaceholder={t("body.namePlaceholder")}
            emailLabel={t("body.emailLabel")}
            emailPlaceholder={t("body.emailPlaceholder")}
            messageLabel={t("body.messageLabel")}
            messagePlaceholder={t("body.messagePlaceholder")}
            send={t("body.send")}
        />
    )
}