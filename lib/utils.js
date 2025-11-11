import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getExperienceDuration(startDate, locale = 'pt') {
  const now = new Date();
  const years = now.getFullYear() - startDate.getFullYear();
  const months = now.getMonth() - startDate.getMonth();

  let totalMonths = years * 12 + months;

  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;

  const labels = {
    pt: { year: 'ano', years: 'anos', month: 'mês', months: 'meses', and: 'e' },
    en: {
      year: 'year',
      years: 'years',
      month: 'month',
      months: 'months',
      and: 'and',
    },
  };

  const currentLabels = labels[locale] || labels.pt;
  const yearLabel =
    displayYears === 1 ? currentLabels.year : currentLabels.years;
  const monthLabel =
    displayMonths === 1 ? currentLabels.month : currentLabels.months;

  if (displayYears === 0) return `${displayMonths} ${monthLabel}`;
  if (displayMonths === 0) return `${displayYears} ${yearLabel}`;
  return `${displayYears} ${yearLabel} ${currentLabels.and} ${displayMonths} ${monthLabel}`;
}
