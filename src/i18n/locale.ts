import { defaultLocale, locales, type Locale } from "./config";

const localeMap = new Map(
  locales.map((locale) => [locale.toLowerCase(), locale]),
);

const parseAcceptLanguage = (header: string) =>
  header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";");
      const qValue = quality?.split("=")[1];
      return {
        tag: tag.toLowerCase(),
        quality: qValue ? Number(qValue) : 1,
      };
    })
    .filter((item) => item.tag)
    .sort((a, b) => b.quality - a.quality)
    .map((item) => item.tag);

const resolveFromTag = (tag: string) => {
  const directMatch = localeMap.get(tag);
  if (directMatch) {
    return directMatch;
  }

  const base = tag.split("-")[0];
  return localeMap.get(base) ?? null;
};

export const resolveLocale = (
  cookieLocale?: string,
  acceptLanguage?: string | null,
): Locale => {
  if (cookieLocale) {
    const match = resolveFromTag(cookieLocale.toLowerCase());
    if (match) {
      return match;
    }
  }

  if (acceptLanguage) {
    const candidates = parseAcceptLanguage(acceptLanguage);
    for (const tag of candidates) {
      const match = resolveFromTag(tag);
      if (match) {
        return match;
      }
    }
  }

  return defaultLocale;
};
