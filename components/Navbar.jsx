"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, Home, Briefcase, FileText, Rss, Mail } from "lucide-react";

const navItems = [
  { href: "/", label: "Sobre mim", icon: <Home size={16} /> },
  { href: "/projetos", label: "Projetos", icon: <FileText size={16} /> },
  { href: "/experiencia", label: "Experiência", icon: <Briefcase size={16} /> },
  { href: "/blog", label: "Blog", icon: <Rss size={16} /> },
  { href: "/contato", label: "Contato", icon: <Mail size={16} /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-center">
      <div className="w-full max-w-5xl flex items-center justify-between">
        <Link href="/" className="z-10">
          <Image
            width={160}
            height={60}
            src="/Signature.png"
            alt="My signature"
            priority
          />
        </Link>

        <nav className="hidden md:flex bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-2 items-center gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`rounded-xl transition-all border border-transparent hover:bg-white/20 text-white/80 hover:text-white duration-300 ${
                  pathname === item.href
                    ? "bg-white/20 border-white/10 text-white"
                    : ""
                }`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="md:hidden z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 rounded-xl"
              >
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
                    <Link
                      href={item.href}
                      className={`flex items-center gap-4 text-lg w-full p-3 rounded-lg transition-colors duration-300 ${
                        pathname === item.href
                          ? "bg-white/10"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
