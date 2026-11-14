import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const base = new URL(process.argv[2]);
assert.equal(base.protocol, "https:");
const checked = [];
async function request(path, status = 200) {
  const response = await fetch(new URL(path, base), {
    redirect: "manual",
    signal: AbortSignal.timeout(20000),
  });
  assert.equal(response.status, status, `${path}: unexpected status`);
  checked.push({ path, status });
  return response;
}
const home = await request("/");
assert.equal(home.headers.get("x-content-type-options"), "nosniff");
const html = await home.text();
assert.match(html, /<html[^>]*lang="pt-BR"/);
assert.match(html, /id="experiencia"/);
assert.match(html, /manrope-variable\.ttf/);
const en = await (await request("/en/")).text();
assert.match(en, /<html[^>]*lang="en"/);
assert.match(en, /Fullstack software engineer/);
await request("/portfolio-deployment-not-found/", 404);
for (const [source, target] of [
  ["/pt/", "/"],
  ["/aws.pdf", "/documents/certificates/aws-cloud-practitioner.pdf"],
  ["/curriculo.pdf", "/documents/resumes/bruno-aseff-pt.pdf"],
]) {
  const response = await request(source, 301);
  assert.equal(new URL(response.headers.get("location"), base).pathname, target);
}
for (const locale of ["pt", "en"]) {
  const path = `/documents/resumes/bruno-aseff-${locale}.pdf`;
  const response = await request(path);
  assert.match(response.headers.get("content-type"), /application\/pdf/);
  const actual = Buffer.from(await response.arrayBuffer());
  const expected = await readFile(new URL(`../public${path}`, import.meta.url));
  const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
  assert.equal(hash(actual), hash(expected), `PDF ${locale} differs from reviewed file`);
}
await request("/landscape/breeze-worklet.js");
await request("/landscape/poster.png");
const cssPath = html.match(/href="([^"]+\.css)"/)?.[1];
assert.ok(cssPath, "Missing stylesheet");
const css = await request(cssPath);
assert.match(css.headers.get("cache-control"), /immutable/);
console.log(JSON.stringify({ origin: base.origin, checked }, null, 2));
