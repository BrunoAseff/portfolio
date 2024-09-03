import TechnologiesLogo from "@/components/general/Technologieslogo";
import { technologies } from "@/app/info/technologies";
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
        <div className="rounded-full w-4 h-4 border-1 border-gray-900 bg-red-400 absolute top-4 left-4">
          {" "}
        </div>
        <div className="rounded-full w-4 h-4 border-1 border-gray-900 bg-yellow-400 absolute top-4 left-10">
          {" "}
        </div>
        <div className="rounded-full w-4 h-4 border-1 border-gray-900 bg-green-400 absolute top-4 left-16">
          {" "}
        </div>
      </div>
      <div className="text-xl font-semibold mt-4 text-black flex gap-1">
        <p>O que eu sei</p>
      </div>
      <div className="items-center justify-center w-full">
        <p className=" text-xl font-semibold m-4 text-black"></p>
        <div className="flex-wrap  flex gap-6">
          {technologies.map((tech, index) => (
            <TechnologiesLogo
              key={index}
              icon={tech.icon}
              title={tech.title}
              className="bg-white/20 "
              color={tech.color}
            />
          ))}
        </div>
      </div>
    </Rnd>
  );
}
