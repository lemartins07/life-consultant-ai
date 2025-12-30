"use client";

import { useState } from "react";
import { localeCookieName, locales, type Locale } from "../../i18n/config";

const labels: Record<Locale, string> = {
  "pt-BR": "PT",
  en: "EN",
};

export default function LocaleSwitcher() {
  const [isChanging, setIsChanging] = useState(false);

  const handleChange = (locale: Locale) => {
    setIsChanging(true);
    document.cookie = `${localeCookieName}=${locale}; path=/; samesite=lax`;
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => handleChange(locale)}
          disabled={isChanging}
          className="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 transition hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}
