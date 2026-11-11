let enabled = false;
let context: AudioContext | null = null;
const listeners = new Set<() => void>();
export const soundStorageKey = "portfolio:sound";
export const getSound = () => enabled;
export function subscribeSound(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export function restoreSound() {
  try {
    enabled = sessionStorage.getItem(soundStorageKey) === "on";
  } catch {
    /* Optional storage. */
  }
  listeners.forEach((fn) => fn());
}
export function setSound(value: boolean) {
  enabled = value;
  try {
    sessionStorage.setItem(soundStorageKey, value ? "on" : "off");
  } catch {
    /* Optional storage. */
  }
  listeners.forEach((fn) => fn());
}
export function play(kind: "tap" | "success", force = false) {
  if (!enabled && !force) return;
  try {
    context ??= new AudioContext();
    const ctx = context;
    void ctx.resume();
    const t = ctx.currentTime;
    (kind === "success" ? [660, 880] : [560]).forEach((frequency, index) => {
      const osc = ctx.createOscillator(),
        gain = ctx.createGain(),
        start = t + index * 0.052;
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, start);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.88, start + 0.09);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.025, start + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.13);
    });
  } catch {
    /* Sound must never block an action. */
  }
}
