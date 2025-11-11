'use client';

import { technologies } from '@/info/technologies';
import TechnologiesLogo from '../general/Technologieslogo';
import { Card } from '../ui/card';
import { getExperienceDuration } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export default function TabsMobile() {
  const t = useTranslations('aboutMe');
  const tTech = useTranslations('technologies');
  const locale = useLocale();
  const experienceText = getExperienceDuration(new Date('2025-02-03'), locale);

  return (
    <div className="h-screen mt-24 items-start justify-start ml-auto  mr-auto md:hidden max-w-[90%] flex flex-col gap-6">
      <Card className="flex-col p-4 bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-xl">
        <div className="flex gap-1 mb-4 text-2xl pl-0 w-fit text-white/80 drop-shadow-2xl ">
          <p>{t('title')}</p>
        </div>
        <div className="items-center justify-center text-sm text-justify w-full text-white/80 drop-shadow-3xl">
          <p>
            {t.rich('paragraph1', {
              experienceTime: experienceText,
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
          <br />
          <p>{t('paragraph2')}</p>
          <br />

          <p>{t('paragraph3')}</p>
          <br />
        </div>
      </Card>

      <Card className="flex-col p-4 bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-xl">
        <div className="flex gap-1 text-lg rounded-lg pl-0 w-fit">
          <p className="flex gap-1 mb-1 text-2xl pl-0 p-2 w-fit text-white/80 drop-shadow-2xl">
            {tTech('title')}
          </p>
        </div>
        <div className="items-center justify-center w-full">
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <TechnologiesLogo
                key={index}
                icon={tech.icon}
                title={tech.title}
                className="bg-white/20 text-black"
                iconColor={tech.color}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
