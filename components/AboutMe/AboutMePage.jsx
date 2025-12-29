'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import TechnologySection from './TechnologySection';
import QuickFacts from './QuickFacts';
import AboutSection from './AboutSection';
import LastCommit from './LastCommit';

export default function AboutMePage() {
  const t = useTranslations('aboutMe');

  return (
    <div className="w-full min-h-full flex items-center justify-center p-4 md:p-6 text-white font-sans mt-32 md:mt-24 pb-8">
      <div className="w-full max-w-7xl space-y-6">
        <Card className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-lg text-white/90 leading-relaxed">{t('hero')}</p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 text-center">
              {t('quickFacts')}
            </h2>
            <QuickFacts />
          </Card>

          <Card className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-6 text-center">
              {t('technologies')}
            </h2>
            <TechnologySection />
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AboutSection />
          <LastCommit />
        </div>
      </div>
    </div>
  );
}

