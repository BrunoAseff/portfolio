import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getExperienceDuration(startDate) {
  const now = new Date();
  const years = now.getFullYear() - startDate.getFullYear();
  const months = now.getMonth() - startDate.getMonth();

  let totalMonths = years * 12 + months;

  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;

  const yearLabel = displayYears === 1 ? "ano" : "anos";
  const monthLabel = displayMonths === 1 ? "mês" : "meses";

  if (displayYears === 0) return `${displayMonths} ${monthLabel}`;
  if (displayMonths === 0) return `${displayYears} ${yearLabel}`;
  return `${displayYears} ${yearLabel} e ${displayMonths} ${monthLabel}`;
}
