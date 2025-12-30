import js from "@eslint/js";
import globals from "globals";
import next from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".next", "dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "@next/next": next,
      "react-hooks": reactHooks,
    },
    rules: {
      ...next.configs["core-web-vitals"].rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
)
