import {
  setSound,
  restoreSound,
  getSound,
  getSoundState,
  subscribeSound,
  play,
  prepare,
  sceneAudio,
} from "./audio";
export function initSoundToggle() {
  const button = document.querySelector<HTMLButtonElement>(".sound");
  if (!button) return;
  const on = ["M16 8C18.7 10.2 18.7 13.8 16 16", "M19 5C24.1 8.8 24.1 15.2 19 19"];
  const off = ["M17 9C18.67 11 20.33 13 22 15", "M22 9C20.33 11 18.67 13 17 15"];
  const animations = new WeakMap<SVGPathElement, Animation>();
  function render() {
    const running = getSoundState(),
      pending = getSound() && !running;
    button!.dataset.audioState = running ? "running" : pending ? "blocked" : "off";
    button!.setAttribute("aria-pressed", String(running));
    const label = (running ? button!.dataset.soundOffLabel : button!.dataset.soundOnLabel)!;
    button!.setAttribute("aria-label", label);
    button!.title = pending
      ? document.documentElement.lang.startsWith("en")
        ? "Enable saved sounds"
        : "Ativar sons salvos"
      : label;
    button!.querySelectorAll<SVGPathElement>(".sound-wave").forEach((path, i) => {
      const next = (running ? on : off)[i]!,
        before = path.getAttribute("d");
      if (next === before) return;
      animations.get(path)?.cancel();
      path.setAttribute("d", next);
      if (!matchMedia("(prefers-reduced-motion:reduce)").matches) {
        const a = path.animate([{ d: `path("${before}")` }, { d: `path("${next}")` }], {
          duration: 210 + i * 25,
          easing: "cubic-bezier(.2,.8,.25,1)",
        });
        animations.set(path, a);
        a.finished.catch(() => {});
      }
    });
  }
  restoreSound();
  render();
  subscribeSound(render);
  let pendingAtPress = false;
  const remember = () => {
    pendingAtPress = getSound() && button.getAttribute("aria-pressed") !== "true";
  };
  button.addEventListener("pointerdown", remember, { capture: true });
  button.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter" || e.key === " ") remember();
    },
    { capture: true },
  );
  button.addEventListener("click", async () => {
    const pending = pendingAtPress || (getSound() && sceneAudio()?.state !== "running");
    pendingAtPress = false;
    if (pending) {
      await prepare();
      render();
      return;
    }
    const enabled = !getSound();
    setSound(enabled);
    if (enabled) await play("tap", true);
    render();
  });
  addEventListener(
    "keydown",
    (e) => {
      if (!e.metaKey && !e.ctrlKey && getSound()) void prepare();
    },
    { capture: true },
  );
}
