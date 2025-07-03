import { technologies } from "@/info/technologies";
import TechnologiesLogo from "../general/Technologieslogo";
import { Card } from "../ui/card";
import { getExperienceDuration } from "@/lib/utils";

export default function TabsMobile() {

  const experienceText = getExperienceDuration(new Date("2025-02-03"));
  
  return (
    <div className="h-screen mt-10 items-start justify-start ml-auto  mr-auto md:hidden max-w-[90%] flex flex-col gap-6">
      <Card className="flex-col p-4 bg-black/10 shadow-xl backdrop-blur-[20px] border border-white/40 rounded-xl">
        <div className="flex gap-1 mb-4 text-2xl  pl-0  w-fit   text-white/80  drop-shadow-2xl ">
        <p>Sobre mim</p>
      </div>
      <div className="items-center justify-center text-base text-justify w-full text-white/80 drop-shadow-3xl">
    <p>
      Sou desenvolvedor fullstack há <strong>{experienceText}</strong> e estudante de Sistemas para Internet na Univali.
    </p>
    <br/>
      <p>
      Tenho bastante experiência com front-end, mas também trabalho com back-end e arquitetura de aplicações.
      </p>
          <br/>

    <p>
      Nos últimos tempos, venho focando cada vez mais em Cloud. Entender como aplicações escalam, se comunicam e se mantêm resilientes na infraestrutura é o que mais me atrai hoje.
        </p>
  <br />

      </div>
      </Card>

      <Card className="flex-col p-4 bg-black/10 shadow-xl backdrop-blur-[20px] border border-white/40 rounded-xl">
        <div className="flex gap-1 text-lg rounded-lg pl-0 w-fit">
          <p className="flex gap-1 mb-1 text-2xl  pl-0 p-2 w-fit text-white/80  drop-shadow-2xl ">
            Habilidades
          </p>
        </div>
        <div className="items-center justify-center w-full">
          <div className="flex flex-wrap w-full   gap-5">
            {technologies.map((tech, index) => (
              <TechnologiesLogo
                key={index}
                icon={tech.icon}
                title={tech.title}
                className="bg-white/20 text-black"
                iconColor={tech.color}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
