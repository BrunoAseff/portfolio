// Original editable Bézier artwork. General long-tailed passerine proportions,
// not a claim to be an illustration of a particular local species.
export const art = {
  tail: "M-11-15 C-18-9-24-1-31 6 Q-33 8-31 9 L-29 9-30 11 Q-27 12-24 9 L-15 2-6-8Z",
  body: "M-13-10 C-18-13-18-20-11-24 C-6-27 0-27 5-25 L9-27 C13-26 15-23 13-19 C12-13 8-9 3-7 C-2-6-9-6-13-10Z",
  head: "M5-25 C3-28 5-33 9-34 C14-35 18-32 17-29 L24-27 17-26 C15-22 10-22 6-23Z",
  folded: "M-12-21 C-7-25 0-25 7-20 C5-15-2-11-12-9 Q-17-13-12-21Z",
  wing: "M-7-20 C-17-25-26-38-29-49 Q-27-53-24-48 L-20-41-23-51 Q-21-55-18-49 L-13-39-15-49 Q-12-52-10-45 L-6-35-7-43 Q-4-45-2-38 C3-30 5-25 7-20Z",
};
const clamp = (x) => Math.max(0, Math.min(1, x));
export const smooth = (x) => {
  x = clamp(x);
  return x * x * (3 - 2 * x);
};
function curve(a, b, c, d, u) {
  const v = 1 - u;
  return [
    v * v * v * a[0] + 3 * v * v * u * b[0] + 3 * v * u * u * c[0] + u * u * u * d[0],
    v * v * v * a[1] + 3 * v * v * u * b[1] + 3 * v * u * u * c[1] + u * u * u * d[1],
  ];
}
export class Bird {
  constructor(saved) {
    this.phase = ["waiting", "enter", "perched", "exit", "away"].includes(saved?.phase)
      ? saved.phase
      : "waiting";
    this.age = Number.isFinite(saved?.age) ? saved.age : 0;
    this.alert = 0;
    this.hover = false;
    this.focus = false;
    this.dwell = 0;
  }
  replay() {
    this.phase = "enter";
    this.age = 0;
    this.dwell = 0;
  }
  launch() {
    if (this.phase === "perched") {
      this.phase = "exit";
      this.age = 0;
      this.dwell = 0;
    }
  }
  step(dt, near = false) {
    this.alert +=
      ((this.hover || this.focus || near ? 1 : 0) - this.alert) * (1 - Math.exp(-dt * 5));
    this.age += dt;
    if (this.phase === "waiting" && this.age >= 2.8) {
      this.phase = "enter";
      this.age = 0;
    } else if (this.phase === "enter" && this.age >= 4.8) {
      this.phase = "perched";
      this.age = 0;
    } else if (this.phase === "perched") {
      this.dwell = this.hover ? this.dwell + dt : 0;
      if (this.age > 70) this.launch();
    } else if (this.phase === "exit" && this.age >= 4.5) {
      this.phase = "away";
      this.age = 0;
    } else if (this.phase === "away" && this.age >= 9) {
      this.replay();
    }
  }
  save() {
    return { phase: this.phase, age: this.age };
  }
  pose(perch, time, width, quiet = false) {
    const P = [perch.x, perch.y];
    if (quiet)
      return {
        x: P[0],
        y: P[1],
        scale: 0.48,
        angle: perch.angle,
        flight: 0,
        flap: 0,
        alert: 0,
        visible: true,
        perched: true,
      };
    if (this.phase === "waiting" || this.phase === "away")
      return { visible: false, perched: false };
    if (this.phase === "perched")
      return {
        x: P[0],
        y: P[1],
        scale: 0.48,
        angle: perch.angle,
        flight: 0,
        flap: 0,
        alert: this.alert,
        visible: true,
        perched: true,
      };
    if (this.phase === "enter") {
      const u = clamp(this.age / 4.8),
        v = 1 - (1 - u) ** 1.65,
        p = curve([-85, P[1] - 150], [P[0] - 150, P[1] - 235], [P[0] - 60, P[1] - 125], P, v),
        landing = smooth((u - 0.74) / 0.26);
      return {
        x: p[0],
        y: p[1],
        scale: 0.9 - (0.9 - 0.48) * smooth(u),
        angle: -0.12 * (1 - landing) + perch.angle * landing,
        flight: 1 - landing,
        flap: Math.sin(time * 17) * (1 - 0.35 * landing),
        alert: 0,
        visible: true,
        perched: false,
      };
    }
    const u = clamp((this.age - 0.18) / 4.32),
      v = smooth(u),
      p = curve(
        P,
        [P[0] + 140, P[1] - 90],
        [width * 0.63, P[1] - 120],
        [width + 110, P[1] - 98],
        v,
      ),
      cruise = smooth((this.age - 0.12) / 0.65);
    return {
      x: p[0],
      y: p[1],
      scale: 0.48 + 0.035 * Math.sin(u * Math.PI),
      angle: perch.angle * (1 - cruise) + 0.62 * cruise,
      flight: smooth(this.age / 0.18),
      flap: Math.sin(time * 18),
      foreground: true,
      alert: 0,
      crouch: u === 0 ? 1.8 * Math.sin(Math.PI * clamp(this.age / 0.18)) : 0,
      visible: true,
      perched: false,
    };
  }
}
const paths = new Map();
function getPath(k) {
  if (!paths.has(k)) paths.set(k, new Path2D(art[k]));
  return paths.get(k);
}
export function drawBird(c, p, time) {
  if (!p.visible) return;
  c.save();
  c.translate(p.x, p.y);
  c.rotate(p.angle || 0);
  c.scale(p.scale, p.scale);
  c.translate(0, p.crouch || 0);
  const fill = (key, color) => {
    c.fillStyle = color;
    c.fill(getPath(key));
  };
  const wing = (far) => {
    c.save();
    c.translate(-4, -21);
    const flap = p.flap || 0;
    c.rotate(0.12 * flap);
    c.scale((far ? 0.72 : 1) * (0.82 + 0.18 * Math.abs(flap)), (far ? 0.65 : 1) * flap * 0.92);
    c.translate(4, 21);
    fill("wing", far ? "#70898c" : "#4d696f");
    c.restore();
  };
  if (p.flight > 0.03) {
    c.save();
    c.globalAlpha = smooth(p.flight * 2);
    wing(true);
    c.restore();
  }
  c.save();
  c.translate(-5, -10);
  c.rotate(-0.11 * (p.alert || 0) + 0.03 * Math.sin(time * 0.9));
  c.translate(5, 10);
  fill("tail", "#4b666c");
  c.restore();
  fill("body", "#4a656c");
  c.save();
  c.translate(11, -27);
  c.rotate(-0.2 * (p.alert || 0) + 0.045 * Math.sin(time * 0.73));
  c.translate(-11, 27);
  fill("head", "#405961");
  c.restore();
  c.save();
  c.globalAlpha = 1 - smooth(p.flight * 2);
  fill("folded", "#526d73");
  c.strokeStyle = "#789195";
  c.lineWidth = 0.7;
  c.beginPath();
  c.moveTo(-9, -18);
  c.quadraticCurveTo(-3, -16, 4, -18);
  c.stroke();
  c.restore();
  if (p.flight > 0.03) {
    c.save();
    c.globalAlpha = smooth(p.flight * 2);
    wing(false);
    c.restore();
  }
  c.strokeStyle = "#435e64";
  c.lineWidth = 1.1;
  c.lineCap = "round";
  c.lineJoin = "round";
  c.beginPath();
  const legs = 1 - smooth(p.flight * 2);
  c.moveTo(-3, -7);
  c.lineTo(-5, -4);
  c.lineTo(-3, -4 + 4 * legs);
  c.lineTo(0.5, -4 + 0.3 * legs + 4 * legs);
  c.moveTo(-3, -4 + 4 * legs);
  c.lineTo(-6, -4 + 5 * legs);
  c.moveTo(4, -8);
  c.lineTo(3, -4);
  c.lineTo(4, -4 + 4 * legs);
  c.lineTo(7, -4 + 4.3 * legs);
  c.stroke();
  c.restore();
}
// Native SVG proof uses precisely the same contour vocabulary.
export function birdSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="450" viewBox="-45 -48 100 65"><rect x="-45" y="-48" width="100" height="65" fill="#fcfcfa"/>${["tail", "body", "head", "folded"].map((k) => `<path d="${art[k]}" fill="${k === "folded" ? "#526d73" : "#4a656c"}"/>`).join("")}<path d="M-3-7 -5-4 -3 0 .5 .3 M-3 0 -6 1 M4-8 3-4 4 0 7 .3" fill="none" stroke="#435e64" stroke-width="1.1" stroke-linecap="round"/></svg>`;
}
