import { withMotion } from "../../components/ui/with-motion";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-m";
import { useCopyFeedback } from "./use-copy-feedback";
import { AnimatedIcon as Icon } from "../../components/ui/AnimatedIcon";
import { site } from "../../content/site";
import { play } from "../sound/audio";
import type { Locale } from "../../content/types";
import { useCalmMotion } from "../../lib/use-calm-motion";
import { responsiveSpring } from "../../lib/motion";
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
  return (
    <>
      <motion.button
        type="button"
        className="copy-email"
        aria-label={`${title}: ${site.email}`}
        data-copy-state={state}
        whileTap={reduced ? undefined : { y: 1 }}
        transition={reduced ? { duration: 0 } : responsiveSpring}
        onClick={async () => {
          if (await copy(site.email)) play("success");
        }}
      >
        <span className="email-address">
          {mailbox}
          <span className="email-domain">@{domain}</span>
        </span>
        <span className="copy-feedback" aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.span
              className="copy-state"
              key={state + lang}
              initial={reduced ? false : { opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2, transition: { duration: reduced ? 0 : 0.08 } }}
              transition={{ duration: reduced ? 0 : 0.16, ease: [0.22, 0.75, 0.22, 1] }}
            >
              <Icon name={state === "copied" ? "check" : state === "error" ? "error" : "copy"} />
              <span className="copy-label">{texts[state]}</span>
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.button>
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
