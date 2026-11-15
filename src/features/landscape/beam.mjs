import { wind } from "./mecanica.mjs";
export function inclination(t, mode, x) {
  if (mode === "parado") return 0;
  const load = 0.65 * wind(t - 0.7, x, mode) + 0.35 * wind(t - 1.7, x, mode);
  return 0.085 * Math.tanh((0.036 * load) / 0.085);
}
// Neutral-axis bend parameterized by arc length. Small-angle integrals retain
// length to sixth order at the bounded maximum angle (<5 degrees).
// Above the collar, ONE rigid transformation preserves every crown distance.
export function beamPoint(x, y, join, a, out = [0, 0]) {
  const L = 1480 - join,
    d = Math.min(L, Math.max(0, 1480 - y)),
    h = d / L,
    angle = a * Math.pow(h, 1.5),
    dx = x - 671;
  const cx = 671 + L * ((a * Math.pow(h, 2.5)) / 2.5 - (a * a * a * Math.pow(h, 5.5)) / 33);
  const cy = 1480 - d + L * ((a * a * Math.pow(h, 4)) / 8 - (a ** 4 * Math.pow(h, 7)) / 168);
  const extra = Math.max(0, join - y),
    co = Math.cos(angle),
    si = Math.sin(angle);
  out[0] = cx + extra * si + dx * co;
  out[1] = cy - extra * co + dx * si;
  return out;
}
export const beamGLSL = `vec2 bend(vec2 p,float join,float a){
 float L=1480.-join,d=min(L,max(0.,1480.-p.y)),h=d/L,angle=a*pow(h,1.5),dx=p.x-671.;
 float cx=671.+L*(a*pow(h,2.5)/2.5-a*a*a*pow(h,5.5)/33.);
 float cy=1480.-d+L*(a*a*pow(h,4.)/8.-pow(a,4.)*pow(h,7.)/168.);
 float extra=max(0.,join-p.y),co=cos(angle),si=sin(angle);
 return vec2(cx+extra*si+dx*co,cy-extra*co+dx*si);}`;
