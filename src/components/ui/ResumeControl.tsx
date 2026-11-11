import { withMotion } from "./with-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-m";
import { AnimatedIcon } from "./AnimatedIcon";
import { messages } from "../../content/messages";
import { site } from "../../content/site";
import type { Locale } from "../../content/types";
import { useCalmMotion } from "../../lib/use-calm-motion";
import { responsiveSpring } from "../../lib/motion";
function ResumeControl({
  locale,
  variant = "default",
}: {
  locale: Locale;
  variant?: "default" | "contact";
}) {
  const c = messages[locale],
    reduced = useCalmMotion(),
    [notice, setNotice] = useState(false),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null),
    trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const hide = () => setNotice(false);
    window.addEventListener("portfolio:dismiss-resume-notice", hide);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      window.removeEventListener("portfolio:dismiss-resume-notice", hide);
    };
  }, []);
  const dismiss = () => {
    const restore = Boolean(document.activeElement?.closest(".notice"));
    setNotice(false);
    if (restore) trigger.current?.focus({ preventScroll: true });
  };
  const close = () => {
    setNotice(false);
    trigger.current?.focus({ preventScroll: true });
  };
  const contact = variant === "contact";
  const className = contact ? "text-link contact-channel" : "text-link";
  const contents = contact ? (
    <>
      <AnimatedIcon name="document" />
      <span className="contact-destination">{c.resume}</span>
      <span className="contact-format">PDF</span>
    </>
  ) : (
    <>
      {c.resume} (PDF)
      <AnimatedIcon name="document" />
    </>
  );
  const href = site.resumes[locale];
  if (href)
    return (
      <a
        className={className}
        aria-label={contact ? `${c.resume} (PDF)` : undefined}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {contents}
      </a>
    );
  return (
    <>
      <motion.button
        ref={trigger}
        type="button"
        className={className}
        aria-label={contact ? `${c.resume} (PDF)` : undefined}
        whileTap={reduced ? undefined : { y: 1 }}
        transition={reduced ? { duration: 0 } : responsiveSpring}
        onClick={() => {
          window.dispatchEvent(new Event("portfolio:dismiss-resume-notice"));
          setNotice(true);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(dismiss, 4500);
        }}
      >
        {contents}
      </motion.button>
      <AnimatePresence>
        {notice && (
          <motion.div
            className="notice"
            role="status"
            initial={reduced ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: reduced ? 0 : 0.16 }}
          >
            {c.resumePending}
            <button type="button" aria-label={c.dismiss} onClick={close}>
              <AnimatedIcon name="close" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default withMotion(ResumeControl);
