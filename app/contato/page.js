"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Copy,
  Check,
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
  DownloadSimple,
  ArrowSquareOut,
} from "phosphor-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function Contato() {
  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = (text, item) => {
    navigator.clipboard.writeText(text).then(() => {
      toast("Copiado para a área de transferência!");
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(null), 1000);
    });
  };

  return (
    <main className="flex w-full overflow-hidden items-center justify-center h-screen">
      <Card className="backdrop-blur-[20px] p-6 flex-col mt-auto mb-auto flex rounded-xl bg-white/20 border border-white/40">
        <CardHeader className="flex gap-1 mb-4 text-lg rounded-lg pl-0 p-2 w-fit font-semibold">
          <h1 className="mt-auto mb-4 font-semibold text-black">Contato</h1>
        </CardHeader>
        <CardContent className="flex flex-col  gap-10 items-center justify-center">
          <div className="flex flex-col w-full justify-start gap-2">
            <Button className="flex items-center justify-between backdrop-blur-[20px] gap-4 hover:bg-white/5 rounded-xl bg-white/10 border border-white/40">
              <LinkedinLogo color="black" weight="fill" size={25} />
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/bruno-aseff-374835207/"
              >
                {" "}
                <strong className="text-black">Linkedin</strong>
              </Link>

              <ArrowSquareOut color="black" size={23} />
            </Button>
            <Button className="flex items-center justify-between backdrop-blur-[20px] gap-4 hover:bg-white/5 rounded-xl bg-white/10 border border-white/40">
              <Image
                src="/svgs/github-light.svg"
                alt="github logo"
                width={25}
                height={25}
              />
              <Link target="_blank" href="https://github.com/BrunoAseff">
                {" "}
                <strong className="text-black">GitHub</strong>
              </Link>

              <ArrowSquareOut color="black" size={23} />
            </Button>

            <Button
              className="flex items-center justify-between backdrop-blur-[20px] gap-4 hover:bg-white/5 rounded-xl bg-white/10 border border-white/40"
              onClick={() => copyToClipboard("(47) 991031009", "phone")}
            >
              <strong className="text-black">(47) 991031009</strong>
              {copiedItem === "phone" ? (
                <Check color="black" size={23} />
              ) : (
                <Copy color="black" size={23} />
              )}
            </Button>
            <Button
              className="flex items-center justify-between backdrop-blur-[20px] hover:bg-white/5 gap-4 rounded-xl bg-white/10 border border-white/40"
              onClick={() => copyToClipboard("brunoaseff2@gmail.com", "email")}
            >
              <strong className="text-black">brunoaseff2@gmail.com</strong>
              {copiedItem === "email" ? (
                <Check color="black" size={23} />
              ) : (
                <Copy color="black" size={23} />
              )}
            </Button>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <Link href="/curriculo.pdf">
              {" "}
              <Button className="flex justify-evenly items-center w-full gap-4">
                <DownloadSimple size={25} />
                <p>Baixar currículo em PDF</p>
              </Button>
            </Link>
            <Button className="flex justify-evenly m-4 mt-0 w-full items-center gap-4">
              <WhatsappLogo size={25} />
              <Link target="_blank" href="https://wa.me/5547991031009?text=">
                {" "}
                <p> Chamar no Whatsapp</p>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
