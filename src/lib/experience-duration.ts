import type { Locale } from "../content/types";
import { site } from "../content/site";
export function experienceSince(now = new Date(), lang: Locale = "pt", compact = false) {
  const [year, month, day] = site.experienceStart.split("-").map(Number);
  let months = (now.getFullYear() - year) * 12 + now.getMonth() - (month - 1);
  if (now.getDate() < day) months--;
  months = Math.max(0, months);
  const years = Math.floor(months / 12),
    remainder = months % 12;
  const parts = [
    years
      ? `${years} ${lang === "pt" ? (years === 1 ? "ano" : "anos") : years === 1 ? "year" : "years"}`
      : "",
    remainder
      ? `${remainder} ${lang === "pt" ? (remainder === 1 ? "mês" : "meses") : remainder === 1 ? "month" : "months"}`
      : "",
  ].filter(Boolean);
  return (
    (parts.length
      ? parts.join(lang === "pt" ? " e " : " and ")
      : lang === "pt"
        ? "Menos de um mês"
        : "Less than a month") +
    (compact ? "" : lang === "pt" ? " de experiência" : " of experience")
  );
}
