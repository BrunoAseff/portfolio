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

export default function ProjectsTab() {
  return (
    <Dialog>
      <Card className="flex-col w-full m-10 p-8  shadow-xl bg-white/20 backdrop-blur-[20px] h-[80vh]  border border-white/40 rounded-xl">
        <CardHeader className="flex gap-1 mb-4 text-lg rounded-lg pl-0 p-2 w-fit font-semibold">
          <p>Projetos</p>
        </CardHeader>
        <CardContent className=" text-justify flex w-full">
          <div className="shadow-xl flex flex-col gap-2 bg-white/5 w-fit p-10 backdrop-blur-[20px]  border border-white/40 rounded-xl">
            <h1> Projeto 1</h1>
            <p className="text-slate-500">
              Descrição do projeto 1 blablablabla
            </p>
            <Link className="text-blue-600" href="https://github.com/">
              https://github.com/
            </Link>
            <Image
              className="rounded-xl ml-auto mr-auto"
              src="/opcao_2.jpeg"
              alt="Picture of the author"
              width={200}
              height={200}
            />
            <DialogTrigger asChild>
              <Button className="p-4 mt-4 text-md text-white bg-black rounded-xl">
                Ver detalhes
              </Button>
            </DialogTrigger>
          </div>
        </CardContent>
      </Card>
    </Dialog>
  );
}
