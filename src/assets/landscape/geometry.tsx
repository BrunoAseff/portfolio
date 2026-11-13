// Original silhouettes: broad, irregular Araucaria crowns and long exposed trunks.
// Needle tips are deterministic; no random re-rendering or external illustration.
function Crown({
  x,
  y,
  rx,
  ry,
  seed,
}: {
  x: number;
  y: number;
  rx: number;
  ry: number;
  seed: number;
}) {
  const points = Array.from({ length: 47 }, (_, i) => {
    const angle = Math.PI + (i / 46) * Math.PI;
    const tooth = i % 2 === 0 ? 1 : 0.83;
    const irregular = 1 + Math.sin(i * 2.17 + seed) * 0.09;
    return `${(x + Math.cos(angle) * rx * irregular).toFixed(2)},${(y + Math.sin(angle) * ry * tooth * irregular).toFixed(2)}`;
  });
  points.push(
    `${x + rx * 0.78},${y + ry * 0.18}`,
    `${x + rx * 0.24},${y + ry * 0.3}`,
    `${x - rx * 0.55},${y + ry * 0.25}`,
    `${x - rx * 0.95},${y + ry * 0.05}`,
  );
  return <polygon points={points.join(" ")} />;
}
export function Araucaria({
  x = 0,
  y = 0,
  scale = 1,
  variant = 0,
}: {
  x?: number;
  y?: number;
  scale?: number;
  variant?: number;
}) {
  const crowns = [
    [37, 100, 26, 16],
    [62, 81, 29, 20],
    [90, 69, 28, 20],
    [118, 61, 29, 21],
    [145, 66, 30, 22],
    [172, 78, 29, 19],
    [200, 99, 28, 17],
    [63, 122, 22, 14],
    [175, 123, 25, 15],
    [88, 147, 20, 13],
    [155, 153, 23, 12],
  ];
  return (
    <g className="araucaria" transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M115 356c4-34 3-71 4-109l1-131 4-48 4 46-2 134c-1 38 2 76 4 108Z" />
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path
          strokeWidth="3.6"
          d="M123 131C90 130 55 123 36 99M122 126C99 117 73 99 62 81M123 119C108 105 94 86 90 69M125 117C126 94 121 79 118 61M125 124C143 112 146 89 145 66M125 134C160 128 187 112 200 99M125 126C145 120 164 98 172 78"
        />
        <path
          strokeWidth="2.5"
          d="M122 159C98 159 72 143 63 122M125 165C151 162 171 143 175 123M122 188C109 184 93 168 88 147M125 198C143 192 153 171 155 153"
        />
        <path
          strokeWidth="1.5"
          d="M122 138C81 143 51 125 25 111M125 144C157 146 195 125 214 108M121 171C99 171 85 159 74 151M126 177C150 177 176 159 187 145"
        />
      </g>
      {crowns.map(([cx, cy, rx, ry], i) => (
        <Crown key={i} x={cx} y={cy} rx={rx} ry={ry} seed={variant + i} />
      ))}
      <Crown x={26} y={111} rx={17} ry={11} seed={8} />
      <Crown x={213} y={108} rx={18} ry={12} seed={12} />
      <path
        d="m120 231-9-7 9 3m7 29 9-7-9 4m-7 36-8-6 8 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </g>
  );
}
export function Landscape({ side }: { side: "left" | "right" }) {
  return (
    <div className={`landscape landscape-${side}`} aria-hidden="true">
      <svg viewBox="0 0 380 620" preserveAspectRatio="xMidYMid meet" focusable="false">
        <path
          className="mountain-far"
          d="M-30 282 22 259 47 270 79 241 105 211 130 202 142 174 155 179 162 151 181 145 198 169 211 170 236 208 253 210 273 248 302 265 333 285 390 311V620H-30Z"
        />
        <path
          className="mountain-mid"
          d="M-30 354 23 315 58 310 74 283 91 278 116 302 130 300 148 332 172 339 191 363 217 366 251 389 282 394 315 416 390 434V620H-30Z"
        />
        <path
          className="mountain-near"
          d="M-30 463C30 455 55 432 84 439c32 8 50 38 85 47 40 11 52 29 87 45s70 11 134 37v70H-30Z"
        />
        <g className="tree-far">
          <Araucaria x={242} y={300} scale={0.34} variant={2} />
          <Araucaria x={20} y={287} scale={0.43} variant={4} />
        </g>
        <g className="tree-near">
          <Araucaria
            x={side === "left" ? 7 : 68}
            y={side === "left" ? 99 : 196}
            scale={side === "left" ? 1 : 0.82}
          />
        </g>
        <path
          className="ground"
          d="M-30 474c45-3 66-13 93-7 20 5 47 23 76 32 51 15 62 43 111 58 30 9 74 17 140 34v47H-30Z"
        />
      </svg>
    </div>
  );
}
