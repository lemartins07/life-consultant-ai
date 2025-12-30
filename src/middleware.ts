import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { localeCookieName } from "./i18n/config";
import { resolveLocale } from "./i18n/locale";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const existingLocale = request.cookies.get(localeCookieName)?.value;

  const acceptLanguage = request.headers.get("accept-language");
  const resolvedLocale = resolveLocale(existingLocale, acceptLanguage);

  if (!existingLocale || existingLocale !== resolvedLocale) {
    response.cookies.set(localeCookieName, resolvedLocale, {
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
