import { defineConfig } from "cf/config";

// Astro builds the site. `cf deploy dist` uploads that static output directly.
export default defineConfig({
  accountId: "0b5eb954946b101a17e7c4620ebffb1f",
  worker: {
    name: "portfolio",
    compatibilityDate: "2026-11-14",
    assets: {
      htmlHandling: "force-trailing-slash",
      notFoundHandling: "404-page",
    },
    observability: { enabled: true, traces: { enabled: true } },
  },
});
