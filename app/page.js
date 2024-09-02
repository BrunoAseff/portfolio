"use client";

import TechnologiesLogo from "@/components/general/Technologieslogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { technologies } from "./info/technologies";
import { Rnd } from "react-rnd";

export default function Home() {
  return (
    <main
      className="h-screen relative flex flex-col items-center justify-between  bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/background4.webp")',
      }}
    >
      <nav className="absolute gap-3 items-center justify-center top-6 left-6 flex bg-white/20 rounded-xl shadow-xl backdrop-blur-[30px] border border-white/40">
        <Image
          className="p-3"
          width={175}
          height={65}
          src="/Signature.png"
          alt="My signature"
        />
        <a href="/" className="p-3 text-md text-black">
          Sobre mim
        </a>
        <a href="/projetos" className="p-3 text-md text-black">
          Projetos
        </a>
        <a href="/contato" className="p-3 text-md text-black">
          <Button className="p-4 rounded-xl">Contato</Button>
        </a>
      </nav>

      <section className="w-full flex justify-center items-center">
        <Rnd
          className="flex-col min-w-20 max-w-[40rem] p-8 relative bg-white/20 shadow-xl backdrop-blur-[30px] border border-white/40 rounded-xl"
          default={{
            x: 300,
            y: 300,
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
          <div className="flex gap-1 text-xl font-semibold mt-6 text-black">
            <p>Sobre mim</p>
          </div>
          <div className="items-center justify-center w-full">
            <p>
              Sou programador e estudante de Sistemas para Internet na Univali.
              Tenho afinidade tanto com o desenvolvimento back-end quanto
              front-end, mas tenho mais conhecimento em front-end. Atualmente,
              trabalho como redator e programador freelancer. Comecei minha
              carreira profissional como redator e estou, gradativamente,
              migrando para a programação. Tenho interesse genuíno por
              linguística e gosto de estudar as diferentes formas de se
              comunicar, seja através de códigos ou palavras.
            </p>
          </div>
        </Rnd>

        <Rnd
          className="flex-col min-w-20 max-w-[40rem] p-8 bg-white/20 shadow-xl backdrop-blur-[30px] border border-white/40 rounded-xl"
          default={{
            x: 900,
            y: 300,
            width: "500px",
          }}
          minHeight="400px"
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
            <p> Minhas tecnologias</p>
          </div>
          <div className="items-center justify-center w-full">
            <p className=" text-xl font-semibold m-4 text-black"></p>
            <div className="flex-wrap  flex gap-6">
              {technologies.map((tech, index) => (
                <TechnologiesLogo
                  key={index}
                  icon={tech.icon}
                  title={tech.title}
                  color="bg-white/20"
                />
              ))}
            </div>
          </div>
        </Rnd>
      </section>
    </main>
  );
}
