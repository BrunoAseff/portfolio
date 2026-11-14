import { describe, expect, it } from "vite-plus/test";
import { currentSection, sectionHash } from "./section-navigation";

describe("section navigation after manual scrolling", () => {
  it("clears an old project anchor when the visitor returns to the top", () => {
    const section = currentSection(
      [
        { id: "inicio", top: 60 },
        { id: "projetos", top: 1600 },
      ],
      0,
      800,
      3000,
    );
    const destination = new URL("https://example.com/en/#projetos");
    destination.hash = sectionHash(section);
    expect(destination.pathname + destination.hash).toBe("/en/");
  });

  it("tracks the section currently being read instead of the next visible section", () => {
    expect(
      currentSection(
        [
          { id: "inicio", top: -900 },
          { id: "experiencia", top: -80 },
          { id: "projetos", top: 350 },
        ],
        1000,
        800,
        3000,
      ),
    ).toBe("experiencia");
  });

  it("keeps the final section selected when there is no more space to scroll", () => {
    expect(
      currentSection(
        [
          { id: "formacao", top: -400 },
          { id: "contato", top: 350 },
        ],
        2200,
        800,
        3000,
      ),
    ).toBe("contato");
  });
});
