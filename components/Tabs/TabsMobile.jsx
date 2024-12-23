import { technologies } from "@/info/technologies";
import TechnologiesLogo from "../general/Technologieslogo";
import { Card } from "../ui/card";

export default function TabsMobile() {
  return (
    <div className="h-screen mt-10 items-start justify-start ml-auto  mr-auto md:hidden max-w-[90%] flex flex-col gap-6">
      <Card className="flex-col min-w-20 max-w-[40rem] p-6  bg-white/20 shadow-xl backdrop-blur-[20px] border border-white/40 rounded-xl">
        <div className="flex gap-1 mb-4 text-lg rounded-lg pl-0  w-fit  font-semibold    ">
          <p className="text-black">Sobre mim</p>
        </div>
        <div className="items-center text-black justify-center text-sm text-justify w-full">
          <p>
            Sou programador e estudante de Sistemas para Internet na Univali.
            <br />
            Tenho afinidade tanto com o desenvolvimento back-end quanto
            front-end, mas tenho mais conhecimento em front-end.
            <br />
            Tenho interesse genuíno por linguística e gosto de estudar as
            diferentes formas de se comunicar, seja através de códigos ou
            palavras.
          </p>
        </div>
      </Card>

      <Card className="flex-col p-6 bg-white/20 shadow-xl backdrop-blur-[20px] border border-white/40 rounded-xl">
        <div className="flex gap-1 mb-4 text-lg rounded-lg pl-0  w-fit  font-semibold    ">
          <p className="text-black">Habilidades</p>
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
