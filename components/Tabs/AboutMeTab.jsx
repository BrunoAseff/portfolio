import DraggableWindow from "@/components/general/DraggableWindow";
import { getExperienceDuration } from "@/lib/utils";

export default function AboutMeTab({ state, onClose, onMinimize }) {

  const experienceText = getExperienceDuration(new Date("2025-02-03"));

  return (
    <DraggableWindow
      state={state}
      onClose={onClose}
      onMinimize={onMinimize}
      title="Sobre Mim"
      defaultPosition={{ x: -600, y: -200 }}
    >
      <div className="text-base text-justify text-white/90 space-y-4">
        <p>
          Sou desenvolvedor fullstack há <strong>{experienceText}</strong> e estudante de Sistemas para Internet na Univali.
        </p>
        <p>
          Tenho bastante experiência com front-end, mas também trabalho com back-end e arquitetura de aplicações.
        </p>
        <p>
          Nos últimos tempos, venho focando cada vez mais em Cloud. Entender como aplicações escalam, se comunicam e se mantêm resilientes na infraestrutura é o que mais me atrai hoje.
        </p>
      </div>
    </DraggableWindow>
  );
}