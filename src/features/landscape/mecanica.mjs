import leaves from "./art/folhas.mjs";
const fmt = (n) => Math.round(n * 1000) / 1000;
export function point(c, t) {
  let u = 1 - t;
  return [
    u * u * u * c[0][0] + 3 * u * u * t * c[1][0] + 3 * u * t * t * c[2][0] + t * t * t * c[3][0],
    u * u * u * c[0][1] + 3 * u * u * t * c[1][1] + 3 * u * t * t * c[2][1] + t * t * t * c[3][1],
  ];
}
export function wind(t, x = 0, mode = "brisa") {
  if (mode === "parado") return 0;
  const q = t - x / 240,
    cycle = ((q % 19) + 19) % 19;
  const pulse =
    Math.exp(-(((cycle - 6.8) / 1.75) ** 2)) + 0.46 * Math.exp(-(((cycle - 14) / 1.2) ** 2));
  const stronger =
    typeof mode === "object"
      ? mode.gust
      : typeof mode === "number"
        ? mode
        : mode === "rajada"
          ? 1
          : 0;
  const strength = typeof mode === "object" ? mode.strength : 1;
  return (
    strength *
    (0.32 +
      0.18 * Math.sin(q * 0.39) +
      0.085 * Math.sin(q * 1.13 + 0.8) +
      1.1 * pulse +
      stronger * (0.5 + 0.8 * pulse))
  );
}
function smoothClosed(points) {
  let cmd = [["M", ...points[0]]];
  for (let i = 0; i < points.length; i++) {
    const a = points[(i - 1 + points.length) % points.length],
      p = points[i],
      q = points[(i + 1) % points.length],
      b = points[(i + 2) % points.length];
    cmd.push([
      "C",
      p[0] + (q[0] - a[0]) / 6,
      p[1] + (q[1] - a[1]) / 6,
      q[0] - (b[0] - p[0]) / 6,
      q[1] - (b[1] - p[1]) / 6,
      ...q,
    ]);
  }
  cmd.push(["Z"]);
  return cmd;
}
export function ribbon(points, width) {
  const left = [],
    right = [];
  const n = points.length - 1;
  for (let i = 0; i <= n; i++) {
    const a = points[Math.max(0, i - 1)],
      b = points[Math.min(n, i + 1)];
    let dx = b[0] - a[0],
      dy = b[1] - a[1],
      l = Math.hypot(dx, dy) || 1;
    const w = (2 + (width - 2) * (1 - i / n) ** 1.13) * 0.5;
    left.push([points[i][0] - (dy / l) * w, points[i][1] + (dx / l) * w]);
    right.push([points[i][0] + (dy / l) * w, points[i][1] - (dx / l) * w]);
  }
  return smoothClosed([...left, ...right.reverse()]);
}
export function branch(def, t, mode, x = 0, index = 0) {
  const [y, c1x, c1y, c2x, c2y, tx, ty, width, kind, sx, sy, angle] = def;
  const rest = Array.from({ length: 19 }, (_, i) =>
    point(
      [
        [0, y],
        [c1x, c1y],
        [c2x, c2y],
        [tx, ty],
      ],
      i / 18,
    ),
  );
  const length = rest
    .slice(1)
    .reduce((s, p, i) => s + Math.hypot(p[0] - rest[i][0], p[1] - rest[i][1]), 0);
  const pressure = wind(t, x + tx * 0.3, mode);
  const flex = 0.15 * pressure * (length / 410) ** 0.65 * (0.9 + 0.1 * Math.sin(index * 1.6));
  const moved = [rest[0]];
  let delta = 0;
  for (let i = 0; i < rest.length - 1; i++) {
    let dx = rest[i + 1][0] - rest[i][0],
      dy = rest[i + 1][1] - rest[i][1];
    delta = flex * (i / (rest.length - 2)) ** 1.5;
    const co = Math.cos(delta),
      si = Math.sin(delta),
      p = moved.at(-1);
    moved.push([p[0] + dx * co - dy * si, p[1] + dx * si + dy * co]);
  }
  const secondary =
    mode === "parado" ? 0 : Math.sin(t * 2.05 - index * 0.67 - x * 0.001) * 0.017 * pressure;
  const commands = leaves[kind].commands.map((seg) => {
    if (seg[0] === "Z") return seg;
    const a = [seg[0]];
    for (let j = 1; j < seg.length; j += 2) {
      const px = seg[j],
        py = seg[j + 1];
      const rad = Math.hypot(px, py),
        w = Math.max(0, Math.min(1, (rad - 15) / 125));
      const ang = secondary * w * w;
      const co = Math.cos(ang),
        si = Math.sin(ang);
      a.push(px * co - py * si, px * si + py * co);
    }
    return a;
  });
  return {
    wood: ribbon(moved, width),
    rest,
    moved,
    tip: moved.at(-1),
    width,
    leaf: commands,
    sx: sx * (tx < 0 ? -1 : 1),
    sy,
    rotation: angle + (delta * 180) / Math.PI,
    kind,
    length,
  };
}
export function pathString(commands) {
  return commands.map((s) => s[0] + s.slice(1).map(fmt).join(" ")).join(" ");
}
