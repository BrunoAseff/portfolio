import { ambienceFrame, birdCall, disposeAmbience, ambienceState } from "./ambiente.mjs";
import { Bird, drawBird } from "./ave.mjs";
import { perchPoint } from "./projecao.mjs";
import { makePainter } from "./pintura.mjs";
import { W, H, placements, coverPath } from "./solo.mjs";
async function initLandscape() {
  if (!document.querySelector(".landscape-trial")) return;
  const root = document.documentElement,
    stage = document.querySelector(".landscape-trial"),
    canvas = stage.querySelector("canvas"),
    ctx = canvas.getContext("2d", { alpha: false });
  void document.fonts.ready.then(() => {
    stage.dataset.typography = JSON.stringify(
      Array.from(document.fonts, (face) => ({
        family: face.family,
        status: face.status,
        weight: face.weight,
      })),
    );
  });
  let saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem("portfolio:landscape") || "{}");
    if (Date.now() - saved.at > 60000) saved = {};
  } catch {}
  let motion = "rajada",
    ink = 0.5,
    paused = !!saved.paused,
    time = saved.time || 0,
    force = saved.force || 0,
    activation = saved.activation || 0,
    raf = 0,
    previous = 0,
    frames = 0,
    lastMs = 0,
    spread = 1;
  ink = Math.max(0, Math.min(1, ink));
  root.dataset.surface = "glass";
  const actor = new Bird(saved.bird),
    hit = document.querySelector(".bird-hit"),
    primary = placements.find((a) => a.kind === "ampla" && a.height === 590);
  let rect = null,
    reader = null,
    near = false,
    hoverBlend = saved.hoverBlend || 0,
    currentPerch = null;
  hit.setAttribute(
    "aria-label",
    document.documentElement.lang.startsWith("en")
      ? "Let the bird take flight"
      : "Fazer o pássaro levantar voo",
  );
  const front = document.querySelector(".bird-front"),
    frontCtx = front.getContext("2d");
  const spriteDpr = Math.min(devicePixelRatio || 1, 1.25);
  front.width = Math.round(180 * spriteDpr);
  front.height = Math.round(160 * spriteDpr);
  let birdPose = null;
  const ground = new Image();
  ground.src = new URL("./art/terreno.webp", import.meta.url);
  const painter = await makePainter();
  await ground.decode();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)"),
    feet = new Map(placements.map((a) => [a, new Path2D(coverPath(a))]));
  function links() {
    for (const a of document.querySelectorAll("[data-locale-link]")) {
      const u = new URL(a.href);
      u.searchParams.delete("motion");
      u.searchParams.delete("ink");
      if (root.hasAttribute("data-scene-view")) u.searchParams.set("view", "scene");
      else u.searchParams.delete("view");
      a.href = u.href;
    }
  }
  links();
  function birds(t) {
    const cycle = t % 47;
    if (cycle < 12 || cycle > 30) return;
    const progress = (cycle - 12) / 18;
    for (let i = 0; i < 2; i++) {
      const p = progress - i * 0.025;
      if (p < 0 || p > 1) continue;
      const x = (0.1 + p * 0.85) * W * spread,
        y = (0.405 - Math.sin(p * Math.PI) * 0.055 + i * 0.016) * H,
        wing = (Math.sin(t * 6.8 + i * 0.8) * 0.8 + 0.1) * 3;
      ctx.strokeStyle = i ? "#748b90" : "#667f85";
      ctx.lineWidth = 1.1;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x - 4, y - wing);
      ctx.quadraticCurveTo(x - 2, y - 1, x, y);
      ctx.quadraticCurveTo(x + 2, y - 1, x + 4, y - wing);
      ctx.stroke();
    }
  }
  function render() {
    const start = performance.now();
    ctx.setTransform(canvas.width / (W * spread), 0, 0, canvas.height / H, 0, 0);
    ctx.drawImage(ground, 0, 0, W * spread, H);
    const quiet = reduce.matches || motion === "parado" || !painter.moving,
      state = quiet ? "parado" : { gust: force, strength: activation };
    let branch,
      primaryState = state;
    for (const a of [...placements].sort((a, b) => b.depth - a.depth)) {
      const local =
        a === primary && typeof state === "object"
          ? { ...state, gust: state.gust + 0.16 * hoverBlend }
          : state;
      const b = painter.drawTree(ctx, a, time, local, ink, spread);
      if (a === primary) {
        branch = b;
        primaryState = local;
      }
      ctx.save();
      ctx.scale(spread, 1);
      ctx.clip(feet.get(a));
      ctx.drawImage(ground, 0, 0, W, H);
      ctx.restore();
    }
    if (!quiet) birds(time);
    if (branch) {
      currentPerch = perchPoint(primary, branch, time, primaryState, spread);
      const pose = actor.pose(currentPerch, time, W * spread, quiet || innerWidth <= 780);
      birdPose = pose;
      front.hidden = !(pose.visible && pose.foreground);
      if (!front.hidden && rect) {
        const scale = rect.height / H;
        frontCtx.setTransform(spriteDpr, 0, 0, spriteDpr, 0, 0);
        frontCtx.clearRect(0, 0, 180, 160);
        drawBird(frontCtx, { ...pose, x: 90, y: 100, scale: pose.scale * scale }, time);
        front.style.transform =
          "translate3d(" +
          (rect.left + pose.x * scale - 90) +
          "px," +
          (rect.top + pose.y * scale - 100) +
          "px,0)";
      } else {
        ctx.save();
        if (!root.hasAttribute("data-scene-view") && reader) {
          ctx.beginPath();
          ctx.rect(-400, -400, W * spread + 800, H + 800);
          ctx.rect(reader.left, -400, reader.right - reader.left, H + 800);
          ctx.clip("evenodd");
        }
        drawBird(ctx, pose, time);
        ctx.restore();
      }
      ambienceFrame(time, actor, motion, paused, W * spread);
      const visible =
        pose.perched &&
        !paused &&
        !quiet &&
        innerWidth > 780 &&
        rect &&
        (!reader ||
          root.hasAttribute("data-scene-view") ||
          pose.x < reader.left - 26 ||
          pose.x > reader.right + 26);
      hit.hidden = !visible;
      if (visible) {
        const scale = rect.height / H;
        hit.style.transform =
          "translate3d(" +
          (rect.left + pose.x * scale - 26) +
          "px," +
          (rect.top + pose.y * scale - 29) +
          "px,0)";
      }
    }
    lastMs = performance.now() - start;
    frames++;
    stage.dataset.ready = "";
    stage.dataset.diagnostics = JSON.stringify({
      time: +time.toFixed(2),
      ink,
      motion,
      paused,
      frames,
      lastDrawMs: +lastMs.toFixed(2),
      buffers: painter.buffers,
      renderer: painter.moving ? "beam-gpu" : "static-fallback",
      spread: +spread.toFixed(3),
      treeCount: placements.length,
      continuity: {
        snapshot: stage.querySelector("img").src.startsWith("data:image/"),
        decoded: stage.querySelector("img").complete,
        transition: root.dataset.landscapeTransition,
        layers: root.dataset.transitionLayers ? JSON.parse(root.dataset.transitionLayers) : null,
      },
      audio: ambienceState(),
      crown: "rigid-above-collar",
      bird: {
        ...actor.save(),
        pose: birdPose,
        alert: +actor.alert.toFixed(3),
        hover: actor.hover,
        nearTree: near,
        perch: currentPerch,
      },
      reduced: reduce.matches,
      canvas: [canvas.width, canvas.height],
    });
    if (frames % 30 === 0) status();
  }
  const active = () =>
    !paused &&
    motion !== "parado" &&
    !reduce.matches &&
    !document.hidden &&
    painter.moving &&
    innerWidth > 780;
  function tick(now) {
    if (previous && now - previous < 1000 / 30) {
      raf = requestAnimationFrame(tick);
      return;
    }
    if (previous) {
      const dt = Math.min(0.1, (now - previous) / 1000);
      time += dt;
      force += ((motion === "rajada" ? 1 : 0) - force) * (1 - Math.exp(-dt / 1.2));
      activation += (1 - activation) * (1 - Math.exp(-dt / 1.4));
      hoverBlend += ((near ? 1 : 0) - hoverBlend) * (1 - Math.exp(-dt * 3));
      actor.step(dt, near);
    }
    previous = now;
    render();
    if (active()) raf = requestAnimationFrame(tick);
  }
  function resume() {
    cancelAnimationFrame(raf);
    previous = 0;
    if (!document.hidden) {
      render();
      status();
      if (active()) raf = requestAnimationFrame(tick);
    }
  }
  function measure() {
    const b = canvas.getBoundingClientRect();
    if (!b.width || !b.height) return;
    rect = b;
    const column = document.querySelector(".reading-column").getBoundingClientRect();
    spread = b.width / b.height / (W / H);
    reader = {
      left: ((column.left - b.left) * H) / b.height,
      right: ((column.right - b.left) * H) / b.height,
    };
    const dpr = Math.min(devicePixelRatio || 1, 1.25),
      w = Math.min(2200, Math.max(1, Math.round(b.width * dpr))),
      h = Math.max(1, Math.round((w * b.height) / b.width));
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
  }
  const observer = new ResizeObserver(() => {
    measure();
    resume();
  });
  observer.observe(canvas.parentElement);
  measure();
  function status() {}
  document.addEventListener("visibilitychange", resume);
  reduce.addEventListener("change", resume);
  function saveScene(snapshot = false) {
    try {
      sessionStorage.setItem(
        "portfolio:landscape",
        JSON.stringify({
          at: Date.now(),
          time,
          force,
          activation,
          hoverBlend,
          ink,
          motion,
          paused,
          bird: actor.save(),
        }),
      );
      if (snapshot && frames)
        sessionStorage.setItem(
          "portfolio:landscape-frame",
          JSON.stringify({
            at: Date.now(),
            width: innerWidth,
            height: innerHeight,
            png: canvas.toDataURL("image/webp", 0.9),
          }),
        );
    } catch {}
  }
  for (const link of document.querySelectorAll("[data-locale-link]"))
    link.addEventListener(
      "click",
      (e) => {
        if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) saveScene(true);
      },
      { capture: true },
    );
  addEventListener("pageswap", () => saveScene(true));
  addEventListener("pagehide", (e) => {
    cancelAnimationFrame(raf);
    saveScene();
    if (e.persisted) ambienceFrame(time, actor, motion, true, W * spread);
    if (!e.persisted) {
      disposeAmbience();
      observer.disconnect();
      painter.dispose();
    }
  });
  addEventListener("pageshow", (e) => {
    if (e.persisted) resume();
  });
  hit.addEventListener("pointerenter", () => {
    actor.hover = true;
  });
  hit.addEventListener("pointerleave", () => {
    actor.hover = false;
  });
  hit.addEventListener("focus", () => {
    actor.focus = true;
  });
  hit.addEventListener("blur", () => {
    actor.focus = false;
  });
  hit.addEventListener("click", () => {
    birdCall(0.15);
    actor.launch();
    resume();
    status();
  });
  addEventListener(
    "pointermove",
    (e) => {
      if (!rect || e.pointerType !== "mouse" || innerWidth <= 780) {
        near = false;
        return;
      }
      const x = ((e.clientX - rect.left) * H) / rect.height,
        y = ((e.clientY - rect.top) * H) / rect.height;
      if (!root.hasAttribute("data-scene-view") && reader && x > reader.left && x < reader.right) {
        near = false;
        return;
      }
      const s = primary.height / 1480,
        cx = primary.x * spread,
        cy = primary.rootY + (280 - 1477) * s;
      near = ((x - cx) / (680 * s)) ** 2 + ((y - cy) / (300 * s)) ** 2 < 1;
    },
    { passive: true },
  );
  resume();
  status();
}
void initLandscape().catch((error) => console.warn("Paisagem estática preservada:", error));
