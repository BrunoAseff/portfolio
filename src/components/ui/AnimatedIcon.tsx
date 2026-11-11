import * as motion from "motion/react-m";
import { useCalmMotion } from "../../lib/use-calm-motion";
type Name =
  | "mail"
  | "external"
  | "code"
  | "document"
  | "sound"
  | "copy"
  | "check"
  | "error"
  | "up"
  | "commit"
  | "close";
export function AnimatedIcon({ name, active = false }: { name: Name; active?: boolean }) {
  const reduced = useCalmMotion();
  const paths: Record<Exclude<Name, "sound" | "check">, string[]> = {
    mail: [
      "M3 7.5C3 5.8 4.1 5 6 5h12c1.9 0 3 .8 3 2.5v9c0 1.7-1.1 2.5-3 2.5H6c-1.9 0-3-.8-3-2.5z",
      "M3.7 6.3 10 11c1.2.9 2.8.9 4 0l6.3-4.7",
    ],
    external: ["M8 5.5c4.6-.5 7-.6 11-.4.2 4 .1 6.4-.4 11", "M18.5 5.5 5 19"],
    code: ["M8.5 6.5 3 12l5.5 5.5", "m15.5 6 5.5 6-5.5 5.5", "m13.5 3-3 18"],
    document: [
      "M13.5 3H7C4.8 3 4 4.2 4 6v12c0 2 .9 3 3 3h10c2.1 0 3-1 3-3V9.5L13.5 3Z",
      "M13 3v5c0 1 .5 1.5 1.5 1.5H20",
      "M8 14h8M8 17.5h5",
    ],
    copy: [
      "M9 6V4.8C9 3.6 9.6 3 11 3h7.5C20 3 21 3.7 21 5.2V13c0 1.4-.7 2-2 2h-1",
      "M5.5 8h8c1.8 0 2.5.8 2.5 2.5v8c0 1.7-.7 2.5-2.5 2.5h-8C3.7 21 3 20.2 3 18.5v-8C3 8.8 3.7 8 5.5 8Z",
    ],
    error: ["M12 3C6.5 3 3 6.5 3 12s3.5 9 9 9 9-3.5 9-9-3.5-9-9-9Z", "M12 7v6m0 3v.2"],
    up: ["M6 10c2-2 4-4.3 6-6 2 1.7 4 4 6 6", "M12 4v16"],
    commit: ["M3 12h5m8 0h5", "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0"],
    close: ["m6 6 12 12M18 6 6 18"],
  };
  return (
    <svg
      className={`icon icon-${name}`}
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
      {name === "sound" ? (
        <>
          <path d="M11 4.5 6.5 8H3.7C3.2 8 3 8.4 3 9v6c0 .6.2 1 .7 1h2.8l4.5 3.5c.5.4 1 .1 1-.5V5c0-.6-.5-.9-1-.5Z" />
          <motion.path
            d="M16 8c2 2.2 2 5.8 0 8"
            initial={false}
            animate={{ opacity: active ? 1 : 0, pathLength: active ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          />
          <motion.path
            d="M19 5c3.8 3.8 3.8 10.2 0 14"
            initial={false}
            animate={{ opacity: active ? 1 : 0, pathLength: active ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.22 }}
          />
          <motion.path
            d="m17 9 5 6m0-6-5 6"
            initial={false}
            animate={{ opacity: active ? 0 : 1, pathLength: active ? 0 : 1 }}
            transition={{ duration: reduced ? 0 : 0.16 }}
          />
        </>
      ) : name === "check" ? (
        <motion.path
          d="m4 12 5 5c3.8-4 6.8-7.2 11-11"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 0.22, ease: [0.22, 0.75, 0.22, 1] }}
        />
      ) : (
        paths[name].map((d, index) => <path key={index} d={d} />)
      )}
    </svg>
  );
}
