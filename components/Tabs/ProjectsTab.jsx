"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { projects } from "@/info/projects";
import { ArrowSquareOut } from "phosphor-react";

export default function ProjectsTab() {
  return (
    <Card className="flex-col w-full m-10 p-8  shadow-xl bg-white/20 backdrop-blur-[20px] h-[80vh]  border border-white/40 rounded-xl">
      <CardHeader className="flex gap-1 mb-4 text-lg rounded-lg pl-0 p-2 w-fit font-semibold">
        <p>Projetos</p>
      </CardHeader>
      <CardContent className=" text-justify gap-4 scroll-smooth overflow-scroll flex w-full">
        {projects.map((project, index) => (
          <Dialog key={index}>
            <div className="shadow-xl justify-between flex min-w-[300px] flex-col  bg-white/5  p-6 backdrop-blur-[20px]  border border-white/40 rounded-xl">
              <h1 className="mb-0">{project.title}</h1>
              <p className="text-slate-500 text-sm text-left mb-2">
                {project.shortDescription}
              </p>
              <Link className="text-blue-600 mb-2" href={project.gitHubLink}>
                {project.gitHubLink}
              </Link>
              <Image
                className="rounded-xl ml-auto mr-auto mb-2"
                src={project.images[0]}
                alt="Picture of the author"
                width={250}
                height={250}
              />
              <DialogTrigger asChild>
                <Button className="p-4 mt-4 text-md text-white bg-black rounded-xl">
                  Ver detalhes
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent className="flex-col backdrop-blur-[70px] shadow-xl bg-white/40 min-h-96 w-[95%] h-[95%]  max-w-full  border border-white/40 rounded-xl">
              <div className="w-full flex gap-2 text-lg text-black">
                <div className="w-[60%] flex flex-col justify-evenly m-4">
                  <DialogTitle className="mb-6">{project.title}</DialogTitle>
                  <p className="mb-auto"> {project.longDescription}</p>

                  <Button
                    className="p-4 mt-4 text-md text-white bg-black rounded-xl w-fit"
                    asChild
                  >
                    <Link
                      target="_blank"
                      className="text-blue-600 mb-auto flex gap-2"
                      href={project.webLink}
                    >
                      {" "}
                      <p>Projeto na web</p>
                      <ArrowSquareOut size={20} />
                    </Link>
                  </Button>

                  <Button
                    className="p-4 mt-4 text-md text-white bg-black rounded-xl w-fit"
                    asChild
                  >
                    <Link
                      target="_blank"
                      className="text-blue-600 gap-2 flex"
                      href={project.gitHubLink}
                    >
                      {" "}
                      <p>Projeto no Github</p>
                      <ArrowSquareOut size={20} />
                    </Link>
                  </Button>
                  <h1 className="mt-auto mb-4 font-semibold text-black">
                    Tecnologias utilizadas
                  </h1>
                  <div className="flex mb-auto gap-2">
                    {project.technologies.map((tech, index) => (
                      <Image
                        className=" hover:cursor-pointer rounded-xl p-2  bg-white/5 backdrop-blur-[10px]  "
                        key={index}
                        src={tech}
                        alt="Picture of the author"
                        width={50}
                        height={50}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 w-[40%] gap-4 m-4">
                  {project.images.map((image, index) => (
                    <div key={index}>
                      <Image
                        className="rounded-xl"
                        src={image}
                        alt={
                          project.imagesAlt
                            ? project.imagesAlt[index]
                            : "Imagem"
                        }
                        width={200}
                        height={200}
                      />
                      <span>
                        {project.imagesAlt
                          ? project.imagesAlt[index]
                          : "Descrição não disponível"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </CardContent>
    </Card>
  );
}
