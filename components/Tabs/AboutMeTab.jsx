"use client";

import DraggableWindow from "@/components/general/DraggableWindow";
import { getExperienceDuration } from "@/lib/utils";
import { useTranslations } from 'next-intl';

export default function AboutMeTab({ state, onClose, onMinimize }) {
  const t = useTranslations('aboutMe');
  const experienceText = getExperienceDuration(new Date("2025-02-03"));

  return (
    <DraggableWindow
      state={state}
      onClose={onClose}
      onMinimize={onMinimize}
      title={t('title')}
      defaultPosition={{ x: -600, y: -200 }}
    >
      <div className="text-base text-justify text-white/90 space-y-4">
        <p>
          {t.rich('paragraph1', {
            experienceTime: experienceText,
            strong: (chunks) => <strong>{chunks}</strong>
          })}
        </p>
        <p>
          {t('paragraph2')}
        </p>
        <p>
          {t('paragraph3')}
        </p>
      </div>
    </DraggableWindow>
  );
}