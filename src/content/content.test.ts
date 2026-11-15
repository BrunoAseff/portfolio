import { describe, it, expect } from "vite-plus/test";
import { existsSync } from "node:fs";
import { projects } from "./projects";
import { experiences } from "./experience";
import { credentials } from "./education";
import { messages } from "./messages";
describe("content integrity", () => {
  it("keeps public entities and section destinations consistent across languages", () => {
    expect(messages.pt.sections.map((s) => s.id)).toEqual(messages.en.sections.map((s) => s.id));
    for (const item of [...projects, ...experiences])
      for (const locale of ["pt", "en"] as const)
        expect(item.content[locale].paragraphs.every((p) => p.trim().length > 0)).toBe(true);
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
  });
  it("only links selected credentials which actually exist", () => {
    for (const credential of credentials) expect(existsSync(`public${credential.href}`)).toBe(true);
  });
});
