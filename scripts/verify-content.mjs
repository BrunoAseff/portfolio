import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
const root = new URL("../dist/", import.meta.url);
for (const [file, lang, path] of [
  ["index.html", "pt-BR", "/"],
  ["en/index.html", "en", "/en/"],
]) {
  const html = await readFile(new URL(file, root), "utf8");
  assert(html.includes(`lang="${lang}"`), file + " missing language");
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, file + " must contain one h1");
  assert(
    html.includes(`rel="canonical" href="https://brunoaseff.com.br${path}"`),
    file + " canonical",
  );
  for (const value of [
    "Lazúli",
    "Eye Patch",
    "Access Global Logistics",
    "TypeScript",
    "brunoaseff2@gmail.com",
  ])
    assert(html.includes(value), file + " missing " + value);
  for (const id of [
    "inicio",
    "main",
    "conhecimentos",
    "experiencia",
    "projetos",
    "formacao",
    "contato",
  ])
    assert(html.includes(`id="${id}"`), file + " missing anchor " + id);
  for (const lang of ["pt-BR", "en", "x-default"])
    assert(html.includes(`hreflang="${lang}"`), file + " missing alternate");
  assert(!html.includes("data:font/"), "Fonts must be cacheable external assets");
  assert(
    html.includes('href="https://lazuli.brunoaseff.com.br/"'),
    file + " missing public Lazúli link",
  );
  for (const match of html.matchAll(/<a\b([^>]+)>/g)) {
    const attributes = match[1];
    const href = attributes.match(/href="([^"]+)"/)?.[1];
    if (!href) continue;
    if (/^https?:\/\//.test(href) || href.startsWith("/documents/")) {
      assert(
        attributes.includes('target="_blank"'),
        "External/document link must open a new tab: " + href,
      );
      assert(/rel="[^"]*noopener/.test(attributes), "External link needs noopener: " + href);
    } else if (href.startsWith("#") || href === "/" || href === "/en/") {
      assert(
        !attributes.includes('target="_blank"'),
        "Page navigation must stay in the same tab: " + href,
      );
    }
  }
  const ids = new Set();
  for (const match of html.matchAll(/\sid="([^"]+)"/g)) {
    assert(!ids.has(match[1]), "Duplicate DOM id " + match[1]);
    ids.add(match[1]);
  }
  for (const match of html.matchAll(/(?:href|src)="(\/(?!\/)[^"#?]*)(?:[?#][^"]*)?"/g)) {
    let target = match[1];
    if (target.endsWith("/")) target += "index.html";
    await stat(new URL(target.slice(1), root));
  }
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert(json, "Missing JSON-LD");
  assert.equal(JSON.parse(json[1])["@type"], "ProfilePage");
}
assert((await readFile(new URL("404.html", root), "utf8")).includes("noindex"));
assert((await readFile(new URL("robots.txt", root), "utf8")).includes("sitemap-index.xml"));
assert(
  (await readFile(new URL("sitemap-0.xml", root), "utf8")).includes(
    "https://brunoaseff.com.br/en/",
  ),
);
console.log("Built HTML, locales, anchors, structured data and local assets verified.");
