import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import GoogleAuthButton from "./GoogleAuthButton";

export default function SignInForm() {
  const router = useRouter();
  const t = useTranslations("auth.signIn");
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("auth.signIn.errors");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const isGoogleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true";

  const handleGoogleSignIn = () => {
    setFieldErrors({});
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    const nextErrors: { email?: string; password?: string } = {};

    if (!email) {
      nextErrors.email = tErrors("emailRequired");
    }

    if (!password) {
      nextErrors.password = tErrors("passwordRequired");
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = tErrors("emailInvalid");
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
      });

      if (result?.error) {
        setFieldErrors({ password: tErrors("invalidCredentials") });
        return;
      }

      const session = await getSession();
      if (!session?.user) {
        setFieldErrors({ password: tErrors("session") });
        return;
      }

      const shouldOnboard = !session.user.onboardingCompleted;
      router.push(shouldOnboard ? "/onboarding" : "/dashboard");
    } catch (submitError) {
      setFieldErrors({
        password:
          submitError instanceof Error
            ? submitError.message
            : tErrors("generic"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          {tAuth("backToDashboard")}
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              {t("title")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("subtitle")}
            </p>
          </div>
          <div>
            {isGoogleEnabled && (
              <div className="grid grid-cols-1 gap-3">
                <GoogleAuthButton
                  label={t("googleButton")}
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                />
              </div>
            )}
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  {tCommon("or")}
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    {t("emailLabel")} <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder={t("emailPlaceholder")}
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    disabled={isSubmitting}
                    error={Boolean(fieldErrors.email)}
                    hint={fieldErrors.email}
                  />
                </div>
                <div>
                  <Label>
                    {t("passwordLabel")}{" "}
                    <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("passwordPlaceholder")}
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setFieldErrors((prev) => ({
                          ...prev,
                          password: undefined,
                        }));
                      }}
                      disabled={isSubmitting}
                      error={Boolean(fieldErrors.password)}
                      hint={fieldErrors.password}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isChecked}
                      onChange={setIsChecked}
                      disabled={isSubmitting}
                    />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      {t("keepLoggedIn")}
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" disabled={isSubmitting}>
                    {isSubmitting ? t("submitLoading") : t("submit")}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                {t("noAccount")}{" "}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  {t("signUpLink")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
