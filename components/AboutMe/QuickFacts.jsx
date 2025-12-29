'use client';

import { getExperienceDuration } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Briefcase, Calendar } from 'lucide-react';

export default function QuickFacts() {
  const t = useTranslations('aboutMe');
  const locale = useLocale();
  const experienceText = getExperienceDuration(new Date('2025-02-03'), locale);

  const facts = [
    {
      icon: <Calendar size={20} />,
      label: t('experience'),
      value: experienceText,
    },
    {
      icon: <MapPin size={20} />,
      label: t('location'),
      value: t('locationValue'),
    },
    {
      icon: <Briefcase size={20} />,
      label: t('currentJobTitle'),
      value: t('roleTitle'),
    },
  ];

  return (
    <div className="space-y-4">
      {facts.map((fact, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 bg-white/10 border border-white/20 rounded-xl"
        >
          <div className="text-white/80">{fact.icon}</div>
          <div className="flex-1">
            <p className="text-xs text-white/60">{fact.label}</p>
            <p className="text-sm font-semibold text-white">{fact.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
