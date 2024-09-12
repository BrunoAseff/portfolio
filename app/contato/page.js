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
} from "phosphor-react";
import { toast } from "sonner";

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
      <Card className="backdrop-blur-[20px] p-10 flex-col mt-auto mb-auto flex rounded-xl bg-white/20 border border-white/40">
        <CardHeader className="flex gap-1 mb-4 text-lg rounded-lg pl-0 p-2 w-fit font-semibold">
          <h1 className="mt-auto mb-4 font-semibold text-black">Contato</h1>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center justify-center">
          <div className="flex gap-4">
            <LinkedinLogo size={25} />
            <GithubLogo size={25} />
          </div>
          <Button className="flex items-center gap-4">
            <WhatsappLogo size={25} />
            <p> Chamar no Whatsapp</p>
          </Button>
          <Button
            className="flex items-center backdrop-blur-[20px] gap-4 hover:bg-white/5 rounded-xl bg-white/10 border border-white/40"
            onClick={() => copyToClipboard("(47) 991031009", "phone")}
          >
            <strong className="text-black">(47) 991031009</strong>
            {copiedItem === "phone" ? (
              <Check color="black" size={25} />
            ) : (
              <Copy color="black" size={25} />
            )}
          </Button>
          <Button
            className="flex items-center backdrop-blur-[20px] hover:bg-white/5 gap-4 rounded-xl bg-white/10 border border-white/40"
            onClick={() => copyToClipboard("brunoaseff2@gmail.com", "email")}
          >
            <strong className="text-black">brunoaseff2@gmail.com</strong>
            {copiedItem === "email" ? (
              <Check color="black" size={25} />
            ) : (
              <Copy color="black" size={25} />
            )}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
