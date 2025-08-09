import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import eslintPluginImport from "eslint-plugin-import";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  // Ignorar carpetas
  {
    ignores: ["node_modules", ".next", "out", "coverage", ".idea"],
  },

  // Base JS y TypeScript
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Next.js: aplicar reglas core-web-vitals desde el plugin en flat config
  {
    plugins: {
      "@next/next": nextPlugin,
      import: fixupPluginRules(eslintPluginImport),
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        ...globals.node,
      },
    },
    rules: {
      // Reglas de Next core-web-vitals
      ...nextPlugin.configs["core-web-vitals"].rules,

      // Reglas generales
      "padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "*", next: ["return", "export"] },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
      ],
      "no-console": ["warn", { allow: ["error"] }],

      // Imports
      "import/order": [
        "warn",
        {
          groups: [
            "type",
            "builtin",
            "object",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "@/*",
              group: "external",
              position: "after",
            },
          ],
          "newlines-between": "always",
        },
      ],

      // TypeScript ajustes
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_.*?$",
          caughtErrorsIgnorePattern: "^_.*?$",
        },
      ],
    },
  },

  // Prettier + Tailwind
  prettierRecommended,
  {
    rules: {
      "prettier/prettier": [
        "warn",
        {
          printWidth: 100,
          trailingComma: "all",
          tabWidth: 2,
          semi: true,
          singleQuote: false,
          bracketSpacing: true,
          arrowParens: "always",
          endOfLine: "auto",
          plugins: ["prettier-plugin-tailwindcss"],
        },
      ],
    },
  },

  // Overrides: permitir console en scripts
  {
    files: ["scripts/**/*.js"],
    rules: {
      "no-console": "off",
    },
  },
];
