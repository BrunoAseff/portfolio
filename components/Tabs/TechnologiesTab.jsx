import TechnologiesLogo from "@/components/general/Technologieslogo";
import { technologies } from "@/info/technologies";
import { Rnd } from "react-rnd";

export default function TechnologiesTab({ defaultPosition }) {
  return (
    <Rnd
      className="flex-col min-w-20 max-w-[40rem] p-8 bg-white/20 shadow-xl backdrop-blur-[20px] border border-white/40 rounded-xl"
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,

        width: "500px",
      }}
      minHeight="430px"
      minWidth="400px"
      maxHeight="3000px"
      maxWidth="3000px"
    >
      <div className="flex">
        <div className="flex">
          <button className="rounded-full w-4 h-4 border-1 border-gray-900 bg-red-400 absolute top-4 left-4" />
          <button className="rounded-full w-4 h-4 border-1 border-gray-900 bg-yellow-400 absolute top-4 left-10" />
          <button className="rounded-full w-4 h-4 border-1 border-gray-900 bg-green-400 absolute top-4 left-16" />
        </div>
      </div>
      <div className="flex gap-1 mb-4 text-full rounded-lg p-2 w-fit   border-black border-[1px]  mt-6 text-black">
        <p>Tecnologias</p>
      </div>
      <div className="items-center justify-center w-full">
        <div className="flex-wrap  flex gap-6">
          {technologies.map((tech, index) => (
            <TechnologiesLogo
              key={index}
              icon={tech.icon}
              title={tech.title}
              className="bg-white/20"
              iconColor={tech.color}
            />
          ))}
        </div>
      </div>
    </Rnd>
  );
}
