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
import { ArrowSquareOut, Check, CheckCircle, Copy } from "phosphor-react";
import { toast } from "sonner";
import { AspectRatio } from "../ui/aspect-ratio";
import RpgCode from "../CodeHightlighter";
import RandomTypescriptCode from "../randomTypescript";
import { useState } from "react";
import { Hammer } from "lucide-react";
import ProjectImageGallery from "../ProjectImageGallery";

export default function ProjectsTab() {
  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = (text, item) => {
    navigator.clipboard.writeText(text).then(() => {
      toast("Copiado para a área de transferência!");
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(null), 1000);
    });
  };

  return (
    <Card className="flex-col w-full m-6 md:p-4 items-center justify-center shadow-xl bg-white/30 backdrop-blur-[20px] mb-auto mt-auto  border border-white/40 rounded-xl">
      <CardHeader className="md:flex hidden  gap-1  rounded-lg p-2 w-fit font-semibold text-black">
      <p className="text-white/80  drop-shadow-2xl text-3xl font-medium">Projetos</p>
      </CardHeader>
      <CardContent className="mt-auto p-6 mb-auto max-h-[85vh]  text-justify gap-4 scroll-smooth md:overflow-x-scroll overflow-x-hidden overflow-y-scroll flex-col md:flex-row flex w-full">
        {projects.map((project, index) => (
          <Dialog key={index}>
            <div className="shadow-xl justify-between flex min-w-[300px] flex-col  bg-white/10  p-6 backdrop-blur-[150px]  border  border-white/40 rounded-xl">
              <div className="flex w-full justify-between">
                <h1 className="mb-0 font-medium text-black">{project.title}</h1>
                {project.InDevelopment && (
                  <div className=" flex gap-1  text-xs text-slate-700 p-1 rounded-full border-[1px]  border-slate-700 bg-slate-700/10 ">
                    <Hammer size={15} />
                    Em produção
                  </div>
                )}
              </div>

              <p className="text-slate-700 text-sm text-left mb-2">
                {project.shortDescription}
              </p>
              <Link
                className="text-blue-600 mb-2  items-center hidden md:flex gap-1"
                href={project.gitHubLink}
                target="_blank"
              >
                <p> {project.ExternalLink || "Github"} </p>
                <ArrowSquareOut size={17} />
              </Link>
              <div className="w-[15.625rem]  bg-cover overflow-hidden ml-auto mr-auto h-[9rem]">
                <Image
                  loading="eager"
                  className="rounded-xl ml-auto mr-auto mb-2 object-cover w-full h-full"
                  src={project.images[0]}
                  alt="Picture of the author"
                  width={250}
                  height={250}
                />
              </div>
              <DialogTrigger asChild>
                <Button className="hidden md:flex p-4 mt-4 text-md text-white bg-black rounded-xl">
                  Ver detalhes
                </Button>
              </DialogTrigger>
              <Button className="md:hidden flex p-4 mt-4 text-md text-white bg-black rounded-xl">
                <Link
                  className="flex items-center gap-4 "
                  href={project.gitHubLink}
                  target="_blank"
                >
                  <p>{project.CTA || "Ver no GitHub"}</p>
                  <ArrowSquareOut size={17} />
                </Link>
              </Button>
            </div>
            <DialogContent className="flex-col pt-4 pb-4  pl-10 pr-10  backdrop-blur-[100px] shadow-xl bg-white/5 min-h-[90%] max-h-[95%] w-[90%]   max-w-full  border border-white/40 rounded-xl">
              <div className="w-full flex gap-2 text-lg text-black">
                <div className="w-[50%] flex flex-col justify-evenly m-4">
                  <DialogTitle className="mb-6">{project.title}</DialogTitle>
                  <p className="mb-auto max-w-xl"> {project.longDescription}</p>
                  {project.title === "random-password-typescript" && (
                    <Button
                      className="flex max-w-fit mr-0 mb-auto items-center justify-between backdrop-blur-[20px] hover:bg-white/5 gap-4 rounded-xl bg-white/10 border border-white/40"
                      onClick={() =>
                        copyToClipboard(
                          "npm install random-password-typescript",
                          "code"
                        )
                      }
                    >
                      <p className="text-black font-semibold">
                        npm install random-password-typescript
                      </p>
                      {copiedItem === "code" ? (
                        <Check color="black" size={23} />
                      ) : (
                        <Copy color="black" size={23} />
                      )}
                    </Button>
                  )}
                  <ul className="list-none mb-auto">
                    {project.features?.map((feature, index) => (
                      <li
                        key={index}
                        className="flex gap-2 items-center mb-4 font-semibold"
                      >
                        <CheckCircle
                          className="text-slate-950"
                          weight="duotone"
                          size={28}
                        />

                        <p> {feature}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 space-between mt-4">
                    {" "}
                    {project.webLink && project.webLink !== "" && (
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
                              toast("Você já está aqui!");
                            }
                          }}
                        >
                          <p>Projeto na web</p> <ArrowSquareOut size={20} />
                        </Link>
                      </Button>
                    )}
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
                        <p>{project.CTA || "Projeto no Github"}</p>
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
                        className="w-12 h-12  flex items-center justify-center rounded-xl p-2 bg-black/20 border-[1px] border-black/60"
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
                {project.images.length > 1 && (
                  <ProjectImageGallery
                    images={project.images}
                    imagesAlt={project.imagesAlt}
                  />
                )}

                {project.title === "RPG no Terminal" && (
                  <div className="m-auto w-[700px]">
                    <RpgCode />
                  </div>
                )}

                {project.title === "random-password-typescript" && (
                  <div className="m-auto w-[700px]">
                    <RandomTypescriptCode />
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}

        <div className="shadow-xl justify-between flex min-w-[300px] flex-col  bg-white/5  p-6 backdrop-blur-[20px]  border border-white/40 rounded-xl">
          <h1 className="mb-0 text-black font-semibold">Outros projetos</h1>
          <p className="text-slate-700 text-sm text-left mb-2">
            Outros repositorios podem ser encontrados no meu github.
          </p>
          <Image
            loading="eager"
            className="rounded-xl ml-auto mr-auto mb-2"
            src="/github.webp"
            alt="Print do github"
            width={250}
            height={250}
          />
          <Button className="hidden md:flex  p-4 mt-4 text-md text-white bg-black rounded-xl">
            <Link
              className="flex items-center  "
              href="https://github.com/BrunoAseff"
              target="_blank"
            >
              <p>Acessar Github</p>
            </Link>{" "}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
