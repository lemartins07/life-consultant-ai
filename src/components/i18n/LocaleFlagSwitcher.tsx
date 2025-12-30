"use client";

import { useEffect, useState } from "react";
import { localeCookieName, type Locale } from "../../i18n/config";

const localeSequence: Locale[] = ["pt-BR", "en"];

const localeLabel: Record<Locale, string> = {
  "pt-BR": "Portuguese (Brazil)",
  en: "English (US)",
};

const getCookieValue = (name: string) => {
  const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const FlagButton = ({
  label,
  children,
  onClick,
  disabled,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    disabled={disabled}
    className="inline-flex items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 size-14"
  >
    {children}
  </button>
);

const BrazilFlag = () => (
  <svg
    width="28"
    height="20"
    viewBox="0 0 28 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect width="28" height="20" rx="2" fill="#1A9F3C" />
    <polygon points="14,3 24,10 14,17 4,10" fill="#F4D03F" />
    <circle cx="14" cy="10" r="4" fill="#1F4E9E" />
  </svg>
);

const UsaFlag = () => (
  <svg
    width="28"
    height="20"
    viewBox="0 0 28 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect width="28" height="20" rx="2" fill="#FFFFFF" />
    <rect width="28" height="2" y="2" fill="#E74C3C" />
    <rect width="28" height="2" y="6" fill="#E74C3C" />
    <rect width="28" height="2" y="10" fill="#E74C3C" />
    <rect width="28" height="2" y="14" fill="#E74C3C" />
    <rect width="28" height="2" y="18" fill="#E74C3C" />
    <rect width="12" height="8" rx="1" fill="#1F4E9E" />
  </svg>
);

export default function LocaleFlagSwitcher() {
  const [isChanging, setIsChanging] = useState(false);
  const [activeLocale, setActiveLocale] = useState<Locale>("pt-BR");

  useEffect(() => {
    const cookieLocale = getCookieValue(localeCookieName) as Locale | null;
    if (cookieLocale && localeSequence.includes(cookieLocale)) {
      setActiveLocale(cookieLocale);
    }
  }, []);

  const handleToggle = () => {
    setIsChanging(true);
    const nextLocale = activeLocale === "pt-BR" ? "en" : "pt-BR";
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; samesite=lax`;
    window.location.reload();
  };

  return (
    <FlagButton
      label={localeLabel[activeLocale]}
      onClick={handleToggle}
      disabled={isChanging}
    >
      {activeLocale === "pt-BR" ? <BrazilFlag /> : <UsaFlag />}
    </FlagButton>
  );
}
