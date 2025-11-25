import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import nodePlugin from "eslint-plugin-n";

export default [
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["dist/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier,
      n: nodePlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "n/no-unsupported-features/es-syntax": "off",
    },
  },
];
