'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Code } from 'lucide-react';

export default function AboutSection() {
  const t = useTranslations('aboutMe');

  return (
    <Card className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <Code size={24} className="text-white/80" />
        <h3 className="text-lg font-semibold text-white">{t('whatIDoTitle')}</h3>
      </div>
      <p className="text-sm text-white/80 leading-relaxed">{t('whatIDo')}</p>
    </Card>
  );
}

