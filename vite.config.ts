import { defineConfig } from "vite-plus";
export default defineConfig({
  fmt: { astro: true, ignorePatterns: ["dist/**", ".astro/**"] },
  lint: { ignorePatterns: ["dist/**", ".astro/**"], options: { typeAware: true } },
  test: { include: ["src/**/*.test.ts"], environment: "node" },
});
