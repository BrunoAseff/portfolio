import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { site } from "../src/content/site.ts";
import { profile } from "../src/content/profile.ts";
const destination = new URL("../public/social/", import.meta.url);
await mkdir(destination, { recursive: true });
const font = (weight) =>
  new URL(`../src/assets/fonts/bricolage-${weight}.ttf`, import.meta.url).pathname;
for (const locale of ["pt", "en"]) {
  const layers = [];
  for (const [text, size, weight, top, color] of [
    [site.name, 76, 500, 165, "#272c33"],
    [profile[locale].role, 35, 400, 270, "#5e6671"],
    ["brunoaseff.com.br", 26, 400, 490, "#69727d"],
  ]) {
    const image = await sharp({
      text: {
        text: `<span foreground="${color}">${text}</span>`,
        font: `Bricolage Grotesque ${size}`,
        fontfile: font(weight),
        rgba: true,
        dpi: 72,
      },
    })
      .png()
      .toBuffer();
    layers.push({ input: image, left: 92, top });
  }
  const terrain = Buffer.from(
    '<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><path d="M800 630 920 550 970 530 1000 490 1050 525 1080 520 1200 590V630" fill="#e9edef"/><path d="M900 630 1040 580 1090 595 1140 560 1200 580V630" fill="#d0d9df"/></svg>',
  );
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#fcfcfa" } })
    .composite([{ input: terrain }, ...layers])
    .png()
    .toFile(new URL(`profile-${locale}.png`, destination).pathname);
}
console.log("Social images generated with the approved local font and palette.");
