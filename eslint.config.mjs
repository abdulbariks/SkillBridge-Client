import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Next.js core web vitals rules
  ...nextVitals,

  // Next.js TypeScript rules
  ...nextTs,

  // Custom rule overrides (BEST PRACTICE)
  {
    rules: {
      // Common Next.js / React pain points
      "react-hooks/exhaustive-deps": "off",
      "react/no-unescaped-entities": "off",

      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // JS rules
      "no-unused-vars": "off",
      "no-console": "off",

      // Next.js specific
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },

  // Override default ignores of eslint-config-next
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
