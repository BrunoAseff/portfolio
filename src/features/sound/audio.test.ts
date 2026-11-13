import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { play, setSound } from "./audio";

let starts = 0;
const parameter = () => ({
  setValueAtTime() {},
  linearRampToValueAtTime() {},
  exponentialRampToValueAtTime() {},
  cancelScheduledValues() {},
  setTargetAtTime() {},
});
class TestAudioContext {
  state = "running";
  currentTime = 0;
  destination = {};
  resume() {
    return Promise.resolve();
  }
  createOscillator() {
    return {
      frequency: parameter(),
      connect() {},
      disconnect() {},
      stop() {},
      start() {
        starts++;
      },
    };
  }
  createGain() {
    return { gain: parameter(), connect() {}, disconnect() {} };
  }
}
beforeEach(() => {
  starts = 0;
  vi.stubGlobal("AudioContext", TestAudioContext);
  vi.stubGlobal("document", { hidden: false });
  vi.stubGlobal("sessionStorage", { setItem() {} });
});
afterEach(() => {
  setSound(false);
  vi.unstubAllGlobals();
});

describe("contextual sound responses", () => {
  it("does not drop consecutive hover entries or the action immediately after them", async () => {
    setSound(true);
    for (let i = 0; i < 5; i++) await play("hover");
    expect(starts).toBe(5);
    await play("navigate");
    expect(starts).toBeGreaterThan(5);
  });
  it("remains silent when disabled or the document is hidden", async () => {
    setSound(false);
    await play("hover");
    expect(starts).toBe(0);
    setSound(true);
    vi.stubGlobal("document", { hidden: true });
    await play("hover");
    expect(starts).toBe(0);
  });
});
