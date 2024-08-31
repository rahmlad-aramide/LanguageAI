import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ['en', 'ar', 'fr', 'es', 'de', 'hi', 'zh', 'pt', 'ru', 'ja', 'bn' ] as const;
export type Locale = (typeof locales)[number];

export const {Link, usePathname, useRouter} = createSharedPathnamesNavigation({locales})