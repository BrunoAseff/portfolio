import { Inter, Handjet } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const metadata = {
  title: "Bruno de Almeida Aseff",
  description: "Generated by create next app",
};

const inter = Inter({ subsets: ["latin"] });

const handjet = Handjet({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-handjet",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${handjet.variable}`}>
        <main
          className="h-screen relative flex flex-col items-center justify-between  bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/opcao_2.jpeg")',
          }}
        >
          <nav className="absolute gap-3 items-center justify-center top-6 left-6 flex bg-white/20 rounded-xl  backdrop-blur-[30px] border border-white/40">
            <Image
              className="p-3"
              width={175}
              height={65}
              src="/Signature.png"
              alt="My signature"
            />
            <a
              href="/"
              className="p-3 rounded-xl border-1 border-transparent hover:border-black border-[1px] text-md text-black"
            >
              Sobre mim
            </a>
            <a
              href="/projetos"
              className="p-3 rounded-xl border-1 border-transparent hover:border-black border-[1px] text-md text-black"
            >
              Projetos
            </a>
            <a href="/contato" className="p-3 text-md text-black">
              <Button className="p-4 rounded-xl">Contato</Button>
            </a>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
