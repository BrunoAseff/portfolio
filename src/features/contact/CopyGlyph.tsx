import * as motion from "motion/react-m";
import { AnimatedIcon } from "../../components/ui/AnimatedIcon";
import type { CopyFeedbackState } from "./use-copy-feedback";

const paper =
  "M5.5 8L13.5 8Q16 8 16 10.5L16 18.5Q16 21 13.5 21L5.5 21Q3 21 3 18.5L3 10.5Q3 8 5.5 8Z";
const check =
  "M4 12L8.5 16.5Q9 17 9.5 16.5L19.5 6.5Q20 6 19.5 6.5L9.5 16.5Q9 17 8.5 16.5L4 12Q4 12 4 12Z";
export function CopyGlyph({ state, reduced }: { state: CopyFeedbackState; reduced: boolean }) {
  if (state === "error") return <AnimatedIcon name="error" />;
  const copied = state === "copied";
  return (
    <svg
      className="icon icon-copy"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.path
        d="M9 6V4.8C9 3.6 9.6 3 11 3h7.5C20 3 21 3.7 21 5.2V13c0 1.4-.7 2-2 2h-1"
        initial={false}
        animate={{ opacity: copied ? 0 : 1, x: copied ? -3 : 0, y: copied ? 3 : 0 }}
        transition={{ duration: reduced ? 0 : 0.16, ease: [0.2, 0.8, 0.25, 1] }}
      />
      <motion.path
        initial={false}
        animate={{ d: copied ? check : paper }}
        transition={{ duration: reduced ? 0 : 0.22, ease: [0.2, 0.8, 0.25, 1] }}
      />
    </svg>
  );
}
