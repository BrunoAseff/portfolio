"use client";

import { getProjects } from "@/info/projects";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

export default function ProjectsTab() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const projects = getProjects(locale);

  return (
    <div className="w-full flex flex-col items-center justify-start p-4 md:p-6 text-white font-sans pt-24 sm:pt-20 md:pt-16 lg:pt-20 pb-4">
      <div className="w-full max-w-7xl bg-black/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl flex flex-col h-[calc(100vh-12rem)] sm:h-[calc(100vh-8rem)] md:h-[calc(100vh-8rem)] lg:h-[calc(100vh-8rem)] max-h-[900px]">
        <header className="p-6 border-b border-white/10 flex-shrink-0">
          <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
          <p className="text-white/60">
            {t('subtitle')}
          </p>
        </header>

        <main className="flex-grow p-6 overflow-y-auto custom-scrollbar min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div>
                    <ProjectCard project={project} />
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-black/20 backdrop-blur-[100px] border-none text-white max-w-6xl h-[90vh] flex flex-col p-0">
                  <ProjectModal project={project} />
                </DialogContent>
              </Dialog>
            ))}
            <div className="h-full group relative flex flex-col justify-between p-6 bg-white/10 border border-white/20 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-1">
              <div>
                <h3 className="text-xl font-bold text-white">{t('moreProjects')}</h3>
                <p className="text-white/60 mt-2">
                  {t('moreProjectsDesc')}
                </p>
              </div>
              <div className="w-full h-40 mt-4 rounded-lg overflow-hidden">
                <Image
                  src="/github.webp"
                  alt="Print do GitHub"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                asChild
                className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white rounded-lg"
              >
                <Link href="https://github.com/BrunoAseff" target="_blank">
                  {t('accessGithub')} <ArrowUpRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
