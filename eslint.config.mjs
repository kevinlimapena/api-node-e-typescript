import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([

  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      indent: ["error", 2],
    },
  },


  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,mts,cts}"],
    rules: {
      "@typescript-eslint/no-empty-object-type": [
        "off",
        {
          allowInterfaces: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

]);
