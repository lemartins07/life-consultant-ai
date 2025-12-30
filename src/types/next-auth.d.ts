import type { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      onboardingCompleted: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    onboardingCompleted: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    onboardingCompleted?: boolean;
  }
}
