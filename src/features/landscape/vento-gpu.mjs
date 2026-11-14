// A single, bounded WebGL pass. The SVG artwork is rasterized once for the
// backing and reuses its canvas mask. The mesh applies the same continuous
// field as modelo.mjs, instead of reissuing 7800 Bézier commands every frame.
import { variants } from "./modelo.mjs";
import { inclination, beamGLSL } from "./beam.mjs";
export function makeWindPass() {
  const canvas = document.createElement("canvas");
  canvas.width = 885;
  canvas.height = 825;
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
  });
  if (!gl) return null;
  let lost = false;
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    lost = true;
  });
  function shader(type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw Error(gl.getShaderInfoLog(s));
    return s;
  }
  const vs = shader(
    gl.VERTEX_SHADER,
    `precision highp float;
 attribute vec2 position;varying vec2 uv;uniform float angle;uniform float join;
 ${beamGLSL}
 void main(){vec2 p=position;uv=vec2((p.x+180.)/1770.,(p.y+120.)/1650.);vec2 outPoint=bend(p,join,angle);
 gl_Position=vec4(2.*(outPoint.x+180.)/1770.-1.,1.-2.*(outPoint.y+120.)/1650.,0.,1.);}`,
  );
  const fs = shader(
    gl.FRAGMENT_SHADER,
    `precision mediump float;varying vec2 uv;uniform sampler2D artwork;uniform vec2 sourceSize;void main(){vec2 texel=(clamp(uv,0.,1.)*(sourceSize-1.)+.5)/vec2(885.,825.);gl_FragColor=texture2D(artwork,texel);}`,
  );
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw Error(gl.getProgramInfoLog(program));
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  gl.useProgram(program);
  const nx = 48,
    ny = 52,
    vertices = [],
    indices = [];
  for (let j = 0; j <= ny; j++)
    for (let i = 0; i <= nx; i++) vertices.push(-180 + (i * 1770) / nx, -120 + (j * 1650) / ny);
  for (let j = 0; j < ny; j++)
    for (let i = 0; i < nx; i++) {
      const a = j * (nx + 1) + i,
        b = a + 1,
        c = a + nx + 1,
        d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  const vertex = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const location = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  const index = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 885, 825, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  const sourceSize = gl.getUniformLocation(program, "sourceSize");
  const angle = gl.getUniformLocation(program, "angle"),
    join = gl.getUniformLocation(program, "join");
  gl.uniform1i(gl.getUniformLocation(program, "artwork"), 0);
  gl.viewport(0, 0, 885, 825);
  gl.disable(gl.BLEND);
  return {
    get available() {
      return !lost;
    },
    render(source, t, mode, x, kind) {
      if (lost) return null;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, source);
      gl.uniform2f(sourceSize, source.width, source.height);
      gl.uniform1f(angle, inclination(t, mode, x));
      gl.uniform1f(join, 1017 * variants[kind].depth);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
      return canvas;
    },
    dispose() {
      gl.deleteTexture(texture);
      gl.deleteBuffer(vertex);
      gl.deleteBuffer(index);
      gl.deleteProgram(program);
    },
  };
}
