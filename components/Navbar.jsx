"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, Home, Briefcase, FileText, Rss, Mail } from 'lucide-react'; 

const navItems = [
  { href: "/", label: "Sobre mim", icon: <Home size={16} /> },
  { href: "/projetos", label: "Projetos", icon: <FileText size={16} /> },
  { href: "/experiencia", label: "Experiência", icon: <Briefcase size={16} /> },
  { href: "/blog", label: "Blog", icon: <Rss size={16} /> },
  { href: "/contato", label: "Contato", icon: <Mail size={16} /> }
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-center"
    >
      <div className="w-full max-w-5xl flex items-center justify-between">
        <a href="/" className="z-10">
          <Image
            width={160}
            height={60}
            src="/Signature.png"
            alt="My signature"
            priority
          />
        </a>

        <nav className="hidden md:flex bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-2 items-center gap-2">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="text-white/80 hover:bg-white/20 hover:text-white rounded-xl transition-all duration-300"
              >
                {item.label}
              </Button>
            </a>
          ))}
        </nav>

        <div className="md:hidden z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 rounded-xl">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right"
              className="bg-black/20 backdrop-blur-[100px] border-l border-white/20 text-white w-[75%] p-6 flex flex-col"
            >
              <nav className="flex flex-col items-start gap-4 mt-16">
                {navItems.map((item) => (
                   <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="flex items-center gap-4 text-lg w-full p-3 rounded-lg hover:bg-white/10 transition-colors duration-300"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                   </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}