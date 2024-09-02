"use client";

import AboutMeTab from "@/components/Tabs/AboutMeTab";
import TechnologiesTab from "@/components/Tabs/TechnologiesTab";
import { Code, User } from "phosphor-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [card1Position, setCard1Position] = useState(null);
  const [card2Position, setCard2Position] = useState(null);

  const calculateInitialPositions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setCard1Position({ x: width * -0.4, y: height * -0.3 });
    setCard2Position({ x: width * -0.01, y: height * -0.3 });
  };

  useEffect(() => {
    calculateInitialPositions();
    window.addEventListener("resize", calculateInitialPositions);
    return () => {
      window.removeEventListener("resize", calculateInitialPositions);
    };
  }, []);

  return (
    <main className="h-screen flex justify-center items-center relative">
      <section className="w-full flex justify-center items-center">
        {card1Position && <AboutMeTab defaultPosition={card1Position} />}
        {card2Position && <TechnologiesTab defaultPosition={card2Position} />}
      </section>
      <div className="items-center flex justify-center w-full">
        <nav className="absolute gap-3 items-center justify-center bottom-6 flex bg-white/20 rounded-xl  backdrop-blur-[30px] border border-white/40">
          <a
            href="/"
            className="p-3 text-md flex flex-col items-center justify-center gap-1 text-black"
          >
            <User size={32} />
            <div className="rounded-full w-1 h-1 bg-black"></div>
          </a>
          <a
            href="/"
            className="p-3 text-md flex flex-col items-center justify-center gap-1 text-black"
          >
            <Code size={32} />
            <div className="rounded-full w-1 h-1 bg-black"></div>
          </a>
        </nav>
      </div>
    </main>
  );
}
