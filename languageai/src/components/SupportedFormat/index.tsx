import { supportedFormatsGroupedByFileType } from "@/app/[locale]/utils/helper";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n.config";

export const SupportedFormats: React.FC = () => {
  const t = useTranslations("SupportedFormats");
  const locale = useLocale() as Locale;
  const groupedFormats = supportedFormatsGroupedByFileType(locale);
  return (
    <section
      id="supported-formats"
      className="pt-10 my-10 pb-[4.5rem] bg-[#FFF9FB] w-full"
    >
      <div className="flex flex-col w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto">
        <h2 className="font-semibold text-lg md:text-4xl text-center text-[#101828] mx-4">
          {t("heading.headingText")}
        </h2>
        <p className="text-sm md:text-xl text-center text-[#475467] px-4 pt-3">
          {t("heading.bodyText")}
        </p>
        <div className="overflow-x-auto mt-6 md:mt-12">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-[#475467] uppercase tracking-wider">
                  {t("tableHeading.column1")}
                </th>
                <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-[#475467] uppercase tracking-wider whitespace-normal sm:whitespace-nowrap">
                  {t("tableHeading.column2")}
                </th>
                <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-[#475467] uppercase tracking-wider">
                  {t("tableHeading.column3")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-gray-200">
              {groupedFormats.map((format, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{format.fileType}</td>
                  <td className="px-6 py-4">{format.extensions}</td>
                  <td className="px-6 py-4">{format.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
