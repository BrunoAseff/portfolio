"use client";

import AboutMeTab from "@/components/Tabs/AboutMeTab";
import TechnologiesTab from "@/components/Tabs/TechnologiesTab";
import { useEffect, useState } from "react";

export default function Home() {
  const [card1Position, setCard1Position] = useState({ x: 0, y: 0 });
  const [card2Position, setCard2Position] = useState({ x: 0, y: 0 });

  const calculateInitialPositions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Set positions based on a percentage of the screen size
    setCard1Position({ x: width * 0.2, y: height * 0.3 });
    setCard2Position({ x: width * 0.7, y: height * 0.3 });

    console.log(card1Position, card2Position);
  };

  useEffect(() => {
    calculateInitialPositions();
    window.addEventListener("resize", calculateInitialPositions);
    return () => {
      window.removeEventListener("resize", calculateInitialPositions);
    };
  }, []);

  return (
    <main className="h-screen flex justify-center items-center">
      <section className="w-full flex justify-center items-center">
        <AboutMeTab defaultPosition={card1Position} />
        <TechnologiesTab defaultPosition={card2Position} />
      </section>
    </main>
  );
}
