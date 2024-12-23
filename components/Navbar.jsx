"use client";

import { List } from "phosphor-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "./ui/sheet";
import { Badge } from "./ui/badge";

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex md:mt-0 mt-4 pl-6 pr-6 items-center justify-between w-full"
    >
      {/* Desktop Navigation */}
      <nav className="static md:absolute gap-3 items-center justify-center top-6 left-6 bg-white/20 rounded-xl z-50 backdrop-blur-[30px] flex border border-white/40">
        <a
          href="/"
          className="p-3 flex rounded-xl border-transparent text-md text-black hover:text-black"
        >
          <Image
            className="p-2"
            width={175}
            height={65}
            src="/Signature.png"
            alt="My signature"
          />
        </a>

        <a
          href="/"
          className="md:block hidden rounded-xl text-md text-black hover:text-black"
        >
          <Button
            className="rounded-xl border-[1px] border-transparent hover:bg-white/20 hover:text-black"
            variant="ghost"
          >
            Sobre mim
          </Button>
        </a>
        <a
          href="/projetos"
          className="md:block hidden rounded-xl text-md text-black hover:text-black"
        >
          <Button
            className="rounded-xl border-[1px] border-transparent hover:bg-white/20 hover:text-black"
            variant="ghost"
          >
            Projetos
          </Button>
        </a>

        <a
          href="/blog"
          className="md:block hidden rounded-xl text-md text-black relative"
        >
          <Button
            className="rounded-xl border-[1px] border-transparent hover:bg-white/20 hover:text-black"
            variant="ghost"
          >
            Blog
          </Button>
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
            <Badge className="bg-green-400 text-black text-xs px-1 py-0.5 hover:bg-green-400">
              novo
            </Badge>
          </span>
        </a>

        <a href="/contato" className="p-3 md:block hidden text-md text-black">
          <Button className="p-5 rounded-xl">Contato</Button>
        </a>
      </nav>

      <nav className="md:hidden block">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="pl-3 pr-3 pb-6 pt-6 bg-white/20 rounded-lg z-50 backdrop-blur-[30px] flex border border-white/40"
            >
              <List size={32} />
            </Button>
          </SheetTrigger>

          <SheetContent
            showOverlay={false}
            className="bg-white/20 backdrop-brightness-100 rounded-lg max-w-[70%] z-50 backdrop-blur-[30px] flex border border-white/40"
            side="right"
          >
            <div className="flex text-xl ml-auto mr-auto text-right text-gray-800 flex-col gap-8 ">
              <Image
                className="p-2 mb-6"
                width={175}
                height={65}
                src="/Signature.png"
                alt="My signature"
              />
              <a
                className="w-full rounded-xl border-[1px] border-transparent "
                href="/"
              >
                Sobre mim
              </a>
              <a
                className="w-full rounded-xl border-[1px] border-transparent "
                href="/projetos"
              >
                Projetos
              </a>
              <a
                className="w-full rounded-xl relative border-[1px] border-transparent "
                href="/blog"
              >
                Blog
              </a>
              <a
                className="w-full rounded-xl border-[1px] border-transparent "
                href="/contato"
              >
                Contato
              </a>
            </div>
            <SheetClose asChild></SheetClose>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.div>
  );
}
