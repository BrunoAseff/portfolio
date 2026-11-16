import sharp from "sharp";

// Render the application's own local face; never depend on a system fallback.
const fontfile = new URL("../public/fonts/manrope/manrope-variable.ttf", import.meta.url).pathname;
const glyph = await sharp({
  text: {
    text: '<span foreground="#273940">B</span>',
    font: "Manrope Medium 52",
    fontfile,
    rgba: true,
    dpi: 72,
  },
})
  .png()
  .toBuffer();
const { width, height } = await sharp(glyph).metadata();
const background = Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" rx="15" fill="#edf2f0"/></svg>',
);
await sharp(background)
  .composite([
    { input: glyph, left: Math.round((64 - width) / 2), top: Math.round((64 - height) / 2) },
  ])
  .png()
  .toFile(new URL("../src/assets/favicon.png", import.meta.url).pathname);
