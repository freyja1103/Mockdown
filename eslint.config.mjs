import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    "dist/**",
    ".vite/**",
    "node_modules/**",
    "app/pages.gen.ts",
  ]),
]);

export default eslintConfig;
