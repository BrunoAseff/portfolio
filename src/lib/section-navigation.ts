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
    document.querySelectorAll<HTMLElement>("header#inicio, main section[id], #tecnologias"),
  );
  return currentSection(
    sections.map((section) => ({ id: section.id, top: section.getBoundingClientRect().top })),
    window.scrollY,
    window.innerHeight,
    document.documentElement.scrollHeight,
  );
}

/** Animate explicit anchor choices only; free scrolling stays native. */
export function initSectionTravel() {
  let frame = 0;
  const cancel = () => cancelAnimationFrame(frame);
  for (const event of ["wheel", "touchstart", "pointerdown", "keydown"]) {
    window.addEventListener(event, cancel, { passive: true });
  }
  document.querySelectorAll<HTMLAnchorElement>(".index a, .back").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || event.button !== 0)
        return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      cancel();
      const from = window.scrollY;
      const top = target.id === "inicio" ? 0 : target.getBoundingClientRect().top + from - 40;
      const to = Math.max(0, Math.min(top, document.documentElement.scrollHeight - innerHeight));
      const duration = matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 0
        : Math.min(650, 330 + Math.abs(to - from) * 0.06);
      const started = performance.now();
      const step = (now: number) => {
        const t = duration ? Math.min(1, (now - started) / duration) : 1;
        const progress = 1 - (1 - t) ** 4;
        scrollTo(0, from + (to - from) * progress);
        if (t < 1) frame = requestAnimationFrame(step);
        else {
          if (event.detail === 0) {
            const heading = target.querySelector<HTMLElement>("h1,h2,h3") ?? target;
            heading.setAttribute("tabindex", "-1");
            heading.focus({ preventScroll: true });
          }
          const url = new URL(location.href);
          url.hash = sectionHash(target.id);
          history.replaceState(history.state, "", url);
        }
      };
      frame = requestAnimationFrame(step);
    });
  });
}
