import { withMotion } from "./with-motion";
import { AnimatedIcon } from "./AnimatedIcon";
import { messages } from "../../content/messages";
import { site } from "../../content/site";
import type { Locale } from "../../content/types";
function ResumeControl({
  locale,
  variant = "default",
}: {
  locale: Locale;
  variant?: "default" | "contact";
}) {
  const c = messages[locale],
    contact = variant === "contact";
  return (
    <a
      className={contact ? "text-link resume contact-channel" : "text-link resume"}
      data-sound="tap"
      data-document-title={locale === "pt" ? "Currículo · Bruno Aseff" : "Résumé · Bruno Aseff"}
      data-certificate-preview={`/documents/previews/resume-${locale}.webp`}
      aria-label={`${c.resume} (PDF)`}
      href={site.resumes[locale]}
      target="_blank"
      rel="noopener noreferrer"
    >
      <AnimatedIcon name="document" />
      <span className={contact ? "contact-destination" : "link-label"}>{c.resume}</span>
      <span className={contact ? "contact-format" : "format"}>PDF</span>
    </a>
  );
}
export default withMotion(ResumeControl);
