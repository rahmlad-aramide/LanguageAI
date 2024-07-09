import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n.config";

export default createMiddleware({
  defaultLocale: "en",
  locales,
  localeDetection: false,
  localePrefix: "always"
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    
    // to check this later
    // "/(en-us|ar-eg)/:path*"
  ],
};