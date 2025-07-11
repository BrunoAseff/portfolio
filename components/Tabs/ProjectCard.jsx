import Image from "next/image";
import { Hammer, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ProjectCard = ({ project }) => {
  const getPrimaryLink = () => {
    if (project.webLink) {
      return { url: project.webLink, icon: ExternalLink, label: "Ver site" };
    }
    if (project.ExternalLink) {
      return {
        url: project.ExternalLink,
        icon: ExternalLink,
        label: "Ver projeto",
      };
    }
    if (project.gitHubLink) {
      return { url: project.gitHubLink, icon: Github, label: "Ver código" };
    }
    return null;
  };

  const primaryLink = getPrimaryLink();

  return (
    <div className="cursor-pointer h-full group relative flex flex-col justify-between p-6 bg-white/10 border border-white/20 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-1">
      <div>
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          {project.InDevelopment && (
            <div className="flex-shrink-0 flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
              <Hammer size={14} />
              <span>Em produção</span>
            </div>
          )}
        </div>
        <p className="text-white/60 mt-2 text-sm">{project.shortDescription}</p>
      </div>

      <div className="my-4 rounded-lg overflow-hidden aspect-video">
        <Image
          src={project.images[0]}
          alt={project.title}
          width={300}
          height={169}
          loading="eager"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="hidden md:flex items-center justify-end text-sm text-white/70">
        Ver detalhes
        <ArrowUpRight
          size={16}
          className="ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>

      <div className="md:hidden">
        {primaryLink ? (
          <Button
            asChild
            size="sm"
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <primaryLink.icon size={16} className="mr-2" />
              {primaryLink.label}
              <ArrowUpRight size={14} className="ml-1" />
            </Link>
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
