export type SectionPosition = { id: string; top: number };

// The section at the upper reading area is the current destination, rather
// than whichever anchor happened to be clicked earlier.
export function currentSection(
  sections: SectionPosition[],
  scrollY: number,
  viewportHeight: number,
  documentHeight: number,
) {
  if (scrollY < 24 || sections.length === 0) return "inicio";
  if (scrollY + viewportHeight >= documentHeight - 2) return sections.at(-1)!.id;
  const readingLine = Math.min(120, viewportHeight / 4);
  return sections.filter((section) => section.top <= readingLine).at(-1)?.id ?? "inicio";
}

export function sectionHash(section: string) {
  return section === "inicio" ? "" : `#${section}`;
}

export function visibleSection() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("header#inicio, main section[id]"),
  );
  return currentSection(
    sections.map((section) => ({ id: section.id, top: section.getBoundingClientRect().top })),
    window.scrollY,
    window.innerHeight,
    document.documentElement.scrollHeight,
  );
}
