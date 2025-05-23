import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    }
  },
]);
