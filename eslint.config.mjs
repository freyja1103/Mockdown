import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    "dist/**",
    ".vite/**",
    "node_modules/**",
    "src/app/pages.gen.ts",
  ]),
]);

export default eslintConfig;
