/** Temporary paper preview, positioned outside the active credential row. */
export function initCertificatePreview() {
  const dock = document.createElement("figure");
  dock.className = "certificate-preview";
  dock.setAttribute("aria-hidden", "true");
  const image = document.createElement("img");
  image.alt = "";
  dock.append(image);
  document.body.append(dock);
  let current: HTMLAnchorElement | null = null;
  let suppressed: HTMLAnchorElement | null = null;
  let request = 0;
  let keyboard = false;
  const position = () => {
    const column = document.querySelector(".reading-column")?.getBoundingClientRect();
    if (!current || !column || current === suppressed) return false;
    const target = current.getBoundingClientRect();
    if (target.bottom < 0 || target.top > innerHeight) return false;
    const right = innerWidth - column.right - 38;
    const leftSpace = column.left - 38;
    let width = Math.min(260, innerWidth - 40);
    let left: number;
    let top: number;
    if (right >= 210 || leftSpace >= 210) {
      const onRight = right >= 210;
      width = Math.min(width, onRight ? right : leftSpace);
      left = onRight ? column.right + 20 : column.left - width - 20;
      top = target.top - 35;
    } else {
      left = Math.max(18, Math.min(target.left, innerWidth - width - 18));
      const height = width * (image.naturalHeight / image.naturalWidth || 0.78);
      const item = current.closest("li")!.getBoundingClientRect();
      top = target.top - height - 18 >= 18 ? target.top - height - 18 : item.bottom + 18;
    }
    const height = width * (image.naturalHeight / image.naturalWidth || 0.78);
    top = Math.max(18, Math.min(top, innerHeight - height - 18));
    const item = current.closest("li")!.getBoundingClientRect();
    // In a short viewport, omit the preview rather than cover the active item.
    if (
      left < item.right &&
      left + width > item.left &&
      top < item.bottom &&
      top + height > item.top
    )
      return false;
    Object.assign(dock.style, { width: `${width}px`, left: `${left}px`, top: `${top}px` });
    return true;
  };
  const hide = () => {
    request++;
    current = null;
    dock.dataset.visible = "false";
  };
  document.addEventListener("keydown", (event) => {
    keyboard = true;
    if (event.key === "Escape") {
      suppressed = current;
      hide();
    }
  });
  document.addEventListener("pointerdown", () => {
    keyboard = false;
  });
  document.querySelectorAll<HTMLAnchorElement>("[data-certificate-preview]").forEach((link) => {
    const show = async () => {
      if (matchMedia("(pointer:coarse)").matches || suppressed === link) return;
      const token = ++request;
      current = link;
      dock.dataset.visible = "false";
      image.src = link.dataset.certificatePreview!;
      try {
        await image.decode();
      } catch {
        return;
      }
      if (token === request && position()) dock.dataset.visible = "true";
    };
    link.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") {
        suppressed = null;
        void show();
      }
    });
    link.addEventListener("pointerleave", () => {
      if (document.activeElement !== link) hide();
    });
    link.addEventListener("focus", () => {
      if (keyboard) {
        suppressed = null;
        void show();
      }
    });
    link.addEventListener("blur", hide);
  });
  const reposition = () => {
    if (current) dock.dataset.visible = String(position());
  };
  window.addEventListener(
    "scroll",
    () => {
      if (keyboard) reposition();
      else hide();
    },
    { passive: true },
  );
  window.addEventListener("resize", reposition);
}
