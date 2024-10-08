import { Inter, Handjet } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import FaviconLoop from "@/components/FaviconLoop";

export const metadata = {
  title: "Bruno de Almeida Aseff",
  description: "Portfólio de Bruno de Almeida Aseff",
  icons: {
    icon: "/favicons/typescript.ico",
  },
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
        <FaviconLoop />

        <main className="h-screen relative  flex flex-col items-center justify-between w-full ">
          <Image
            priority
            alt="Background"
            src="/opcao_2.jpeg"
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />

          <Navbar />
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
