import { withMotion } from "../../components/ui/with-motion";
import { useRef } from "react";
import { useCopyFeedback } from "./use-copy-feedback";
import { CopyGlyph } from "./CopyGlyph";
import { site } from "../../content/site";
import { play } from "../sound/audio";
import type { Locale } from "../../content/types";
import { useCalmMotion } from "../../lib/use-calm-motion";
// Adapted from Arc UI's free Copy Button: its clipboard hook is preserved;
// shell, icons, localisation and stable feedback footprint are portfolio-specific.
function CopyEmailButton({ locale: lang }: { locale: Locale }) {
  const { state, copy } = useCopyFeedback(2100),
    reduced = useCalmMotion();
  const texts =
    lang === "pt"
      ? { idle: "Copiar", copied: "Copiado", error: "Falhou" }
      : { idle: "Copy", copied: "Copied", error: "Failed" };
  const [mailbox, domain] = site.email.split("@");
  const title = lang === "pt" ? "Copiar endereço de e-mail" : "Copy email address";
  const feedback = useRef<HTMLSpanElement>(null);
  return (
    <>
      <button
        type="button"
        className="copy-email"
        aria-label={`${title}: ${site.email}`}
        data-copy-state={state}
        onClick={async () => {
          if (await copy(site.email)) {
            void play("success");
            if (state === "copied" && !reduced)
              feedback.current?.animate(
                [
                  { transform: "scale(1)" },
                  { transform: "scale(.94)", offset: 0.35 },
                  { transform: "scale(1)" },
                ],
                { duration: 160, easing: "cubic-bezier(.2,.8,.25,1)" },
              );
          }
        }}
      >
        <span className="email-address">
          {mailbox}
          <span className="email-domain">@{domain}</span>
        </span>
        <span ref={feedback} className="copy-feedback" aria-hidden="true">
          <span className="copy-state">
            <CopyGlyph state={state} reduced={reduced} />
            <span className="copy-label">{texts[state]}</span>
          </span>
        </span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "idle"
          ? ""
          : state === "copied"
            ? lang === "pt"
              ? "Endereço de e-mail copiado."
              : "Email address copied."
            : lang === "pt"
              ? "Não foi possível copiar. Selecione o endereço para copiá-lo."
              : "Could not copy. Select the address to copy it."}
      </span>
    </>
  );
}

export default withMotion(CopyEmailButton);
