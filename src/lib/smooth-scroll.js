let raf = 0,
  target = 0,
  last = 0;
const reduce = () =>
  matchMedia("(prefers-reduced-motion:reduce)").matches ||
  document.documentElement.classList.contains("motion-reduced");
function stop() {
  cancelAnimationFrame(raf);
  raf = 0;
  last = 0;
  target = scrollY;
}
function smooth(now) {
  const dt = last ? Math.min(40, now - last) : 16;
  last = now;
  const before = scrollY,
    next = scrollY + (target - scrollY) * (1 - Math.exp(-dt / 85));
  scrollTo(0, next);
  if (Math.abs(target - scrollY) > 0.7 && scrollY !== before) raf = requestAnimationFrame(smooth);
  else {
    scrollTo(0, target);
    stop();
  }
}
addEventListener(
  "wheel",
  (e) => {
    if (
      reduce() ||
      e.ctrlKey ||
      e.metaKey ||
      document.querySelector("dialog[open]") ||
      !(e.target instanceof Element) ||
      e.target.closest("select,input,textarea,[contenteditable]")
    )
      return;
    const amount = e.deltaY * (e.deltaMode === 1 ? 18 : e.deltaMode === 2 ? innerHeight : 1);
    if (!amount || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (max <= 0) return;
    e.preventDefault();
    if (!raf) target = scrollY;
    target = Math.max(0, Math.min(max, target + amount));
    if (!raf) raf = requestAnimationFrame(smooth);
  },
  { passive: false },
);
for (const name of ["pointerdown", "keydown", "touchstart", "pagehide"])
  addEventListener(name, stop, { passive: true });
addEventListener("portfolio:overlay", stop);
