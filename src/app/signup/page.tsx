"use client";

import { useTranslations } from "next-intl";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "../example/_components/AuthPages/AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUpPage() {
  const t = useTranslations("auth.signUp");

  return (
    <>
      <PageMeta
        title={t("metaTitle")}
        description={t("metaDescription")}
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
