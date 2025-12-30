import { getTranslations } from "next-intl/server";

export default async function OnboardingPage() {
  const t = await getTranslations("onboarding");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
        {t("title")}
      </h1>
    </div>
  );
}
