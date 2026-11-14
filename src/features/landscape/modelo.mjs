import backing from "./art/copa.mjs";
import { branch, pathString, wind } from "./mecanica.mjs";
export { pathString, wind };
export const credit =
  "Base: LeonardoG (fotografia), T. Michael Keesey (vetorização), PhyloPic ca78afa0-16e0-417d-bae9-65899c8d0a31. CC BY-SA3.0 https://creativecommons.org/licenses/by-sa/3.0/ . Adaptações: proporções, ramo reconstruído, fuste, pigmento, inclinação articulada e movimento de ramo. Sem IA.";
// Positive, globally monotonic changes only. No regional vertical offsets or crown lumps.
// These are proportion studies from one botanical matrix, not four independent specimens.
export const variants = {
  ampla: { name: "Copa ampla", left: 1, right: 1, depth: 0.55 },
  compacta: {
    name: "Copa compacta",
    left: 0.83,
    right: 0.93,
    depth: 0.57,
    tip: 265,
    leafScale: 0.86,
  },
  aberta: { name: "Copa aberta", left: 1.06, right: 1.03, depth: 0.47, tip: 370, leafScale: 0.96 },
  profunda: {
    name: "Copa profunda",
    left: 0.96,
    right: 0.83,
    depth: 0.64,
    tip: 286,
    leafScale: 0.94,
  },
};
export function mapCommands(cmd, fn) {
  return cmd.map((a) => {
    if (a[0] === "Z") return ["Z"];
    const b = [a[0]];
    for (let i = 1; i < a.length; i += 2) b.push(...fn(a[i], a[i + 1]));
    return b;
  });
}
export function restPoint(x, y, kind) {
  const v = variants[kind];
  const d = x - 671;
  return [671 + d * (d < 0 ? v.left : v.right), y * v.depth];
}
import { inclination, beamPoint } from "./beam.mjs";
export function field(t, mode, worldX, kind = "ampla") {
  const a = inclination(t, mode, worldX),
    join = 1017 * variants[kind].depth,
    out = [0, 0];
  return (x, y) => beamPoint(x, y, join, a, out);
}
const models = new Map();
function makeStem(kind) {
  const join = 1017 * variants[kind].depth;
  return [
    ["M", 645, 1480],
    ["C", 652, 1260, 647.2, 995, 647.2, join + 20],
    ["L", 647.2, join - 9],
    ["L", 696.5, join - 9],
    ["C", 696.5, join + 130, 695, 1170, 707, 1480],
    ["C", 691, 1485, 662, 1487, 645, 1480],
    ["Z"],
  ];
}
function copyShape(a) {
  return a.map((s) => s.slice());
}
function deform(source, target, t, mode, worldX, kind) {
  const f = field(t, mode, worldX, kind);
  for (let i = 0; i < source.length; i++) {
    const a = source[i],
      b = target[i];
    for (let j = 1; j < a.length; j += 2) {
      const p = f(a[j], a[j + 1]);
      b[j] = p[0];
      b[j + 1] = p[1];
    }
  }
}
export function tree(kind = "ampla", t = 0, mode = "parado", worldX = 0, restOnly = false) {
  const key = kind;
  if (!models.has(key)) {
    const base = mapCommands(backing, (x, y) => restPoint(x, y, kind)),
      stem = makeStem(kind);
    models.set(key, {
      restBase: base,
      restStem: stem,
      base: copyShape(base),
      stem: copyShape(stem),
      wood: [],
      leaf: [],
    });
  }
  const m = models.get(key),
    f = restOnly ? (x, y) => [x, y] : field(t, mode, worldX, kind);
  if (!restOnly) {
    deform(m.restBase, m.base, t, mode, worldX, kind);
    deform(m.restStem, m.stem, t, mode, worldX, kind);
  }
  const v = variants[kind],
    tip = v.tip || 332,
    ls = v.leafScale || 1;
  const b = branch(
    [0, tip * 0.361, 55, tip * 0.723, 73, tip, 46, 17, 0, 1, 1, 0],
    t,
    mode,
    worldX,
    1,
  );
  m.wood = mapCommands(b.wood, (x, y) => f(...restPoint(x + 670, y + 790, kind)));
  const a = (b.rotation * Math.PI) / 180,
    co = Math.cos(a),
    si = Math.sin(a);
  m.leaf = mapCommands(b.leaf, (x, y) =>
    f(
      ...restPoint(
        (x * co - y * si) * ls + b.tip[0] + 670,
        (x * si + y * co) * ls + b.tip[1] + 790,
        kind,
      ),
    ),
  );
  m.branch = b;
  m.anchor = [...f(...restPoint(670, 790, kind))];
  return restOnly
    ? { base: m.restBase, stem: m.restStem, wood: m.wood, leaf: m.leaf, branch: b }
    : m;
}
export function treeMarkup(kind, t = 0, mode = "parado", fill = "#70888b", worldX = 0) {
  const g = tree(kind, t, mode, worldX);
  return `<g fill="${fill}">${["base", "wood", "leaf", "stem"].map((k) => `<path d="${pathString(g[k])}"/>`).join("")}</g>`;
}
export function treeSVG(kind, t = 0, mode = "parado") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="888" viewBox="-90 -80 1520 1610"><metadata>${credit}</metadata><rect x="-90" y="-80" width="1520" height="1610" fill="#fcfcfa"/>${treeMarkup(kind, t, mode)}</svg>`;
}
