import DraggableWindow from "@/components/general/DraggableWindow";
import TechnologiesLogo from "@/components/general/Technologieslogo";
import { technologies } from "@/info/technologies";

export default function TechnologiesTab({ state, onClose, onMinimize }) {
  return (
    <DraggableWindow
      state={state}
      onClose={onClose}
      onMinimize={onMinimize}
      title="Habilidades"
      defaultPosition={{ x: 100, y: -200 }}
    >
      <div className="flex flex-wrap justify-center gap-6">
        {technologies.map((tech, index) => (
          <TechnologiesLogo
            key={index}
            icon={tech.icon}
            title={tech.title}
            className="bg-white/10 border border-white/20"
            iconColor={tech.color}
          />
        ))}
      </div>
    </DraggableWindow>
  );
}