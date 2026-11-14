import { restPoint, variants } from "./modelo.mjs";
import { beamPoint, inclination } from "./beam.mjs";
export function camera(width, height) {
  return { spread: width / (height * 2), worldWidth: (887 * width) / height, scale: height / 887 };
}
// Uses the exact upper-edge vertex constructed by mecanica.ribbon, not a
// separate guessed branch line. The two neighbouring vertices set its tangent.
export function perchPoint(item, b, t, mode, spread) {
  const k = 12,
    join = 1017 * variants[item.kind].depth,
    angle = inclination(t, mode, item.x),
    scale = item.height / 1480;
  function upper(i) {
    const a = b.moved[i],
      prev = b.moved[i - 1],
      next = b.moved[i + 1],
      dx = next[0] - prev[0],
      dy = next[1] - prev[1],
      length = Math.hypot(dx, dy),
      half = (2 + (b.width - 2) * (1 - i / 18) ** 1.13) * 0.5;
    const p = restPoint(
      a[0] + (dy / length) * half + 670,
      a[1] - (dx / length) * half + 790,
      item.kind,
    );
    return beamPoint(p[0], p[1], join, angle);
  }
  const v = upper(k),
    prev = upper(k - 1),
    next = upper(k + 1);
  return {
    x: item.x * spread + (v[0] - 671) * scale,
    y: item.rootY + (v[1] - 1477) * scale,
    angle: Math.atan2(next[1] - prev[1], next[0] - prev[0]),
    native: v,
  };
}
