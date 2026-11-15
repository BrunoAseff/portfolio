import type { APIRoute } from "astro";
import { site } from "../content/site";
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\n${process.env.SITE_NOINDEX === "1" ? "Disallow: /" : "Allow: /"}\nSitemap: ${site.url}/sitemap-index.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
