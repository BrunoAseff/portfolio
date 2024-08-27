"use client";

import TechnologiesLogo from "@/components/general/Technologieslogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { At } from "phosphor-react";
import {
  SiCplusplus,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPrisma,
  SiFramer,
  SiStyledcomponents,
} from "react-icons/si";

export default function Home() {
  const technologies = [
    { title: "C++", color: "bg-blue-50", icon: <SiCplusplus size="2rem" /> },
    {
      title: "JavaScript",
      color: "bg-yellow-50",
      icon: <SiJavascript size="2rem" />,
    },
    { title: "HTML", color: "bg-orange-50", icon: <SiHtml5 size="2rem" /> },
    { title: "CSS", color: "bg-blue-50", icon: <SiCss3 size="2rem" /> },
    { title: "Git", color: "bg-orange-50", icon: <SiGit size="2rem" /> },
    {
      title: "Node.js",
      color: "bg-green-50",
      icon: <SiNodedotjs size="2rem" />,
    },
    { title: "React.js", color: "bg-cyan-50", icon: <SiReact size="2rem" /> },
    {
      title: "Next.js",
      color: "bg-slate-50",
      icon: <SiNextdotjs size="2rem" />,
    },
    {
      title: "Tailwind CSS",
      color: "bg-sky-50",
      icon: <SiTailwindcss size="2rem" />,
    },
    {
      title: "TypeScript",
      color: "bg-blue-50",
      icon: <SiTypescript size="2rem" />,
    },
    {
      title: "Prisma ORM",
      color: "bg-slate-50",
      icon: <SiPrisma size="2rem" />,
    },
    {
      title: "Framer Motion",
      color: "bg-slate-50",
      icon: <SiFramer size="2rem" />,
    },
    {
      title: "Styled Components",
      color: "bg-pink-50",
      icon: <SiStyledcomponents size="2rem" />,
    },
  ];
  return (
    <div className="p-10 bg-white rounded-3xl ">
      <main
        className="rounded-3xl relative flex min-h-screen flex-col items-center justify-between p-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/background4.webp")' }}
      >
        <nav className="absolute gap-3 items-center justify-center top-6 left-6 flex bg-white/50 rounded-xl shadow-xl  backdrop-blur-[12.6px] border border-white/40">
          <Image
            className="p-3"
            width={175}
            height={65}
            src="/Signature.png"
            alt="My signature"
          />
          <a href="/" className="p-3 text-md  text-black">
            Sobre mim
          </a>
          <a href="/projetos" className="p-3 text-md  text-black">
            Projetos
          </a>
          <a href="/contato" className="p-3 text-md  text-black">
            <Button className="p-4 rounded-xl"> Contato</Button>
          </a>
        </nav>
        <section className="w-full flex justify-end">
          <Card className=" p-8 bg-white rounded-[30px] ">
            <CardHeader className="text-xl font-semibold text-black">
              <div className="flex gap-1">
                <At size={26} />

                <p> Sobre mim</p>
              </div>
            </CardHeader>
            <CardContent className="items-center justify-center w-full">
              <p className="text-lg text-black">Minhas tecnologias </p>
              <div className="flex-wrap max-w-96 flex gap-6">
                {technologies.map((tech) => (
                  <TechnologiesLogo
                    icon={tech.icon}
                    title={tech.title}
                    color={tech.color}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
