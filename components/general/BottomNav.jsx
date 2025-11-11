'use client';

import { Code, User } from 'phosphor-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useTranslations } from 'next-intl';

export default function BottomNav({ tabsState, onTabClick }) {
  const t = useTranslations('bottomNav');
  return (
    <nav className="absolute gap-3 items-center justify-center bottom-6 flex bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-xl">
      <TooltipProvider delayDuration="50">
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => onTabClick('aboutMe')}
              className="p-3 text-md flex flex-col items-center justify-center gap-1 text-white cursor-pointer"
            >
              <User size={32} />
              {tabsState.aboutMe !== 'closed' && (
                <span className="rounded-full w-1 h-1 bg-white"></span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg font-medium text-white mb-1">
            <p>{t('aboutMe')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration="50">
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => onTabClick('technologies')}
              className="p-3 text-md flex flex-col items-center justify-center gap-1 text-white cursor-pointer"
            >
              <Code size={32} />
              {tabsState.technologies !== 'closed' && (
                <span className="rounded-full w-1 h-1 bg-white"></span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg font-medium text-white mb-1">
            <p>{t('skills')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  );
}
