import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import js from "@eslint/js";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [".next/**", "node_modules/**", "out/**", "public/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    rules: {
      "default-case": "warn",
      eqeqeq: ["error", "always"],
      "linebreak-style": ["error", "unix"],
      "no-console": "warn",
      "no-debugger": "warn",
      "no-duplicate-imports": "warn",
      "no-lonely-if": "error",
      "no-shadow": "off",
      "no-unneeded-ternary": "error",
      "no-useless-computed-key": "error",
      "no-useless-rename": "error",
      "object-shorthand": "error",
      "padded-blocks": ["warn", "never"],
      "padding-line-between-statements": [
        "warn",
        { blankLine: "always", next: "return", prev: "*" },
        { blankLine: "always", next: "block-like", prev: "*" },
        { blankLine: "always", next: "*", prev: "block-like" },
        { blankLine: "always", next: "break", prev: "*" },
        { blankLine: "always", next: "continue", prev: "*" },
        { blankLine: "never", next: ["case", "default"], prev: "case" },
      ],
      "prefer-arrow-callback": ["warn", { allowNamedFunctions: true }],
      "prefer-const": "warn",
      "prefer-object-spread": "warn",
      "prefer-rest-params": "warn",
      "react/jsx-no-target-blank": ["error", { allowReferrer: true }],
      yoda: "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-extraneous-class": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
