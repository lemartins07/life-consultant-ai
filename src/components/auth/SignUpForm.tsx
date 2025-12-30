import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import GoogleAuthButton from "./GoogleAuthButton";

const MIN_PASSWORD_LENGTH = 8;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignUpField =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "confirmPassword"
  | "agree";

type SignUpErrors = Partial<Record<SignUpField, string>>;

export default function SignUpForm() {
  const router = useRouter();
  const t = useTranslations("auth.signUp");
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("auth.signUp.errors");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<SignUpErrors>({});
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const isGoogleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true";

  const handleGoogleSignIn = () => {
    setFieldErrors({});
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleChange = (field: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    const nextErrors: SignUpErrors = {};

    if (!formValues.firstName || !formValues.lastName) {
      if (!formValues.firstName) {
        nextErrors.firstName = tErrors("firstNameRequired");
      }
      if (!formValues.lastName) {
        nextErrors.lastName = tErrors("lastNameRequired");
      }
    }

    if (!formValues.email || !formValues.password || !formValues.confirmPassword) {
      if (!formValues.email) {
        nextErrors.email = tErrors("emailRequired");
      }
      if (!formValues.password) {
        nextErrors.password = tErrors("passwordRequired");
      }
      if (!formValues.confirmPassword) {
        nextErrors.confirmPassword = tErrors("confirmPasswordRequired");
      }
    } else if (!emailPattern.test(formValues.email.trim())) {
      nextErrors.email = tErrors("emailInvalid");
    }

    if (
      formValues.password &&
      formValues.password.length < MIN_PASSWORD_LENGTH
    ) {
      nextErrors.password = tErrors("passwordMin", {
        min: MIN_PASSWORD_LENGTH,
      });
    }

    if (
      formValues.password &&
      formValues.confirmPassword &&
      formValues.password !== formValues.confirmPassword
    ) {
      nextErrors.confirmPassword = tErrors("confirmPasswordMismatch");
    }

    if (!formValues.agree) {
      nextErrors.agree = tErrors("termsRequired");
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const name = [formValues.firstName.trim(), formValues.lastName.trim()]
        .filter(Boolean)
        .join(" ");
      const email = formValues.email.trim().toLowerCase();

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: formValues.password,
          name: name || undefined,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      let payload: { error?: string };

      if (contentType.includes("application/json")) {
        payload = await response.json();
      } else {
        const text = await response.text();
        payload = {
          error:
            response.status >= 500
              ? "Server error while creating your account."
              : "Unable to create your account.",
        };
        console.warn("Unexpected response from /api/auth/register:", text);
      }

      if (!response.ok) {
        const message = payload.error || tErrors("generic");
        setFieldErrors({
          email: message.includes("already exists")
            ? tErrors("emailInUse")
            : message,
        });
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password: formValues.password,
      });

      if (result?.error) {
        setFieldErrors({ password: tErrors("signInFailed") });
        return;
      }

      router.push("/onboarding");
    } catch (submitError) {
      setFieldErrors({
        email:
          submitError instanceof Error
            ? submitError.message
            : tErrors("generic"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
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
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <Label>
                      {t("firstNameLabel")}
                      <span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder={t("firstNamePlaceholder")}
                      value={formValues.firstName}
                      onChange={(event) =>
                        handleChange("firstName", event.target.value)
                      }
                      disabled={isSubmitting}
                      error={Boolean(fieldErrors.firstName)}
                      hint={fieldErrors.firstName}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <Label>
                      {t("lastNameLabel")}
                      <span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder={t("lastNamePlaceholder")}
                      value={formValues.lastName}
                      onChange={(event) =>
                        handleChange("lastName", event.target.value)
                      }
                      disabled={isSubmitting}
                      error={Boolean(fieldErrors.lastName)}
                      hint={fieldErrors.lastName}
                    />
                  </div>
                </div>
                <div>
                  <Label>
                    {t("emailLabel")}
                    <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("emailPlaceholder")}
                    value={formValues.email}
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                    disabled={isSubmitting}
                    error={Boolean(fieldErrors.email)}
                    hint={fieldErrors.email}
                  />
                </div>
                <div>
                  <Label>
                    {t("passwordLabel")}
                    <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder={t("passwordPlaceholder")}
                      type={showPassword ? "text" : "password"}
                      value={formValues.password}
                      onChange={(event) =>
                        handleChange("password", event.target.value)
                      }
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
                <div>
                  <Label>
                    {t("confirmPasswordLabel")}
                    <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder={t("confirmPasswordPlaceholder")}
                      type={showConfirmPassword ? "text" : "password"}
                      value={formValues.confirmPassword}
                      onChange={(event) =>
                        handleChange("confirmPassword", event.target.value)
                      }
                      disabled={isSubmitting}
                      error={Boolean(fieldErrors.confirmPassword)}
                      hint={fieldErrors.confirmPassword}
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={formValues.agree}
                    onChange={(checked) => {
                      setFormValues((prev) => ({ ...prev, agree: checked }));
                      setFieldErrors((prev) => ({
                        ...prev,
                        agree: undefined,
                      }));
                    }}
                    disabled={isSubmitting}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    {t.rich("termsNotice", {
                      terms: (chunks) => (
                        <span className="text-gray-800 dark:text-white/90">
                          {chunks}
                        </span>
                      ),
                      privacy: (chunks) => (
                        <span className="text-gray-800 dark:text-white">
                          {chunks}
                        </span>
                      ),
                    })}
                  </p>
                </div>
                {fieldErrors.agree && (
                  <p className="text-xs text-error-500">{fieldErrors.agree}</p>
                )}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? t("submitLoading") : t("submit")}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                {t("hasAccount")}{" "}
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  {t("signInLink")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
