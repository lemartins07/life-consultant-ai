import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { authOptions } from "../../lib/auth";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  if (!session.user.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
        {t("title")}
      </h1>
    </div>
  );
}
