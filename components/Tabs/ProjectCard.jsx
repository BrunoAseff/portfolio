// components/ProjectCard.js
import Image from "next/image";
import { Hammer, ArrowUpRight } from "lucide-react";

export const ProjectCard = ({ project }) => {
  return (
    <div className="cursor-pointer h-full group relative flex flex-col justify-between p-6 bg-white/10 border border-white/20 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-1">
      {/* Card Header */}
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

      {/* Card Image */}
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

      {/* Card Footer */}
      <div className="flex items-center justify-end text-sm text-white/70">
        Ver detalhes
        <ArrowUpRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </div>
  );
};