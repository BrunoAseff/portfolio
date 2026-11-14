// Continuous source: no sampled loop, seam, allocation or state reset per block.
class BreezeNoise extends AudioWorkletProcessor {
  constructor() {
    super();
    this.seed = 17219;
    this.running = true;
    this.port.onmessage = (e) => {
      if (e.data === "stop") this.running = false;
    };
  }
  process(_inputs, outputs) {
    const out = outputs[0]?.[0];
    if (out) {
      let seed = this.seed;
      for (let i = 0; i < out.length; i++) {
        seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
        out[i] = seed / 2147483648 - 1;
      }
      this.seed = seed;
    }
    return this.running;
  }
}
registerProcessor("breeze-noise", BreezeNoise);
