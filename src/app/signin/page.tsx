"use client";

import { useTranslations } from "next-intl";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "../example/_components/AuthPages/AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignInPage() {
  const t = useTranslations("auth.signIn");

  return (
    <>
      <PageMeta
        title={t("metaTitle")}
        description={t("metaDescription")}
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
