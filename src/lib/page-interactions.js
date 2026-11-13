import { play, cue } from "../features/sound/audio";
const root = document.documentElement;
const $ = (s) => document.querySelector(s),
  $$ = (s) => Array.from(document.querySelectorAll(s));
const reduce = () =>
  root.classList.contains("motion-reduced") ||
  matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE = "cubic-bezier(.2,.75,.25,1)";
// Every viewport item shares one arrival. No words move; no nested fades multiply.
const cold = !root.hasAttribute("data-locale-arrival") && !location.hash;
const waiting = new Set(),
  entryAnimations = new Map();
const opening = matchMedia("(max-width:780px)").matches
  ? ".identity,.intro-copy,.orientation"
  : ".topbar,.identity,.intro-copy";
const targets = $$(
  opening +
    ",.section-lead,.experience-total,.experience,.project,.knowledge>div,.technologies,.degree,.credentials-title,.courses>li,.contact .section-content,.global-activity,.back",
);
function reveal(el, delay = 0) {
  if (reduce()) return;
  const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 560,
    delay,
    easing: EASE,
    fill: "backwards",
  });
  entryAnimations.set(el, a);
  a.finished.catch(() => {}).finally(() => entryAnimations.delete(el));
}
if (cold && !reduce()) {
  let i = 0;
  for (const el of targets) {
    if (el.getBoundingClientRect().top < innerHeight) reveal(el, Math.min(i++ * 42, 168));
    else waiting.add(el);
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries)
        if (e.isIntersecting) {
          observer.unobserve(e.target);
          waiting.delete(e.target);
          reveal(e.target);
        }
    },
    { threshold: 0.06 },
  );
  waiting.forEach((n) => observer.observe(n));
  // Deliberate navigation never waits for a reveal or leaves translucent content on arrival.
  document.addEventListener(
    "click",
    (e) => {
      if (e.target.closest(".index a,.back")) {
        observer.disconnect();
        waiting.clear();
        for (const a of entryAnimations.values()) a.finish();
      }
    },
    true,
  );
}
// A single, steady hand: icon contours stay still, only the meaningful internal gesture moves.
const iconAnimations = new WeakMap();
function iconResponse(control) {
  if (reduce()) return;
  const paths = Array.from(control.querySelectorAll(".document-line"));
  for (const [i, path] of paths.entries()) {
    const current = getComputedStyle(path).strokeDashoffset;
    iconAnimations.get(path)?.cancel();
    const a = path.animate(
      [
        { strokeDashoffset: current, offset: 0 },
        { strokeDashoffset: 0.48, offset: 0.3 },
        { strokeDashoffset: 0, offset: 1 },
      ],
      { duration: 820, delay: i * 60, easing: EASE },
    );
    iconAnimations.set(path, a);
  }
}
// One response per actual control entry, without a shared dwell timer or cooldown.
const hoverControls = "a,button";
document.addEventListener("pointerover", (event) => {
  if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return;
  const el = event.target.closest(hoverControls);
  if (!el || el.contains(event.relatedTarget) || el.matches(":disabled") || el.closest("[inert]"))
    return;
  iconResponse(el);
  const variation = el.matches(".index a") ? 1 + $$(".index a").indexOf(el) * 0.035 : 1;
  cue("hover", variation);
  void play("hover");
});
for (const el of $$(".resume,.back"))
  el.addEventListener("focus", () => {
    if (el.matches(":focus-visible")) iconResponse(el);
  });
function actionKind(target) {
  if (target.closest(".index")) return "navigate";
  if (target.closest("[data-locale-link]")) return "locale";
  if (target.closest(".back")) return "top";
  if (target.closest(".media-close")) return "close";
  if (target.closest("[data-project-image]")) return "open";
  if (target.closest(".resume,[data-certificate-preview]")) return "paper";
  if (target.closest(".copy-email")) return "copy";
  if (target.closest("a[target=_blank]")) return "external";
  return "tap";
}
document.addEventListener(
  "click",
  (e) => {
    if (!(e.target instanceof Element)) return;
    const control = e.target.closest("a,button");
    if (!control) return;
    cue(
      actionKind(e.target),
      control.matches(".index a") ? 1 + $$(".index a").indexOf(control) * 0.035 : 1,
    );
    if (!control.closest(".sound") && !e.ctrlKey && !e.metaKey && !e.altKey)
      void play(actionKind(e.target));
  },
  true,
);
// Preserve the original modal's geometry, Escape and focus-return mechanisms.
const dialog = $(".media-viewer");
if (dialog) {
  new MutationObserver(() => {
    if (dialog.open) {
      delete dialog.dataset.exiting;
      dialog.dataset.crop = String(dialog.querySelector("img")?.src.includes("lazuli"));
    } else {
      delete dialog.dataset.exiting;
    }
  }).observe(dialog, { attributes: true, attributeFilter: ["open"] });
  dialog.addEventListener("cancel", () => {
    dialog.dataset.exiting = "true";
    cue("close");
    void play("close");
  });
  $(".media-close")?.addEventListener("click", () => {
    dialog.dataset.exiting = "true";
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.dataset.exiting = "true";
      cue("close");
      void play("close");
    }
  });
}
// Section labels remain anchored to their own content, never a second navigation rail.

// A real recipient-wide account feed in the page closing has its own transition identity.
$(".document-closing")?.style.setProperty("view-transition-name", "rodape");
// Keep a locale change's point of reading intact, including the global closing.
for (const link of $$("[data-locale-link]"))
  link.addEventListener("click", () => {
    for (const a of entryAnimations.values()) a.finish();
  });
for (const a of $$(".index a")) {
  let x = 50,
    y = 50,
    tx = 50,
    ty = 50,
    raf = 0;
  const settle = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    a.style.setProperty("--light-x", x + "%");
    a.style.setProperty("--light-y", y + "%");
    if (Math.abs(tx - x) + Math.abs(ty - y) > 0.15) raf = requestAnimationFrame(settle);
    else raf = 0;
  };
  a.addEventListener("pointermove", (e) => {
    if (reduce() || e.pointerType !== "mouse") return;
    const r = a.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width) * 100;
    ty = ((e.clientY - r.top) / r.height) * 100;
    if (!raf) raf = requestAnimationFrame(settle);
  });
  a.addEventListener("pointerleave", () => {
    tx = 50;
    ty = 50;
    if (!raf && !reduce()) raf = requestAnimationFrame(settle);
  });
}

// Direct manipulation of the actual expanded image; no new viewer or extra affordance.
const canvas = $(".media-canvas"),
  mediaFrame = $(".media-frame");
if (canvas && mediaFrame && dialog) {
  let gesture = null,
    settle;
  const reset = () => {
    delete dialog.dataset.dragging;
    dialog.style.removeProperty("--backdrop-opacity");
    mediaFrame.style.transform = "none";
    mediaFrame.style.willChange = "";
    gesture = null;
  };
  const freeze = () => {
    if (!gesture) return;
    const rect = mediaFrame.getBoundingClientRect();
    gesture = null;
    delete dialog.dataset.dragging;
    dialog.style.removeProperty("--backdrop-opacity");
    mediaFrame.style.transform = "none";
    Object.assign(mediaFrame.style, {
      left: rect.left + "px",
      top: rect.top + "px",
      width: rect.width + "px",
      height: rect.height + "px",
    });
  };
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape" && gesture) freeze();
    },
    true,
  );
  document.addEventListener(
    "click",
    (e) => {
      if (e.target.closest?.(".media-close") && gesture) freeze();
    },
    true,
  );
  addEventListener("resize", () => {
    if (gesture) reset();
  });
  canvas.querySelector("img").draggable = false;
  canvas.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 || !dialog.open || dialog.dataset.exiting) return;
    settle?.cancel();
    mediaFrame.getAnimations().forEach((a) => a.finish());
    gesture = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      dy: 0,
      dx: 0,
      lastY: e.clientY,
      lastTime: performance.now(),
      speed: 0,
    };
    canvas.setPointerCapture(e.pointerId);
    dialog.dataset.dragging = "true";
    mediaFrame.style.willChange = "transform";
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!gesture || e.pointerId !== gesture.id) return;
    const now = performance.now();
    gesture.speed = (e.clientY - gesture.lastY) / Math.max(1, now - gesture.lastTime);
    gesture.lastY = e.clientY;
    gesture.lastTime = now;
    gesture.dy = e.clientY - gesture.y;
    gesture.dx = (e.clientX - gesture.x) * 0.18;
    const distance = Math.abs(gesture.dy),
      scale = 1 - Math.min(0.065, distance * 0.00018);
    mediaFrame.style.transform = `translate(${gesture.dx}px,${gesture.dy * 0.75}px) scale(${scale})`;
    dialog.style.setProperty("--backdrop-opacity", String(1 - Math.min(0.65, distance / 430)));
  });
  const end = (e, cancelled = false) => {
    if (!gesture || e.pointerId !== gesture.id) return;
    const g = gesture;
    gesture = null;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {}
    delete dialog.dataset.dragging;
    if (!cancelled && (Math.abs(g.dy) > 92 || (Math.abs(g.dy) > 35 && Math.abs(g.speed) > 0.65))) {
      const rect = mediaFrame.getBoundingClientRect();
      mediaFrame.style.transform = "none";
      Object.assign(mediaFrame.style, {
        left: rect.left + "px",
        top: rect.top + "px",
        width: rect.width + "px",
        height: rect.height + "px",
      });
      dialog.style.removeProperty("--backdrop-opacity");
      $(".media-close").click();
    } else {
      const from = mediaFrame.style.transform;
      dialog.style.removeProperty("--backdrop-opacity");
      mediaFrame.style.transform = "none";
      if (!reduce()) {
        settle = mediaFrame.animate(
          [{ transform: from }, { transform: "translate(0px,0px) scale(1)" }],
          { duration: 380, easing: "cubic-bezier(.18,.85,.22,1)" },
        );
        settle.finished.catch(() => {}).finally(() => (mediaFrame.style.willChange = ""));
      } else mediaFrame.style.willChange = "";
    }
  };
  canvas.addEventListener("pointerup", (e) => end(e));
  canvas.addEventListener("pointercancel", (e) => end(e, true));
  new MutationObserver(() => {
    if (!dialog.open) {
      settle?.cancel();
      reset();
    }
  }).observe(dialog, { attributes: true, attributeFilter: ["open"] });
}
