import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { localeCookieName } from "./config";
import { resolveLocale } from "./locale";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerList = await headers();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const acceptLanguage = headerList.get("accept-language");
  const locale = resolveLocale(cookieLocale, acceptLanguage);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
