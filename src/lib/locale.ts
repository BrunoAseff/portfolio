import type { Locale } from "../content/types";
export const locales = ["pt", "en"] as const;
export const htmlLanguage = (locale: Locale) => (locale === "pt" ? "pt-BR" : "en");
export const localePath = (locale: Locale) => (locale === "pt" ? "/" : "/en/");
export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(htmlLanguage(locale), {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T12:00:00Z"));
}
