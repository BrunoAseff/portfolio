import { tree, pathString } from "./modelo.mjs";
import { makeWindPass } from "./vento-gpu.mjs";
export const box = { x: -180, y: -120, w: 1770, h: 1650 };
const mix = (a, b, t) => a.map((n, i) => Math.round(n + (b[i] - n) * t));
export function treeColor(depth, ink) {
  const base = mix([73, 105, 108], [132, 158, 155], ink),
    c = mix(base, [226, 237, 236], depth * 0.83);
  return depth > 0.75 ? mix(c, [174, 196, 197], 0.18) : c;
}
function shape(c, a) {
  c.beginPath();
  for (const s of a) {
    switch (s[0]) {
      case "M":
        c.moveTo(s[1], s[2]);
        break;
      case "L":
        c.lineTo(s[1], s[2]);
        break;
      case "C":
        c.bezierCurveTo(s[1], s[2], s[3], s[4], s[5], s[6]);
        break;
      case "Z":
        c.closePath();
    }
  }
}
export async function makePainter() {
  const pigment = new Image();
  pigment.src = new URL("./art/pigmento.png", import.meta.url);
  await pigment.decode();
  let gpu = null;
  try {
    gpu = makeWindPass();
  } catch (e) {
    console.warn("Vento sem GPU: quadro estático.", e.message);
  }
  const surfaces = new Map(),
    paths = new Map();
  return {
    get moving() {
      return !!gpu?.available;
    },
    get buffers() {
      return surfaces.size * 2;
    },
    drawTree(ctx, item, t, mode, ink, spread = 1) {
      const far = item.height < 150,
        ratio = far ? 1 / 6 : 0.5,
        width = far ? 295 : 885,
        height = far ? 275 : 825,
        key = far ? item.depth + "|" + item.kind : item.depth;
      let s = surfaces.get(key);
      if (!s) {
        const frame = document.createElement("canvas"),
          material = document.createElement("canvas");
        frame.width = material.width = width;
        frame.height = material.height = height;
        s = { frame, f: frame.getContext("2d"), material, m: material.getContext("2d"), ink: -1 };
        surfaces.set(key, s);
      }
      if (s.ink !== ink) {
        const c = treeColor(item.depth, ink),
          m = s.m;
        m.globalAlpha = 1;
        m.globalCompositeOperation = "source-over";
        m.fillStyle = "rgb(" + c.join(",") + ")";
        m.fillRect(0, 0, width, height);
        m.globalCompositeOperation = "multiply";
        m.globalAlpha = ink * 0.55 * (1 - item.depth);
        m.drawImage(pigment, 0, 0, width, height);
        m.globalAlpha = 1;
        m.globalCompositeOperation = "source-over";
        s.ink = ink;
        s.dirty = true;
      }
      let model;
      if (!far || s.dirty) {
        model = tree(item.kind, t, !far && gpu?.available ? mode : "parado", item.x, true);
        if (!paths.has(item.kind))
          paths.set(item.kind, {
            base: new Path2D(pathString(model.base)),
            stem: new Path2D(pathString(model.stem)),
          });
        const p = paths.get(item.kind),
          f = s.f;
        f.setTransform(1, 0, 0, 1, 0, 0);
        f.clearRect(0, 0, width, height);
        f.setTransform(ratio, 0, 0, ratio, 180 * ratio, 120 * ratio);
        f.fillStyle = "#fff";
        f.fill(p.base);
        f.fill(p.stem);
        for (const a of [model.wood, model.leaf]) {
          shape(f, a);
          f.fill();
        }
        f.setTransform(1, 0, 0, 1, 0, 0);
        f.globalCompositeOperation = "source-in";
        f.drawImage(s.material, 0, 0);
        f.globalCompositeOperation = "source-over";
        s.dirty = false;
      }
      const frame = gpu?.available ? gpu.render(s.frame, t, mode, item.x, item.kind) : s.frame,
        scale = item.height / 1480;
      ctx.drawImage(
        frame || s.frame,
        item.x * spread + (box.x - 671) * scale,
        item.rootY + (box.y - 1477) * scale,
        box.w * scale,
        box.h * scale,
      );
      return model?.branch;
    },
    dispose() {
      gpu?.dispose();
      surfaces.clear();
      paths.clear();
    },
  };
}
