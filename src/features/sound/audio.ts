export const soundStorageKey = "portfolio:sound";
type Tone = [number, number, number, number, number];
type SoundKind =
  | "tap"
  | "hover"
  | "navigate"
  | "locale"
  | "open"
  | "close"
  | "paper"
  | "external"
  | "copy"
  | "success"
  | "top";
type Voice = { o: OscillatorNode; g: GainNode; kind: SoundKind; fading: boolean };
let enabled = false,
  ctx: AudioContext | null = null,
  intent: SoundKind = "tap",
  pitch = 1,
  lastAt = -1,
  lastKind: SoundKind | "" = "";
const active = new Set<Voice>();
const listeners = new Set<() => void>();
function get() {
  return enabled;
}
function notify() {
  listeners.forEach((f) => f());
}
function stop() {
  for (const voice of active) {
    try {
      voice.o.stop();
    } catch {}
  }
  active.clear();
}
function set(v: boolean) {
  enabled = v;
  intent = "tap";
  pitch = 1;
  try {
    sessionStorage.setItem(soundStorageKey, v ? "on" : "off");
  } catch {}
  if (!v) stop();
  else void prepare();
  notify();
}
function restore() {
  try {
    enabled = sessionStorage.getItem("portfolio:sound") === "on";
  } catch {}
  if (enabled) void prepare();
  notify();
}
function subscribe(f: () => void) {
  listeners.add(f);
  return () => listeners.delete(f);
}
export function cue(kind: SoundKind, variation = 1) {
  intent = kind;
  pitch = variation;
}
const tones: Record<SoundKind, Tone[]> = {
  tap: [[330, 294, 0, 0.105, 0.048]],
  hover: [[520, 510, 0, 0.065, 0.018]],
  navigate: [
    [294, 330, 0, 0.105, 0.044],
    [440, 440, 0.035, 0.105, 0.014],
  ],
  locale: [
    [349, 392, 0, 0.16, 0.045],
    [523, 523, 0.045, 0.11, 0.012],
  ],
  open: [
    [220, 294, 0, 0.17, 0.047],
    [440, 440, 0.015, 0.1, 0.012],
  ],
  close: [[294, 220, 0, 0.16, 0.043]],
  paper: [
    [392, 370, 0, 0.12, 0.035],
    [588, 560, 0.025, 0.09, 0.01],
  ],
  external: [[392, 440, 0, 0.105, 0.038]],
  copy: [[330, 349, 0, 0.08, 0.034]],
  success: [
    [440, 440, 0, 0.13, 0.043],
    [660, 660, 0.065, 0.16, 0.036],
  ],
  top: [
    [294, 440, 0, 0.19, 0.043],
    [587, 587, 0.04, 0.1, 0.009],
  ],
};
async function prepare() {
  try {
    ctx ??= new AudioContext({ latencyHint: "interactive" });
    if (ctx.state === "suspended") await ctx.resume();
    return ctx.state === "running";
  } catch {
    return false;
  }
}
async function play(kind: SoundKind = "tap", force = false) {
  if ((!enabled && !force) || document.hidden) return;
  const selected = kind === "tap" ? intent : kind,
    variation = pitch,
    now = performance.now();
  // Deduplicate same-event click calls only. Rapid entries on different controls always play.
  if (selected !== "hover" && selected === lastKind && now - lastAt < 8) return;
  lastKind = selected;
  lastAt = now;
  if (!(await prepare()) || (!enabled && !force) || document.hidden) return;
  if (selected === "hover" && performance.now() - now > 120) return; // Never replay hovers queued behind an autoplay lock.
  try {
    if (!ctx) return;
    const start = ctx.currentTime;
    // Keep a soft tail instead of cutting a response or suppressing the next one.
    if (selected === "hover")
      for (const voice of active) {
        if (voice.kind === "hover" && !voice.fading) {
          voice.fading = true;
          voice.g.gain.cancelScheduledValues(start);
          voice.g.gain.setTargetAtTime(0.0001, start, 0.006);
          voice.o.stop(start + 0.025);
        }
      }
    for (const [from, to, offset, length, volume] of tones[selected] || tones.tap) {
      const o = ctx.createOscillator(),
        g = ctx.createGain(),
        t = start + offset,
        voice = { o, g, kind: selected, fading: false };
      o.type = "sine";
      o.frequency.setValueAtTime(from * variation, t);
      o.frequency.exponentialRampToValueAtTime(to * variation, t + length);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(volume * (selected === "hover" ? 5 : 3), t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + length);
      o.connect(g);
      g.connect(ctx.destination);
      active.add(voice);
      o.onended = () => {
        active.delete(voice);
        o.disconnect();
        g.disconnect();
      };
      o.start(t);
      o.stop(t + length + 0.015);
    }
  } catch {}
}
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointerdown",
    () => {
      if (enabled) void prepare();
    },
    { capture: true, passive: true },
  );
  window.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
  });
}

export {
  subscribe as subscribeSound,
  set as setSound,
  play,
  restore as restoreSound,
  get as getSound,
};
