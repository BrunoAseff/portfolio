/** Prepare only offscreen blocks; visible content is never hidden after rendering. */
export function initPageArrival() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || document.documentElement.hasAttribute("data-locale-arrival") || location.hash)
    return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const block = entry.target as HTMLElement;
        delete block.dataset.await;
        block.classList.add("section-arrival");
        block.addEventListener("animationend", () => block.classList.remove("section-arrival"), {
          once: true,
        });
        observer.unobserve(block);
      }
    },
    { threshold: 0.04 },
  );
  document.querySelectorAll<HTMLElement>("main section,.project").forEach((block) => {
    if (block.getBoundingClientRect().top <= innerHeight) return;
    block.dataset.await = "true";
    observer.observe(block);
  });
}
