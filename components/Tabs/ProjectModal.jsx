"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Copy, Check, CheckCircle, ArrowUpRight, Link as LinkIcon } from "lucide-react";
import RpgCode from "../CodeHightlighter";
import RandomTypescriptCode from "../randomTypescript";
import ProjectImageGallery from "../ProjectImageGallery";
import { Button } from "@/components/ui/button";

const CopyButton = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Comando copiado!");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      className="mt-4 flex-shrink-0 items-center gap-4 text-white/80 bg-white/10 hover:bg-white/20 border border-white/20"
    >
      <code className="text-sm font-mono">{textToCopy}</code>
      {isCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
    </Button>
  );
};

export const ProjectModal = ({ project }) => {
  const renderCodeBlock = () => {
    if (project.title === "RPG no Terminal") return <RpgCode />;
    if (project.title === "random-password-typescript") return <RandomTypescriptCode />;
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col p-6 overflow-y-auto custom-scrollbar">
        <header className="mb-6">
          <h2 className="text-3xl font-bold text-white">{project.title}</h2>
          <p className="text-white/60 mt-2">{project.longDescription}</p>
        </header>

        {project.title === "random-password-typescript" && (
          <CopyButton textToCopy="npm install random-password-typescript" />
        )}

        {project.features && (
          <div className="my-2">
            <h4 className="font-semibold text-white mb-3">Features</h4>
            <ul className="space-y-3">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="my-6">
          <h4 className="font-semibold text-white mb-3">Tecnologias Utilizadas</h4>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, i) => (
              <div key={i} className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 p-2 border border-white/20" title={tech.alt}>
                <Image src={tech.src || tech} alt={tech.alt || ""} width={32} height={32} />
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">
          {project.webLink && (
             <Button asChild className="w-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30">
               <Link href={project.webLink} target="_blank">
                 Ver na Web <LinkIcon size={16} className="ml-2" />
               </Link>
             </Button>
          )}
           <Button asChild className="w-full bg-white/10 hover:bg-white/20 text-white">
             <Link href={project.gitHubLink} target="_blank">
               Ver no GitHub <ArrowUpRight size={16} className="ml-2" />
             </Link>
           </Button>
        </footer>
      </div>

      <div className="w-full md:w-1/2 lg:w-2/3 bg-black/10 flex items-center justify-center p-6">
        {renderCodeBlock() || (
           <ProjectImageGallery
              images={project.images}
              imagesAlt={project.imagesAlt}
            />
        )}
      </div>
    </div>
  );
};