'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const languages = [
  {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷',
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
  },
];

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const handleLanguageChange = (newLocale) => {
    const currentPathname = pathname;

    const newPathname = currentPathname.replace(`/${locale}`, `/${newLocale}`);

    router.push(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg text-white hover:bg-white/20 hover:!text-white rounded-xl [&]:text-white [&:hover]:text-white"
        >
          <span className="text-xl">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg text-white"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white"
          >
            <span className="text-lg mr-2">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
