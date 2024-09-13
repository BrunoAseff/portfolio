"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { projects } from "@/info/projects";
import { ArrowSquareOut, CheckCircle } from "phosphor-react";
import { toast } from "sonner";
import { AspectRatio } from "../ui/aspect-ratio";

export default function ProjectsTab() {
  return (
    <Card className="flex-col w-full m-6 p-8 items-center justify-center shadow-xl bg-white/20 backdrop-blur-[20px] mb-auto mt-auto  border border-white/40 rounded-xl">
      <CardHeader className="flex gap-1 mb-4 text-lg rounded-lg pl-0 p-2 w-fit font-semibold">
        <p>Projetos</p>
      </CardHeader>
      <CardContent className="mt-auto mb-auto  text-justify gap-4 scroll-smooth overflow-x-scroll flex w-full">
        {projects.map((project, index) => (
          <Dialog key={index}>
            <div className="shadow-xl justify-between flex min-w-[300px] flex-col  bg-white/5  p-6 backdrop-blur-[20px]  border border-white/40 rounded-xl">
              <h1 className="mb-0">{project.title}</h1>
              <p className="text-slate-500 text-sm text-left mb-2">
                {project.shortDescription}
              </p>
              <Link
                className="text-blue-600 mb-2 flex items-center gap-1"
                href={project.gitHubLink}
                target="_blank"
              >
                <p> Github </p>
                <ArrowSquareOut size={17} />
              </Link>
              <div className="w-[15.625rem] ml-auto mr-auto h-[8rem]">
                {" "}
                <Image
                  loading="eager"
                  className="rounded-xl ml-auto mr-auto mb-2"
                  src={project.images[0]}
                  alt="Picture of the author"
                  width={250}
                  height={250}
                />
              </div>
              <DialogTrigger asChild>
                <Button className="p-4 mt-4 text-md text-white bg-black rounded-xl">
                  Ver detalhes
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent className="flex-col pt-4 pb-4  pl-10 pr-10  backdrop-blur-[100px] shadow-xl bg-white/5 min-h-[90%] max-h-[95%] w-[90%]   max-w-full  border border-white/40 rounded-xl">
              <div className="w-full flex gap-2 text-lg text-black">
                <div className="w-[50%] flex flex-col justify-evenly m-4">
                  <DialogTitle className="mb-6">{project.title}</DialogTitle>
                  <p className="mb-auto max-w-xl"> {project.longDescription}</p>

                  <ul className="list-none  mb-auto ">
                    {project.features?.map((feature, index) => (
                      <li
                        key={index}
                        className="flex gap-1 items-center mb-4 font-bold"
                      >
                        <CheckCircle size={32} />

                        <p> {feature}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 space-between mt-4">
                    {" "}
                    <Button
                      className="p-4  text-sm text-white bg-black rounded-xl w-fit"
                      asChild
                    >
                      <Link
                        className="text-blue-600 mb-auto flex gap-2"
                        href={
                          project.webLink === "Você já está nele!"
                            ? "#"
                            : project.webLink
                        }
                        target={
                          project.webLink === "Você já está nele!"
                            ? ""
                            : "_blank"
                        }
                        onClick={(e) => {
                          if (project.webLink === "Você já está nele!") {
                            e.preventDefault();
                            console.log("Você já está nele!");
                            toast("Você já está nele!");
                          }
                        }}
                      >
                        <p>Projeto na web</p> <ArrowSquareOut size={20} />
                      </Link>
                    </Button>
                    <Button
                      className="p-4  text-sm text-white bg-black rounded-xl w-fit"
                      asChild
                    >
                      <Link
                        target="_blank"
                        className="text-blue-600 gap-2 flex"
                        href={project.gitHubLink}
                      >
                        {" "}
                        <p>Projeto no Github</p>
                        <ArrowSquareOut size={17} />
                      </Link>
                    </Button>
                  </div>
                  <h1 className="mt-auto mb-4 font-semibold text-black">
                    Tecnologias utilizadas
                  </h1>
                  <div className="flex mb-auto gap-2">
                    {project.technologies.map((tech, index) => (
                      <div
                        className="w-12 h-12 backdrop-blur-[20px]   flex items-center justify-center rounded-xl p-2 bg-black/20 border border-white/40"
                        key={index}
                      >
                        {" "}
                        <Image
                          loading="eager"
                          src={tech}
                          alt="Picture of the author"
                          width={50}
                          height={50}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 max-w-[90%] gap-12 mt-auto mb-auto ">
                  {project.images.map((image, index) => (
                    <div key={index} className="w-full">
                      <Dialog className="flex flex-col items-left w-full">
                        <DialogTrigger asChild>
                          <div className="mt-auto mb-auto">
                            <Image
                              loading="eager"
                              className="rounded-xl hover:cursor-pointer"
                              src={image}
                              alt={project.imagesAlt?.[index]}
                              width={230}
                              height={230}
                            />
                            <p className="mt-2 font-sm text-stone-700">
                              {project.imagesAlt?.[index]}
                            </p>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-[1024px] border-0 p-0 max-h-fit  bg-transparent  ">
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              loading="eager"
                              className="rounded-xl  object-cover  hover:cursor-pointer"
                              src={image}
                              alt={project.imagesAlt?.[index]}
                              width={2100}
                              height={430}
                            />
                          </AspectRatio>
                        </DialogContent>
                      </Dialog>
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
