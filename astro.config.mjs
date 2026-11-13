import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";
export default defineConfig({
  site: "https://brunoaseff.com.br",
  output: "static",
  trailingSlash: "always",
  integrations: [
    react(),
    sitemap({ i18n: { defaultLocale: "pt", locales: { pt: "pt-BR", en: "en" } } }),
  ],
  vite: { plugins: [tailwind()] },
  devToolbar: { enabled: false },
});
