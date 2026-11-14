import { defineConfig } from "vite-plus";
export default defineConfig({
  fmt: { astro: true, ignorePatterns: ["dist/**", ".astro/**", "src/features/landscape/art/**"] },
  lint: {
    ignorePatterns: ["dist/**", ".astro/**", "src/features/landscape/art/**"],
    options: { typeAware: true },
  },
  test: { include: ["src/**/*.test.ts"], environment: "node" },
});
