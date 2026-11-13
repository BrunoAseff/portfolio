export function initMediaViewer() {
  const dialog = document.querySelector<HTMLDialogElement>(".media-viewer");
  if (!dialog) return;
  const frame = dialog.querySelector<HTMLElement>(".media-frame")!;
  const image = frame.querySelector<HTMLImageElement>("img")!;
  const caption = frame.querySelector("figcaption")!;
  const close = dialog.querySelector<HTMLButtonElement>(".media-close")!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let origin: HTMLButtonElement | null = null;
  let animation: Animation | undefined;
  let closing = false;
  let previousOverflow = "";
  let readingPosition = 0;
  const rect = (r: { left: number; top: number; width: number; height: number }) => ({
    left: `${r.left}px`,
    top: `${r.top}px`,
    width: `${r.width}px`,
    height: `${r.height}px`,
  });
  function fit() {
    if (!origin) return;
    const ratio = Number(origin.dataset.imageWidth) / Number(origin.dataset.imageHeight);
    const width = Math.min(1100, innerWidth - 32, (innerHeight - 86) * ratio);
    return {
      left: (innerWidth - width) / 2,
      top: (innerHeight - width / ratio) / 2,
      width,
      height: width / ratio,
    };
  }
  document.querySelectorAll<HTMLButtonElement>("[data-project-image]").forEach((button) => {
    button.addEventListener("click", () => {
      if (dialog.open) return;
      origin = button;
      image.src = button.querySelector("img")?.currentSrc || button.dataset.projectImage!;
      const full = new Image();
      full.src = button.dataset.projectImage!;
      void full
        .decode()
        .then(() => {
          if (dialog.open && origin === button) image.src = full.src;
        })
        .catch(() => {});
      image.alt = button.getAttribute("aria-label")!;
      caption.textContent = button.dataset.imageName!;
      frame.style.setProperty(
        "--media-position",
        button.style.getPropertyValue("--media-position"),
      );
      const from = button.getBoundingClientRect();
      readingPosition = window.scrollY;
      const to = fit()!;
      Object.assign(frame.style, rect(to));
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.showModal();
      close.focus({ preventScroll: true });
      window.scrollTo(0, readingPosition);
      if (!reduced.matches)
        animation = frame.animate([rect(from), rect(to)], {
          duration: 420,
          easing: "cubic-bezier(.22,.8,.22,1)",
        });
    });
    // Decode the full source on intent; the card stays usable while it loads.
    const prepare = () => {
      const preload = new Image();
      preload.src = button.dataset.projectImage!;
    };
    button.addEventListener("pointerenter", prepare, { once: true });
    button.addEventListener("focus", prepare, { once: true });
    const preview = button.querySelector("img");
    preview?.addEventListener("error", () => {
      button.hidden = true;
    });
  });
  async function dismiss() {
    if (closing || !origin) return;
    closing = true;
    const from = frame.getBoundingClientRect();
    Object.assign(frame.style, rect(from));
    animation?.cancel();
    const target = origin.getBoundingClientRect();
    const visible = target.top >= 0 && target.bottom <= innerHeight;
    if (!reduced.matches) {
      animation = frame.animate([rect(from), visible ? rect(target) : { opacity: 0 }], {
        duration: 320,
        easing: "cubic-bezier(.22,.8,.22,1)",
        fill: "forwards",
      });
      await animation.finished.catch(() => {});
    }
    dialog!.close();
    animation?.cancel();
    document.body.style.overflow = previousOverflow;
    window.scrollTo(0, readingPosition);
    origin.focus({ preventScroll: true });
    closing = false;
  }
  close.addEventListener("click", dismiss);
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    void dismiss();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) void dismiss();
  });
  image.addEventListener("error", dismiss);
  window.addEventListener("resize", () => {
    if (dialog.open && !closing) {
      animation?.cancel();
      Object.assign(frame.style, rect(fit()!));
    }
  });
}
