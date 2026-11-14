import { prepareTextLink } from "../../components/ui/text-link.js";
import previews from "./previews.json";
import { play } from "../sound/audio";
const en = document.documentElement.lang.startsWith("en"),
  labels = en
    ? { close: "Close dialog", download: "Download PDF", credits: "Landscape credits" }
    : { close: "Fechar diálogo", download: "Baixar PDF", credits: "Créditos da paisagem" };
const dialog = document.querySelector(".document-dialog");
prepareTextLink(dialog.querySelector(".document-download"));
const sheet = dialog.querySelector(".document-sheet"),
  title = dialog.querySelector(".document-title"),
  body = dialog.querySelector(".document-body"),
  download = dialog.querySelector(".document-download"),
  close = dialog.querySelector(".document-close"),
  reduce = matchMedia("(prefers-reduced-motion:reduce)");
const calm = () => reduce.matches || document.documentElement.classList.contains("motion-reduced");
let origin = null,
  animation = null,
  closing = false,
  overflow = "",
  scrollPosition = 0,
  openToken = 0;
async function open(trigger, kind, url, keyboard) {
  if (dialog.open) return;
  origin = trigger;
  origin.dataset.dialogKeyboard = String(keyboard);
  close.toggleAttribute("data-pointer-focus", !keyboard);
  closing = false;
  delete dialog.dataset.closing;
  const token = ++openToken;
  dialog.dataset.kind = kind;
  title.textContent =
    kind === "credits"
      ? labels.credits
      : trigger.dataset.documentTitle || trigger.textContent.trim();
  download.hidden = kind !== "pdf";
  body.replaceChildren();
  if (kind === "pdf") {
    download.href = url;
    download.download = new URL(url).pathname.split("/").pop();
    const previewData = previews[new URL(url).pathname];
    if (previewData) {
      const pages = document.createElement("div");
      pages.className = "document-pages";
      if (previewData.pages.length === 1) pages.dataset.single = "";
      for (const [i, page] of previewData.pages.entries()) {
        const image = document.createElement("img");
        image.className = "document-page";
        image.src = page.src;
        image.alt = title.textContent + " — " + (en ? "page " : "página ") + (i + 1);
        image.width = page.width;
        image.height = page.height;
        image.decoding = "async";
        image.addEventListener(
          "error",
          () => {
            pages.replaceChildren();
            const fallback = document.createElement("a");
            fallback.href = url;
            fallback.target = "_blank";
            fallback.rel = "noopener noreferrer";
            fallback.textContent = en ? "Open original PDF" : "Abrir PDF original";
            pages.append(fallback);
          },
          { once: true },
        );
        pages.append(image);
      }
      body.append(pages);
      dialog.dataset.pages = String(previewData.pages.length);
      dialog.dataset.aspect = String(previewData.pages[0].width / previewData.pages[0].height);
    } else {
      const frame = document.createElement("iframe");
      frame.title = title.textContent;
      frame.src = url + "#view=FitH";
      body.append(frame);
      delete dialog.dataset.pages;
    }
  } else {
    delete dialog.dataset.pages;
    sheet.style.width = "";
    sheet.style.height = "";
    download.removeAttribute("href");
    const template = document.querySelector("#landscape-credit-copy");
    if (template) body.append(template.content.cloneNode(true));
    for (const a of body.querySelectorAll("a")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      prepareTextLink(a, { inline: true });
    }
  }
  body.lang = document.documentElement.lang;
  if (token !== openToken) return;
  scrollPosition = scrollY;
  overflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  document.documentElement.dataset.documentOpen = "";
  dialog.showModal();
  fitDocument();
  close.focus({ preventScroll: true });
  scrollTo(0, scrollPosition);
  dispatchEvent(new CustomEvent("portfolio:overlay", { detail: true }));
  void play("open");
  if (!calm()) {
    animation = sheet.animate(
      [
        { opacity: 0, transform: "scale(.975)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 420, easing: "cubic-bezier(.22,.8,.22,1)" },
    );
    animation.finished.catch(() => {});
  }
}
async function dismiss() {
  if (!dialog.open || closing) return;
  closing = true;
  dialog.dataset.closing = "";
  const current = getComputedStyle(sheet),
    start = { opacity: current.opacity, transform: current.transform };
  animation?.cancel();
  void play("close");
  if (!calm()) {
    animation = sheet.animate([start, { opacity: 0, transform: "scale(.975)" }], {
      duration: 280,
      easing: "cubic-bezier(.22,.8,.22,1)",
      fill: "forwards",
    });
    await animation.finished.catch(() => {});
  }
  dialog.close();
  animation?.cancel();
  body.replaceChildren();
  document.body.style.overflow = overflow;
  delete document.documentElement.dataset.documentOpen;
  scrollTo(0, scrollPosition);
  if (origin) {
    origin.toggleAttribute("data-restored-pointer-focus", origin.dataset.dialogKeyboard !== "true");
    origin.focus({ preventScroll: true });
  }
  dispatchEvent(new CustomEvent("portfolio:overlay", { detail: false }));
  closing = false;
}
// Capture before existing page handlers, so an open/close produces one intentional sound.
addEventListener(
  "click",
  (e) => {
    const target = e.target instanceof Element ? e.target : null;
    if (!target || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
    const link = target.closest("a[href]");
    if (
      link &&
      !link.hasAttribute("download") &&
      (link.matches("[data-landscape-credit]") ||
        (new URL(link.href).origin === location.origin &&
          /\.pdf$/i.test(new URL(link.href).pathname)))
    ) {
      e.preventDefault();
      e.stopPropagation();
      void open(
        link,
        link.matches("[data-landscape-credit]") ? "credits" : "pdf",
        link.href,
        e.detail === 0,
      );
      return;
    }
    if (target.closest(".document-close") || target === dialog) {
      e.preventDefault();
      e.stopPropagation();
      void dismiss();
    }
  },
  { capture: true },
);
dialog.addEventListener("cancel", (e) => {
  e.preventDefault();
  void dismiss();
});

function fitDocument() {
  if (!dialog.open || dialog.dataset.kind !== "pdf") return;
  const padding = innerWidth <= 600 ? 24 : 48,
    header = dialog.querySelector(".document-header").getBoundingClientRect().height,
    maxWidth = Math.min(1100, dialog.clientWidth - padding),
    maxHeight = dialog.clientHeight - padding;
  if (dialog.dataset.pages === "1") {
    const aspect = Number(dialog.dataset.aspect),
      width = Math.min(maxWidth, Math.max(280, (maxHeight - header - 44) * aspect + 44));
    sheet.style.width = width + "px";
    sheet.style.height = Math.min(maxHeight, (width - 44) / aspect + header + 44) + "px";
  } else {
    sheet.style.width = maxWidth + "px";
    sheet.style.height = Math.min(980, maxHeight) + "px";
  }
}
addEventListener("resize", fitDocument);

addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Tab") {
      for (const el of document.querySelectorAll(
        "[data-restored-pointer-focus],[data-pointer-focus]",
      )) {
        el.removeAttribute("data-restored-pointer-focus");
        el.removeAttribute("data-pointer-focus");
      }
    }
  },
  { capture: true },
);
