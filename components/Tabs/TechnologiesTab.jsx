import TechnologiesLogo from "@/components/general/Technologieslogo";
import { technologies } from "@/info/technologies";
import { Rnd } from "react-rnd";

export default function TechnologiesTab({ state, onClose, onMinimize }) {
  if (state === "minimized") return null;

  return (
    <Rnd
      className="flex-col min-w-20 max-w-[40rem] p-8 relative shadow-xl bg-black/5 backdrop-blur-[40px] border border-white/40 rounded-xl z-50"
      default={{
        x: 100,
        y: -200,
        width: "500px",
      }}
      minHeight="430px"
      minWidth="400px"
      maxHeight="3000px"
      maxWidth="3000px"
    >
      <div className="flex">
        <div className="flex">
          <button
            className="rounded-full w-4 h-4 border-1 border-gray-900 bg-red-400 absolute top-4 left-4"
            onClick={onClose}
          />
          <button
            className="rounded-full w-4 h-4 border-1 border-gray-900 bg-yellow-400 absolute top-4 left-10"
            onClick={onMinimize}
          />
          <button className="rounded-full w-4 h-4 border-1 border-gray-900 bg-green-400 absolute top-4 left-16" />
        </div>
      </div>
 <div className="flex gap-1 mb-4 text-2xl  pl-0 p-2 w-fit mt-6 text-white/80  drop-shadow-2xl ">        <p>Habilidades</p>
      </div>
      <div className="items-center justify-center w-full">
        <div className="flex-wrap  flex gap-6">
          {technologies.map((tech, index) => (
            <TechnologiesLogo
              key={index}
              icon={tech.icon}
              title={tech.title}
              className="bg-white/40 border-[1px] border-white/20"
              iconColor={tech.color}
            />
          ))}
        </div>
      </div>
    </Rnd>
  );
}
