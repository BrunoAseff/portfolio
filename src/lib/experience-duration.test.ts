import { describe, expect, it } from "vite-plus/test";
import { experienceSince } from "./experience-duration";
describe("experience measured from 3 February 2025", () => {
  it("can show a compact duration under the Experience heading in both languages", () => {
    expect(experienceSince(new Date(2026, 10, 3), "pt", true)).toBe("1 ano e 9 meses");
    expect(experienceSince(new Date(2026, 10, 3), "en", true)).toBe("1 year and 9 months");
  });
  it("does not advance the month before the monthly anniversary", () => {
    expect(experienceSince(new Date(2026, 10, 2), "pt")).toBe("1 ano e 8 meses de experiência");
    expect(experienceSince(new Date(2026, 10, 3), "pt")).toBe("1 ano e 9 meses de experiência");
  });
  it("does not leave a dangling month on a complete year", () => {
    expect(experienceSince(new Date(2027, 1, 3), "pt")).toBe("2 anos de experiência");
  });
  it("uses the same date in English with singular units", () => {
    expect(experienceSince(new Date(2026, 2, 3), "en")).toBe("1 year and 1 month of experience");
  });
  it("handles less than one month without a negative duration", () => {
    expect(experienceSince(new Date(2025, 1, 10), "pt")).toBe("Menos de um mês de experiência");
  });
});
