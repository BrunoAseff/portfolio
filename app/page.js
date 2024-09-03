"use client";

import BottomNav from "@/components/general/BottomNav";
import AboutMeTab from "@/components/Tabs/AboutMeTab";
import TechnologiesTab from "@/components/Tabs/TechnologiesTab";
import { useEffect, useState } from "react";

export default function Home() {
  const [card1Position, setCard1Position] = useState(null);
  const [card2Position, setCard2Position] = useState(null);

  const calculateInitialPositions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setCard1Position({ x: width * -0.4, y: height * -0.3 });
    setCard2Position({ x: width * 0.03, y: height * -0.3 });
  };

  useEffect(() => {
    calculateInitialPositions();
    window.addEventListener("resize", calculateInitialPositions);
    return () => {
      window.removeEventListener("resize", calculateInitialPositions);
    };
  }, []);

  return (
    <main className="border-6 border-blue-600 h-screen flex flex-col max-w-full justify-center items-center relative">
      <section>
        {card1Position && <AboutMeTab defaultPosition={card1Position} />}
        {card2Position && <TechnologiesTab defaultPosition={card2Position} />}
      </section>

      <BottomNav />
    </main>
  );
}
