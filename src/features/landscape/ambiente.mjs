import {
  getSound,
  subscribeSound,
  prepare as prepareSceneAudio,
  sceneAudio,
  uiDestination,
} from "../sound/audio";
// A small filtered noise bed and sparse, non-species-specific whistles.
let wind = null,
  disposed = false,
  enabled = false,
  quiet = false,
  gust = 0,
  lastCall = -100,
  serial = 0;
let lastCallWall = 0;
try {
  lastCallWall = Number(sessionStorage.getItem("portfolio:landscape-last-call")) || 0;
} catch {}
const voices = new Set(),
  worklets = new WeakMap();
function prepareNoise(ctx) {
  if (!ctx.audioWorklet) return Promise.resolve(false);
  if (!worklets.has(ctx))
    worklets.set(
      ctx,
      ctx.audioWorklet
        .addModule("/landscape/breeze-worklet.js")
        .then(() => true)
        .catch(() => false),
    );
  return worklets.get(ctx);
}
function stopVoices() {
  for (const v of voices) {
    try {
      v.stop();
    } catch {}
  }
  voices.clear();
}
function silence() {
  if (!wind) return;
  const w = wind;
  wind = null;
  const t = w.ctx.currentTime;
  const envelope = w.master.gain;
  if (envelope.cancelAndHoldAtTime) envelope.cancelAndHoldAtTime(t);
  else {
    const current = envelope.value;
    envelope.cancelScheduledValues(t);
    envelope.setValueAtTime(current, t);
  }
  envelope.setTargetAtTime(0, t, 0.09);
  setTimeout(() => {
    for (const n of w.nodes) {
      try {
        n.stop?.();
        n.port?.postMessage("stop");
      } catch {}
      n.disconnect();
    }
  }, 500);
}
async function sync() {
  const request = ++serial;
  if (disposed || quiet || document.hidden || !getSound()) {
    enabled = false;
    silence();
    stopVoices();
    return;
  }
  if (
    !(await prepareSceneAudio()) ||
    request !== serial ||
    disposed ||
    quiet ||
    document.hidden ||
    !getSound()
  )
    return;
  enabled = true;
  if (wind) return;
  const ctx = sceneAudio();
  if (!ctx) return;
  if (
    !(await prepareNoise(ctx)) ||
    request !== serial ||
    disposed ||
    quiet ||
    document.hidden ||
    !getSound()
  )
    return;
  const source = new AudioWorkletNode(ctx, "breeze-noise", {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [1],
    }),
    hp = ctx.createBiquadFilter(),
    lp = ctx.createBiquadFilter(),
    gain = ctx.createGain(),
    master = ctx.createGain(),
    lfo = ctx.createOscillator(),
    depth = ctx.createGain(),
    lfo2 = ctx.createOscillator(),
    depth2 = ctx.createGain();
  hp.type = "highpass";
  hp.frequency.value = 180;
  lp.type = "lowpass";
  lp.frequency.value = 1050;
  lp.Q.value = 0.45;
  gain.gain.value = 0.0055 + gust * 0.0015;
  master.gain.value = 0;
  master.gain.setTargetAtTime(1, ctx.currentTime, 1.5);
  lfo.frequency.value = 0.049;
  depth.gain.value = 0.0028;
  lfo2.frequency.value = 0.031;
  depth2.gain.value = 0.0012;
  lfo.connect(depth).connect(gain.gain);
  lfo2.connect(depth2).connect(gain.gain);
  source.connect(hp).connect(lp).connect(gain).connect(master).connect(ctx.destination);
  lfo.start();
  lfo2.start();
  wind = {
    ctx,
    gain,
    master,
    gust,
    nodes: [source, hp, lp, gain, master, lfo, depth, lfo2, depth2],
  };
}
export function birdCall(position = 0.2) {
  if (!enabled || quiet || document.hidden || !getSound() || Date.now() - lastCallWall < 5000)
    return;
  const ctx = sceneAudio();
  if (!ctx || ctx.state !== "running") return;
  lastCallWall = Date.now();
  try {
    sessionStorage.setItem("portfolio:landscape-last-call", String(lastCallWall));
  } catch {}
  for (let i = 0; i < 2; i++) {
    const t = ctx.currentTime + 0.03 + i * 0.19,
      o = ctx.createOscillator(),
      g = ctx.createGain(),
      p = ctx.createStereoPanner();
    o.type = "sine";
    o.frequency.setValueAtTime(2250 + i * 140, t);
    o.frequency.exponentialRampToValueAtTime(3020 + i * 100, t + 0.045);
    o.frequency.exponentialRampToValueAtTime(1990 + i * 80, t + 0.13);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(i ? 0.016 : 0.022, t + 0.018);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    p.pan.value = Math.max(-0.7, Math.min(0.7, position * 1.4 - 0.7));
    o.connect(g).connect(p).connect(uiDestination());
    voices.add(o);
    o.onended = () => {
      voices.delete(o);
      o.disconnect();
      g.disconnect();
      p.disconnect();
    };
    o.start(t);
    o.stop(t + 0.17);
  }
}
export function ambienceFrame(time, bird, motion, paused, _width) {
  const next = paused || motion === "parado";
  gust = motion === "rajada" ? 1 : 0;
  if (next !== quiet) {
    quiet = next;
    void sync();
  }
  if (wind && wind.gust !== gust) {
    wind.gust = gust;
    wind.gain.gain.setTargetAtTime(0.0055 + gust * 0.0015, wind.ctx.currentTime, 1.4);
  }
  if (
    enabled &&
    bird.phase === "perched" &&
    bird.age > 3 &&
    time - lastCall > 29 &&
    Date.now() - lastCallWall > 29000
  ) {
    lastCall = time;
    birdCall(0.2);
  }
}
const unsubscribe = subscribeSound(() => void sync());
const activate = () => {
  if (getSound()) void sync();
};
addEventListener("pointerdown", activate, { passive: true });
addEventListener("visibilitychange", activate);
addEventListener("visibilitychange", () => {
  if (document.hidden) void sync();
});
export function disposeAmbience() {
  disposed = true;
  serial++;
  unsubscribe();
  silence();
  stopVoices();
  removeEventListener("pointerdown", activate);
  removeEventListener("visibilitychange", activate);
}
void sync();

export function ambienceState() {
  return {
    enabled,
    wind: !!wind,
    context: sceneAudio()?.state || "uncreated",
    source: wind ? "continuous-worklet" : "off",
    baseGain: wind?.gain.gain.value || 0,
    voices: voices.size,
  };
}
