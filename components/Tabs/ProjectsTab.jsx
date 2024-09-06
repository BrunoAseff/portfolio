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
            <DialogContent className="flex-col w-full m-10 p-8  shadow-xl bg-white/20 backdrop-blur-[20px] h-[80vh]  border border-white/40 rounded-xl">
              <DialogTitle>{project.title}</DialogTitle>
            </DialogContent>
          </Dialog>
        ))}
      </CardContent>
    </Card>
  );
}
