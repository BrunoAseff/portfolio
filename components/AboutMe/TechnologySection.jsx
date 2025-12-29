'use client';

import TechnologiesLogo from '@/components/general/Technologieslogo';
import { focusTechnologies, otherTechnologies } from '@/info/technologies';

export default function TechnologySection() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {focusTechnologies.map((tech, index) => (
            <TechnologiesLogo
              key={index}
              icon={tech.icon}
              title={tech.title}
              className="bg-white/15 border border-white/30 text-white/95"
            />
          ))}
        </div>
      </div>

      <div className="h-px bg-white/10 my-4"/>

      <div>
        <div className="flex flex-wrap justify-center gap-3 opacity-75">
          {otherTechnologies.map((tech, index) => (
            <TechnologiesLogo
              key={index}
              icon={tech.icon}
              title={tech.title}
              className="bg-white/10 border border-white/20 text-white/70"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

