"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { At } from "phosphor-react";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/background3.jpg")' }}
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
        <Card className="w-[600px] h-[800px] p-8 bg-white rounded-[30px] ">
          <CardHeader className="text-xl font-semibold text-black">
            <div className="flex gap-1">
              <At size={26} />

              <p> Sobre mim</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-black">Minhas tecnologias </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
